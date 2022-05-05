import Main from '../pages/Main';
import Movies from '../pages/Movies';
import NotFound from '../pages/NotFound';

const routes = [
  {
    path: 'home',
    component: Main
  },
  {
    path: 'movies',
    component: Movies
  },
  {
    path: '$',
    // component: Splash
    component: NotFound
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
