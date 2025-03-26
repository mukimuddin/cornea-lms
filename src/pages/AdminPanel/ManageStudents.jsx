import React, { useState, useEffect } from 'react';
import { fetchStudents, addStudent } from '../../utils/api';

function ManageStudents() {
  const [students, setStudents] = useState([]); // State to store students
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
    const loadStudents = async () => {
      try {
        const response = await fetchStudents();
        console.log('Fetched Students:', response.data); // Log the response
        setStudents(response.data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    loadStudents();
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
      // Check file size (e.g., limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB. Please upload a smaller file.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setNewStudent((prev) => ({ ...prev, profilePhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
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
      !newStudent.paymentMethod ||
      !newStudent.username ||
      !newStudent.password
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await addStudent(newStudent);
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
      alert('Student added successfully!');
    } catch (error) {
      console.error('Error adding student:', error.response || error.message);
      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors.map((err) => err.msg).join(', ');
        alert(`Failed to add student: ${validationErrors}`);
      } else {
        alert(`Failed to add student: ${error.response?.data?.error || error.message}`);
      }
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
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 text-gray-800">{student.name}</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-800">{student.gender}</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-800">{student.class}</td>
                    <td className="border border-gray-300 px-4 py-2 text-gray-800">
                      {student.guardianContact}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="border border-gray-300 px-4 py-2 text-center text-gray-500"
                  >
                    No students found.
                  </td>
                </tr>
              )}
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
            type="email" // Add this input field for email
            name="email"
            placeholder="Email"
            value={newStudent.email}
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
            type="text"
            name="username"
            placeholder="Username"
            value={newStudent.username}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <form>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={newStudent.username}
              onChange={handleInputChange}
              className="hidden" // Hidden username field for accessibility
              autoComplete="username"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newStudent.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
              autoComplete="new-password"
            />
          </form>
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