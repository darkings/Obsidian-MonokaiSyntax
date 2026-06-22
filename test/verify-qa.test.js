import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import test from "node:test";

import { verifyQaVault } from "../scripts/verify-qa.js";

test("QA 验证将缺失文件记录为失败项", () => {
  const vaultDir = mkdtempSync(resolve(tmpdir(), "monokai-qa-"));
  mkdirSync(resolve(vaultDir, ".obsidian/themes/Monokai Syntax"), { recursive: true });
  writeFileSync(resolve(vaultDir, ".obsidian/appearance.json"), "{}");
  writeFileSync(resolve(vaultDir, ".obsidian/themes/Monokai Syntax/theme.css"), ".theme-dark{}");
  writeFileSync(resolve(vaultDir, ".obsidian/themes/Monokai Syntax/manifest.json"), "{}");

  const result = verifyQaVault(vaultDir);

  assert.equal(result.passed, false);
  assert.match(result.checks.map((check) => check.label).join("\n"), /QA 文件存在/);
});

test("QA 验证对无效 JSON 给出失败项而不抛出异常", () => {
  const vaultDir = mkdtempSync(resolve(tmpdir(), "monokai-qa-"));
  mkdirSync(resolve(vaultDir, ".obsidian/themes/Monokai Syntax"), { recursive: true });
  writeFileSync(resolve(vaultDir, ".obsidian/appearance.json"), "{");
  writeFileSync(resolve(vaultDir, ".obsidian/themes/Monokai Syntax/theme.css"), "");
  writeFileSync(resolve(vaultDir, ".obsidian/themes/Monokai Syntax/manifest.json"), "{}");

  const result = verifyQaVault(vaultDir);

  assert.equal(result.passed, false);
  assert.match(result.failures.join("\n"), /appearance\.json 不是有效 JSON/);
});
