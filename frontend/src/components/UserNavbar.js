// src/components/UserNavbar.js
import { Link } from 'react-router-dom';

const UserNavbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Početna</Link></li>
        <li><Link to="/moji-uredjaji">Moji uređaji</Link></li>
        <li><Link to="/moje-sobe">Moje sobe</Link></li>
        <li><Link to="/moji-logovi">Moje aktivnosti</Link></li>
      </ul>
    </nav>
  );
};

export default UserNavbar;