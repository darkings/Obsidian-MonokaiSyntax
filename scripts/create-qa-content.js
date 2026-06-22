import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { resolveQaPaths, resolveVaultRoot } from "./qa-paths.js";

const { qaDir } = resolveQaPaths(resolveVaultRoot());

mkdirSync(qaDir, { recursive: true });

const overview = `---
tags:
  - monokai-syntax
  - theme-qa
status: active
priority: high
---

# Monokai Syntax QA 总览

这是用于检查 **Monokai Syntax** 主题的综合测试笔记。

## 标题层级

### 三级标题：高亮与列表

正文文本用于检查长时间阅读的基础色。这里包含 ==Markdown 高亮==、**粗体强调**、*斜体文本*、\`行内代码\`、[[QA 长文阅读样例]] 和 [外部链接](https://obsidian.md)。

> 这是一段块引用。它应当保留正文可读性，同时使用绿色左边框形成清晰边界。

- 一级项目
  - 二级项目
    - 三级项目
- [ ] 未完成任务
- [x] 已完成任务

| 项目 | 颜色语义 | 预期 |
| --- | --- | --- |
| 链接 | 青蓝色 | 清晰可点击 |
| 引用 | 绿色 | 稳定但不抢眼 |
| 代码 | 深色块 | 像编辑器中的编辑器 |

\`\`\`js
const palette = {
  magenta: "#f92672",
  orange: "#fd971f",
  yellow: "#e6db74",
  green: "#a6e22e",
  cyan: "#66d9ef",
  purple: "#ae81ff",
};

function describeTheme(name) {
  return \`\${name} keeps focus on reading and structure.\`;
}
\`\`\`

## Callout

> [!note] 主题检查
> Callout 需要在深色和浅色模式下都保持边框、标题、正文清晰。

## 图谱链接

- [[QA 长文阅读样例]]
- [[QA 关系图谱节点]]
- [[QA Canvas 检查]]
`;

const longReading = `# QA 长文阅读样例

这篇笔记用于检查正文行高、段落间距、链接颜色、阅读视图背景和长文本舒适度。Monokai Syntax 的目标不是把所有内容都染成高饱和色，而是在必要位置提供明确的结构信号，让正文阅读仍然安静、稳定、可持续。

Obsidian 的知识管理场景不同于代码编辑器。这里的主要对象是 Markdown、双向链接、属性、引用、列表、Canvas 和关系图谱。因此主题的语义映射必须服务阅读，而不是简单复刻代码 token 颜色。

当正文持续增长时，\`--line-height-normal\`、\`--text-normal\`、\`--background-primary\` 和链接颜色会共同决定阅读体验。这里加入一个内部链接 [[QA 总览]]，用于检查普通段落里的链接是否足够清晰。

## 继续阅读

浅色模式尤其需要注意对比度。原规划中的浅色蓝色经过对比度检查后调整为更深的青蓝色，以保证在暖白背景上达到正文级链接可读性。
`;

const graphNode = `# QA 关系图谱节点

这篇笔记用于在 Graph View 中产生链接节点。

链接：

- [[Monokai Syntax QA 总览]]
- [[QA 长文阅读样例]]
- [[QA Canvas 检查]]

#theme-qa #graph-check #monokai-syntax
`;

const canvasNote = `# QA Canvas 检查

这篇笔记用于检查 Canvas 卡片中的正文、链接、代码和标签。

- [[Monokai Syntax QA 总览]]
- #canvas-check
- \`canvas-node-content\`
`;

const canvas = {
  nodes: [
    {
      id: "overview",
      type: "file",
      file: "project/Monokai Syntax/QA/Monokai Syntax QA 总览.md",
      x: -360,
      y: -120,
      width: 360,
      height: 260,
      color: "1",
    },
    {
      id: "reading",
      type: "file",
      file: "project/Monokai Syntax/QA/QA 长文阅读样例.md",
      x: 80,
      y: -120,
      width: 360,
      height: 260,
      color: "5",
    },
    {
      id: "note",
      type: "text",
      text: "Canvas 颜色预设需要映射到 Monokai 六色带，并在深浅模式下保持可读。",
      x: -140,
      y: 220,
      width: 360,
      height: 180,
      color: "4",
    },
  ],
  edges: [
    {
      id: "edge-overview-reading",
      fromNode: "overview",
      fromSide: "right",
      toNode: "reading",
      toSide: "left",
      color: "5",
    },
    {
      id: "edge-overview-note",
      fromNode: "overview",
      fromSide: "bottom",
      toNode: "note",
      toSide: "left",
      color: "4",
    },
  ],
};

writeFileSync(resolve(qaDir, "Monokai Syntax QA 总览.md"), overview);
writeFileSync(resolve(qaDir, "QA 长文阅读样例.md"), longReading);
writeFileSync(resolve(qaDir, "QA 关系图谱节点.md"), graphNode);
writeFileSync(resolve(qaDir, "QA Canvas 检查.md"), canvasNote);
writeFileSync(resolve(qaDir, "Monokai Syntax QA.canvas"), JSON.stringify(canvas, null, 2));

console.log(`已创建 QA 内容：${qaDir}`);
