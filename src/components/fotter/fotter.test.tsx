import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './fotter';

describe('Footer', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });

  it('should have correct link to main page', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });
});

