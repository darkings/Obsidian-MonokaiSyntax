import { copyFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const rootDir = resolve(import.meta.dirname, "..");
const defaultVaultRoot = "C:/Users/Jie/iCloudDrive/iCloud~md~obsidian/SecondBrain";
const vaultRoot = process.argv[2] ?? defaultVaultRoot;
const vaultThemeDir = resolve(vaultRoot, ".obsidian/themes/Monokai Syntax");

mkdirSync(vaultThemeDir, { recursive: true });

copyFileSync(resolve(rootDir, "dist/theme.css"), resolve(vaultThemeDir, "theme.css"));
copyFileSync(resolve(rootDir, "manifest.json"), resolve(vaultThemeDir, "manifest.json"));

console.log(`已同步主题到：${vaultThemeDir}`);
