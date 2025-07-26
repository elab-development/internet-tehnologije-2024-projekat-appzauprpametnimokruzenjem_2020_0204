import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import RoomCard from '../components/RoomCard';
import Button from '../components/Button';
import AddForm from '../components/AddForm';
import icon from '../assets/emojis/derelict-house_1f3da-fe0f.png';

const MyDevices = () => {
  const [rooms, setRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('device');
  const userName = localStorage.getItem("userName");
  const fetchRooms = async () => {
  try {
    const res = await axiosInstance.get('/me');
    const userData = res.data;
    setRooms(userData.rooms || []);
  } catch (err) {
    console.error('Greška pri učitavanju korisnikovih soba:', err);
  }
};

  useEffect(() => {
    axiosInstance.get('/me')
      .then(res => {
        const userData = res.data;
        setRooms(userData.rooms || []);
      })
      .catch(err => console.error('Greška pri učitavanju korisnikovih soba:', err));
      fetchRooms();
  }, []);

  const handleAddRoom = async (roomName) => {
    try {
      const res = await axiosInstance.post('/rooms', { name: roomName });
      setRooms(prev => [...prev, res.data]);
    } catch (err) {
      console.error("Greška pri dodavanju sobe:", err);
    }
  };

  const handleAddDevice = async (deviceData) => {
    try {
      const res = await axiosInstance.post('/devices', deviceData);
      const newDevice = res.data;

      // Ažuriraj odgovarajuću sobu da joj se doda novi uređaj
      setRooms(prevRooms => prevRooms.map(room => {
        if (room.id === newDevice.room_id) {
          return {
            ...room,
            devices: [...(room.devices || []), newDevice]
          };
        }
        return room;
      }));
    } catch (err) {
      console.error("Greška pri dodavanju uređaja:", err);
    }
  };

  if (!userName) {
    return (
      <div className="distant-container">
        <div
          className="radial-gradient-bg animate-pulse-bg absolute"
          style={{
            bottom: -100,
            left: '50%',
            transform: 'translateX(-50%) translateY(50%)',
          }}
        ></div>
        <div className="distant-icon-wrapper">
          <img
            src={icon}
            alt="Construction Icon"
            className="w-24 h-24"
          />
        </div>
        <h1 className="distant-title">UPS!</h1>
        <p className="distant-message">Još nisi izgradio svoj pametni dom.</p>
        <p className="distant-message mt-1">Uloguj se i počni danas.</p>
      </div>
    );
  }

  return (
    <div className="user-page-wrapper mt-45 relative z-0">
      <div
        className="radial-gradient-bg animate-pulse-bg absolute"
        style={{
          bottom: 200,
          left: '50%',
          transform: 'translateX(-50%) translateY(50%)',
        }}
      ></div>

      <div className="flex justify-between items-end mb-8 mt-20 relative">
        <h1 className="text-4xl font-bold">Moj dom 🪴</h1>

        <div className="relative flex items-end">
          {showForm && (
            <AddForm
              formType={formType}
              setFormType={setFormType}
              rooms={rooms}
              setRooms={setRooms}
              onSubmitRoom={handleAddRoom}
              onSubmitDevice={handleAddDevice}
              closeForm={() => setShowForm(false)}
              fetchRooms={fetchRooms}
            />
          )}

          <Button
            type={showForm ? 'bg' : 'wg'}
            text={showForm ? 'Zatvori' : '➕ Dodaj'}
            onClick={() => setShowForm(!showForm)}
          />
        </div>
      </div>

      {rooms.length === 0 ? (
        <div className="text-center text-3xl font-semibold text-gray-600 mt-40">
          Registruj sada svoj dom! 👨🏽‍💻
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {rooms.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDevices;