import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RevItem from './item-rev';
import { Rev } from '../../types/rev';

describe('RevItem', () => {
  const mockRev: Rev = {
    id: '1',
    date: '2023-01-15T10:00:00.000Z',
    user: {
      name: 'John Doe',
      avatarUrl: 'avatar.jpg',
      isPro: false,
    },
    comment: 'Great place!',
    rating: 5,
  };

  it('should render correctly', () => {
    render(<RevItem rev={mockRev} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Great place!')).toBeInTheDocument();
    expect(screen.getByAltText('Reviews avatar')).toBeInTheDocument();
  });

  it('should display correct rating', () => {
    render(<RevItem rev={mockRev} />);

    const ratingElement = screen.getByText('Rating').parentElement;
    expect(ratingElement).toBeInTheDocument();
  });

  it('should format date correctly', () => {
    const { container } = render(<RevItem rev={mockRev} />);

    const timeElement = container.querySelector('time');
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveAttribute('dateTime', '2023-01-15T10:00:00.000Z');
  });
});

