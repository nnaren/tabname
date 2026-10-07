import { useId, useState } from 'react';
import styles from './common.module.css';

interface Props { label: string; text: string; }

export function HelpAffordance({ label, text }: Props) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return <span className={styles.helpWrap}>
    <button className={styles.helpButton} type="button" aria-label={label} aria-expanded={open} aria-describedby={id} onClick={() => setOpen((value) => !value)}>?</button>
    <span id={id} role="tooltip" className={`${styles.tooltip} ${open ? styles.tooltipOpen : ''}`} hidden={!open}>{text}</span>
  </span>;
}
