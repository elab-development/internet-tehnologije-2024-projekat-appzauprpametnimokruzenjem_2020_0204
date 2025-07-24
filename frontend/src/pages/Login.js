// src/pages/Login.js
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import logo from '../assets/main/submark.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axiosInstance.post('/login', {
        email,
        password,
      });

      console.log('Uspešan login:', response.data);
      localStorage.setItem('welcome', 'true');
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.user.role);
      window.dispatchEvent(new Event('storage'));
      if (response.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Pogrešan email ili lozinka.');
      console.error(err);
    }
  };

  return (
    <div className="login-container">

        <div style={{ textAlign: 'center', marginBottom: '10px', marginTop: '40px' }}>
        <img src={logo} alt="Logo" style={{ width: '120px', height: 'auto' }} />
      </div>
      <div className="login-form">
      <h2>Prijava</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Lozinka:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Prijavi se</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

      <p style={{ marginTop: '1rem' }}>
        Ukoliko nemaš nalog, <Link to="/register">registruj se</Link>.
      </p>
      </div>
    </div>
  );
};

export default Login;