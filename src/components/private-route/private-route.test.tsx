import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PrivateRoute from './private-route';
import { reducer } from '../../store/reducer';
import { createAPI } from '../../services/api';
import { AuthorizationStatus } from '../../const';

const createMockStore = (authorizationStatus: AuthorizationStatus) => {
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

describe('PrivateRoute', () => {
  it('should render children when user is authenticated', () => {
    const store = createMockStore(AuthorizationStatus.Auth);
    const TestComponent = () => <div>Protected Content</div>;

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PrivateRoute>
            <TestComponent />
          </PrivateRoute>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('should redirect to login when user is not authenticated', () => {
    const store = createMockStore(AuthorizationStatus.NoAuth);
    const TestComponent = () => <div>Protected Content</div>;

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/favorites']}>
          <PrivateRoute>
            <TestComponent />
          </PrivateRoute>
        </MemoryRouter>
      </Provider>
    );

    // Should redirect to login - check that protected content is not shown
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should redirect to login when authorization status is unknown', () => {
    const store = createMockStore(AuthorizationStatus.Unknown);
    const TestComponent = () => <div>Protected Content</div>;

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/favorites']}>
          <PrivateRoute>
            <TestComponent />
          </PrivateRoute>
        </MemoryRouter>
      </Provider>
    );

    // Should redirect to login when status is unknown
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});

