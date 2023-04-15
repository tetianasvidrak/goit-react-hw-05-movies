import MovieDetails from 'components/MovieDetails';
import { Link, NavLink } from 'react-router-dom';
import css from './List.module.css';

const List = ({ movies }) => {
  return (
    <ul className={css.list}>
      {movies?.results?.length &&
        movies.results.map(movie => (
          <li key={movie.id}>
            <Link className={css.movie} to={`movies/${movie.id}`}>
              {movie.title}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default List;
