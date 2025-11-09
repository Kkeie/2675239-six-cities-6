import FormReview from '../../components/form-review/form-review.tsx';
import {Navigate} from 'react-router-dom';
import {InfoOfOffer} from '../../types/info-of-offer.ts';
import Header from '../../components/header/header.tsx';
import RevList from '../../components/rev-list/rev-list.tsx';
import Map from '../../components/map/map.tsx';
import {Offers} from '../../mocks/offers.ts';
import {useState} from 'react';
import {Location} from '../../types/location.ts';
import NearPlaces from '../../components/near-places/near-places.tsx';

function OfferScreen(): JSX.Element {
  const offer: InfoOfOffer = {
    id: '1',
    title: 'asdsaf',
    type: 'Apartment',
    price: 100,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.3676,
        longitude: 4.9041,
        zoom: 12,
      },
    },
    location: {
      latitude: 52.3676,
      longitude: 4.9041,
      zoom: 12,
    },
    isFavorite: true,
    isPremium: false,
    rating: 2,
    description: 'A cozy and modern apartment in the city center.',
    bedrooms: 2,
    goods: ['WiFi', 'Air conditioning', 'Parking'],
    host: {
      name: 'bob',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    images: ['img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg'],
    maxAdults: 3,
  };

  const reviews = [
    {
      id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
      date: '2019-05-08T14:13:56.569Z',
      user: {
        name: 'kennyS',
        avatarUrl: 'markup/img/avatar-max.jpg',
        isPro: false
      },
      comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
      rating: 4
    },
    {
      id: 'b67ddfd5-b953-2a50-8c8d-bd083cd6b62a',
      date: '2025-10-10T14:13:56.569Z',
      user: {
        name: 'biba',
        avatarUrl: 'markup/img/avatar.svg',
        isPro: false
      },
      comment: 'blaahlbahablah best blahblahblahh',
      rating: 4
    },
    {
      id: 'b67241fd5-b953-2a50-8c8d-bd083cd6b62a',
      date: '2025-10-10T14:13:56.569Z',
      user: {
        name: 'boba',
        avatarUrl: 'markup/img/avatar.svg',
        isPro: false
      },
      comment: 'blahbahbablab',
      rating: 5
    }
  ];

  const nearOffers = structuredClone(Offers).slice(0, 3);
  const locations = nearOffers.map((i) => i.location);

  const [selectedPoint, setSelectedPoint] = useState<Location | null>(null);

  const handleListItemHover = (id: string) => {
    const currentLocation = nearOffers.find((i) => i.id === id);
    setSelectedPoint(currentLocation?.location ?? null);
  };

  if (offer === null) {
    return <Navigate to="/404" />;
  }
  return (
    <div className="page">
      <Header isMain={false}/>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {
                offer.images.map((picture) => (
                  <div className="offer__image-wrapper" key={picture}>
                    <img className="offer__image" src={picture} alt="Photo studio"/>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {
                offer.isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>

              }
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${offer.rating * 100 / 5}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {`${offer.bedrooms} Bedroom${offer.bedrooms > 1 ? 's' : ''}`}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {
                    offer.goods.map((elem) => (
                      <li className="offer__inside-item" key={elem}>
                        {elem}
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div
                    className={`offer__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}
                  >
                    <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">
                    {offer.host.name}
                  </span>
                  {
                    offer.host.isPro &&
                    <span className="offer__user-status">
                    Pro
                    </span>
                  }

                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <RevList reviews={reviews}/>
                <FormReview/>
              </section>
            </div>
          </div>
          <Map locations={locations} city={offer.city.location} selectedPoint={selectedPoint} className="offer"/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearPlaces places={nearOffers} onListItemHover={handleListItemHover}/>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
