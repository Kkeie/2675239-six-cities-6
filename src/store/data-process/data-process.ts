import { createReducer } from '@reduxjs/toolkit';
import {changeCityAction, fillPlacesAction, fetchOffersAction, fetchOfferAction, fetchNearbyOffersAction, fetchCommentsAction} from '../action.ts';
import {Offer} from '../../types/offer.ts';
import { City } from '../../types/city.ts';
import {InfoOfOffer} from '../../types/info-of-offer.ts';
import {Rev} from '../../types/rev.ts';

type DataState = {
  city: City;
  places: Offer[];
  allOffers: Offer[];
  isLoading: boolean;
  currentOffer: InfoOfOffer | null;
  nearbyOffers: Offer[];
  comments: Rev[];
  isOfferLoading: boolean;
}

const initialState: DataState = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.864716,
      longitude: 2.349014,
      zoom: 12
    }
  },
  places: [],
  allOffers: [],
  isLoading: false,
  currentOffer: null,
  nearbyOffers: [],
  comments: [],
  isOfferLoading: false,
};

export const dataProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state, action) => {
      state.city = action.payload;
      state.places = state.allOffers.filter((offer) => offer.city.name === action.payload.name);
    })
    .addCase(fillPlacesAction, (state, action) => {
      state.places = action.payload;
    })
    .addCase(fetchOffersAction.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchOffersAction.fulfilled, (state, action) => {
      state.allOffers = action.payload;
      state.places = action.payload.filter((offer) => offer.city.name === state.city.name);
      state.isLoading = false;
    })
    .addCase(fetchOffersAction.rejected, (state) => {
      state.isLoading = false;
    })
    .addCase(fetchOfferAction.pending, (state) => {
      state.isOfferLoading = true;
    })
    .addCase(fetchOfferAction.fulfilled, (state, action) => {
      state.currentOffer = action.payload;
      state.isOfferLoading = false;
    })
    .addCase(fetchOfferAction.rejected, (state) => {
      state.currentOffer = null;
      state.isOfferLoading = false;
    })
    .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(fetchCommentsAction.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
});

