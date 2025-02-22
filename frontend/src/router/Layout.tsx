import { Outlet } from 'react-router-dom';

import { Footer, Header } from '@/components';

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen p-4">
      <Header />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
