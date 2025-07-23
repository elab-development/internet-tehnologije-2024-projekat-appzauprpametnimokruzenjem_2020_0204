// src/pages/Devices.js

import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import '../components/TableStyles.css';

function Devices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/devices')
      .then(response => {
        console.log('API odgovor:', response.data);

        const fetchedDevices = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];

        setDevices(fetchedDevices);
      })
      .catch(error => {
        console.error('Greška pri učitavanju uređaja:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Učitavanje uređaja...</p>;

  return (
    <div className="table">
      <h2 className="text-3xl font-bold mb-4">Lista Uređaja</h2>
        <table>
            <thead>
                <tr>
                <th>ID</th>
                <th>Naziv</th>
                <th>Tip</th>
                <th>Status</th>
                <th>Soba</th>
                <th>Vlasnik</th>
                </tr>
            </thead>
            <tbody>
                {devices.map(device => (
                <tr key={device.id}>
                    <td>{device.id}</td>
                    <td>{device.name}</td>
                    <td>{device.type}</td>
                    <td>{device.status}</td>
                    <td>{device.room?.name ?? '-'}</td>
                    <td>{device.user.name ?? '-'}</td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}

export default Devices;