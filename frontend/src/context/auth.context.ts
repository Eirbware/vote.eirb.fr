import { createContext } from 'react';

interface AuthContextType {
  jwt: string | null;
  setJwt: (token: string | null) => void;
  logout: () => void;
  isLoggedIn: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType>({
  jwt: null,
  setJwt: () => {},
  logout: () => {},
  isLoggedIn: () => Promise.resolve(false),
});
