import { copyFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const rootDir = resolve(import.meta.dirname, "..");
const vaultRoot = process.argv[2] ?? process.env.OBSIDIAN_VAULT;

if (!vaultRoot) {
  console.error("请设置 OBSIDIAN_VAULT 环境变量或通过命令行参数指定 Vault 路径");
  console.error("示例：npm run sync:vault -- D:/你的/Obsidian/Vault");
  process.exit(1);
}

const vaultThemeDir = resolve(vaultRoot, ".obsidian/themes/Monokai Syntax");

mkdirSync(vaultThemeDir, { recursive: true });

copyFileSync(resolve(rootDir, "theme.css"), resolve(vaultThemeDir, "theme.css"));
copyFileSync(resolve(rootDir, "manifest.json"), resolve(vaultThemeDir, "manifest.json"));

console.log(`已同步主题到：${vaultThemeDir}`);
