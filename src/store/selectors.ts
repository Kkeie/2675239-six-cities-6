import {createSelector} from '@reduxjs/toolkit';
import {State} from '../types/state.ts';

export const getCity = (state: State) => state.data.city;
export const getPlaces = (state: State) => state.data.places;
export const getAllOffers = (state: State) => state.data.allOffers;
export const getIsLoading = (state: State) => state.data.isLoading;
export const getCurrentOffer = (state: State) => state.data.currentOffer;
export const getNearbyOffers = (state: State) => state.data.nearbyOffers;
export const getComments = (state: State) => state.data.comments;
export const getIsOfferLoading = (state: State) => state.data.isOfferLoading;
export const getAuthorizationStatus = (state: State) => state.user.authorizationStatus;
export const getUser = (state: State) => state.user.user;

export const getFavoriteOffers = createSelector(
  [getAllOffers],
  (offers) => offers.filter((offer) => offer.isFavorite)
);

export const getFavoriteCount = createSelector(
  [getFavoriteOffers],
  (favorites) => favorites.length
);

export const getPlacesByCity = createSelector(
  [getAllOffers, getCity],
  (offers, city) => offers.filter((offer) => offer.city.name === city.name)
);

