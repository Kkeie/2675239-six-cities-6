import PlaceCardList from '../../components/place-list/place-list.tsx';
import Header from '../../components/header/header.tsx';
import Map from '../../components/map/map.tsx';
import {useState, useCallback} from 'react';
import CityList from '../../components/list-of-cities/list-of-cities.tsx';
import {Cities} from '../../const.ts';
import {useAppSelector} from '../../hooks';
import getPlacesLabel from '../../structure/get-places.ts';
import SortOptions, {SortType} from '../../components/sort-options/sort-options.tsx';
import Spinner from '../../components/spinner/spinner.tsx';
import {getIsLoading, getPlaces, getCity} from '../../store/selectors.ts';
import MainEmpty from '../../components/main-empty/main-empty.tsx';


function MainScreen(): JSX.Element {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [currentSort, setCurrentSort] = useState<SortType>('Popular');

  const isLoading = useAppSelector(getIsLoading);
  const places = useAppSelector(getPlaces);
  const city = useAppSelector(getCity);

  const handleListItemHover = useCallback((id: string | null) => {
    setActiveId(id);
  }, []);

  if (isLoading) {
    return (
      <div className="page page--gray page--main">
        <Header isMain/>
        <main className="page__main page__main--index">
          <Spinner />
        </main>
      </div>
    );
  }

  return (
    <div className="page page--gray page--main">
      <Header isMain/>

      <main className={`page__main page__main--index ${places.length === 0 ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <CityList cities={Cities}/>
        {places.length === 0 ? (
          <MainEmpty cityName={city.name} />
        ) : (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{getPlacesLabel(places.length)} to stay in {city.name}</b>
                <SortOptions currentSort={currentSort} onSortChange={setCurrentSort}/>
                <PlaceCardList onListItemHover={handleListItemHover} sortType={currentSort}/>
              </section>
              <div className="cities__right-section">
                <Map activeId={activeId} className="cities"/>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default MainScreen;
