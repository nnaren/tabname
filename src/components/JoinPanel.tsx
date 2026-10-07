import { useId } from 'react';
import styles from './join.module.css';

export function JoinPanel({ text }: { text: string }) {
  const headingId = useId();
  return <section className={styles.section} aria-labelledby={headingId}><h2 id={headingId}>加入</h2><div className={styles.content}><span className={styles.pill}>加入</span><span>{text}</span></div></section>;
}
