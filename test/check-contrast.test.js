import assert from "node:assert/strict";
import test from "node:test";

import { contrast, toRgb } from "../scripts/check-contrast.js";

test("十六进制颜色转换为 RGB", () => {
  assert.deepEqual(toRgb("#66d9ef"), [102, 217, 239]);
});

test("对比度计算符合 WCAG 公式", () => {
  assert.equal(contrast("#000000", "#ffffff").toFixed(2), "21.00");
});
