import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundScreen from './not-found-screen';

describe('NotFoundScreen', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <NotFoundScreen />
      </BrowserRouter>
    );

    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Main')).toBeInTheDocument();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('should have link to main page', () => {
    render(
      <BrowserRouter>
        <NotFoundScreen />
      </BrowserRouter>
    );

    const links = screen.getAllByRole('link');
    const mainLink = links.find((link) => link.getAttribute('href') === '/');
    expect(mainLink).toBeInTheDocument();
    expect(mainLink).toHaveAttribute('href', '/');
  });
});

