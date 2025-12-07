import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {Offer} from '../types/offer.ts';
import {City} from '../types/city.ts';
import {AxiosInstance} from 'axios';
import {AppDispatch, State} from '../types/state.ts';


export const changeCityAction = createAction('changeCity', (city: City) => ({
  payload: city,
}));
export const fillPlacesAction = createAction('fillPlaces', (places : Offer[]) => ({
  payload: places
}));

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>('/offers');
    return data;
  },
);
