import CityFavorites from '../list-of-favourite-cities/list-of-favourite-cities.tsx';
import {Offer} from '../../types/offer.ts';

type favoritesProps = {
  places: Offer[];
}

function Favorites({places} : favoritesProps): JSX.Element {
  const placesByCity = places.reduce<Record<string, Offer[]>>((acc, offer) => {
    const city = offer.city.name;
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(offer);
    return acc;
  }, {});

  return (
    <ul className="favorites__list">
      {Object.entries(placesByCity).map(([city, cityPlaces]) => (
        <CityFavorites city={city} places={cityPlaces} key={city}/>
      ))}
    </ul>
  );
}

export default Favorites;
