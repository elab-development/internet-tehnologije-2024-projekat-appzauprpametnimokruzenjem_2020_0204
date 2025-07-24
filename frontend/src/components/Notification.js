// src/components/Notification.js
const Notification = ({ message }) => {
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
      zIndex: 1000
    }}>
      {message}
    </div>
  );
};

export default Notification;