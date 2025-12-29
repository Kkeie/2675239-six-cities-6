import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RevList from './rev-list';
import { Rev } from '../../types/rev';

const mockReviews: Rev[] = [
  {
    id: '1',
    date: '2023-01-15T10:00:00.000Z',
    user: {
      name: 'John Doe',
      avatarUrl: 'avatar1.jpg',
      isPro: false,
    },
    comment: 'Great place!',
    rating: 5,
  },
  {
    id: '2',
    date: '2023-01-20T10:00:00.000Z',
    user: {
      name: 'Jane Smith',
      avatarUrl: 'avatar2.jpg',
      isPro: true,
    },
    comment: 'Nice apartment.',
    rating: 4,
  },
];

describe('RevList', () => {
  it('should render correctly with reviews', () => {
    render(<RevList reviews={mockReviews} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Great place!')).toBeInTheDocument();
    expect(screen.getByText('Nice apartment.')).toBeInTheDocument();
  });

  it('should render empty list when no reviews', () => {
    const { container } = render(<RevList reviews={[]} />);

    const list = container.querySelector('.reviews__list');
    expect(list).toBeInTheDocument();
    expect(list?.children.length).toBe(0);
  });

  it('should render all reviews', () => {
    render(<RevList reviews={mockReviews} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(mockReviews.length);
  });
});

