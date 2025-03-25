import React, { useState } from 'react';

function StudentProfile() {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    role: 'Student',
    phone: '123-456-7890',
    address: '123 Main Street, Springfield, USA',
    dob: '1995-05-15',
    gender: 'Male',
    studentId: 'STU12345',
    department: 'Computer Science',
    enrollmentYear: '2015',
    graduationYear: '2019',
    cgpa: '3.85',
    nationality: 'American',
    bloodGroup: 'O+',
    guardianName: 'Jane Doe',
    guardianPhone: '987-654-3210',
    emergencyContact: '112-233-4455',
    hobbies: 'Reading, Coding, Traveling',
    skills: 'JavaScript, React, Python',
    languages: 'English, Spanish',
    extracurricular: 'Debate Club, Coding Club',
    achievements: 'Dean’s List, Hackathon Winner',
    currentSemester: '8th',
    totalCredits: '120',
    attendance: '95%',
    scholarship: 'Merit-Based Scholarship',
    hostelRoom: 'Room 101, Block A',
    transport: 'Bus Route 5',
    profilePicture: null,
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

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
    setShowConfirmation(true);
  };

  const confirmRemovePicture = () => {
    setProfile((prev) => ({ ...prev, profilePicture: null }));
    setShowConfirmation(false);
  };

  const cancelRemovePicture = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="min-h-screen p-8 text-gray-800 bg-gradient-to-r from-gray-100 via-white to-gray-100 animate-gradient-x">
      <div className="bg-gray-900 shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-red-500 uppercase tracking-wide">
          Student Profile
        </h1>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-red-500 shadow-lg">
            {profile.profilePicture ? (
              <img
                src={profile.profilePicture}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-400">
                No Image
              </div>
            )}
          </div>
          <div className="mt-4 flex space-x-4">
            {!profile.profilePicture ? (
              <label
                htmlFor="profilePicture"
                className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600 inline-block text-center w-36"
              >
                Upload Picture
              </label>
            ) : (
              <button
                onClick={handleRemoveProfilePicture}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 inline-block text-center w-36"
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
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(profile).map(([key, value]) => (
            key !== 'profilePicture' && (
              <div key={key} className="flex flex-col">
                <label className="font-bold text-red-500 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}:
                </label>
                <span className="mt-1 text-gray-300">{value}</span>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-800 mb-4">Are you sure you want to remove the profile picture?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={confirmRemovePicture}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={cancelRemovePicture}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentProfile;
