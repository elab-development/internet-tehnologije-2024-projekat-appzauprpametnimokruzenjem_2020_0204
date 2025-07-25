import React, { useEffect } from 'react';
import logo from '../assets/main/logo.png';
import { useNotification } from '../context/NotificationContext';

const Home = () => {
  const { showNotification } = useNotification();

  useEffect(() => {
    if (localStorage.getItem("loginSuccess") === "true") {
      showNotification("Dobro došao u svoj pametan dom! 🪴");
      localStorage.removeItem("loginSuccess");
    }

    if (localStorage.getItem("registrationSuccess") === "true") {
      showNotification("Uspešno si se registrovao! 🎉");
      localStorage.removeItem("registrationSuccess");
    }
    const isLogout = localStorage.getItem("logoutSuccess") === "true";
    if (isLogout) {
      showNotification("Vidimo se kasnije! 👋");
      localStorage.removeItem("logoutSuccess");
    }
  }, []);

  return (
    <div style={{ textAlign: 'left', marginTop: '2rem', marginLeft: '2rem' }}>
      <img src={logo} alt="Chuwar Logo" style={{ width: '30vh', height: 'auto' }} />
    </div>
  );
};

export default Home;