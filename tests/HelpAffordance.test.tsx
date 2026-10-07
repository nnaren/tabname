import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { HelpAffordance } from '../src/components/HelpAffordance';

it('is a real toggle button with described tooltip', () => { render(<HelpAffordance label="说明" text="帮助内容" />); const button = screen.getByRole('button', { name: '说明' }); expect(button).toHaveAttribute('aria-expanded', 'false'); fireEvent.click(button); expect(button).toHaveAttribute('aria-expanded', 'true'); expect(screen.getByRole('tooltip')).toBeInTheDocument(); });
