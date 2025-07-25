import React from 'react';
import icon from '../assets/emojis/construction_1f6a7.png';

const Unautherized = () => {
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
          style={{ width: '96px', height: '96px' }}
        />
      </div>
      <h1 className="distant-title">UPS!</h1>
      <p className="distant-message">Nemate pristup ovoj stranici.</p>
    </div>
  );
};

export default Unautherized;