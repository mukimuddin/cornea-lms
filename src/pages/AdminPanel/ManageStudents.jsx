import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({ class: '', gender: '' });
  const [newStudent, setNewStudent] = useState({
    name: '',
    fatherName: '',
    motherName: '',
    dateOfBirth: '',
    gender: '',
    bloodGroup: '',
    nationality: '',
    religion: '',
    class: '',
    department: '',
    previousSchool: '',
    currentSchool: '',
    lastExamResults: '',
    guardianContact: '',
    studentContact: '',
    email: '',
    currentAddress: '',
    permanentAddress: '',
    courseFee: '',
    paymentStatus: '',
    paymentMethod: '',
    discount: '',
    profilePhoto: null,
    guardianOccupation: '',
    specialNeeds: '',
    hostelFacility: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    // Fetch students from the real-time database
    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://your-backend-service.onrender.com/students'); // Update URL
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewStudent((prev) => ({ ...prev, profilePhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateUsernameAndPassword = (name) => {
    const username = name.toLowerCase().replace(/\s+/g, '') + Math.floor(1000 + Math.random() * 9000);
    const password = Math.random().toString(36).slice(-8);
    return { username, password };
  };

  const handleAddStudent = async () => {
    if (
      !newStudent.name ||
      !newStudent.fatherName ||
      !newStudent.motherName ||
      !newStudent.dateOfBirth ||
      !newStudent.gender ||
      !newStudent.class ||
      !newStudent.guardianContact ||
      !newStudent.currentAddress ||
      !newStudent.courseFee ||
      !newStudent.paymentStatus ||
      !newStudent.paymentMethod
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    const { username, password } = generateUsernameAndPassword(newStudent.name);
    const studentWithCredentials = { ...newStudent, username, password };

    try {
      console.log('Sending data to API:', studentWithCredentials); // Debugging log
      const response = await axios.post('https://your-backend-service.onrender.com/students', studentWithCredentials); // Update URL
      console.log('API Response:', response.data); // Debugging log
      setStudents((prev) => [...prev, response.data]);
      setNewStudent({
        name: '',
        fatherName: '',
        motherName: '',
        dateOfBirth: '',
        gender: '',
        bloodGroup: '',
        nationality: '',
        religion: '',
        class: '',
        department: '',
        previousSchool: '',
        currentSchool: '',
        lastExamResults: '',
        guardianContact: '',
        studentContact: '',
        email: '',
        currentAddress: '',
        permanentAddress: '',
        courseFee: '',
        paymentStatus: '',
        paymentMethod: '',
        discount: '',
        profilePhoto: null,
        guardianOccupation: '',
        specialNeeds: '',
        hostelFacility: '',
        username: '',
        password: '',
      });
      alert(`Student added successfully! Username: ${username}, Password: ${password}`);
    } catch (error) {
      console.error('Error adding student:', error); // Debugging log
      alert('Failed to add student. Please try again.');
    }
  };

  const filteredStudents = students.filter((student) => {
    return (
      (!filters.class || student.class === filters.class) &&
      (!filters.gender || student.gender === filters.gender)
    );
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Students</h1>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Filter by Class</label>
          <select
            name="class"
            value={filters.class}
            onChange={handleFilterChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">All Classes</option>
            <option value="8">Class 8</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Filter by Gender</label>
          <select
            name="gender"
            value={filters.gender}
            onChange={handleFilterChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>

      {/* Student List */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Student List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">
                  Gender
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">
                  Class
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">
                  Guardian Contact
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{student.name}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{student.gender}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{student.class}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{student.guardianContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Student */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Student</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={newStudent.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            name="fatherName"
            placeholder="Father's Name"
            value={newStudent.fatherName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            name="motherName"
            placeholder="Mother's Name"
            value={newStudent.motherName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="date"
            name="dateOfBirth"
            value={newStudent.dateOfBirth}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <select
            name="gender"
            value={newStudent.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="text"
            name="class"
            placeholder="Class"
            value={newStudent.class}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            name="guardianContact"
            placeholder="Guardian's Contact Number"
            value={newStudent.guardianContact}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            name="currentAddress"
            placeholder="Current Address"
            value={newStudent.currentAddress}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="number"
            name="courseFee"
            placeholder="Course Fee"
            value={newStudent.courseFee}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <select
            name="paymentStatus"
            value={newStudent.paymentStatus}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Payment Status</option>
            <option value="Paid">Paid</option>
            <option value="Due">Due</option>
            <option value="Pending">Pending</option>
          </select>
          <select
            name="paymentMethod"
            value={newStudent.paymentMethod}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Payment Method</option>
            <option value="Cash">Cash</option>
            <option value="Bkash">Bkash</option>
            <option value="Nagad">Nagad</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
          <input
            type="file"
            onChange={handleProfilePhotoChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <button
          onClick={handleAddStudent}
          className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
        >
          Add Student
        </button>
      </div>
    </div>
  );
}

export default ManageStudents;