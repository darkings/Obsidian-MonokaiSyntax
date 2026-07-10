import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export const readScssSource = (rootDir, path) => readFileSync(resolve(rootDir, path), "utf8");

export const readEditorScss = (rootDir) => [
  "src/scss/components/_editor.scss",
  "src/scss/components/editor/_tokens.scss",
  "src/scss/components/editor/_reading.scss",
  "src/scss/components/editor/_source.scss",
  "src/scss/components/editor/_syntax.scss",
  "src/scss/components/editor/_links.scss",
].map((path) => readScssSource(rootDir, path)).join("\n");
