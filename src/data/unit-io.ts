import type { Unit } from '../types';

const stat = (key: Unit['stats'][number]['key'], label: string, value: number) => ({ key, label, value });

export const unit: Unit = {
  // TRANSCRIBED: identity and class labels from the reference.
  id: 'io',
  name: '伊欧',
  gender: '男',
  className: '初始·轻骑兵',
  growthColumnLabel: '成长率',
  // TRANSCRIBED: nine growth values and their total.
  stats: [
    stat('hp', 'HP', 45), stat('might', '力量', 40), stat('magic', '魔力', 25),
    stat('speed', '速度', 35), stat('skill', '技巧', 45), stat('defense', '防守', 40),
    stat('resistance', '魔防', 25), stat('luck', '幸运', 35), stat('charm', '魅力', 35),
  ],
  total: 325,
  // TRANSCRIBED: signature and personal skills.
  signatureSkills: ['枪术', '斧术', '马术'],
  personalSkills: [{ id: 'horse-link', name: '与爱马连接', classTag: '骑兵', effect: '先攻战斗时，防御力+3，必杀回避+30' }],
  // TRANSCRIBED: privilege rows, including the intentional missing Lv marker on row 2.
  levelPrivileges: [
    { id: 'mounted-assault-plus', name: '骑乘突击+', variant: 'plus', unlockedAt: 35, classTag: '骑兵', effect: '先攻战斗时，命中+10，攻击力+3' },
    { id: 'mounted-assault', name: '骑乘突击', effect: '先攻战斗时，命中+10' },
  ],
  // TRANSCRIBED: join level and initial values.
  initialStats: {
    label: '初始值', level: 20,
    stats: [
      stat('hp', 'HP', 35), stat('might', '力量', 16), stat('magic', '魔力', 7), stat('speed', '速度', 10),
      stat('skill', '技巧', 14), stat('defense', '防守', 14), stat('resistance', '魔防', 8), stat('luck', '幸运', 13), stat('charm', '魅力', 11),
    ],
    total: 128,
  },
  // TRANSCRIBED: counts; INVENTED placeholder: expanded acquisition entries.
  learnable: {
    combat: 5, magic: 8, talent: 5,
    detail: [
      { kind: 'combat', label: '战技', count: 5, entries: [{ name: '迅捷突刺', unlockedAt: 5 }, { name: '连环枪', unlockedAt: 12 }] },
      { kind: 'magic', label: '魔法', count: 8, entries: [{ name: '风刃', unlockedAt: 8 }, { name: '疾风', unlockedAt: 18 }] },
      { kind: 'talent', label: '特技', count: 5, entries: [{ name: '骑术精通', unlockedAt: 10 }, { name: '突击架势', unlockedAt: 25 }] },
    ],
  },
  // TRANSCRIBED: promotion route.
  promotion: [
    { rank: '中级', className: '轻骑兵' },
    { rank: '上级', className: '荣光骑士' },
    { rank: '最上级', className: '奥利哈铁骑' },
  ],
  // TRANSCRIBED: recruitment summary text.
  joinText: '第1部通过招募（名声等级、支援等级、外传等条件）加入。',
  // PLACEHOLDER: licensed portrait can be supplied through art.src; SVG fallback is intentional.
  art: { src: null, alt: '伊欧的单位立绘占位图' },
  // TRANSCRIBED: two visible rows only; the capture truncates the next row.
  recruitment: [
    { route: '凯伊德', hue: 'routeOne', marker: 'flag', markerColor: 'flag', reputationLevel: 10, supportLevel: 3, negotiation: '交涉时付 4000G', negotiationBadge: '中', negotiationDetail: '迪托利希篇名声 LV3 就能挖', detailTone: 'red', availability: '1部3章 · 2月出现' },
    { route: '迪托利希篇', hue: 'routeTwo', marker: 'dot', markerColor: 'green', reputationLevel: 3, supportLevel: 2, negotiation: '交涉时付 800G', negotiationBadge: '中', negotiationDetail: '四篇里本篇门槛最低', detailTone: 'green', availability: '1部4章 · 3月出现' },
  ],
};
