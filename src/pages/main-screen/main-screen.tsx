import PlaceCardList from '../../components/place-list/place-list.tsx';
import Header from '../../components/header/header.tsx';
import Map from '../../components/map/map.tsx';
import {useState} from 'react';
import CityList from '../../components/list-of-cities/list-of-cities.tsx';
import Cities from '../../mocks/cities.ts';
import {useAppSelector} from '../../hooks';
import getPlacesLabel from '../../structure/get-places.ts';
import SortOptions, {SortType} from '../../components/sort-options/sort-options.tsx';


function MainScreen(): JSX.Element {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [currentSort, setCurrentSort] = useState<SortType>('Popular');

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
              <SortOptions currentSort={currentSort} onSortChange={setCurrentSort}/>
              <PlaceCardList onListItemHover={setActiveId} sortType={currentSort}/>
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
