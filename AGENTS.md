# 项目协作规范

## 文档语言

- 本项目所有文档必须使用中文书写。

## 项目文档位置

- Windows 系统下，本项目的长期项目文档、研究文档、路线图、QA 文档与问题汇总优先维护在：

```text
C:\Users\Jie\iCloudDrive\iCloud~md~obsidian\SecondBrain\project\Monokai Syntax
```

- 当前仓库仅保留开发、构建、协作、发布与源码旁注所必需的文档。
- 将仓库文档迁移到上述 Obsidian 项目目录前，需要先确认该文档不会被构建脚本、发布流程、协作规则或源码注释直接依赖。
- 已迁移到 Obsidian 项目目录的文档，不应在仓库中继续维护重复副本；如仓库流程需要引用，应在仓库文档中写明 Obsidian 目录中的目标位置。
- `docs/` 目录仅作为临时整理区使用。稳定的说明文档、QA 清单、路线图和研究报告应迁移到 Obsidian 项目目录。

# Codex任务执行引导

1. 当接收到指令“continue to next task”时，首先读取当前目录下的TODO.md文件；
2. 检查TODO List中未标记“已完成”的第一个任务，执行该任务；
3. 任务执行完成后，在TODO.md中标记该任务为“已完成”；
4. 若执行过程中遇到错误（如文件不存在、代码报错），输出问题详细信息到ERRORS.md 文件，并尝试解决该问题，如解决不了。将问题输出详细错误信息后停止，等待进一步指令。
5. 当接收到指令格式为“active 文档名”时，在以下目录查找同名 Markdown 文档：

```text
C:\Users\Jie\iCloudDrive\iCloud~md~obsidian\SecondBrain\project\Monokai Syntax\Active
```

6. 若找到同名文档，将该文档内容读取、整理并整合到当前仓库的 `TODO.md` 中；整合时保留现有 TODO 内容，不得删除未完成任务。
7. 若未找到同名文档，或出现多个可能匹配项，应将详细问题写入 `ERRORS.md`，并停止等待进一步指令。
