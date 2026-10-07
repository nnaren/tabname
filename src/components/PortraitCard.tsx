import { useState } from 'react';
import type { Unit } from '../types';
import styles from './portrait.module.css';
import { UnitPlaceholder } from './UnitPlaceholder';

export function PortraitCard({ art }: { art: Unit['art'] }) {
  const [failed, setFailed] = useState(false);
  return <aside className={styles.card} aria-label="单位肖像">
    {art.src && !failed ? <img src={art.src} alt={art.alt} onError={() => setFailed(true)} /> : <UnitPlaceholder alt={art.alt} />}
    <span className={styles.badge}>↗</span>
  </aside>;
}
