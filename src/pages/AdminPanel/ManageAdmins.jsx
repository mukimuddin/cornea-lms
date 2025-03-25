import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Notification from '../../components/Notification';
import axios from 'axios';

function ManageAdmins() {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', username: '', role: 'Admin' });
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('/api/admins'); // Replace with actual API endpoint
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };
    fetchAdmins();
  }, []);

  const handleAddAdmin = async () => {
    if (!newAdmin.name || !newAdmin.email || !newAdmin.username) {
      setNotification({ message: 'All fields are required.', type: 'error' });
      return;
    }

    try {
      const response = await axios.post('/api/admins', newAdmin); // Replace with actual API endpoint
      setAdmins((prev) => [...prev, response.data]);
      setNewAdmin({ name: '', email: '', username: '', role: 'Admin' });
      setNotification({ message: 'Admin added successfully!', type: 'success' });
    } catch (error) {
      if (error.response && error.response.data.error === 'Username already exists') {
        setNotification({ message: 'Username already exists. Please choose another.', type: 'error' });
      } else {
        setNotification({ message: 'Failed to add admin. Please try again.', type: 'error' });
      }
    }
  };

  const handleRemoveAdmin = async (id) => {
    try {
      await axios.delete(`/api/admins/${id}`); // Replace with actual API endpoint
      setAdmins((prev) => prev.filter((admin) => admin.id !== id));
      setNotification({ message: 'Admin removed successfully!', type: 'success' });
    } catch (error) {
      setNotification({ message: 'Failed to remove admin. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Admins</h1>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Admin</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newAdmin.name}
            onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            value={newAdmin.email}
            onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Username"
            value={newAdmin.username}
            onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <button
            onClick={handleAddAdmin}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Add Admin
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Existing Admins</h2>
        <ul className="space-y-4">
          {admins.map((admin) => (
            <li key={admin.id} className="p-4 border rounded-lg shadow-sm flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{admin.name}</h3>
                <p className="text-gray-600">{admin.email}</p>
                <p className="text-sm text-gray-500">Username: {admin.username}</p>
              </div>
              <button
                onClick={() => handleRemoveAdmin(admin.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default ManageAdmins;
