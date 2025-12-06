import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useEffect, useRef} from 'react';
import useMap from '../../hooks/use-map.ts';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const.ts';
import {useAppSelector} from '../../hooks';


type mapProps = {
  activeId: string | null;
  className: string;
}

function Map({activeId, className}: mapProps): JSX.Element {
  const mapRef = useRef(null);
  const currentCity = useAppSelector((state) => state);
  const map = useMap(mapRef, currentCity.city.location);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      currentCity.places.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.id === activeId)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, defaultCustomIcon, currentCustomIcon, currentCity.places, activeId]);

  return (
    <section className={`${className}__map`} ref={mapRef}></section>
  );
}

export default Map;
