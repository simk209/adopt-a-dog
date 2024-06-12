// src/components/Modal.tsx
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, dog }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold">{dog.name}</h2>
        <p>Age: {dog.age}</p>
        <p>Breed: {dog.breed}</p>
        <img src={dog.img} alt={dog.name} className="w-full h-auto" />
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
          Close
        </button>
      </div>
    </div>,
    document.getElementById('modal-root') // Assuming you have a div with id="modal-root" in your index.html
  );
};

export default Modal;
