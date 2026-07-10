import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const rootDir = resolve(import.meta.dirname, "..");
const files = {
  editor: readFileSync(resolve(rootDir, "src/scss/components/_editor.scss"), "utf8"),
  activeVisual: readFileSync(resolve(rootDir, "src/scss/_active-visual-overrides.scss"), "utf8"),
  base: readFileSync(resolve(rootDir, "src/scss/_base.scss"), "utf8"),
  modals: readFileSync(resolve(rootDir, "src/scss/components/_modals.scss"), "utf8"),
  tabs: readFileSync(resolve(rootDir, "src/scss/components/_tabs.scss"), "utf8"),
  canvas: readFileSync(resolve(rootDir, "src/scss/plugins/_canvas.scss"), "utf8"),
  styleSettings: readFileSync(resolve(rootDir, "src/scss/plugins/_style-settings.scss"), "utf8"),
};

const checks = [
  [
    "H4-H6 在阅读模式与编辑模式都有颜色和字重覆盖",
    /\.markdown-rendered[\s\S]*?h4,[\s\S]*?h5,[\s\S]*?h6[\s\S]*?font-weight:\s*var\(--monokai-heading-weight\);/.test(files.editor)
      && /\.cm-header-4[\s\S]*?color:\s*var\(--h4-color\);[\s\S]*?font-weight:\s*var\(--monokai-heading-weight\);/.test(files.editor)
      && /\.cm-header-5[\s\S]*?color:\s*var\(--h5-color\);[\s\S]*?font-weight:\s*var\(--monokai-heading-weight\);/.test(files.editor)
      && /\.cm-header-6[\s\S]*?color:\s*var\(--h6-color\);[\s\S]*?font-weight:\s*var\(--monokai-heading-weight\);/.test(files.editor),
  ],
  [
    "H1-H6 下边距按层级递减并同步编辑模式",
    /--monokai-heading-gap-h1:\s*1\.25rem;[\s\S]*?--monokai-heading-gap-h2:\s*1\.1rem;[\s\S]*?--monokai-heading-gap-h3:\s*0\.95rem;[\s\S]*?--monokai-heading-gap-h4:\s*0\.8rem;[\s\S]*?--monokai-heading-gap-h5:\s*0\.7rem;[\s\S]*?--monokai-heading-gap-h6:\s*0\.6rem;/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?h1\s*\{[\s\S]*?margin-block-end:\s*var\(--monokai-heading-gap-h1\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?h6\s*\{[\s\S]*?margin-block-end:\s*var\(--monokai-heading-gap-h6\);/.test(files.editor)
      && /\.HyperMD-header-1[\s\S]*?padding-block-end:\s*var\(--monokai-heading-gap-h1\);/.test(files.editor)
      && /\.HyperMD-header-6[\s\S]*?padding-block-end:\s*var\(--monokai-heading-gap-h6\);/.test(files.editor),
  ],
  [
    "标题导航增强具备可选色条、分组间距和锚点颜色",
    /--monokai-heading-accent-width:\s*3px;/.test(files.editor)
      && /--monokai-heading-group-spacing:\s*var\(--monokai-heading-group-spacing-value, 1\.4rem\);/.test(files.editor)
      && /--monokai-heading-anchor-color:\s*var\(--text-faint\);/.test(files.editor)
      && /body\.monokai-syntax-heading-accents/.test(files.styleSettings)
      && /monokai-syntax-heading-accents/.test(readFileSync(resolve(rootDir, "src/css/style-settings/40-typography.css.md"), "utf8"))
      && /body\.monokai-syntax-heading-accents[\s\S]*?\.markdown-rendered h1::before,[\s\S]*?\.markdown-rendered h2::before,[\s\S]*?\.markdown-rendered h3::before[\s\S]*?width:\s*var\(--monokai-heading-accent-width\);/.test(files.styleSettings)
      && /\.markdown-rendered[\s\S]*?h2\s*\{[\s\S]*?margin-block:\s*var\(--monokai-heading-group-spacing\) var\(--monokai-heading-gap-h2\);/.test(files.editor)
      && /\.markdown-source-view\.mod-cm6[\s\S]*?\.HyperMD-header-2[\s\S]*?padding-block:\s*calc\(var\(--monokai-heading-group-spacing\) \/ 3\) var\(--monokai-heading-gap-h2\);/.test(files.editor)
      && /\.heading-collapse-indicator,[\s\S]*?\.heading-anchor[\s\S]*?color:\s*var\(--monokai-heading-anchor-color\);/.test(files.editor),
  ],
  [
    "Style Settings 排版滑杆完整映射到 Obsidian 与标题变量",
    [
      "monokai-readable-line-width",
      "monokai-body-font-size",
      "monokai-code-font-size",
      "monokai-code-line-height",
      "monokai-heading-scale",
      "monokai-paragraph-spacing-value",
    ].every((settingId) => readFileSync(resolve(rootDir, "src/css/style-settings/40-typography.css.md"), "utf8").includes(settingId))
      && /--file-line-width:\s*var\(--monokai-readable-line-width, 45rem\);/.test(files.styleSettings)
      && /--font-text-size:\s*var\(--monokai-body-font-size, 16px\);/.test(files.styleSettings)
      && /--code-size:\s*var\(--monokai-code-font-size, 0\.9em\);/.test(files.styleSettings)
      && /--monokai-codeblock-line-height:\s*var\(--monokai-code-line-height, 1\.55\);/.test(files.styleSettings)
      && /--monokai-heading-size-scale:\s*var\(--monokai-heading-scale, 1\);/.test(files.styleSettings)
      && /--monokai-paragraph-spacing:\s*var\(--monokai-paragraph-spacing-value, 0\.75rem\);/.test(files.styleSettings)
      && /--h1-size:\s*calc\(1\.802em \* var\(--monokai-heading-size-scale\)\);/.test(files.styleSettings)
      && /--h6-size:\s*calc\(0\.889em \* var\(--monokai-heading-size-scale\)\);/.test(files.styleSettings)
      && /\.markdown-rendered[\s\S]*?h1\s*\{[\s\S]*?font-size:\s*var\(--h1-size\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?h6\s*\{[\s\S]*?font-size:\s*var\(--h6-size\);/.test(files.editor)
      && /\.cm-header-1[\s\S]*?font-size:\s*var\(--h1-size\);/.test(files.editor)
      && /\.cm-header-6[\s\S]*?font-size:\s*var\(--h6-size\);/.test(files.editor),
  ],
  [
    "块引用阅读模式与编辑模式共享内容间距变量",
    /--monokai-blockquote-content-gap:\s*1\.25rem;/.test(files.activeVisual)
      && /blockquote[\s\S]*?padding:\s*#\{\$spacing-3\} #\{\$spacing-3\} #\{\$spacing-3\} var\(--monokai-blockquote-content-gap\);/.test(files.activeVisual)
      && /\.cm-quote[\s\S]*?margin-left:\s*var\(--monokai-blockquote-content-gap\);/.test(files.activeVisual),
  ],
  [
    "Style Settings 成功色同步影响块引用边框",
    /--monokai-blockquote-border:\s*var\(--monokai-success-color, var\(--monokai-default-success\)\);/.test(files.styleSettings),
  ],
  [
    "Modal 阴影使用深浅模式变量",
    /body\.theme-dark[\s\S]*?--monokai-modal-shadow:\s*0 18px 50px rgb\(0 0 0 \/ 35%\);/.test(files.editor)
      && /body\.theme-light[\s\S]*?--monokai-modal-shadow:\s*0 16px 36px rgb\(61 61 61 \/ 16%\);/.test(files.editor)
      && /box-shadow:\s*var\(--monokai-modal-shadow\);/.test(files.modals),
  ],
  [
    "Canvas 选中光环跟随强调色变量",
    /--monokai-selection-ring:\s*rgb\(249 38 114 \/ 28%\);/.test(files.editor)
      && /--monokai-selection-ring:\s*rgb\(200 63 103 \/ 22%\);/.test(files.editor)
      && /\.canvas-node\.is-focused[\s\S]*?box-shadow:\s*0 0 0 2px var\(--monokai-selection-ring\);/.test(files.canvas),
  ],
  [
    "紧凑模式同步压缩 Callout 与表格",
    /body\.monokai-syntax-compact[\s\S]*?--callout-padding:\s*0\.9rem;/.test(files.styleSettings)
      && /body\.monokai-syntax-compact[\s\S]*?--callout-content-padding:\s*var\(--spacing-3\) 0 0 0;/.test(files.styleSettings)
      && /body\.monokai-syntax-compact[\s\S]*?--monokai-codeblock-padding-block:\s*0\.75rem;/.test(files.styleSettings)
      && /body\.monokai-syntax-compact[\s\S]*?--monokai-codeblock-padding-inline:\s*0\.75rem;/.test(files.styleSettings)
      && !/body\.monokai-syntax-compact[\s\S]*?\.markdown-rendered pre[\s\S]*?padding:\s*0\.75rem;/.test(files.styleSettings)
      && /body\.monokai-syntax-compact[\s\S]*?\.markdown-rendered th,[\s\S]*?\.markdown-rendered td[\s\S]*?padding:\s*0\.35rem 0\.5rem;/.test(files.styleSettings),
  ],
  [
    "标签圆角使用主题半径系统",
    /\.tag\s*\{[\s\S]*?border-radius:\s*var\(--monokai-tag-radius, var\(--radius-s\)\);/.test(files.base)
      && !/border-radius:\s*999px;/.test(files.base),
  ],
  [
    "链接具有键盘焦点可见状态",
    /a:focus-visible,[\s\S]*?\.markdown-rendered a:focus-visible,[\s\S]*?\.cm-hmd-internal-link:focus-visible[\s\S]*?outline:\s*2px solid var\(--interactive-accent\);/.test(files.editor)
      && /outline-offset:\s*2px;/.test(files.editor),
  ],
  [
    "标签页和 Modal 输入具备克制动效与舒适内边距",
    /--monokai-transition-base:\s*140ms ease;/.test(files.base)
      && /\.workspace-tab-header\s*\{[\s\S]*?transition:[\s\S]*?color var\(--monokai-transition-base\),[\s\S]*?background-color var\(--monokai-transition-base\),[\s\S]*?box-shadow var\(--monokai-transition-base\);/.test(files.tabs)
      && /\.prompt-input,[\s\S]*?\.modal textarea\s*\{[\s\S]*?padding:\s*0\.45rem 0\.6rem;[\s\S]*?transition:[\s\S]*?border-color var\(--monokai-transition-base\),[\s\S]*?box-shadow var\(--monokai-transition-base\);/.test(files.modals),
  ],
  [
    "Amber / VS Code 强调色预设覆盖 tab、列表、命令面板和滚动条",
    /monokai-syntax-accent-amber-vscode/.test(readFileSync(resolve(rootDir, "src/css/style-settings/50-accents.css.md"), "utf8"))
      && /body\.monokai-syntax-accent-amber-vscode[\s\S]*?--monokai-accent-color:\s*#ffa000;/.test(files.styleSettings)
      && /body\.monokai-syntax-accent-amber-vscode[\s\S]*?--monokai-link-color:\s*#ffa000;/.test(files.styleSettings)
      && !/body\.monokai-syntax-accent-amber-vscode\s*\{[^}]*--ribbon-background:\s*#221f22;/.test(files.styleSettings)
      && /body\.theme-dark\.monokai-syntax-accent-amber-vscode[\s\S]*?--ribbon-background:\s*#221f22;/.test(files.styleSettings)
      && /body\.theme-dark\.monokai-syntax-accent-amber-vscode[\s\S]*?--ribbon-background-collapsed:\s*#221f22;/.test(files.styleSettings)
      && /body\.theme-light\.monokai-syntax-accent-amber-vscode[\s\S]*?--ribbon-background:\s*var\(--background-secondary\);/.test(files.styleSettings)
      && /body\.theme-light\.monokai-syntax-accent-amber-vscode[\s\S]*?--ribbon-background-collapsed:\s*var\(--background-secondary\);/.test(files.styleSettings)
      && /--monokai-tab-active-border-color:\s*var\(--interactive-accent\);/.test(files.base)
      && /\.workspace-tab-header\.is-active[\s\S]*?box-shadow:\s*inset 0 -2px 0 var\(--monokai-tab-active-border-color\);/.test(files.tabs)
      && /\.nav-file-title\.is-active[\s\S]*?color:\s*var\(--monokai-selection-foreground, var\(--nav-item-color-active\)\);/.test(files.base)
      && /\.suggestion-item\.is-selected,[\s\S]*?\.suggestion-item\.mod-complex\.is-selected[\s\S]*?color:\s*var\(--monokai-selection-foreground, var\(--text-normal\)\);/.test(files.modals)
      && /::-webkit-scrollbar-thumb:active[\s\S]*?background-color:\s*var\(--monokai-scrollbar-active-background\);/.test(files.base),
  ],
  [
    "Settings 左侧导航跟随浅色/深色主题变量",
    /\.modal\.mod-settings[\s\S]*?\.vertical-tab-header\s*\{[\s\S]*?background-color:\s*var\(--background-secondary\);/.test(files.modals)
      && /\.modal\.mod-settings[\s\S]*?\.vertical-tab-content-container\s*\{[\s\S]*?background-color:\s*var\(--background-primary\);/.test(files.modals)
      && /\.modal\.mod-settings[\s\S]*?\.vertical-tab-nav-item\.is-active\s*\{[\s\S]*?color:\s*var\(--monokai-selection-foreground, var\(--nav-item-color-active\)\);[\s\S]*?background-color:\s*var\(--nav-item-background-active\);/.test(files.modals),
  ],
  [
    "左侧文件导航面板使用更深的 secondary 背景",
    /\.workspace,[\s\S]*?\.workspace-split,[\s\S]*?\.workspace-leaf,[\s\S]*?\.workspace-leaf-content,[\s\S]*?\.workspace-tabs\s*\{[\s\S]*?background-color:\s*var\(--background-primary\);/.test(files.base)
      && !/body::before\s*\{[\s\S]*?--monokai-left-sidebar-strip/.test(files.base)
      && /\.workspace-split\.mod-left-split,[\s\S]*?\.workspace-split\.mod-left-split \.workspace-tabs,[\s\S]*?\.workspace-split\.mod-left-split \.workspace-leaf,[\s\S]*?\.workspace-split\.mod-left-split \.workspace-leaf-content,[\s\S]*?\.workspace-split\.mod-left-split \.view-content,[\s\S]*?\.workspace-split\.mod-left-split \.nav-files-container\s*\{[\s\S]*?background-color:\s*var\(--background-secondary\);/.test(files.base)
      && /\.workspace-ribbon,[\s\S]*?background-color:\s*var\(--background-secondary\);/.test(readFileSync(resolve(rootDir, "src/scss/components/_ribbon.scss"), "utf8"))
      && !/\.workspace-ribbon\s*\{[\s\S]*?z-index:/.test(readFileSync(resolve(rootDir, "src/scss/components/_ribbon.scss"), "utf8"))
      && /--ribbon-background-collapsed:\s*#\{\$color-pro-background-secondary\};/.test(files.base)
      && /--ribbon-background-collapsed:\s*#\{\$color-light-background-secondary\};/.test(files.base)
      && /--ribbon-background-collapsed:\s*#\{\$background-secondary\};/.test(files.styleSettings)
      && /\.workspace-ribbon\.mod-left,[\s\S]*?\.workspace-ribbon\.mod-left\.is-collapsed,[\s\S]*?\.workspace-ribbon\.mod-left \.workspace-ribbon-collapse-btn,[\s\S]*?\.workspace-ribbon\.mod-left \.side-dock-actions,[\s\S]*?\.workspace-ribbon\.mod-left \.side-dock-settings,[\s\S]*?\.side-dock-ribbon\.mod-left\s*\{[\s\S]*?background-color:\s*var\(--background-secondary\);/.test(readFileSync(resolve(rootDir, "src/scss/components/_ribbon.scss"), "utf8"))
      && /\.workspace-ribbon\.mod-left\.is-collapsed\s*\{[\s\S]*?background-color:\s*var\(--ribbon-background-collapsed\);/.test(readFileSync(resolve(rootDir, "src/scss/components/_ribbon.scss"), "utf8"))
      && /\.workspace-tabs\.mod-left,[\s\S]*?\.workspace-tab-header-container\.mod-left,[\s\S]*?\.workspace-tab-header-container-inner\.mod-left,[\s\S]*?\.workspace-tab-container\.mod-left,[\s\S]*?\.workspace-tab-header\.mod-left\s*\{[\s\S]*?background-color:\s*var\(--background-secondary\);/.test(files.tabs)
      && /\.workspace-split\.mod-left-split \.workspace-tab-header-container,/.test(files.tabs)
      && /\.workspace-sidedock\.mod-left,/.test(files.tabs)
      && /\.workspace-sidedock\.mod-left \.workspace-tab-container,/.test(files.tabs)
      && /\.mod-left-split,/.test(files.tabs)
      && /\.mod-left \.workspace-tab-container\s*\{/.test(files.tabs)
      && /\.workspace-split\.mod-left-split \.workspace-tab-header-container,[\s\S]*?\.mod-left \.workspace-tab-container\s*\{[\s\S]*?background-color:\s*var\(--background-secondary\);/.test(files.tabs)
      && /\.workspace-split\.mod-left-split \.workspace-tab-header\.is-active\s*\{[\s\S]*?background-color:\s*var\(--background-secondary\);/.test(files.tabs),
  ],
  [
    "Style Settings 搜索框为图标预留文字内边距",
    /\.modal\.mod-settings[\s\S]*?\.setting-item-name \.search-input-container,[\s\S]*?\.style-settings-container \.search-input-container\s*\{[\s\S]*?max-width:\s*23rem;/.test(files.modals)
      && /\.modal\.mod-settings[\s\S]*?\.setting-item-name \.search-input-container::before,[\s\S]*?\.style-settings-container \.search-input-container::before\s*\{[\s\S]*?inset-inline-start:\s*0\.75rem;/.test(files.modals)
      && /\.modal\.mod-settings[\s\S]*?\.setting-item-name \.search-input-container input,[\s\S]*?\.style-settings-container \.search-input-container input\[type="search"\]\s*\{[\s\S]*?min-height:\s*2\.25rem;[\s\S]*?padding-inline:\s*2\.15rem 0\.85rem;/.test(files.modals),
  ],
  [
    "Style Settings 可隐藏右下角同步按钮且限定状态栏范围",
    /monokai-syntax-hide-sync-status-button/.test(readFileSync(resolve(rootDir, "src/css/style-settings/30-icons.css.md"), "utf8"))
      && /body\.monokai-syntax-hide-sync-status-button[\s\S]*?\.status-bar/.test(files.base)
      && /\.status-bar-item\.plugin-sync/.test(files.base)
      && /\.status-bar-item\.mod-sync/.test(files.base)
      && /\.status-bar-item\[aria-label\*="Sync" i\]/.test(files.base)
      && /\.status-bar-item\[title\*="同步"\]/.test(files.base)
      && !/body\.monokai-syntax-hide-sync-status-button[\s\S]*?\.status-bar\s*\{[\s\S]*?display:\s*none;/.test(files.base),
  ],
  [
    "表格表头具备独立背景与文字层级",
    /--monokai-table-header-background:\s*rgb\(248 248 242 \/ 6%\);/.test(files.editor)
      && /--monokai-table-header-background:\s*rgb\(61 61 61 \/ 6%\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?th\s*\{(?=[\s\S]*?color:\s*var\(--text-normal\);)(?=[\s\S]*?background-color:\s*var\(--monokai-table-header-background\);)[\s\S]*?\}/.test(files.editor),
  ],
  [
    "API 参数表具备名称、类型、默认值和必填语义变量",
    /--monokai-table-api-name-color:\s*var\(--link-color\);/.test(files.editor)
      && /--monokai-table-api-type-color:\s*var\(--code-type\);/.test(files.editor)
      && /--monokai-table-api-default-color:\s*var\(--code-value\);/.test(files.editor)
      && /--monokai-table-api-required-color:\s*var\(--text-accent\);/.test(files.editor)
      && /--monokai-table-cell-padding:\s*0\.55rem 0\.7rem;/.test(files.editor)
      && /--monokai-table-row-hover-background:\s*var\(--background-modifier-hover\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?table\s*\{[\s\S]*?width:\s*100%;[\s\S]*?border-collapse:\s*separate;/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?th,[\s\S]*?td\s*\{[\s\S]*?padding:\s*var\(--monokai-table-cell-padding\);[\s\S]*?vertical-align:\s*top;/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?tbody tr:hover[\s\S]*?background-color:\s*var\(--monokai-table-row-hover-background\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?td:first-child[\s\S]*?color:\s*var\(--monokai-table-api-name-color\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?td:nth-child\(2\) code[\s\S]*?color:\s*var\(--monokai-table-api-type-color\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?td:nth-child\(3\) code[\s\S]*?color:\s*var\(--monokai-table-api-default-color\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?td:nth-child\(4\) strong[\s\S]*?color:\s*var\(--monokai-table-api-required-color\);/.test(files.editor),
  ],
  [
    "Mermaid、Math 与 Dataview 容器复用主题 surface",
    /--monokai-plugin-surface-background:\s*var\(--background-secondary\);/.test(files.editor)
      && /--monokai-plugin-surface-border:\s*var\(--background-modifier-border\);/.test(files.editor)
      && /--monokai-plugin-surface-padding:\s*#\{\$spacing-4\};/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?\.mermaid\s*\{[\s\S]*?background-color:\s*var\(--monokai-plugin-surface-background\);[\s\S]*?border:\s*1px solid var\(--monokai-plugin-surface-border\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?\.math,[\s\S]*?\.math-block\s*\{[\s\S]*?overflow-x:\s*auto;[\s\S]*?background-color:\s*var\(--monokai-plugin-surface-background\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?\.math-inline[\s\S]*?color:\s*var\(--monokai-inline-code-color\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?\.block-language-dataview,[\s\S]*?\.dataview\s*\{[\s\S]*?background-color:\s*var\(--monokai-plugin-surface-background\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?\.dataview table[\s\S]*?width:\s*100%;/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?\.dataview\.task-list-item,[\s\S]*?\.dataview \.task-list-item[\s\S]*?color:\s*var\(--monokai-task-open-color\);/.test(files.editor),
  ],
  [
    "深色代码 token 使用 Monokai Pro palette",
    /\.theme-dark[\s\S]*?--background-primary:\s*#\{\$color-pro-background-primary\};/.test(files.base)
      && /\.theme-dark[\s\S]*?--code-keyword:\s*#\{\$color-pro-magenta\};/.test(files.base)
      && /\.theme-dark[\s\S]*?--code-operator:\s*#\{\$color-pro-orange\};/.test(files.base)
      && /\.theme-dark[\s\S]*?--code-string:\s*#\{\$color-pro-yellow\};/.test(files.base)
      && /\.theme-dark[\s\S]*?--code-function:\s*#\{\$color-pro-green\};/.test(files.base)
      && /\.theme-dark[\s\S]*?--code-property:\s*#\{\$color-pro-cyan\};/.test(files.base)
      && /\.theme-dark[\s\S]*?--code-value:\s*#\{\$color-pro-purple\};/.test(files.base),
  ],
  [
    "CodeMirror 扩展语法 token 覆盖类型、类、内建、属性、meta 与错误",
    /\.theme-dark[\s\S]*?--code-type:/.test(files.base)
      && /\.theme-light[\s\S]*?--code-type:/.test(files.base)
      && /\.cm-s-obsidian[\s\S]*?span\.cm-type,[\s\S]*?span\.cm-class[\s\S]*?color:\s*var\(--code-type\);/.test(files.editor)
      && /\.cm-s-obsidian[\s\S]*?span\.cm-builtin[\s\S]*?color:\s*var\(--code-builtin\);/.test(files.editor)
      && /\.cm-s-obsidian[\s\S]*?span\.cm-attribute[\s\S]*?color:\s*var\(--code-property\);/.test(files.editor)
      && /\.cm-s-obsidian[\s\S]*?span\.cm-meta[\s\S]*?color:\s*var\(--code-meta\);/.test(files.editor)
      && /\.cm-s-obsidian[\s\S]*?span\.cm-error[\s\S]*?color:\s*var\(--code-error\);/.test(files.editor),
  ],
  [
    "列表符号阅读模式与编辑模式共享颜色变量",
    /\.markdown-rendered[\s\S]*?ul > li::marker,[\s\S]*?ol > li::marker[\s\S]*?color:\s*var\(--list-marker-color\);/.test(files.editor)
      && /\.cm-formatting-list[\s\S]*?color:\s*var\(--list-marker-color\);/.test(files.editor),
  ],
  [
    "嵌套列表具备学习笔记所需的缩进与段落节奏变量",
    /--monokai-list-indent:\s*1\.5em;/.test(files.editor)
      && /--monokai-list-item-spacing:\s*0\.35rem;/.test(files.editor)
      && /--monokai-nested-list-spacing:\s*0\.25rem;/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?ul,[\s\S]*?ol\s*\{[\s\S]*?padding-inline-start:\s*var\(--monokai-list-indent\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?li\s*\{[\s\S]*?margin-block:\s*var\(--monokai-list-item-spacing\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?li > ul,[\s\S]*?li > ol\s*\{[\s\S]*?margin-block:\s*var\(--monokai-nested-list-spacing\) 0;/.test(files.editor)
      && /\.cm-formatting-list[\s\S]*?color:\s*var\(--list-marker-color\);/.test(files.editor),
  ],
  [
    "已完成任务阅读模式与编辑模式共享弱化文本变量",
    /\.markdown-rendered[\s\S]*?\.task-list-item\.is-checked[\s\S]*?color:\s*var\(--monokai-task-done-color\);/.test(files.editor)
      && /\.HyperMD-task-line\[data-task="x"\][\s\S]*?color:\s*var\(--monokai-task-done-color\);/.test(files.editor)
      && /\.HyperMD-task-line\[data-task="X"\][\s\S]*?color:\s*var\(--monokai-task-done-color\);/.test(files.editor),
  ],
  [
    "编辑模式代码块使用阅读模式代码块背景和等宽字体",
    /--monokai-codeblock-background:\s*var\(--code-background\);/.test(files.editor)
      && /--monokai-code-font-family:\s*var\(--font-monospace\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?pre\s*\{[\s\S]*?background-color:\s*var\(--monokai-codeblock-background\);[\s\S]*?font-family:\s*var\(--monokai-code-font-family\);/.test(files.editor)
      && /\.HyperMD-codeblock[\s\S]*?background-color:\s*var\(--monokai-codeblock-background\);[\s\S]*?font-family:\s*var\(--monokai-code-font-family\);/.test(files.editor),
  ],
  [
    "删除线阅读模式与编辑模式共享弱化颜色",
    /--monokai-strikethrough-color:\s*var\(--text-muted\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?del,[\s\S]*?s\s*\{[\s\S]*?color:\s*var\(--monokai-strikethrough-color\);[\s\S]*?text-decoration-color:\s*var\(--monokai-strikethrough-color\);/.test(files.editor)
      && /\.cm-strikethrough[\s\S]*?color:\s*var\(--monokai-strikethrough-color\);[\s\S]*?text-decoration-color:\s*var\(--monokai-strikethrough-color\);/.test(files.editor),
  ],
  [
    "编辑模式 Markdown 格式符号统一弱化",
    /--monokai-formatting-marker-color:\s*var\(--text-faint\);/.test(files.editor)
      && /\.cm-formatting-strong,[\s\S]*?\.cm-formatting-em,[\s\S]*?\.cm-formatting-strikethrough,[\s\S]*?\.cm-formatting-code,[\s\S]*?\.cm-formatting-highlight[\s\S]*?color:\s*var\(--monokai-formatting-marker-color\);/.test(files.editor),
  ],
  [
    "高亮阅读模式与编辑模式共享圆角和横向内边距",
    /--monokai-highlight-radius:\s*var\(--radius-s\);/.test(files.editor)
      && /--monokai-highlight-padding-inline:\s*0\.12em;/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?mark\s*\{[\s\S]*?border-radius:\s*var\(--monokai-highlight-radius\);[\s\S]*?padding-inline:\s*var\(--monokai-highlight-padding-inline\);/.test(files.editor)
      && /\.cm-highlight[\s\S]*?border-radius:\s*var\(--monokai-highlight-radius\);[\s\S]*?padding-inline:\s*var\(--monokai-highlight-padding-inline\);/.test(files.editor),
  ],
  [
    "水平分割线阅读模式与编辑模式共享颜色和间距变量",
    /--monokai-hr-color:\s*var\(--background-modifier-border\);/.test(files.editor)
      && /--monokai-hr-thickness:\s*1px;/.test(files.editor)
      && /--monokai-hr-spacing:\s*#\{\$spacing-5\};/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?hr\s*\{[\s\S]*?border-top:\s*var\(--monokai-hr-thickness\) solid var\(--monokai-hr-color\);[\s\S]*?margin-block:\s*var\(--monokai-hr-spacing\);/.test(files.editor)
      && /\.HyperMD-hr[\s\S]*?color:\s*var\(--monokai-formatting-marker-color\);[\s\S]*?padding-block:\s*calc\(var\(--monokai-hr-spacing\) \/ 2\);/.test(files.editor)
      && /\.cm-hr[\s\S]*?color:\s*var\(--monokai-hr-color\);/.test(files.editor),
  ],
  [
    "脚注引用阅读模式与编辑模式共享链接层级",
    /--monokai-footnote-color:\s*var\(--link-color\);/.test(files.editor)
      && /--monokai-footnote-marker-color:\s*var\(--text-faint\);/.test(files.editor)
      && /--monokai-footnote-font-size:\s*0\.85em;/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?\.footnote-ref,[\s\S]*?\.footnote-link[\s\S]*?color:\s*var\(--monokai-footnote-color\);[\s\S]*?font-size:\s*var\(--monokai-footnote-font-size\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?\.footnote-backref[\s\S]*?color:\s*var\(--monokai-footnote-marker-color\);/.test(files.editor)
      && /\.cm-footref[\s\S]*?color:\s*var\(--monokai-footnote-color\);[\s\S]*?font-size:\s*var\(--monokai-footnote-font-size\);/.test(files.editor)
      && /\.cm-formatting-footref[\s\S]*?color:\s*var\(--monokai-footnote-marker-color\);/.test(files.editor),
  ],
  [
    "图片与编辑模式嵌入共享边框圆角背景",
    /--monokai-media-radius:\s*var\(--radius-m\);/.test(files.editor)
      && /--monokai-media-border-color:\s*var\(--background-modifier-border\);/.test(files.editor)
      && /--monokai-media-background:\s*var\(--background-secondary\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?img,[\s\S]*?\.image-embed\s*\{[\s\S]*?background-color:\s*var\(--monokai-media-background\);[\s\S]*?border:\s*1px solid var\(--monokai-media-border-color\);[\s\S]*?border-radius:\s*var\(--monokai-media-radius\);/.test(files.editor)
      && /\.markdown-source-view\.mod-cm6[\s\S]*?\.image-embed,[\s\S]*?\.cm-embed-block\s*\{[\s\S]*?background-color:\s*var\(--monokai-media-background\);[\s\S]*?border:\s*1px solid var\(--monokai-media-border-color\);[\s\S]*?border-radius:\s*var\(--monokai-media-radius\);/.test(files.editor),
  ],
  [
    "标签阅读模式与编辑模式共享胶囊样式变量",
    /--monokai-tag-color:\s*var\(--link-color\);/.test(files.editor)
      && /--monokai-tag-background:\s*var\(--background-secondary\);/.test(files.editor)
      && /--monokai-tag-border-color:\s*var\(--background-modifier-border\);/.test(files.editor)
      && /--monokai-tag-radius:\s*var\(--radius-s\);/.test(files.editor)
      && /\.tag\s*\{[\s\S]*?color:\s*var\(--monokai-tag-color, var\(--link-color\)\);[\s\S]*?background-color:\s*var\(--monokai-tag-background, var\(--background-secondary\)\);[\s\S]*?border:\s*1px solid var\(--monokai-tag-border-color, var\(--background-modifier-border\)\);[\s\S]*?border-radius:\s*var\(--monokai-tag-radius, var\(--radius-s\)\);/.test(files.base)
      && /\.cm-hashtag[\s\S]*?color:\s*var\(--monokai-tag-color\);[\s\S]*?background-color:\s*var\(--monokai-tag-background\);[\s\S]*?border:\s*1px solid var\(--monokai-tag-border-color\);[\s\S]*?border-radius:\s*var\(--monokai-tag-radius\);/.test(files.editor),
  ],
  [
    "链接阅读模式与编辑模式共享装饰和格式符号变量",
    /--monokai-link-decoration-color:\s*var\(--link-color\);/.test(files.editor)
      && /--monokai-link-decoration-thickness:\s*1px;/.test(files.editor)
      && /a,[\s\S]*?\.markdown-rendered a,[\s\S]*?\.cm-hmd-internal-link,[\s\S]*?\.cm-link,[\s\S]*?\.cm-url[\s\S]*?color:\s*var\(--link-color\);[\s\S]*?text-decoration-color:\s*var\(--monokai-link-decoration-color\);[\s\S]*?text-decoration-thickness:\s*var\(--monokai-link-decoration-thickness\);/.test(files.editor)
      && /\.cm-formatting-link[\s\S]*?color:\s*var\(--monokai-formatting-marker-color\);/.test(files.editor),
  ],
  [
    "段落阅读模式与编辑模式共享行高和段落节奏变量",
    /--monokai-paragraph-line-height:\s*var\(--line-height-normal\);/.test(files.editor)
      && /--monokai-paragraph-spacing:\s*var\(--monokai-paragraph-spacing-value, #\{\$spacing-3\}\);/.test(files.editor)
      && /--p-spacing:\s*var\(--monokai-paragraph-spacing\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?p\s*\{[\s\S]*?line-height:\s*var\(--monokai-paragraph-line-height\);[\s\S]*?margin-block:\s*0 var\(--monokai-paragraph-spacing\);/.test(files.editor)
      && /\.markdown-source-view\.mod-cm6[\s\S]*?\.cm-line\s*\{[\s\S]*?line-height:\s*var\(--monokai-paragraph-line-height\);/.test(files.editor)
      && /\.HyperMD-paragraph[\s\S]*?padding-block-end:\s*calc\(var\(--monokai-paragraph-spacing\) \/ 3\);/.test(files.editor),
  ],
  [
    "Markdown 表格源码在编辑模式具备等宽和分隔符层级",
    /--monokai-table-source-background:\s*var\(--background-secondary\);/.test(files.editor)
      && /--monokai-table-source-font-family:\s*var\(--monokai-code-font-family\);/.test(files.editor)
      && /--monokai-table-source-separator-color:\s*var\(--text-faint\);/.test(files.editor)
      && /\.HyperMD-table-row[\s\S]*?font-family:\s*var\(--monokai-table-source-font-family\);[\s\S]*?background-color:\s*var\(--monokai-table-source-background\);/.test(files.editor)
      && /\.cm-hmd-table-sep,[\s\S]*?\.cm-hmd-table-align,[\s\S]*?\.cm-formatting-table[\s\S]*?color:\s*var\(--monokai-table-source-separator-color\);/.test(files.editor)
      && /\.cm-table[\s\S]*?color:\s*var\(--text-normal\);/.test(files.editor),
  ],
  [
    "Callout 编辑态标题和源码标记贴近阅读模式层级",
    /--monokai-callout-title-gap:\s*var\(--spacing-2\);/.test(files.activeVisual)
      && /--monokai-callout-source-marker-color:\s*var\(--text-faint\);/.test(files.activeVisual)
      && /\.callout-title,[\s\S]*?\.cm-callout-title[\s\S]*?gap:\s*var\(--monokai-callout-title-gap\);/.test(files.activeVisual)
      && /body \.markdown-source-view\.mod-cm6 \.cm-callout-content[\s\S]*?color:\s*var\(--text-normal\);/.test(files.activeVisual)
      && /body \.markdown-source-view\.mod-cm6 \.cm-formatting-callout,[\s\S]*?body \.markdown-source-view\.mod-cm6 \.cm-callout \.cm-formatting[\s\S]*?color:\s*var\(--monokai-callout-source-marker-color\);/.test(files.activeVisual),
  ],
  [
    "代码学习 Callout 语义在阅读模式与编辑模式都有颜色和图标映射",
    [
      "concept",
      "syntax",
      "api",
      "debug",
      "pitfall",
      "exercise",
      "answer",
      "source",
      "output",
      "terminal",
    ].every((calloutName) => {
      const calloutPattern = new RegExp(`\\.callout\\[data-callout="${calloutName}"\\]`);
      const iconPattern = new RegExp(`\\.callout\\[data-callout="${calloutName}"\\] \\.callout-icon::before[\\s\\S]*?content:`);

      return calloutPattern.test(files.activeVisual) && iconPattern.test(files.activeVisual);
    }),
  ],
  [
    "块引用多行和嵌套层级在阅读模式与编辑模式收敛",
    /--monokai-blockquote-nested-gap:\s*#\{\$spacing-3\};/.test(files.activeVisual)
      && /body \.markdown-rendered blockquote blockquote[\s\S]*?margin-block:\s*var\(--monokai-blockquote-nested-gap\);/.test(files.activeVisual)
      && /body \.markdown-source-view\.mod-cm6 \.cm-line\.HyperMD-quote \+ \.cm-line\.HyperMD-quote,[\s\S]*?body \.markdown-source-view\.mod-cm6 \.HyperMD-quote \+ \.HyperMD-quote[\s\S]*?border-start-start-radius:\s*0;[\s\S]*?border-end-start-radius:\s*0;/.test(files.activeVisual)
      && /\.cm-quote-2,[\s\S]*?\.cm-quote-3[\s\S]*?color:\s*var\(--text-normal\);/.test(files.activeVisual),
  ],
  [
    "代码块阅读模式与编辑模式共享边框圆角并弱化 fence token",
    /--monokai-codeblock-border-color:\s*var\(--background-modifier-border\);/.test(files.editor)
      && /--monokai-codeblock-radius:\s*var\(--radius-m\);/.test(files.editor)
      && /--monokai-codeblock-margin-block:\s*#\{\$spacing-4\};/.test(files.editor)
      && /--monokai-codeblock-padding:\s*#\{\$spacing-4\};/.test(files.editor)
      && /--monokai-codeblock-padding-block:\s*0\.75rem;/.test(files.editor)
      && /--monokai-codeblock-padding-inline:\s*1rem;/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?pre\s*\{[\s\S]*?border:\s*1px solid var\(--monokai-codeblock-border-color\);[\s\S]*?border-radius:\s*var\(--monokai-codeblock-radius\);[\s\S]*?margin-block:\s*var\(--monokai-codeblock-margin-block\);[\s\S]*?padding:\s*var\(--monokai-codeblock-padding-block\) var\(--monokai-codeblock-padding-inline\);/.test(files.editor)
      && /\.HyperMD-codeblock[\s\S]*?background-color:\s*var\(--monokai-codeblock-background\);[\s\S]*?font-family:\s*var\(--monokai-code-font-family\);[\s\S]*?padding-inline:\s*var\(--monokai-codeblock-padding-inline\);/.test(files.editor)
      && /\.cm-line\.HyperMD-codeblock:has\(\.cm-hmd-codeblock-begin\)[\s\S]*?padding-block-start:\s*var\(--monokai-codeblock-padding-block\);/.test(files.editor)
      && /\.cm-line\.HyperMD-codeblock:has\(\.cm-hmd-codeblock-end\)[\s\S]*?padding-block-end:\s*var\(--monokai-codeblock-padding-block\);/.test(files.editor)
      && /\.cm-formatting-code-block,[\s\S]*?\.cm-hmd-codeblock-begin,[\s\S]*?\.cm-hmd-codeblock-end[\s\S]*?color:\s*var\(--monokai-formatting-marker-color\);/.test(files.editor),
  ],
  [
    "代码块具备 Monokai Pro 编辑器 surface 变量与滚动状态",
    /--monokai-codeblock-header-height:\s*1\.75rem;/.test(files.editor)
      && /--monokai-codeblock-shadow:\s*none;/.test(files.editor)
      && !/--monokai-codeblock-shadow:\s*0\s/.test(files.editor)
      && /--monokai-codeblock-language-color:\s*var\(--text-faint\);/.test(files.editor)
      && /--monokai-codeblock-line-height:\s*var\(--monokai-code-line-height, 1\.55\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?pre\s*\{[\s\S]*?box-shadow:\s*var\(--monokai-codeblock-shadow\);[\s\S]*?line-height:\s*var\(--monokai-codeblock-line-height\);[\s\S]*?overflow-x:\s*auto;/.test(files.editor)
      && /\.HyperMD-codeblock[\s\S]*?line-height:\s*var\(--monokai-codeblock-line-height\);/.test(files.editor),
  ],
  [
    "编辑模式具备 active line、selection、cursor、gutter 与 bracket match 状态",
    /--monokai-editor-active-line-background:/.test(files.editor)
      && /--monokai-editor-selection-background:/.test(files.editor)
      && /--monokai-editor-cursor-color:/.test(files.editor)
      && /--monokai-editor-gutter-background:/.test(files.editor)
      && /\.cm-active[\s\S]*?background-color:\s*var\(--monokai-editor-active-line-background\);/.test(files.editor)
      && /\.cm-selectionBackground[\s\S]*?background-color:\s*var\(--monokai-editor-selection-background\);/.test(files.editor)
      && /\.cm-cursor[\s\S]*?border-left-color:\s*var\(--monokai-editor-cursor-color\);/.test(files.editor)
      && /\.cm-gutters[\s\S]*?background-color:\s*var\(--monokai-editor-gutter-background\);/.test(files.editor)
      && /\.cm-matchingBracket[\s\S]*?background-color:\s*var\(--monokai-editor-bracket-match-background\);/.test(files.editor),
  ],
  [
    "代码块选中态与当前行使用代码块专用变量",
    /--monokai-codeblock-active-line-background:\s*var\(--background-modifier-hover\);/.test(files.editor)
      && /--monokai-codeblock-active-line-border:\s*var\(--interactive-accent\);/.test(files.editor)
      && /--monokai-codeblock-selection-background:\s*rgb\(120 220 232 \/ 32%\);/.test(files.editor)
      && /body\.theme-dark[\s\S]*?--monokai-codeblock-active-line-background:\s*#\{\$color-pro-hover\};/.test(files.editor)
      && /body\.theme-dark[\s\S]*?--monokai-codeblock-selection-background:\s*#344349;/.test(files.editor)
      && /body\.theme-light[\s\S]*?--monokai-codeblock-background:\s*#eee6d8;/.test(files.editor)
      && /body\.theme-light[\s\S]*?--monokai-codeblock-border-color:\s*#c6b9a6;/.test(files.editor)
      && /body\.theme-light[\s\S]*?--monokai-codeblock-active-line-background:\s*#e3d4bf;/.test(files.editor)
      && /body\.theme-light[\s\S]*?--monokai-codeblock-active-line-border:\s*#\{\$color-light-cyan\};/.test(files.editor)
      && /body\.theme-light[\s\S]*?--monokai-codeblock-selection-background:\s*#c9e8ee;/.test(files.editor)
      && /\.cm-line\.HyperMD-codeblock\.cm-active[\s\S]*?background-color:\s*var\(--monokai-codeblock-active-line-background\);/.test(files.editor)
      && /\.cm-line\.HyperMD-codeblock\.cm-active[\s\S]*?box-shadow:\s*inset 2px 0 0 var\(--monokai-codeblock-active-line-border\);/.test(files.editor)
      && /\.cm-line\.HyperMD-codeblock[\s\S]*?\.cm-selectionBackground[\s\S]*?background-color:\s*var\(--monokai-codeblock-selection-background\);/.test(files.editor)
      && /pre[\s\S]*?::selection[\s\S]*?background-color:\s*var\(--monokai-codeblock-selection-background\);/.test(files.editor)
      && /\.cm-line\.HyperMD-codeblock[\s\S]*?&::selection[\s\S]*?background-color:\s*var\(--monokai-codeblock-selection-background\);/.test(files.editor),
  ],
  [
    "浅色行内代码使用增强背景和字重",
    /--monokai-inline-code-font-weight:\s*500;/.test(files.editor)
      && /body\.theme-light[\s\S]*?--monokai-inline-code-color:\s*#0b5262;/.test(files.editor)
      && /body\.theme-light[\s\S]*?--monokai-inline-code-background:\s*rgb\(20 116 138 \/ 16%\);/.test(files.editor)
      && /body\.theme-light[\s\S]*?--monokai-inline-code-font-weight:\s*600;/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?code\s*\{[\s\S]*?font-family:\s*var\(--monokai-code-font-family\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?code\s*\{[\s\S]*?font-weight:\s*var\(--monokai-inline-code-font-weight\);/.test(files.editor)
      && /\.cm-inline-code[\s\S]*?font-family:\s*var\(--monokai-code-font-family\);/.test(files.editor)
      && /\.cm-inline-code[\s\S]*?font-weight:\s*var\(--monokai-inline-code-font-weight\);/.test(files.editor),
  ],
  [
    "Style Settings 选中项与下拉控件使用主题 surface",
    /--monokai-settings-item-background:/.test(files.modals)
      && /--monokai-settings-item-border:/.test(files.modals)
      && /--monokai-settings-selected-background:/.test(files.modals)
      && /body\.theme-dark[\s\S]*?--monokai-settings-item-background:\s*rgb\(248 248 242 \/ 4%\);/.test(files.modals)
      && /\.modal\.mod-settings[\s\S]*?\.setting-item[\s\S]*?background-color:\s*transparent;/.test(files.modals)
      && /\.modal\.mod-settings[\s\S]*?\.setting-item-description,[\s\S]*?\.setting-item-info[\s\S]*?color:\s*var\(--monokai-settings-item-description\);/.test(files.modals)
      && /\.style-settings-container[\s\S]*?\.setting-item[\s\S]*?background-color:\s*var\(--monokai-settings-item-background\);/.test(files.modals)
      && /\.style-settings-container[\s\S]*?\.setting-item\.is-selected,[\s\S]*?\.setting-item:hover[\s\S]*?background-color:\s*var\(--monokai-settings-selected-background\);/.test(files.modals)
      && /\.style-settings-container[\s\S]*?select,[\s\S]*?\.dropdown[\s\S]*?background-color:\s*var\(--monokai-settings-control-background\);/.test(files.modals),
  ],
  [
    "附件与内部嵌入扩展共享媒体容器变量",
    /--monokai-embed-padding:\s*#\{\$spacing-3\};/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?\.file-embed,[\s\S]*?\.pdf-embed,[\s\S]*?\.audio-embed,[\s\S]*?\.video-embed,[\s\S]*?\.internal-embed\s*\{[\s\S]*?background-color:\s*var\(--monokai-media-background\);[\s\S]*?border:\s*1px solid var\(--monokai-media-border-color\);[\s\S]*?border-radius:\s*var\(--monokai-media-radius\);[\s\S]*?padding:\s*var\(--monokai-embed-padding\);/.test(files.editor)
      && /\.markdown-source-view\.mod-cm6[\s\S]*?\.file-embed,[\s\S]*?\.pdf-embed,[\s\S]*?\.audio-embed,[\s\S]*?\.video-embed,[\s\S]*?\.internal-embed,[\s\S]*?\.cm-embed-block\s*\{[\s\S]*?background-color:\s*var\(--monokai-media-background\);[\s\S]*?border:\s*1px solid var\(--monokai-media-border-color\);[\s\S]*?border-radius:\s*var\(--monokai-media-radius\);[\s\S]*?padding:\s*var\(--monokai-embed-padding\);/.test(files.editor),
  ],
  [
    "8 种任务状态阅读模式与编辑模式共享语义颜色",
    /--monokai-task-open-color:\s*var\(--text-normal\);/.test(files.editor)
      && /--monokai-task-forward-color:\s*var\(--text-accent\);/.test(files.editor)
      && /--monokai-task-cancelled-color:\s*var\(--text-faint\);/.test(files.editor)
      && /--monokai-task-question-color:\s*var\(--link-color\);/.test(files.editor)
      && /--monokai-task-important-color:\s*var\(--monokai-spectrum-orange, var\(--text-accent\)\);/.test(files.editor)
      && /--monokai-task-in-progress-color:\s*var\(--monokai-spectrum-cyan, var\(--link-color\)\);/.test(files.editor)
      && /--monokai-task-starred-color:\s*var\(--monokai-spectrum-yellow, var\(--text-accent\)\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?\.task-list-item\[data-task=" "\],[\s\S]*?\.task-list-item\[data-task=""\][\s\S]*?color:\s*var\(--monokai-task-open-color\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?\.task-list-item\[data-task="x"\],[\s\S]*?\.task-list-item\[data-task="X"\],[\s\S]*?\.task-list-item\.is-checked[\s\S]*?color:\s*var\(--monokai-task-done-color\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?\.task-list-item\[data-task=">"\][\s\S]*?color:\s*var\(--monokai-task-forward-color\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?\.task-list-item\[data-task="-"\][\s\S]*?color:\s*var\(--monokai-task-cancelled-color\);[\s\S]*?text-decoration-line:\s*line-through;/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?\.task-list-item\[data-task="\?"\][\s\S]*?color:\s*var\(--monokai-task-question-color\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?\.task-list-item\[data-task="!"\][\s\S]*?color:\s*var\(--monokai-task-important-color\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?\.task-list-item\[data-task="\/"\][\s\S]*?color:\s*var\(--monokai-task-in-progress-color\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?\.task-list-item\[data-task="\*"\][\s\S]*?color:\s*var\(--monokai-task-starred-color\);/.test(files.editor)
      && /\.markdown-source-view\.mod-cm6[\s\S]*?\.HyperMD-task-line\[data-task=" "\],[\s\S]*?\.HyperMD-task-line\[data-task=""\][\s\S]*?color:\s*var\(--monokai-task-open-color\);/.test(files.editor)
      && /\.HyperMD-task-line\[data-task="x"\],[\s\S]*?\.HyperMD-task-line\[data-task="X"\][\s\S]*?color:\s*var\(--monokai-task-done-color\);/.test(files.editor)
      && /\.HyperMD-task-line\[data-task=">"\][\s\S]*?color:\s*var\(--monokai-task-forward-color\);/.test(files.editor)
      && /\.HyperMD-task-line\[data-task="-"\][\s\S]*?color:\s*var\(--monokai-task-cancelled-color\);[\s\S]*?text-decoration-line:\s*line-through;/.test(files.editor)
      && /\.HyperMD-task-line\[data-task="\?"\][\s\S]*?color:\s*var\(--monokai-task-question-color\);/.test(files.editor)
      && /\.HyperMD-task-line\[data-task="!"\][\s\S]*?color:\s*var\(--monokai-task-important-color\);/.test(files.editor)
      && /\.HyperMD-task-line\[data-task="\/"\][\s\S]*?color:\s*var\(--monokai-task-in-progress-color\);/.test(files.editor)
      && /\.HyperMD-task-line\[data-task="\*"\][\s\S]*?color:\s*var\(--monokai-task-starred-color\);/.test(files.editor),
  ],
];

let hasFailure = false;

for (const [label, passed] of checks) {
  console.log(`${label}: ${passed ? "通过" : "失败"}`);

  if (!passed) {
    hasFailure = true;
  }
}

if (hasFailure) {
  process.exitCode = 1;
}
