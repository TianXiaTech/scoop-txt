---
name: scoop-commit
description: 检查 Git 暂存区或工作区变更，并按 ScoopInstaller Bucket 贡献约定生成简洁的提交消息。用户要求为 Scoop manifest 或 bucket 工具的新建、升级、修复、移动、弃用、删除等改动编写、建议或校验 Git commit message 时使用。
---

# 生成 Scoop 提交消息

检查真实的 Git 变更，生成符合 Scoop Bucket 约定的提交主题。将 Scoop 官方推荐的拉取请求标题格式同时用于 Git 提交主题。

## 检查变更

1. 运行 `git status --short`。
2. 检查 `git diff --cached --name-status` 和 `git diff --cached`。存在已暂存内容时，只根据已暂存变更生成消息。
3. 没有已暂存内容时，检查 `git diff --name-status`、`git diff` 以及相关未跟踪文件的内容。
4. 修改现有 manifest 时，如果 diff 没有清楚展示旧版本或改动意图，使用 `git show HEAD:<path>` 对比提交前内容。
5. 从 manifest 文件名中移除 `.json` 得到应用名，并保留原始大小写。从 `version` 字段读取版本号；存在该字段时，不要从 URL 推测版本号。
6. 识别改动中最小且完整的目的。除非用户明确要求，否则不要修改文件、暂存变更或创建提交。

## 选择消息格式

按以下顺序选择格式：

| 变更类型 | 提交主题 |
| --- | --- |
| 新增 manifest | `<app>: Add version <version>` |
| 修改现有 manifest，但没有升级版本 | `<app>@<version>: <简短说明>` |
| 将现有 manifest 升级到新版本 | `<app>: Update to version <新版本>` |
| 仓库级或工具维护 | `(chore): <简短说明>` |

修改 manifest 时使用当前版本，删除 manifest 时使用最后一次提交中的版本。非版本变更使用简短、明确的英文祈使短语，例如 `Fix hash`、`Fix download URL`、`Update checkver`、`Add arm64 support`、`Move to deprecated` 或 `Remove manifest`。提交消息本身保留 Scoop 官方约定使用的英文措辞。

版本升级同时包含有意义的人工修改时，在版本后追加说明，例如 `foo: Update to version 2.0.0, fix autoupdate URL`。忽略仅因升级版本而产生的常规 URL 和 hash 变化。

只有无法用单个 manifest 名称准确界定范围时才使用 `(chore)`。manifest 变更不要使用 `feat:`、`fix:` 等 Conventional Commit 前缀。

## 处理多项变更

每个提交只包含一个 manifest 或一个维护事项。如果变更包含互不相关的 manifest 或目的，为每个原子提交分别生成一条消息，并简要建议拆分提交。不要用模糊的综合主题隐藏无关改动。

## 输出

默认只返回提交主题本身，不要添加代码块、`git commit -m`、正文或解释。只有用户要求或上下文确实需要时，才补充正文或 issue 引用。

示例：

- `open-design: Add version 0.17.0`
- `orca: Update to version 1.4.176`
- `Noi@0.3.0: Fix hash`
- `(chore): Update manifest tests`

规则依据 ScoopInstaller 贡献指南：<https://github.com/ScoopInstaller/.github/blob/main/.github/CONTRIBUTING.md#for-scoop-buckets>。
