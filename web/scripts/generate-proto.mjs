import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = resolve(root, '..');
const protoDir = process.env.POSTS_PROTO_DIR
  ? resolve(process.env.POSTS_PROTO_DIR)
  : join(repoRoot, 'proto');
const outDir = join(root, 'src', 'gen');
mkdirSync(outDir, { recursive: true });
const bin = join(root, 'node_modules', '.bin');

function plugin(name) {
  const win = process.platform === 'win32';
  const cmd = join(bin, win ? `${name}.cmd` : name);
  const sh = join(bin, name);
  return existsSync(cmd) ? cmd : sh;
}

const protoFiles = [
  join(protoDir, 'account', 'v1', 'account.proto'),
  join(protoDir, 'property', 'v1', 'property.proto'),
  join(protoDir, 'blog', 'v1', 'blog.proto'),
].filter(existsSync);

execFileSync(
  'protoc',
  [
    '-I',
    protoDir,
    `--plugin=protoc-gen-es=${plugin('protoc-gen-es')}`,
    `--plugin=protoc-gen-connect-es=${plugin('protoc-gen-connect-es')}`,
    `--es_out=${outDir}`,
    '--es_opt=target=ts',
    `--connect-es_out=${outDir}`,
    '--connect-es_opt=target=ts',
    ...protoFiles,
  ],
  { stdio: 'inherit' },
);

console.log('Generated TypeScript into web/src/gen/');
