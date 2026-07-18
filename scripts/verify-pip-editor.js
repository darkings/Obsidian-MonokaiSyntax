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
  ["表格外层块容器不绘制边框", /\.markdown-rendered[\s\S]*?\.el-table,[\s\S]*?> div:has\(> table\),[\s\S]*?> div:has\(> \.table-wrapper\)\s*\{[\s\S]*?background:\s*transparent;[\s\S]*?border:\s*0;[\s\S]*?box-shadow:\s*none;[\s\S]*?margin-inline:\s*0;[\s\S]*?max-width:\s*var\(--monokai-table-max-width\);/],
  ["表格未知外层容器按结构兜底清框", /\.markdown-rendered[\s\S]*?> div:has\(> table\),[\s\S]*?> div:has\(> \.table-wrapper\)\s*\{[\s\S]*?background:\s*transparent;[\s\S]*?border:\s*0;[\s\S]*?box-shadow:\s*none;[\s\S]*?outline:\s*0;/],
  ["表格外层滚动容器不绘制边框", /\.markdown-rendered[\s\S]*?\.el-table > \.table-wrapper\s*\{[\s\S]*?background:\s*transparent;[\s\S]*?border:\s*0;[\s\S]*?box-shadow:\s*none;/],
  ["表格自身保留边框变量", /\.markdown-rendered[\s\S]*?table\s*\{[\s\S]*?border:\s*var\(--monokai-table-border-width\) solid var\(--monokai-table-border\);/],
  ["Live Preview 通用嵌入块不默认套用媒体外框", !/\.markdown-source-view\.mod-cm6[\s\S]*?\.image-embed,[\s\S]*?\.cm-embed-block\s*\{/.test(editorScss) && !/\.markdown-source-view\.mod-cm6[\s\S]*?\.internal-embed,[\s\S]*?\.cm-embed-block\s*\{/.test(editorScss)],
  ["Live Preview 表格嵌入块不套用媒体外框", /\.markdown-source-view\.mod-cm6[\s\S]*?\.cm-line:has\(\.cm-table\),[\s\S]*?\.cm-line:has\(\.cm-hmd-table-sep\),[\s\S]*?\.cm-table-widget,[\s\S]*?\.cm-embed-block:has\(table\)\s*\{[\s\S]*?background-color:\s*transparent;[\s\S]*?border:\s*0;[\s\S]*?border-radius:\s*0;[\s\S]*?box-shadow:\s*none;[\s\S]*?box-sizing:\s*border-box;[\s\S]*?margin-inline:\s*0;[\s\S]*?max-width:\s*100%;[\s\S]*?min-width:\s*0;[\s\S]*?overflow:\s*visible;[\s\S]*?padding:\s*0;[\s\S]*?width:\s*auto;/],
  ["Live Preview 表格行保留阅读行高", /\.HyperMD-table-row[\s\S]*?line-height:\s*var\(--monokai-table-line-height\);/],
  ["Live Preview 表格恢复自然宽度", /\.markdown-source-view\.mod-cm6[\s\S]*?\.table-wrapper table,[\s\S]*?\.el-table table,[\s\S]*?\.cm-table-widget table,[\s\S]*?\.cm-embed-block:has\(table\) table\s*\{[\s\S]*?max-width:\s*100%;[\s\S]*?min-width:\s*0;[\s\S]*?width:\s*auto;/],
  ["Live Preview 表格编辑器真实 DOM 左侧对齐", /\.markdown-source-view\.mod-cm6[\s\S]*?\.cm-embed-block\.cm-table-widget\.markdown-rendered\s*\{[\s\S]*?box-sizing:\s*border-box;[\s\S]*?margin-inline:\s*0;[\s\S]*?padding-inline-start:\s*var\(--monokai-editor-block-offset\);[\s\S]*?width:\s*100%;/],
  ["Live Preview 表格编辑器单元格保留内边距", /\.markdown-source-view\.mod-cm6[\s\S]*?\.cm-table-widget table\.table-editor \.table-cell-wrapper\s*\{[\s\S]*?padding:\s*var\(--monokai-table-cell-padding\);/],
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
