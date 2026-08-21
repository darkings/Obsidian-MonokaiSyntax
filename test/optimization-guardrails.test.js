import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import test from "node:test";

const rootDir = new URL("../", import.meta.url);
const readSource = (path) => readFileSync(new URL(path, rootDir), "utf8");

test("生成图标支持无写入一致性检查", () => {
  const result = spawnSync(process.execPath, ["scripts/generate-icon-theme.js", "--check"], {
    cwd: rootDir,
    encoding: "utf8",
  });

  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /文件树图标样式已是最新/);
});

test("验证任务可由 CI 并行执行，发布仍运行完整验证", () => {
  const packageJson = JSON.parse(readSource("package.json"));
  const workflow = readSource(".github/workflows/ci.yml");

  assert.equal(packageJson.engines.node, ">=22.12.0");
  assert.equal(packageJson.scripts.prebuild, "node scripts/generate-icon-theme.js");
  assert.equal(packageJson.scripts["prelint:css"], undefined);
  assert.equal(packageJson.scripts["verify:icons-generated"], "node scripts/generate-icon-theme.js --check");
  assert.equal(packageJson.scripts["release:pack"], "npm run verify");

  for (const script of ["verify:source", "test", "lint:css", "verify:artifact"]) {
    assert.match(workflow, new RegExp(`- ${script}`));
  }
});

test("color-mix 声明之前保留兼容背景", () => {
  const callout = readSource("src/scss/components/_callout.scss");
  const colorMixCount = callout.match(/background-color:\s*color-mix\(/g)?.length ?? 0;
  const fallbackCount = callout.match(/background-color:[^;]+;\s*\n\s*background-color:\s*color-mix\(/g)?.length ?? 0;

  assert.ok(colorMixCount > 0);
  assert.equal(fallbackCount, colorMixCount);
});

test("正文行号靠近内容并使用紧凑 gutter", () => {
  const tokens = readSource("src/scss/components/editor/_tokens.scss");
  const source = readSource("src/scss/components/editor/_source.scss");

  assert.match(tokens, /--monokai-editor-gutter-content-offset:\s*1rem;/);
  assert.match(tokens, /--monokai-editor-gutter-number-gap:\s*0\.6rem;/);
  assert.match(tokens, /--monokai-editor-gutter-number-offset:\s*0\.25rem;/);
  assert.match(tokens, /--monokai-editor-gutter-number-width:\s*3ch;/);
  assert.match(source, /\.cm-gutters\s*\{[^}]*display:\s*flex;/s);
  assert.match(source, /\.cm-gutters:has\(> \.cm-lineNumbers\)\s*\{[^}]*padding-inline-end:\s*var\(--monokai-editor-gutter-content-offset\);/s);
  assert.match(source, /\.cm-lineNumbers\s*\{[^}]*display:\s*flex;/s);
  assert.match(source, /\.cm-lineNumbers\s*\{[^}]*transform:\s*none;/s);
  assert.match(source, /\.cm-lineNumbers \.cm-gutterElement\s*\{[^}]*padding-inline:\s*var\(--monokai-editor-gutter-number-gap\);/s);
  assert.match(source, /\.cm-lineNumbers \.cm-gutterElement\s*\{[^}]*text-align:\s*end;/s);
  assert.doesNotMatch(source, /\.cm-lineNumbers \.cm-gutterElement\s*\{[^}]*text-align:\s*center;/s);
});

test("正文当前行不增加浅色背景，仅强调当前行号", () => {
  const source = readSource("src/scss/components/editor/_source.scss");

  assert.match(source, /\.cm-line\.cm-active\s*\{[^}]*background-color:\s*transparent;/s);
  assert.match(source, /\.cm-line\.HyperMD-codeblock\.cm-active\s*\{[^}]*background-color:\s*var\(--monokai-codeblock-active-line-background\);/s);
  assert.match(source, /\.cm-gutterElement\.cm-activeLineGutter\s*\{[^}]*color:\s*var\(--interactive-accent\);[^}]*font-weight:\s*600;/s);
  assert.doesNotMatch(source, /\.cm-gutterElement\.cm-activeLineGutter\s*\{[^}]*(?:text-shadow|transform):/s);
});

test("活动标签页按实际 DOM 使用 Monokai 进入动画", () => {
  const tabs = readSource("src/scss/components/_tabs.scss");

  assert.match(tabs, /@keyframes monokai-tab-activate\s*\{[^}]*background-size:\s*0 2px;[\s\S]*?background-size:\s*calc\(100% - 0\.4rem\) 2px;/s);
  assert.match(tabs, /body \.workspace \.mod-root \.workspace-tab-header\.tappable > \.workspace-tab-header-inner\s*\{[^}]*background-image:\s*linear-gradient\([\s\S]*?background-position:\s*center bottom;[^}]*background-size:\s*0 2px;[^}]*transition:\s*background-size 240ms cubic-bezier\(0\.4, 0, 0\.2, 1\);/s);
  assert.match(tabs, /body \.workspace \.mod-root \.workspace-tab-header\.tappable\.is-active\.mod-active > \.workspace-tab-header-inner\s*\{[^}]*animation:\s*monokai-tab-activate 240ms cubic-bezier\(0\.4, 0, 0\.2, 1\);/s);
  assert.doesNotMatch(tabs, /> \.workspace-tab-header-inner > \.workspace-tab-header-inner-title\s*\{/);
  assert.doesNotMatch(tabs, /\.workspace-tab-header::after/);
  assert.doesNotMatch(tabs, /\.workspace-tab-header-inner\s*\{[^}]*box-shadow:/s);
});
