// src/components/Navbar.js
import { Link, redirect, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import logo from '../assets/main/favicon.png';
import useIsAdmin from '../hooks/useIsAdmin';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import { useLocation } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const isAdmin = useIsAdmin();
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    if (localStorage.getItem("justRegistrated") === "true") {
      localStorage.removeItem("justRegistrated");
      window.location.reload();
    }
  }, []);

  const handleLogout = () => {
    const confirmed = window.confirm("❗ Da li si siguran da želiš da se odjaviš?");
    if (confirmed) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("loginSuccess");
      localStorage.removeItem('userName');
      localStorage.removeItem("userRole");
      localStorage.setItem('logoutSuccess', true);
      // navigate("/");
      navigate("/login");
    }
  };

  return (
    <nav className={`nav-wrapper ${isAdmin ? 'bg-[#64DED2]' : 'bg-[#326F69]'}`}>
      <div className="flex gap-6 pl-6">
        {isAdmin ? (
          <>
            <Link to="/admin" className="nav-link text-[#326F69]">Dashboard</Link>
            <Link to="/devices" className="nav-link text-[#326F69]">Uređaji</Link>
            <Link to="/rooms" className="nav-link text-[#326F69]">Sobe</Link>
            <Link to="/logs" className="nav-link text-[#326F69]">Logovi</Link>
            <Link to="/users" className="nav-link text-[#326F69]">Korisnici</Link>
          </>
        ) : (
          <>
            <Link to="/" className="nav-link">Početna</Link>
            <Link to="/my-devices" className="nav-link">Moji uređaji</Link>
          </>
        )}
      </div>
      <div className="flex items-center gap-4">
        {isLoggedIn && userName && (
          <span className={`${isAdmin ? 'text-[#326F69]/70' : 'text-white/50'}`}>
            {userName}
          </span>
        )}
        {isLoggedIn ? (
          <span
            onClick={handleLogout}
            className={`nav-lin cursor-pointer font-bold ${isAdmin ? 'text-[#326F69]' : 'text-[#F5F5F5]'}`}
          >
            Log Out
          </span>
        ) : (
          <Link to="/login" className="nav-link">Log In</Link>
        )}

        <div className="w-[30px] h-[30px] bg-[#444] rounded-full overflow-hidden flex items-center justify-center">
          <img
            src={logo}
            alt="Logo"
            className="w-full h-full cursor-pointer"
            onClick={() => {
              navigate('/');
              window.location.reload();
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;