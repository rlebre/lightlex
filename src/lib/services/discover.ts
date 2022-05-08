import { MovieSummary } from '../models/movie';
import { TvShowSummary } from '../models/tvShow';
import api from './api';

export const getDiscoverMovies = () =>
  api.get<{ results: MovieSummary[] }>(`/discover/movie`).then((res) => res.data.results);

export const getDiscoverTv = () =>
  api.get<{ results: TvShowSummary[] }>(`/discover/tv`).then((res) => res.data.results);
