import { Credits } from '../models/credits';
import { Movie, MovieSummary } from '../models/movie';
import api from './api';

export const getMovies = () => api.get(`/movies`);

export const getPopularMovies = () =>
  api.get<{ results: MovieSummary[] }>(`/movie/popular`).then((res) => res.data.results);

export const getTopRatedMovies = () =>
  api.get<{ results: MovieSummary[] }>(`/movie/top_rated`).then((res) => res.data.results);

export const getNowPlayingMovies = () =>
  api.get<{ results: MovieSummary[] }>(`/movie/now_playing`).then((res) => res.data.results);

export const getMovieDetails = async (id: string) => {
  const movieDetails = await api.get<Movie>(`/movie/${id}`).then((res) => res.data);
  const movieCast = await api.get<Credits>(`/movie/${id}/credits`).then((res) => res.data);

  return { ...movieDetails, ...movieCast };
};
