import Main from '../pages/Main';
import Movies from '../pages/Movies';
import NotFound from '../pages/NotFound';

const routes = [
  {
    path: 'home',
    component: Main,
    widgets: ['Menu']
  },
  {
    path: 'movies',
    component: Movies,
    widgets: ['Menu']
  },
  {
    path: '$',
    // component: Splash
    component: Main,
    // widgets: ['MenuWithBackButton']
    widgets: ['Menu']
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
