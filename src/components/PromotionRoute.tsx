import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { PromotionTier } from '../types';
import styles from './promotion.module.css';

export function RouteCompareDialog({ open, tiers, onClose, triggerRef, appRoot }: { open: boolean; tiers: PromotionTier[]; onClose: () => void; triggerRef: React.RefObject<HTMLButtonElement | null>; appRoot: HTMLElement | null }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    appRoot?.setAttribute('inert', '');
    document.body.style.overflow = 'hidden';
    const initialFocusable = dialogRef.current?.querySelector<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    (initialFocusable ?? dialogRef.current)?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { onClose(); return; }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
      if (focusable.length === 0) { event.preventDefault(); dialogRef.current.focus(); return; }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (document.activeElement === dialogRef.current) { event.preventDefault(); (event.shiftKey ? last : first).focus(); }
      else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => { appRoot?.removeAttribute('inert'); document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', onKeyDown); triggerRef.current?.focus(); };
  }, [open, onClose, triggerRef, appRoot]);
  if (!open) return null;
  return createPortal(<div className={styles.overlay}><div className={styles.dialog} ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby={titleId}>
    <button type="button" className={styles.close} aria-label="关闭对比路线" onClick={onClose}>×</button>
    <h2 id={titleId}>对比路线</h2>
    <div className={styles.compare}>{tiers.map((tier) => <article key={tier.rank}><span>{tier.rank}</span><strong>{tier.className}</strong><p>推荐路线中的{tier.className}阶段</p></article>)}</div>
  </div></div>, document.body);
}

export function PromotionRoute({ tiers, appRootRef }: { tiers: PromotionTier[]; appRootRef?: React.RefObject<HTMLElement | null> }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingId = useId();
  const close = useCallback(() => setOpen(false), []);
  return <section ref={sectionRef} className={styles.section} aria-labelledby={headingId}>
    <div className={styles.routeLine}><h2 id={headingId}>推荐路线</h2><div className={styles.chain}>{tiers.map((tier, index) => <span className={styles.chainItem} key={tier.rank}><span>{tier.rank}</span> {tier.className}{index < tiers.length - 1 && <i>→</i>}</span>)}</div><button ref={triggerRef} type="button" className={styles.compareButton} onClick={() => setOpen(true)}>⇄ 对比路线</button></div>
    <RouteCompareDialog open={open} tiers={tiers} onClose={close} triggerRef={triggerRef} appRoot={appRootRef?.current ?? sectionRef.current?.closest<HTMLElement>('[data-app-shell]') ?? null} />
  </section>;
}
