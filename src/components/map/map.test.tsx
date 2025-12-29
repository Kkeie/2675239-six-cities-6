import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Map from './map';
import { reducer } from '../../store/reducer';
import { createAPI } from '../../services/api';
import { Offer } from '../../types/offer';
import { City } from '../../types/city';
import { Location } from '../../types/location';
import { AuthorizationStatus } from '../../const';

// Mock leaflet
vi.mock('leaflet', () => {
  const mockFlyTo = vi.fn();
  const mockEachLayer = vi.fn();
  const mockRemoveLayer = vi.fn();
  const mockAddTo = vi.fn().mockReturnThis();
  const mockMap = {
    flyTo: mockFlyTo,
    eachLayer: mockEachLayer,
    removeLayer: mockRemoveLayer,
  };

  const mockMarker = {
    addTo: mockAddTo,
  };

  const mockIcon = vi.fn().mockReturnValue({});

  return {
    default: {
      map: vi.fn().mockReturnValue(mockMap),
      icon: mockIcon,
      marker: vi.fn().mockReturnValue(mockMarker),
    },
  };
});

// Mock useMap hook
const mockMapInstance = {
  flyTo: vi.fn(),
  eachLayer: vi.fn(() => {
    // Mock implementation
  }),
  removeLayer: vi.fn(),
};

vi.mock('../../hooks/use-map', () => ({
  default: vi.fn(() => mockMapInstance),
}));

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

describe('Map', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <Map activeId={null} className="cities" />
      </Provider>
    );

    const mapSection = container.querySelector('.cities__map');
    expect(mapSection).toBeInTheDocument();
  });

  it('should render with custom className', () => {
    const store = createMockStore();
    const { container } = render(
      <Provider store={store}>
        <Map activeId={null} className="offer" />
      </Provider>
    );

    const mapSection = container.querySelector('.offer__map');
    expect(mapSection).toBeInTheDocument();
  });

  it('should render with locations prop', () => {
    const store = createMockStore();
    const locations: Location[] = [
      {
        latitude: 48.864716,
        longitude: 2.349014,
        zoom: 12,
      },
    ];
    const city: Location = {
      latitude: 48.864716,
      longitude: 2.349014,
      zoom: 12,
    };

    const { container } = render(
      <Provider store={store}>
        <Map activeId={null} className="offer" locations={locations} city={city} />
      </Provider>
    );

    const mapSection = container.querySelector('.offer__map');
    expect(mapSection).toBeInTheDocument();
  });

  it('should render with selectedPoint', () => {
    const store = createMockStore();
    const locations: Location[] = [
      {
        latitude: 48.864716,
        longitude: 2.349014,
        zoom: 12,
      },
    ];
    const city: Location = {
      latitude: 48.864716,
      longitude: 2.349014,
      zoom: 12,
    };
    const selectedPoint: Location = {
      latitude: 48.864716,
      longitude: 2.349014,
      zoom: 12,
    };

    const { container } = render(
      <Provider store={store}>
        <Map activeId={null} className="offer" locations={locations} city={city} selectedPoint={selectedPoint} />
      </Provider>
    );

    const mapSection = container.querySelector('.offer__map');
    expect(mapSection).toBeInTheDocument();
  });
});

