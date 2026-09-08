import { spawn } from 'node:child_process';
import { readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createWorkflowKit, defineStep, isPromptCancelledError } from 'clack-kit';

const root = fileURLToPath(new URL('../../', import.meta.url));

export async function runBucketTask({ id, title, script, update = false, history = false }) {
  try {
    const args = process.argv.slice(2);
    if (args.length === 1 && ['--help', '-h'].includes(args[0])) {
      console.log(`${title}\n用法：mise run ${id} [AppName]\n不传软件名时交互选择；传入 * 时处理全部软件。`);
      return;
    }
    const completing = process.env.usage_complete_apps === 'true' ||
      (args.length === 1 && args[0] === '--complete-apps');
    if (!completing && (args.length > 1 || args[0]?.startsWith('-'))) {
      throw new Error(`用法：mise run ${id} [AppName]`);
    }

    const apps = (await readdir(new URL('../../bucket/', import.meta.url), { withFileTypes: true }))
      .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
      .map((entry) => entry.name.slice(0, -5))
      .sort();
    if (completing) {
      console.log([...apps, '*'].join('\n'));
      return;
    }
    if (apps.length === 0) throw new Error('bucket 目录中没有 manifest。');
    const app = process.env.usage_app || args[0];
    if (app !== undefined && app !== '*' && !apps.includes(app)) {
      throw new Error(`软件不存在：${app}，请使用 bucket 中的文件名（不含 .json）。`);
    }
    if (app === undefined && !process.stdin.isTTY) {
      throw new Error('非交互环境请传入 AppName，或使用 * 处理全部软件。');
    }

    const kit = createWorkflowKit({
      id,
      cwd: root,
      asciiArt: false,
      history,
    });
    await kit.run({
      id,
      intro: title,
      steps: [
        defineStep.autocomplete({
          id: 'app',
          message: '选择软件（输入名称搜索）',
          options: [
            ...apps.map((value) => ({ value, label: value })),
            { value: '*', label: '全部软件' },
          ],
          maxItems: 10,
        }),
        defineStep.command({
          id: 'execute',
          title: ({ values }) => `${title}：${values.app}`,
          renderer: 'inherit',
          run: async ({ values }) => {
            const scriptPath = fileURLToPath(new URL(`../../bin/${script}.ps1`, import.meta.url));
            const quote = (value) => `'${value.replaceAll("'", "''")}'`;
            // Scoop wrappers may leave LASTEXITCODE set without exiting PowerShell.
            const command = `$ErrorActionPreference = 'Stop'; & ${quote(scriptPath)} ${update ? '-u ' : ''}-App ${quote(values.app)}; if (-not $?) { exit 1 }; if ($null -ne $LASTEXITCODE) { exit $LASTEXITCODE }`;
            const commandArgs = [
              '-NoLogo', '-NoProfile', '-NonInteractive', '-OutputFormat', 'Text',
              '-ExecutionPolicy', 'Bypass',
              '-EncodedCommand', Buffer.from(command, 'utf16le').toString('base64'),
            ];
            await new Promise((resolve, reject) => {
              const child = spawn('pwsh', commandArgs, { cwd: root, stdio: 'inherit', shell: false });
              child.once('error', (error) => reject(new Error(`无法启动 pwsh：${error.message}`)));
              child.once('close', (code, signal) => {
                if (code === 0) resolve();
                else {
                  process.exitCode = code > 0 && code < 256 ? code : 1;
                  reject(new Error(`${script}.ps1 执行失败（${signal ?? code}）。`));
                }
              });
            });
          },
        }),
      ],
    }, {
      initialValues: app === undefined ? {} : { app },
      locale: 'zh-CN',
      history: history ? { reuse: app === undefined ? 'ask' : 'off', saveSnapshot: true } : false,
    });
  } catch (error) {
    if (isPromptCancelledError(error)) {
      process.exitCode = 130;
      return;
    }
    console.error(error.message);
    process.exitCode ||= 1;
  }
}
