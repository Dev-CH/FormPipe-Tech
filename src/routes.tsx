import { RouteConfig } from '@/types';
import { HomePage, UsersPage } from '@/pages';

export const routeConfig: RouteConfig[] = [
  {
    path: '/',
    component: <HomePage />,
  },
  {
    path: '/users',
    component: <UsersPage />,
  },
  {
    path: '/users/view/:id',
    component: <p>Not yet implemented</p>,
  },
  {
    path: '/users/edit/:id',
    component: <p>Not yet implemented</p>,
  },
];
