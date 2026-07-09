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

function iconByClass(theme, fontClass) {
  const glyph = theme.glyphs?.find((item) => item.font_class === fontClass);

  if (!glyph?.unicode) {
    throw new Error(`找不到图标 glyph：${fontClass}`);
  }

  return {
    fontCharacter: `\\${glyph.unicode}`,
    fontColor: glyph.color ?? colorForIcon(fontClass),
  };
}

function colorForIcon(fontClass) {
  const accentColors = {
    accent1: "#ff6188",
    accent2: "#fc9867",
    accent3: "#ffd866",
    accent4: "#a9dc76",
    accent5: "#78dce8",
    accent6: "#ab9df2",
  };
  const specialColors = {
    agent: "#ab9df2",
    api: "#78dce8",
    bug: "#ff6188",
    "callout-abstract": "#ab9df2",
    "callout-example": "#fc9867",
    "callout-info": "#78dce8",
    "callout-note": "#78dce8",
    "callout-todo": "#ffd866",
    changelog: "#fc9867",
    cursor: "#66d9ef",
    prompts: "#e6db74",
    readme: "#a9dc76",
    todo: "#ffd866",
  };
  const accent = fontClass.match(/accent[1-6]$/)?.[0];

  return specialColors[fontClass] ?? accentColors[accent] ?? "#ffd866";
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
const defaultFileIcon = iconByClass(theme, "default-accent3");
const obsidianFileExtensions = {
  "7z": "archive-accent3",
  astro: "astro-accent6",
  bash: "shell-accent4",
  bmp: "image-accent3",
  c: "c-accent1",
  canvas: "json-accent6",
  cjs: "js-accent3",
  cpp: "cpp-accent5",
  cs: "csharp-accent6",
  css: "css-accent2",
  csv: "csv-accent3",
  dart: "dart-accent5",
  dockerfile: "docker-accent5",
  env: "env-accent3",
  gif: "image-accent3",
  go: "go-accent5",
  gql: "graphql-accent1",
  graphql: "graphql-accent1",
  h: "c-accent1",
  hpp: "cpp-accent5",
  html: "markup-accent2",
  jpeg: "image-accent3",
  jpg: "image-accent3",
  js: "js-accent3",
  json: "json-accent6",
  jsx: "react-accent5",
  kt: "kotlin-accent6",
  less: "less-accent6",
  lua: "lua-accent5",
  md: "markdown-accent4",
  mdx: "markdownx-accent4",
  mjs: "js-accent3",
  png: "image-accent3",
  py: "python-accent4",
  rb: "ruby-accent1",
  rs: "rust-accent2",
  sass: "sass-accent1",
  scss: "sass-accent1",
  sh: "shell-accent4",
  sql: "sql-accent6",
  svg: "svg-accent2",
  svelte: "svelte-accent1",
  swift: "swift-accent1",
  tex: "tex-accent2",
  toml: "toml-accent6",
  ts: "typescript-accent5",
  tsx: "react-accent5",
  vue: "vue-accent4",
  yaml: "yaml-accent3",
  yml: "yaml-accent3",
  zip: "archive-accent3",
};
const obsidianFileNames = {
  "AGENTS.md": "agent",
  "agents.md": "agent",
  "API.md": "api",
  "api.md": "api",
  "CHANGELOG.md": "changelog",
  "changelog.md": "changelog",
  "CLAUDE.md": "agent",
  "claude.md": "agent",
  "CURSOR.md": "cursor",
  "cursor.md": "cursor",
  "PROMPTS.md": "prompts",
  "prompts.md": "prompts",
  "package.json": "npm-accent1",
  "README.md": "readme",
  "readme.md": "readme",
  "TODO.md": "todo",
  "todo.md": "todo",
};

const lines = [
  "// stylelint-disable",
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
  "  display: inline-flex;",
  "  align-items: center;",
  "  justify-content: center;",
  "  width: var(--monokai-file-tree-slot-size);",
  "  min-width: var(--monokai-file-tree-slot-size);",
  "  height: var(--monokai-file-tree-glyph-size);",
  "  margin-inline-end: calc(-1 * var(--monokai-file-tree-slot-size));",
  "  transform: translateX(calc(-1 * (var(--monokai-file-tree-slot-size) + var(--monokai-file-tree-icon-gap))));",
  `  --monokai-file-icon-color: ${defaultFileIcon.fontColor};`,
  '  color: var(--monokai-file-icon-color, var(--icon-color));',
  `  content: "${cssContent(defaultFileIcon.fontCharacter)}";`,
  '  font-family: "monokai-pro-icons";',
  "  font-size: var(--monokai-file-tree-glyph-size);",
  "  font-style: normal;",
  "  font-variant: normal;",
  "  font-weight: 400;",
  "  line-height: 1;",
  "  pointer-events: none;",
  "  speak: never;",
  "  text-align: center;",
  "  text-rendering: auto;",
  "}",
  "",
];

for (const [extension, iconId] of sortedEntries(obsidianFileExtensions)) {
  const definition = iconByClass(theme, iconId);
  const escapedExtension = cssAttribute(extension);
  lines.push(iconRule([`.nav-file-title[data-path$=".${escapedExtension}"]::before`], definition));
}

for (const [fileName, iconId] of sortedEntries(obsidianFileNames)) {
  const definition = iconByClass(theme, iconId);
  lines.push(iconRule(normalizeFileNameSelector(fileName), definition));
}

lines.push(iconRule([
  '.nav-file-title[data-path^="Bug_"][data-path$=".md"]::before',
  '.nav-file-title[data-path*="/Bug_"][data-path$=".md"]::before',
], iconByClass(theme, "bug")));

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${lines.join("\n")}\n`);

console.log(`已生成文件树图标样式：${outputPath}`);
