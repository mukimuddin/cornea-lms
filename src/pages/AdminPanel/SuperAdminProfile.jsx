import React from 'react';

function SuperAdminProfile() {
  const profile = {
    name: 'Super Admin',
    email: 'superadmin@example.com',
    role: 'Super Admin',
    contact: '123-456-7890',
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Super Admin Profile</h1>
      <div className="space-y-4">
        <div>
          <span className="font-medium text-gray-700">Name:</span>
          <span className="ml-2 text-gray-900">{profile.name}</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">Email:</span>
          <span className="ml-2 text-gray-900">{profile.email}</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">Role:</span>
          <span className="ml-2 text-gray-900">{profile.role}</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">Contact:</span>
          <span className="ml-2 text-gray-900">{profile.contact}</span>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminProfile;
