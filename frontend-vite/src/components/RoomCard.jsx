import { useState } from 'react';
import Modal from './Modal';
import DeviceCard from './DeviceCard';

const RoomCard = ({ room, onDeleteRoom, onDeleteDevice, onToggleStatus }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteRoom = () => {
    onDeleteRoom(room.id);
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-xl relative">
      {showModal && (
        <Modal
          title="Brisanje sobe"
          message={`Da li si siguran da želiš da obrišeš sobu "${room.name}"?`}
          onConfirm={handleDeleteRoom}
          onCancel={() => setShowModal(false)}
        />
      )}

      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold">{room.name}</h2>
        <button
          className="text-gray-400 hover:text-red-500 text-lg"
          onClick={() => setShowModal(true)}
        >
          ...
        </button>
      </div>

      {/* Lista uređaja */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {room.devices && room.devices.map(device => (
          <DeviceCard
            key={device.id}
            device={device}
            onDelete={(deviceId) => onDeleteDevice(room.id, deviceId)}
            onToggleStatus={(deviceId, newStatus) => onToggleStatus(room.id, deviceId, newStatus)}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomCard;