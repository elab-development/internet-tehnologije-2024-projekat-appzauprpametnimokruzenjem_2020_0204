import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: '#333',
      padding: '10px',
      color: '#fff',
      display: 'flex',
      gap: '20px'
    }}>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Početna</Link>
      <Link to="/uredjaji" style={{ color: '#fff', textDecoration: 'none' }}>Uređaji</Link>
      <Link to="/sobe" style={{ color: '#fff', textDecoration: 'none' }}>Sobe</Link>
      <Link to="/logovi" style={{ color: '#fff', textDecoration: 'none' }}>Logovi</Link>
      <Link to="/korisnici" style={{ color: '#fff', textDecoration: 'none' }}>Korisnici</Link>
    </nav>
  );
};

export default Navbar;