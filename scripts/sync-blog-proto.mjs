#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const defaultPosts = resolve(scriptDir, '..', '..', 'posts');
const defaultRoot = resolve(scriptDir, '..');

const postsRoot = resolve(process.argv[2] || process.env.POSTS_ROOT || defaultPosts);
const projectRoot = resolve(process.argv[3] || process.env.SPENCER_TING_ROOT || defaultRoot);

const src = join(postsRoot, 'proto', 'blog', 'v1', 'blog.proto');
const dest = join(projectRoot, 'proto', 'blog', 'v1', 'blog.proto');

let content = readFileSync(src, 'utf8');
content = content.replace(
  /option go_package = "[^"]+";/,
  'option go_package = "github.com/emersonary/spencer-ting/api/gen/blog/v1;blogv1";',
);

mkdirSync(dirname(dest), { recursive: true });
writeFileSync(dest, content, 'utf8');

console.log(`Synced ${src}`);
console.log(`     → ${dest}`);
