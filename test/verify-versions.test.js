import assert from "node:assert/strict";
import test from "node:test";

import { checkVersionConsistency } from "../scripts/verify-versions.js";

test("版本检查要求 package、manifest、versions 保持一致", () => {
  const result = checkVersionConsistency({
    packageJson: { version: "1.2.3" },
    manifestJson: { version: "1.2.3", minAppVersion: "1.0.0" },
    versionsJson: { "1.2.3": "1.0.0" },
  });

  assert.equal(result.passed, true);
  assert.deepEqual(result.failures, []);
});

test("版本检查报告不一致的中文错误", () => {
  const result = checkVersionConsistency({
    packageJson: { version: "1.2.3" },
    manifestJson: { version: "1.2.4", minAppVersion: "1.0.0" },
    versionsJson: { "1.2.3": "1.0.0" },
  });

  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /manifest\.json 版本/);
});
