#!/usr/bin/env node
// Prints inline SVG groups for Lucide icons, for a blueprint sheet.
// Usage: node lucide-icon.mjs <name>:<centerX>:<topY>:<size> [...]
// Example: node lucide-icon.mjs file-text:160:96:14 database:1065:242:11

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const LUCIDE_GRID = 24;
const ICON_DIR_PARTS = ['node_modules', 'lucide-react', 'dist', 'esm', 'icons'];
const NODE_LIST_START = 'const __iconNode = ';
const STATIC_ICON_URL = 'https://unpkg.com/lucide-static/icons';
const USAGE = 'Usage: node lucide-icon.mjs <name>:<centerX>:<topY>:<size> [...]';

function findIconDirFrom(start) {
  let dir = start;
  while (true) {
    const candidate = path.join(dir, ...ICON_DIR_PARTS);
    if (existsSync(candidate)) return candidate;
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

// Returns null when no project around the working directory or the script has lucide-react.
function findIconDir() {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  return findIconDirFrom(process.cwd()) ?? findIconDirFrom(scriptDir);
}

function readIconNodes(iconDir, name) {
  const file = path.join(iconDir, `${name}.js`);
  if (!existsSync(file)) throw new Error(`Lucide has no icon "${name}". Look in ${iconDir}.`);
  const source = readFileSync(file, 'utf8');
  const start = source.indexOf(NODE_LIST_START) + NODE_LIST_START.length;
  const end = source.indexOf('];', start) + 1;
  // The list is a JavaScript literal with bare keys; quote the keys to read it as JSON.
  return JSON.parse(source.slice(start, end).replace(/([{,]\s*)(\w+):/g, '$1"$2":'));
}

function renderShape([tag, attributes]) {
  const text = Object.entries(attributes)
    .filter(([key]) => key !== 'key')
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');
  return `<${tag} ${text}/>`;
}

async function fetchIconShapes(name) {
  const response = await fetch(`${STATIC_ICON_URL}/${name}.svg`);
  if (response.status === 404) throw new Error(`Lucide has no icon "${name}". Look at lucide.dev/icons.`);
  if (!response.ok) throw new Error(`Cannot get the icon "${name}": HTTP ${response.status}.`);
  const svg = await response.text();
  return svg.slice(svg.indexOf('>', svg.indexOf('<svg')) + 1, svg.lastIndexOf('</svg>')).replace(/\s*\n\s*/g, '');
}

async function readIconShapes(iconDir, name) {
  if (!iconDir) return fetchIconShapes(name);
  return readIconNodes(iconDir, name).map(renderShape).join('');
}

async function renderIcon(iconDir, placement) {
  const [name, centerX, topY, size] = placement.split(':');
  const numbers = [centerX, topY, size].map(Number);
  if (!name || numbers.some(Number.isNaN))
    throw new Error(`Incorrect placement "${placement}". ${USAGE}`);
  const [cx, top, px] = numbers;
  const scale = Number((px / LUCIDE_GRID).toFixed(4));
  const shapes = await readIconShapes(iconDir, name);
  return `<g class="ic" transform="translate(${cx - px / 2},${top}) scale(${scale})">${shapes}</g>`;
}

const placements = process.argv.slice(2);
if (placements.length === 0) {
  console.error(USAGE);
  process.exit(1);
}

try {
  const iconDir = findIconDir();
  const icons = await Promise.all(placements.map((placement) => renderIcon(iconDir, placement)));
  console.log(icons.join('\n'));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
