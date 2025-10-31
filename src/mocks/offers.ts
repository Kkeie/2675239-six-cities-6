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
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
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
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 8,
      },
    },
    location: {
      latitude: 50.940361,
      longitude: 6.970974,
      zoom: 8,
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
        latitude: 52.370216,
        longitude: 4.895168,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.369553,
      longitude: 4.853096,
      zoom: 8,
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.9,
    previewImage: '/img/apartment-03.jpg',
  },
];
