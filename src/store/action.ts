import { createAction } from '@reduxjs/toolkit';
import {Offer} from '../types/offer.ts';
import {City} from '../types/city.ts';


export const changeCityAction = createAction('changeCity', (city: City) => ({
  payload: city,
}));
export const fillPlacesAction = createAction('fillPlaces', (places : Offer[]) => ({
  payload: places
}));
