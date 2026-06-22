import assert from "node:assert/strict";
import test from "node:test";

import { auditCssContent } from "../scripts/audit-css.js";

test("CSS 审计允许本地内联 woff 字体", () => {
  const result = auditCssContent("@font-face { src: url(data:font/woff;base64,AAAA); }");

  assert.equal(result.passed, true);
});

test("CSS 审计报告远程资源和 ID 选择器", () => {
  const result = auditCssContent("#app { background: url(https://example.com/a.png); }");

  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /远程 URL/);
  assert.match(result.failures.join("\n"), /ID 选择器/);
});
