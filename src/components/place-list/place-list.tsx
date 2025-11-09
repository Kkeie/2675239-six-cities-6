import PlaceCard from '../place-card/place-card.tsx';
import {useState} from 'react';
import {Offer} from '../../types/offer.ts';

type placeListProps = {
  places: Offer[];
  onListItemHover: (id: string) => void;
}

function PlaceList({places, onListItemHover}: placeListProps) {
  const [, setActiveId] = useState<string | null>(null);
  const handleMouseEnter = (id: string) => {
    setActiveId(id);
    onListItemHover(id);
  };

  const handleMouseLeave = () => {
    setActiveId(null);
    onListItemHover('');
  };

  return (

    <div className="cities__places-list places__list tabs__content">
      {places.map((place) => (
        <PlaceCard
          id={place.id}
          key={place.id}
          previewImage={place.previewImage}
          isPremium={place.isPremium}
          isFavorite={place.isFavorite}
          price={place.price}
          title={place.title}
          type={place.type}
          onMouseEnter={() => handleMouseEnter(place.id)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}

export default PlaceList;
