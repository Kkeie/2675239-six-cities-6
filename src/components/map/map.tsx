import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useEffect, useRef, useMemo} from 'react';
import useMap from '../../hooks/use-map.ts';
import {URL_MARKER_DEFAULT, URL_MARKER_ACTIVE} from '../../const.ts';
import {useAppSelector} from '../../hooks';
import {getCity, getPlaces} from '../../store/selectors.ts';
import {Location} from '../../types/location.ts';

type mapProps = {
  activeId: string | null;
  className: string;
  locations?: Location[];
  city?: Location;
  selectedPoint?: Location | null;
}

function Map({activeId, className, locations, city, selectedPoint}: mapProps): JSX.Element {
  const mapRef = useRef(null);
  const currentCity = useAppSelector(getCity);
  const currentPlaces = useAppSelector(getPlaces);
  const map = useMap(mapRef, city || currentCity.location);

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

      if (locations && city) {
        locations.forEach((point) => {
          leaflet
            .marker({
              lat: point.latitude,
              lng: point.longitude,
            }, {
              icon: defaultCustomIcon,
            })
            .addTo(map);
        });

        if (selectedPoint) {
          leaflet
            .marker({
              lat: selectedPoint.latitude,
              lng: selectedPoint.longitude,
            }, {
              icon: activeCustomIcon,
            })
            .addTo(map);
        }
      } else {
        currentPlaces.forEach((offer) => {
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
    }
  }, [map, defaultCustomIcon, activeCustomIcon, locations, currentPlaces, activeId, selectedPoint, city]);

  return (
    <section className={`${className}__map`} ref={mapRef}></section>
  );
}

export default Map;

