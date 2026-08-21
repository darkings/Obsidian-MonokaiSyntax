/*
@settings

name: Monokai Syntax 排版 (Typography)
id: monokai-syntax-typography
settings:
  -
    id: monokai-syntax-markdown-reading-heading
    title: Markdown 阅读模式 (Markdown Reading)
    type: heading
    level: 2
  -
    id: monokai-readable-line-width
    title: 可读行宽 (Readable line width)
    type: variable-number-slider
    default: 45
    min: 40
    max: 75
    step: 1
    format: rem
  -
    id: monokai-body-font-size
    title: 正文字号 (Body font size)
    type: variable-number-slider
    default: 16
    min: 13
    max: 20
    step: 1
    format: px
  -
    id: monokai-syntax-editor-heading
    title: 编辑器 (Editor)
    type: heading
    level: 2
  -
    id: monokai-syntax-line-numbers-mode
    title: 行号显示 (Line numbers display)
    description: 设置编辑器行号显示与否 (Configure whether line numbers are displayed in editor)
    type: class-select
    allowEmpty: false
    default: monokai-syntax-line-numbers-default
    options:
      -
        label: 默认 / 跟随设置 (Default / Follow Obsidian)
        value: monokai-syntax-line-numbers-default
      -
        label: 显示行号 (Show line numbers)
        value: monokai-syntax-line-numbers-show
      -
        label: 隐藏行号 (Hide line numbers)
        value: monokai-syntax-line-numbers-hide
  -
    id: monokai-code-font-size
    title: 代码字号 (Code font size)
    type: variable-number-slider
    default: 0.9
    min: 0.75
    max: 1.2
    step: 0.05
    format: em
  -
    id: monokai-code-line-height
    title: 代码行高 (Code line height)
    type: variable-number-slider
    default: 1.55
    min: 1.25
    max: 1.9
    step: 0.05
  -
    id: monokai-heading-scale
    title: 标题缩放 (Heading scale)
    type: variable-number-slider
    default: 1
    min: 0.9
    max: 1.15
    step: 0.05
  -
    id: monokai-heading-group-spacing-value
    title: 标题分组间距 (Heading group spacing)
    type: variable-number-slider
    default: 1.4
    min: 1
    max: 2.2
    step: 0.05
    format: rem
  -
    id: monokai-syntax-heading-color-mode
    title: 标题色彩模式 (Heading color mode)
    type: class-select
    allowEmpty: false
    default: monokai-syntax-heading-full-spectrum
    options:
      -
        label: 全光谱 (Full spectrum)
        value: monokai-syntax-heading-full-spectrum
      -
        label: 低彩尾部 (Muted lower headings)
        value: monokai-syntax-heading-muted-tail
  -
    id: monokai-syntax-heading-accents
    title: 标题左侧色条 (Heading accent bars)
    type: class-toggle
    default: false
  -
    id: monokai-syntax-emphasis-heading
    title: 强调文本 (Emphasis)
    type: heading
    level: 2
    collapsed: false
  -
    id: monokai-syntax-color-bold
    title: 粗体颜色 (Bold color)
    description: 开启 Monokai 粉色粗体 (Enable Monokai pink bold text)
    type: class-toggle
    default: false
  -
    id: monokai-syntax-color-italic
    title: 斜体颜色 (Italic color)
    description: 开启 Monokai 紫色斜体 (Enable Monokai purple italic text)
    type: class-toggle
    default: false
  -
    id: monokai-syntax-color-bold-italic
    title: 粗斜体颜色 (Bold italic color)
    description: 开启 Monokai 橙色粗斜体 (Enable Monokai orange bold italic text)
    type: class-toggle
    default: false
  -
    id: monokai-syntax-italic-types
    title: 类型斜体 (Type italic)
    description: 为类型/类名启用斜体（默认关闭以提升扫描效率，Monokai Pro 仅关键字斜体）(Enable italic for types/classes; off by default)
    type: class-toggle
    default: false
  -
    id: monokai-syntax-italic-decorator
    title: 装饰器斜体 (Decorator italic)
    description: 为装饰器/注解启用斜体 (Enable italic for decorators/annotations)
    type: class-toggle
    default: false
  -
    id: monokai-paragraph-spacing-value
    title: 段落间距 (Paragraph spacing)
    type: variable-number-slider
    default: 0.75
    min: 0.4
    max: 1.2
    step: 0.05
    format: rem
*/
