import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export function auditCssContent(themeCss) {
  const urlMatches = [...themeCss.matchAll(/url\((["']?)(.*?)\1\)/gi)].map((match) => match[2]);
  const forbiddenRuntimeUrls = urlMatches.filter(
    (url) => !url.startsWith("data:font/woff;base64,"),
  );
  const checks = [
    ["外部 @import", /@import/i.test(themeCss)],
    ["远程 URL", /https?:\/\//i.test(themeCss)],
    ["非本地内联字体 url() 资源", forbiddenRuntimeUrls.length > 0],
    ["!important 声明", /!important/i.test(themeCss)],
    ["ID 选择器", /(^|[{};])\s*#[A-Za-z][\w-]*/m.test(themeCss)],
  ];
  const failures = checks.filter(([, matched]) => matched).map(([label]) => label);

  return {
    passed: failures.length === 0,
    failures,
    checks,
  };
}

function runCli() {
  const themeCssPath = resolve(import.meta.dirname, "../theme.css");
  const result = auditCssContent(readFileSync(themeCssPath, "utf8"));

  for (const [label, matched] of result.checks) {
    console.log(`${label}: ${matched ? "发现" : "未发现"}`);
  }

  if (!result.passed) {
    process.exitCode = 1;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  runCli();
}
