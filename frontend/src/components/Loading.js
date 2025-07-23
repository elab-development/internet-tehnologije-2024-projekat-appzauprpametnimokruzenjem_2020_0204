import React from 'react';

const Loading = () => {
  const spinnerStyle = {
    width: '48px',
    height: '48px',
    border: '20px solid #eee',
    borderTop: '20px solid #64DED2',
    borderRadius: '100%',
    animation: 'spin 1s linear infinite',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
  };

  const textStyle = {
    marginTop: '20px',
    fontSize: '15px',
    color: '#444',
  };

  return (
    <div style={containerStyle}>
      <div style={spinnerStyle} />
      <p style={textStyle}>Učitavanje...</p>

      {/* Keyframes animation direktno kroz style tag */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loading;