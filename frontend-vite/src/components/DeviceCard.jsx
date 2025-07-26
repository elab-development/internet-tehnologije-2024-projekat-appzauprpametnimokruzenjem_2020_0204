import { useState } from 'react';
import Modal from './Modal';
import axiosInstance from '../api/axios';

const getDeviceIcon = (type) => {
  switch (type?.toLowerCase()) {
    case 'sijalica':
      return '💡';
    case 'ventilator':
      return '🌀';
    case 'brava':
      return '🔒';
    case 'senzor':
      return '📡';
    case 'zvučnik':
      return '🔊';
    default:
      return '🗿';
  }
};

const DeviceCard = ({ device, onDelete, onToggleStatus }) => {
  const icon = getDeviceIcon(device.type);
  const [showModal, setShowModal] = useState(false);
  const [localStatus, setLocalStatus] = useState(device.status);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/devices/${device.id}`);
      onDelete(device.id);
    } catch (err) {
      console.error('Greška pri brisanju uređaja:', err);
    } finally {
      setShowModal(false);
    }
  };

  const handleToggleStatus = async () => {
    const newStatus = localStatus === 'on' ? 'off' : 'on';
    try {
      await axiosInstance.put(`/devices/${device.id}`, { status: newStatus });
      setLocalStatus(newStatus);
      onToggleStatus(device.id, newStatus);
    } catch (err) {
      console.error('Greška pri promeni statusa:', err);
    }
  };

  return (
    <div className="device-card group bg-white hover:bg-[#64DED2] transition-colors duration-300 p-4 rounded-xl shadow-md flex flex-col justify-between h-full relative">
      {/* Modal za potvrdu brisanja */}
      {showModal && (
        <Modal
          title="Brisanje uređaja"
          message="Jesi li siguran da želiš da obrišeš ovaj uređaj?"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}

      {/* Gornji deo */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl group-hover:text-white">{icon}</span>
        <button
          onClick={handleToggleStatus}
          className={`
            text-sm font-medium px-2 py-0.5 rounded-full
            ${localStatus === 'on'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'}
            group-hover:bg-white group-hover:text-[#282828]
          `}
        >
          {localStatus}
        </button>
      </div>

      {/* Donji deo */}
      <div className="flex justify-between items-end flex-grow">
        <div>
          <h3 className="text-md font-bold text-[#282828] group-hover:text-[#326F69]">
            {device.name}
          </h3>
          <p className="text-sm text-gray-400 capitalize group-hover:text-[#326F69]">
            {device.type}
          </p>
        </div>
        <div
          className="text-lg text-gray-400 hover:text-white cursor-pointer pb-1 group-hover:text-[#326F69]"
          onClick={() => setShowModal(true)}
        >
          ...
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;