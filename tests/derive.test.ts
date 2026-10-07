import { describe, expect, it } from 'vitest';
import { sumStats } from '../src/lib/derive';
import { units } from '../src/data/units';
import { unit } from '../src/data/unit-io';

describe('sumStats and registry', () => {
  it('sums reference rows', () => { expect(sumStats([])).toBe(0); expect(sumStats(units.io.stats)).toBe(325); expect(sumStats(units.io.initialStats.stats)).toBe(128); });
  it('keeps stored totals and registry identity aligned', () => { expect(units.io.total).toBe(sumStats(units.io.stats)); expect(units.io.initialStats.total).toBe(sumStats(units.io.initialStats.stats)); expect(units.io).toBe(unit); expect(Object.keys(units)).toEqual(['io']); const keys = units.io.stats.map((stat) => stat.key); expect(new Set(keys).size).toBe(9); expect(keys).toHaveLength(9); });
});
