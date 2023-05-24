import React, { useEffect, useState } from 'react';

const ErrorModal = ({ message, onClose }) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setOpacity(100);

    return () => {
      setOpacity(0);
    };
  }, []);

  return (
    <div
      className={`fixed top-4 right-4 bg-red-100 text-red-700 border border-red-300 rounded-md p-4 z-50 transition-opacity duration-500 opacity-${opacity}`}
    >
      <div className="flex justify-between items-center">
        <p className="mr-4">{message}</p>
        <button
          className="text-red-700 font-semibold text-xl focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;
