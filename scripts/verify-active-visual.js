import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const rootDir = resolve(import.meta.dirname, "..");
const paths = {
  base: resolve(rootDir, "src/scss/_base.scss"),
  editor: resolve(rootDir, "src/scss/components/_editor.scss"),
  index: resolve(rootDir, "src/scss/index.scss"),
  overrides: resolve(rootDir, "src/scss/_active-visual-overrides.scss"),
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

const packageJson = JSON.parse(files.packageJson);

const checks = [
  [
    "Active 视觉验证脚本已接入 release:pack",
    packageJson.scripts?.["release:pack"]?.includes("npm run verify:active-visual"),
  ],
  [
    "Active 视觉覆盖层位于插件样式之后",
    /@use "plugins";\s*@use "active-visual-overrides";/.test(files.index)
      && !/MONOKAI SYNTAX CSS LOADED/.test(files.base),
  ],
  [
    "Active 视觉覆盖层不保留诊断描边",
    !/box-shadow:\s*inset 0 0 0 3px/.test(files.overrides)
      && !/box-shadow:[^;]*#66d9ef/.test(files.overrides),
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
    "属性值不再绘制额外背景色",
    !/--monokai-metadata-value-background/.test(files.base)
      && !/\.metadata-property-value\s*\{[^}]*background-color:/s.test(files.base)
      && !/\.metadata-property-value:focus-within\s*\{[^}]*background-color:/s.test(files.base),
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
      && /\.callout\[data-callout="info"\]/.test(files.overrides),
  ],
  [
    "Callout 使用语义分色变量（warning/caution → 橙）",
    /--monokai-callout-warning-bg:/.test(files.editor)
      && /--monokai-callout-warning-border:/.test(files.editor)
      && /\.callout\[data-callout="warning"\]/.test(files.overrides),
  ],
  [
    "Callout 使用语义分色变量（error/danger → 红）",
    /--monokai-callout-error-bg:/.test(files.editor)
      && /--monokai-callout-error-border:/.test(files.editor)
      && /\.callout\[data-callout="error"\]/.test(files.overrides),
  ],
  [
    "Callout 使用语义分色变量（success/check → 绿）",
    /--monokai-callout-success-bg:/.test(files.editor)
      && /--monokai-callout-success-border:/.test(files.editor)
      && /\.callout\[data-callout="success"\]/.test(files.overrides),
  ],
  [
    "Callout 边框使用 border-inline-start 绘制",
    /border-inline-start:\s*2px solid var\(--callout-border/.test(files.overrides)
      && !/box-shadow.*callout/i.test(files.overrides),
  ],
  [
    "Callout 内容与标题之间留出呼吸感",
    /margin-block-start:\s*var\(--spacing-4\);/.test(files.overrides),
  ],
  [
    "Callout 图标隐藏原生 SVG 使用文字替代",
    /\.callout-icon svg[\s\S]*?display:\s*none/.test(files.overrides)
      && /\.callout-icon::before[\s\S]*?content:/.test(files.overrides),
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
    "行内代码文字统一使用 Monokai Pro 绿色",
    /--monokai-inline-code-color:\s*#a6e22e;/.test(files.editor)
      && /\.cm-inline-code[\s\S]*?color:\s*var\(--monokai-inline-code-color\);/.test(files.editor),
  ],
  [
    "行内代码不再使用着色边框",
    /\.markdown-rendered[\s\S]*?code[\s\S]*?border:\s*0;/.test(files.editor)
      && /\.cm-inline-code[\s\S]*?border:\s*0;/.test(files.editor)
      && !/--monokai-inline-code-border/.test(files.editor),
  ],
  [
    "块引用左侧竖条使用 border-inline-start",
    /border-inline-start:\s*2px solid var\(--monokai-blockquote-border/.test(files.overrides)
      && /border-inline-start:\s*2px solid var\(--monokai-blockquote-border/.test(files.overrides),
  ],
  [
    "块引用格式符号隐藏",
    /\.cm-formatting-quote[\s\S]*?display:\s*none/.test(files.overrides),
  ],
  [
    "复选框未选中为 Monokai Pro 黄色，选中为绿色",
    /--monokai-checkbox-unchecked-color:\s*#\{\$color-dark-yellow\};/.test(files.base)
      && /--monokai-checkbox-checked-color:\s*#\{\$color-dark-green\};/.test(files.base)
      && /input\[type="checkbox"\]:not\(:checked\)[\s\S]*?border-color:\s*var\(--monokai-checkbox-unchecked-color\);/.test(files.base)
      && /input\[type="checkbox"\]:checked[\s\S]*?background-color:\s*var\(--monokai-checkbox-checked-color\);/.test(files.base),
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
