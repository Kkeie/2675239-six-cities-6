import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeCityAction, fillPlacesAction} from '../../store/action.ts';
import {City} from '../../types/city.ts';
import {Offers} from '../../mocks/offers.ts';

type CityListProps = {
  cities: City[];
}

function CityList({cities}: CityListProps) {
  const citiesNames = cities.map((city) => city.name);
  const currentCity = useAppSelector((state) => state.city);

  const cityMap = Object.fromEntries(
    cities.map((city) => [city.name, city])
  );

  const dispatch = useAppDispatch();

  const cityClickHandle = (cityName: City['name']) => {
    dispatch(changeCityAction(cityMap[cityName]));
    dispatch(fillPlacesAction(Offers.filter((offer) => offer.city.name === cityName)));
  };


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
