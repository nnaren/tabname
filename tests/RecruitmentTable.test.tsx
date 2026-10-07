import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { RecruitmentTable } from '../src/components/RecruitmentTable';
import { unit } from '../src/data/unit-io';

it('uses semantic table markup and tone-coded annotations', () => { render(<RecruitmentTable unitName={unit.name} rows={unit.recruitment} />); expect(screen.getByRole('table', { name: '伊欧招募路线与条件' })).toBeInTheDocument(); expect(screen.getByRole('columnheader', { name: '路线' })).toHaveAttribute('scope', 'col'); expect(screen.getByRole('rowheader', { name: /凯伊德/ })).toHaveAttribute('scope', 'row'); expect(document.querySelectorAll('[class*="badge"]')).toHaveLength(2); expect(screen.getByText(/四篇里/).className).toContain('green'); expect(screen.getAllByRole('row')).toHaveLength(3); });
it('keeps the negotiation badge separate from the payment text', () => { render(<RecruitmentTable unitName={unit.name} rows={unit.recruitment} />); expect(screen.getByText('交涉时付 4000G')).toBeInTheDocument(); expect(screen.getByText('交涉时付 800G')).toBeInTheDocument(); expect(screen.getAllByText('中')).toHaveLength(2); });
