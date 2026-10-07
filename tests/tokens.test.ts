import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, it } from 'vitest';

const root = process.cwd();
const css = readFileSync(resolve(root, 'src/styles/tokens.css'), 'utf8');
const prd = readFileSync(resolve(root, '.omx/plans/prd-unit-detail-page-react.md'), 'utf8');
const evidence = readFileSync(resolve(root, '.omx/context/design-token-samples.md'), 'utf8');
const tokenBlockStart = prd.indexOf('```css', prd.indexOf('## 5.'));
const tokenBlock = prd.slice(tokenBlockStart, prd.indexOf('```', tokenBlockStart + 6));

const hex = (value: string) => {
  const normalized = value.trim().toLowerCase();
  return normalized.length === 4 ? `#${normalized.slice(1).split('').map((char) => char + char).join('')}` : normalized;
};

const declarations = Object.fromEntries([...css.matchAll(/--([\w-]+)\s*:\s*([^;]+)/g)].map((match) => [`--${match[1]}`, match[2].trim()]));
const shippedHexes = Object.fromEntries([...tokenBlock.matchAll(/--([\w-]+)\s*:\s*(#[0-9a-f]{3,6})/gi)].map((match) => [`--${match[1]}`, hex(match[2])]));
const evidenceTokens = [...evidence.matchAll(/\|\s*`(--[\w-]+)`\s*\|/g)].map((match) => match[1]);

it('matches every declared hex token to the shipped PRD values', () => {
  for (const [name, value] of Object.entries(declarations)) {
    if (!value.startsWith('#')) continue;
    expect(hex(value), name).toBe(shippedHexes[name]);
  }
});

it('keeps every measured evidence token represented or explicitly collapsed', () => {
  const collapsed = ['--surface-chip', '--accent-red', '--accent-green', '--ink-faint'];
  for (const name of evidenceTokens) expect(declarations[name] || collapsed.includes(name), name).toBeTruthy();
});

it('keeps retired aliases absent', () => {
  expect(css).not.toMatch(/--pill-gold\s*:/);
  expect(css).not.toMatch(/--surface-chip\s*:/);
  expect(css).not.toMatch(/--accent-red\s*:/);
  expect(css).not.toMatch(/--accent-green\s*:/);
});
