import { pathToFileURL } from "node:url";

export const pairs = [
  ["深色正文", "#f8f8f2", "#272822", 4.5],
  ["深色链接", "#66d9ef", "#272822", 4.5],
  ["深色图标", "#c1c1bd", "#1e1f1c", 3],
  ["深色高亮文本", "#f8f8f2", "#5b542f", 4.5],
  ["浅色正文", "#3d3d3d", "#fdf9f3", 4.5],
  ["浅色链接", "#14748a", "#fdf9f3", 4.5],
  ["浅色图标", "#666666", "#f5f0e6", 3],
  ["浅色高亮文本", "#3d3d3d", "#f7e7b3", 4.5],
];

export function toRgb(hex) {
  const value = hex.replace("#", "");
  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16),
  ];
}

export function channel(value) {
  const normalized = value / 255;
  return normalized <= 0.03928
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

export function luminance(hex) {
  const [red, green, blue] = toRgb(hex).map(channel);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

export function contrast(foreground, background) {
  const foregroundLuminance = luminance(foreground);
  const backgroundLuminance = luminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

export function checkContrastPairs(contrastPairs = pairs) {
  return contrastPairs.map(([label, foreground, background, minimum]) => {
    const ratio = contrast(foreground, background);

    return {
      label,
      foreground,
      background,
      minimum,
      ratio,
      passed: ratio >= minimum,
    };
  });
}

function runCli() {
  const results = checkContrastPairs();
  let hasFailure = false;

  for (const result of results) {
    const formattedRatio = result.ratio.toFixed(2);
    console.log(`${result.label}: ${formattedRatio}:1，要求 >= ${result.minimum}:1`);

    if (!result.passed) {
      hasFailure = true;
    }
  }

  if (hasFailure) {
    process.exitCode = 1;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  runCli();
}
