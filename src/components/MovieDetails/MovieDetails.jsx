import ButtonBack from 'components/ButtonBack';
import Loader from 'components/Loader';
import { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getMovieId } from 'services/api';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus('pending');
    try {
      const fetchData = async () => {
        await getMovieId(movieId).then(movie => setMovie(movie));
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
      {status === 'resolved' && movie && (
        <>
          <ButtonBack />
          <div className={css.wrapper}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
              alt="poster"
            />
            <div className={css.desc}>
              <h1>{`${movie.title} (${new Date(
                movie.release_date
              ).getFullYear()})`}</h1>
              <p>User Score: {Math.round(`${movie.popularity}`)}%</p>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
              <h2>Genres</h2>
              <p className={css.genre}>
                {movie.genres.map(genre => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </p>
            </div>
          </div>
          <div>
            <p>Additional information</p>
            <ul>
              <li>
                <Link to={`/movies/${movieId}/cast`}>Cast</Link>
              </li>
              <li>
                <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
              </li>
            </ul>
          </div>
          <Outlet />
        </>
      )}
    </>
  );
};

export default MovieDetails;
