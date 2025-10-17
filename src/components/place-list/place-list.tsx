import PlaceCard from '../place-card/place-card.tsx';
import {Place} from '../../types';
import {useState} from 'react';

type placeListProps = {
  count: number;
  places: Place[];
}

function PlaceList({count, places}: placeListProps) {
  const items = places.slice(0, count);

  const [, setActiveId] = useState<string | null>(null);

  const handleMouseEnter = (id: string) => {
    setActiveId(id);
  };

  const handleMouseLeave = () => {
    setActiveId(null);
  };

  return (

    <div className="cities__places-list places__list tabs__content">
      {items.map((place) => (
        <PlaceCard
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

export default PlaceList;
