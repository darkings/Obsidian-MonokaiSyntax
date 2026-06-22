import assert from "node:assert/strict";
import test from "node:test";

import { DEFAULT_VAULT, resolveVaultRoot } from "../scripts/qa-paths.js";

test("Vault 路径优先使用命令行参数", () => {
  assert.equal(resolveVaultRoot({ argv: ["D:/Vault"], env: { OBSIDIAN_VAULT: "E:/Vault" } }), "D:/Vault");
});

test("Vault 路径其次使用 OBSIDIAN_VAULT", () => {
  assert.equal(resolveVaultRoot({ argv: [], env: { OBSIDIAN_VAULT: "E:/Vault" } }), "E:/Vault");
});

test("Vault 路径没有输入时回退到本机默认值", () => {
  assert.equal(resolveVaultRoot({ argv: [], env: {} }), DEFAULT_VAULT);
});
