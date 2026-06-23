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

- 学习路线
  - Day01 图像基础
    - 读 API 文档
    - 复现示例代码
  - Day02 批处理增强
    - 记录参数变化
    - 总结错误模式
- [ ] 普通任务
- [x] 已完成任务
- [>] 下一步任务
- [-] 取消任务
- [?] 问题任务
- [!] 重点任务
- [/] 进行中任务
- [*] 星标任务

| 项目 | 颜色语义 | 预期 |
| --- | --- | --- |
| 链接 | 青蓝色 | 清晰可点击 |
| 引用 | 绿色 | 稳定但不抢眼 |
| 代码 | 深色块 | 像编辑器中的编辑器 |

### API 参数表

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| \`src\` | \`string\` | \`""\` | **是** | 输入图像路径 |
| \`threshold\` | \`number\` | \`0.5\` | 否 | 边缘检测阈值 |
| \`mode\` | \`"fast" \\| "accurate"\` | \`"fast"\` | 否 | 推理模式 |

### Mermaid / Math / Dataview

\`\`\`mermaid
graph TD
  A[读取图像] --> B[预处理]
  B --> C{是否需要增强}
  C -->|是| D[批处理增强]
  C -->|否| E[输出结果]
\`\`\`

$$
E = mc^2
$$

\`\`\`dataview
TABLE status, priority
FROM #theme-qa
SORT priority DESC
\`\`\`

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

const codeLearning = `# QA 代码学习样例

这篇笔记用于检查代码学习场景中的任务状态、三层嵌套列表、API 参数表、代码块和 CodeMirror token。

## 学习步骤

- OpenCV 学习路径
  - Day01 图像读取
    - 记录 \`cv2.imread\` 的返回值
    - 对比 RGB 与 BGR
  - Day02 图像增强
    - 调整阈值参数
    - 记录失败样例

- [ ] 普通任务
- [x] 已完成任务
- [>] 下一步任务
- [-] 取消任务
- [?] 问题任务
- [!] 重点任务
- [/] 进行中任务
- [*] 星标任务

## API 参数表

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| \`src\` | \`string\` | \`""\` | **是** | 输入图像路径 |
| \`threshold\` | \`number\` | \`0.5\` | 否 | 边缘检测阈值 |
| \`mode\` | \`"fast" \\| "accurate"\` | \`"fast"\` | 否 | 推理模式 |

\`\`\`python
from pathlib import Path

def load_image(src: str, threshold: float = 0.5) -> dict[str, float]:
    path = Path(src)
    if not path.exists():
        raise FileNotFoundError(src)

    return {"threshold": threshold, "area": 42.0}
\`\`\`
`;

const learningCallouts = `# QA Callout 学习语义

> [!concept] 概念
> 用于记录核心概念、术语和心智模型。

> [!syntax] 语法
> 用于记录语言结构、函数签名和调用方式。

> [!api] API
> 用于记录参数、返回值和错误边界。

> [!debug] Debug
> 用于记录调试路径和定位过程。

> [!pitfall] 易错点
> 用于记录常见误区和反例。

> [!exercise] 练习
> 用于记录待完成的编码训练。

> [!answer] 答案
> 用于记录练习解法和解释。

> [!source] Source
> 用于记录源码阅读摘记。

> [!output] Output
> 用于记录运行结果和日志摘要。

> [!terminal] Terminal
> 用于记录命令行输入输出。
`;

const mermaidMathDataview = `# QA Mermaid Math Dataview

\`\`\`mermaid
graph TD
  A[读取图像] --> B[预处理]
  B --> C{是否增强}
  C -->|是| D[批处理]
  C -->|否| E[输出]
\`\`\`

$$
E = mc^2
$$

\`\`\`dataview
TABLE status, priority
FROM #theme-qa
SORT priority DESC
\`\`\`
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
writeFileSync(resolve(qaDir, "QA 代码学习样例.md"), codeLearning);
writeFileSync(resolve(qaDir, "QA Callout 学习语义.md"), learningCallouts);
writeFileSync(resolve(qaDir, "QA Mermaid Math Dataview.md"), mermaidMathDataview);
writeFileSync(resolve(qaDir, "QA 关系图谱节点.md"), graphNode);
writeFileSync(resolve(qaDir, "QA Canvas 检查.md"), canvasNote);
writeFileSync(resolve(qaDir, "Monokai Syntax QA.canvas"), JSON.stringify(canvas, null, 2));

console.log(`已创建 QA 内容：${qaDir}`);
