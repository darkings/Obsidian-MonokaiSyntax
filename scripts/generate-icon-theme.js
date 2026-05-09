import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const rootDir = resolve(import.meta.dirname, "..");
const iconDir = resolve(rootDir, "icons");
const themePath = resolve(iconDir, "icon-theme.json");
const fontPath = resolve(iconDir, "icons.woff");
const outputPath = resolve(rootDir, "src/scss/components/_file-icons.generated.scss");

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function cssAttribute(value) {
  return String(value).replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}

function cssContent(value) {
  return String(value);
}

function resolveDefinition(theme, iconId) {
  const definition = theme.iconDefinitions?.[iconId];

  if (!definition?.fontCharacter) {
    return theme.iconDefinitions?.[theme.file];
  }

  return definition;
}

function normalizeFileNameSelector(fileName) {
  const escaped = cssAttribute(fileName);
  return [
    `.nav-file-title[data-path="${escaped}"]::before`,
    `.nav-file-title[data-path$="/${escaped}"]::before`,
  ];
}

function iconRule(selectors, definition) {
  return `${selectors.join(",\n")} {\n  --monokai-file-icon-color: ${definition.fontColor};\n  content: "${cssContent(definition.fontCharacter)}";\n}\n`;
}

function sortedEntries(record) {
  return Object.entries(record ?? {}).sort(([left], [right]) =>
    left.localeCompare(right, "en", { sensitivity: "variant" }),
  );
}

if (!existsSync(themePath) || !existsSync(fontPath)) {
  console.error(`找不到图标主题资产：${iconDir}`);
  process.exit(1);
}

const theme = readJson(themePath);
const fontBase64 = readFileSync(fontPath).toString("base64");
const defaultFileIcon = resolveDefinition(theme, theme.file);
const obsidianFileExtensions = {
  canvas: theme.fileExtensions?.json ?? "_json",
  md: theme.languageIds?.markdown ?? "_markdown",
};
const obsidianFileNames = {
  "AGENTS.md": "_settings",
  "CLAUDE.md": "_source",
  "README.md": theme.languageIds?.markdown ?? "_markdown",
  "TODO.md": "_todo",
};

const lines = [
  "/* stylelint-disable */",
  "/*",
  " * 此文件由 `npm run generate:icons` 自动生成。",
  " * 请修改 `scripts/generate-icon-theme.js` 或 `icons/` 源资产，不要手写编辑本文件。",
  " */",
  "",
  "@font-face {",
  '  font-family: "monokai-pro-icons";',
  `  src: url("data:font/woff;base64,${fontBase64}") format("woff");`,
  "  font-display: block;",
  "  font-style: normal;",
  "  font-weight: 400;",
  "}",
  "",
  ".nav-file-title::before {",
  '  display: inline-block;',
  '  flex: 0 0 1rem;',
  '  width: 1rem;',
  '  margin-inline-end: 0.35rem;',
  '  color: var(--monokai-file-icon-color, var(--icon-color));',
  '  font-family: "monokai-pro-icons";',
  "  font-size: 1rem;",
  "  font-style: normal;",
  "  font-variant: normal;",
  "  font-weight: 400;",
  "  line-height: 1;",
  "  speak: never;",
  "  text-align: center;",
  "  text-rendering: auto;",
  "}",
  "",
  ".nav-file-title::before {",
  `  --monokai-file-icon-color: ${defaultFileIcon.fontColor};`,
  `  content: "${cssContent(defaultFileIcon.fontCharacter)}";`,
  "}",
  "",
];

const fileExtensions = { ...theme.fileExtensions, ...obsidianFileExtensions };

for (const [extension, iconId] of sortedEntries(fileExtensions)) {
  const definition = resolveDefinition(theme, iconId);
  const escapedExtension = cssAttribute(extension);
  lines.push(iconRule([`.nav-file-title[data-path$=".${escapedExtension}"]::before`], definition));
}

const fileNames = { ...theme.fileNames, ...obsidianFileNames };

for (const [fileName, iconId] of sortedEntries(fileNames)) {
  const definition = resolveDefinition(theme, iconId);
  lines.push(iconRule(normalizeFileNameSelector(fileName), definition));
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${lines.join("\n")}\n`);

console.log(`已生成文件树图标样式：${outputPath}`);
