import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCast } from 'services/api';
import Loader from '../Loader';
import CastCard from './CastCard';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState();
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        await getCast(movieId).then(cast => setCast(cast));
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
      {status === 'resolved' && cast && (
        <ul>
          {cast.cast.map(item => (
            <CastCard key={item.id} cast={item} />
          ))}
        </ul>
      )}
    </>
  );
};

export default Cast;
