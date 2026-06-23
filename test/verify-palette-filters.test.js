import assert from "node:assert/strict";
import test from "node:test";

import { inspectPaletteFilters } from "../scripts/verify-palette-filters.js";

test("每个滤镜都覆盖核心语义变量", () => {
  const result = inspectPaletteFilters();

  assert.deepEqual(result.failures, []);
});
