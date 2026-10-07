import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { LearnablePanel } from '../src/components/LearnablePanel';
import { unit } from '../src/data/unit-io';

it('supports keyboard disclosure and keeps the region in the DOM', () => {
  render(<LearnablePanel learnable={unit.learnable} />); const trigger = screen.getByRole('button', { name: /可习得/ }); const regionId = trigger.getAttribute('aria-controls')!; const region = document.getElementById(regionId)!;
  expect(trigger).toHaveAttribute('aria-expanded', 'false'); expect(region).toHaveAttribute('hidden'); expect(trigger.querySelector('[class*="pill"]')).toBeInTheDocument(); fireEvent.click(trigger); expect(trigger).toHaveAttribute('aria-expanded', 'true'); expect(region).not.toHaveAttribute('hidden'); fireEvent.click(trigger); expect(trigger).toHaveAttribute('aria-expanded', 'false'); expect(region).toHaveAttribute('hidden');
});
