# Monokai Syntax

[English](https://github.com/Darkings/Obsidian-MonokaiSyntax/blob/master/README.md) | [开发说明](https://github.com/Darkings/Obsidian-MonokaiSyntax/blob/master/DEVELOPMENT.zh.md) | [GitHub](https://github.com/Darkings/Obsidian-MonokaiSyntax)

Monokai Syntax 是一个受 Monokai Pro 视觉语言启发的 Obsidian 社区主题，面向写作、代码笔记、知识库导航、关系图谱与长期知识管理场景优化。

![Monokai Syntax](./MonokaiSyntax.png)

## 亮点

- 面向 Obsidian 的 Monokai 风格深色与浅色调色板。
- Markdown 阅读视图与 Live Preview 样式优化。
- CodeMirror 6 语法高亮映射到 Monokai 六色光谱。
- 文件树、Ribbon、标签页、弹窗、关系图谱与 Canvas 细节打磨。
- 自定义文件图标，支持彩色与单色模式。
- 支持 Style Settings 调整调色板滤镜、密度、图标、字体与强调色。
- 最终主题 CSS 不加载远程运行时资源。

## 1.0.1 更新

- 扩展文档图标覆盖：README、TODO、CHANGELOG、API、PROMPTS、CURSOR、CLAUDE、AGENTS 与 `Bug_*.md`。
- Callout 图标改用 `icons/icons.woff` 内置 glyph，并放大图标尺寸，补齐 Monokai 风格语义背景色与左边框。
- 文件树第二层及以后文件夹折叠图标改用 `folder-dimmed2`，根目录第一层保留 Obsidian 原生折叠图标。
- Style Settings 新增关闭文档树图标开关。
- 优化文件树紧凑模式的字号、行高与图标间距。

## 安装

### 社区主题

Monokai Syntax 已发布到 Obsidian 社区主题商店。

打开 Obsidian，进入 `设置` -> `外观` -> `主题` -> `管理`，搜索 `Monokai Syntax`，然后安装并启用。

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

然后在 Obsidian 的外观设置中启用 `Monokai Syntax`。

## Style Settings

建议安装 Obsidian 社区插件 `Style Settings`，以获得完整配置体验。

当前支持：

- 调色板滤镜：Classic、Machine、Octagon、Ristretto、Spectrum。
- 紧凑密度。
- 彩色或单色文件图标。
- 字体与排版选项。
- 强调色、链接色与代码色覆盖。

## 未来规划

- 扩展文件图标覆盖。
- 继续打磨 Markdown 阅读视图与 Live Preview 细节。
- 增强 Style Settings 覆盖范围。
- 优化关系图谱、Canvas 与插件兼容性。
- 跟进 Obsidian UI 变化，持续维护已发布的社区主题版本。

## 开发

构建、检查、审计与 Vault 同步说明见 [DEVELOPMENT.zh.md](https://github.com/Darkings/Obsidian-MonokaiSyntax/blob/master/DEVELOPMENT.zh.md)。

## 许可证

MIT。详见 [LICENSE.md](https://github.com/Darkings/Obsidian-MonokaiSyntax/blob/master/LICENSE.md)。
