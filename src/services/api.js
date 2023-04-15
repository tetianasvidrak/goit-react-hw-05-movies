import axios from 'axios';

const API_KEY = 'd1aa77323063c5357ccd1166c6b96307';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getTrending = async () => {
  let trending = await axios.get(`${BASE_URL}/trending/movie/day`, {
    params: { api_key: API_KEY },
  });
  return trending.data;
};

export const getMovieId = async id => {
  let movie = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: { api_key: API_KEY },
  });
  return movie.data;
};

export const getCast = async id => {
  let cast = await axios.get(`${BASE_URL}/movie/${id}/credits`, {
    params: { api_key: API_KEY },
  });
  return cast.data;
};

export const getReviews = async id => {
  let reviews = await axios.get(`${BASE_URL}/movie/${id}/reviews`, {
    params: { api_key: API_KEY },
  });
  return reviews.data;
};

export const getMovies = async query => {
  let movies = await axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, query },
  });
  return movies.data;
};
