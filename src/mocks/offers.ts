import type { Offer } from '../types/offer';
import rawOffers from './offers.json';

export const Offers = rawOffers satisfies Offer[];
