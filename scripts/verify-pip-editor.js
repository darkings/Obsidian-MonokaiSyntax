import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { readEditorScss } from "./scss-source.js";

const activeVisualPath = resolve(import.meta.dirname, "../src/scss/_active-visual-overrides.scss");
const rootDir = resolve(import.meta.dirname, "..");
const editorScss = readEditorScss(rootDir);
const activeVisualScss = readFileSync(activeVisualPath, "utf8");

const checks = [
  ["行内代码使用强调背景变量", /--monokai-inline-code-background:/],
  ["行内代码编辑与阅读模式使用同一 padding 变量", /--monokai-inline-code-padding:\s*0\.1em 0\.3em;[\s\S]*\.markdown-rendered[\s\S]*?code[\s\S]*?padding:\s*var\(--monokai-inline-code-padding\);[\s\S]*\.cm-inline-code[\s\S]*?padding:\s*var\(--monokai-inline-code-padding\);/],
  ["行内代码不使用着色边框变量", !/--monokai-inline-code-border:/.test(editorScss)],
  ["阅读视图行内代码不使用边框阴影", /\.markdown-rendered[\s\S]*?code[\s\S]*?box-shadow:\s*none;/],
  ["阅读视图块引用背景保持透明", /\.markdown-rendered[\s\S]*?blockquote[\s\S]*?background-color:\s*transparent;/],
  ["Obsidian 块引用原生变量同步透明背景", /--blockquote-background-color:\s*transparent;/],
  ["Obsidian 块引用原生变量同步细边框", /--blockquote-border-thickness:\s*2px;/],
  ["阅读视图块引用使用左边框", /\.markdown-rendered[\s\S]*?blockquote[\s\S]*?border-inline-start:\s*2px solid var\(--monokai-blockquote-border\);/],
  ["阅读视图块引用增加左侧呼吸感", /\.markdown-rendered[\s\S]*?blockquote[\s\S]*?padding:\s*#\{\$spacing-3\} #\{\$spacing-3\} #\{\$spacing-3\} var\(--monokai-blockquote-content-gap\);/],
  ["深色块引用边框使用 Monokai Pro 绿色", /body\.theme-dark[\s\S]*?--monokai-blockquote-border:\s*#\{\$color-pro-green\};/],
  ["浅色块引用边框使用 Monokai 绿色", /body\.theme-light[\s\S]*?--monokai-blockquote-border:\s*#\{\$color-light-green\};/],
  ["Live Preview 块引用取消默认格式符号显示", /\.cm-formatting-quote[\s\S]*?display:\s*none;/],
  ["Live Preview 块引用标记不重复绘制边框", /\.cm-quote[\s\S]*?border-inline-start:\s*0;/],
  ["Live Preview 块引用背景保持透明", /\.HyperMD-quote[\s\S]*?background-color:\s*transparent;/],
  ["Live Preview 块引用使用左边框", /\.HyperMD-quote[\s\S]*?border-inline-start:\s*2px solid var\(--monokai-blockquote-border\);/],
  ["Live Preview 块引用文本自身保留间距", /\.HyperMD-quote[\s\S]*?\.cm-quote[\s\S]*?margin-left:\s*var\(--monokai-blockquote-content-gap\);/],
  ["浅色模式 H1-H3 字重为 700", /body\.theme-light[\s\S]*?--monokai-heading-weight:\s*700;/],
  ["深色模式 H1-H3 字重为 600", /body\.theme-dark[\s\S]*?--monokai-heading-weight:\s*600;/],
  ["标题样式使用 PIP 字重变量", /font-weight:\s*var\(--monokai-heading-weight\)/],
  ["高分屏文本平滑策略", /-webkit-font-smoothing:\s*antialiased;/],
  ["深色 Callout 使用 Monokai Pro 语义背景变量", /body\.theme-dark[\s\S]*?--monokai-callout-note-bg:\s*rgb\(120 220 232 \/ 12%\);[\s\S]*?--monokai-callout-note-border:\s*#\{\$color-pro-cyan\};/],
  ["Obsidian Callout 原生变量同步面板 padding", /--callout-padding:\s*1\.25rem;/],
  ["Obsidian Callout 原生变量同步内容 padding", /--callout-content-padding:\s*var\(--spacing-4\) 0 0 0;/],
  ["Callout 面板使用语义背景变量", /\.callout[\s\S]*?background-color:\s*var\(--callout-background, transparent\);/],
  ["表格边框使用增强变量", /(?:\.markdown-rendered[\s\S]*?table|\.markdown-rendered[\s\S]*?th,[\s\S]*?\.markdown-rendered[\s\S]*?td)[\s\S]*?border:\s*1px solid var\(--monokai-table-border\);/],
  ["已完成任务保持可见", /\.markdown-rendered[\s\S]*?\.task-list-item\.is-checked[\s\S]*?color:\s*var\(--monokai-task-done-color\);/],
  ["未使用 !important", !/!important/i.test(`${editorScss}\n${activeVisualScss}`)],
];

let hasFailure = false;

for (const [label, pattern] of checks) {
  const scss = label.includes("块引用") || label.includes("Callout") || label.includes("Obsidian")
    ? `${editorScss}\n${activeVisualScss}`
    : editorScss;
  const passed = typeof pattern === "boolean" ? pattern : pattern.test(scss);
  console.log(`${label}: ${passed ? "通过" : "失败"}`);

  if (!passed) {
    hasFailure = true;
  }
}

if (hasFailure) {
  process.exitCode = 1;
}
