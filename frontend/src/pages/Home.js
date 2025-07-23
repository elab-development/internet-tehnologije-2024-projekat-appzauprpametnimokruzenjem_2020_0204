import React from 'react';
import Loading from '../components/Loading';
import logo from '../assets/main/logo.png';

const Home = () => {
  return (
    <div style={{ textAlign: 'left', marginTop: '2rem', marginLeft: '2rem' }}>
      <img src={logo} alt="Chuwar Logo" style={{ width: '30vh', height: 'auto' }} />
    </div>
  );
};

export default Home;