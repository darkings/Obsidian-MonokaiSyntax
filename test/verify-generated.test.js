import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { compareThemeCss } from "../scripts/verify-generated.js";

test("主题 CSS 内容一致时哈希相同", () => {
  const result = compareThemeCss({ rootThemeCss: "body{}", distThemeCss: "body{}" });

  assert.equal(result.passed, true);
});

test("主题 CSS 内容不一致时报告失败", () => {
  const result = compareThemeCss({ rootThemeCss: "body{}", distThemeCss: ".theme-dark{}" });

  assert.equal(result.passed, false);
});

test("构建配置只压缩主题 CSS 段并保留 Style Settings 拼接", () => {
  const viteConfig = readFileSync(new URL("../vite.config.js", import.meta.url), "utf8");

  assert.match(viteConfig, /cssMinify:\s*true/);
  assert.match(viteConfig, /minify:\s*false/);
  assert.match(viteConfig, /const sections = \[license, themeCss, styleSettings\]\.filter\(Boolean\);/);
});
