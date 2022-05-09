import { getDiscoverMovies } from '../lib/services/discover';
import { getMovieDetails, getNowPlayingMovies, getPopularMovies } from '../lib/services/movies';
import { getOnTheAirTvShows } from '../lib/services/tv';
import Details from '../pages/Details';
import Main from '../pages/Main';
import NotFound from '../pages/NotFound';
import Splash from '../pages/Splash';

const routes = [
  {
    path: 'home',
    before: async (page: { tmdbData: any }) => {
      page.tmdbData = await getNowPlayingMovies();
    },
    component: Main,
    widgets: ['Menu']
  },
  {
    path: 'movie/:movieId',
    before: async (page: { tmdbData: any }, { movieId }: { movieId: string }) => {
      page.tmdbData = await getMovieDetails(movieId);
    },
    component: Details,
    widgets: ['MenuWithBackButton']
  },
  {
    path: 'movies',
    // component: Movies,
    before: async (page: { tmdbData: any }) => {
      page.tmdbData = await getPopularMovies();
    },
    component: Main,
    widgets: ['Menu']
  },
  {
    path: 'livetv',
    // component: LiveTV,
    before: async (page: { tmdbData: any }) => {
      page.tmdbData = await getOnTheAirTvShows();
    },
    component: Main,
    widgets: ['Menu']
  },
  {
    path: 'discover',
    //component: Discover,
    before: async (page: { tmdbData: any }) => {
      page.tmdbData = await getDiscoverMovies();
    },
    component: Main,
    widgets: ['Menu']
  },
  {
    path: '$',
    component: Splash,
    widgets: []
  },
  {
    path: '*',
    component: NotFound
  }
];

export default {
  root: routes[0].path,
  routes
};
