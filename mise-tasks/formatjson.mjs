#!/usr/bin/env bun
// [MISE] description="格式化软件 manifest"
// [MISE] raw=true
// [USAGE] arg "[app]" help="软件名（不含 .json）；省略时交互选择，* 表示全部软件"
// [USAGE] flag "--complete-apps" hide=#true help="输出软件名供 shell 补全"
// [USAGE] complete "app" run="mise run --quiet formatjson --complete-apps"

import { runBucketTask } from './lib/mise-task.mjs';

await runBucketTask({ id: 'formatjson', title: '格式化', script: 'formatjson' });
