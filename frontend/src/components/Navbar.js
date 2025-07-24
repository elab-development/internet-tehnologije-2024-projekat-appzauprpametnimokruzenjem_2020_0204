// src/components/Navbar.js
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../assets/main/favicon.png';
import useIsAdmin from '../hooks/useIsAdmin';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const location = useLocation();

  useEffect(() => {
    const handleStorageChange = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);

      const storedUser = localStorage.getItem("userRole");
      if (storedUser) {
        setIsAdmin(storedUser === 'admin');
      } else {
        setIsAdmin(false);
      }

    };

    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("load", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("load", handleStorageChange);
    };
  }, []);

  useEffect(() => {
  if (localStorage.getItem("justRegistrated") === "true") {
    localStorage.removeItem("justRegistrated");
    window.location.reload(); // Forsira refresh da se navbar osveži
  }
}, []);

  const handleLogout = () => {
    const confirmed = window.confirm("❗ Da li si siguran da želiš da se odjaviš?");
    if (confirmed) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("loginSuccess");
      localStorage.removeItem('userName');
      localStorage.removeItem("userRole");
      localStorage.setItem('logoutSuccess',true);
      // navigate("/");
      navigate("/login");
      setIsLoggedIn(false);
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
        {isAdmin ? (
          <>
            <Link to="/admin" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</Link>
            <Link to="/devices" style={{ color: '#fff', textDecoration: 'none' }}>Uređaji</Link>
            <Link to="/rooms" style={{ color: '#fff', textDecoration: 'none' }}>Sobe</Link>
            <Link to="/logs" style={{ color: '#fff', textDecoration: 'none' }}>Logovi</Link>
            <Link to="/users" style={{ color: '#fff', textDecoration: 'none' }}>Korisnici</Link>
          </>
        ) : (
          <>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Početna</Link>
            <Link to="/my-devices" style={{ color: '#fff', textDecoration: 'none' }}>Moji uređaji</Link>
          </>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {isAdmin && userName && (
          <span style={{ color: '#ffffff55'}}>Admin View | {userName}</span>
        )}
        {isLoggedIn ? (
          <span onClick={handleLogout} style={{ color: '#fff', textDecoration: 'none', cursor: 'pointer' }}>
            Log Out
          </span>
        ) : (
          <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Log In</Link>
        )}
        <div style={{ width: '30px', height: '30px', backgroundColor: '#444', borderRadius: '50%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={logo} alt="User" style={{ width: '100%', height: '100%', borderRadius: '0%' }} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;