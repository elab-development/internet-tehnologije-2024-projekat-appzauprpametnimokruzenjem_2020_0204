// src/components/RoomCard.jsx
import DeviceCard from './DeviceCard';

const RoomCard = ({ room }) => {
  const deviceCount = room.devices?.length || 0;

  const getDeviceLabel = (count) => {
    if (count === 1) return '1 aktivan uređaj';
    if (count >= 2 && count <= 4) return `${count} aktivna uređaja`;
    return `${count} aktivnih uređaja`;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 relative">
      {/* Gornji red sa nazivom sobe i tri tačke */}
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold mb-2">{room.name}</h2>
        <div className="text-gray-400 hover:text-black cursor-pointer text-2xl">
          &#x2026;
        </div>
      </div>

      {/* Broj uređaja */}
      <p className="text-sm mb-4 text-gray-600">
        {getDeviceLabel(deviceCount)}
      </p>

      {/* Lista uređaja */}
      {deviceCount > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {room.devices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>
      ) : (
        <p className="italic text-gray-400">Nema uređaja u ovoj sobi</p>
      )}
    </div>
  );
};

export default RoomCard;