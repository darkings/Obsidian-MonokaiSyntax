import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { readCalloutScss, readEditorScss } from "./scss-source.js";

const rootDir = resolve(import.meta.dirname, "..");
const paths = {
  base: resolve(rootDir, "src/scss/_base.scss"),
  editor: resolve(rootDir, "src/scss/components/_editor.scss"),
  lists: resolve(rootDir, "src/scss/components/_lists.scss"),
  componentIndex: resolve(rootDir, "src/scss/components/_index.scss"),
  generatedIcons: resolve(rootDir, "src/scss/components/_file-icons.generated.scss"),
  iconGenerator: resolve(rootDir, "scripts/generate-icon-theme.js"),
  packageJson: resolve(rootDir, "package.json"),
};

const files = Object.fromEntries(
  Object.entries(paths).map(([key, path]) => [
    key,
    existsSync(path) ? readFileSync(path, "utf8") : "",
  ]),
);
files.editor = readEditorScss(rootDir);
files.callout = readCalloutScss(rootDir);

const packageJson = JSON.parse(files.packageJson);

function mappingContainsAll(source, semantic, types) {
  const values = source.match(new RegExp(`^\\s*${semantic}:\\s*\\(([^)]*)\\)`, "m"))?.[1] ?? "";
  return types.every((type) => new RegExp(`\\b${type}\\b`).test(values));
}

const checks = [
  [
    "Active 视觉验证脚本已接入 release:pack",
    packageJson.scripts?.["verify:source"]?.includes("npm run verify:active-visual")
      && (
        packageJson.scripts?.["release:pack"]?.includes("npm run verify:active-visual")
        || packageJson.scripts?.["release:pack"]?.includes("npm run verify")
      ),
  ],
  [
    "视觉组件按 editor → callout → lists 顺序注册",
    /@forward "editor";[\s\S]*?@forward "callout";[\s\S]*?@forward "lists";/.test(files.componentIndex)
      && !/MONOKAI SYNTAX CSS LOADED/.test(files.base),
  ],
  [
    "视觉组件不保留诊断描边",
    !/box-shadow:\s*inset 0 0 0 3px/.test(files.callout)
      && !/box-shadow:[^;]*#66d9ef/.test(files.callout),
  ],
  [
    "文件夹不再生成额外 ::before 图标",
    !/\.nav-folder-title::before/.test(files.generatedIcons)
      && !/\.nav-folder-title::before/.test(files.iconGenerator),
  ],
  [
    "导航折叠指示器由 Obsidian 默认图标承担第一层",
    /\.nav-folder-collapse-indicator[\s\S]*?color:\s*var\(--icon-color\);/.test(files.base),
  ],
  [
    "属性值背景仅使用主题语义变量",
    !/--monokai-metadata-value-background/.test(files.base)
      && /\.metadata-property-value\s*\{[^}]*background-color:\s*var\(--metadata-input-background, transparent\);/s.test(files.base)
      && /\.metadata-property-value:focus-within\s*\{[^}]*background-color:\s*var\(--background-modifier-hover\);/s.test(files.base),
  ],
  [
    "行内代码背景与代码块背景一致",
    /--monokai-inline-code-background:\s*var\(--code-background\);/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?code[\s\S]*?background-color:\s*var\(--monokai-inline-code-background\);/.test(files.editor),
  ],
  [
    "Callout 使用语义分色变量（note/info → 青）",
    /--monokai-callout-note-bg:/.test(files.editor)
      && /--monokai-callout-note-border:/.test(files.editor)
      && mappingContainsAll(files.callout, "info", ["info"]),
  ],
  [
    "Callout 使用语义分色变量（warning/caution → 橙）",
    /--monokai-callout-warning-bg:/.test(files.editor)
      && /--monokai-callout-warning-border:/.test(files.editor)
      && mappingContainsAll(files.callout, "warning", ["warning", "caution"]),
  ],
  [
    "Callout 使用语义分色变量（error/danger → 红）",
    /--monokai-callout-error-bg:/.test(files.editor)
      && /--monokai-callout-error-border:/.test(files.editor)
      && mappingContainsAll(files.callout, "error", ["error", "danger"]),
  ],
  [
    "Callout 使用语义分色变量（success/check → 绿）",
    /--monokai-callout-success-bg:/.test(files.editor)
      && /--monokai-callout-success-border:/.test(files.editor)
      && mappingContainsAll(files.callout, "success", ["success", "check"]),
  ],
  [
    "Callout 使用卡片内嵌语义色条",
    /\.callout::before[\s\S]*?inset-block:\s*var\(--monokai-callout-rail-inset\);[\s\S]*?background-color:\s*var\(--callout-border/.test(files.callout)
      && /border-radius:\s*var\(--callout-radius\);/.test(files.callout)
      && /\.callout\s*\{[\s\S]*?box-shadow:\s*none;/.test(files.callout)
      && /\.cm-embed-block:has\(\.callout\)[\s\S]*?border:\s*0;[\s\S]*?border-radius:\s*0;[\s\S]*?box-shadow:\s*none;[\s\S]*?outline:\s*0;/.test(files.callout)
      && /\.callout:hover::before[\s\S]*?filter:\s*brightness\(1\.15\) saturate\(1\.05\);/.test(files.callout)
      && !/width:\s*calc\(var\(--monokai-callout-rail-width\)/.test(files.callout),
  ],
  [
    "Callout 内容与标题之间使用紧凑呼吸感",
    /--callout-content-padding:\s*0\.65rem 0 0 0;/.test(files.callout)
      && /margin-block-start:\s*0;/.test(files.callout),
  ],
  [
    "Callout 图标隐藏原生 SVG 使用文字替代",
    /:is\(\.callout-icon, \.cm-callout-icon\) svg[\s\S]*?display:\s*none/.test(files.callout)
      && /:is\(\.callout-icon, \.cm-callout-icon\)::before[\s\S]*?content:/.test(files.callout)
      && /\.callout\[data-callout="#\{\$type\}"\][\s\S]*?content:\s*\$glyph;/.test(files.callout),
  ],
  [
    "编辑区域顶部冗余标题被隐藏",
    /\.markdown-source-view\.mod-cm6\s+\.inline-title[\s\S]*?display:\s*none;/.test(files.editor),
  ],
  [
    "Terminal 插件面板有主题化间距",
    /\.terminal[\s\S]*?padding:\s*var\(--spacing-3\);/.test(files.base)
      || /\.workspace-leaf-content\[data-type="terminal"\][\s\S]*?padding:\s*var\(--spacing-3\);/.test(files.base),
  ],
  [
    "行内代码深色保持 Monokai Pro 绿色，浅色使用增强青绿",
    /body\.theme-dark[\s\S]*?--monokai-inline-code-color:\s*#\{\$color-pro-green\};/.test(files.editor)
      && /body\.theme-light[\s\S]*?--monokai-inline-code-color:\s*#0b5262;/.test(files.editor)
      && /body\.theme-light[\s\S]*?--monokai-inline-code-font-weight:\s*600;/.test(files.editor)
      && /\.markdown-rendered[\s\S]*?code[\s\S]*?font-family:\s*var\(--monokai-code-font-family\);/.test(files.editor)
      && /\.cm-inline-code[\s\S]*?font-family:\s*var\(--monokai-code-font-family\);/.test(files.editor)
      && /\.cm-inline-code[\s\S]*?color:\s*var\(--monokai-inline-code-color\);/.test(files.editor),
  ],
  [
    "行内代码不再使用着色边框",
    /\.markdown-rendered[\s\S]*?code[\s\S]*?border:\s*0;/.test(files.editor)
      && /\.cm-inline-code[\s\S]*?border:\s*0;/.test(files.editor)
      && !/--monokai-inline-code-border/.test(files.editor),
  ],
  [
    "块引用仅在渲染态显示语义色条",
    /blockquote::before[\s\S]*?background-color:\s*var\(--monokai-blockquote-border\);/.test(files.callout)
      && /blockquote:not\(:has\(blockquote:hover\)\):hover::before[\s\S]*?filter:\s*brightness\(1\.15\) saturate\(1\.05\);/.test(files.callout)
      && /\.HyperMD-quote[\s\S]*?background-image:\s*none;/.test(files.callout)
      && /\.callout:has\(\.cm-callout\)::before[\s\S]*?display:\s*none;/.test(files.callout)
      && !/blockquote[\s\S]*?transform:\s*translateX/.test(files.callout),
  ],
  [
    "块引用格式符号在编辑态可见且弱化",
    /\.cm-formatting-quote[\s\S]*?display:\s*inline;[\s\S]*?color:\s*var\(--monokai-callout-source-marker-color\);[\s\S]*?opacity:\s*0\.8;/.test(files.callout),
  ],
  [
    "复选框未选中为 Monokai Pro 黄色，选中为绿色",
    /--monokai-checkbox-unchecked-color:\s*#\{\$color-pro-yellow\};/.test(files.base)
      && /--monokai-checkbox-checked-color:\s*#\{\$color-pro-green\};/.test(files.base)
      && /input\[type="checkbox"\]:not\(:checked\)[\s\S]*?border-color:\s*var\(--monokai-checkbox-unchecked-color\);/.test(files.base)
      && /input\[type="checkbox"\]:checked[\s\S]*?background-color:\s*var\(--monokai-checkbox-checked-color\);/.test(files.base)
      && /\.task-list-item-checkbox[\s\S]*?display:\s*inline-block;[\s\S]*?cursor:\s*pointer;[\s\S]*?pointer-events:\s*auto;[\s\S]*?vertical-align:\s*-0\.125em;/.test(files.lists),
  ],
  [
    "AGENTS.md 拥有专属文件名图标规则",
    /\[data-path="AGENTS\.md"\]::before/.test(files.generatedIcons),
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
