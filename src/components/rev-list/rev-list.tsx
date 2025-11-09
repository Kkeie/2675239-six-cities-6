import {Rev} from '../../types/rev.ts';
import RevItem from '../item-rev/item-rev.tsx';

type reviewsListProps = {
  reviews: Rev[];
}

function RevList({reviews} : reviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <RevItem rev={review} key={review.id} />
      ))}
    </ul>
  );
}

export default RevList;
