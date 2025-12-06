import PlaceCardList from '../../components/place-list/place-list.tsx';
import Header from '../../components/header/header.tsx';
import Map from '../../components/map/map.tsx';
import {useState} from 'react';
import CityList from '../../components/list-of-cities/list-of-cities.tsx';
import Cities from '../../mocks/cities.ts';
import {useAppSelector} from '../../hooks';
import getPlacesLabel from '../../structure/get-places.ts';


function MainScreen(): JSX.Element {
  const [activeId, setActiveId] = useState<string | null>(null);

  const currentCity = useAppSelector((state) => state);

  return (
    <div className="page page--gray page--main">
      <Header isMain/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CityList cities={Cities}/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{getPlacesLabel(currentCity.places.length)} to stay in {currentCity.city.name}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <PlaceCardList onListItemHover={setActiveId}/>
            </section>
            <div className="cities__right-section">
              <Map activeId={activeId} className="cities"/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
