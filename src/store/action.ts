import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {Offer} from '../types/offer.ts';
import {City} from '../types/city.ts';
import {AxiosInstance} from 'axios';
import {AppDispatch, State} from '../types/state.ts';
import {AuthorizationStatus} from '../const.ts';
import {AuthInfo, LoginData} from '../types/auth.ts';


export const changeCityAction = createAction('changeCity', (city: City) => ({
  payload: city,
}));
export const fillPlacesAction = createAction('fillPlaces', (places : Offer[]) => ({
  payload: places
}));

export const requireAuthorizationAction = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setUserAction = createAction<AuthInfo | null>('user/setUser');

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

export const checkAuthAction = createAsyncThunk<AuthInfo, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<AuthInfo>('/login');
    return data;
  },
);

export const loginAction = createAsyncThunk<AuthInfo, LoginData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {extra: api}) => {
    const {data} = await api.post<AuthInfo>('/login', {email, password});
    return data;
  },
);

export const logoutAction = createAction('user/logout');
