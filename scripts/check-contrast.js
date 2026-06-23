import { pathToFileURL } from "node:url";

export const pairs = [
  { filter: "pro", label: "正文", foreground: "#fcfcfa", background: "#2d2a2e", minimum: 4.5 },
  { filter: "pro", label: "链接", foreground: "#78dce8", background: "#2d2a2e", minimum: 4.5 },
  { filter: "pro", label: "图标", foreground: "#c1c0c0", background: "#221f22", minimum: 3 },
  { filter: "pro", label: "高亮文本", foreground: "#fcfcfa", background: "#5f5230", minimum: 4.5 },
  { filter: "pro", label: "代码注释", foreground: "#727072", background: "#221f22", minimum: 3 },
  { filter: "pro", label: "行号", foreground: "#939293", background: "#221f22", minimum: 3 },
  { filter: "pro", label: "选区文字", foreground: "#fcfcfa", background: "#344349", minimum: 4.5 },
  { filter: "pro", label: "代码块边框", foreground: "#403e41", background: "#221f22", minimum: 1.3 },
  { filter: "pro", label: "Callout 标题", foreground: "#78dce8", background: "#2e3e42", minimum: 4.5 },
  { filter: "classic", label: "正文", foreground: "#f8f8f2", background: "#272822", minimum: 4.5 },
  { filter: "classic", label: "链接", foreground: "#66d9ef", background: "#272822", minimum: 4.5 },
  { filter: "classic", label: "图标", foreground: "#c1c1bd", background: "#1e1f1c", minimum: 3 },
  { filter: "classic", label: "高亮文本", foreground: "#f8f8f2", background: "#5b542f", minimum: 4.5 },
  { filter: "classic", label: "代码注释", foreground: "#72736f", background: "#1e1f1c", minimum: 3 },
  { filter: "classic", label: "行号", foreground: "#8f908a", background: "#1e1f1c", minimum: 3 },
  { filter: "classic", label: "选区文字", foreground: "#f8f8f2", background: "#33464a", minimum: 4.5 },
  { filter: "classic", label: "代码块边框", foreground: "#3e3d32", background: "#1e1f1c", minimum: 1.3 },
  { filter: "classic", label: "Callout 标题", foreground: "#66d9ef", background: "#283d40", minimum: 4.5 },
  { filter: "machine", label: "正文", foreground: "#f2ffef", background: "#222421", minimum: 4.5 },
  { filter: "machine", label: "链接", foreground: "#6bf5ff", background: "#222421", minimum: 4.5 },
  { filter: "machine", label: "图标", foreground: "#c2c9bd", background: "#191b19", minimum: 3 },
  { filter: "machine", label: "高亮文本", foreground: "#f2ffef", background: "#5d5228", minimum: 4.5 },
  { filter: "machine", label: "代码注释", foreground: "#747d70", background: "#191b19", minimum: 3 },
  { filter: "machine", label: "行号", foreground: "#8b9387", background: "#191b19", minimum: 3 },
  { filter: "machine", label: "选区文字", foreground: "#f2ffef", background: "#2b4648", minimum: 4.5 },
  { filter: "machine", label: "代码块边框", foreground: "#394037", background: "#191b19", minimum: 1.3 },
  { filter: "machine", label: "Callout 标题", foreground: "#6bf5ff", background: "#244045", minimum: 4.5 },
  { filter: "octagon", label: "正文", foreground: "#fff9fb", background: "#28252f", minimum: 4.5 },
  { filter: "octagon", label: "链接", foreground: "#78dce8", background: "#28252f", minimum: 4.5 },
  { filter: "octagon", label: "图标", foreground: "#cbc3d4", background: "#1f1d26", minimum: 3 },
  { filter: "octagon", label: "高亮文本", foreground: "#fff9fb", background: "#5e5133", minimum: 4.5 },
  { filter: "octagon", label: "代码注释", foreground: "#77707f", background: "#1f1d26", minimum: 3 },
  { filter: "octagon", label: "行号", foreground: "#978da3", background: "#1f1d26", minimum: 3 },
  { filter: "octagon", label: "选区文字", foreground: "#fff9fb", background: "#34434e", minimum: 4.5 },
  { filter: "octagon", label: "代码块边框", foreground: "#443d50", background: "#1f1d26", minimum: 1.3 },
  { filter: "octagon", label: "Callout 标题", foreground: "#78dce8", background: "#2a3d48", minimum: 4.5 },
  { filter: "ristretto", label: "正文", foreground: "#fff8ef", background: "#2b241f", minimum: 4.5 },
  { filter: "ristretto", label: "链接", foreground: "#78dce8", background: "#2b241f", minimum: 4.5 },
  { filter: "ristretto", label: "图标", foreground: "#cfc1b2", background: "#211b18", minimum: 3 },
  { filter: "ristretto", label: "高亮文本", foreground: "#fff8ef", background: "#5f4f2e", minimum: 4.5 },
  { filter: "ristretto", label: "代码注释", foreground: "#7b7066", background: "#211b18", minimum: 3 },
  { filter: "ristretto", label: "行号", foreground: "#998b7d", background: "#211b18", minimum: 3 },
  { filter: "ristretto", label: "选区文字", foreground: "#fff8ef", background: "#344145", minimum: 4.5 },
  { filter: "ristretto", label: "代码块边框", foreground: "#463b32", background: "#211b18", minimum: 1.3 },
  { filter: "ristretto", label: "Callout 标题", foreground: "#78dce8", background: "#2d3b3d", minimum: 4.5 },
  { filter: "spectrum", label: "正文", foreground: "#f7f8ff", background: "#262933", minimum: 4.5 },
  { filter: "spectrum", label: "链接", foreground: "#78dce8", background: "#262933", minimum: 4.5 },
  { filter: "spectrum", label: "图标", foreground: "#c3c8d8", background: "#1c1f28", minimum: 3 },
  { filter: "spectrum", label: "高亮文本", foreground: "#f7f8ff", background: "#5d5233", minimum: 4.5 },
  { filter: "spectrum", label: "代码注释", foreground: "#71788c", background: "#1c1f28", minimum: 3 },
  { filter: "spectrum", label: "行号", foreground: "#8d94a8", background: "#1c1f28", minimum: 3 },
  { filter: "spectrum", label: "选区文字", foreground: "#f7f8ff", background: "#33434f", minimum: 4.5 },
  { filter: "spectrum", label: "代码块边框", foreground: "#3e4454", background: "#1c1f28", minimum: 1.3 },
  { filter: "spectrum", label: "Callout 标题", foreground: "#78dce8", background: "#283d48", minimum: 4.5 },
  { filter: "light", label: "正文", foreground: "#3d3d3d", background: "#fdf9f3", minimum: 4.5 },
  { filter: "light", label: "链接", foreground: "#14748a", background: "#fdf9f3", minimum: 4.5 },
  { filter: "light", label: "图标", foreground: "#666666", background: "#f5f0e6", minimum: 3 },
  { filter: "light", label: "高亮文本", foreground: "#3d3d3d", background: "#f7e7b3", minimum: 4.5 },
  { filter: "light", label: "代码注释", foreground: "#7a7369", background: "#f5f0e6", minimum: 3 },
  { filter: "light", label: "行号", foreground: "#7a7369", background: "#f5f0e6", minimum: 3 },
  { filter: "light", label: "选区文字", foreground: "#3d3d3d", background: "#d8edf0", minimum: 4.5 },
  { filter: "light", label: "代码块边框", foreground: "#d8d0c2", background: "#f5f0e6", minimum: 1.3 },
  { filter: "light", label: "Callout 标题", foreground: "#14748a", background: "#eef6f5", minimum: 4.5 },
  { filter: "sun", label: "正文", foreground: "#3a3426", background: "#fbf3db", minimum: 4.5 },
  { filter: "sun", label: "链接", foreground: "#1f7184", background: "#fbf3db", minimum: 4.5 },
  { filter: "sun", label: "图标", foreground: "#675f4a", background: "#f4e8c4", minimum: 3 },
  { filter: "sun", label: "高亮文本", foreground: "#3a3426", background: "#eed99f", minimum: 4.5 },
  { filter: "sun", label: "代码注释", foreground: "#847a60", background: "#f4e8c4", minimum: 3 },
  { filter: "sun", label: "行号", foreground: "#847a60", background: "#f4e8c4", minimum: 3 },
  { filter: "sun", label: "选区文字", foreground: "#3a3426", background: "#d6e6e7", minimum: 4.5 },
  { filter: "sun", label: "代码块边框", foreground: "#d7c89e", background: "#f4e8c4", minimum: 1.3 },
  { filter: "sun", label: "Callout 标题", foreground: "#1f7184", background: "#edf2d5", minimum: 4.5 },
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
