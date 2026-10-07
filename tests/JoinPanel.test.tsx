import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { JoinPanel } from '../src/components/JoinPanel';

it('renders the gold join pill and sentence', () => { render(<JoinPanel text="第1部通过招募加入。" />); expect(screen.getAllByText('加入').find((element) => element.className.includes('pill'))).toBeTruthy(); expect(screen.getByText('第1部通过招募加入。')).toBeInTheDocument(); });
