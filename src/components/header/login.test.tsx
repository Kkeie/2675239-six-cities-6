import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginHeader from './login';

describe('LoginHeader', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <LoginHeader />
      </BrowserRouter>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should have correct link to main page', () => {
    render(
      <BrowserRouter>
        <LoginHeader />
      </BrowserRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });
});

