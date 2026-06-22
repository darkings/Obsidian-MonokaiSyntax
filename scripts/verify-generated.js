import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

function sha256(content) {
  return createHash("sha256").update(content).digest("hex");
}

export function compareThemeCss({ rootThemeCss, distThemeCss }) {
  const rootHash = sha256(rootThemeCss);
  const distHash = sha256(distThemeCss);

  return {
    passed: rootHash === distHash,
    rootHash,
    distHash,
  };
}

export function verifyGeneratedOutputs(rootDir = resolve(import.meta.dirname, "..")) {
  const paths = {
    rootTheme: resolve(rootDir, "theme.css"),
    distTheme: resolve(rootDir, "dist/theme.css"),
    generatedIcons: resolve(rootDir, "src/scss/components/_file-icons.generated.scss"),
  };
  const checks = [];

  function add(label, passed) {
    checks.push({ label, passed });
  }

  add("根目录 theme.css 存在", existsSync(paths.rootTheme));
  add("dist/theme.css 存在", existsSync(paths.distTheme));
  add("图标生成 SCSS 存在", existsSync(paths.generatedIcons));

  if (existsSync(paths.rootTheme) && existsSync(paths.distTheme)) {
    const comparison = compareThemeCss({
      rootThemeCss: readFileSync(paths.rootTheme, "utf8"),
      distThemeCss: readFileSync(paths.distTheme, "utf8"),
    });
    add("根目录 theme.css 与 dist/theme.css 内容一致", comparison.passed);
  }

  if (existsSync(paths.generatedIcons)) {
    const generatedIcons = readFileSync(paths.generatedIcons, "utf8");
    add("图标 SCSS 包含内联字体", /data:font\/woff;base64,/.test(generatedIcons));
    add("图标 SCSS 包含 AGENTS.md 专属规则", /\[data-path="AGENTS\.md"\]::before/.test(generatedIcons));
  }

  const failures = checks.filter((check) => !check.passed).map((check) => check.label);

  return {
    passed: failures.length === 0,
    failures,
    checks,
  };
}

function runCli() {
  const result = verifyGeneratedOutputs();

  for (const check of result.checks) {
    console.log(`${check.label}: ${check.passed ? "通过" : "失败"}`);
  }

  if (!result.passed) {
    process.exitCode = 1;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  runCli();
}
