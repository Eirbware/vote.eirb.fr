import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Vote, Results, Login } from '@/pages';
import { Layout } from './Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Vote />,
      },
      {
        path: 'results',
        element: <Results />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
]);

export { router };
