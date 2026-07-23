# Monokai Syntax

[English README](./README.md)

Monokai Syntax 是一个面向 Obsidian 的 Monokai Pro 风格主题，主要用于代码学习笔记、长期技术写作和日常知识管理。主题重点让阅读模式、Live Preview、文件树、代码块、Callout、关系图谱和 Canvas 保持一致的工作台体验。

![Monokai Syntax](./MonokaiSyntax.png)

## 版本

当前版本：`1.1.4`

最低 Obsidian 版本：`1.0.0`

## 1.1.4 更新说明

- 优化代码块视觉层级，在阅读模式与 Live Preview 中区分对象键、字符串值、数值、关键字、函数、运算符和注释。
- 调整 Light 配色的语法对比度，同时保留 Monokai 风格光谱。
- 将 Callout 重构为紧凑的信息卡片，与代码块共享背景，并保留语义色条。
- 改善 Callout 源码编辑体验，显示 `>` 与 `[!type]` 标记，保留卡片背景并压缩源码标记间距。
- 修复社区主题浏览器搜索框错位，以及主题 README 预览中语言标签覆盖代码的问题。
- 扩充语法 token、对比度、Callout 编辑、模态框搜索和社区主题 README 代码块回归检查。

## 主要特性

- Monokai Pro 风格深色调色板，以及针对浅色模式调校的 Light 调色板。
- Style Settings 调色板支持 `跟随系统`、`Pro`、`Light`。
- CodeMirror 6 语法高亮映射到 Monokai 风格光谱。
- 阅读模式与 Live Preview 共享语义间距、排版、代码、Callout、块引用、标签、任务、表格和链接变量。
- 文件树图标覆盖常见 Markdown、项目、配置、代码和 Obsidian 专属文件。
- 一级文件夹保留 Obsidian 原生折叠图标；二级及更深层文件夹使用 Monokai 自定义小三角，并避免双图标。
- 代码学习 Callout 覆盖 `concept`、`syntax`、`api`、`debug`、`pitfall`、`exercise`、`answer`、`source`、`output`、`terminal`。
- 任务状态、API 参数表、行内代码、代码块、Mermaid、Math、Dataview、嵌入、图片、标签、链接和脚注都针对技术笔记做了样式优化。
- 关系图谱、Canvas、Ribbon、标签页、弹窗、搜索、设置和插件界面复用统一主题变量。
- 不加载远程运行时资源，图标字体以内联 WOFF 形式打包。

## 许可证

本主题采用 MIT 许可证，详见 [LICENSE.md](./LICENSE.md)。
