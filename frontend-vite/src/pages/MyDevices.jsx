import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import RoomCard from '../components/RoomCard';
import Button from '../components/Button';
import icon from '../assets/emojis/derelict-house_1f3da-fe0f.png';

const MyDevices = () => {
  const [rooms, setRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('device');
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    axiosInstance.get('/me')
      .then(res => {
        const userData = res.data;
        setRooms(userData.rooms || []);
      })
      .catch(err => console.error('Greška pri učitavanju korisnikovih soba:', err));
  }, []);

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
    <div className="user-page-wrapper mt-50">
      <div className="flex justify-between items-end mb-8 mt-20 relative">
  <h1 className="text-4xl font-bold">Moj dom 🪴</h1>

  <div className="relative flex items-end">
    {showForm && (
      <div className="absolute right-full bottom-0 mb-1 mr-4 bg-white p-6 rounded-3xl shadow-md w-[700px] border border-gray-200 z-50">
        <div className="flex gap-2 mb-6">
          <Button
            text="Uređaj"
            type={formType === 'device' ? 'bw' : 'wb'}
            onClick={() => setFormType('device')}
          />
          <Button
            text="Soba"
            type={formType === 'room' ? 'bw' : 'wb'}
            onClick={() => setFormType('room')}
          />
        </div>

        {formType === 'room' ? (
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4 w-full">
            <label className="text-sm font-medium text-gray-700">Naziv sobe</label>
            <input
              type="text"
              className="border rounded-md px-2 py-1 w-full"
              placeholder="npr. Dnevna"
            />
            <Button type="wg" text="Sačuvaj sobu" onClick={() => alert("Čuvanje sobe...")} />
          </form>
        ) : (
          <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-700">Naziv uređaja</label>
              <input
                type="text"
                className="border rounded-md px-2 py-1 w-full"
                placeholder="npr. Luster u hodniku"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Tip</label>
              <select className="border rounded-md px-2 py-1 w-full">
                <option>sijalica</option>
                <option>ventilator</option>
                <option>brava</option>
                <option>senzor</option>
                <option>zvučnik</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select className="border rounded-md px-2 py-1 w-full">
                <option>on</option>
                <option>off</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Soba</label>
              <select className="border rounded-md px-2 py-1 w-full">
                {rooms.map(room => (
                  <option key={room.id} value={room.id}>{room.name}</option>
                ))}
              </select>
            </div>

            <div className="col-span-2 text-right">
              <Button type="wg" text="Sačuvaj uređaj" onClick={() => alert("Čuvanje uređaja...")} />
            </div>
          </form>
        )}
      </div>
    )}

    <Button
      type={showForm ? 'bg' : 'wg'}
      text={showForm ? 'Zatvori' : '➕ Dodaj'}
      onClick={() => setShowForm(!showForm)}
    />
  </div>
</div>

      {rooms.length === 0 ? (
        <div className="text-center text-3xl font-semibold text-gray-300 mt-40">
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