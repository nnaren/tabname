import { useId } from 'react';
import type { Unit } from '../types';
import styles from './initialStats.module.css';
import { HelpAffordance } from './HelpAffordance';

export function InitialStatsRow({ initialStats }: { initialStats: Unit['initialStats'] }) {
  const headingId = useId();
  return <section className={styles.section} aria-labelledby={headingId}>
    <h2 id={headingId}>加入时初始能力 <span>（Lv{initialStats.level}）</span></h2>
    <div className={styles.row}>
      <span className={styles.initialChip}>{initialStats.label}<HelpAffordance label="初始值说明" text="角色加入时的能力值。" /></span>
      {initialStats.stats.map((stat) => <span className={styles.stat} key={stat.key}><span>{stat.label}</span><strong>{stat.value}</strong></span>)}
      <span className={styles.total}><span>合计</span><strong>{initialStats.total}</strong></span>
    </div>
  </section>;
}
