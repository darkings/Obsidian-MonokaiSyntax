# Monokai Syntax

[English README](./README.md)

Monokai Syntax 是一个面向 Obsidian 的 Monokai Pro 风格主题，主要用于代码学习笔记、长期技术写作和日常知识管理。主题重点让阅读模式、Live Preview、文件树、代码块、Callout、关系图谱和 Canvas 保持一致的工作台体验。

![Monokai Syntax](./MonokaiSyntax.png)

## 版本

当前版本：`1.1.7`

最低 Obsidian 版本：`1.0.0`

## 1.1.7 更新说明

Monokai Pro 默认滤镜还原 + 编辑器工程化打磨：

- **调色板还原：** `H1` 回归光谱红 `#FF6188`（改用字重区分，不再用 `#FF9AB0`）；侧栏 `hover`（`#3D3A3E`）与 `border`（`#403E41`）分离，分割线 `6%` / 滚动条 `12%` 提升层次；代码注释 `#727072 → #7A757C`（对比度 3.32 → 3.62，阈值提升至 3.5）。
- **浅色滤镜：** 代码块背景固定 `#EBE8DF`、边框 `#C8C2B2`（1.45:1）、表头 `#EDE9DF`；`check-contrast` 检测值对齐真实变量（`#FAF8F2 / #F0EEE7 / #EBE8DF`）。
- **排版：** 正文字体栈追加 `Noto Sans SC / PingFang SC / Microsoft YaHei`，等宽追加 `JetBrains Mono / Maple Mono / Noto Sans Mono SC`；`type/class` 与 `decorator` 默认不再斜体（保留 Pro 仅关键字斜体），新增 Style Settings 开关 `类型斜体` / `装饰器斜体`（默认关闭）。
- **编辑器装订线：** `translateX(-100%+0.25rem)` Hack → `display:flex + padding-inline-end:1rem + transform:none`，缩放与字号变化下更稳定。
- **表格：** `min-width: min(100%,48rem) → 0`，外层 `overflow-x:auto`，首列 `nowrap 5.5rem → anywhere`，修复移动端/分栏横向溢出。
- **交互：** 标签去掉 `translateY/box-shadow` 仅过渡 `border-color`，链接下划线 `0.3s → 200ms + will-change`；补齐文件树、标签、图谱、Canvas 的 `focus-visible` 焦点环。
- **工程化：** 新增 `$color-pro-comment` 单一源，`--monokai-editor-selection-background` 别名 `--monokai-selection-background`；字体 `display:block → swap` 并自动识别 `icons.woff2`；复选框边框 `1.5px` 提升可见度。
- **细节：** 深色块引用去掉阴影（浅色保留）；`CODE` 标签 `inset-inline-end +1.8rem` 避让复制按钮；默认调色板 `跟随系统 → Pro`。

## 1.1.6 更新说明

- 在 Style Settings 排版设置中新增“行号显示”配置项，支持默认跟随设置、强制显示与强制隐藏。
- 修复文件树二级及深层文件夹展开与折叠箭头方向，展开时箭头自然朝下，折叠时朝右，并支持平滑旋转过渡。
- 优化 Obsidian 设置界面在浅色模式下的内容区域背景色，使用柔和温暖的 Monokai 浅色底色替代纯白。

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
