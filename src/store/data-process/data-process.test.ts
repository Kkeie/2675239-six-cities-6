import { describe, it, expect } from 'vitest';
import { dataProcess } from './data-process';
import {
  changeCityAction,
  fillPlacesAction,
  fetchOffersAction,
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchCommentsAction,
  changeFavoriteStatusAction,
  fetchFavoriteOffersAction,
} from '../action';
import { Offer } from '../../types/offer';
import { City } from '../../types/city';
import { InfoOfOffer } from '../../types/info-of-offer';
import { Rev } from '../../types/rev';

describe('dataProcess reducer', () => {
  const initialState = {
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
  };

  const mockCity: City = {
    name: 'Amsterdam',
    location: {
      latitude: 52.371807,
      longitude: 4.896029,
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
      latitude: 52.371807,
      longitude: 4.896029,
      zoom: 12,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.5,
    previewImage: 'test.jpg',
  };

  const mockOffer2: Offer = {
    id: '2',
    title: 'Test Offer 2',
    type: 'room',
    price: 200,
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
    isFavorite: false,
    isPremium: true,
    rating: 5,
    previewImage: 'test2.jpg',
  };

  it('should return initial state', () => {
    expect(dataProcess(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle changeCityAction', () => {
    const state = {
      ...initialState,
      allOffers: [mockOffer, mockOffer2],
      places: [mockOffer2],
    };

    const action = changeCityAction(mockCity);
    const result = dataProcess(state, action);

    expect(result.city).toEqual(mockCity);
    expect(result.places).toEqual([mockOffer]);
  });

  it('should handle fillPlacesAction', () => {
    const places = [mockOffer];
    const action = fillPlacesAction(places);
    const result = dataProcess(initialState, action);

    expect(result.places).toEqual(places);
  });

  it('should handle fetchOffersAction.pending', () => {
    const action = { type: fetchOffersAction.pending.type };
    const result = dataProcess(initialState, action);

    expect(result.isLoading).toBe(true);
  });

  it('should handle fetchOffersAction.fulfilled', () => {
    const offers = [mockOffer, mockOffer2];
    const action = {
      type: fetchOffersAction.fulfilled.type,
      payload: offers,
    };
    const result = dataProcess(initialState, action);

    expect(result.allOffers).toEqual(offers);
    expect(result.places).toEqual([mockOffer2]);
    expect(result.isLoading).toBe(false);
  });

  it('should handle fetchOffersAction.rejected', () => {
    const state = { ...initialState, isLoading: true };
    const action = { type: fetchOffersAction.rejected.type };
    const result = dataProcess(state, action);

    expect(result.isLoading).toBe(false);
  });

  it('should handle fetchOfferAction.pending', () => {
    const action = { type: fetchOfferAction.pending.type };
    const result = dataProcess(initialState, action);

    expect(result.isOfferLoading).toBe(true);
  });

  it('should handle fetchOfferAction.fulfilled', () => {
    const mockInfoOffer: InfoOfOffer = {
      id: '1',
      title: 'Test Offer',
      type: 'apartment',
      price: 100,
      city: mockCity,
      location: {
        latitude: 52.371807,
        longitude: 4.896029,
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

    const action = {
      type: fetchOfferAction.fulfilled.type,
      payload: mockInfoOffer,
    };
    const result = dataProcess(initialState, action);

    expect(result.currentOffer).toEqual(mockInfoOffer);
    expect(result.isOfferLoading).toBe(false);
  });

  it('should handle fetchOfferAction.rejected', () => {
    const state = {
      ...initialState,
      currentOffer: {} as InfoOfOffer,
      isOfferLoading: true,
    };
    const action = { type: fetchOfferAction.rejected.type };
    const result = dataProcess(state, action);

    expect(result.currentOffer).toBeNull();
    expect(result.isOfferLoading).toBe(false);
  });

  it('should handle fetchNearbyOffersAction.fulfilled', () => {
    const nearbyOffers = [mockOffer];
    const action = {
      type: fetchNearbyOffersAction.fulfilled.type,
      payload: nearbyOffers,
    };
    const result = dataProcess(initialState, action);

    expect(result.nearbyOffers).toEqual(nearbyOffers);
  });

  it('should handle fetchCommentsAction.fulfilled', () => {
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

    const comments = [mockComment];
    const action = {
      type: fetchCommentsAction.fulfilled.type,
      payload: comments,
    };
    const result = dataProcess(initialState, action);

    expect(result.comments).toEqual(comments);
  });

  it('should handle changeFavoriteStatusAction.fulfilled - update allOffers', () => {
    const state = {
      ...initialState,
      allOffers: [mockOffer],
      places: [],
    };

    const updatedOffer = { ...mockOffer, isFavorite: true };
    const action = {
      type: changeFavoriteStatusAction.fulfilled.type,
      payload: updatedOffer,
    };
    const result = dataProcess(state, action);

    expect(result.allOffers[0].isFavorite).toBe(true);
  });

  it('should handle changeFavoriteStatusAction.fulfilled - update places', () => {
    const state = {
      ...initialState,
      allOffers: [mockOffer],
      places: [mockOffer],
      city: mockCity,
    };

    const updatedOffer = { ...mockOffer, isFavorite: true };
    const action = {
      type: changeFavoriteStatusAction.fulfilled.type,
      payload: updatedOffer,
    };
    const result = dataProcess(state, action);

    expect(result.places[0].isFavorite).toBe(true);
  });

  it('should handle changeFavoriteStatusAction.fulfilled - update currentOffer', () => {
    const mockInfoOffer: InfoOfOffer = {
      id: '1',
      title: 'Test Offer',
      type: 'apartment',
      price: 100,
      city: mockCity,
      location: {
        latitude: 52.371807,
        longitude: 4.896029,
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

    const state = {
      ...initialState,
      currentOffer: mockInfoOffer,
    };

    const updatedOffer = { ...mockOffer, isFavorite: true };
    const action = {
      type: changeFavoriteStatusAction.fulfilled.type,
      payload: updatedOffer,
    };
    const result = dataProcess(state, action);

    expect(result.currentOffer?.isFavorite).toBe(true);
  });

  it('should handle changeFavoriteStatusAction.fulfilled - update nearbyOffers', () => {
    const state = {
      ...initialState,
      nearbyOffers: [mockOffer],
    };

    const updatedOffer = { ...mockOffer, isFavorite: true };
    const action = {
      type: changeFavoriteStatusAction.fulfilled.type,
      payload: updatedOffer,
    };
    const result = dataProcess(state, action);

    expect(result.nearbyOffers[0].isFavorite).toBe(true);
  });

  it('should handle fetchFavoriteOffersAction.fulfilled', () => {
    const state = {
      ...initialState,
      allOffers: [mockOffer, mockOffer2],
      places: [mockOffer2],
      city: {
        name: 'Paris',
        location: {
          latitude: 48.864716,
          longitude: 2.349014,
          zoom: 12,
        },
      },
    };

    const favoriteOffers = [{ ...mockOffer, isFavorite: true }];
    const action = {
      type: fetchFavoriteOffersAction.fulfilled.type,
      payload: favoriteOffers,
    };
    const result = dataProcess(state, action);

    expect(result.allOffers[0].isFavorite).toBe(true);
    expect(result.allOffers[1].isFavorite).toBe(false);
    expect(result.places[0].isFavorite).toBe(false);
  });

  it('should handle fetchFavoriteOffersAction.fulfilled - update currentOffer', () => {
    const mockInfoOffer: InfoOfOffer = {
      id: '1',
      title: 'Test Offer',
      type: 'apartment',
      price: 100,
      city: mockCity,
      location: {
        latitude: 52.371807,
        longitude: 4.896029,
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

    const state = {
      ...initialState,
      allOffers: [mockOffer],
      currentOffer: mockInfoOffer,
    };

    const favoriteOffers = [{ ...mockOffer, isFavorite: true }];
    const action = {
      type: fetchFavoriteOffersAction.fulfilled.type,
      payload: favoriteOffers,
    };
    const result = dataProcess(state, action);

    expect(result.currentOffer?.isFavorite).toBe(true);
  });

  it('should handle fetchFavoriteOffersAction.fulfilled - update nearbyOffers', () => {
    const state = {
      ...initialState,
      allOffers: [mockOffer],
      nearbyOffers: [mockOffer],
    };

    const favoriteOffers = [{ ...mockOffer, isFavorite: true }];
    const action = {
      type: fetchFavoriteOffersAction.fulfilled.type,
      payload: favoriteOffers,
    };
    const result = dataProcess(state, action);

    expect(result.nearbyOffers[0].isFavorite).toBe(true);
  });
});

