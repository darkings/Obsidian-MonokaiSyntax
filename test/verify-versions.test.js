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

test("版本检查在分支工作流中不把分支名当发布标签", () => {
  const result = checkVersionConsistency({
    packageJson: { version: "1.1.0" },
    manifestJson: { version: "1.1.0", minAppVersion: "1.0.0" },
    versionsJson: { "1.1.0": "1.0.0" },
    releaseTag: "master",
    requireReleaseTag: false,
  });

  assert.equal(result.passed, true);
  assert.deepEqual(result.failures, []);
});

test("版本检查在标签发布中校验标签与 package 版本一致", () => {
  const result = checkVersionConsistency({
    packageJson: { version: "1.1.0" },
    manifestJson: { version: "1.1.0", minAppVersion: "1.0.0" },
    versionsJson: { "1.1.0": "1.0.0" },
    releaseTag: "master",
    requireReleaseTag: true,
  });

  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /发布标签 master/);
});
