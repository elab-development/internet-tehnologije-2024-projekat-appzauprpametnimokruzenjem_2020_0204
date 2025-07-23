import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';

const MainLayout = () => {
  return (
    <>
      <AdminNavbar />
      <main style={{ padding: '5re' }}>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;