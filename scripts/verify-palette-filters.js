import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const rootDir = resolve(import.meta.dirname, "..");
const styleSettingsScssPath = resolve(rootDir, "src/scss/plugins/_style-settings.scss");
const paletteSettingsPath = resolve(rootDir, "src/css/style-settings/10-palette.css.md");
const baseScssPath = resolve(rootDir, "src/scss/_base.scss");

export const paletteFilters = [
  "pro",
  "light",
];

const requiredVariables = [
  "--background-primary",
  "--background-secondary",
  "--background-secondary-alt",
  "--text-normal",
  "--text-muted",
  "--text-faint",
  "--background-modifier-border",
  "--text-accent",
  "--interactive-accent",
  "--link-color",
  "--link-external-color",
  "--h1-color",
  "--h2-color",
  "--h3-color",
  "--h4-color",
  "--h5-color",
  "--h6-color",
  "--code-background",
  "--code-comment",
  "--code-function",
  "--code-important",
  "--code-keyword",
  "--code-operator",
  "--code-property",
  "--code-punctuation",
  "--code-string",
  "--code-tag",
  "--code-value",
  "--code-type",
  "--code-class",
  "--code-builtin",
  "--code-constant",
  "--code-namespace",
  "--code-decorator",
  "--code-regex",
  "--code-meta",
  "--code-error",
  "--monokai-spectrum-red",
  "--monokai-spectrum-orange",
  "--monokai-spectrum-yellow",
  "--monokai-spectrum-green",
  "--monokai-spectrum-cyan",
  "--monokai-spectrum-purple",
  "--monokai-callout-note-bg",
  "--monokai-callout-note-border",
  "--monokai-callout-warning-bg",
  "--monokai-callout-warning-border",
  "--monokai-callout-error-bg",
  "--monokai-callout-error-border",
  "--monokai-callout-success-bg",
  "--monokai-callout-success-border",
  "--monokai-graph-background",
  "--monokai-graph-panel",
  "--monokai-graph-line",
  "--monokai-graph-focused",
  "--monokai-graph-node-tag",
  "--monokai-graph-node-attachment",
  "--canvas-color-1",
  "--canvas-color-2",
  "--canvas-color-3",
  "--canvas-color-4",
  "--canvas-color-5",
  "--canvas-color-6",
  "--monokai-filter-name",
];

function readProjectFiles() {
  return {
    baseScss: readFileSync(baseScssPath, "utf8"),
    paletteSettings: readFileSync(paletteSettingsPath, "utf8"),
    styleSettingsScss: readFileSync(styleSettingsScssPath, "utf8"),
  };
}

function findFilterBlock(scss, filterName) {
  const className = `monokai-syntax-filter-${filterName}`;
  const themeName = filterName === "pro" ? "dark" : "light";
  const pattern = new RegExp(`body\\.theme-${themeName}\\.${className}\\s*\\{([\\s\\S]*?)\\n\\}`, "m");

  return pattern.exec(scss)?.[1] ?? "";
}

function findFilterMixinBlock(scss) {
  const pattern = /@mixin monokai-filter\([\s\S]*?\)\s*\{([\s\S]*?)\n\}/m;

  return pattern.exec(scss)?.[1] ?? "";
}

export function inspectPaletteFilters(files = readProjectFiles()) {
  const failures = [];
  const filterMixinBlock = findFilterMixinBlock(files.styleSettingsScss);

  if (!filterMixinBlock) {
    failures.push("_style-settings.scss 缺少 monokai-filter mixin");
  }

  if (!files.paletteSettings.includes("value: monokai-syntax-filter-auto")) {
    failures.push("Style Settings 缺少跟随系统选项");
  }

  if (!/default:\s*monokai-syntax-filter-auto/.test(files.paletteSettings)) {
    failures.push("Style Settings 默认滤镜不是跟随系统");
  }

  const paletteOptionMatches = [...files.paletteSettings.matchAll(/value:\s*(monokai-syntax-filter-[a-z-]+)/g)]
    .map((match) => match[1])
    .sort();
  const expectedOptions = [
    "monokai-syntax-filter-auto",
    "monokai-syntax-filter-light",
    "monokai-syntax-filter-pro",
  ].sort();

  if (JSON.stringify(paletteOptionMatches) !== JSON.stringify(expectedOptions)) {
    failures.push("Style Settings 调色板选项不是跟随系统、Pro、Light");
  }

  const unscopedFilterMatches = [...files.styleSettingsScss.matchAll(/body\.monokai-syntax-filter-([a-z-]+)\s*\{/g)]
    .map((match) => match[1])
    .sort();
  const scssFilterMatches = [...files.styleSettingsScss.matchAll(/body\.theme-(?:dark|light)\.monokai-syntax-filter-([a-z-]+)\s*\{/g)]
    .map((match) => match[1])
    .sort();

  if (unscopedFilterMatches.length > 0) {
    failures.push("_style-settings.scss 存在未绑定 theme-dark/theme-light 的滤镜 class");
  }

  if (JSON.stringify(scssFilterMatches) !== JSON.stringify(paletteFilters.sort())) {
    failures.push("_style-settings.scss 存在 Pro/Light 之外的滤镜 class");
  }

  for (const filterName of paletteFilters) {
    const className = `monokai-syntax-filter-${filterName}`;
    const block = findFilterBlock(files.styleSettingsScss, filterName);

    if (!files.paletteSettings.includes(`value: ${className}`)) {
      failures.push(`Style Settings 缺少滤镜选项：${className}`);
    }

    if (!block) {
      failures.push(`SCSS 缺少滤镜 class：${className}`);
      continue;
    }

    for (const variableName of requiredVariables) {
      const variablePattern = new RegExp(`${variableName}\\s*:`);

      if (!variablePattern.test(block) && !variablePattern.test(filterMixinBlock)) {
        failures.push(`${className} 缺少变量：${variableName}`);
      }
    }

    if (!/@include monokai-filter\(/.test(block)) {
      failures.push(`${className} 未使用 monokai-filter mixin`);
    }
  }

  if (!/\.theme-dark[\s\S]*?--code-keyword:/.test(files.baseScss)) {
    failures.push("_base.scss 缺少深色代码 token 基线");
  }

  if (!/\.theme-light[\s\S]*?--code-keyword:/.test(files.baseScss)) {
    failures.push("_base.scss 缺少浅色代码 token 基线");
  }

  return {
    failures,
    filters: paletteFilters,
  };
}

function runCli() {
  const result = inspectPaletteFilters();

  for (const filterName of result.filters) {
    const className = `monokai-syntax-filter-${filterName}`;
    const filterFailures = result.failures.filter((failure) => failure.includes(className));

    console.log(`${className}: ${filterFailures.length === 0 ? "通过" : "失败"}`);
  }

  for (const failure of result.failures) {
    console.error(failure);
  }

  if (result.failures.length > 0) {
    process.exitCode = 1;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  runCli();
}
