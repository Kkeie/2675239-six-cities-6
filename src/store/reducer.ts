import { createReducer } from '@reduxjs/toolkit';
import {changeCityAction, fillPlacesAction, fetchOffersAction} from './action.ts';
import {Offer} from '../types/offer.ts';
import { City } from '../types/city.ts';

type stateCityProps = {
  city: City;
  places: Offer[];
  allOffers: Offer[];
  isLoading: boolean;
}

const stateCity: stateCityProps = {
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
};

export const reducer = createReducer(stateCity, (builder) => {
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
    });
});
