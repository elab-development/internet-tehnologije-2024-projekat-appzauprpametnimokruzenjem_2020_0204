// src/pages/Register.js
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // dodato useNavigate
import axiosInstance from '../api/axios';
import hand from '../assets/emojis/writing-hand_270d-fe0f.png';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      const role = response.data.user.role || "standard";

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", role);
      localStorage.setItem("userName", response.data.user.name);
      localStorage.setItem("registrationSuccess", "true");
      localStorage.setItem("justRegistrated", "true");

      setName('');
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');

      navigate('/');
    } catch (err) {
      if (err.response?.data?.errors?.email) {
        setErrorMessage("Email adresa je već registrovana. 🚫");
      } else if (err.response?.data?.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Greška prilikom registracije. Pokušajte ponovo. ❗");
      }
      console.error("Detalji greške:", err.response?.data);
    }
  };

  return (
    <>
      <div className="login-container">
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <img src={hand} alt="Writing-Hand" style={{ width: '100px', height: 'auto' }} />
        </div>
        <div className="login-form">
          <h2>Registracija</h2>
          <form onSubmit={handleRegister}>
            <label>Ime:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required />

            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />

            <label>Lozinka:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required />

            <label>Potvrdi lozinku:</label>
            <input
              type="password"
              name="password_confirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required />

            <button type="submit">Registruj se</button>
          </form>

          {errorMessage && (
            <p style={{ color: 'red', marginTop: '1rem' }}>{errorMessage}</p>
          )}

          <p style={{ marginTop: '1rem' }}>
            Već imaš nalog? <Link to="/login">Prijavi se</Link>.
          </p>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Link to="/login">
          <button>{'< Log In'}</button>
        </Link>
      </div>
    </>
  );
};

export default Register;