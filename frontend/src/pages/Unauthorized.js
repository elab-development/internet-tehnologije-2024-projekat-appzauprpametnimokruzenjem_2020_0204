import React from 'react';
import icon from '../assets/emojis/construction_1f6a7.png';

const Unautherized = () => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '16px',
    textAlign: 'center',
    boxSizing: 'border-box',
  };
  const iconWrapperStyle = {
    marginBottom: '24px',
  };
  const titleStyle = {
    fontSize: '4rem',
    fontWeight: 'bold',
    margin: 0,
  };
  const messageStyle = {
    fontSize: '1.25rem',
    marginTop: '16px',
    margin: 0,
  };

  return (
    <div style={containerStyle}>
      <div style={iconWrapperStyle}>
        <img
          src={icon}
          alt="Construction Icon"
          style={{ width: '96px', height: '96px' }}
        />
      </div>
      <h1 style={titleStyle}>UPS!</h1>
      <p style={messageStyle}>Nemate pristup ovoj stranici.</p>
    </div>
  );
};

export default Unautherized;