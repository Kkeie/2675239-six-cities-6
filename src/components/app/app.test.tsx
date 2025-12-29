import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Routes, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import { reducer } from '../../store/reducer';
import { createAPI } from '../../services/api';
import { AuthorizationStatus } from '../../const';

const createMockStore = (initialState: Partial<ReturnType<typeof reducer>> = {}) => {
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
        allOffers: [],
        isLoading: false,
        currentOffer: null,
        nearbyOffers: [],
        comments: [],
        isOfferLoading: false,
      },
      user: {
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
      },
      ...initialState,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api,
        },
      }),
  });
};

const TestApp = () => (
  <Routes>
    <Route path={AppRoute.Main} element={<MainScreen />} />
    <Route path={AppRoute.Login} element={<LoginScreen />} />
    <Route
      path={AppRoute.Favorites}
      element={
        <PrivateRoute>
          <FavoritesScreen />
        </PrivateRoute>
      }
    />
    <Route path={AppRoute.Offers} element={<OfferScreen />} />
    <Route path={AppRoute.NotFound} element={<NotFoundScreen />} />
  </Routes>
);

describe('App routing', () => {
  it('should render MainScreen for "/" route', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <TestApp />
        </MemoryRouter>
      </Provider>
    );

    // MainScreen should render (check for header or main element)
    expect(container.querySelector('.page--main')).toBeInTheDocument();
  });

  it('should render LoginScreen for "/login" route', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <TestApp />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('should render NotFoundScreen for unknown route', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/unknown-route']}>
          <TestApp />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('should render OfferScreen for "/offer/:id" route', () => {
    const store = createMockStore({
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
        allOffers: [],
        isLoading: false,
        currentOffer: null,
        nearbyOffers: [],
        comments: [],
        isOfferLoading: false,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/123']}>
          <TestApp />
        </MemoryRouter>
      </Provider>
    );

    // OfferScreen will show spinner while loading or redirect to NotFoundScreen
    // We just check that the route is handled (not LoginScreen)
    expect(screen.queryByRole('heading', { name: 'Sign in' })).not.toBeInTheDocument();
    // Should render either spinner, NotFoundScreen, or OfferScreen
    expect(container.querySelector('.page')).toBeInTheDocument();
  });

  it('should redirect to LoginScreen when accessing Favorites without auth', () => {
    const store = createMockStore({
      user: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/favorites']}>
          <TestApp />
        </MemoryRouter>
      </Provider>
    );

    // Should redirect to login - check for login form heading
    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('should render FavoritesScreen when authenticated', () => {
    const store = createMockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: {
          email: 'test@test.com',
          token: 'test-token',
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/favorites']}>
          <TestApp />
        </MemoryRouter>
      </Provider>
    );

    // FavoritesScreen should render (might show empty state)
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
  });
});

