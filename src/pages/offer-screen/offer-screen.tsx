import ReviewForm from '../../components/form-review/form-review.tsx';
import {Navigate, useParams} from 'react-router-dom';
import Header from '../../components/header/header.tsx';
import ReviewsList from '../../components/rev-list/rev-list.tsx';
import Map from '../../components/map/map.tsx';
import {useState, useEffect} from 'react';
import NearbyPlacesList from '../../components/near-places/near-places.tsx';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {fetchOfferAction, fetchNearbyOffersAction, fetchCommentsAction} from '../../store/action.ts';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import Spinner from '../../components/spinner/spinner.tsx';

function OfferScreen(): JSX.Element {
  const {id} = useParams<{id: string}>();
  const dispatch = useAppDispatch();
  const offer = useAppSelector((state) => state.currentOffer);
  const nearbyOffers = useAppSelector((state) => state.nearbyOffers);
  const comments = useAppSelector((state) => state.comments);
  const isOfferLoading = useAppSelector((state) => state.isOfferLoading);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchNearbyOffersAction(id));
      dispatch(fetchCommentsAction(id));
    }
  }, [id, dispatch]);

  if (isOfferLoading) {
    return (
      <div className="page">
        <Header isMain={false}/>
        <main className="page__main page__main--offer">
          <Spinner />
        </main>
      </div>
    );
  }

  if (!offer) {
    return <Navigate to={AppRoute.NotFound} />;
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
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                <ReviewsList reviews={comments}/>
                {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm offerId={id || ''} />}
              </section>
            </div>
          </div>
          <Map activeId={activeId} className="offer"/>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearbyPlacesList places={nearbyOffers} onListItemHover={setActiveId}/>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
