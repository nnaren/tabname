import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { PromotionRoute } from '../src/components/PromotionRoute';
import { unit } from '../src/data/unit-io';

it('opens an accessible route dialog and restores focus', () => {
  document.body.style.overflow = 'auto';
  render(<div data-app-shell><PromotionRoute tiers={unit.promotion} /></div>);
  const trigger = screen.getByRole('button', { name: /对比路线/ }); fireEvent.click(trigger); expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true'); expect(document.querySelector('[data-app-shell]')).toHaveAttribute('inert'); expect(screen.getByRole('dialog').querySelectorAll('strong')[2]).toHaveTextContent('奥利哈铁骑');
  const close = screen.getByRole('button', { name: '关闭对比路线' }); expect(close).toHaveFocus(); fireEvent.keyDown(document, { key: 'Tab', shiftKey: true }); expect(close).toHaveFocus(); fireEvent.keyDown(document, { key: 'Tab' }); expect(close).toHaveFocus();
  expect(document.body.style.overflow).toBe('hidden'); fireEvent.keyDown(document, { key: 'Escape' }); expect(screen.queryByRole('dialog')).not.toBeInTheDocument(); expect(trigger).toHaveFocus(); expect(document.body.style.overflow).toBe('auto');
});
