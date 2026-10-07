export type UnitId = string;
export type RouteHue = 'routeOne' | 'routeTwo';

export type StatKey = 'hp' | 'might' | 'magic' | 'speed' | 'skill' | 'defense' | 'resistance' | 'luck' | 'charm';

export interface StatBlock {
  key: StatKey;
  label: string;
  value: number;
}

export interface Skill {
  id: string;
  name: string;
  classTag?: string;
  effect: string;
  unlockedAt?: number;
  variant?: 'plus';
}

export interface LearnableGroup {
  kind: 'combat' | 'magic' | 'talent';
  label: string;
  count: number;
  entries: { name: string; unlockedAt: number }[];
}

export interface PromotionTier {
  rank: string;
  className: string;
}

interface RecruitmentRowBase {
  route: string;
  hue: RouteHue;
  reputationLevel?: number;
  supportLevel?: number;
  negotiation: string;
  negotiationBadge: string;
  negotiationDetail: string;
  detailTone: 'red' | 'green' | 'neutral';
  availability: string;
}

export type RecruitmentRow =
  | (RecruitmentRowBase & { marker: 'flag'; markerColor: 'flag' })
  | (RecruitmentRowBase & { marker: 'dot'; markerColor: 'green' });

export interface Unit {
  id: UnitId;
  name: string;
  gender: '男' | '女';
  className: string;
  growthColumnLabel: string;
  stats: StatBlock[];
  total: number;
  signatureSkills: string[];
  personalSkills: Skill[];
  levelPrivileges: Skill[];
  initialStats: { label: string; level: number; stats: StatBlock[]; total: number };
  learnable: { combat: number; magic: number; talent: number; detail: LearnableGroup[] };
  promotion: PromotionTier[];
  joinText: string;
  art: { src: string | null; alt: string };
  recruitment: RecruitmentRow[];
}
