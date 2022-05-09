import { Credits } from '../models/credits';
import { TvShow, TvShowSummary } from '../models/tvShow';
import api from './api';

export const getPopularTvShows = () =>
  api.get<{ results: TvShowSummary[] }>(`/tv/popular`).then((res) => res.data.results);

export const getTopRatedTvShows = () =>
  api.get<{ results: TvShowSummary[] }>(`/tv/top_rated`).then((res) => res.data.results);

export const getOnTheAirTvShows = () =>
  api.get<{ results: TvShowSummary[] }>(`/tv/on_the_air`).then((res) => res.data.results);

export const getTvShowDetails = async (id: string) => {
  const tvShowDetails = await api.get<TvShow>(`/tv/${id}`).then((res) => res.data);
  const tvShowCast = await api.get<Credits>(`/tv/${id}/credits`).then((res) => res.data);

  return { ...tvShowDetails, ...tvShowCast };
};
