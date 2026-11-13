import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const account = 'UMAProjectEJL';
const repository = 'violeta-anit-portfolio';
const basePath = `/${repository}`;
const siteUrl = `https://${account.toLowerCase()}.github.io/${repository}`;
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = path.join(projectRoot, 'out');

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    stdio: 'inherit',
    shell: command.endsWith('.cmd'),
    ...options
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} terminó con código ${result.status ?? 'desconocido'}.`);
}

const buildEnvironment = {
  ...process.env,
  NEXT_PUBLIC_BASE_PATH: basePath,
  NEXT_PUBLIC_SITE_URL: siteUrl
};

run(process.execPath, [path.join(projectRoot, 'node_modules', 'next', 'dist', 'bin', 'next'), 'build'], { env: buildEnvironment });
if (!fs.existsSync(path.join(outputDirectory, 'index.html'))) {
  throw new Error('La compilación no generó out/index.html.');
}

const deploymentDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'portfolio-anit-pages-'));
try {
  fs.cpSync(outputDirectory, deploymentDirectory, { recursive: true });
  run('git', ['init', '--initial-branch=gh-pages', deploymentDirectory]);
  run('git', ['-C', deploymentDirectory, 'add', '-A']);
  run('git', ['-C', deploymentDirectory, 'commit', '-m', 'Publish static portfolio']);
  run('git', ['-C', deploymentDirectory, 'remote', 'add', 'origin', `https://github.com/${account}/${repository}.git`]);
  run('git', ['-C', deploymentDirectory, 'push', '--force', 'origin', 'gh-pages']);
  process.stdout.write(`\nArchivos publicados en ${siteUrl}\n`);
} finally {
  fs.rmSync(deploymentDirectory, { recursive: true, force: true });
}
