import {CityPlaces} from '../../types';
import CityWithFavorites from '../city-with-favourite/city-with-favourites.tsx';

type favoriteCityListProps = {
  cities: CityPlaces[];
}

function FavoriteCityList({cities} : favoriteCityListProps): JSX.Element {
  return (
    <ul className="favorites__list">
      {cities.map((city) => (
        // eslint-disable-next-line react/jsx-key
        <CityWithFavorites city={city.cityName} places={city.places}/>
      ))}
    </ul>
  );
}

export default FavoriteCityList;
