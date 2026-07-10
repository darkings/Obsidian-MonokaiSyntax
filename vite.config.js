import { existsSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const rootDir = import.meta.dirname;
const outDir = resolve(rootDir, "dist");
const themeCssPath = resolve(outDir, "theme.css");
const rootThemeCssPath = resolve(rootDir, "theme.css");
const licensePath = resolve(rootDir, "src/css/license.css");
const styleSettingsDir = resolve(rootDir, "src/css/style-settings");

function readStyleSettings() {
  return readdirSync(styleSettingsDir)
    .filter((fileName) => fileName.endsWith(".css.md"))
    .sort((a, b) => a.localeCompare(b))
    .map((fileName) => readFileSync(resolve(styleSettingsDir, fileName), "utf8").trim())
    .filter(Boolean)
    .join("\n\n");
}

function obsidianThemeBundle() {
  return {
    name: "obsidian-theme-bundle",
    closeBundle() {
      if (!existsSync(themeCssPath)) {
        throw new Error(`未找到主题 CSS 构建产物：${themeCssPath}`);
      }
      const license = readFileSync(licensePath, "utf8").trim();
      const themeCss = readFileSync(themeCssPath, "utf8")
        .replace(/\/\*\$vite\$:\d+\*\//g, "")
        .trim();
      const styleSettings = readStyleSettings();
      const sections = [license, themeCss, styleSettings].filter(Boolean);
      const bundled = `${sections.join("\n\n")}\n`;

      writeFileSync(themeCssPath, bundled);
      writeFileSync(rootThemeCssPath, bundled);

      for (const fileName of readdirSync(outDir)) {
        if (fileName.endsWith(".js")) {
          rmSync(resolve(outDir, fileName));
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [obsidianThemeBundle()],
  build: {
    assetsDir: ".",
    cssCodeSplit: false,
    cssMinify: true,
    emptyOutDir: true,
    minify: false,
    outDir: "dist",
    rollupOptions: {
      input: resolve(rootDir, "src/main.js"),
      output: {
        assetFileNames: "theme.css",
      },
    },
  },
});
