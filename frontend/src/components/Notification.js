// src/components/Notification.js
import React, { useState, useEffect } from 'react';

const Notification = ({ message }) => {
  const [slideIn, setSlideIn] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const slideDelay = 0;
    const fadeDelay = 4000;        

    // reset states
    setSlideIn(false);
    setFadeOut(false);

    // timer for slide-in
    const slideTimer = setTimeout(() => {
      setSlideIn(true);
    }, slideDelay);

    // timer for fade-out: slideDelay + fadeDelay
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, slideDelay + fadeDelay);

    return () => {
      clearTimeout(slideTimer);
      clearTimeout(fadeTimer);
    };
  }, [message]);

  if (!message) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '70px',
      right: '20px',
      background: '#282828df',
      color: '#fff',
      fontWeight: 'bold',
      padding: '1rem 2rem',
      borderRadius: '20px',
      boxShadow: '10 10 5px 6px rgba(0,0,0,0.1)',
      zIndex: 1000,
      transform: slideIn ? 'translateX(0)' : 'translateX(100%)',
      opacity: fadeOut ? 0 : 1,
      transition: 'transform 0.3s ease-out, opacity 0.5s ease-out',
    }}>
      {message}
    </div>
  );
};

export default Notification;