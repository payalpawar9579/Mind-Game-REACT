// Modal.jsx
import React from 'react';

const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-4">Magic Result</h2>
        <p className="text-lg">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
