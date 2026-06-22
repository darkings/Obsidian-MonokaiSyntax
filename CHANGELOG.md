# 更新日志 / Changelog

## 1.0.2（2026-06-22）

- 系统优化阅读模式与 Live Preview 的视觉一致性，专项验证扩展到 30 项。
- 修正文件树同层级文件夹与 Markdown 文件对齐问题。
- 调整根层文件夹折叠图标尺寸与线宽，降低视觉重量。
- 优化 H1-H6 标题下边距，按层级从大到小递减。
- 更新深色模式代码 token 色彩，使其更贴近 Monokai Pro。
- 补齐段落、表格源码、Callout、块引用、代码块、附件嵌入、标签、链接、脚注与扩展任务状态的阅读/编辑一致性规则。
- 增加版本一致性、生成文件一致性、样式 polish、Vault QA 等发布前验证。
- 更新发布版 README，补充安装、验证与 GitHub Release 流程。

## 1.0.1（2026-05-15）

- 完善文档树文档图标：README、TODO、CHANGELOG、API、PROMPTS、CURSOR、CLAUDE、AGENTS 与 `Bug_*.md`
- Callout 图标改为 `icons/icons.woff` 内置 glyph，放大图标尺寸，并补齐 Monokai 风格背景色与左边框
- 第二层及以后文件夹折叠图标改用 `folder-dimmed2`，根目录第一层保留 Obsidian 原生折叠图标
- Style Settings 增加关闭文档树图标开关
- 优化文件树紧凑模式的字号、行高与图标间距

## 1.0.0（未发布 / Unreleased）

- Monokai Syntax 初始版本 / Initial release
- Monokai Pro 深色与浅色调色板 / Dark and light color palettes
- SCSS 模块化架构 + Vite 构建工具链 / Modular SCSS architecture with Vite build toolchain
- CodeMirror 6 语法高亮 token 配色 / Syntax highlighting token colors
- 自定义文件树图标（monokai-pro-icons 字体）/ Custom file tree icons (monokai-pro-icons font)
- Style Settings 集成（5 种滤镜主题、紧凑模式、单色图标、强调色覆盖）/ Style Settings integration (5 filter themes, compact mode, monochrome icons, accent overrides)
- 关系图谱与 Canvas 插件样式 / Graph view and Canvas plugin styles
- WCAG 对比度合规 / WCAG contrast ratio compliance
- Callout 与块引用 Monokai Pro 风格重设计（语义色左竖线）/ Callout & blockquote Monokai Pro redesign (semantic left border)
