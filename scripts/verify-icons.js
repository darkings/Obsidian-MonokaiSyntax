import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const rootDir = resolve(import.meta.dirname, "..");
const generatedPath = resolve(rootDir, "src/scss/components/_file-icons.generated.scss");
const wrapperPath = resolve(rootDir, "src/scss/components/_file-icons.scss");
const componentIndexPath = resolve(rootDir, "src/scss/components/_index.scss");
const packagePath = resolve(rootDir, "package.json");
const auditPath = resolve(rootDir, "scripts/audit-css.js");

const files = {
  generated: existsSync(generatedPath) ? readFileSync(generatedPath, "utf8") : "",
  wrapper: existsSync(wrapperPath) ? readFileSync(wrapperPath, "utf8") : "",
  index: readFileSync(componentIndexPath, "utf8"),
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
  ["图标 content 使用 CSS Unicode 转义", /content: "\\EA[0-9A-F]{2}";/.test(files.generated)],
  ["图标 content 未被双重转义", !/content: "\\\\EA[0-9A-F]{2}";/.test(files.generated)],
  ["默认文件图标规则", /\.nav-file-title::before/.test(files.generated)],
  ["Markdown 扩展名规则", /\[data-path\$="\.md"\]::before/.test(files.generated)],
  ["package.json 文件名规则", /\[data-path\$="\/package\.json"\]::before/.test(files.generated)],
  ["TODO.md 文件名规则", /\[data-path\$="\/TODO\.md"\]::before/.test(files.generated)],
  ["不生成额外文件夹图标", !/\.nav-folder-title::before/.test(files.generated)],
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
