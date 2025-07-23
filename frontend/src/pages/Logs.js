import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import '../components/TableStyles.css';

const Logs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axiosInstance.get('/logs');
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];

        setLogs(data);
      } catch (error) {
        console.error('Greška prilikom dobavljanja logova:', error);
      }
    };

    fetchLogs();
  }, []);

  return (
    
    <div className="table">
      <h2>Akcioni logovi</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Korisnik</th>
            <th>Uređaj</th>
            <th>Tip</th>
            <th>Akcija</th>
            <th>Vreme izvršavanja</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td>{log.user ?? '-'}</td>
              <td>{log.device?.name ?? '-'}</td>
              <td>{log.device?.type ?? '-'}</td>
              <td>{log.action}</td>
              <td>{log.performed_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Logs;