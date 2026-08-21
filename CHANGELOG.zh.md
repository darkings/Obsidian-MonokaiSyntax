# 更新日志

**Monokai Syntax** 的所有重要变更记录于此。项目遵循 [语义化版本](https://semver.org/lang/zh-CN/) 与 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/) 规范。

> `README.zh.md` 仅保留最新版本，此文件为完整版本历史。

---

## [1.1.8] - 2026-08-21

### 变更
- **兼容性：** `minAppVersion` `1.0.0 → 1.5.8`（`manifest.json`、`versions.json: 1.1.8 → 1.5.8`）。消除 Obsidian 1.4.5 视口下的 `css-relative-colors` / `css-scrollbar` / `text-decoration` 警告。Obsidian 1.5.8 ≈ Electron 28 / Chrome 118 已完整支持 `rgb(from ...)` 与 `color-mix`。
- **体积：** `icons.woff 14,148B → icons.woff2 11,616B`（`fontTools 4.63 + brotli 1.2`，`base64 -18%`），`font-display: block → swap`（1.1.7 已落地，现生效）。`theme.css` `161,982B → 158,699B`（`dist 150.85KB`，`gzip 31.97KB`）。`generate-icon-theme.js` 优先使用 `woff2`。

### 修复
- `scripts/audit-css.js`、`verify-icons.js`、`verify-generated.js` 同时接受 `data:font/woff2;base64` 与 `woff`，修复 woff2 切换后的 CI `verify:artifact` / `verify:icons` 失败。

**提交：** `c8ff164` `dadfd70` | **标签：** `1.1.8` | **Release：** `https://github.com/darkings/Obsidian-MonokaiSyntax/releases/tag/1.1.8`

---

## [1.1.7] - 2026-08-21

Monokai Pro **默认滤镜（Pro/Octagon #2D2A2E）** 还原 + 编辑器工程化打磨。

### 新增
- Style Settings 新增开关 `类型斜体` / `装饰器斜体`（位于排版，默认关闭），保留 Pro 仅关键字斜体的风格。

### 变更
- **调色板：** `H1` `#FF9AB0 → #FF6188`（改为 `$color-pro-magenta`，以 `font-weight:700` 区分）；侧栏 `hover #403E41 → #3D3A3E` 与 `border #403E41` 分离，分隔线 `4% → 6%`、滚动条 `10% → 12%`；代码注释 `#727072 → #7A757C`（对比度 `3.32 → 3.62`，阈值 `3 → 3.5`，`$color-pro-comment` 单源）。
- **浅色：** 代码块 `background #F0EEE7 → #EBE8DF`、`border #D2CEC4 → #C8C2B2 (1.45:1)`、`header #EDE9DF`；`check-contrast` 检测值对齐真实变量 `#FAF8F2 / #F0EEE7 / #EBE8DF`。
- **排版：** `Inter → Inter + Noto Sans SC / PingFang SC / Microsoft YaHei`；等宽 `Fira Code + JetBrains Mono / Maple Mono / Noto Sans Mono SC`。
- **装订线：** `translateX(-100% + 0.25rem)` Hack → `display:flex + padding-inline-end:1rem + transform:none`，缩放与字号下更稳定。
- **表格：** `--table-max-width min(100%,62rem) → 100%`、`--table-min-width min(100%,48rem) → fit-content`，外层 `overflow-x:auto`，首列 `5.5rem nowrap → 0 anywhere`，`table { max-width:none; min-width:fit-content; width:100% }` + `@media (width <=768px) { th,td padding 0.4rem 0.6rem }`——窄表拉伸，宽表可横滑，移动端友好。
- **交互：** 标签去掉 `translateY/box-shadow` 仅过渡 `border-color`，链接下划线 `0.3s → 200ms + will-change`；补齐文件树、标签、图谱、Canvas 的 `focus-visible` 焦点环（`_base.scss`、`_graph.scss`、`_canvas.scss`）。
- **工程：** `$color-pro-comment` 单源、`--monokai-editor-selection-background` 别名 `--monokai-selection-background`；字体 `display: swap`；复选框 `border-width 1.5px`。
- **细节：** 深色 `blockquote` 去阴影（浅色保留）；`CODE` 标签 `inset-inline-end +1.8rem` 避让 `Copy` 按钮；默认调色板 `跟随系统 → Pro`（`10-palette.css.md`）。

### 修复
- `test/monokai-pro-polish.test.js` 与 `test/optimization-guardrails.test.js` 更新为新装订线（`display:flex`、`transform:none`）与新调色板断言。
- `scripts/verify-style-polish.js` 放宽为接受 `100%|fit-content` 与 `var(--monokai-selection-background)`。
- `scripts/check-contrast.js` 背景校正为真实变量。

**提交：** `c5d3eaf`、`aa11e0b` | **标签：** `1.1.7`

---

## [1.1.6] - 2026-08-19

### 新增
- Style Settings → 排版 → **行号显示**（`默认跟随` / `显示` / `隐藏`，`monokai-syntax-line-numbers-*`）。

### 修复
- 二级及更深层文件夹展开/折叠箭头：展开朝下、折叠朝右，`0.25s cubic-bezier` 平滑旋转。
- 浅色设置弹窗内容区背景：`纯白 → 暖纸张 #FAF8F2`。

**标签：** `1.1.6` | **Release：** `2026-08-19T14:11:47Z`

---

## [1.1.5] - 2026-07-30

### 新增
- Style Settings 文案完全中英双语（`name/title/description/label`），`test/monokai-pro-polish.test.js` 正则校验。

### 变更
- 标题与强调样式打磨：`title / bold / italic` 颜色变量细化。

**提交：** `ed06833`、`1f492be` | **标签：** `1.1.5`

---

## [1.1.4] - 2026-07-23

### 变更
- 优化代码高亮与 Callout 编辑体验；中英文 `README` 精简。

**提交：** `5f03125`、`6cbb831` | **标签：** `1.1.4`

---

## [1.1.3] - 2026-07-23

### 修复
- 社区主题界面修复（记录于 `docs/Monokai Pro – 社区主题界面修复设计`）。

**提交：** `34b258b`、`8f8d1bb` | **标签：** `1.1.3`

---

## [1.1.2] - 2026-07-18

大批量基线打磨（`1.1.1..1.1.2` 间 11 个提交，`dc2c4c5` → `c2ac892`）：

### 修复 / 变更
- **布局：** 统一 `codeblock` 控件、`mermaid/math/dataview` 插件面板。
- **编辑器：** 拆分 `_editor.scss` 为 `tokens / reading / source / syntax / links` 模块（`@forward`）。
- **构建：** 启用 `vite --cssMinify` 压缩输出。
- **文件树：** 弱化选中态、移除左条、修复双分隔线、弱化滚动条干扰。
- **阅读视图：** 优化表格阅读与编辑样式。
- **变量：** 整理基础变量与动效变量（`--radius`、`--monokai-transition-*`）。

**标签：** `1.1.2`

---

## [1.1.1] - 2026-06-27

### 修复
- 修正 GitHub Release 标签说明与 Obsidian 发布标签文档。

**提交：** `69506e4`、`b7db2bd`、`48ce735` | **标签：** `1.1.1`

---

## [1.1.0] - 2026-06-27

### 新增
- **Monokai Pro 对标：** 完整 `monokai-filter` mixin（80+ 变量）、光谱 `#FF6188 #FC9867 #FFD866 #A9DC76 #78DCE8 #AB9DF2`、`Graph / Canvas / Ribbon / Tabs / Modals` 统一变量。

**提交：** `4bc66db → f601cd2 → 9d010e9` | **标签：** `1.1.0`

---

## [1.0.2] - 2026-06-22

### 变更
- 工程质量与样式优化：新增 `verify:versions`、`verify:palette`、`verify:graph`、`verify:active-visual` 流水线；修复左侧边栏背景。

**提交：** `4bc66db` | **标签：** `1.0.2`（无 GitHub Release）

---

## [1.0.1] - 2026-05-15

### 修复
- 消除 Obsidian CSS 审核警告（`!important`、`id` 选择器、`stylelint-disable` 残留、远程 URL）。
- 修正 GitHub Release 标签规则（`v*` vs `[0-9]*`）。

**提交：** `642baf0`、`6bf9800`、`3d8ff07`、`11814ca`、`f963a19` | **标签：** `1.0.1` | **Release：** `2026-05-15`

---

## [1.0.0] - 2026-05-13

### 新增
- 首版 **Monokai Syntax** Obsidian 主题：Monokai Pro 深色 + 浅纸张浅色、Style Settings 调色板、CodeMirror 6 光谱、阅读/Live Preview 共享变量、文件树图标、Callout（`concept/syntax/api/...`）、任务、表格、代码块、Graph/Canvas。
- `theme.css` 输出到仓库根目录、`screenshot.png`（512×288）、`icons/` 字体（14 个 `icon-theme.json` 后精简）、`CHANGELOG` 与 GitHub Actions CI/Release 工作流（`5bd19eb`）。

**提交：** `923be75`（另 `16a6554`） | **标签：** `1.0.0` | **Release：** `Monokai Syntax 1.0.0` `2026-05-13T09:35:26Z`

---

## 链接

- [Unreleased]: https://github.com/darkings/Obsidian-MonokaiSyntax/compare/1.1.8...HEAD
- [1.1.8]: https://github.com/darkings/Obsidian-MonokaiSyntax/compare/1.1.7...1.1.8
- [1.1.7]: https://github.com/darkings/Obsidian-MonokaiSyntax/compare/1.1.6...1.1.7
- [1.1.6]: https://github.com/darkings/Obsidian-MonokaiSyntax/compare/1.1.5...1.1.6
- [1.1.5]: https://github.com/darkings/Obsidian-MonokaiSyntax/compare/1.1.4...1.1.5
- [1.1.4]: https://github.com/darkings/Obsidian-MonokaiSyntax/compare/1.1.3...1.1.4
- [1.1.3]: https://github.com/darkings/Obsidian-MonokaiSyntax/compare/1.1.2...1.1.3
- [1.1.2]: https://github.com/darkings/Obsidian-MonokaiSyntax/compare/1.1.1...1.1.2
- [1.1.1]: https://github.com/darkings/Obsidian-MonokaiSyntax/compare/1.1.0...1.1.1
- [1.1.0]: https://github.com/darkings/Obsidian-MonokaiSyntax/compare/1.0.1...1.1.0
- [1.0.1]: https://github.com/darkings/Obsidian-MonokaiSyntax/compare/1.0.0...1.0.1
- [1.0.0]: https://github.com/darkings/Obsidian-MonokaiSyntax/releases/tag/1.0.0
