import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import '../components/TableStyles.css';
import Loading from '../components/Loading.js';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState('');
  const [devices, setDevices] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosInstance.get('/users')
      .then(res => {
        setUsers(res.data);
        if (res.data.length > 0) {
          const defaultUser = res.data[0];
          setSelectedUserId(defaultUser.id);
          setSelectedUserName(defaultUser.name);

          return Promise.all([
            axiosInstance.get(`/users/${defaultUser.id}/devices`),
            axiosInstance.get(`/users/${defaultUser.id}/logs`)
          ]);
        }
        return [[], []];
      })
      .then(([devicesRes, logsRes]) => {
        setDevices(devicesRes?.data?.data || devicesRes?.data || []);
        setLogs(logsRes?.data?.data || logsRes?.data || []);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleUserChange = async (e) => {
    const userId = e.target.value;
    const user = users.find(u => u.id == userId);
    setSelectedUserId(userId);
    setSelectedUserName(user?.name ?? '');
    setLoading(true);

    try {
      const [devicesRes, logsRes] = await Promise.all([
        axiosInstance.get(`/users/${userId}/devices`),
        axiosInstance.get(`/users/${userId}/logs`)
      ]);
      setDevices(devicesRes?.data?.data || devicesRes?.data || []);
      setLogs(logsRes?.data?.data || logsRes?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="table">
      <h1>{selectedUserName || 'Korisnik'}</h1>
      <select onChange={handleUserChange} value={selectedUserId || ''}>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>


      {/*Sekcija za preuzimanje fajlova */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: '20px',
        marginBottom: '20px',
      }}>
        <p style={{ margin: 0, fontWeight: 'bold' }}>
          Preuzmi sve podatke o aktivnostima SVIH korisnika veb servisa u željenom formatu.
        </p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
          <a
            href="http://localhost:8000/api/logs/export/csv"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button style={{ padding: '8px 16px' }}>📄 CSV</button>
          </a>
          <a
            href="http://localhost:8000/api/logs/export/pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button style={{ padding: '8px 16px' }}>🧾 PDF</button>
          </a>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div style={{ display: 'flex', gap: '2rem', marginTop: '20px' }}>
          {/* Left: Devices */}
          <div style={{ flex: 1 }}>
            <h3>Uređaji</h3>
            <table>
              <thead>
                <tr>
                  <th>device ID</th>
                  <th>Naziv</th>
                  <th>Tip</th>
                  <th>Status</th>
                  <th>Soba</th>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right: Logs */}
          <div style={{ flex: 1 }}>
            <h3>Logovi</h3>
            <table>
              <thead>
                <tr>
                  <th>log ID</th>
                  <th>Soba</th>
                  <th>Uređaj</th>
                  <th>Tip</th>
                  <th>Akcija</th>
                  <th>Vreme</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(log => (
                  <tr key={log.id}>
                    <td>{log.id}</td>
                    <td>{log.device?.room?.name ?? '-'}</td>
                    <td>{log.device?.name ?? '-'}</td>
                    <td>{log.device?.type ?? '-'}</td>
                    <td>{log.action}</td>
                    <td>{log.performed_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;