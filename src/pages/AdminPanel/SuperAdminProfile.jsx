import React from 'react';
import Profile from '../../components/Profile';

function SuperAdminProfile() {
  const profileData = {
    name: 'Super Admin',
    email: 'superadmin@example.com',
    role: 'Super Admin',
    contact: '123-456-7890',
    address: '123 Main Street, City, Country',
    dateOfBirth: '1980-01-01',
    gender: 'Male',
    department: 'Administration',
    joiningDate: '2010-01-01',
    emergencyContact: '987-654-3210',
    bloodGroup: 'O+',
    nationality: 'American',
    languages: 'English, Spanish',
    hobbies: 'Reading, Traveling, Management',
    achievements: 'Employee of the Year (2015), Best Administrator Award (2020)',
    additionalInfo: 'This is additional information about the Super Admin.',
    profilePicture: null,
  };

  const handleSave = (updatedProfile) => {
    console.log('Updated Profile:', updatedProfile);
  };

  return <Profile profileData={profileData} isEditable={true} onSave={handleSave} />;
}

export default SuperAdminProfile;
