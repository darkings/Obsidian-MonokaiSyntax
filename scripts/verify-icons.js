import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const rootDir = resolve(import.meta.dirname, "..");
const generatedPath = resolve(rootDir, "src/scss/components/_file-icons.generated.scss");
const wrapperPath = resolve(rootDir, "src/scss/components/_file-icons.scss");
const componentIndexPath = resolve(rootDir, "src/scss/components/_index.scss");
const packagePath = resolve(rootDir, "package.json");
const auditPath = resolve(rootDir, "scripts/audit-css.js");
const styleSettingsPath = resolve(rootDir, "src/css/style-settings/30-icons.css.md");
const activeVisualPath = resolve(rootDir, "src/scss/_active-visual-overrides.scss");

const files = {
  generated: existsSync(generatedPath) ? readFileSync(generatedPath, "utf8") : "",
  wrapper: existsSync(wrapperPath) ? readFileSync(wrapperPath, "utf8") : "",
  index: readFileSync(componentIndexPath, "utf8"),
  styleSettings: readFileSync(styleSettingsPath, "utf8"),
  activeVisual: readFileSync(activeVisualPath, "utf8"),
  packageJson: JSON.parse(readFileSync(packagePath, "utf8")),
  audit: readFileSync(auditPath, "utf8"),
};

const checks = [
  ["生成脚本存在", existsSync(resolve(rootDir, "scripts/generate-icon-theme.js"))],
  ["生成 SCSS 存在", existsSync(generatedPath)],
  ["图标包装 SCSS 存在", existsSync(wrapperPath)],
  ["组件入口导入图标包装", /@forward "file-icons";/.test(files.index)],
  ["构建前会生成图标", files.packageJson.scripts?.prebuild === "node scripts/generate-icon-theme.js"],
  ["存在验证脚本", files.packageJson.scripts?.["verify:icons"] === "node scripts/verify-icons.js"],
  ["内联 woff 字体", /data:font\/woff;base64,/.test(files.generated)],
  ["图标 content 使用 CSS Unicode 转义", /content: "[\\][0-9a-f]{4}";/i.test(files.generated)],
  ["图标 content 未被双重转义", !/content: "[\\][\\][0-9a-f]{4}";/i.test(files.generated)],
  ["默认文件图标规则", /\.nav-file-title::before/.test(files.generated)],
  ["文件图标以零净宽度进入 gutter 且不推开文件名", /\.nav-file-title::before[\s\S]*?display:\s*inline-flex;[\s\S]*?width:\s*var\(--monokai-file-tree-slot-size\);[\s\S]*?margin-inline-end:\s*calc\(-1 \* var\(--monokai-file-tree-slot-size\)\);[\s\S]*?transform:\s*translateX\(calc\(-1 \* \(var\(--monokai-file-tree-slot-size\) \+ var\(--monokai-file-tree-icon-gap\)\)\)\);[\s\S]*?font-size:\s*var\(--monokai-file-tree-glyph-size\);/.test(files.generated) && !/\.nav-file-title::before[\s\S]*?position:\s*absolute;/.test(files.generated)],
  ["Markdown 扩展名规则", /\[data-path\$="\.md"\]::before/.test(files.generated)],
  ["package.json 文件名规则", /\[data-path\$="\/package\.json"\]::before/.test(files.generated)],
  ["README.md/readme.md 文件名规则", /\[data-path\$="\/README\.md"\]::before/.test(files.generated) && /\[data-path\$="\/readme\.md"\]::before/.test(files.generated)],
  ["TODO.md/todo.md 文件名规则", /\[data-path\$="\/TODO\.md"\]::before/.test(files.generated) && /\[data-path\$="\/todo\.md"\]::before/.test(files.generated)],
  ["CHANGELOG.md/changelog.md 文件名规则", /\[data-path\$="\/CHANGELOG\.md"\]::before/.test(files.generated) && /\[data-path\$="\/changelog\.md"\]::before/.test(files.generated)],
  ["API.md/api.md 文件名规则", /\[data-path\$="\/API\.md"\]::before/.test(files.generated) && /\[data-path\$="\/api\.md"\]::before/.test(files.generated)],
  ["PROMPTS.md/prompts.md 文件名规则", /\[data-path\$="\/PROMPTS\.md"\]::before/.test(files.generated) && /\[data-path\$="\/prompts\.md"\]::before/.test(files.generated)],
  ["CURSOR.md/cursor.md 文件名规则", /\[data-path\$="\/CURSOR\.md"\]::before/.test(files.generated) && /\[data-path\$="\/cursor\.md"\]::before/.test(files.generated)],
  ["CLAUDE.md/claude.md 文件名规则", /\[data-path\$="\/CLAUDE\.md"\]::before/.test(files.generated) && /\[data-path\$="\/claude\.md"\]::before/.test(files.generated)],
  ["AGENTS.md/agents.md 文件名规则", /\[data-path\$="\/AGENTS\.md"\]::before/.test(files.generated) && /\[data-path\$="\/agents\.md"\]::before/.test(files.generated)],
  ["Bug_ 开头文档规则", /\[data-path\*="\/Bug_"\]\[data-path\$="\.md"\]::before/.test(files.generated)],
  ["第二层文件夹使用 folder-dimmed2 折叠图标作为默认回退", /\.nav-folder-children\s+\.nav-folder-children\s+\.nav-folder-title\s+\.collapse-icon[\s\S]*content:\s*var\(--monokai-folder-icon-content,\s*"\\e64d"\);/.test(files.wrapper)],
  [
    "学习目录图标规则由生成器输出为文件夹语义变量",
    [
      "concepts",
      "labs",
      "examples",
      "exercises",
      "leetcode",
      "notes",
      "assets",
      "src",
      "tests",
    ].every((name) => new RegExp(`\\.nav-folder-title\\[data-path="${name}"\\],[\\s\\S]*?\\.nav-folder-title\\[data-path\\$="/${name}"\\][\\s\\S]*?--monokai-folder-icon-content:[\\s\\S]*?--monokai-folder-icon-color:`).test(files.generated))
      && /\.nav-folder-title\[data-path\^="day"\],[\s\S]*?\.nav-folder-title\[data-path\*="\/day"\][\s\S]*?--monokai-folder-icon-content:[\s\S]*?--monokai-folder-icon-color:/.test(files.generated)
      && /\.nav-folder-title\[data-path\^="Day"\],[\s\S]*?\.nav-folder-title\[data-path\*="\/Day"\][\s\S]*?--monokai-folder-icon-content:[\s\S]*?--monokai-folder-icon-color:/.test(files.generated),
  ],
  [
    "学习目录图标复用折叠槽变量且不新增文件夹标题伪元素",
    /content:\s*var\(--monokai-folder-icon-content,\s*"\\e64d"\);/.test(files.wrapper)
      && /color:\s*var\(--monokai-folder-icon-color,\s*var\(--icon-color\)\);/.test(files.wrapper)
      && !/\.nav-folder-title-content::before/.test(files.wrapper)
      && !/\.nav-folder-title::before/.test(files.wrapper),
  ],
  ["兼容 Obsidian 折叠图标类名", /\.nav-folder-collapse-indicator/.test(files.wrapper) && /\.collapse-icon/.test(files.wrapper)],
  ["第一层文件夹保留 Obsidian 原生折叠图标", !/\.nav-folder\.mod-root\s*>\s*\.nav-folder-children\s*>\s*\.nav-folder\s*>\s*\.nav-folder-title\s+\.nav-folder-collapse-indicator[\s\S]*content:\s*"\\e64d";/.test(files.wrapper)],
  ["Style Settings 可关闭文档树图标", /monokai-syntax-hide-file-tree-icons/.test(files.styleSettings) && /body\.monokai-syntax-hide-file-tree-icons/.test(files.wrapper)],
  ["Callout 图标使用 icons.woff 字体", /font-family:\s*monokai-pro-icons/.test(files.activeVisual) && /callout\[data-callout="bug"\][\s\S]*content:\s*"\\e675";/.test(files.activeVisual)],
  ["所有默认 Callout 类型都有背景与边框映射", ["note", "abstract", "info", "todo", "tip", "question", "warning", "failure", "bug", "success", "example", "quote"].every((name) => new RegExp(`--monokai-callout-${name}-bg`).test(files.activeVisual) || new RegExp(`--monokai-callout-${name}-bg`).test(readFileSync(resolve(rootDir, "src/scss/components/_editor.scss"), "utf8")))],
  ["Callout 图标尺寸放大", /--callout-icon-size:\s*1\.25em/.test(readFileSync(resolve(rootDir, "src/scss/components/_editor.scss"), "utf8"))],
  ["文件树扩展名颜色多样", /--monokai-file-icon-color:\s*#ff6188/.test(files.generated) && /--monokai-file-icon-color:\s*#fc9867/.test(files.generated) && /--monokai-file-icon-color:\s*#ffd866/.test(files.generated) && /--monokai-file-icon-color:\s*#a9dc76/.test(files.generated) && /--monokai-file-icon-color:\s*#78dce8/.test(files.generated) && /--monokai-file-icon-color:\s*#ab9df2/.test(files.generated)],
  ["文件夹内容不额外生成第二个图标", !/\.nav-folder-title-content::before/.test(files.wrapper) && !/\.nav-folder-title::before/.test(files.wrapper)],
  ["文件行不通过移动标题盒修正对齐", !/\.nav-file-title\s*\{[\s\S]*?margin-inline-start:/.test(files.wrapper) && !/\.nav-file-title-content\s*\{[\s\S]*?margin-inline-start:/.test(files.wrapper)],
  ["文件树拆分布局槽与真实图标尺寸", /--monokai-file-tree-slot-size:\s*1rem/.test(files.wrapper) && /--monokai-file-tree-glyph-size:\s*0\.8125rem/.test(files.wrapper) && /--monokai-file-tree-toggle-size:\s*9px/.test(files.wrapper) && /--monokai-file-tree-toggle-stroke-width:\s*1\.75/.test(files.wrapper) && /\.nav-folder-title\s+\.nav-folder-collapse-indicator,\s*[\r\n]+\.nav-folder-title\s+\.collapse-icon[\s\S]*?flex:\s*0 0 var\(--monokai-file-tree-slot-size\);[\s\S]*?width:\s*var\(--monokai-file-tree-slot-size\);[\s\S]*?margin-inline-end:\s*var\(--monokai-file-tree-icon-gap\);/.test(files.wrapper)],
  ["根层文件夹折叠 SVG 使用独立轻量尺寸与线宽", /\.nav-folder-title\s+\.nav-folder-collapse-indicator svg,\s*[\r\n]+\.nav-folder-title\s+\.collapse-icon svg[\s\S]*?width:\s*var\(--monokai-file-tree-toggle-size\);[\s\S]*?height:\s*var\(--monokai-file-tree-toggle-size\);[\s\S]*?stroke-width:\s*var\(--monokai-file-tree-toggle-stroke-width\);/.test(files.wrapper)],
  ["紧凑模式仍共享同一图标槽变量", /body\.monokai-syntax-compact[\s\S]*?\.nav-file-title,\s*[\r\n]+\s*\.nav-folder-title[\s\S]*?--monokai-file-tree-slot-size:\s*13px;[\s\S]*?--monokai-file-tree-icon-gap:\s*4px;[\s\S]*?--monokai-file-tree-glyph-size:\s*12px;[\s\S]*?--monokai-file-tree-toggle-size:\s*8px;/.test(readFileSync(resolve(rootDir, "src/scss/plugins/_style-settings.scss"), "utf8"))],
  ["保留 Obsidian 默认文件夹折叠指示器", /\.nav-folder-collapse-indicator/.test(readFileSync(resolve(rootDir, "src/scss/_base.scss"), "utf8"))],
  ["单色图标模式规则", /body\.monokai-syntax-monochrome-icons/.test(files.wrapper)],
  ["保留彩色图标模式", /--monokai-file-icon-color/.test(files.generated)],
  ["CSS 审计允许本地内联 woff 字体", /data:font\/woff/.test(files.audit)],
  ["没有远程 URL", !/https?:\/\//i.test(files.generated)],
  ["没有 !important", !/!important/i.test(files.generated + files.wrapper)],
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
