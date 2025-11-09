import {Offer} from '../types/offer.ts';

export const Offers: Offer[] = [
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4,
    previewImage: '/img/apartment-01.jpg',
  },
  {
    id: '2bcd4a31-f0e5-4b1a-93f9-4fa60a874c42',
    title: 'Modern apartment in city center',
    type: 'apartment',
    price: 150,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: true,
    rating: 4.8,
    previewImage: '/img/apartment-02.jpg',
  },
  {
    id: 'ad07a3a9-3f83-46f8-9f38-9b1d15a7eeb4',
    title: 'Cozy house by the canal',
    type: 'house',
    price: 200,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 16,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.9,
    previewImage: '/img/apartment-03.jpg',
  },
  {
    id: 'bedca8ed-f56b-4048-844b-f16edf6a90ee',
    title: 'Amazing and Extremely Central Flat',
    type: 'hotel',
    price: 362,
    previewImage: '/img/room.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13
      }
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 16
    },
    isFavorite: false,
    isPremium: false,
    rating: 3.8
  },
];
