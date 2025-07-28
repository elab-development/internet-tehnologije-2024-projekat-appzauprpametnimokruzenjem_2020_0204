import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios.js';
import '../components/TableStyles.css';
import Loading from '../components/Loading.jsx';
import emoji from '../assets/emojis/hut_1f6d6.png'

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axiosInstance.get('/rooms');

        const data = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];

        setRooms(data);
      } catch (error) {
        console.error('Greška prilikom dobavljanja soba:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) return <Loading/>;

  return (
      <div className="admin-container">
        <img
           src={emoji}
           alt="emoji"
           className="w-25 pb-5 pt-10 object-contain"
          />
      <h1 className="admin-users-header mb-7">Lista soba</h1>

      <div className="admin-users-table-container">
        <table>
          <thead>
            <tr>
              <th>room ID</th>
              <th>Naziv</th>
              <th>Vlasnik</th>
              <th>Uređaji</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td className="text-center">{room.id}</td>
                <td>{room.name}</td>
                <td>{room.user?.name ?? '-'}</td>
                <td>
                  {room.devices && room.devices.length > 0 ? (
                    <ul className="pl-4 list-disc">
                      {room.devices.map((device) => (
                        <li key={device.id}>
                          {device.name} ({device.type})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rooms;