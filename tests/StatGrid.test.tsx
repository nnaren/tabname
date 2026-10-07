import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { StatGrid } from '../src/components/StatGrid';
import { unit } from '../src/data/unit-io';

it('renders eleven stat cells and a distinct total', () => {
  render(<StatGrid stats={unit.stats} total={unit.total} label="成长率" />);
  expect(screen.getAllByText(/^(HP|力量|魔力|速度|技巧|防守|魔防|幸运|魅力|合计)$/)).toHaveLength(10);
  expect(screen.getByRole('button', { name: '成长率说明' })).toBeInTheDocument(); expect(screen.getByText('合计').parentElement?.className).toContain('total');
});
