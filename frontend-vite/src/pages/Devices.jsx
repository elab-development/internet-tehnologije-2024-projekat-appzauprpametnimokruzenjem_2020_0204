// src/pages/Devices.js

import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import '../components/TableStyles.css';
import Loading from '../components/Loading';
import emoji from '../assets/emojis/gear_2699-fe0f.png'

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

  if (loading) return <Loading/>;

  return (
   <div className="admin-container">
      <img
          src={emoji}
          alt="emoji"
          className="w-25 pb-5 pt-10 object-contain"
          />
      <h1 className="admin-users-header mb-7">Lista uređaja</h1>

      <div className="admin-users-table-container">
        <table>
          <thead>
            <tr>
              <th>device ID</th>
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
                <td className="text-center">{device.id}</td>
                <td>{device.name}</td>
                <td>{device.type}</td>
                <td>{device.status}</td>
                <td>{device.room?.name ?? '-'}</td>
                <td>{device.room?.user?.name ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Devices;