import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getReviews } from 'services/api';
import Loader from '../Loader';
import ReviewItem from '../ReviewItem';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState();
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        await getReviews(movieId).then(reviews => setReviews(reviews));
      };

      fetchData();
      setStatus('resolved');
    } catch (error) {
      setError(error);
      setStatus('rejected');
    }
  }, []);

  return (
    <>
      {status === 'pending' && <Loader />}
      {status === 'resolved' && reviews && (
        <ul>
          {reviews.results.length ? (
            reviews.results.map(review => (
              <ReviewItem key={review.id} review={review} />
            ))
          ) : (
            <div>Sorry, there are no reviews</div>
          )}
        </ul>
      )}
    </>
  );
};

export default Reviews;
