import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { expect, it } from 'vitest';

const root = process.cwd();
const src = resolve(root, 'src');
const walkCss = (directory: string): string[] => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const path = resolve(directory, entry.name);
  return entry.isDirectory() ? walkCss(path) : entry.name.endsWith('.css') ? [path] : [];
});
const cssFiles = walkCss(src);
const css = cssFiles.map((path) => readFileSync(path, 'utf8')).join('\n');
const tokens = readFileSync(resolve(root, 'src/styles/tokens.css'), 'utf8');
const prd = readFileSync(resolve(root, '.omx/plans/prd-unit-detail-page-react.md'), 'utf8');
const inventory = prd.slice(prd.indexOf('### 6.1'), prd.indexOf('### 6.2'));

it('keeps decorative ink out of every text color declaration', () => {
  for (const block of css.split('}')) {
    if (block.includes('var(--ink-deco)')) expect(block).not.toMatch(/\bcolor\s*:/);
  }
});

it('assigns every text ink token to the approved element inventory', () => {
  const inkTokens = [...tokens.matchAll(/--(?:ink|route-link|accent-blue-ink|pill-ink|pill-gold-ink|marker-flag)[\w-]*/g)]
    .map((match) => match[0]).filter((name, index, all) => all.indexOf(name) === index && name !== '--ink-deco');
  for (const token of inkTokens) expect(inventory, token).toContain(token);
});

it('uses only approved ink and surface pairs in colocated CSS rules', () => {
  const allowed: Record<string, string[]> = {
    '--bg-page': ['--ink-action-gold', '--ink-lv-marker', '--ink-muted', '--ink-primary'],
    '--surface-card': ['--ink-annot-green', '--ink-annot-red', '--ink-muted', '--ink-primary', '--ink-stat-initial', '--marker-flag', '--route-link-1', '--route-link-2'],
    '--surface-total': ['--ink-total'], '--surface-chip-lv': ['--ink-chip-lv'], '--surface-badge': ['--ink-badge-gold'],
    '--accent-gold': ['--pill-gold-ink'], '--accent-blue-bg': ['--accent-blue-ink'], '--pill-dark': ['--pill-ink'], '--help-badge': ['--pill-gold-ink'],
  };
  for (const block of css.split('}')) {
    const surface = block.match(/(?:background|background-color)\s*:\s*var\((--[\w-]+)\)/)?.[1];
    const ink = block.match(/\bcolor\s*:\s*var\((--[\w-]+)\)/)?.[1];
    if (surface && ink && ink !== '--ink-deco') expect(allowed[surface] ?? [], `${surface} + ${ink}`).toContain(ink);
  }
});

it('keeps the wordmark decorative and the specialized inks live', () => {
  const header = readFileSync(resolve(root, 'src/components/UnitHeader.tsx'), 'utf8');
  const headerCss = readFileSync(resolve(root, 'src/components/unitHeader.module.css'), 'utf8');
  expect(header).toMatch(/role="presentation"[\s\S]*aria-hidden="true"/);
  expect(header).not.toMatch(/<text\b/);
  expect(headerCss).not.toMatch(/\.wordmark[\s\S]*color\s*:/);
  expect(css).toContain('--ink-total'); expect(css).toContain('--ink-chip-lv');
  expect(css.match(/var\(--ink-total\)/g)?.length ?? 0).toBeGreaterThan(0);
  expect(css.match(/var\(--ink-chip-lv\)/g)?.length ?? 0).toBeGreaterThan(0);
});

it('keeps the responsive bands explicit and overflow-safe', () => {
  const app = readFileSync(resolve(root, 'src/app.module.css'), 'utf8');
  const grid = readFileSync(resolve(root, 'src/components/statGrid.module.css'), 'utf8');
  expect(grid).toMatch(/min-width:\s*1440px[\s\S]*max-width:\s*1973px/);
  expect(grid).toMatch(/max-width:\s*1439px[\s\S]*repeat\(6,\s*minmax\(0,\s*1fr\)\)/);
  expect(app).toMatch(/max-width:\s*1023px[\s\S]*grid-template-columns:\s*1fr/);
});
