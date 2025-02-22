import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@/hooks';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoggedIn } = useAuth();

  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    async function checkAuth() {
      const loggedIn = await isLoggedIn();
      setAuthorized(loggedIn);
    }
    checkAuth();
  }, [isLoggedIn]);

  if (authorized === null) {
    return (
      <div className="flex flex-col h-full w-full italic text-center items-center">
        Loading...
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
