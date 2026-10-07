import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { PortraitCard } from '../src/components/PortraitCard';

it('renders placeholder and swaps to image with fallback', () => {
  const { rerender } = render(<PortraitCard art={{ src: null, alt: '伊欧立绘' }} />); expect(screen.getByRole('img', { name: '伊欧立绘' })).toBeInTheDocument(); rerender(<PortraitCard art={{ src: '/io.png', alt: '伊欧立绘' }} />); const image = screen.getByRole('img', { name: '伊欧立绘' }); fireEvent.error(image); expect(screen.getByRole('img', { name: '伊欧立绘' })).toBeInTheDocument();
});
