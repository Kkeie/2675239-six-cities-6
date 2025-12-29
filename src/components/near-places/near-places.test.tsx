import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import NearPlaces from './near-places';
import { reducer } from '../../store/reducer';
import { createAPI } from '../../services/api';
import { Offer } from '../../types/offer';
import { City } from '../../types/city';
import { AuthorizationStatus } from '../../const';

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
    title: 'Nearby Offer 1',
    type: 'apartment',
    price: 100,
    city: mockCity,
    location: {
      latitude: 48.864716,
      longitude: 2.349014,
      zoom: 12,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.5,
    previewImage: 'img1.jpg',
  },
  {
    id: '2',
    title: 'Nearby Offer 2',
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

const createMockStore = () => {
  const api = createAPI();
  return configureStore({
    reducer,
    preloadedState: {
      data: {
        city: mockCity,
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

describe('NearPlaces', () => {
  const mockOnListItemHover = vi.fn();

  beforeEach(() => {
    mockOnListItemHover.mockClear();
  });

  it('should render all nearby places', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NearPlaces places={mockOffers} onListItemHover={mockOnListItemHover} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Nearby Offer 1')).toBeInTheDocument();
    expect(screen.getByText('Nearby Offer 2')).toBeInTheDocument();
  });

  it('should call onListItemHover when mouse enters a card', async () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <NearPlaces places={mockOffers} onListItemHover={mockOnListItemHover} />
        </MemoryRouter>
      </Provider>
    );

    const firstCard = container.querySelector('.place-card') as HTMLElement;
    if (firstCard) {
      // Use fireEvent to properly trigger React event handlers
      fireEvent.mouseEnter(firstCard);
      
      expect(mockOnListItemHover).toHaveBeenCalledWith('1');
    }
  });

  it('should call onListItemHover with null when mouse leaves a card', async () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <NearPlaces places={mockOffers} onListItemHover={mockOnListItemHover} />
        </MemoryRouter>
      </Provider>
    );

    const firstCard = container.querySelector('.place-card') as HTMLElement;
    if (firstCard) {
      // Use fireEvent to properly trigger React event handlers
      fireEvent.mouseLeave(firstCard);
      
      expect(mockOnListItemHover).toHaveBeenCalledWith(null);
    }
  });

  it('should render empty list when no places', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <NearPlaces places={[]} onListItemHover={mockOnListItemHover} />
        </MemoryRouter>
      </Provider>
    );

    const list = container.querySelector('.near-places__list');
    expect(list).toBeInTheDocument();
    expect(list?.children.length).toBe(0);
  });
});

