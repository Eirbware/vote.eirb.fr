import { useEffect, useState } from 'react';

import { useFetchApi } from '@/utils';
import { Admin, FakeAdmin } from '@/pages';

export const ProtectedAdminRoute = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const { fetchApi } = useFetchApi();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetchApi('auth/me');
        setIsAdmin(response.admin);
      } catch {
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, [fetchApi]);

  return <>{isAdmin ? <Admin /> : <FakeAdmin />}</>;
};
