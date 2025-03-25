import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SuperAdminProfile() {
  const [profile, setProfile] = useState({
    name: 'Super Admin',
    email: 'superadmin@example.com',
    role: 'Super Admin',
    contact: '123-456-7890',
    address: '123 Main Street, City, Country',
    dateOfBirth: '1980-01-01',
    gender: 'Male',
    additionalInfo: 'This is additional information about the Super Admin.',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole);

    if (!userRole) {
      navigate('/admin-login'); // Redirect if no role is found
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Save the updated profile (for now, just log it)
    console.log('Profile saved:', profile);
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Super Admin Profile</h1>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="font-medium text-gray-700">Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              className="ml-2 px-2 py-1 border rounded-lg"
            />
          ) : (
            <span className="ml-2 text-gray-900">{profile.name}</span>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="font-medium text-gray-700">Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className="ml-2 px-2 py-1 border rounded-lg"
            />
          ) : (
            <span className="ml-2 text-gray-900">{profile.email}</span>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="font-medium text-gray-700">Role:</label>
          <span className="ml-2 text-gray-900">{profile.role}</span>
        </div>

        {/* Contact */}
        <div>
          <label className="font-medium text-gray-700">Contact:</label>
          {isEditing ? (
            <input
              type="text"
              name="contact"
              value={profile.contact}
              onChange={handleInputChange}
              className="ml-2 px-2 py-1 border rounded-lg"
            />
          ) : (
            <span className="ml-2 text-gray-900">{profile.contact}</span>
          )}
        </div>

        {/* Address */}
        {role === 'Super Admin' && (
          <div>
            <label className="font-medium text-gray-700">Address:</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleInputChange}
                className="ml-2 px-2 py-1 border rounded-lg"
              />
            ) : (
              <span className="ml-2 text-gray-900">{profile.address}</span>
            )}
          </div>
        )}

        {/* Date of Birth */}
        {role === 'Super Admin' && (
          <div>
            <label className="font-medium text-gray-700">Date of Birth:</label>
            {isEditing ? (
              <input
                type="date"
                name="dateOfBirth"
                value={profile.dateOfBirth}
                onChange={handleInputChange}
                className="ml-2 px-2 py-1 border rounded-lg"
              />
            ) : (
              <span className="ml-2 text-gray-900">{profile.dateOfBirth}</span>
            )}
          </div>
        )}

        {/* Gender */}
        {role === 'Super Admin' && (
          <div>
            <label className="font-medium text-gray-700">Gender:</label>
            {isEditing ? (
              <select
                name="gender"
                value={profile.gender}
                onChange={handleInputChange}
                className="ml-2 px-2 py-1 border rounded-lg"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <span className="ml-2 text-gray-900">{profile.gender}</span>
            )}
          </div>
        )}

        {/* Additional Info */}
        {role === 'Super Admin' && (
          <div>
            <label className="font-medium text-gray-700">Additional Info:</label>
            {isEditing ? (
              <textarea
                name="additionalInfo"
                value={profile.additionalInfo}
                onChange={handleInputChange}
                className="ml-2 px-2 py-1 border rounded-lg w-full"
              />
            ) : (
              <span className="ml-2 text-gray-900">{profile.additionalInfo}</span>
            )}
          </div>
        )}
      </div>

      {/* Edit/Save Buttons */}
      {role === 'Super Admin' && (
        <div className="mt-6">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Edit Profile
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default SuperAdminProfile;
