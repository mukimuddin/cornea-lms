import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ManageAdmins() {
  const [admins, setAdmins] = useState([
    { id: 1, name: 'Super Admin', email: 'superadmin@example.com', role: 'Super Admin' },
  ]);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', role: 'Admin' });
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'Super Admin') {
      navigate('/admin-panel/dashboard'); // Redirect if not super admin
    }
  }, [navigate]);

  const handleAddAdmin = () => {
    if (!newAdmin.name || !newAdmin.email) {
      alert('Please fill in all fields');
      return;
    }

    setAdmins((prev) => [
      ...prev,
      { id: prev.length + 1, ...newAdmin },
    ]);
    setNewAdmin({ name: '', email: '', role: 'Admin' });
  };

  const handleRemoveAdmin = (id) => {
    setAdmins((prev) => prev.filter((admin) => admin.id !== id));
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Admins</h1>

      {/* Add New Admin */}
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
          <button
            onClick={handleAddAdmin}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Add Admin
          </button>
        </div>
      </div>

      {/* Admin List */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Existing Admins</h2>
        <ul className="space-y-4">
          {admins.map((admin) => (
            <li key={admin.id} className="p-4 border rounded-lg shadow-sm flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{admin.name}</h3>
                <p className="text-gray-600">{admin.email}</p>
                <p className="text-sm text-gray-500">Role: {admin.role}</p>
              </div>
              {admin.role !== 'Super Admin' && (
                <button
                  onClick={() => handleRemoveAdmin(admin.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ManageAdmins;
