# AGENTS

## Git 提交

- 任何涉及生成、建议、校验或执行 Git 提交的任务，都必须先调用 `scoop-commit` 技能，并遵循 `.agents/skills/scoop-commit/SKILL.md` 中的完整规则。
- 存在已暂存变更时，只根据已暂存内容生成提交消息；没有已暂存变更时，再检查工作区和未跟踪文件。
- 使用 `scoop-commit` 根据实际 diff 生成的 Scoop Bucket 风格主题，不要自行改写为 Conventional Commits 格式。
- 每个提交只包含一个 manifest 或一个独立维护事项；存在无关改动时，先建议拆分提交。
- 除非用户明确要求执行提交，否则只生成提交消息，不要运行 `git commit`。

