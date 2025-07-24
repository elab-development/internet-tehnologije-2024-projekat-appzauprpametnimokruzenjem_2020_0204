import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <main style={{ paddingLeft: '6rem', paddingRight: '6rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;