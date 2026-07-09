#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const defaultViaJeri = resolve(scriptDir, '..', '..', 'via-jeri');
const defaultRoot = resolve(scriptDir, '..');

const viaJeriRoot = resolve(process.argv[2] || process.env.VIA_JERI_ROOT || defaultViaJeri);
const projectRoot = resolve(process.argv[3] || process.env.SPENCER_TING_ROOT || defaultRoot);

const src = join(viaJeriRoot, 'appkit', 'blocks', 'account', 'proto', 'v1', 'account.proto');
const dest = join(projectRoot, 'proto', 'account', 'v1', 'account.proto');

const content = readFileSync(src, 'utf8');
mkdirSync(dirname(dest), { recursive: true });
writeFileSync(dest, content, 'utf8');

console.log(`Synced ${src}`);
console.log(`     → ${dest}`);
