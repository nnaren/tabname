import { useId } from 'react';
import type { Skill } from '../types';
import styles from './skillSection.module.css';

function SkillRow({ skill, privilege = false }: { skill: Skill; privilege?: boolean }) {
  return <div className={styles.skillRow}>
    <span className={privilege ? styles.privilege : styles.personal}>{privilege ? 'Lv特技' : '个人特技'}</span>
    <span className={styles.skillName}>【{skill.name}】</span>
    {skill.unlockedAt !== undefined && <span className={styles.level}>Lv{skill.unlockedAt}</span>}
    {skill.classTag && <span className={styles.classTag}>【{skill.classTag}】</span>}
    <span className={styles.effect}>{skill.effect}</span>
  </div>;
}

export function SkillSection({ signatureSkills, personalSkills, levelPrivileges }: { signatureSkills: string[]; personalSkills: Skill[]; levelPrivileges: Skill[] }) {
  const headingId = useId();
  return <section className={styles.section} aria-labelledby={headingId}>
    <h2 id={headingId}>得意技能 <span className={styles.chips}>{signatureSkills.map((skill) => <span className={styles.chip} key={skill}>{skill}</span>)}</span></h2>
    {personalSkills.map((skill) => <SkillRow key={skill.id} skill={skill} />)}
    {levelPrivileges.map((skill) => <SkillRow key={skill.id} skill={skill} privilege />)}
  </section>;
}
