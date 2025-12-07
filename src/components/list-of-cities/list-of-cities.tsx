import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeCityAction} from '../../store/action.ts';
import {City} from '../../types/city.ts';
import {useMemo, useCallback} from 'react';
import {getCity} from '../../store/selectors.ts';

type CityListProps = {
  cities: City[];
}

function CityList({cities}: CityListProps) {
  const citiesNames = useMemo(() => cities.map((city) => city.name), [cities]);
  const currentCity = useAppSelector(getCity);

  const cityMap = useMemo(() => Object.fromEntries(
    cities.map((city) => [city.name, city])
  ), [cities]);

  const dispatch = useAppDispatch();

  const cityClickHandle = useCallback((cityName: City['name']) => {
    dispatch(changeCityAction(cityMap[cityName]));
  }, [dispatch, cityMap]);


  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {citiesNames.map((name) => (
            <li key={name} className="locations__item">
              <a className={`locations__item-link tabs__item ${currentCity.name === name ? 'tabs__item--active' : ''}`}
                onClick={() => cityClickHandle(name)}
              >
                <span>{name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}


export default CityList;
