import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const readSource = (path) => readFileSync(new URL(path, import.meta.url), "utf8");
const readEditorSource = () => [
  readSource("../src/scss/components/_editor.scss"),
  readSource("../src/scss/components/editor/_tokens.scss"),
  readSource("../src/scss/components/editor/_reading.scss"),
  readSource("../src/scss/components/editor/_source.scss"),
  readSource("../src/scss/components/editor/_syntax.scss"),
  readSource("../src/scss/components/editor/_links.scss"),
].join("\n");

test("Monokai Pro 打磨项暴露稳定的样式入口", () => {
  const base = readSource("../src/scss/_base.scss");
  const editor = readEditorSource();
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
  assert.match(editor, /\.copy-code-button\s*\{[\s\S]*?display:\s*inline-flex;[\s\S]*?opacity:\s*0\.3;[\s\S]*?visibility:\s*visible;/);
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
  const editor = readEditorSource();
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
  const editor = readEditorSource();

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

test("布局与代码块组件使用更稳的默认尺寸", () => {
  const variables = readSource("../src/scss/_variables.scss");
  const editor = readEditorSource();
  const styleSettingsScss = readSource("../src/scss/plugins/_style-settings.scss");
  const typographySettings = readSource("../src/css/style-settings/40-typography.css.md");

  assert.match(variables, /\$radius-small:\s*4px;/);
  assert.match(variables, /\$radius-medium:\s*8px;/);
  assert.match(variables, /\$radius-large:\s*12px;/);
  assert.match(editor, /--monokai-codeblock-padding-block:\s*0\.75rem;/);
  assert.match(editor, /--monokai-codeblock-padding-inline:\s*1rem;/);
  assert.match(editor, /letter-spacing:\s*0\.05em;/);
  assert.match(editor, /\.copy-code-button\s*\{[\s\S]*?opacity:\s*0\.3;[\s\S]*?visibility:\s*visible;/);
  assert.match(editor, /\.copy-code-button:hover,[\s\S]*?\.copy-code-button:focus-visible[\s\S]*?opacity:\s*1;/);
  assert.match(styleSettingsScss, /--file-line-width:\s*var\(--monokai-readable-line-width, 45rem\);/);
  assert.match(typographySettings, /id: monokai-readable-line-width[\s\S]*?default: 45/);
});

test("Obsidian 常见界面补齐主题 surface 覆盖", () => {
  const base = readSource("../src/scss/_base.scss");
  const modals = readSource("../src/scss/components/_modals.scss");
  const tabs = readSource("../src/scss/components/_tabs.scss");

  for (const selector of [
    ".notice",
    ".tooltip",
    ".popover.hover-popover",
    ".workspace-leaf-resize-handle",
    ".workspace-split.mod-right-split",
    ".markdown-rendered .internal-link.is-unresolved",
    "::-webkit-scrollbar-thumb",
    ".workspace-sidedock-vault-profile",
  ]) {
    assert.match(base + tabs, new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.match(modals, /\.prompt-instructions[\s\S]*?kbd\s*\{[\s\S]*?background-color:\s*var\(--background-primary\);/);
  assert.match(base, /\.notice[\s\S]*?background-color:\s*var\(--background-secondary\);[\s\S]*?border:\s*1px solid var\(--background-modifier-border\);/);
  assert.match(base, /\.popover\.hover-popover[\s\S]*?box-shadow:\s*var\(--monokai-popover-shadow\);/);
  assert.match(base, /\.workspace-split\.mod-right-split[\s\S]*?background-color:\s*var\(--background-secondary\);/);
  assert.match(base, /\.markdown-rendered \.internal-link\.is-unresolved[\s\S]*?color:\s*var\(--text-faint\);/);
});

test("文件树选中态和侧栏分隔线保持低噪音", () => {
  const base = readSource("../src/scss/_base.scss");

  assert.match(base, /--monokai-nav-active-background:\s*rgb\(120 220 232 \/ 12%\);/);
  assert.doesNotMatch(base, /--monokai-nav-active-border-color:/);
  assert.match(base, /--monokai-sidebar-divider-color:\s*rgb\(248 248 242 \/ 4%\);/);
  assert.match(base, /\.theme-light[\s\S]*?--monokai-nav-active-background:\s*rgb\(15 100 120 \/ 10%\);/);
  assert.match(base, /\.theme-light[\s\S]*?--monokai-sidebar-divider-color:\s*rgb\(61 61 61 \/ 5%\);/);
  assert.match(base, /\.workspace-split\.mod-left-split\s*\{[\s\S]*?border-inline-end:\s*1px solid var\(--monokai-sidebar-divider-color\);/);
  assert.match(base, /\.workspace-leaf-resize-handle\s*\{[\s\S]*?background-color:\s*transparent;[\s\S]*?border-inline-start:\s*0;[\s\S]*?border-inline-end:\s*0;/);
  assert.match(base, /\.nav-file-title\.is-active[\s\S]*?background-color:\s*var\(--monokai-nav-active-background\);/);
  const activeFileRule = base.match(/\.nav-file-title\.is-active\s*\{[^}]+\}/)?.[0] ?? "";
  const clickableTreeRule = base.match(/\.tree-item-self\.is-clickable\.is-active,[\s\S]*?\.bookmark\.is-active\s*\{[^}]+\}/)?.[0] ?? "";
  assert.doesNotMatch(activeFileRule, /--monokai-selection-background/);
  assert.doesNotMatch(activeFileRule, /box-shadow/);
  assert.match(clickableTreeRule, /background-color:\s*var\(--monokai-nav-active-background\);/);
  assert.doesNotMatch(clickableTreeRule, /--monokai-selection-background/);
  assert.doesNotMatch(clickableTreeRule, /box-shadow/);
});

test("编辑器样式按职责拆分为聚合模块", () => {
  const editorEntry = readSource("../src/scss/components/_editor.scss");
  const editorIndex = readSource("../src/scss/components/editor/_index.scss");
  const tokens = readSource("../src/scss/components/editor/_tokens.scss");
  const reading = readSource("../src/scss/components/editor/_reading.scss");
  const source = readSource("../src/scss/components/editor/_source.scss");
  const syntax = readSource("../src/scss/components/editor/_syntax.scss");
  const links = readSource("../src/scss/components/editor/_links.scss");

  assert.match(editorEntry, /@forward "editor";/);
  for (const moduleName of ["tokens", "reading", "source", "syntax", "links"]) {
    assert.match(editorIndex, new RegExp(`@forward "${moduleName}";`));
  }

  assert.match(tokens, /body\.theme-dark[\s\S]*?--monokai-codeblock-background:/);
  assert.match(reading, /\.markdown-rendered[\s\S]*?\.copy-code-button/);
  assert.match(source, /\.markdown-source-view\.mod-cm6[\s\S]*?\.HyperMD-codeblock/);
  assert.match(syntax, /\.cm-s-obsidian[\s\S]*?span\.cm-keyword/);
  assert.match(links, /a,[\s\S]*?\.markdown-rendered a,[\s\S]*?\.cm-hmd-internal-link/);
  assert.ok(reading.length < 35000, "阅读模块不应重新膨胀成完整 editor 大文件");
});
