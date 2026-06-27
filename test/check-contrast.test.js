import assert from "node:assert/strict";
import test from "node:test";

import { checkContrastPairs, contrast, pairs, toRgb } from "../scripts/check-contrast.js";

test("十六进制颜色转换为 RGB", () => {
  assert.deepEqual(toRgb("#66d9ef"), [102, 217, 239]);
});

test("对比度计算符合 WCAG 公式", () => {
  assert.equal(contrast("#000000", "#ffffff").toFixed(2), "21.00");
});

test("对比度样本只覆盖 Pro 与 Light 两套配色", () => {
  const filterNames = new Set(pairs.map((pair) => pair.filter));

  assert.deepEqual(
    [...filterNames].sort(),
    ["light", "pro"].sort(),
  );
});

test("全部滤镜对比度样本满足阈值", () => {
  const failures = checkContrastPairs().filter((result) => !result.passed);

  assert.deepEqual(failures, []);
});

test("Pro 与 Light 覆盖代码学习专项对比度样本", () => {
  const requiredLabels = ["代码注释", "行号", "选区文字", "代码块边框", "链接", "Callout 标题"];

  for (const filter of ["light", "pro"]) {
    const labels = new Set(pairs.filter((pair) => pair.filter === filter).map((pair) => pair.label));
    assert.deepEqual(
      requiredLabels.filter((label) => !labels.has(label)),
      [],
      `${filter} 缺少代码学习专项样本`,
    );
  }
});
