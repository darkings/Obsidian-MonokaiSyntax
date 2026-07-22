# 社区主题搜索框与 README 代码块修复设计

## 背景

Monokai Syntax 在 Obsidian“设置 → 外观 → 主题 → 管理”界面存在两个可在桌面端和移动端复现的样式回归：

1. 社区主题搜索框的搜索图标与占位文字发生重叠。
2. 主题 README 预览中的代码块语言标签进入代码内容区域，与首行文字发生重叠。

普通笔记阅读模式中的代码块不受第二个问题影响，因此修复必须限制在社区主题模态框，不能改变普通笔记、Live Preview 或源码模式的代码块布局。

## 根因

### 搜索框

Obsidian 原生 `.search-input-container input` 使用 `padding-inline-start: 36px` 为搜索图标保留空间，并在输入非空时单独扩大末端内边距以容纳清除按钮。

主题的 `.modal input[type="search"]` 与其他输入控件共用 `padding: 0.45rem 0.6rem`。该规则在主题 CSS 中后加载且特异性更高，覆盖了 Obsidian 原生搜索框的起始内边距，导致图标与文字重叠。当前工作树中添加的通用 `padding-inline: 2.15rem` 能缓解起始端重叠，但同时覆盖末端的清除按钮间距，不是完整修复。

### README 代码块

社区主题 README 使用 `.community-modal-readme.markdown-rendered` 渲染。其代码块可能直接包含 `.code-block-flair` 语言标签。Obsidian 只为编辑器源码视图中的 `.code-block-flair` 提供定位规则，而主题将该标签设为始终可见，却没有为社区 README DOM 提供定位和占位空间，导致标签进入普通文档流并压住代码首行。

## 设计

### 搜索框

- 保留模态框输入控件现有的颜色、背景、边框、圆角和焦点环。
- 将通用 `padding` 从 `.modal input[type="search"]` 中分离，仅用于普通文本输入、提示框输入和文本域。
- 不覆盖 `.search-input-container` 的原生起始与末端内边距，让 Obsidian 继续管理搜索图标和清除按钮的位置。
- 删除当前工作树中针对所有设置搜索框的通用 `padding-inline` 覆盖；Style Settings 搜索框只保留尺寸与容器宽度调整。

### README 代码块

- 只在 `.community-modal-readme` 内处理直接子级 `.code-block-flair`。
- 当代码块包含语言标签时，增加顶部内边距，为标签建立独立的一行空间。
- 将语言标签绝对定位到右上区域，使用逻辑方向属性以兼容从右到左界面。
- 为潜在的复制按钮预留水平空间，防止语言标签和复制按钮相互覆盖。
- 保留代码块的横向滚动；不强制长路径折行。
- 不修改普通 `.markdown-rendered pre`、Live Preview 或 CodeMirror 代码块的默认布局。

## 自动化测试

实施遵循测试驱动流程：

1. 新增搜索框回归断言，确认通用模态框规则不再覆盖搜索输入的原生 inline padding，并确认 Style Settings 搜索框没有重新引入相同覆盖。
2. 新增社区 README 代码块断言，确认带语言标签的 `pre` 获得顶部占位，且直接子级 `.code-block-flair` 使用绝对定位和逻辑方向属性。
3. 先运行相关测试并确认因缺少修复而失败，再修改 SCSS 使其通过。
4. 运行 Node 测试、Stylelint、生产构建和完整 `npm run verify`。

## 视觉验收

- 桌面与窄屏布局中，搜索图标、占位文字和清除按钮互不重叠。
- 社区 README 代码块语言标签固定在右上区域，代码首行从标签下方开始。
- 长路径保持单行并可横向滚动。
- 深色和浅色主题均保持可读。
- 普通笔记阅读模式、Live Preview 和源码模式代码块无视觉变化。

## 非目标

- 不重构整个模态框或代码块组件。
- 不改变 README Markdown 内容。
- 不改变代码语法配色、复制按钮行为或普通笔记的语言标签策略。
- 不针对单一设备写专用规则。
