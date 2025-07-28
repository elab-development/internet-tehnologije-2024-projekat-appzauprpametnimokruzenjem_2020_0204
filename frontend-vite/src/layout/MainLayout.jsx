// src/layout/MainLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main className="min-h-screen">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;