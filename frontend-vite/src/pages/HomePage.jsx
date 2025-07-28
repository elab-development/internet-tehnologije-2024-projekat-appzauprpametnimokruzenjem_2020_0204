import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
import { useNotification } from '../context/NotificationContext';
import DeviceCard from '../components/DeviceCard';
import Button from '../components/Button';
import logo from '../assets/main/logo1.png';
import imageHome from '../assets/home.png';

const HomePage = () => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const userName = localStorage.getItem("userName");
  const isLoggedIn = !!userName;

  const [weather, setWeather] = useState({ city: '', temp: '', condition: '' });
  const [devices, setDevices] = useState([]);

  // WEATHER FETCH
  const fetchWeather = async () => {
    try {
      const res = await axiosInstance.get('/weather');
      const data = res.data;
      setWeather({
        city: data.location.city,
        temp: data.weather.main.temp,
        condition: data.weather.weather[0]?.main || '',
      });
    } catch (err) {
      console.error("Greška u dohvatanju vremena:", err);
    }
  };

  // DEVICES FETCH
  const fetchDevices = async () => {
    try {
      const res = await axiosInstance.get('/me');
      const allDevices = res.data.rooms?.flatMap(r => r.devices || []) || [];
      setDevices(allDevices);
    } catch (err) {
      console.error("Greška u dohvatanju uređaja:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchWeather();
      fetchDevices();
    }

    if (localStorage.getItem("loginSuccess") === "true") {
      showNotification("Dobro došao u svoj pametan dom! 🪴");
      localStorage.removeItem("loginSuccess");
    }

    if (localStorage.getItem("registrationSuccess") === "true") {
      showNotification("Uspešno si se registrovao! 🎉");
      localStorage.removeItem("registrationSuccess");
    }

    if (localStorage.getItem("logoutSuccess") === "true") {
      showNotification("Vidimo se kasnije! 👋");
      localStorage.removeItem("logoutSuccess");
    }
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-[#F8FAFC00] pt-16 px-4 relative overflow-hidden">
      <div
        className="radial-gradient-bg rgb-white animate-pulse-bg absolute"
        style={{
          bottom: 500,
          left: '50%',
          transform: 'translateX(-100%) translateY(100%)',
        }}
      ></div>
      <div
        className="absolute inset-0 bg-cover bg-center -z-20"
        style={{ backgroundImage: `url(${imageHome})` }}
      />
      {/* Logo */}
      <img src={logo} alt="Logo" className="w-auto h-28 mb-20 mt-40" />

      {/* Ako je korisnik ulogovan */}
      {isLoggedIn ? (
        <div className="max-w-2xl w-full bg-white p-6 rounded-2xl shadow-lg text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">Dobro došao, {userName}! 👋</h1>
          <p className="text-gray-600">
            <strong>{weather.city}</strong> | {weather.temp}°C ({weather.condition})
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-2">Aktivni uređaji</h2>
          {devices.filter(d => d.status === 'on').length === 0 ? (
            <p className="text-gray-400">Nema aktivnih uređaja.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {devices
                .filter(d => d.status === 'on')
                .map(device => (
                  <DeviceCard
                    key={device.id}
                    device={device}
                    onDelete={() => { }}
                    onToggleStatus={() => { }}
                  />
                ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 rounded-xl shadow-md w-72">
              <span className="text-4xl mb-2">📱</span>
              <h3 className="text-xl font-bold mb-1">Kontroliši uređaje</h3>
              <p className="text-gray-500">Uključi, isključi i prati sve uređaje u stvarnom vremenu.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md w-72">
              <span className="text-4xl mb-2">🧠</span>
              <h3 className="text-xl font-bold mb-1">Automatizuj rutine</h3>
              <p className="text-gray-500">Postavi pravila i pusti aplikaciju da radi za tebe.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md w-72">
              <span className="text-4xl mb-2">💡</span>
              <h3 className="text-xl font-bold mb-1">Uštedi energiju</h3>
              <p className="text-gray-500">Prati potrošnju i optimizuj pametan dom.</p>
            </div>
          </div>

<h3 className="text-xl text-[#326F69] font-bold mb-6 mt-20">Izgradi svoj pametno dom danas!🪴</h3>
          <Button
            text="Kreni"
            type="bgg"
            onClick={() => navigate('/login')}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;