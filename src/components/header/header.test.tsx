import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from './header';
import { reducer } from '../../store/reducer';
import { createAPI } from '../../services/api';
import { AuthorizationStatus } from '../../const';

const createMockStore = (authorizationStatus: AuthorizationStatus = AuthorizationStatus.Auth, favoriteCount = 0) => {
  const api = createAPI();
  return configureStore({
    reducer,
    preloadedState: {
      data: {
        city: {
          name: 'Paris',
          location: {
            latitude: 48.864716,
            longitude: 2.349014,
            zoom: 12,
          },
        },
        places: [],
        allOffers: Array.from({ length: favoriteCount }, (_, i) => ({
          id: `favorite-${i}`,
          title: `Favorite ${i}`,
          type: 'apartment',
          price: 100,
          city: {
            name: 'Paris',
            location: {
              latitude: 48.864716,
              longitude: 2.349014,
              zoom: 12,
            },
          },
          location: {
            latitude: 48.864716,
            longitude: 2.349014,
            zoom: 12,
          },
          isFavorite: true,
          isPremium: false,
          rating: 4.5,
          previewImage: 'test.jpg',
        })),
        isLoading: false,
        currentOffer: null,
        nearbyOffers: [],
        comments: [],
        isOfferLoading: false,
      },
      user: {
        authorizationStatus,
        user: authorizationStatus === AuthorizationStatus.Auth ? {
          email: 'test@test.com',
          token: 'test-token',
        } : null,
      },
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api,
        },
      }),
  });
};

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly for authenticated user', () => {
    const store = createMockStore(AuthorizationStatus.Auth, 3);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header isMain={false} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('test@test.com')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should render correctly for unauthenticated user', () => {
    const store = createMockStore(AuthorizationStatus.NoAuth);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header isMain={false} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });

  it('should dispatch logoutAction when Sign out is clicked', async () => {
    const user = userEvent.setup();
    const store = createMockStore(AuthorizationStatus.Auth);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header isMain={false} />
        </MemoryRouter>
      </Provider>
    );

    const signOutButton = screen.getByText('Sign out');
    await user.click(signOutButton.closest('a')!);

    // Check that logout action was dispatched
    await new Promise(resolve => setTimeout(resolve, 100));
    const state = store.getState();
    expect(state.user.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });

  it('should have active class on logo when isMain is true', () => {
    const store = createMockStore(AuthorizationStatus.Auth);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header isMain={true} />
        </MemoryRouter>
      </Provider>
    );

    const logoLink = screen.getByRole('link', { name: /6 cities logo/i });
    expect(logoLink).toHaveClass('header__logo-link--active');
  });

  it('should not have active class on logo when isMain is false', () => {
    const store = createMockStore(AuthorizationStatus.Auth);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header isMain={false} />
        </MemoryRouter>
      </Provider>
    );

    const logoLink = screen.getByRole('link', { name: /6 cities logo/i });
    expect(logoLink).not.toHaveClass('header__logo-link--active');
  });

  it('should display favorite count', () => {
    const store = createMockStore(AuthorizationStatus.Auth, 5);
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header isMain={false} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('5')).toBeInTheDocument();
  });
});

