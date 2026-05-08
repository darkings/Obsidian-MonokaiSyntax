# Callout 与块引用 Monokai Pro 风格重设计 — 实施计划

> **对于 agentic 执行者：** 推荐使用 superpowers:subagent-driven-development 或 superpowers:executing-plans 按任务逐步实施。步骤使用 `- [ ]` checkbox 跟踪。

**目标：** 将 Callout 和块引用样式重设计为 Monokai Pro 装订线式风格——彩色左竖线 + 极微背景 + 代码符号图标 + 宽松间距。

**架构：** 纯 SCSS/CSS 变量改动。新增 2 个块引用颜色 SCSS 变量，8 个 callout 语义色 CSS 变量（深/浅各 4 组）。重写 `_editor.scss` 中 blockquote 和 callout 的阅读视图与实时预览样式。Callout 图标用 CSS `::before` + Unicode 代码符号替换默认 Lucide SVG。

**技术栈：** SCSS, Vite, Stylelint

---

## 文件结构

| 文件 | 职责 | 改动类型 |
|---|---|---|
| `src/scss/_variables.scss` | 新增 `$color-dark-blockquote-border`、`$color-light-blockquote-border` | 新增 2 行 |
| `src/scss/components/_editor.scss` | 新增 CSS 自定义属性 + 重写 blockquote/callout 全部样式 + callout 图标 | 重写 ~12 个规则块 |

---

### Task 1: 新增块引用暖金色 SCSS 变量

**文件：**
- 修改：`src/scss/_variables.scss:50`（在最后一个 `$spacing-4` 之后）

- [ ] **Step 1: 在 `_variables.scss` 末尾添加变量**

```scss
$color-dark-blockquote-border: #e6db74;
$color-light-blockquote-border: #cc7a0a;
```

- [ ] **Step 2: 提交**

```bash
git add src/scss/_variables.scss
git commit -m "feat: add blockquote warm-gold color tokens"
```

---

### Task 2: 替换编辑器 CSS 自定义属性（深色 + 浅色模式）

**文件：**
- 修改：`src/scss/components/_editor.scss:3-46`（`.markdown-source-view` 根块 + `.theme-dark` + `.theme-light` 块）

- [ ] **Step 1: 重写 `.markdown-source-view` 公共变量块**

将 `:3-22` 替换为：

```scss
.markdown-source-view,
.markdown-preview-view {
  --bold-color: var(--text-normal);
  --bold-weight: 900;
  --italic-color: var(--text-normal);
  --heading-spacing: #{$spacing-4};
  --monokai-heading-weight: 600;
  --monokai-inline-code-color: #a6e22e;
  --monokai-inline-code-background: var(--code-background);
  --blockquote-border-thickness: 2px;
  --blockquote-background-color: transparent;
  --callout-padding: 1.25rem;
  --callout-content-padding: var(--spacing-4) 0 0 0;
  --callout-border-width: 0;
  --callout-radius: var(--radius-s);
  --callout-blend-mode: normal;
  --callout-icon-size: 1em;
  --p-spacing: #{$spacing-3};

  -webkit-font-smoothing: antialiased;
  text-rendering: optimizelegibility;
}
```

关键变化：
- `--blockquote-background-color`: `var(--monokai-blockquote-background)` → `transparent`
- `--callout-padding`: `calc(...)` → `1.25rem`
- `--callout-border-width`: `1px` → `0`
- 新增 `--callout-icon-size: 1em`
- 移除 `--monokai-blockquote-background` 引用

- [ ] **Step 2: 重写 `.theme-dark` 块**

将 `:24-34` 替换为：

```scss
.theme-dark {
  --monokai-heading-weight: 600;
  --monokai-blockquote-border: #{$color-dark-blockquote-border};
  --monokai-callout-note-bg: rgb(102 217 239 / 5%);
  --monokai-callout-note-border: #66d9ef;
  --monokai-callout-warning-bg: rgb(253 151 31 / 5%);
  --monokai-callout-warning-border: #fd971f;
  --monokai-callout-error-bg: rgb(249 38 114 / 5%);
  --monokai-callout-error-border: #f92672;
  --monokai-callout-success-bg: rgb(166 226 46 / 5%);
  --monokai-callout-success-border: #a6e22e;
  --monokai-inline-code-color: #a6e22e;
  --monokai-inline-code-background: var(--code-background);
  --monokai-table-border: rgb(248 248 242 / 18%);
  --monokai-task-done-color: rgb(248 248 242 / 68%);
}
```

- [ ] **Step 3: 重写 `.theme-light` 块**

将 `:36-46` 替换为：

```scss
.theme-light {
  --monokai-heading-weight: 700;
  --monokai-blockquote-border: #{$color-light-blockquote-border};
  --monokai-callout-note-bg: rgb(20 116 138 / 6%);
  --monokai-callout-note-border: #14748a;
  --monokai-callout-warning-bg: rgb(225 96 50 / 6%);
  --monokai-callout-warning-border: #e16032;
  --monokai-callout-error-bg: rgb(225 71 117 / 6%);
  --monokai-callout-error-border: #e14775;
  --monokai-callout-success-bg: rgb(38 157 105 / 6%);
  --monokai-callout-success-border: #269d69;
  --monokai-inline-code-color: #a6e22e;
  --monokai-inline-code-background: var(--code-background);
  --monokai-table-border: rgb(61 61 61 / 18%);
  --monokai-task-done-color: rgb(61 61 61 / 66%);
}
```

- [ ] **Step 4: 提交**

```bash
git add src/scss/components/_editor.scss
git commit -m "feat: add Monokai Pro callout & blockquote CSS custom properties"
```

---

### Task 3: 重写阅读视图 blockquote 样式

**文件：**
- 修改：`src/scss/components/_editor.scss:77-83`（`.markdown-rendered blockquote`）

- [ ] **Step 1: 替换 blockquote 规则**

将当前：

```scss
blockquote {
  background-color: var(--monokai-blockquote-background);
  border-inline-start: 2px solid var(--blockquote-border-color);
  border-radius: 0 var(--radius-s) var(--radius-s) 0;
  color: var(--text-normal);
  padding: var(--spacing-4) var(--spacing-5) var(--spacing-4) calc(var(--spacing-5) + var(--spacing-5) + var(--spacing-3));
}
```

替换为：

```scss
blockquote {
  background-color: transparent;
  border-inline-start: 2px solid var(--monokai-blockquote-border);
  border-radius: 0 var(--radius-s) var(--radius-s) 0;
  color: var(--text-normal);
  padding: var(--spacing-4) var(--spacing-4) var(--spacing-4) 1.5rem;
}
```

- [ ] **Step 2: 提交**

```bash
git add src/scss/components/_editor.scss
git commit -m "feat: redesign reading-view blockquote — warm gold border, no background"
```

---

### Task 4: 重写实时预览 blockquote 样式

**文件：**
- 修改：`src/scss/components/_editor.scss:214-230`（`.HyperMD-quote`、`.cm-quote`）

- [ ] **Step 1: 替换 `.HyperMD-quote` 规则**

将 `:214-218`：

```scss
.HyperMD-quote {
  background-color: var(--monokai-blockquote-background);
  border-inline-start: 2px solid var(--blockquote-border-color);
  border-radius: 0 var(--radius-s) var(--radius-s) 0;
  padding-inline-start: calc(var(--spacing-5) + var(--spacing-5) + var(--spacing-3));
}
```

替换为：

```scss
.HyperMD-quote {
  background-color: transparent;
  border-inline-start: 2px solid var(--monokai-blockquote-border);
  border-radius: 0 var(--radius-s) var(--radius-s) 0;
  padding-inline-start: 1.5rem;
}
```

- [ ] **Step 2: `.cm-quote` 和嵌套规则保持不变**

`.cm-quote` 的 `border-inline-start: 0` 保留。`.HyperMD-quote .cm-quote` 的 `padding-inline-start` 保留。

- [ ] **Step 3: 提交**

```bash
git add src/scss/components/_editor.scss
git commit -m "feat: redesign live-preview blockquote — warm gold border, no background"
```

---

### Task 5: 重写阅读视图 callout 容器 + 标题 + 内容

**文件：**
- 修改：`src/scss/components/_editor.scss:85-126`（`.markdown-rendered .callout` 相关规则）

- [ ] **Step 1: 重写 `.callout` 容器**

将 `:85-91`：

```scss
.callout {
  background-color: var(--monokai-callout-background);
  border: 1px solid var(--monokai-callout-border);
  border-inline-start: 0;
  border-radius: var(--radius-s);
  padding: var(--callout-padding);
}
```

替换为：

```scss
.callout {
  background-color: var(--callout-background, transparent);
  border: 0;
  border-inline-start: 2px solid var(--callout-border, var(--monokai-callout-note-border));
  border-radius: 0 var(--radius-s) var(--radius-s) 0;
  padding: var(--callout-padding);
}
```

- [ ] **Step 2: 替换 `.callout-title`**

将 `:93-98`:

```scss
.callout-title {
  color: var(--callout-color, #66d9ef);
  font-weight: 700;
  gap: var(--spacing-2);
  padding-inline-start: 0;
}
```

替换为：

```scss
.callout-title {
  color: var(--callout-border, var(--monokai-callout-note-border));
  font-weight: 700;
  gap: var(--spacing-2);
  padding-inline-start: 0;
}
```

- [ ] **Step 3: 替换 `.callout-content`**

将 `:100-106`：

```scss
.callout-content {
  background-color: var(--monokai-callout-content-background);
  border-radius: 0;
  margin-block-start: var(--spacing-4);
  padding: var(--callout-content-padding);
  padding-inline-start: 0;
}
```

替换为：

```scss
.callout-content {
  background-color: transparent;
  border-radius: 0;
  margin-block-start: var(--spacing-4);
  padding: var(--callout-content-padding);
  padding-inline-start: 0;
}
```

- [ ] **Step 4: 重写 callout 语义色分组映射**

将 `:108-126` 替换为：

```scss
.callout[data-callout="note"],
.callout[data-callout="info"] {
  --callout-background: var(--monokai-callout-note-bg);
  --callout-border: var(--monokai-callout-note-border);
}

.callout[data-callout="warning"],
.callout[data-callout="caution"] {
  --callout-background: var(--monokai-callout-warning-bg);
  --callout-border: var(--monokai-callout-warning-border);
}

.callout[data-callout="error"],
.callout[data-callout="danger"] {
  --callout-background: var(--monokai-callout-error-bg);
  --callout-border: var(--monokai-callout-error-border);
}

.callout[data-callout="success"],
.callout[data-callout="check"] {
  --callout-background: var(--monokai-callout-success-bg);
  --callout-border: var(--monokai-callout-success-border);
}
```

- [ ] **Step 5: 提交**

```bash
git add src/scss/components/_editor.scss
git commit -m "feat: redesign reading-view callout — semantic left border, micro-tinted background"
```

---

### Task 6: 重写实时预览 callout 容器 + 标题 + 内容

**文件：**
- 修改：`src/scss/components/_editor.scss:236-256`（`.markdown-source-view.mod-cm6 .callout` 相关规则）

- [ ] **Step 1: 替换实时预览 callout 容器**

将 `:236-242`:

```scss
.callout {
  background-color: var(--monokai-callout-background);
  border: 1px solid var(--monokai-callout-border);
  border-inline-start: 0;
  border-radius: var(--radius-s);
  padding: var(--callout-padding);
}
```

替换为：

```scss
.callout {
  background-color: var(--callout-background, transparent);
  border: 0;
  border-inline-start: 2px solid var(--callout-border, var(--monokai-callout-note-border));
  border-radius: 0 var(--radius-s) var(--radius-s) 0;
  padding: var(--callout-padding);
}
```

- [ ] **Step 2: 替换实时预览 callout-title**

将 `:244-249`:

```scss
.callout-title {
  color: var(--callout-color, #66d9ef);
  gap: var(--spacing-2);
  padding-inline-start: 0;
  font-weight: 700;
}
```

替换为：

```scss
.callout-title {
  color: var(--callout-border, var(--monokai-callout-note-border));
  gap: var(--spacing-2);
  padding-inline-start: 0;
  font-weight: 700;
}
```

- [ ] **Step 3: 替换实时预览 callout-content**

将 `:251-256`:

```scss
.callout-content {
  background-color: var(--monokai-callout-content-background);
  margin-block-start: var(--spacing-4);
  padding: var(--callout-content-padding);
  padding-inline-start: 0;
}
```

替换为：

```scss
.callout-content {
  background-color: transparent;
  margin-block-start: var(--spacing-4);
  padding: var(--callout-content-padding);
  padding-inline-start: 0;
}
```

- [ ] **Step 4: 提交**

```bash
git add src/scss/components/_editor.scss
git commit -m "feat: redesign live-preview callout container — semantic left border"
```

---

### Task 7: 重写 callout 图标 — 隐藏 Lucide SVG + 代码符号样式

**文件：**
- 修改：`src/scss/components/_editor.scss` — 在阅读视图 callout 语义色映射之后、在实时预览 callout 块之前插入

- [ ] **Step 1: 隐藏 Obsidian 默认图标 SVG**

在 `.markdown-rendered` 块内，callout 语义色映射之后，添加：

```scss
.callout-icon svg {
  display: none;
}

.callout-icon::before {
  display: inline-block;
  width: var(--callout-icon-size);
  height: var(--callout-icon-size);
  line-height: var(--callout-icon-size);
  text-align: center;
  font-family: var(--font-monospace-theme);
  font-weight: 700;
  font-size: var(--callout-icon-size);
  color: var(--callout-border, var(--monokai-callout-note-border));
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 2: 按 callout 分组设置代码符号**

紧接着添加：

```scss
.callout[data-callout="note"] .callout-icon::before,
.callout[data-callout="info"] .callout-icon::before {
  content: "#[i]";
}

.callout[data-callout="warning"] .callout-icon::before,
.callout[data-callout="caution"] .callout-icon::before {
  content: "<!>";
}

.callout[data-callout="error"] .callout-icon::before,
.callout[data-callout="danger"] .callout-icon::before {
  content: "[\00D7]";
}

.callout[data-callout="success"] .callout-icon::before,
.callout[data-callout="check"] .callout-icon::before {
  content: "{\2713}";
}
```

- [ ] **Step 3: 提交**

```bash
git add src/scss/components/_editor.scss
git commit -m "feat: replace callout icons with code-symbol style — #[i], <!>, [x], {v}"
```

---

### Task 8: 在实时预览块中应用相同的 callout 图标样式

**文件：**
- 修改：`src/scss/components/_editor.scss` — `.markdown-source-view.mod-cm6` 块内

- [ ] **Step 1: 在实时预览 callout 规则末尾添加图标样式**

在 `.markdown-source-view.mod-cm6` 块中，callout 语义色映射之后，添加与 Task 7 相同的图标规则（复制隐藏 SVG + 基础 `::before` + 四个分组符号规则）。

- [ ] **Step 2: 提交**

```bash
git add src/scss/components/_editor.scss
git commit -m "feat: apply code-symbol callout icons to live preview"
```

---

### Task 9: 构建验证与 QA

**文件：** 无（只读检查）

- [ ] **Step 1: 运行 Stylelint**

```bash
npm run lint:css
```

预期：PASS，无错误。

- [ ] **Step 2: 运行生产构建**

```bash
npm run build
```

预期：PASS，`dist/theme.css` 生成成功。

- [ ] **Step 3: 运行 CSS 审计**

```bash
npm run audit:css
```

预期：PASS，无远程资源、无 `!important`。

- [ ] **Step 4: 运行对比度检查**

```bash
npm run check:contrast
```

预期：PASS。

- [ ] **Step 5: 构建到测试 Vault**

```bash
npm run build:vault
```

预期：PASS，主题同步到 Obsidian Vault。

- [ ] **Step 6: 手动 QA 检查清单**

在 Obsidian 中打开测试笔记，验证：

**暗色模式 — 块引用：**
- [ ] 暖金色竖线，无背景
- [ ] 文字与竖线间距舒适
- [ ] 嵌套块引用层级清晰

**暗色模式 — Callout 图标：**
- [ ] note/info：显示青色 `#[i]`，等宽字体
- [ ] warning/caution：显示橙色 `<!>`
- [ ] error/danger：显示洋红 `[×]`
- [ ] success/check：显示绿色 `{✓}`
- [ ] 默认 Lucide 图标已隐藏

**暗色模式 — Callout 容器：**
- [ ] note/info：青色竖线 + 极微青色背景
- [ ] warning/caution：橙色竖线 + 极微橙色背景
- [ ] error/danger：洋红竖线 + 极微洋红背景
- [ ] success/check：绿色竖线 + 极微绿色背景
- [ ] 标题颜色跟随语义色

**浅色模式：**
- [ ] 同上所有项

**实时预览：**
- [ ] 块引用样式与阅读模式一致
- [ ] Callout 容器 + 图标 + 标题 + 内容与阅读模式一致

- [ ] **Step 7: 提交**（如有 QA 发现修复）

```bash
git add src/scss/components/_editor.scss
git commit -m "fix: QA adjustments for callout & blockquote"
```
