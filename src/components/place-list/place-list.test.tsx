import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import PlaceList from './place-list';
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
    title: 'Offer 1',
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
    title: 'Offer 2',
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
  {
    id: '3',
    title: 'Offer 3',
    type: 'house',
    price: 150,
    city: mockCity,
    location: {
      latitude: 48.864716,
      longitude: 2.349014,
      zoom: 12,
    },
    isFavorite: false,
    isPremium: false,
    rating: 3.5,
    previewImage: 'img3.jpg',
  },
];

const createMockStore = (offers: Offer[] = mockOffers) => {
  const api = createAPI();
  return configureStore({
    reducer,
    preloadedState: {
      data: {
        city: mockCity,
        places: offers,
        allOffers: offers,
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

describe('PlaceList', () => {
  const mockOnListItemHover = vi.fn();

  beforeEach(() => {
    mockOnListItemHover.mockClear();
  });

  it('should render all places', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceList onListItemHover={mockOnListItemHover} sortType="Popular" />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Offer 1')).toBeInTheDocument();
    expect(screen.getByText('Offer 2')).toBeInTheDocument();
    expect(screen.getByText('Offer 3')).toBeInTheDocument();
  });

  it('should sort places by price low to high', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceList onListItemHover={mockOnListItemHover} sortType="Price: low to high" />
        </MemoryRouter>
      </Provider>
    );

    const offers = screen.getAllByText(/Offer \d/);
    expect(offers[0]).toHaveTextContent('Offer 1');
    expect(offers[1]).toHaveTextContent('Offer 3');
    expect(offers[2]).toHaveTextContent('Offer 2');
  });

  it('should sort places by price high to low', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceList onListItemHover={mockOnListItemHover} sortType="Price: high to low" />
        </MemoryRouter>
      </Provider>
    );

    const offers = screen.getAllByText(/Offer \d/);
    expect(offers[0]).toHaveTextContent('Offer 2');
    expect(offers[1]).toHaveTextContent('Offer 3');
    expect(offers[2]).toHaveTextContent('Offer 1');
  });

  it('should sort places by rating', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceList onListItemHover={mockOnListItemHover} sortType="Top rated first" />
        </MemoryRouter>
      </Provider>
    );

    const offers = screen.getAllByText(/Offer \d/);
    expect(offers[0]).toHaveTextContent('Offer 2');
    expect(offers[1]).toHaveTextContent('Offer 1');
    expect(offers[2]).toHaveTextContent('Offer 3');
  });

  it('should call onListItemHover when mouse enters a card', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceList onListItemHover={mockOnListItemHover} sortType="Popular" />
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

  it('should call onListItemHover with null when mouse leaves a card', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceList onListItemHover={mockOnListItemHover} sortType="Popular" />
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
    const store = createMockStore([]);
    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <PlaceList onListItemHover={mockOnListItemHover} sortType="Popular" />
        </MemoryRouter>
      </Provider>
    );

    const list = container.querySelector('.cities__places-list');
    expect(list).toBeInTheDocument();
    expect(list?.children.length).toBe(0);
  });
});

