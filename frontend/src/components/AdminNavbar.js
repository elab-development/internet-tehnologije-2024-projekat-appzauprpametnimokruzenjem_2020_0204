// src/components/AdminNavbar.js
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../assets/main/favicon.png';

const AdminNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };

    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("load", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("load", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    const confirmed = window.confirm("❗ Da li si siguran da želiš da se odjaviš?");
    if (confirmed) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("welcome");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      navigate("/login");
    }
  };

  return (
    <nav style={{
      backgroundColor: '#282828',
      padding: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/admin" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
        <Link to="/devices" style={{ color: '#fff', textDecoration: 'none' }}>Uređaji</Link>
        <Link to="/rooms" style={{ color: '#fff', textDecoration: 'none' }}>Sobe</Link>
        <Link to="/logs" style={{ color: '#fff', textDecoration: 'none' }}>Logovi</Link>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {isLoggedIn ? (
          <span onClick={handleLogout} style={{ color: '#fff', textDecoration: 'none', cursor: 'pointer' }}>
            Log Out
          </span>
        ) : (
          <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Log In</Link>
        )}
        <div style={{ width: '30px', height: '30px', backgroundColor: '#444', borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={logo} alt="Admin" style={{ width: '100%', height: '100%', borderRadius: '0%' }} />
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;