import css from './CastCard.module.css';

const CastCard = ({ cast }) => {
  return (
    <div className={css.wrapper}>
      <img
        className={css.photo}
        src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
        alt="img"
      />
      <p>
        <span className={css.name}>Name: </span>
        {cast.name}
      </p>
      <p>
        <span className={css.character}>Character: </span> {cast.character}
      </p>
    </div>
  );
};

export default CastCard;
