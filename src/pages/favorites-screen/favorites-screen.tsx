import Favorites from '../../components/favourite/favourite.tsx';
import Footer from '../../components/fotter/fotter.tsx';
import Header from '../../components/header/header.tsx';
import {useAppSelector} from '../../hooks';

function FavoritesScreen(): JSX.Element {
  const offers = useAppSelector((state) => state.allOffers.filter((place) => place.isFavorite));

  return (
    <div className="page">
      <Header isMain={false}/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <Favorites places={offers}/>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default FavoritesScreen;

