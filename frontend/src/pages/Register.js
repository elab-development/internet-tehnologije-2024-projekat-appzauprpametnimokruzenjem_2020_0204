// src/pages/Register.js
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axios';
import hand from '../assets/emojis/writing-hand_270d-fe0f.png';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    try {
      const response = await axiosInstance.post('/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      console.log('Uspešna registracija:', response.data);
      setSuccessMsg('Uspešno ste se registrovali. Sada možete da se prijavite.');
      setName('');
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
    } catch (err) {
      setError('Došlo je do greške prilikom registracije.');
      console.error(err);
    }
  };

  return (
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
          required
        />

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

        <label>Potvrdi lozinku:</label>
        <input
          type="password"
          name="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />

        <button type="submit">Registruj se</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
      </form>

      <p style={{ marginTop: '1rem' }}>
        Već imaš nalog? <Link to="/login">Prijavi se</Link>.
      </p>
      </div>
    </div>
  );
};

export default Register;