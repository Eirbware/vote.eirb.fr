import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from '@router/router';

import '@styles/main.css';
import { AuthProvider } from './provider/auth.provider';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
