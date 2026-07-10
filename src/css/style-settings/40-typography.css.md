/*
@settings

name: Monokai Syntax 排版
id: monokai-syntax-typography
settings:
  -
    id: monokai-syntax-markdown-reading-heading
    title: Markdown Reading
    type: heading
    level: 2
  -
    id: monokai-readable-line-width
    title: 可读行宽
    type: variable-number-slider
    default: 45
    min: 40
    max: 75
    step: 1
    format: rem
  -
    id: monokai-body-font-size
    title: 正文字号
    type: variable-number-slider
    default: 16
    min: 13
    max: 20
    step: 1
    format: px
  -
    id: monokai-syntax-editor-heading
    title: Editor
    type: heading
    level: 2
  -
    id: monokai-code-font-size
    title: 代码字号
    type: variable-number-slider
    default: 0.9
    min: 0.75
    max: 1.2
    step: 0.05
    format: em
  -
    id: monokai-code-line-height
    title: 代码行高
    type: variable-number-slider
    default: 1.55
    min: 1.25
    max: 1.9
    step: 0.05
  -
    id: monokai-heading-scale
    title: 标题缩放
    type: variable-number-slider
    default: 1
    min: 0.9
    max: 1.15
    step: 0.05
  -
    id: monokai-heading-group-spacing-value
    title: 标题分组间距
    type: variable-number-slider
    default: 1.4
    min: 1
    max: 2.2
    step: 0.05
    format: rem
  -
    id: monokai-syntax-heading-color-mode
    title: 标题色彩模式
    type: class-select
    allowEmpty: false
    default: monokai-syntax-heading-full-spectrum
    options:
      -
        label: 全光谱
        value: monokai-syntax-heading-full-spectrum
      -
        label: 低彩尾部
        value: monokai-syntax-heading-muted-tail
  -
    id: monokai-syntax-heading-accents
    title: 标题左侧色条
    type: class-toggle
    default: false
  -
    id: monokai-paragraph-spacing-value
    title: 段落间距
    type: variable-number-slider
    default: 0.75
    min: 0.4
    max: 1.2
    step: 0.05
    format: rem
*/
