import { RouteConfig } from '@/types';
import { HomePage, UsersPage, UserDetailPage } from '@/pages';

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
    component: <UserDetailPage />,
  },
];
