import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const graphPath = resolve(import.meta.dirname, "../src/scss/plugins/_graph.scss");
const graphScss = readFileSync(graphPath, "utf8");

const checks = [
  ["图谱颜色支持过渡", /\.graph-view[\s\S]*?transition:[\s\S]*?color 140ms ease/],
  ["图谱背景支持过渡", /\.graph-view[\s\S]*?background-color 180ms ease/],
  ["图谱使用 Monokai Pro 背景变量", /\.graph-view[\s\S]*?background-color:\s*var\(--monokai-graph-background\)/],
  ["图谱背景默认继承当前滤镜侧栏背景", /\.graph-view[\s\S]*?--monokai-graph-background:\s*var\(--background-secondary\)/],
  ["图谱高亮节点跟随滤镜红色光谱", /\.graph-view[\s\S]*?--monokai-graph-focused:\s*var\(--monokai-spectrum-red, var\(--interactive-accent\)\)/],
  ["图谱标签节点跟随滤镜紫色光谱", /\.graph-view[\s\S]*?--monokai-graph-node-tag:\s*var\(--monokai-spectrum-purple, var\(--h6-color\)\)/],
  ["图谱附件节点跟随滤镜绿色光谱", /\.graph-view[\s\S]*?--monokai-graph-node-attachment:\s*var\(--monokai-spectrum-green, var\(--h4-color\)\)/],
  ["图谱控制区使用 Monokai 面板变量", /\.graph-controls[\s\S]*?background-color:\s*var\(--monokai-graph-panel\)/],
  ["图谱高亮节点无光晕", (scss) => !/drop-shadow\(/.test(scss)],
  ["图谱容器无呼吸光晕伪元素", (scss) => !/\.workspace-leaf-content\[data-type="graph"\] \.view-content::before/.test(scss)],
  ["图谱容器无径向光背景", (scss) => !/radial-gradient\(circle at 50% 45%, var\(--monokai-graph-ring\)/.test(scss)],
  ["图谱控制按钮支持动画", /\.graph-controls-button[\s\S]*?transition:[\s\S]*?transform 140ms ease/],
  ["图谱控制按钮 hover 轻微上移", /\.graph-controls-button:hover[\s\S]*?transform:\s*translateY\(-1px\)/],
  ["图谱控制按钮点击时轻微晃动", /\.graph-controls-button:active[\s\S]*?animation:\s*monokai-graph-tap 160ms ease-out/],
  ["图谱控制按钮点击态复位", /\.graph-controls-button:active[\s\S]*?transform:\s*translateY\(0\)/],
  ["图谱点击晃动关键帧", /@keyframes monokai-graph-tap[\s\S]*?translateX\(1px\)[\s\S]*?translateX\(-1px\)/],
  ["图谱面板获得焦点时响应", /\.workspace-leaf-content\[data-type="graph"\]:focus-within[\s\S]*?box-shadow:/],
  ["局部图谱面板获得焦点时响应", /\.workspace-leaf-content\[data-type="localgraph"\]:focus-within[\s\S]*?box-shadow:/],
  ["支持减少动画偏好", /@media \(prefers-reduced-motion: reduce\)/],
  ["减少动画偏好关闭点击晃动", /@media \(prefers-reduced-motion: reduce\)[\s\S]*?animation:\s*none/],
];

let hasFailure = false;

for (const [label, pattern] of checks) {
  const passed = typeof pattern === "function" ? pattern(graphScss) : pattern.test(graphScss);
  console.log(`${label}: ${passed ? "通过" : "失败"}`);

  if (!passed) {
    hasFailure = true;
  }
}

if (hasFailure) {
  process.exitCode = 1;
}
