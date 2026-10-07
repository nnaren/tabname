import { expect, it } from 'vitest';
import { unit } from '../src/data/unit-io';

it('preserves the transcribed unit data and deliberate asymmetry', () => {
  expect(unit.name).toBe('伊欧'); expect(unit.gender).toBe('男'); expect(unit.className).toBe('初始·轻骑兵');
  expect(unit.signatureSkills).toEqual(['枪术', '斧术', '马术']);
  expect(unit.promotion).toEqual([{ rank: '中级', className: '轻骑兵' }, { rank: '上级', className: '荣光骑士' }, { rank: '最上级', className: '奥利哈铁骑' }]);
  expect(unit.levelPrivileges[0]).toMatchObject({ name: '骑乘突击+', unlockedAt: 35, classTag: '骑兵', effect: '先攻战斗时，命中+10，攻击力+3' });
  expect(unit.levelPrivileges[1]).toMatchObject({ name: '骑乘突击', effect: '先攻战斗时，命中+10' }); expect(unit.levelPrivileges[1].unlockedAt).toBeUndefined();
  expect(unit.recruitment).toHaveLength(2); expect(unit.joinText).toContain('通过招募');
  expect(unit.recruitment.map((row) => row.negotiation)).toEqual(['交涉时付 4000G', '交涉时付 800G']);
});
