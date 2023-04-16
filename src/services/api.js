import axios from 'axios';

const API_KEY = 'd1aa77323063c5357ccd1166c6b96307';
const BASE_URL = 'https://api.themoviedb.org/3';
axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: API_KEY,
};

export const getTrending = async () => {
  const trending = await axios.get(`/trending/movie/day`);
  return trending.data;
};

export const getMovieId = async id => {
  const movie = await axios.get(`/movie/${id}`);
  return movie.data;
};

export const getCast = async id => {
  const cast = await axios.get(`/movie/${id}/credits`);
  return cast.data;
};

export const getReviews = async id => {
  const reviews = await axios.get(`/movie/${id}/reviews`);
  return reviews.data;
};

export const getMovies = async query => {
  const movies = await axios.get(`/search/movie`, {
    params: { query },
  });
  return movies.data;
};
