import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const editorPath = resolve(import.meta.dirname, "../src/scss/components/_editor.scss");
const editorScss = readFileSync(editorPath, "utf8");

const checks = [
  ["行内代码使用强调背景变量", /--monokai-inline-code-background:/],
  ["行内代码不使用着色边框变量", !/--monokai-inline-code-border:/.test(editorScss)],
  ["阅读视图行内代码不使用边框阴影", /\.markdown-rendered[\s\S]*?code[\s\S]*?box-shadow:\s*none;/],
  ["阅读视图块引用使用轻量背景变量", /\.markdown-rendered[\s\S]*?blockquote[\s\S]*?background-color:\s*var\(--monokai-blockquote-background\);/],
  ["Obsidian 块引用原生变量同步轻量背景", /--blockquote-background-color:\s*var\(--monokai-blockquote-background\);/],
  ["Obsidian 块引用原生变量同步细边框", /--blockquote-border-thickness:\s*2px;/],
  ["阅读视图块引用增加左侧呼吸感", /\.markdown-rendered[\s\S]*?blockquote[\s\S]*?padding:\s*var\(--spacing-3\) var\(--spacing-4\) var\(--spacing-3\) calc\(var\(--spacing-5\) \+ var\(--spacing-5\)\);/],
  ["深色块引用背景保持克制", /\.theme-dark[\s\S]*?--monokai-blockquote-background:\s*rgb\(169 220 118 \/ 11%\);/],
  ["浅色块引用背景保持克制", /\.theme-light[\s\S]*?--monokai-blockquote-background:\s*rgb\(38 157 105 \/ 9%\);/],
  ["Live Preview 块引用取消默认格式符号显示", /\.cm-formatting-quote[\s\S]*?display:\s*none;/],
  ["Live Preview 块引用标记不重复绘制边框", /\.cm-quote[\s\S]*?border-inline-start:\s*0;/],
  ["Live Preview 块引用使用轻量背景变量", /\.HyperMD-quote[\s\S]*?background-color:\s*var\(--monokai-blockquote-background\);/],
  ["Live Preview 块引用增加左侧呼吸感", /\.HyperMD-quote[\s\S]*?padding-inline-start:\s*calc\(var\(--spacing-5\) \+ var\(--spacing-5\)\);/],
  ["Live Preview 块引用文本自身保留间距", /\.HyperMD-quote[\s\S]*?\.cm-quote[\s\S]*?padding-inline-start:\s*var\(--spacing-4\);/],
  ["浅色模式 H1-H3 字重为 700", /\.theme-light[\s\S]*?--monokai-heading-weight:\s*700;/],
  ["深色模式 H1-H3 字重为 600", /\.theme-dark[\s\S]*?--monokai-heading-weight:\s*600;/],
  ["标题样式使用 PIP 字重变量", /font-weight:\s*var\(--monokai-heading-weight\)/],
  ["高分屏文本平滑策略", /-webkit-font-smoothing:\s*antialiased;/],
  ["深色 Callout 使用克制背景变量", /\.theme-dark[\s\S]*?--monokai-callout-background:\s*rgb\(102 217 239 \/ 14%\);/],
  ["Obsidian Callout 原生变量同步面板 padding", /--callout-padding:\s*var\(--spacing-5\) calc\(var\(--spacing-5\) \+ var\(--spacing-2\)\);/],
  ["Obsidian Callout 原生变量同步内容 padding", /--callout-content-padding:\s*var\(--spacing-3\) 0 0 0;/],
  ["Callout 面板使用克制背景变量", /\.callout[\s\S]*?background-color:\s*var\(--monokai-callout-background\);/],
  ["表格边框使用增强变量", /(?:\.markdown-rendered[\s\S]*?table|\.markdown-rendered[\s\S]*?th,[\s\S]*?\.markdown-rendered[\s\S]*?td)[\s\S]*?border:\s*1px solid var\(--monokai-table-border\);/],
  ["已完成任务保持可见", /\.markdown-rendered[\s\S]*?\.task-list-item\.is-checked[\s\S]*?color:\s*var\(--monokai-task-done-color\);/],
  ["未使用 !important", /^((?!important).)*$/s],
];

let hasFailure = false;

for (const [label, pattern] of checks) {
  const passed = typeof pattern === "boolean" ? pattern : pattern.test(editorScss);
  console.log(`${label}: ${passed ? "通过" : "失败"}`);

  if (!passed) {
    hasFailure = true;
  }
}

if (hasFailure) {
  process.exitCode = 1;
}
