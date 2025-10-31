import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {Offers} from './mocks/offers.ts';

const Setting = {
  Places: Offers,
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={Setting.Places}/>
  </React.StrictMode>
);
