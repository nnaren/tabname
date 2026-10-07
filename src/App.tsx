import { useRef } from 'react';
import type { Unit } from './types';
import { UnitHeader } from './components/UnitHeader';
import { StatGrid } from './components/StatGrid';
import { SkillSection } from './components/SkillSection';
import { InitialStatsRow } from './components/InitialStatsRow';
import { LearnablePanel } from './components/LearnablePanel';
import { PromotionRoute } from './components/PromotionRoute';
import { PortraitCard } from './components/PortraitCard';
import { JoinPanel } from './components/JoinPanel';
import { RecruitmentTable } from './components/RecruitmentTable';
import styles from './app.module.css';

export default function App({ unit }: { unit: Unit }) {
  const appRootRef = useRef<HTMLDivElement>(null);
  return <div ref={appRootRef} className={styles.app} data-app-shell>
    <UnitHeader unit={unit} />
    <div className={styles.heroGrid}>
      <main className={styles.content}>
        <StatGrid stats={unit.stats} total={unit.total} label={unit.growthColumnLabel} />
        <SkillSection signatureSkills={unit.signatureSkills} personalSkills={unit.personalSkills} levelPrivileges={unit.levelPrivileges} />
        <InitialStatsRow initialStats={unit.initialStats} />
        <LearnablePanel learnable={unit.learnable} />
        <PromotionRoute tiers={unit.promotion} appRootRef={appRootRef} />
        <JoinPanel text={unit.joinText} />
      </main>
      <div className={styles.portraitWrap}><PortraitCard art={unit.art} /></div>
    </div>
    <RecruitmentTable unitName={unit.name} rows={unit.recruitment} />
  </div>;
}
