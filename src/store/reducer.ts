import { createReducer } from '@reduxjs/toolkit';
import {changeCityAction, fillPlacesAction, fetchOffersAction, requireAuthorizationAction, setUserAction, loginAction, checkAuthAction, logoutAction} from './action.ts';
import {Offer} from '../types/offer.ts';
import { City } from '../types/city.ts';
import {AuthorizationStatus} from '../const.ts';
import {AuthInfo} from '../types/auth.ts';
import {saveToken, dropToken} from '../services/api.ts';

type stateCityProps = {
  city: City;
  places: Offer[];
  allOffers: Offer[];
  isLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: AuthInfo | null;
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
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
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
    })
    .addCase(requireAuthorizationAction, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserAction, (state, action) => {
      state.user = action.payload;
    })
    .addCase(checkAuthAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.authorizationStatus = AuthorizationStatus.Auth;
    })
    .addCase(checkAuthAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(loginAction.fulfilled, (state, action) => {
      saveToken(action.payload.token);
      state.user = action.payload;
      state.authorizationStatus = AuthorizationStatus.Auth;
    })
    .addCase(loginAction.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(logoutAction, (state) => {
      dropToken();
      state.user = null;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});
