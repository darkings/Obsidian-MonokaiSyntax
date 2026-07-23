import { pathToFileURL } from "node:url";

export const pairs = [
  { filter: "pro", label: "正文", foreground: "#fcfcfa", background: "#2d2a2e", minimum: 4.5 },
  { filter: "pro", label: "链接", foreground: "#78dce8", background: "#2d2a2e", minimum: 4.5 },
  { filter: "pro", label: "图标", foreground: "#c1c0c0", background: "#221f22", minimum: 3 },
  { filter: "pro", label: "高亮文本", foreground: "#fcfcfa", background: "#5f5230", minimum: 4.5 },
  { filter: "pro", label: "代码注释", foreground: "#727072", background: "#221f22", minimum: 3 },
  { filter: "pro", label: "代码字符串", foreground: "#ffd866", background: "#221f22", minimum: 4.5 },
  { filter: "pro", label: "代码属性", foreground: "#78dce8", background: "#221f22", minimum: 4.5 },
  { filter: "pro", label: "代码数值", foreground: "#ab9df2", background: "#221f22", minimum: 4.5 },
  { filter: "pro", label: "代码关键字", foreground: "#ff6188", background: "#221f22", minimum: 4.5 },
  { filter: "pro", label: "代码函数", foreground: "#a9dc76", background: "#221f22", minimum: 4.5 },
  { filter: "pro", label: "代码运算符", foreground: "#fc9867", background: "#221f22", minimum: 4.5 },
  { filter: "pro", label: "行号", foreground: "#939293", background: "#221f22", minimum: 3 },
  { filter: "pro", label: "选区文字", foreground: "#fcfcfa", background: "#344349", minimum: 4.5 },
  { filter: "pro", label: "代码块边框", foreground: "#403e41", background: "#221f22", minimum: 1.3 },
  { filter: "pro", label: "Callout 标题", foreground: "#78dce8", background: "#2e3e42", minimum: 4.5 },
  { filter: "light", label: "正文", foreground: "#3d3d3d", background: "#fdf9f3", minimum: 4.5 },
  { filter: "light", label: "链接", foreground: "#0f6478", background: "#fdf9f3", minimum: 4.5 },
  { filter: "light", label: "图标", foreground: "#666666", background: "#f5f0e6", minimum: 3 },
  { filter: "light", label: "高亮文本", foreground: "#3d3d3d", background: "#f7e7b3", minimum: 4.5 },
  { filter: "light", label: "代码注释", foreground: "#77736c", background: "#eee6d8", minimum: 3 },
  { filter: "light", label: "代码字符串", foreground: "#8a5200", background: "#eee6d8", minimum: 4.5 },
  { filter: "light", label: "代码属性", foreground: "#0f6478", background: "#eee6d8", minimum: 4.5 },
  { filter: "light", label: "代码数值", foreground: "#684cae", background: "#eee6d8", minimum: 4.5 },
  { filter: "light", label: "代码关键字", foreground: "#b82f5b", background: "#eee6d8", minimum: 4.5 },
  { filter: "light", label: "代码函数", foreground: "#126b44", background: "#eee6d8", minimum: 4.5 },
  { filter: "light", label: "代码运算符", foreground: "#a93355", background: "#eee6d8", minimum: 4.5 },
  { filter: "light", label: "行号", foreground: "#7a7369", background: "#f5f0e6", minimum: 3 },
  { filter: "light", label: "选区文字", foreground: "#3d3d3d", background: "#d8edf0", minimum: 4.5 },
  { filter: "light", label: "代码块边框", foreground: "#d8d0c2", background: "#f5f0e6", minimum: 1.3 },
  { filter: "light", label: "Callout 标题", foreground: "#0f6478", background: "#eef6f5", minimum: 4.5 },
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
  return contrastPairs.map(({ filter, label, foreground, background, minimum }) => {
    const ratio = contrast(foreground, background);

    return {
      filter,
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
    console.log(`${result.filter} ${result.label}: ${formattedRatio}:1，要求 >= ${result.minimum}:1`);

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
