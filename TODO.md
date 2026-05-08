# Monokai Syntax 项目 TODO

> 来源：`C:\Users\Jie\iCloudDrive\iCloud~md~obsidian\SecondBrain\project\Monokai Syntax\_RoadMap\原始开发规划.md`
> 目标：构建并发布一个名为 **Monokai Syntax** 的 Obsidian 社区主题。主题参考 Monokai Pro 深色与浅色调色板，采用模块化 SCSS、Style Settings 配置扩展，并具备合规的发布流程。

## 已确认项目参数

- 作者名称：`lat3ncy`
- 初始版本号：`1.0.0`
- 包管理器：`npm`
- 测试 Obsidian Vault 路径：`C:\Users\Jie\iCloudDrive\iCloud~md~obsidian\SecondBrain`
- Vault 验证结果：路径存在，且包含 `.obsidian` 配置目录。

## 阶段 0：项目初始化

- [x] 创建项目仓库结构。
  - [x] 添加 `package.json`。
  - [x] 添加 `manifest.json`。
  - [x] 添加 `versions.json`。
  - [x] 添加 `.github/` 工作流目录。
  - [x] 添加 `src/scss/`。
  - [x] 添加 `src/css/license.css`。
  - [x] 添加 `src/css/style-settings/`。
  - [x] 添加 `test/` 输出目录或 Vault 链接目录。
- [x] 配置 npm 脚本。
  - [x] 添加开发构建脚本。
  - [x] 添加生产构建脚本。
  - [x] 添加样式检查脚本。
  - [x] 添加发布打包脚本。
- [x] 配置 Vite 作为 CSS 构建引擎。
  - [x] 将 `src/scss/index.scss` 编译为最终主题 CSS。
  - [x] 注入静态许可证头部。
  - [x] 将生成后的 Style Settings 元数据追加到最终 CSS。
- [x] 配置 Stylelint。
  - [x] 禁止在常规主题 CSS 中使用 ID 选择器。
  - [x] 限制过深的选择器嵌套。
  - [x] 统一空格与格式规则。
  - [x] 标记不必要的 `!important` 用法。
- [x] 确定本地开发工作流。
  - [x] 将构建输出链接到测试 Obsidian Vault。
  - [x] 安装或记录 Obsidian 主题热重载支持方式。

## 阶段 1：主题元数据

- [x] 创建 `manifest.json`。
  - [x] 将 `name` 设置为 `Monokai Syntax`。
  - [x] 设置初始语义化版本号。
  - [x] 将 `minAppVersion` 设置为 `1.0.0`。
  - [x] 添加作者元数据。
  - [x] 添加深色与浅色模式支持声明。
- [x] 创建 `versions.json`。
  - [x] 将初始主题版本映射到最低支持的 Obsidian 版本。
- [x] 添加仓库文档。
  - [x] 添加 `README.md`，包含安装、开发与截图说明。
  - [x] 添加许可证信息。
  - [x] 说明运行时 CSS 不得加载远程资源。

## 阶段 2：SCSS 架构

- [x] 创建 `src/scss/index.scss`。
  - [x] 首先导入变量文件。
  - [x] 其次导入 mixin 文件。
  - [x] 导入基础主题变量。
  - [x] 导入组件模块。
  - [x] 导入插件模块。
  - [x] 导入 Style Settings 类名覆盖逻辑。
- [x] 创建 `src/scss/_variables.scss`。
  - [x] 定义深色调色板基础色。
  - [x] 定义浅色调色板基础色。
  - [x] 定义强调色、链接色、警告色、成功色、代码色、边框色与弱化色等语义别名。
  - [x] 定义排版变量。
  - [x] 定义间距与圆角变量。
- [x] 创建 `src/scss/_mixins.scss`。
  - [x] 按需添加主题模式辅助 mixin。
  - [x] 添加焦点环辅助 mixin。
  - [x] 添加紧凑密度辅助 mixin。
  - [x] 添加减少动画辅助 mixin。
- [x] 创建 `src/scss/_base.scss`。
  - [x] 挂载全局 `:root` 变量。
  - [x] 挂载 `.theme-dark` 变量。
  - [x] 挂载 `.theme-light` 变量。
  - [x] 设置基础字体与行高变量。
  - [x] 设置 Obsidian 核心背景与文本变量。

## 阶段 3：深浅色调色板映射

- [x] 实现深色模式基础颜色。
  - [x] 将 `#272822` 映射到 `--background-primary`。
  - [x] 将 `#1e1f1c` 映射到 `--background-secondary`。
  - [x] 将 `#f8f8f2` 映射到 `--text-normal`。
  - [x] 将低饱和灰色映射到弱化文本、图标、边框与悬停状态。
- [x] 实现深色模式语义强调色。
  - [x] 将洋红/红色映射到强调色与一级标题。
  - [x] 将橙色映射到二级标题与元数据标签。
  - [x] 将黄色映射到三级标题与文本高亮。
  - [x] 将绿色映射到块引用边框与已完成复选框。
  - [x] 将青色/蓝色映射到内部链接与外部链接。
  - [x] 将紫色映射到列表标记与行内代码点缀。
- [x] 实现浅色模式基础颜色。
  - [x] 将 `#fdf9f3` 映射到 `--background-primary`。
  - [x] 将 `#f5f0e6` 映射到 `--background-secondary`。
  - [x] 将 `#3d3d3d` 映射到 `--text-normal`。
  - [x] 确保非激活图标与弱化文本在浅色模式下仍清晰可见。
- [x] 实现浅色模式语义强调色。
  - [x] 将浅色洋红映射到强调色与一级标题。
  - [x] 将浅色橙色映射到二级标题与元数据标签。
  - [x] 将较深黄橙色映射到三级标题与文本高亮。
  - [x] 将森林绿映射到块引用边框与已完成复选框。
  - [x] 将较深青蓝色映射到链接。
  - [x] 将浅紫色映射到列表标记与行内代码点缀。
- [x] 检查核心对比度。
  - [x] 验证两种模式下的正文文本对比度。
  - [x] 验证两种模式下的链接对比度。
  - [x] 验证浅色模式下的图标可见性。
  - [x] 验证高亮文本可读性。

## 阶段 4：Markdown 与编辑器样式

- [x] 创建 `src/scss/components/_editor.scss`。
- [x] 设置标题样式。
  - [x] 为 H1、H2、H3 应用不同颜色。
  - [x] 保持编辑视图与阅读视图中的标题间距易读。
- [x] 设置强调文本样式。
  - [x] 让粗体文本颜色接近正文颜色。
  - [x] 增加粗体字重，避免制造不必要的视觉噪音。
  - [x] 设置斜体样式并保持可读性。
- [x] 设置链接样式。
  - [x] 应用青色/蓝色链接颜色。
  - [x] 仅在确有价值时区分内部链接与外部链接。
  - [x] 添加可访问的悬停与焦点状态。
- [x] 设置块引用样式。
  - [x] 使用绿色左边框。
  - [x] 保持引用文本颜色可读。
  - [x] 调整内边距与间距。
- [x] 设置列表与任务列表样式。
  - [x] 应用紫色列表标记。
  - [x] 使用绿色表示已完成复选框。
  - [x] 验证多级嵌套列表仍然清晰。
- [x] 设置行内代码与代码块。
  - [x] 使用类似编辑器的代码块背景。
  - [x] 调整内边距、圆角与边框。
  - [x] 应用等宽字体栈。
- [x] 设置 Markdown 高亮。
  - [x] 使用带模式区分透明度的黄色高亮。
  - [x] 确保高亮文本仍然可读。
- [x] 添加 CodeMirror 6 语法颜色。
  - [x] 将字符串映射为黄色。
  - [x] 将关键字映射为洋红色。
  - [x] 将函数映射为绿色或青色。
  - [x] 将常量与数字映射为紫色或橙色。
  - [x] 将注释映射为弱化灰色。
  - [x] 验证 Live Preview 与阅读视图的一致性。

## 阶段 5：Obsidian UI 组件

- [x] 创建 `src/scss/components/_ribbon.scss`。
  - [x] 让 Ribbon 背景与侧边栏背景保持一致。
  - [x] 设置非激活图标样式。
  - [x] 设置悬停图标样式。
  - [x] 设置激活图标样式。
- [x] 创建 `src/scss/components/_tabs.scss`。
  - [x] 设置工作区标签页样式。
  - [x] 设置激活标签页状态。
  - [x] 设置标签页悬停状态。
  - [x] 确保标题文本在两种模式下都可读。
- [x] 创建 `src/scss/components/_modals.scss`。
  - [x] 设置命令面板样式。
  - [x] 设置建议列表激活项样式。
  - [x] 设置弹窗背景与阴影。
  - [x] 设置输入框焦点状态。
- [x] 设置导航与文件浏览器样式。
  - [x] 调整文件树悬停状态。
  - [x] 调整已选中文件状态。
  - [x] 设置折叠指示器与图标。
  - [x] 验证侧边栏层级清晰。
- [x] 设置元数据与属性样式。
  - [x] 为元数据标签应用橙色。
  - [x] 保持属性值可读。
  - [x] 验证编辑控件可见。

## 阶段 6：核心插件样式

- [x] 创建 `src/scss/plugins/_graph.scss`。
  - [x] 设置关系图谱背景。
  - [x] 设置图谱节点样式。
  - [x] 设置图谱连线样式。
  - [x] 设置悬停与聚焦图谱状态。
  - [x] 避免密集图谱造成视觉拥堵。
- [x] 创建 `src/scss/plugins/_canvas.scss`。
  - [x] 将 Canvas 颜色预设 `color-1` 到 `color-6` 映射到 Monokai 调色板。
  - [x] 验证卡片在深色模式下可读。
  - [x] 验证卡片在浅色模式下可读。
  - [x] 设置 Canvas 选中与边线状态。
- [x] 检查常用核心插件界面。
  - [x] 搜索。
  - [x] 反向链接。
  - [x] 出链。
  - [x] 标签。
  - [x] 书签。

## 阶段 7：Style Settings 集成

- [x] 创建 `src/scss/plugins/_style-settings.scss`。
- [x] 在 `src/css/style-settings/` 下创建模块化 Style Settings 文件。
  - [x] 添加总览或根设置模块。
  - [x] 添加调色板滤镜设置模块。
  - [x] 添加密度设置模块。
  - [x] 添加图标设置模块。
  - [x] 添加排版与行宽设置模块。
  - [x] 添加强调色覆盖设置模块。
- [x] 实现滤镜类名选择。
  - [x] 添加 Classic 滤镜类。
  - [x] 添加 Machine 滤镜类。
  - [x] 添加 Octagon 滤镜类。
  - [x] 添加 Ristretto 滤镜类。
  - [x] 添加 Spectrum 滤镜类。
  - [x] 确认每个滤镜只覆盖必要且风格一致的一组变量。
- [x] 实现紧凑模式。
  - [x] 减小文件树行高。
  - [x] 减小 Ribbon 间距。
  - [x] 减小代码块内边距。
  - [x] 保留可用的点击目标尺寸。
- [x] 实现单色图标模式。
  - [x] 将文件树图标颜色转换为弱化灰阶。
  - [x] 保持激活状态可辨识。
- [x] 实现行宽控制。
  - [x] 添加可读行宽变量滑块。
  - [x] 支持从 `40rem` 到 `75rem` 的范围。
- [x] 实现强调色覆盖。
  - [x] 为强调色、链接色、成功色、警告色与代码色添加颜色变量控件。
  - [x] 验证覆盖值同时影响编辑器与 UI 变量。
- [x] 添加 Style Settings 元数据拼接构建步骤。
  - [x] 定义确定性的文件顺序。
  - [x] 将元数据追加到最终主题 CSS。
  - [x] 验证生成后的 CSS 注释语法。

## 阶段 8：资产与合规检查

- [x] 审计运行时 CSS 是否存在远程网络资源。
  - [x] 移除外部 `@import` 引用。
  - [x] 移除远程字体 URL。
  - [x] 移除远程图片 URL。
- [x] 确定字体策略。
  - [x] 默认使用系统字体栈。
  - [x] 如需打包字体，则本地化字体文件并记录许可证。
- [x] 审计 `!important` 用法。
  - [x] 移除可避免的声明。
  - [x] 仅保留覆盖 Obsidian 或插件行为时确实必要的声明。
- [x] 审计选择器特异性。
  - [x] 优先使用 Obsidian 变量。
  - [x] 仅在变量不足时使用定向选择器。
  - [x] 尽量避免脆弱的深层 DOM 选择器。

## 阶段 9：测试与视觉 QA

- [x] 创建测试 Obsidian Vault。
  - [x] 添加包含标题、列表、任务列表、链接、标签、Callout、表格、图片、嵌入、代码块与高亮的笔记。
  - [x] 添加长段落笔记，用于检查阅读舒适度。
  - [x] 添加关系图谱与 Canvas 示例内容。
- [ ] 测试深色模式。
  - [x] 验证编辑器视图。
  - [x] 验证阅读视图。
  - [ ] 验证侧边栏。
  - [ ] 验证命令面板。
  - [ ] 验证设置弹窗。
  - [ ] 验证关系图谱。
  - [ ] 验证 Canvas。
- [ ] 测试浅色模式。
  - [x] 验证编辑器视图。
  - [x] 验证阅读视图。
  - [ ] 验证侧边栏。
  - [ ] 验证命令面板。
  - [ ] 验证设置弹窗。
  - [ ] 验证关系图谱。
  - [ ] 验证 Canvas。
- [x] 测试 Style Settings 控件。
  - [x] 验证每个滤镜类。
  - [x] 验证紧凑模式。
  - [x] 验证单色图标。
  - [x] 验证行宽滑块。
  - [x] 验证强调色覆盖。
- [x] 测试基础可访问性。
  - [x] 检查文本对比度。
  - [x] 检查焦点可见性。
  - [x] 检查悬停与激活状态。
  - [x] 检查浅色模式图标可见性。
- [x] 测试构建输出。
  - [x] 运行 lint。
  - [x] 运行开发构建。
  - [x] 运行生产构建。
  - [x] 确认生成的主题 CSS 可在 Obsidian 中加载。

## 阶段 9.5：PIP 优化实现顺序

- [x] 实现 PIP 排版与高亮修复。
  - [x] 在 `src/scss/components/_editor.scss` 中强化行内代码样式。
  - [x] 修复 Live Preview 块引用 `>` 与左边框双线冲突。
  - [x] 设置浅色模式 H1-H3 字重为 `700`。
  - [x] 设置深色模式 H1-H3 字重为 `600`。
  - [x] 加入高分屏文本边缘平滑策略。
  - [x] 保持 Stylelint 规则，不使用 `!important`。
- [x] 实现零插件图标系统。
  - [x] 新增 `scripts/generate-icon-theme.js`。
  - [x] 读取 `icon-themes/Monokai Pro icon-theme.json` 和 `monokai-pro-icons.woff`。
  - [x] 提取 `iconDefinitions`、`fileExtensions`、`fileNames` 与文件夹图标映射。
  - [x] 将 `monokai-pro-icons.woff` 转为 base64 字体数据。
  - [x] 生成 `src/scss/components/_file-icons.generated.scss`。
  - [x] 新增 `src/scss/components/_file-icons.scss` 并从组件入口导入。
  - [x] 使用 `[data-path$="..."]` 选择器为文件树扩展名匹配图标。
  - [x] 使用文件名选择器覆盖 `package.json`、`README.md`、`TODO.md` 等特殊文件。
  - [x] 实现文件夹、展开文件夹、根文件夹图标。
  - [x] 支持单色图标模式与彩色图标模式。
- [x] 更新合规与构建检查。
  - [x] 调整 `audit:css`，允许 `data:font/woff;base64` 本地内联字体。
  - [x] 继续禁止远程 `http://`、`https://`、外部 `@import` 和 `!important`。
  - [x] 将图标生成脚本接入构建或发布前流程。
  - [x] 运行 `npm run lint:css`。
  - [x] 运行 `npm run check:contrast`。
  - [x] 运行 `npm run build:vault`。
  - [x] 运行 `npm run audit:css`。
- [x] 优化关系图谱交互响应。
  - [x] 为图谱颜色、背景和高亮状态添加轻微过渡。
  - [x] 为图谱控制按钮添加 hover 上移与点击复位动画。
  - [x] 为图谱控制按钮添加点击时的轻微横向晃动反馈。
  - [x] 为全局图谱与局部图谱面板添加聚焦反馈。
  - [x] 移除关系图谱节点光晕，保持视觉 QA 前的干净底色。
  - [x] 移除关系图谱容器空闲呼吸光晕。
  - [x] 将关系图谱默认黑底调整为经典 Monokai Pro 深暖灰背景。
  - [x] 将关系图谱底色对齐导航栏与标题栏背景。
  - [x] 为关系图谱节点、连线、聚焦点、标签点与附件点应用经典 Monokai Pro 配色。
  - [x] 支持 `prefers-reduced-motion`，减少动画偏好下关闭过渡与位移。
- [x] 完成深浅色阅读视图视觉 QA 微调。
  - [x] 降低 Callout 背景视觉权重。
  - [x] 增强表格边框清晰度。
  - [x] 提高已完成任务状态可见性。
  - [x] 为阅读视图块引用添加克制背景与更舒适的左侧间距。

## 阶段 9.6：Active 视觉问题修复

> 来源：`C:\Users\Jie\iCloudDrive\iCloud~md~obsidian\SecondBrain\project\Monokai Syntax\Active\主题视觉问题汇总_ThemeVisualIssues.md`

- [x] 修复导航栏文件夹折叠图标重复问题。
  - [x] 移除导致双折叠箭头的额外文件夹图标。
  - [x] 第一层保留 Obsidian 默认折叠图标。
  - [x] 第二层使用修改后的 Monokai 折叠图标。
- [x] 修复属性面板视觉不一致问题。
  - [x] 调整笔记属性中属性值的底色。
  - [x] 确保属性值背景与 Monokai Syntax 整体配色一致。
- [x] 重构编辑模式 Callout 样式。
  - [x] 拉开绿色长条框体与文本之间的距离。
  - [x] 使用基于 `#414339` 的低透明度内容背景。
  - [x] 保持 Callout 内容背景与主背景 `#272822` 有区分但不过度抢眼。
  - [x] 将 `note` 与 `info` 映射到蓝青色 `#66d9ef`。
  - [x] 将 `warning` 与 `caution` 映射到橙色 `#fd971f` 或黄色 `#e6db74`。
  - [x] 将 `error` 与 `danger` 映射到洋红色 `#f92672`。
  - [x] 将 `success` 与 `check` 映射到荧光绿 `#a6e22e`。
- [x] 隐藏文档编辑区域最上方的冗余标题。
  - [x] 确认编辑区域顶部不再重复显示当前文档标题。
  - [x] 确认不影响标签页标题、文件列表标题与阅读视图标题。
- [x] 校准 Dark Mode 核心配色。
  - [x] 对齐正文区域与 VS Code Monokai Pro 的主背景观感。
  - [x] 对齐标题栏与 VS Code Monokai Pro 的界面层级。
  - [x] 对齐导航栏与 VS Code Monokai Pro 的界面层级。
- [x] 优化 Terminal 插件面板样式。
  - [x] 调整终端面板边距。
  - [x] 让 Terminal 插件面板与主题整体间距系统一致。
- [x] 复核行内代码样式。
  - [x] 暗色主题使用比正文背景稍浅的行内代码背景。
  - [x] 亮色主题使用比正文背景稍深的行内代码背景。
  - [x] 行内代码文字颜色统一使用 Monokai Pro 绿色。
- [x] 为特殊 Markdown 文件名添加专属图标。
  - [x] `AGENTS.md` 显示专属图标。
  - [x] `CLAUDE.md` 显示专属图标。
  - [x] 确认专属图标与普通 Markdown 文件图标可区分。

## 阶段 9.7：9.6 视觉返工项

- [x] 调整行内代码样式。
  - [x] 移除行内代码边框着色。
  - [x] 保留行内代码与正文的背景区分。
  - [x] 保留行内代码文字使用 Monokai Pro 绿色。
- [x] 移除笔记属性值背景色。
  - [x] 去掉属性值容器的额外背景色。
  - [x] 保持属性值文字、输入态和焦点态清晰可读。
- [x] 调整块引用样式。
  - [x] 块引用左侧竖条改用 Monokai Pro 黄色。
  - [x] 减小块引用左侧竖条粗细。
  - [x] 加大块引用文字与左侧竖条之间的间距。
- [x] 恢复 Callout 到最开始版本的蓝色背景方案。
  - [x] 使用早期蓝色背景变量作为 Callout 面板背景。
  - [x] 保留必要的内容间距优化。
  - [x] 复核编辑视图与阅读视图中的 Callout 可读性。

## 阶段 9.8：视觉反馈二次返工

- [x] 调整行内代码背景。
  - [x] 行内代码背景色与当前明亮/黑暗模式下代码块背景色相同。
  - [x] 保留行内代码文字使用 Monokai Pro 绿色。
- [x] 调整块引用样式。
  - [x] 块引用左侧竖条改回 Monokai Pro 绿色。
  - [x] 继续保持较细竖条。
  - [x] 进一步加大块引用文字与竖条之间的距离。
- [x] 按截图调整 Callout 样式。
  - [x] 使用 Monokai Pro 蓝青色作为标题、图标和边框语义色。
  - [x] 使用同色低透明度背景形成浅蓝面板。
  - [x] 保持边框、标题、正文在深色和浅色模式下都清晰。
- [x] 调整复选框颜色。
  - [x] 未选中状态使用 Monokai Pro 黄色。
  - [x] 选中状态使用 Monokai Pro 绿色。
  - [x] 所有颜色均来自 Monokai Pro 调色板。

## 阶段 9.9：Callout 与块引用间距微调

- [x] 调整 Callout 内边距。
  - [x] Callout 边框内的标题与正文都保留清晰 padding。
  - [x] Callout 正文与标题之间保留舒适间距。
- [x] 优化块引用文字间距。
  - [x] 保留当前绿色背景与绿色细竖条方向。
  - [x] 明显拉开块引用文字与左侧竖条距离。
  - [x] 保持块引用正文可读，不让绿色背景过重。

## 阶段 10：CI 与发布自动化

- [x] 创建 GitHub Actions 工作流。
  - [x] 安装依赖。
  - [x] 运行 Stylelint。
  - [x] 运行生产构建。
  - [x] 打包 `theme.css`、`manifest.json` 与所需发布资产。
- [x] 添加由语义化版本标签触发的发布工作流。
  - [x] 使用 `v1.0.0` 等标签触发。
  - [x] 将构建后的 CSS 与 manifest 附加到 GitHub Release。
  - [x] 构建产物缺失时让发布失败（`fail_on_unmatched_files: true`）。
- [x] 添加发布前检查清单。
  - [x] 确认各元数据文件中的版本号一致（`release:pack` 脚本已包含）。
  - [x] 确认存在变更日志条目（`CHANGELOG.md` 已创建）。
  - [ ] 确认截图为最新版本。
  - [x] 确认没有引用远程资源（`audit:css` 已包含）。

## 阶段 10.5：Callout 与块引用 Monokai Pro 重设计（进行中）

> Callout 和块引用样式对齐 Monokai Pro 编辑器的装订线式彩色竖线风格。

- [x] 块引用：暖金色竖线（`#e6db74`/`#cc7a0a`），无背景，阅读+编辑模式统一
- [x] Callout：语义色左侧竖线（青/橙/洋红/绿），极微着色背景（暗 12%/浅 14%）
- [x] Callout 图标：代码符号风格（`#[i]` `<!>` `[×]` `{✓}`），隐藏默认 Lucide SVG
- [x] 间距优化：块引用左间距 1.25rem，Callout 内边距 1.25rem
- [x] 修复编辑模式块引用 inline style 覆盖问题（`:has(.cm-quote)` + `margin-left` 方案）
- [x] 修复 Callout 双竖条（`.cm-callout` 与 `.callout` 分离）
- [x] CSS 规则收归 `_active-visual-overrides.scss` 单一源
- [ ] 最终视觉 QA 确认：编辑模式 Callout 图标显示、背景可见度、间距统一性

## 阶段 11：社区主题提交

- [ ] 创建官方要求的主题截图。
  - [ ] 使用 512 x 288 分辨率。
  - [ ] 使用 16:9 宽高比。
  - [ ] 展示深浅两种模式，或制作具有代表性的高质量预览。
- [ ] 准备官方提交元数据。
  - [ ] 主题名称：`Monokai Syntax`。
  - [ ] 作者名称或 ID。
  - [ ] 仓库 URL。
  - [ ] 支持模式：`dark`、`light`。
- [ ] Fork `obsidianmd/obsidian-releases`。
- [ ] 更新 `community-css-themes.json`。
- [ ] 提交主题收录 Pull Request。
- [ ] 根据审核反馈进行调整。
- [ ] 审核通过后发布第一个稳定版本。

## 里程碑顺序

- [ ] 里程碑 1：仓库脚手架可以构建空主题 CSS。
- [ ] 里程碑 2：深色与浅色基础调色板可在 Obsidian 中正常工作。
- [ ] 里程碑 3：Markdown 编辑器与阅读视图完成打磨。
- [ ] 里程碑 4：Obsidian UI 界面符合 Monokai Syntax 视觉语言。
- [ ] 里程碑 5：关系图谱、Canvas 与 Style Settings 可正常使用。
- [x] 里程碑 6：Lint、构建与发布自动化通过。
- [ ] 里程碑 7：社区主题提交材料准备完成。
