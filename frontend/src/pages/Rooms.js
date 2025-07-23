// src/pages/Rooms.js
import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import '../components/TableStyles.css';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
  try {
    const response = await axios.get('/rooms');
    console.log('Odgovor:', response);
    console.log('response.data:', response.data);

    setRooms(response.data.data);
  } catch (error) {
    console.error('Greška pri dohvaćanju soba:', error);
  } finally {
    setLoading(false);
  }
};

    fetchRooms();
  }, []);

  return (
    <div className="table">
      <h2>Sobe</h2>
      {loading ? (
        <p>Učitavanje...</p>
      ) : rooms.length === 0 ? (
        <p>Nema soba za prikaz.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Naziv</th>
              <th>Uređaji</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.name}</td>
                <td>
                  {room.devices && room.devices.length > 0 ? (
                    <ul>
                      {room.devices.map((device, index) => (
                        <li key={index}>
                          {device.name} / <i>{device.type}</i>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>Nema uređaja</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Rooms;