import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Vote, Results, Login } from '@/pages';

import { Layout } from './Layout';
import ProtectedRoute from './ProtectedRoute';
import { ProtectedAdminRoute } from './ProtectedAdminRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <Vote />,
      },
      {
        path: 'results',
        element: <Results />,
      },
      {
        path: 'admin',
        element: <ProtectedAdminRoute />,
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
