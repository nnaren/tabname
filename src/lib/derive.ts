import type { StatBlock } from '../types';

export function sumStats(stats: StatBlock[]): number {
  return stats.reduce((total, stat) => total + stat.value, 0);
}
