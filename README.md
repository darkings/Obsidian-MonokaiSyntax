# Monokai Syntax

Monokai Syntax 是一个面向 Obsidian 的 Monokai Pro 风格主题，重点优化写作、代码笔记、文件树导航、阅读模式、Live Preview、关系图谱和 Canvas 的长期使用体验。

![Monokai Syntax](./MonokaiSyntax.png)

## 版本

当前版本：`1.0.2`

最低 Obsidian 版本：`1.0.0`

## 主要特性

- Monokai Pro 风格深色与浅色调色板。
- CodeMirror 6 语法高亮映射到 Monokai 六色光谱。
- 阅读模式与 Live Preview 使用共享语义变量收敛视觉差异。
- 文件树图标覆盖常见文档、配置、代码与项目文件。
- 文件树同层级文件夹与 Markdown 文件对齐，根层折叠图标使用轻量尺寸。
- Callout、块引用、任务列表、表格、代码块、链接、标签、脚注、图片与附件嵌入统一样式层级。
- 关系图谱、Canvas、Ribbon、标签页、弹窗和搜索界面适配主题色。
- 支持 Style Settings：调色板滤镜、紧凑模式、图标模式、字体、强调色、链接色与代码色。
- 构建产物不加载远程运行时资源，图标字体以内联 woff 形式打包。

## 1.0.2 更新重点

- 系统收敛阅读模式与 Live Preview 的视觉差异，专项验证覆盖 30 项样式一致性检查。
- 优化 H1-H6 标题下边距，按标题层级递减。
- 修正文件树同层级文件夹与 Markdown 文件的对齐问题。
- 调整根层文件夹折叠图标尺寸与线宽，避免视觉过重。
- 更新代码 token 颜色，使深色模式更贴近 Monokai Pro。
- 增强代码块、表格源码、块引用、Callout、标签、链接、脚注、附件嵌入和扩展任务状态的阅读/编辑一致性。
- 增加发布前验证：版本一致性、生成文件一致性、样式 polish、Vault QA 和 CSS 审计。

## 安装

### 手动安装

在你的 Obsidian vault 中创建目录：

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

建议安装 Obsidian 社区插件 `Style Settings`，以获得完整配置体验。

当前支持：

- 调色板滤镜：Classic、Machine、Octagon、Ristretto、Spectrum。
- 紧凑模式。
- 彩色或单色文件树图标。
- 文件树图标开关。
- 字体与排版选项。
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
git tag v1.0.2
git push origin v1.0.2
```

5. GitHub Actions 会在标签推送后运行发布检查并创建 Release，附件包含 `theme.css` 与 `manifest.json`。

## 验证覆盖

当前发布前验证包含：

- 版本一致性检查。
- 图标字体生成与覆盖验证。
- 阅读模式与 Live Preview 样式一致性验证。
- Active 视觉覆盖验证。
- 关系图谱变量验证。
- Node 测试。
- Stylelint。
- WCAG 对比度检查。
- 构建产物一致性检查。
- CSS 审计：禁止远程资源、`!important` 与 ID 选择器。
- Vault 侧 QA 验证。

## 许可证

MIT。详见 [LICENSE.md](./LICENSE.md)。
