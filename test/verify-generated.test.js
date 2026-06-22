import assert from "node:assert/strict";
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
