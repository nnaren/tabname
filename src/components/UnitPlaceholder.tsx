import { useId } from 'react';
import styles from './portrait.module.css';

export function UnitPlaceholder({ alt }: { alt: string }) {
  const gradientId = `portrait-gradient-${useId().replaceAll(':', '')}`;
  return <svg className={styles.placeholder} viewBox="0 0 492 472" role="img" aria-label={alt}>
    <defs><linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="var(--portrait-from)"/><stop offset=".55" stopColor="var(--portrait-mid)"/><stop offset="1" stopColor="var(--portrait-to)"/></linearGradient></defs>
    <rect width="492" height="472" rx="14" fill={`url(#${gradientId})`} />
    <g opacity=".18" fill="none" stroke="var(--portrait-hilite)" strokeWidth="2"><circle cx="76" cy="78" r="52"/><path d="M24 78h104M76 26v104M376 40l72 72m-72 0 72-72"/><path d="M350 74h104v104H350z"/></g>
    <path fill="#635c80" d="M150 470V302c0-58 35-104 96-104 63 0 98 44 98 104v168z"/><path fill="#efc0ab" d="M225 116c0-43 71-53 98-8 10 17 8 73-7 94-13 19-41 29-67 16-24-12-24-49-24-102z"/><path fill="#51486d" d="M218 127c-13-52 26-89 76-80 45 8 63 45 43 79l-29-21-21 27-29-17-31 24z"/><path fill="#226a65" d="M142 470l19-143 64 31 22 112zm245 0-20-142-62 29-20 113z"/><path fill="#d8ad88" d="M224 226l29 24 42-25-11 48-27 14-33-18z" opacity=".8"/><path fill="#efc0ab" d="M181 280c26 6 42 19 51 39l-20 18-45-29zm195 0c-25 7-40 20-50 39l22 17 43-28z"/><path fill="#9a7c51" d="M132 437h88v20h-88zm150 0h88v20h-88z" opacity=".55"/>
    <text x="28" y="36" fill="var(--ink-deco)" opacity=".8" fontSize="12">PORTRAIT PLACEHOLDER</text>
  </svg>;
}
