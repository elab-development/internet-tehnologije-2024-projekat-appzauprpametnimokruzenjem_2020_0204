import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import UserNavbar from '../components/UserNavbar';

const MainLayout = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const role = JSON.parse(storedUser).role;
      setIsAdmin(role === 'admin');
    }
  }, []);

  return (
    <div>
      {isAdmin ? <AdminNavbar /> : <UserNavbar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;