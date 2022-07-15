import Auth from '../pages/Auth/Auth';
import Home from '../pages/Home/Home';
import Profile from '../pages/Profile/Profile';

const ROUTES_LIST = [
  {
    path: '/',
    isProtected: false,
    key: 'AUTH_ROUTE',
    element: Auth,
  },
  {
    path: '/home',
    isProtected: true,
    key: 'HOME_ROUTE',
    element: Home,
  },
  {
    path: '/profile',
    isProtected: true,
    key: 'PROFILE_ROUTE',
    element: Profile,
  },
  {
    path: '*',
    isProtected: false,
    key: 'NOT_FOUND_ROUTE',
    element: () => <h1>Not found</h1>,
  },
];

export default ROUTES_LIST;
