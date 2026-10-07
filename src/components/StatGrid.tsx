import type { StatBlock } from '../types';
import { HelpAffordance } from './HelpAffordance';
import styles from './statGrid.module.css';

export function StatGrid({ stats, total, label, initial = false }: { stats: StatBlock[]; total: number; label: string; initial?: boolean }) {
  return <div className={`${styles.grid} ${initial ? styles.initial : ''}`}>
    <div className={styles.growth}><span>{label.split('').map((char) => <span key={char}>{char}</span>)}</span><HelpAffordance label={`${label}说明`} text={initial ? '角色加入时的初始能力值。' : '各项能力的成长倾向。'} /></div>
    {stats.map((stat) => <div className={styles.cell} key={stat.key}><span className={styles.label}>{stat.label}</span><strong className={initial ? styles.initialValue : ''}>{stat.value}</strong></div>)}
    <div className={`${styles.cell} ${styles.total}`}><span className={styles.label}>合计</span><strong>{total}</strong></div>
  </div>;
}
