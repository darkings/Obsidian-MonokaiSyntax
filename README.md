# Monokai Syntax

Monokai Syntax 是一个面向 Obsidian 的 Monokai Pro 风格主题，重点优化写作、代码笔记、文件树导航、阅读模式、Live Preview、关系图谱和 Canvas 的长期使用体验。

![Monokai Syntax](./MonokaiSyntax.png)

## 版本

当前版本：`1.1.0`

最低 Obsidian 版本：`1.0.0`

## 主要特性

- Monokai Pro 默认滤镜，并支持 Classic、Machine、Octagon、Ristretto、Spectrum、Light、Sun。
- CodeMirror 6 语法高亮映射到 Monokai 六色光谱。
- 阅读模式与 Live Preview 使用共享语义变量收敛视觉差异。
- 文件树图标覆盖常见文档、配置、代码与项目文件。
- 文件树同层级文件夹与 Markdown 文件对齐，根层折叠图标使用轻量尺寸。
- Callout、块引用、任务列表、API 参数表、代码块、链接、标签、脚注、图片与附件嵌入统一样式层级。
- 代码学习语义 Callout 覆盖 concept、syntax、api、debug、pitfall、exercise、answer、source、output、terminal。
- Mermaid、Math、Dataview 复用主题 surface，避免插件内容跳出阅读层级。
- 关系图谱、Canvas、Ribbon、标签页、弹窗和搜索界面适配主题色。
- 支持 Style Settings：调色板滤镜、紧凑模式、图标模式、字体、强调色、链接色与代码色。
- 构建产物不加载远程运行时资源，图标字体以内联 woff 形式打包。

## 1.1.0 更新重点

- 默认滤镜切换为 Monokai Pro，并补齐 Light、Sun 两个浅色滤镜。
- 扩展 CodeMirror token、代码块 surface、active line、selection、cursor、gutter 和 bracket match。
- 增加代码学习 Callout、8 种任务状态、学习目录图标和 API 参数表语义。
- 优化标题导航感、列表层级、Mermaid、Math、Dataview、Graph 与 Canvas 的主题一致性。
- Style Settings 增加排版滑杆和标题色条开关，支持行宽、字号、代码行高、标题缩放与段落间距。
- 对 8 个滤镜运行多场景对比度审计，覆盖链接、代码注释、行号、选区文字、代码块边框和 Callout 标题。
- 建立视觉 QA 基线，自动生成长文、代码学习、Callout、Mermaid/Math/Dataview、Graph 和 Canvas 检查样例。

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

- 调色板滤镜：Pro、Classic、Machine、Octagon、Ristretto、Spectrum、Light、Sun。
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

视觉验收流程：

```powershell
npm run qa:create
npm run build:vault
npm run qa:verify
```

该流程会在默认 vault 中生成综合 QA 笔记，覆盖长文阅读、代码学习、学习 Callout、Mermaid、Math、Dataview、Graph 和 Canvas，然后验证 vault 已同步并启用 `Monokai Syntax` 主题。

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
