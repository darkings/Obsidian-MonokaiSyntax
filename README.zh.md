# Monokai Syntax

[English README](./README.md)

Monokai Syntax 是一个面向 Obsidian 的 Monokai Pro 风格主题，主要用于代码学习笔记、长期技术写作和日常知识管理。主题重点让阅读模式、Live Preview、文件树、代码块、Callout、关系图谱和 Canvas 保持一致的工作台体验。

![Monokai Syntax](./MonokaiSyntax.png)

## 版本

当前版本：`1.1.0`

最低 Obsidian 版本：`1.0.0`

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

## 1.1.0 更新重点

- 调色板系统聚焦为 Pro、Light 和跟随系统。
- 优化代码块、行内代码、当前行、选区、光标、gutter 和括号匹配状态。
- 扩展 CodeMirror token，覆盖类、类型、内建对象、属性、元信息和错误状态。
- 增加代码学习 Callout 和学习笔记常用任务状态。
- 重构文件树图标对齐与文件夹图标规则。
- 收敛阅读模式与 Live Preview 在标题、列表、块引用、Callout、代码、表格、标签和链接上的视觉差异。
- Style Settings 增加排版、密度、文件图标、标题色条、强调色、链接色和代码色控制。
- 增加版本、调色板、图标、图谱变量、视觉细节、对比度、生成产物和 CSS 质量检查。
- CSS 审计会拒绝发布产物中的远程资源、`!important`、ID 选择器和 Stylelint 控制注释。

## 安装

### 手动安装

在 Obsidian vault 中创建目录：

```text
你的 Vault/.obsidian/themes/Monokai Syntax/
```

复制以下文件到该目录：

```text
theme.css
manifest.json
```

然后在 Obsidian 中进入 `设置` -> `外观` -> `主题`，选择并启用 `Monokai Syntax`。

### 从 GitHub Release 安装

发布 GitHub Release 后，下载对应版本中的：

```text
theme.css
manifest.json
```

放入你的 vault 主题目录即可。

### 提交 Obsidian 社区主题

社区主题上架需要向 `obsidianmd/obsidian-releases` 提交主题信息 PR，并等待审核通过。审核通过后，用户才能在 Obsidian 的社区主题商店中搜索安装。

## Style Settings

主题不依赖额外插件也能使用。建议安装 Obsidian 社区插件 `Style Settings`，以获得完整配置体验。

当前支持：

- 调色板滤镜：`跟随系统`、`Pro`、`Light`。
- 密度模式。
- 彩色或单色文件树图标。
- 文件树图标开关。
- 状态栏右下角同步按钮显示开关。
- 字体与排版选项。
- 标题色条。
- 强调色、链接色与代码色覆盖。

## 本地开发

安装依赖：

```powershell
npm install
```

构建主题：

```powershell
npm run build
```

完整验证：

```powershell
npm run verify
```

构建并同步到默认 vault：

```powershell
npm run build:vault
```

发布前检查：

```powershell
npm run release:pack
```

## 发布流程

1. 确认 `package.json`、`manifest.json`、`versions.json` 版本一致。
2. 运行 `npm run release:pack`。
3. 确认根目录存在发布产物：

```text
theme.css
manifest.json
```

4. 创建并推送版本标签，例如：

```powershell
git tag v1.1.0
git push origin v1.1.0
```

5. GitHub Actions 会在标签推送后运行发布检查并创建 Release，附件包含 `theme.css` 与 `manifest.json`。

## 验证覆盖

当前发布前验证包含：

- 版本一致性检查。
- 调色板滤镜配置检查。
- 行内代码、编辑模式与阅读模式一致性检查。
- 文件图标生成与图标规则验证。
- 关系图谱变量验证。
- Active 视觉覆盖验证。
- 样式细节检查。
- Node 测试。
- Stylelint。
- WCAG 对比度检查。
- 构建产物一致性检查。
- CSS 审计：禁止远程资源、`!important`、ID 选择器和 Stylelint 控制注释。

## 许可证

MIT。详见 [LICENSE.md](./LICENSE.md)。
