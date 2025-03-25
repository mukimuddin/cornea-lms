import React, { useState } from 'react';

function Profile({ profileData, isEditable, onSave, editableFields = [] }) {
  const [profile, setProfile] = useState(profileData);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveProfilePicture = () => {
    setProfile((prev) => ({ ...prev, profilePicture: null }));
  };

  const handleSave = () => {
    onSave(profile);
    setIsEditing(false);
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen p-8">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">{profile.role} Profile</h1>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg">
            {profile.profilePicture ? (
              <img
                src={profile.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                Upload Image
              </div>
            )}
          </div>
          {isEditable && editableFields.includes('profilePicture') && (
            <div className="mt-4 flex space-x-4">
              {!profile.profilePicture ? (
                <label
                  htmlFor="profilePicture"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600"
                >
                  Upload Image
                </label>
              ) : (
                <button
                  onClick={handleRemoveProfilePicture}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Remove Picture
                </button>
              )}
              <input
                id="profilePicture"
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="hidden"
              />
            </div>
          )}
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(profile).map(([key, value]) => (
            key !== 'profilePicture' && key !== 'role' && (
              <div key={key} className="flex flex-col">
                <label className="font-medium text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}:
                </label>
                {isEditable && isEditing && editableFields.includes(key) ? (
                  key === 'additionalInfo' || key === 'achievements' ? (
                    <textarea
                      name={key}
                      value={value}
                      onChange={handleInputChange}
                      className="mt-1 px-4 py-2 border rounded-lg"
                    />
                  ) : (
                    <input
                      type={key === 'dateOfBirth' || key === 'joiningDate' ? 'date' : 'text'}
                      name={key}
                      value={value}
                      onChange={handleInputChange}
                      className="mt-1 px-4 py-2 border rounded-lg"
                    />
                  )
                ) : (
                  <span className="mt-1 text-gray-900">{value}</span>
                )}
              </div>
            )
          ))}
        </div>

        {/* Edit/Save Buttons */}
        {isEditable && (
          <div className="mt-8 flex justify-center space-x-4">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Edit Profile
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
