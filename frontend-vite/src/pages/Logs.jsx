import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import '../components/TableStyles.css';
import Loading from '../components/Loading';
import emoji from '../assets/emojis/file-cabinet_1f5c4-fe0f.png'

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axiosInstance.get('/logs');
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];

        setLogs(data);
      } catch (error) {
        console.error('Greška prilikom učitavanju logova:', error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) return <Loading/>;

  return (
    <div className="admin-container">
      <img
          src={emoji}
          alt="emoji"
          className="w-25 pb-5 pt-10 object-contain"
      />
      <h1 className="admin-users-header mb-7">Akcioni logovi</h1>

      <div className="admin-users-table-container">
        <table>
          <thead>
            <tr>
              <th>log ID</th>
              <th>Korisnik</th>
              <th>Uređaj</th>
              <th>Tip</th>
              <th>Akcija</th>
              <th>Soba</th>
              <th>Vreme izvršavanja</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="text-center">{log.id}</td>
                <td>{log.user ?? '-'}</td>
                <td>{log.device?.name ?? '-'}</td>
                <td>{log.device?.type ?? '-'}</td>
                <td>{log.action}</td>
                <td>{log.device?.room?.name ?? '-'}</td>
                <td>{log.performed_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Logs;