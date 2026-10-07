import type { Unit } from '../types';
import styles from './unitHeader.module.css';

export function UnitHeader({ unit }: { unit: Unit }) {
  return <header className={styles.header}>
    <div className={styles.identity}>
      <h1>{unit.name}</h1>
      <span className={styles.gender}>{unit.gender}</span>
      <span className={styles.classPill}>{unit.className}</span>
    </div>
    <svg className={styles.wordmark} viewBox="0 0 240 32" role="presentation" aria-hidden="true">
      <path fill="var(--ink-deco)" d="M2 7h36v3H2zm0 8h54v3H2zm0 8h42v3H2zM68 7h28v3H68zm0 8h42v3H68zm0 8h24v3H68zM124 7h50v3h-50zm0 8h34v3h-34zm0 8h46v3h-46zM188 7h46v3h-46zm0 8h30v3h-30zm0 8h40v3h-40z" />
    </svg>
  </header>;
}
