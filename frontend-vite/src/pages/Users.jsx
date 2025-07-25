import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios.js';
import '../components/TableStyles.css';
import Loading from '../components/Loading.jsx';
import Button from '../components/Button.jsx';
import emoji from '../assets/emojis/fingerprint_1fac6.png'

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
    <div className="admin-container">
      <img
                src={emoji}
                alt="emoji"
                className="w-25 pb-3 pt-10 object-contain"
              />
      <h1 className="admin-users-header">{selectedUserName || 'Korisnik'}</h1>
      <select className="admin-users-select" onChange={handleUserChange} value={selectedUserId || ''}>
        <option value="" disabled>Izaberi korisnika...</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>


      {/*Sekcija za preuzimanje fajlova */}
      <div className="admin-users-download-section">
        <p>
          Preuzmi sve podatke o aktivnostima SVIH korisnika veb servisa u željenom formatu.
        </p>
        <div className="admin-users-download-buttons">
          <Button
            text="📄 CSV"
            href="http://localhost:8000/api/logs/export/csv"
            target="_blank"
            type="bg"
          />

          <Button
            text="📄 PDF"
            href="http://localhost:8000/api/logs/export/pdf"
            target="_blank"
            type="bg"
          />
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="admin-users-content">
          <div className="admin-users-table-container">
            <h3 className="font-bold mb-4 mt-14">Uređaji 🪴</h3>
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
                    <td style={{ textAlign: 'center' }}>{device.id}</td>
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
          <div className="admin-users-table-container">
            <h3 className="font-bold mb-4 mt-14">Logovi 🚦</h3>
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
                    <td style={{ textAlign: 'center' }}>{log.id}</td>
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