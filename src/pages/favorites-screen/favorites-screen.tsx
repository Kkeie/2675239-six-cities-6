import Favorites from '../../components/favourite/favourite.tsx';
import Footer from '../../components/fotter/fotter.tsx';
import Header from '../../components/header/header.tsx';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {fetchFavoriteOffersAction} from '../../store/action.ts';
import {useEffect} from 'react';
import {getAllOffers} from '../../store/selectors.ts';

function FavoritesScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const allOffers = useAppSelector(getAllOffers);
  const favoriteOffers = allOffers.filter((offer) => offer.isFavorite);

  useEffect(() => {
    dispatch(fetchFavoriteOffersAction());
  }, [dispatch]);

  if (favoriteOffers.length === 0) {
    return (
      <div className="page page--favorites-empty">
        <Header isMain={false}/>
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          </div>
        </main>
        <Footer/>
      </div>
    );
  }

  return (
    <div className="page">
      <Header isMain={false}/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <Favorites places={favoriteOffers}/>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default FavoritesScreen;

