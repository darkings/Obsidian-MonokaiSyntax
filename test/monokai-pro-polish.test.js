import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const readSource = (path) => readFileSync(new URL(path, import.meta.url), "utf8");

test("Monokai Pro 打磨项暴露稳定的样式入口", () => {
  const base = readSource("../src/scss/_base.scss");
  const editor = readSource("../src/scss/components/_editor.scss");
  const modals = readSource("../src/scss/components/_modals.scss");
  const ribbon = readSource("../src/scss/components/_ribbon.scss");
  const graph = readSource("../src/scss/plugins/_graph.scss");
  const canvas = readSource("../src/scss/plugins/_canvas.scss");
  const styleSettingsScss = readSource("../src/scss/plugins/_style-settings.scss");
  const styleSettings = [
    readSource("../src/css/style-settings/20-density.css.md"),
    readSource("../src/css/style-settings/40-typography.css.md"),
  ].join("\n");

  for (const token of [
    "--monokai-selection-background",
    "--monokai-selection-muted-background",
    "--monokai-light-tool-background",
  ]) {
    assert.match(base, new RegExp(token));
  }

  for (const token of [
    "--monokai-codeblock-header-background",
    "--monokai-code-variable",
    "padding: var(--monokai-codeblock-padding-block) var(--monokai-codeblock-padding-inline);",
    ".copy-code-button",
    ".code-block-flair",
  ]) {
    assert.match(editor, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.doesNotMatch(editor, /padding-block-start:\s*calc\(var\(--monokai-codeblock-padding-block\) \+ var\(--monokai-codeblock-header-height\)\);/);
  assert.match(editor, /pre:not\(\[class\*="language-"\], :has\(code\[class\*="language-"\]\)\)::before,[\s\S]*?content:\s*"CODE";/);
  assert.match(editor, /\.cm-preview-code-block:not\(:has\(\.code-block-flair\)\)::before\s*\{[\s\S]*?content:\s*"CODE";/);
  assert.match(editor, /"python":\s*"PYTHON"/);
  assert.match(editor, /pre:not\(:has\(\.code-block-flair\)\)\.language-#\{\$language\}::before,[\s\S]*?content:\s*\$label;/);
  assert.match(editor, /pre\s*\{[\s\S]*?code\s*\{[\s\S]*?color:\s*var\(--code-normal\);[\s\S]*?background-color:\s*transparent;[\s\S]*?border-radius:\s*0;[\s\S]*?font-weight:\s*inherit;[\s\S]*?\}/);
  assert.match(editor, /\.copy-code-button\s*\{[\s\S]*?display:\s*inline-flex;[\s\S]*?opacity:\s*0;[\s\S]*?visibility:\s*hidden;/);
  assert.match(editor, /\.markdown-preview-view \.markdown-rendered[\s\S]*?\.copy-code-button\s*\{[\s\S]*?font-size:\s*0\.58rem;[\s\S]*?min-height:\s*1\.35rem;[\s\S]*?min-width:\s*1\.35rem;[\s\S]*?padding:\s*0\.16rem;/);
  assert.match(editor, /\.markdown-source-view\.mod-cm6[\s\S]*?\.copy-code-button\s*\{[\s\S]*?opacity:\s*1;[\s\S]*?visibility:\s*visible;/);
  assert.match(editor, /\.markdown-source-view\.mod-cm6[\s\S]*?\.code-block-flair\s*\{[\s\S]*?pointer-events:\s*auto;[\s\S]*?cursor:\s*var\(--cursor\);/);
  assert.match(editor, /\.markdown-source-view\.mod-cm6[\s\S]*?\.code-block-flair:active,[\s\S]*?\.cm-line:focus-within \.code-block-flair\s*\{[\s\S]*?opacity:\s*1;[\s\S]*?visibility:\s*visible;/);
  assert.match(editor, /\.markdown-source-view\.mod-cm6[\s\S]*?\.markdown-rendered \.code-block-flair,[\s\S]*?\.markdown-rendered pre:focus-within::before[\s\S]*?opacity:\s*1;[\s\S]*?transform:\s*none;/);
  assert.match(editor, /\.el-pre:hover \.copy-code-button,[\s\S]*?pre:hover \.copy-code-button[\s\S]*?opacity:\s*1;[\s\S]*?visibility:\s*visible;/);
  assert.doesNotMatch(editor, /\.cm-preview-code-block:hover \.code-block-flair[\s\S]*?opacity:\s*0;/);
  assert.doesNotMatch(editor, /\.cm-preview-code-block:focus-within \.code-block-flair[\s\S]*?opacity:\s*0;/);
  assert.doesNotMatch(editor, /\.markdown-rendered pre:hover \.code-block-flair[\s\S]*?opacity:\s*0;/);
  assert.doesNotMatch(editor, /\.markdown-preview-view,[\s\S]*?\.markdown-reading-view\s*\{[\s\S]*?\.code-block-flair\s*\{[\s\S]*?display:\s*none;/);

  assert.match(styleSettingsScss, /body\.monokai-syntax-media-border-card/);
  assert.match(styleSettingsScss, /body\.monokai-syntax-heading-muted-tail/);
  assert.match(modals, /vertical-tab-nav-item\.is-active/);
  assert.doesNotMatch(modals, /\.vertical-tab-content-container\s*>\s*div[^{}]*\{[^}]*background-color:\s*var\(--monokai-settings-item-background\);/);
  assert.match(modals, /\.modal\.mod-settings[\s\S]*?\.setting-item[\s\S]*?background-color:\s*transparent;/);
  assert.match(modals, /\.modal\.mod-settings[\s\S]*?\.setting-item-container[\s\S]*?background-color:\s*transparent;/);
  assert.match(modals, /\.style-settings-container[\s\S]*?\.setting-item[\s\S]*?background-color:\s*var\(--monokai-settings-item-background\);/);
  assert.match(ribbon, /status-bar/);
  assert.match(graph, /--monokai-graph-direction-line/);
  assert.match(canvas, /--canvas-dot-pattern/);
  assert.match(styleSettings, /monokai-syntax-media-border-style/);
  assert.match(styleSettings, /monokai-syntax-heading-color-mode/);
});

test("低风险基础清理使用统一 token 并避免重复 Callout 基础规则", () => {
  const variables = readSource("../src/scss/_variables.scss");
  const base = readSource("../src/scss/_base.scss");
  const editor = readSource("../src/scss/components/_editor.scss");
  const activeVisual = readSource("../src/scss/_active-visual-overrides.scss");
  const contrast = readSource("../scripts/check-contrast.js");

  assert.match(variables, /\$color-light-cyan:\s*#0f6478;/);
  assert.match(contrast, /\{ filter: "light", label: "链接", foreground: "#0f6478"/);
  assert.match(base, /--monokai-transition-fast:\s*120ms ease;/);
  assert.match(base, /--monokai-transition-base:\s*140ms ease;/);
  assert.match(base, /--monokai-transition-emphasis:\s*180ms ease;/);
  assert.match(base, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\*,[\s\S]*?\*::before,[\s\S]*?\*::after[\s\S]*?transition-duration:\s*0\.01ms;/);
  assert.doesNotMatch(editor, /\.markdown-rendered\s*\{[\s\S]*?\.callout\s*\{/);
  assert.match(activeVisual, /body \.markdown-preview-view\.markdown-rendered \.callout,[\s\S]*?body \.markdown-rendered \.callout,[\s\S]*?body \.markdown-source-view\.mod-cm6 \.callout/);
});

test("核心阅读视觉降低噪音并保留 Monokai 语义", () => {
  const variables = readSource("../src/scss/_variables.scss");
  const base = readSource("../src/scss/_base.scss");
  const editor = readSource("../src/scss/components/_editor.scss");

  assert.match(variables, /\$color-pro-heading-h1:\s*#ff9ab0;/);
  assert.match(base, /--h1-color:\s*#\{\$color-pro-heading-h1\};/);
  assert.match(base, /--h4-color:\s*#\{\$color-pro-text-muted\};/);
  assert.match(base, /--h5-color:\s*#\{\$color-pro-text-faint\};/);
  assert.match(base, /--h6-color:\s*#\{\$color-pro-text-faint\};/);
  assert.match(base, /--metadata-label-text-color:\s*#\{\$color-pro-cyan\};/);
  assert.match(base, /--monokai-selection-background:\s*rgb\(120 220 232 \/ 30%\);/);
  assert.match(editor, /--bold-weight:\s*700;/);
  assert.match(editor, /body\.theme-dark[\s\S]*?--monokai-blockquote-border:\s*#\{\$color-pro-green\};/);
  assert.match(editor, /body\.theme-light[\s\S]*?--monokai-blockquote-border:\s*#\{\$color-light-green\};/);
  assert.doesNotMatch(editor, /letter-spacing:\s*-0\.015em;/);
});
