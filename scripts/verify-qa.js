import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const rootDir = resolve(import.meta.dirname, "..");
const vaultDir = resolve("C:/Users/Jie/iCloudDrive/iCloud~md~obsidian/SecondBrain");
const qaDir = resolve(vaultDir, "project/Monokai Syntax/QA");
const themeDir = resolve(vaultDir, ".obsidian/themes/Monokai Syntax");
const appearancePath = resolve(vaultDir, ".obsidian/appearance.json");
const themeCssPath = resolve(themeDir, "theme.css");
const checks = [];

function addCheck(label, passed) {
  checks.push([label, passed]);
  console.log(`${label}: ${passed ? "通过" : "失败"}`);
}

const qaFiles = [
  "Monokai Syntax QA 总览.md",
  "QA 长文阅读样例.md",
  "QA 关系图谱节点.md",
  "QA Canvas 检查.md",
  "Monokai Syntax QA.canvas",
];

for (const fileName of qaFiles) {
  addCheck(`QA 文件存在：${fileName}`, existsSync(resolve(qaDir, fileName)));
}

addCheck("Vault 主题 CSS 存在", existsSync(themeCssPath));
addCheck("Vault manifest 存在", existsSync(resolve(themeDir, "manifest.json")));

const appearance = JSON.parse(readFileSync(appearancePath, "utf8"));
addCheck("Obsidian 已选择 Monokai Syntax 主题", appearance.cssTheme === "Monokai Syntax");

const themeCss = readFileSync(themeCssPath, "utf8");
const requiredPatterns = [
  ["深色模式变量", /\.theme-dark\{/],
  ["浅色模式变量", /\.theme-light\{/],
  ["编辑器样式", /\.markdown-rendered/],
  ["关系图谱样式", /\.graph-view/],
  ["Canvas 样式", /\.canvas-wrapper/],
  ["Style Settings 元数据", /@settings/],
  ["Classic 滤镜", /monokai-syntax-filter-classic/],
  ["Machine 滤镜", /monokai-syntax-filter-machine/],
  ["Octagon 滤镜", /monokai-syntax-filter-octagon/],
  ["Ristretto 滤镜", /monokai-syntax-filter-ristretto/],
  ["Spectrum 滤镜", /monokai-syntax-filter-spectrum/],
  ["紧凑模式", /monokai-syntax-compact/],
  ["单色图标模式", /monokai-syntax-monochrome-icons/],
  ["行宽变量", /monokai-readable-line-width/],
  ["强调色变量", /monokai-accent-color/],
];

for (const [label, pattern] of requiredPatterns) {
  addCheck(label, pattern.test(themeCss));
}

const canvas = JSON.parse(readFileSync(resolve(qaDir, "Monokai Syntax QA.canvas"), "utf8"));
addCheck("Canvas 包含节点", Array.isArray(canvas.nodes) && canvas.nodes.length >= 3);
addCheck("Canvas 包含边线", Array.isArray(canvas.edges) && canvas.edges.length >= 2);

const failed = checks.filter(([, passed]) => !passed);

if (failed.length > 0) {
  process.exitCode = 1;
}
