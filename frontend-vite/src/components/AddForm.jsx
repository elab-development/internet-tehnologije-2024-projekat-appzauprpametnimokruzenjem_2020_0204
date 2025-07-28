import { useState } from 'react';
import Button from './Button';
import axiosInstance from '../api/axios';

const AddForm = ({ formType, setFormType, rooms, setRooms, closeForm, fetchRooms }) => {
  const [roomName, setRoomName] = useState('');
  const [deviceData, setDeviceData] = useState({
    name: '',
    type: 'sijalica',
    status: 'on',
    room_id: rooms[0]?.id || ''
  });

  const handleRoomSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/rooms', { name: roomName });
      await fetchRooms();
      setRooms(prev => [...prev, res.data]);
      setRoomName('');
      closeForm();
    } catch (err) {
      console.error('Greška prilikom kreiranja sobe:', err);
    }
  };

  const handleDeviceSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/devices', {
        name: deviceData.name,
        type: deviceData.type,
        status: deviceData.status,
        room_id: deviceData.room_id
      });
      const updatedRoom = rooms.find(r => r.id === parseInt(deviceData.room_id));
      if (updatedRoom) {
        const updatedRooms = rooms.map(r =>
          r.id === updatedRoom.id
            ? { ...r, devices: [...(r.devices || []), res.data] }
            : r
        );
        setRooms(updatedRooms);
      }
      await fetchRooms();
      setDeviceData({ name: '', type: 'sijalica', status: 'on', room_id: rooms[0]?.id || '' });
      closeForm();
    } catch (err) {
      console.error('Greška prilikom kreiranja uređaja:', err);
    }
  };

  return (
    <div className="absolute right-full bottom-0 mr-4 bg-white p-6 rounded-3xl shadow-md w-[700px] border border-gray-200 z-50">
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
        <form onSubmit={handleRoomSubmit} className="flex flex-col gap-4 w-full">
          <label className="text-sm font-medium text-gray-700">Naziv sobe</label>
          <input
            type="text"
            className="border rounded-md px-2 py-1 w-full"
            placeholder="npr. Dnevna"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <Button type="wg" text="Sačuvaj sobu" />
        </form>
      ) : (
        <form onSubmit={handleDeviceSubmit} className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700">Naziv uređaja</label>
            <input
              type="text"
              className="border rounded-md px-2 py-1 w-full"
              placeholder="npr. Luster u hodniku"
              value={deviceData.name}
              onChange={(e) => setDeviceData({ ...deviceData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Tip</label>
            <select
              className="border rounded-md px-2 py-1 w-full"
              value={deviceData.type}
              onChange={(e) => setDeviceData({ ...deviceData, type: e.target.value })}
            >
              <option>sijalica</option>
              <option>ventilator</option>
              <option>brava</option>
              <option>senzor</option>
              <option>zvučnik</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <select
              className="border rounded-md px-2 py-1 w-full"
              value={deviceData.status}
              onChange={(e) => setDeviceData({ ...deviceData, status: e.target.value })}
            >
              <option>on</option>
              <option>off</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Soba</label>
            <select
              className="border rounded-md px-2 py-1 w-full"
              value={deviceData.room_id}
              onChange={(e) => setDeviceData({ ...deviceData, room_id: e.target.value })}
            >
              {rooms.map(room => (
                <option key={room.id} value={room.id}>{room.name}</option>
              ))}
            </select>
          </div>

          <div className="col-span-2 text-right">
            <Button type="wg" text="Sačuvaj uređaj" />
          </div>
        </form>
      )}
    </div>
  );
};

export default AddForm;