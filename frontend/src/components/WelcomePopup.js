// src/components/WelcomePopup.js
import { useEffect, useState } from 'react';

const WelcomePopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const shouldShow = localStorage.getItem('welcome') === 'true';
    if (shouldShow) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        localStorage.removeItem('welcome');
      }, 10000);
    }
  }, []);

  if (!showPopup) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '60px',
      right: '20px',
      background: '#333',
      color: '#fff',
      padding: '2rem 2.5rem',
      borderRadius: '10px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
      zIndex: 1000
    }}>
      Dobro došao u svoj pametan dom! 🏡
    </div>
  );
};

export default WelcomePopup;