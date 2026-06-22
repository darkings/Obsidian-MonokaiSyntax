import { copyFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

import { resolveQaPaths, resolveVaultRoot } from "./qa-paths.js";

const rootDir = resolve(import.meta.dirname, "..");
const { themeDir: vaultThemeDir } = resolveQaPaths(resolveVaultRoot());

mkdirSync(vaultThemeDir, { recursive: true });

copyFileSync(resolve(rootDir, "theme.css"), resolve(vaultThemeDir, "theme.css"));
copyFileSync(resolve(rootDir, "manifest.json"), resolve(vaultThemeDir, "manifest.json"));

console.log(`已同步主题到：${vaultThemeDir}`);
