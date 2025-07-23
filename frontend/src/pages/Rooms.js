import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import '../components/TableStyles.css';
import Loading from '../components/Loading.js';

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
    <div className="table">
      <h2>Lista Soba</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Naziv</th>
            <th>Vlasnik</th>
            <th>Uređaji</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td>{room.id}</td>
              <td>{room.name}</td>
              <td>{room.user?.name ?? '-'}</td>
              <td>
                {room.devices && room.devices.length > 0 ? (
                  <ul style={{ paddingLeft: '1rem', margin: 0 }}>
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
  );
};

export default Rooms;