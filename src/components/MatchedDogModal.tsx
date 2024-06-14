import React from "react";

interface MatchedDogModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const MatchedDogModal = ({
  isOpen,
  onClose,
  children,
}:MatchedDogModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default MatchedDogModal;
