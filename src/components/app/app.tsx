import MainScreen from '../../pages/main-screen/main-screen';
import type {Place} from '../../types';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import LoginScreen from '../../pages/login-screen/login-screen.tsx';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen.tsx';
import OfferScreen from '../../pages/offer-screen/offer-screen.tsx';
import NotFoundScreen from '../../pages/not_found_screen/not_found_screen.tsx';
import PrivateRoute from '../private_route/private_route.tsx';

type AppProps = {
  placesCount: number;
  places: Place[];
}

const authStatus = AuthorizationStatus.NoAuth;

function App(props: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen placesCount={props.placesCount} places={props.places} />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authStatus}>
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offers}
          element={<OfferScreen />}
        />
        <Route
          path='*'
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
