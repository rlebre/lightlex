import { getDiscoverMovies } from '../lib/services/discover';
import Details from '../pages/Details';
import Discover from '../pages/Discover';
import LiveTV from '../pages/LiveTv';
import Main from '../pages/Main';
import Movies from '../pages/Movies';
import NotFound from '../pages/NotFound';

const routes = [
  {
    path: 'home',
    component: Main,
    before: async (page: { tmdbData: any }) => {
      page.tmdbData = await getDiscoverMovies();
    },
    widgets: ['Menu']
  },
  {
    path: 'movies',
    component: Movies,
    widgets: ['Menu']
  },
  {
    path: 'livetv',
    component: LiveTV,
    widgets: ['Menu']
  },
  {
    path: 'discover',
    component: Discover,
    widgets: ['Menu']
  },
  {
    path: 'movie/:id',
    component: Details,
    widgets: ['MenuWithBackButton']
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
