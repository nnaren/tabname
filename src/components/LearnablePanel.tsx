import { useId, useState } from 'react';
import type { Unit } from '../types';
import styles from './learnable.module.css';

export function LearnablePanel({ learnable }: { learnable: Unit['learnable'] }) {
  const [expanded, setExpanded] = useState(false);
  const id = useId();
  return <section className={styles.panel}>
    <button className={styles.trigger} type="button" aria-expanded={expanded} aria-controls={id} onClick={() => setExpanded((value) => !value)}>
      <span className={styles.pill}>可习得</span>
      <strong>战技 {learnable.combat} · 魔法 {learnable.magic} · 特技 {learnable.talent}</strong>
      <span className={styles.hint}>展开看每项的习得等级</span>
    </button>
    <div id={id} className={styles.details} hidden={!expanded}>
      {learnable.detail.map((group) => <div className={styles.detailGroup} key={group.kind}><b>{group.label}</b>{group.entries.map((entry) => <span key={entry.name}>{entry.name} · Lv{entry.unlockedAt}</span>)}</div>)}
    </div>
  </section>;
}
