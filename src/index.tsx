import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {Place} from './types';

const places: Place[] = [
  {
    id: 1,
    imgSrc: 'img/apartment-01.jpg',
    mark: 'Premium',
    priceValue: 120,
    priceText: 'night',
    description: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment'
  },
  {
    id: 2,
    imgSrc: 'img/room.jpg',
    priceValue: 80,
    priceText: 'night',
    description: 'Wood and stone place',
    type: 'Room'
  },
  {
    id: 3,
    imgSrc: 'img/apartment-02.jpg',
    priceValue: 132,
    priceText: 'night',
    description: 'Canal View Prinsengracht',
    type: 'Apartment'
  },
  {
    id: 4,
    imgSrc: 'img/apartment-03.jpg',
    mark: 'Premium',
    priceValue: 180,
    priceText: 'night',
    description: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment'
  },
  {
    id: 5,
    imgSrc: 'img/room.jpg',
    priceValue: 80,
    priceText: 'night',
    description: 'Wood and stone place',
    type: 'Room'
  },
];

const Setting = {
  PlacesCount: 5,
  Places: places,
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App placesCount={Setting.PlacesCount} places={Setting.Places} />
  </React.StrictMode>
);
