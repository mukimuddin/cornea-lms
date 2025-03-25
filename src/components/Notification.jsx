import React, { useEffect } from 'react';

function Notification({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000); // Auto-remove after 1 second
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 bg-${type === 'success' ? 'green' : 'red'}-500 text-white px-4 py-2 rounded-lg shadow-lg`}
    >
      {message}
    </div>
  );
}

export default Notification;
