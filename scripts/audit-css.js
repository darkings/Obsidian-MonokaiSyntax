import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const themeCssPath = resolve(import.meta.dirname, "../theme.css");
const themeCss = readFileSync(themeCssPath, "utf8");

const urlMatches = [...themeCss.matchAll(/url\((["']?)(.*?)\1\)/gi)].map((match) => match[2]);
const forbiddenRuntimeUrls = urlMatches.filter(
  (url) => !url.startsWith("data:font/woff;base64,"),
);

const checks = [
  ["外部 @import", /@import/i.test(themeCss)],
  ["远程 URL", /https?:\/\//i.test(themeCss)],
  ["非本地内联字体 url() 资源", forbiddenRuntimeUrls.length > 0],
  ["!important 声明", /!important/i.test(themeCss)],
];

let hasFailure = false;

for (const [label, matched] of checks) {
  console.log(`${label}: ${matched ? "发现" : "未发现"}`);

  if (matched) {
    hasFailure = true;
  }
}

if (hasFailure) {
  process.exitCode = 1;
}
