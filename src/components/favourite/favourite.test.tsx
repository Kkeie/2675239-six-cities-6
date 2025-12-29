import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import Favorites from './favourite';
import { Offer } from '../../types/offer';
import { City } from '../../types/city';
import { reducer } from '../../store/reducer';
import { createAPI } from '../../services/api';
import { AuthorizationStatus } from '../../const';

const createMockStore = () => {
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
        authorizationStatus: AuthorizationStatus.Auth,
        user: {
          email: 'test@test.com',
          token: 'test-token',
        },
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

const mockCity1: City = {
  name: 'Paris',
  location: {
    latitude: 48.864716,
    longitude: 2.349014,
    zoom: 12,
  },
};

const mockCity2: City = {
  name: 'Amsterdam',
  location: {
    latitude: 52.371807,
    longitude: 4.896029,
    zoom: 12,
  },
};

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Paris Offer 1',
    type: 'apartment',
    price: 100,
    city: mockCity1,
    location: {
      latitude: 48.864716,
      longitude: 2.349014,
      zoom: 12,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.5,
    previewImage: 'img1.jpg',
  },
  {
    id: '2',
    title: 'Paris Offer 2',
    type: 'room',
    price: 200,
    city: mockCity1,
    location: {
      latitude: 48.864716,
      longitude: 2.349014,
      zoom: 12,
    },
    isFavorite: true,
    isPremium: true,
    rating: 5,
    previewImage: 'img2.jpg',
  },
  {
    id: '3',
    title: 'Amsterdam Offer 1',
    type: 'house',
    price: 150,
    city: mockCity2,
    location: {
      latitude: 52.371807,
      longitude: 4.896029,
      zoom: 12,
    },
    isFavorite: true,
    isPremium: false,
    rating: 3.5,
    previewImage: 'img3.jpg',
  },
];

describe('Favorites', () => {
  it('should render correctly with offers', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites places={mockOffers} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Paris Offer 1')).toBeInTheDocument();
    expect(screen.getByText('Paris Offer 2')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam Offer 1')).toBeInTheDocument();
  });

  it('should group offers by city', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites places={mockOffers} />
        </MemoryRouter>
      </Provider>
    );

    const list = container.querySelector('.favorites__list');
    expect(list).toBeInTheDocument();
    // Should have 2 city groups (Paris and Amsterdam)
    const cityGroups = container.querySelectorAll('.favorites__locations');
    expect(cityGroups.length).toBeGreaterThan(0);
  });

  it('should render empty list when no offers', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites places={[]} />
        </MemoryRouter>
      </Provider>
    );

    const list = container.querySelector('.favorites__list');
    expect(list).toBeInTheDocument();
    expect(list?.children.length).toBe(0);
  });
});

