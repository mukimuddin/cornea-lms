import { useState } from 'react';

function Profile() {
  const profile = {
    name: 'John Doe',
    email: 'johndoe@example.com',
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
  };

  const results = [
    { subject: 'Math', marks: 85, totalMarks: 100, grade: 'A' },
    { subject: 'Physics', marks: 78, totalMarks: 100, grade: 'B+' },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">Student Profile</h1>
      <div className="space-y-4">
        {Object.entries(profile).map(([key, value]) => (
          <div key={key} className="flex flex-col md:flex-row items-start">
            <span className="w-full md:w-48 font-medium text-gray-700 capitalize text-sm md:text-base">
              {key.replace(/([A-Z])/g, ' $1')}:
            </span>
            <span className="text-gray-900 text-sm md:text-base">{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 md:mt-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">Results</h2>
        <ul className="space-y-4">
          {results.map((result, index) => (
            <li key={index} className="p-4 border rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-800">{result.subject}</h3>
              <p className="text-gray-600 text-sm md:text-base">
                Marks: {result.marks}/{result.totalMarks}
              </p>
              <p className="text-gray-600 text-sm md:text-base">Grade: {result.grade}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
