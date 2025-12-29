import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { configureStore } from '@reduxjs/toolkit';
import {
  fetchOffersAction,
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchCommentsAction,
  changeFavoriteStatusAction,
  fetchFavoriteOffersAction,
  checkAuthAction,
  loginAction,
} from './action';
import { createAPI } from '../services/api';
import { Offer } from '../types/offer';
import { InfoOfOffer } from '../types/info-of-offer';
import { Rev } from '../types/rev';
import { AuthInfo } from '../types/auth';
import { City } from '../types/city';

describe('Async actions', () => {
  let mockApi: MockAdapter;
  let api: ReturnType<typeof createAPI>;

  beforeEach(() => {
    api = createAPI();
    mockApi = new MockAdapter(api);
  });

  afterEach(() => {
    mockApi.restore();
  });

  const mockCity: City = {
    name: 'Paris',
    location: {
      latitude: 48.864716,
      longitude: 2.349014,
      zoom: 12,
    },
  };

  const mockOffer: Offer = {
    id: '1',
    title: 'Test Offer',
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
    previewImage: 'test.jpg',
  };

  const mockInfoOffer: InfoOfOffer = {
    id: '1',
    title: 'Test Offer',
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
    description: 'Test description',
    bedrooms: 2,
    goods: ['wifi'],
    host: {
      name: 'Test Host',
      avatarUrl: 'host.jpg',
      isPro: true,
    },
    images: ['img1.jpg'],
    maxAdults: 4,
  };

  const mockComment: Rev = {
    id: '1',
    date: '2023-01-01',
    user: {
      name: 'Test User',
      avatarUrl: 'avatar.jpg',
      isPro: false,
    },
    comment: 'Test comment',
    rating: 5,
  };

  const mockAuthInfo: AuthInfo = {
    email: 'test@test.com',
    token: 'test-token',
  };

  describe('fetchOffersAction', () => {
    it('should dispatch fetchOffersAction.fulfilled when API call is successful', async () => {
      const offers = [mockOffer];
      mockApi.onGet('/offers').reply(200, offers);

      const store = configureStore({
        reducer: {
          data: (state = { allOffers: [], places: [], city: mockCity, isLoading: false, currentOffer: null, nearbyOffers: [], comments: [], isOfferLoading: false }) => state,
          user: (state = { authorizationStatus: 'UNKNOWN' as const, user: null }) => state,
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            thunk: {
              extraArgument: api,
            },
          }),
      });

      const result = await store.dispatch(fetchOffersAction());

      expect(result.type).toBe('data/fetchOffers/fulfilled');
      expect(result.payload).toEqual(offers);
    });

    it('should dispatch fetchOffersAction.rejected when API call fails', async () => {
      mockApi.onGet('/offers').reply(500);

      const store = configureStore({
        reducer: {
          data: (state = { allOffers: [], places: [], city: mockCity, isLoading: false, currentOffer: null, nearbyOffers: [], comments: [], isOfferLoading: false }) => state,
          user: (state = { authorizationStatus: 'UNKNOWN' as const, user: null }) => state,
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            thunk: {
              extraArgument: api,
            },
          }),
      });

      const result = await store.dispatch(fetchOffersAction());

      expect(result.type).toBe('data/fetchOffers/rejected');
    });
  });

  describe('fetchOfferAction', () => {
    it('should dispatch fetchOfferAction.fulfilled when API call is successful', async () => {
      mockApi.onGet('/offers/1').reply(200, mockInfoOffer);

      const store = configureStore({
        reducer: {
          data: (state = { allOffers: [], places: [], city: mockCity, isLoading: false, currentOffer: null, nearbyOffers: [], comments: [], isOfferLoading: false }) => state,
          user: (state = { authorizationStatus: 'UNKNOWN' as const, user: null }) => state,
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            thunk: {
              extraArgument: api,
            },
          }),
      });

      const result = await store.dispatch(fetchOfferAction('1'));

      expect(result.type).toBe('data/fetchOffer/fulfilled');
      expect(result.payload).toEqual(mockInfoOffer);
    });

    it('should dispatch fetchOfferAction.rejected when API call fails', async () => {
      mockApi.onGet('/offers/1').reply(404);

      const store = configureStore({
        reducer: {
          data: (state = { allOffers: [], places: [], city: mockCity, isLoading: false, currentOffer: null, nearbyOffers: [], comments: [], isOfferLoading: false }) => state,
          user: (state = { authorizationStatus: 'UNKNOWN' as const, user: null }) => state,
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            thunk: {
              extraArgument: api,
            },
          }),
      });

      const result = await store.dispatch(fetchOfferAction('1'));

      expect(result.type).toBe('data/fetchOffer/rejected');
    });
  });

  describe('fetchNearbyOffersAction', () => {
    it('should dispatch fetchNearbyOffersAction.fulfilled when API call is successful', async () => {
      const nearbyOffers = [mockOffer];
      mockApi.onGet('/offers/1/nearby').reply(200, nearbyOffers);

      const store = configureStore({
        reducer: {
          data: (state = { allOffers: [], places: [], city: mockCity, isLoading: false, currentOffer: null, nearbyOffers: [], comments: [], isOfferLoading: false }) => state,
          user: (state = { authorizationStatus: 'UNKNOWN' as const, user: null }) => state,
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            thunk: {
              extraArgument: api,
            },
          }),
      });

      const result = await store.dispatch(fetchNearbyOffersAction('1'));

      expect(result.type).toBe('data/fetchNearbyOffers/fulfilled');
      expect(result.payload).toEqual(nearbyOffers);
    });

    it('should dispatch fetchNearbyOffersAction.rejected when API call fails', async () => {
      mockApi.onGet('/offers/1/nearby').reply(500);

      const store = configureStore({
        reducer: {
          data: (state = { allOffers: [], places: [], city: mockCity, isLoading: false, currentOffer: null, nearbyOffers: [], comments: [], isOfferLoading: false }) => state,
          user: (state = { authorizationStatus: 'UNKNOWN' as const, user: null }) => state,
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            thunk: {
              extraArgument: api,
            },
          }),
      });

      const result = await store.dispatch(fetchNearbyOffersAction('1'));

      expect(result.type).toBe('data/fetchNearbyOffers/rejected');
    });
  });

  describe('fetchCommentsAction', () => {
    it('should dispatch fetchCommentsAction.fulfilled when API call is successful', async () => {
      const comments = [mockComment];
      mockApi.onGet('/comments/1').reply(200, comments);

      const store = configureStore({
        reducer: {
          data: (state = { allOffers: [], places: [], city: mockCity, isLoading: false, currentOffer: null, nearbyOffers: [], comments: [], isOfferLoading: false }) => state,
          user: (state = { authorizationStatus: 'UNKNOWN' as const, user: null }) => state,
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            thunk: {
              extraArgument: api,
            },
          }),
      });

      const result = await store.dispatch(fetchCommentsAction('1'));

      expect(result.type).toBe('data/fetchComments/fulfilled');
      expect(result.payload).toEqual(comments);
    });

    it('should dispatch fetchCommentsAction.rejected when API call fails', async () => {
      mockApi.onGet('/comments/1').reply(500);

      const store = configureStore({
        reducer: {
          data: (state = { allOffers: [], places: [], city: mockCity, isLoading: false, currentOffer: null, nearbyOffers: [], comments: [], isOfferLoading: false }) => state,
          user: (state = { authorizationStatus: 'UNKNOWN' as const, user: null }) => state,
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            thunk: {
              extraArgument: api,
            },
          }),
      });

      const result = await store.dispatch(fetchCommentsAction('1'));

      expect(result.type).toBe('data/fetchComments/rejected');
    });
  });

  describe('changeFavoriteStatusAction', () => {
    it('should dispatch changeFavoriteStatusAction.fulfilled when API call is successful', async () => {
      const updatedOffer = { ...mockOffer, isFavorite: true };
      mockApi.onPost('/favorite/1/1').reply(200, updatedOffer);
      mockApi.onGet('/offers').reply(200, [updatedOffer]);

      const store = configureStore({
        reducer: {
          data: (state = { allOffers: [], places: [], city: mockCity, isLoading: false, currentOffer: null, nearbyOffers: [], comments: [], isOfferLoading: false }) => state,
          user: (state = { authorizationStatus: 'UNKNOWN' as const, user: null }) => state,
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            thunk: {
              extraArgument: api,
            },
          }),
      });

      const result = await store.dispatch(changeFavoriteStatusAction({ offerId: '1', isFavorite: true }));

      expect(result.type).toBe('data/changeFavoriteStatus/fulfilled');
      expect(result.payload).toEqual(updatedOffer);
    });

    it('should dispatch changeFavoriteStatusAction.rejected when API call fails', async () => {
      mockApi.onPost('/favorite/1/1').reply(401);

      const store = configureStore({
        reducer: {
          data: (state = { allOffers: [], places: [], city: mockCity, isLoading: false, currentOffer: null, nearbyOffers: [], comments: [], isOfferLoading: false }) => state,
          user: (state = { authorizationStatus: 'UNKNOWN' as const, user: null }) => state,
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            thunk: {
              extraArgument: api,
            },
          }),
      });

      const result = await store.dispatch(changeFavoriteStatusAction({ offerId: '1', isFavorite: true }));

      expect(result.type).toBe('data/changeFavoriteStatus/rejected');
    });
  });

  describe('fetchFavoriteOffersAction', () => {
    it('should dispatch fetchFavoriteOffersAction.fulfilled when API call is successful', async () => {
      const favoriteOffers = [{ ...mockOffer, isFavorite: true }];
      mockApi.onGet('/favorite').reply(200, favoriteOffers);

      const store = configureStore({
        reducer: {
          data: (state = { allOffers: [], places: [], city: mockCity, isLoading: false, currentOffer: null, nearbyOffers: [], comments: [], isOfferLoading: false }) => state,
          user: (state = { authorizationStatus: 'UNKNOWN' as const, user: null }) => state,
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            thunk: {
              extraArgument: api,
            },
          }),
      });

      const result = await store.dispatch(fetchFavoriteOffersAction());

      expect(result.type).toBe('data/fetchFavoriteOffers/fulfilled');
      expect(result.payload).toEqual(favoriteOffers);
    });

    it('should dispatch fetchFavoriteOffersAction.rejected when API call fails', async () => {
      mockApi.onGet('/favorite').reply(401);

      const store = configureStore({
        reducer: {
          data: (state = { allOffers: [], places: [], city: mockCity, isLoading: false, currentOffer: null, nearbyOffers: [], comments: [], isOfferLoading: false }) => state,
          user: (state = { authorizationStatus: 'UNKNOWN' as const, user: null }) => state,
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            thunk: {
              extraArgument: api,
            },
          }),
      });

      const result = await store.dispatch(fetchFavoriteOffersAction());

      expect(result.type).toBe('data/fetchFavoriteOffers/rejected');
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch checkAuthAction.fulfilled when API call is successful', async () => {
      mockApi.onGet('/login').reply(200, mockAuthInfo);

      const store = configureStore({
        reducer: {
          data: (state = { allOffers: [], places: [], city: mockCity, isLoading: false, currentOffer: null, nearbyOffers: [], comments: [], isOfferLoading: false }) => state,
          user: (state = { authorizationStatus: 'UNKNOWN' as const, user: null }) => state,
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            thunk: {
              extraArgument: api,
            },
          }),
      });

      const result = await store.dispatch(checkAuthAction());

      expect(result.type).toBe('user/checkAuth/fulfilled');
      expect(result.payload).toEqual(mockAuthInfo);
    });

    it('should dispatch checkAuthAction.rejected when API call fails', async () => {
      mockApi.onGet('/login').reply(401);

      const store = configureStore({
        reducer: {
          data: (state = { allOffers: [], places: [], city: mockCity, isLoading: false, currentOffer: null, nearbyOffers: [], comments: [], isOfferLoading: false }) => state,
          user: (state = { authorizationStatus: 'UNKNOWN' as const, user: null }) => state,
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            thunk: {
              extraArgument: api,
            },
          }),
      });

      const result = await store.dispatch(checkAuthAction());

      expect(result.type).toBe('user/checkAuth/rejected');
    });
  });

  describe('loginAction', () => {
    it('should dispatch loginAction.fulfilled when API call is successful', async () => {
      mockApi.onPost('/login').reply(200, mockAuthInfo);

      const store = configureStore({
        reducer: {
          data: (state = { allOffers: [], places: [], city: mockCity, isLoading: false, currentOffer: null, nearbyOffers: [], comments: [], isOfferLoading: false }) => state,
          user: (state = { authorizationStatus: 'UNKNOWN' as const, user: null }) => state,
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            thunk: {
              extraArgument: api,
            },
          }),
      });

      const result = await store.dispatch(loginAction({ email: 'test@test.com', password: 'password' }));

      expect(result.type).toBe('user/login/fulfilled');
      expect(result.payload).toEqual(mockAuthInfo);
    });

    it('should dispatch loginAction.rejected when API call fails', async () => {
      mockApi.onPost('/login').reply(401);

      const store = configureStore({
        reducer: {
          data: (state = { allOffers: [], places: [], city: mockCity, isLoading: false, currentOffer: null, nearbyOffers: [], comments: [], isOfferLoading: false }) => state,
          user: (state = { authorizationStatus: 'UNKNOWN' as const, user: null }) => state,
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            thunk: {
              extraArgument: api,
            },
          }),
      });

      const result = await store.dispatch(loginAction({ email: 'test@test.com', password: 'wrong' }));

      expect(result.type).toBe('user/login/rejected');
    });
  });
});

