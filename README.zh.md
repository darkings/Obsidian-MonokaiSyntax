# Monokai Syntax

[English README](./README.md)

Monokai Syntax 是一个面向 Obsidian 的 Monokai Pro 风格主题，主要用于代码学习笔记、长期技术写作和日常知识管理。主题重点让阅读模式、Live Preview、文件树、代码块、Callout、关系图谱和 Canvas 保持一致的工作台体验。

![Monokai Syntax](./MonokaiSyntax.png)

## 版本

当前版本：`1.1.8`

最低 Obsidian 版本：`1.5.8`

## 1.1.8 更新说明

- **兼容性：** `minAppVersion` 提升 `1.0.0 → 1.5.8`，消除 `css-relative-colors / css-scrollbar / text-decoration` 在 1.4.5 视口下的部分支持警告（1.5.8 ≈ Electron 28 / Chrome 118 已完整支持 `rgb(from ...)` / `color-mix`）。
- **体积：** `icons.woff (14.1KB) → icons.woff2 (11.6KB)` 由 `fontTools + brotli` 压缩（base64 体积 `-18%`），`font-display: swap` 已在 1.1.7 落地；`theme.css` `161KB → ~158KB`（gzip `~34.7KB`）。

> 历史版本说明请查看 [CHANGELOG.zh.md](./CHANGELOG.zh.md)。

## 主要特性

- Monokai Pro **默认滤镜 Pro/Octagon `#2D2A2E`** 深色与暖纸张浅色（`#FAF8F2`）双调色板，`monokai-filter` 单点维护 80 个语义变量。
- Style Settings 调色板 `跟随系统 / Pro（默认） / Light`。
- CodeMirror 6 语法映射光谱 `#FF6188 #FC9867 #FFD866 #A9DC76 #78DCE8 #AB9DF2`，默认仅关键字斜体，可选类型/装饰器斜体。
- 阅读模式与 Live Preview 共享语义间距、排版、代码、Callout、块引用、标签、任务、表格和链接变量。
- 中文友好字体栈：正文 `Inter + Noto Sans SC / PingFang SC`，等宽 `Fira Code + JetBrains Mono / Maple Mono`。
- 文件树图标覆盖常见 Markdown、项目、配置、代码和 Obsidian 专属文件；一级保留原生折叠箭头，二级起用 Monokai 小三角。
- 代码学习 Callout 覆盖 `concept`、`syntax`、`api`、`debug`、`pitfall`、`exercise`、`answer`、`source`、`output`、`terminal`，采用竖线 rail 与 `6%/12%` 侧栏标记。
- 任务状态、API 参数表（响应式 `anywhere` 换行）、行内代码、代码块（浅色独立背景）、Mermaid、Math、Dataview、嵌入、图片、标签、链接和脚注针对技术笔记优化。
- 关系图谱、Canvas、Ribbon、标签页、弹窗、搜索、设置和插件界面复用统一变量；无远程资源，图标字体内联 `woff`（`swap`，自动 `woff2`）。
- 完整校验：`check:contrast` 30 项、`audit:css` 无 `!important`/远程、`verify:palette/active-visual` 及 39 项单测全通过。

## 许可证

本主题采用 MIT 许可证，详见 [LICENSE.md](./LICENSE.md)。
