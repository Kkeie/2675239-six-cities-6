import {Rev} from '../../types/rev.ts';
import RevItem from '../item-rev/item-rev.tsx';
import {memo} from 'react';

type reviewsListProps = {
  reviews: Rev[];
}

const RevList = memo(({reviews} : reviewsListProps): JSX.Element => {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <RevItem rev={review} key={review.id} />
      ))}
    </ul>
  );
});

RevList.displayName = 'RevList';

export default RevList;
