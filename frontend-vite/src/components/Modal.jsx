// src/components/Modal.jsx

import React from 'react';

const Modal = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-4">{title || "Potvrda"}</h2>
        <p className="mb-6">{message || "Jesi li siguran da želiš da obrišeš?"}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Otkaži
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Obriši
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;