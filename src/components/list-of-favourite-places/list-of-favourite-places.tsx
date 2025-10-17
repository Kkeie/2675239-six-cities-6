import {Place} from '../../types';
import {useState} from 'react';
import FavoritesPlaceCard from '../favourite-place-card/favourite-place-card.tsx';

type favoritePlaceListProps = {
  places: Place[];
}

function FavoritePlaceList({places}: favoritePlaceListProps) {
  const [, setActiveId] = useState<string | null>(null);

  const handleMouseEnter = (id: string) => {
    setActiveId(id);
  };

  const handleMouseLeave = () => {
    setActiveId(null);
  };

  return (

    <div className="favorites__places">
      {places.map((place) => (
        <FavoritesPlaceCard
          id={place.id}
          key={place.id}
          imgSrc={place.imgSrc}
          mark={place.mark}
          priceValue={place.priceValue}
          priceText={place.priceText}
          description={place.description}
          type={place.type}
          onMouseEnter={() => handleMouseEnter(place.id)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}

export default FavoritePlaceList;
