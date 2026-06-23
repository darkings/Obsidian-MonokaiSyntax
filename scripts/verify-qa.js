import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

import { resolveQaPaths, resolveVaultRoot } from "./qa-paths.js";

const qaFiles = [
  "Monokai Syntax QA 总览.md",
  "QA 长文阅读样例.md",
  "QA 代码学习样例.md",
  "QA Callout 学习语义.md",
  "QA Mermaid Math Dataview.md",
  "QA 关系图谱节点.md",
  "QA Canvas 检查.md",
  "Monokai Syntax QA.canvas",
];

const requiredPatterns = [
  ["深色模式变量", /\.theme-dark\s*\{/],
  ["浅色模式变量", /\.theme-light\s*\{/],
  ["编辑器样式", /\.markdown-rendered/],
  ["关系图谱样式", /\.graph-view/],
  ["Canvas 样式", /\.canvas-wrapper/],
  ["Style Settings 元数据", /@settings/],
  ["Pro 滤镜", /monokai-syntax-filter-pro/],
  ["Classic 滤镜", /monokai-syntax-filter-classic/],
  ["Machine 滤镜", /monokai-syntax-filter-machine/],
  ["Octagon 滤镜", /monokai-syntax-filter-octagon/],
  ["Ristretto 滤镜", /monokai-syntax-filter-ristretto/],
  ["Spectrum 滤镜", /monokai-syntax-filter-spectrum/],
  ["Light 滤镜", /monokai-syntax-filter-light/],
  ["Sun 滤镜", /monokai-syntax-filter-sun/],
  ["紧凑模式", /monokai-syntax-compact/],
  ["单色图标模式", /monokai-syntax-monochrome-icons/],
  ["行宽变量", /monokai-readable-line-width/],
  ["强调色变量", /monokai-accent-color/],
  ["学习 Callout：concept", /\.callout\[data-callout=concept\]/],
  ["学习 Callout：terminal", /\.callout\[data-callout=terminal\]/],
  ["Mermaid selector", /\.mermaid/],
  ["Math selector", /\.math/],
  ["Dataview selector", /\.block-language-dataview|\.dataview/],
];

function readJsonResult(path, label) {
  if (!existsSync(path)) {
    return { ok: false, error: `${label} 不存在` };
  }

  try {
    return { ok: true, value: JSON.parse(readFileSync(path, "utf8")) };
  } catch {
    return { ok: false, error: `${label} 不是有效 JSON` };
  }
}

function addCheck(checks, label, passed) {
  checks.push({ label, passed });
}

export function verifyQaVault(vaultRoot) {
  const paths = resolveQaPaths(vaultRoot);
  const checks = [];

  for (const fileName of qaFiles) {
    addCheck(checks, `QA 文件存在：${fileName}`, existsSync(resolve(paths.qaDir, fileName)));
  }

  addCheck(checks, "Vault 主题 CSS 存在", existsSync(paths.themeCssPath));
  addCheck(checks, "Vault manifest 存在", existsSync(paths.manifestPath));

  const appearance = readJsonResult(paths.appearancePath, "appearance.json");
  addCheck(checks, appearance.error ?? "appearance.json 可读取", appearance.ok);
  addCheck(
    checks,
    "Obsidian 已选择 Monokai Syntax 主题",
    appearance.ok && appearance.value.cssTheme === "Monokai Syntax",
  );

  const themeCss = existsSync(paths.themeCssPath) ? readFileSync(paths.themeCssPath, "utf8") : "";
  for (const [label, pattern] of requiredPatterns) {
    addCheck(checks, label, pattern.test(themeCss));
  }

  const overviewPath = resolve(paths.qaDir, "Monokai Syntax QA 总览.md");
  const overview = existsSync(overviewPath) ? readFileSync(overviewPath, "utf8") : "";
  addCheck(checks, "QA 包含 Mermaid 示例", /```mermaid[\s\S]*?graph TD/.test(overview));
  addCheck(checks, "QA 包含 Math 示例", /\$\$[\s\S]*?E = mc\^2[\s\S]*?\$\$/.test(overview));
  addCheck(checks, "QA 包含 Dataview 示例", /```dataview[\s\S]*?TABLE/.test(overview));

  const codeLearning = existsSync(resolve(paths.qaDir, "QA 代码学习样例.md"))
    ? readFileSync(resolve(paths.qaDir, "QA 代码学习样例.md"), "utf8")
    : "";
  addCheck(checks, "QA 代码学习样例包含 API 参数表", /\| 参数 \| 类型 \| 默认值 \| 必填 \| 说明 \|/.test(codeLearning));
  addCheck(checks, "QA 代码学习样例包含 8 种任务状态", /\[!\] 重点任务[\s\S]*?\[\/\] 进行中任务[\s\S]*?\[\*\] 星标任务/.test(codeLearning));

  const learningCallouts = existsSync(resolve(paths.qaDir, "QA Callout 学习语义.md"))
    ? readFileSync(resolve(paths.qaDir, "QA Callout 学习语义.md"), "utf8")
    : "";
  addCheck(checks, "QA Callout 学习语义包含 concept 与 terminal", /\[!concept\][\s\S]*?\[!terminal\]/.test(learningCallouts));

  const canvas = readJsonResult(resolve(paths.qaDir, "Monokai Syntax QA.canvas"), "Monokai Syntax QA.canvas");
  addCheck(checks, canvas.error ?? "Canvas JSON 可读取", canvas.ok);
  addCheck(checks, "Canvas 包含节点", canvas.ok && Array.isArray(canvas.value.nodes) && canvas.value.nodes.length >= 3);
  addCheck(checks, "Canvas 包含边线", canvas.ok && Array.isArray(canvas.value.edges) && canvas.value.edges.length >= 2);

  const failures = checks.filter((check) => !check.passed).map((check) => check.label);

  return {
    passed: failures.length === 0,
    failures,
    checks,
    paths,
  };
}

function runCli() {
  const result = verifyQaVault(resolveVaultRoot());

  for (const check of result.checks) {
    console.log(`${check.label}: ${check.passed ? "通过" : "失败"}`);
  }

  if (!result.passed) {
    process.exitCode = 1;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  runCli();
}
