# Callout 与块引用 Monokai Pro 风格重设计

**日期:** 2026-05-08
**状态:** 已确认

## 动机

当前 Callout 和块引用样式在五个方面偏离 Monokai Pro 设计语言：

1. **背景色太重** — 11%-18% 透明度的着色叠加层像独立面板
2. **缺少左竖线强调** — VS Code Monokai Pro 使用装订线式彩色强调，而非四边描边的卡片
3. **颜色语义不对** — 块引用用了绿色而非 Monokai Pro 标志性暖金；Callout 标题统一青色，无视类型差异
4. **太"卡片化"** — 四边圆角描边使元素与正文割裂
5. **间距太紧** — 边框到内容的 padding 不足

此外，Callout 图标使用 Obsidian 默认的 Lucide 图标，未与 Monokai Pro 代码编辑器主题风格对齐。

## 设计目标

- 元素与正文**融合**，而非漂浮的独立卡片
- 颜色作为**精确强调**（左侧竖线），而非整片铺底
- 语义色对齐 Monokai Pro 调色板
- 间距宽松舒适
- Callout 图标采用**代码符号风格**，匹配 Monokai Pro 作为代码编辑器主题的血统

## 涉及范围

三个文件：

| 文件 | 改动 |
|---|---|
| `src/scss/_variables.scss` | 新增块引用暖金色 SCSS 变量（深浅模式各一） |
| `src/scss/components/_editor.scss` | 重写 `.HyperMD-quote`、`.cm-quote`、`.callout` 样式块，新增 callout 图标样式 |

## 颜色映射

### 块引用

| 模式 | 竖线颜色 | 背景 |
|---|---|---|
| 暗色 | `#e6db74`（Monokai Pro 黄） | 无 |
| 浅色 | `#cc7a0a`（Monokai Pro 黄） | 无 |

### Callout（按语义分组）

| 分组 | 颜色 | 暗色 Hex | 浅色 Hex |
|---|---|---|---|
| note / info | 青 Cyan | `#66d9ef` | `#14748a` |
| warning / caution | 橙 Orange | `#fd971f` | `#e16032` |
| error / danger | 洋红 Magenta | `#f92672` | `#e14775` |
| success / check | 绿 Green | `#a6e22e` | `#269d69` |

## 元素规格

### 块引用

- **边框：** 左侧 2px 实线暖金色；其余三边无边框
- **背景：** 无（透明）
- **圆角：** 右侧 `var(--radius-s)`，左侧直角
- **内边距：** `1rem 1rem 1rem 1.5rem`——文字与竖线之间留足间距
- **文字颜色：** `var(--text-normal)`

### Callout 容器

- **边框：** 左侧 2px 实线语义色；其余三边无边框
- **背景：** 与语义色同色相的极微着色
  - 暗色：`rgb(<color> / 5%)`
  - 浅色：`rgb(<color> / 6%)`
- **圆角：** 右侧 `var(--radius-s)`，左侧直角
- **内边距：** `1.25rem`
- **标题：** `font-weight: 700`，颜色跟随语义分组
- **内容区间距：** 标题与正文之间 1rem 间距

### Callout 图标（代码符号风格）

隐藏 Obsidian 默认的 Lucide SVG 图标，改用 `::before` 伪元素渲染代码风格符号：

| Callout 分组 | 符号 | 含义 |
|---|---|---|
| note / info | `#[i]` | 预处理指令风格，`#` + 信息标识 `i` |
| warning / caution | `<!>` | HTML 警告标记风格，`!` 居中于尖括号 |
| error / danger | `[×]` | 断言失败风格，`×` 居中于方括号 |
| success / check | `{✓}` | 返回成功风格，`✓` 居中于花括号 |

- **字体：** `var(--font-monospace-theme)` 等宽字体，确保符号对齐
- **颜色：** 跟随各分组的语义色
- **大小：** 与 callout 标题文字大小一致
- **渲染行为：** 纯 Unicode 字符 + CSS `content`，零外部依赖，无需修改 woff 字体文件
- **图标 SVG 处理：** `.callout-icon` 内的 `svg` 元素 `display: none`，改用 `.callout-icon::before` 显示符号

## 暗色模式 CSS 变量

```css
--monokai-blockquote-border: #e6db74;
--monokai-callout-note-bg: rgb(102 217 239 / 5%);
--monokai-callout-note-border: #66d9ef;
--monokai-callout-warning-bg: rgb(253 151 31 / 5%);
--monokai-callout-warning-border: #fd971f;
--monokai-callout-error-bg: rgb(249 38 114 / 5%);
--monokai-callout-error-border: #f92672;
--monokai-callout-success-bg: rgb(166 226 46 / 5%);
--monokai-callout-success-border: #a6e22e;
```

## 浅色模式 CSS 变量

```css
--monokai-blockquote-border: #cc7a0a;
--monokai-callout-note-bg: rgb(20 116 138 / 6%);
--monokai-callout-note-border: #14748a;
--monokai-callout-warning-bg: rgb(225 96 50 / 6%);
--monokai-callout-warning-border: #e16032;
--monokai-callout-error-bg: rgb(225 71 117 / 6%);
--monokai-callout-error-border: #e14775;
--monokai-callout-success-bg: rgb(38 157 105 / 6%);
--monokai-callout-success-border: #269d69;
```

## 需修改的选择器

### 阅读视图（`.markdown-rendered`）

- `blockquote` — 竖线颜色改为 `var(--monokai-blockquote-border)`，移除背景
- `.callout` — 四边描边替换为仅左侧语义色竖线
- `.callout-title` — 继承语义色作为文字颜色
- `.callout-content` — 继承语义色背景
- `.callout-icon svg` — `display: none` 隐藏默认图标
- `.callout-icon::before` — 显示代码风格符号，使用 `content` + 等宽字体 + 语义色
- `.callout[data-callout="..."] .callout-icon::before` — 按分组设置不同符号

### 实时预览（`HyperMD-quote`、`.cm-quote`）

- `.HyperMD-quote` — 与阅读视图一致：暖金竖线，无背景
- `.cm-quote` — 继承样式
- `.callout` — 与阅读视图一致（容器 + 图标 + 标题 + 内容）

## 不在范围内

- Callout 折叠/展开行为（保持不变）
- Style Settings 集成（无需新增开关）
- Canvas 内嵌 Callout（非现有功能）
- 修改 `monokai-pro-icons.woff` 字体文件（不需要，用 Unicode 字符实现）
