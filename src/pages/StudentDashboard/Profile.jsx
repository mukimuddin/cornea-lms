import React from 'react';
import Profile from '../../components/Profile';

function StudentProfile() {
  const profileData = {
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
  };

  const handleSave = (updatedProfile) => {
    console.log('Updated Profile:', updatedProfile);
  };

  return <Profile profileData={profileData} isEditable={true} onSave={handleSave} />;
}

export default StudentProfile;
