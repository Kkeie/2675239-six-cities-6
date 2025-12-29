import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import CityFavorites from './list-of-favourite-cities';
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

const mockCity: City = {
  name: 'Paris',
  location: {
    latitude: 48.864716,
    longitude: 2.349014,
    zoom: 12,
  },
};

const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'Paris Offer 1',
    type: 'apartment',
    price: 100,
    city: mockCity,
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
    city: mockCity,
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
];

describe('CityFavorites', () => {
  it('should render correctly with city name and offers', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CityFavorites city="Paris" places={mockOffers} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Paris Offer 1')).toBeInTheDocument();
    expect(screen.getByText('Paris Offer 2')).toBeInTheDocument();
  });

  it('should render all offers for the city', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CityFavorites city="Paris" places={mockOffers} />
        </MemoryRouter>
      </Provider>
    );

    const offers = screen.getAllByText(/Paris Offer/);
    expect(offers.length).toBe(mockOffers.length);
  });

  it('should render empty list when no offers', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CityFavorites city="Paris" places={[]} />
        </MemoryRouter>
      </Provider>
    );

    const placesContainer = container.querySelector('.favorites__places');
    expect(placesContainer).toBeInTheDocument();
    expect(placesContainer?.children.length).toBe(0);
  });
});

