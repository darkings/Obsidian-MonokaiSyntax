# 开发说明

本文档面向贡献者与本地主题开发。用户安装说明见 [README.zh.md](./README.zh.md)。

## 环境要求

- Node.js
- npm
- Obsidian 1.0.0 或更高版本

## 初始化

克隆仓库并安装依赖：

```powershell
git clone https://github.com/Darkings/Obsidian-MonokaiSyntax.git
cd Obsidian-MonokaiSyntax
npm install
```

## 常用命令

生产构建：

```powershell
npm run build
```

运行 SCSS 检查：

```powershell
npm run lint:css
```

运行 CSS 质量检查：

```powershell
npm run check:contrast
npm run audit:css
```

验证主题生成细节：

```powershell
npm run verify:icons
npm run verify:graph
npm run verify:active-visual
```

运行完整发布前检查：

```powershell
npm run release:pack
```

## 监听构建

编辑 SCSS 时使用监听模式：

```powershell
npm run dev
```

## Vault 同步

构建并同步到默认 Obsidian vault：

```powershell
npm run build:vault
```

构建并同步到自定义 vault：

```powershell
npm run build:vault -- D:/你的/Obsidian/Vault
```

脚本会将主题文件写入：

```text
目标 Vault/.obsidian/themes/Monokai Syntax/
```

然后在 Obsidian 的外观设置中启用 `Monokai Syntax`。

## 图标生成

图标样式由本地图标字体源生成：

```powershell
npm run generate:icons
```

该生成脚本也会在 `npm run build` 和 `npm run lint:css` 前自动运行。

## 项目结构

```text
src/main.js                         # Vite 入口
src/scss/index.scss                 # SCSS 模块入口
src/scss/_variables.scss            # 设计 token
src/scss/_base.scss                 # Obsidian CSS 变量映射
src/scss/components/                # 核心 UI 界面
src/scss/plugins/                   # 插件专项样式
src/css/style-settings/             # Style Settings 元数据块
scripts/                            # 构建、验证与同步脚本
dist/theme.css                      # 构建后的主题 CSS
theme.css                           # 用于 Obsidian 打包的根主题 CSS
manifest.json                       # Obsidian 主题清单
```

## 运行时资源约束

最终主题 CSS 不得加载远程运行时资源。禁止使用远程 `@import`、远程字体 URL 或远程图片 URL。字体、图标与图片资源必须本地化并确认许可证。
