import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MainEmpty from './main-empty';

describe('MainEmpty', () => {
  it('should render correctly', () => {
    render(<MainEmpty cityName="Paris" />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(/We could not find any property available at the moment in Paris/)).toBeInTheDocument();
  });

  it('should display correct city name', () => {
    render(<MainEmpty cityName="Amsterdam" />);

    expect(screen.getByText(/We could not find any property available at the moment in Amsterdam/)).toBeInTheDocument();
  });
});

