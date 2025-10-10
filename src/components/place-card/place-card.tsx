type PlaceCardProps = {
  imgSrc: string;
  mark: string | undefined;
  priceValue: number;
  priceText: string;
  description: string;
  type: string;
}

function PlaceCard(props : PlaceCardProps): JSX.Element {
  return (
    <article className="cities__card place-card">
      <div className="place-card__mark">
        <span>{props.mark}</span>
      </div>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={props.imgSrc} width="260" height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{props.priceValue}</b>
            <span className="place-card__price-text">&#47;&nbsp;{props.priceText}</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: '80%'}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{props.description}</a>
        </h2>
        <p className="place-card__type">{props.type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
