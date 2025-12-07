import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useEffect, useRef, useMemo} from 'react';
import useMap from '../../hooks/use-map.ts';
import {URL_MARKER_DEFAULT, URL_MARKER_ACTIVE} from '../../const.ts';
import {useAppSelector} from '../../hooks';
import {getCity, getPlaces} from '../../store/selectors.ts';


type mapProps = {
  activeId: string | null;
  className: string;
}

function Map({activeId, className}: mapProps): JSX.Element {
  const mapRef = useRef(null);
  const city = useAppSelector(getCity);
  const places = useAppSelector(getPlaces);
  const map = useMap(mapRef, city.location);

  const defaultCustomIcon = useMemo(() => leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  }), []);

  const activeCustomIcon = useMemo(() => leaflet.icon({
    iconUrl: URL_MARKER_ACTIVE,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  }), []);

  useEffect(() => {
    if (map) {
      map.eachLayer((layer) => {
        if (layer instanceof leaflet.Marker) {
          map.removeLayer(layer);
        }
      });

      places.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.id === activeId)
              ? activeCustomIcon
              : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, defaultCustomIcon, activeCustomIcon, places, activeId]);

  return (
    <section className={`${className}__map`} ref={mapRef}></section>
  );
}

export default Map;

