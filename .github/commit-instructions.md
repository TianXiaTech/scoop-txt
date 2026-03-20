# Git Commit Instructions

## Core Rules

1. 只输出一条完整的 Commit Message
2. Header 使用 Conventional Commits 格式：`<scope>: <subject>`

## Stable Output Contract

```text
<scope>: <subject>

[BREAKING CHANGE: <description>]
[Closes #<issue-number>]
```

## Header Rules

### Scope

`scope` 应始终以文件名小写格式（不带扩展名）为准，例如 `openai-translator`，如果改动涉及多个 bucket，则以列表形式罗列

### Subject

当 `<scope>` 从 `bucket` renamed 到 `deprecated` 时，`subject` 应该使用 `deprecate` 作为动词，表明弃用，并携带弃用原因

`subject` 必须满足以下要求：

- 使用英文祈使句
- 以动词原形开头，如 `add`、`fix`、`update`、`simplify`
- 首字母小写，专有名词除外
- 不以句号结尾
- 不使用过去式或进行时
- 尽量控制在 50 个字符以内，Header 总长度不超过 72 个字符

推荐写法：

- `noi: update to version 1.1.0`
- `noi: fix download url and hash`
- `noi: deprecate and recommend use winget instead`

### Stable docs example

```text
noi: update to version 1.1.0
```

```text
noi: update to version 1.1.0
mgtv: update to version 2.3.4
openai-translator: deprecated
```
