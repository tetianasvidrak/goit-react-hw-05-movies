import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMovies } from 'services/api';
import { Link } from 'react-router-dom';
import Loader from 'components/Loader';

export const Movies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setSearchParams({ filter: query });
    setQuery('');
  };

  useEffect(() => {
    const filterText = searchParams.get('filter') ?? '';
    setStatus('pending');
    try {
      const fetchData = async () => {
        await getMovies(filterText).then(movies => setMovies(movies.results));
      };

      fetchData();
      setStatus('resolved');
    } catch (error) {
      setError(error);
      setStatus('rejected');
    }
  }, [searchParams]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={query} onChange={handleChange} />
        <button type="submit">Search</button>
      </form>
      {status === 'pending' && <Loader />}
      {status === 'resolved' && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
