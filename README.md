# Monokai Syntax

Monokai Syntax 是一个面向 Obsidian 的社区主题，目标是在知识管理场景中复现 Monokai Pro 的深色与浅色视觉语言。

## 项目状态

当前项目处于早期开发阶段，已经完成基础工程化脚手架、Vite 构建、Stylelint 检查和测试 Vault 同步流程。

## 安装依赖

```powershell
npm install
```

## 常用命令

检查 SCSS：

```powershell
npm run lint:css
```

构建主题：

```powershell
npm run build
```

构建并同步到测试 Vault：

```powershell
npm run build:vault
```

## 本地测试

本项目当前使用以下 Obsidian Vault 作为测试环境：

```text
C:\Users\Jie\iCloudDrive\iCloud~md~obsidian\SecondBrain
```

运行 `npm run build:vault` 后，主题文件会同步到：

```text
C:\Users\Jie\iCloudDrive\iCloud~md~obsidian\SecondBrain\.obsidian\themes\Monokai Syntax
```

之后可在 Obsidian 的外观设置中启用 `Monokai Syntax`。

## 远程资源约束

主题运行时 CSS 不得加载远程资源。禁止在最终主题 CSS 中使用远程 `@import`、远程字体 URL 或远程图片 URL。需要使用的字体、图标或图片资源必须本地化并确认许可证。

## 许可证

本项目使用 MIT 许可证。详情见 [LICENSE.md](./LICENSE.md)。
