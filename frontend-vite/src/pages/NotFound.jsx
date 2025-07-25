import React from 'react';
import icon from '../assets/emojis/moai_1f5ff.png';

const NotFound = () => {
  return (
    <div className="distant-container">
      <div
        className="radial-gradient-bg animate-pulse-bg absolute"
        style={{
          bottom: -100,
          left: '50%',
          transform: 'translateX(-50%) translateY(50%)',
        }}
      ></div>
      <div className="distant-icon-wrapper">
        <img
          src={icon}
          alt="Construction Icon"
          className="w-24 h-24"
        />
      </div>
      <h1 className="distant-title">UPS!</h1>
      <p className="distant-message">Stranica nije pronađena.</p>
    </div>
  );
};

export default NotFound;