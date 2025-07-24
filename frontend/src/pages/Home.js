import React from 'react';
import logo from '../assets/main/logo.png';
import WelcomePopup from '../components/WelcomePopup';

const Home = () => {
  return (
    <div style={{ textAlign: 'left', marginTop: '2rem', marginLeft: '2rem' }}>
      <img src={logo} alt="Chuwar Logo" style={{ width: '30vh', height: 'auto' }} />
      <WelcomePopup />
    </div>
  );
};

export default Home;