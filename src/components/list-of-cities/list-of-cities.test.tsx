import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CityList from './list-of-cities';
import { reducer } from '../../store/reducer';
import { createAPI } from '../../services/api';
import { Cities, AuthorizationStatus } from '../../const';

const createMockStore = (currentCityName = 'Paris') => {
  const api = createAPI();
  const currentCity = Cities.find(city => city.name === currentCityName) || Cities[0];
  
  return configureStore({
    reducer,
    preloadedState: {
      data: {
        city: currentCity,
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
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: api,
        },
      }),
  });
};

describe('CityList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all cities', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <CityList cities={Cities} />
      </Provider>
    );

    Cities.forEach(city => {
      expect(screen.getByText(city.name)).toBeInTheDocument();
    });
  });

  it('should highlight current city', () => {
    const store = createMockStore('Paris');
    render(
      <Provider store={store}>
        <CityList cities={Cities} />
      </Provider>
    );

    const parisLink = screen.getByText('Paris').closest('a');
    expect(parisLink).toHaveClass('tabs__item--active');
  });

  it('should dispatch changeCityAction when city is clicked', async () => {
    const user = userEvent.setup();
    const store = createMockStore('Paris');
    render(
      <Provider store={store}>
        <CityList cities={Cities} />
      </Provider>
    );

    const amsterdamLink = screen.getByText('Amsterdam');
    await user.click(amsterdamLink);

    const state = store.getState();
    expect(state.data.city.name).toBe('Amsterdam');
  });

  it('should update active city after click', async () => {
    const user = userEvent.setup();
    const store = createMockStore('Paris');
    render(
      <Provider store={store}>
        <CityList cities={Cities} />
      </Provider>
    );

    const amsterdamLink = screen.getByText('Amsterdam');
    await user.click(amsterdamLink);

    // Wait for state update
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const state = store.getState();
    expect(state.data.city.name).toBe('Amsterdam');
  });
});

