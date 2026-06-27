import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export function readJsonFile(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

export function normalizeReleaseTag(tag) {
  return tag?.replace(/^refs\/tags\//, "").replace(/^v/, "");
}

export function checkVersionConsistency({
  packageJson,
  manifestJson,
  versionsJson,
  releaseTag = process.env.GITHUB_REF_NAME,
  requireReleaseTag = Boolean(process.env.GITHUB_ACTIONS && process.env.GITHUB_REF_TYPE === "tag"),
}) {
  const failures = [];
  const packageVersion = packageJson.version;
  const manifestVersion = manifestJson.version;
  const minAppVersion = manifestJson.minAppVersion;
  const tagVersion = requireReleaseTag ? normalizeReleaseTag(releaseTag) : "";

  if (!packageVersion) {
    failures.push("package.json 缺少 version 字段");
  }

  if (manifestVersion !== packageVersion) {
    failures.push(`manifest.json 版本 ${manifestVersion ?? "缺失"} 与 package.json 版本 ${packageVersion ?? "缺失"} 不一致`);
  }

  if (!versionsJson[packageVersion]) {
    failures.push(`versions.json 缺少当前版本 ${packageVersion} 的映射`);
  }

  if (versionsJson[packageVersion] !== minAppVersion) {
    failures.push(`versions.json 中 ${packageVersion} 的最低 Obsidian 版本应为 ${minAppVersion}`);
  }

  if (requireReleaseTag && !tagVersion) {
    failures.push("发布环境缺少版本标签");
  }

  if (tagVersion && tagVersion !== packageVersion) {
    failures.push(`发布标签 ${releaseTag} 与 package.json 版本 ${packageVersion} 不一致`);
  }

  return {
    passed: failures.length === 0,
    failures,
  };
}

function runCli() {
  const rootDir = resolve(import.meta.dirname, "..");
  const result = checkVersionConsistency({
    packageJson: readJsonFile(resolve(rootDir, "package.json")),
    manifestJson: readJsonFile(resolve(rootDir, "manifest.json")),
    versionsJson: readJsonFile(resolve(rootDir, "versions.json")),
  });

  if (result.passed) {
    console.log("版本一致性检查: 通过");
    return;
  }

  for (const failure of result.failures) {
    console.error(`版本一致性检查: ${failure}`);
  }

  process.exitCode = 1;
}

if (existsSync(process.argv[1] ?? "") && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runCli();
}
