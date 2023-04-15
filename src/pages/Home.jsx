import Title from '../components/Title';
import List from '../components/List';
import { useEffect, useState } from 'react';
import { getTrending } from 'services/api';
import Loader from '../components/Loader';
import Error from '../components/Error';

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(movies);
  }, [movies]);

  useEffect(() => {
    setStatus('pending');
    try {
      const fetchData = async () => {
        await getTrending().then(movies => setMovies(movies));
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
      <Title title="Trending today" />
      {status === 'pending' && <Loader />}
      {status === 'resolved' && <List movies={movies} />}
      {status === 'rejected' && <Error error={error} />}
    </>
  );
};

// export default Home;
