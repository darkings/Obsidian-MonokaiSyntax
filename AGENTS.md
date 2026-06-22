# AGENTS.md

本文件为 Codex 在此仓库中工作时提供指导。

## 项目规范

- 本项目所有文档、注释、提交信息均使用中文书写（专业术语如 SCSS、CSS、Vite、Obsidian 等除外）。
- 长期项目文档、研究文档、路线图、QA 文档与问题汇总优先维护在 Obsidian 项目目录：

```text
C:\Users\Jie\iCloudDrive\iCloud~md~obsidian\SecondBrain\project\Monokai Syntax
```

- 当前仓库仅保留开发、构建、协作、发布与源码旁注所必需的文档。
- 将仓库文档迁移到上述 Obsidian 项目目录前，需先确认该文档不会被构建脚本、发布流程、协作规则或源码注释直接依赖。
- 已迁移到 Obsidian 项目目录的文档，不应在仓库中继续维护重复副本；如仓库流程需要引用，应在仓库文档中写明 Obsidian 目录中的目标位置。
- `docs/` 目录仅作为临时整理区使用。稳定的说明文档、QA 清单、路线图和研究报告应迁移到 Obsidian 项目目录。

## 构建命令

```
npm run dev            # 监听模式（SCSS 变更时重新构建 theme.css）
npm run build          # 生产构建 → dist/theme.css
npm run lint:css       # Stylelint 检查 src/scss/**/*.scss
npm run check:contrast # WCAG 对比度审计
npm run audit:css      # CSS 质量审计
npm run verify:icons   # 验证图标字体覆盖
npm run verify:graph   # 验证图谱 CSS 变量
npm run generate:icons # 从图标字体重新生成 file-icons.generated.scss
npm run release:pack   # 完整发布前检查（verify + lint + build + audit）
npm run build:vault              # 构建并同步到默认 Obsidian vault（可追加自定义路径）
npm run build:vault -- D:/你的/Vault   # 构建并同步到指定 Vault
```

`generate:icons` 脚本通过 `prebuild`/`prelint:css` 钩子在 `build` 和 `lint:css` 之前自动运行。

## 架构

这是一个 **Obsidian 主题**，将 VS Code Monokai Pro 调色板映射到 Obsidian 约 400 个 CSS 自定义属性上。构建工具链使用 **Vite**，配有一个自定义 `obsidianThemeBundle` 插件，将 `license.css` + 编译后的 SCSS + Style Settings YAML 配置拼接为单个 `dist/theme.css`。

### SCSS 模块层级（全部位于 `src/scss/`）

| 文件 | 职责 |
|---|---|
| `_variables.scss` | 设计 token：40+ 颜色原语（深色 + 浅色）、字体栈、间距、圆角 |
| `_mixins.scss` | `focus-ring`、`compact-density`、`reduced-motion` 等 mixin |
| `_base.scss` | 将 SCSS 变量映射到 Obsidian CSS 自定义属性（`:root`、`.theme-dark`、`.theme-light`），同时包含全局 UI 规则（导航、元数据、搜索、标签） |
| `components/_editor.scss` | Markdown 渲染与 CodeMirror 6 语法高亮（`.cm-s-obsidian` token 颜色） |
| `components/_ribbon.scss` | 左侧边栏 Ribbon（类似 VS Code 活动栏） |
| `components/_tabs.scss` | 工作区标签页头部，激活态强调下划线 |
| `components/_modals.scss` | 命令面板、提示框、建议弹窗 |
| `components/_file-icons.scss` | 自定义图标字体（`monokai-pro-icons`），用于文件树，支持单色切换 |
| `plugins/_graph.scss` | 关系图谱：节点/连线颜色、面板控件、聚焦环动画 |
| `plugins/_canvas.scss` | Canvas 卡片颜色映射到 Monokai 六色光谱 |
| `plugins/_style-settings.scss` | 动态开关：5 种滤镜主题（Machine/Octagon/Ristretto/Spectrum）、紧凑模式、单色图标、通过 `body` 类实现用户可覆盖的强调色/链接色/代码色 |

入口点为 `src/main.js`，仅导入 `src/scss/index.scss`。该文件按顺序转发 `variables → mixins → base → components → plugins`。

### Style Settings 配置（`src/css/style-settings/`）

这些 `*.css.md` 文件包含由 `obsidian-style-settings` 社区插件解析的 YAML 元数据块。Vite 插件按字母顺序排列并拼接到 `theme.css` 末尾。文件：`00-overview`、`10-palette`、`20-density`、`30-icons`、`40-typography`、`50-accents`。

### 关键 Obsidian CSS 变量

主题通过设置 Obsidian 文档化的 CSS 自定义属性来工作。最重要的分组：
- `--background-primary/secondary` — 主编辑区 vs 侧边栏背景
- `--text-normal/muted/faint` — 文本层级
- `--text-accent`、`--interactive-accent` — 行动号召洋红色
- `--h1-color` 至 `--h6-color` — 标题颜色级联（洋红 → 橙 → 黄 → 绿 → 青 → 紫）
- `--link-color`、`--link-external-color` — 青色链接
- `--blockquote-border-color` — 绿色边框
- `--code-*` — 代码语法 token 颜色
- `--nav-item-*`、`--ribbon-background` — 导航 chrome
- 自定义 `--monokai-*` 变量 — 滤镜和用户覆盖的内部桥接变量

## 约束

- **禁止外部资源的 `@import`** — Obsidian 审核流程拒绝在运行时获取远程字体/资源的主题。所有资源必须内联（图标字体以 Base64 编码在 `_file-icons.generated.scss` 中）。
- **禁止 `!important`** — Obsidian 的 CSS 级联依赖特异性；`!important` 会破坏用户 CSS 片段。
- **禁止 ID 选择器** — 由 Stylelint 强制执行；只允许使用 class。
- 主题目标为 Obsidian 1.0.0+（manifest.json 中的 `minAppVersion`），该版本引入了 CSS 变量系统。
