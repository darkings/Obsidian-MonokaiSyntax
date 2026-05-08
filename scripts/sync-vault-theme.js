import { copyFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const rootDir = resolve(import.meta.dirname, "..");
const vaultThemeDir = resolve(
  "C:/Users/Jie/iCloudDrive/iCloud~md~obsidian/SecondBrain/.obsidian/themes/Monokai Syntax",
);

mkdirSync(vaultThemeDir, { recursive: true });

copyFileSync(resolve(rootDir, "dist/theme.css"), resolve(vaultThemeDir, "theme.css"));
copyFileSync(resolve(rootDir, "manifest.json"), resolve(vaultThemeDir, "manifest.json"));

console.log(`已同步主题到：${vaultThemeDir}`);
