import { ReactNode, useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';

import { AuthContext } from '@context/auth.context';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [jwt, setJwtState] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('jwt');
    }
    return null;
  });

  useEffect(() => {
    const storedJwt = localStorage.getItem('jwt');
    if (storedJwt) {
      setJwtState(storedJwt);
    }
  }, []);

  useEffect(() => {
    if (jwt) {
      localStorage.setItem('jwt', jwt);
    } else {
      localStorage.removeItem('jwt');
    }
  }, [jwt]);

  const setJwt = (token: string | null) => {
    setJwtState(token);
  };

  const logout = () => {
    setJwt(null);
    redirect('/login');
  };

  const isLoggedIn = async () => {
    if (!jwt) {
      return false;
    }

    try {
      const request = await fetch(`${import.meta.env.VITE_API_URL}auth/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return request.status === 200;
    } catch {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ jwt, setJwt, isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
