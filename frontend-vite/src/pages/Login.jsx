import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";
import axiosInstance from "../utils/axiosInstance";
import logo from "../assets/main/submark.png";
import Button from "../components/Button";

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { showNotification } = useNotification();

  useEffect(() => {
    const isLogout = localStorage.getItem("logoutSuccess") === "true";
    if (isLogout) {
      showNotification("Vidimo se kasnije! 👋");
      localStorage.removeItem("logoutSuccess");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isRegister) {
      // Register
      try {
        const res = await axiosInstance.post("/register", {
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        });

        const role = res.data.user.role || "standard";
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", role);
        localStorage.setItem("userName", res.data.user.name);
        localStorage.setItem("registrationSuccess", "true");
        localStorage.setItem("justRegistrated", "true");
        navigate("/");

      } catch (err) {
        if (err.response?.data?.errors?.email) {
          setError("Email adresa je već registrovana. 🚫");
        } else if (err.response?.data?.message) {
          setError(err.response.data.message);
        } else {
          setError("Greška prilikom registracije. ❗");
        }
      }
    } else {
      // Login
      try {
        const res = await axiosInstance.post("/login", {
          email,
          password,
        });

        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("userName", user.name);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("loginSuccess", "true");

        window.dispatchEvent(new Event("storage"));

        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } catch (err) {
        setError("Pogrešan email ili lozinka.");
      }
    }
  };

  return (
    <div className="page-wrapper-column relative">
      <div
      className="radial-gradient-bg animate-pulse-bg absolute"
      style={{
        bottom: -100,
        left: '50%',
        transform: 'translateX(-50%) translateY(50%)',
      }}
    ></div>
      <img
          src={logo}
          alt="Logo"
          className="w-50 pb-10 object-contain"
        />
      <div className="form-wrapper">
        
        <h2 className="text-2xl font-bold text-center">
          {isRegister ? "Registracija" : "Prijava"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="form-label">Ime</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Imenjak Imenjačić"
                required
                className="form-input"
              />
            </div>
          )}
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mail@fon.bg.ac.rs"
              required
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Lozinka</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="form-input"
            />
          </div>

          {isRegister && (
            <div>
              <label className="form-label">Potvrdi lozinku</label>
              <input
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="••••••••"
                required
                className="form-input"
              />
            </div>
          )}

          {error && (
            <p className="text-red-600 font-medium text-sm text-center">
              {error}
            </p>
          )}

          <Button
            type="bg"
            text={isRegister ? "Registruj se" : "Prijavi se"}
            className="w-full mt-4"
          />
        </form>

        <p className="text-center text-sm">
          {isRegister ? "Već imate nalog?" : "Nemate nalog?"}{" "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-[#64DED2] hover:underline font-medium"
          >
            {isRegister ? "Prijavi se" : "Registruj se"}
          </button>
        </p>
      </div>
      <Button
        text="< Početna"
        type="wb"
        onClick={()=> {navigate("/")}}
        className="mt-10"
      />
    </div>
  );
}

export default Login;