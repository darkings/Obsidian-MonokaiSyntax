import { resolve } from "node:path";

export const DEFAULT_VAULT = "C:/Users/Jie/iCloudDrive/iCloud~md~obsidian/SecondBrain";

export function resolveVaultRoot({ argv = process.argv.slice(2), env = process.env } = {}) {
  return argv[0] ?? env.OBSIDIAN_VAULT ?? DEFAULT_VAULT;
}

export function resolveQaPaths(vaultRoot) {
  const vaultDir = resolve(vaultRoot);
  const qaDir = resolve(vaultDir, "project/Monokai Syntax/QA");
  const themeDir = resolve(vaultDir, ".obsidian/themes/Monokai Syntax");

  return {
    vaultDir,
    qaDir,
    themeDir,
    appearancePath: resolve(vaultDir, ".obsidian/appearance.json"),
    themeCssPath: resolve(themeDir, "theme.css"),
    manifestPath: resolve(themeDir, "manifest.json"),
  };
}
