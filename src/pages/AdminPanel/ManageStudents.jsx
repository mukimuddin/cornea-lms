import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchStudents, addStudent } from '../../utils/api';
function ManageStudents() {
  const [students, setStudents] = useState([]);
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
    username: '', // Add username field
    password: '', // Add password field
  });

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const response = await fetchStudents();
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
        alert('Failed to load students. Please try again.');
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
      const reader = new FileReader();
      reader.onload = () => {
        setNewStudent((prev) => ({ ...prev, profilePhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddStudent = async () => {!newStudent.name || !newStudent.email || !newStudent.password) {
    if (in all required fields.');
      !newStudent.name ||
      !newStudent.fatherName ||
      !newStudent.motherName ||
      !newStudent.dateOfBirth ||
      !newStudent.gender || data to API:', newStudent); // Debugging log
      !newStudent.class ||ost('https://your-backend-service.onrender.com/students', newStudent); // Update URL
      !newStudent.guardianContact ||response.data); // Debugging log
      !newStudent.currentAddress ||..prev, response.data]);
      !newStudent.courseFee ||
      !newStudent.paymentStatus ||
      !newStudent.paymentMethod ||
      !newStudent.username || // Ensure username is provided
      !newStudent.password // Ensure password is provided dateOfBirth: '',
    ) {
      alert('Please fill in all required fields.');Group: '',
      return;   nationality: '',
    }        religion: '',
lass: '',
    try {
      const response = await addStudent(newStudent);
      setStudents((prev) => [...prev, response.data]);
      setNewStudent({
        name: '',ct: '',
        fatherName: '',ntact: '',
        motherName: '',
        dateOfBirth: '', '',
        gender: '',: '',
        bloodGroup: '','',
        nationality: '','',
        religion: '',',
        class: '',
        department: '',to: null,
        previousSchool: '',ion: '',
        currentSchool: '',
        lastExamResults: '',,
        guardianContact: '',
        studentContact: '',
        email: '',
        currentAddress: '',nt added successfully!');
        permanentAddress: '',
        courseFee: '',ding student:', error); // Debugging log
        paymentStatus: '', add student. Please try again.');
        paymentMethod: '',
        discount: '',
        profilePhoto: null,
        guardianOccupation: '',students.filter((student) => {
        specialNeeds: '',
        hostelFacility: '',student.class === filters.class) &&
        username: '',tudent.gender === filters.gender)
        password: '',
      });
      alert('Student added successfully!');
    } catch (error) {
      console.error('Error adding student:', error);g-white shadow-md rounded-lg p-6">
      alert('Failed to add student. Please try again.');udents</h1>
    }
  }; {/* Filters */}
  <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
  const filteredStudents = students.filter((student) => {        <div>
    return (um mb-2">Filter by Class</label>
      (!filters.class || student.class === filters.class) &&elect
      (!filters.gender || student.gender === filters.gender)
    );
  });      onChange={handleFilterChange}
       className="w-full px-4 py-2 border rounded-lg"
  return (          >
    <div className="bg-white shadow-md rounded-lg p-6">  <option value="">All Classes</option>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Students</h1>

      {/* Filters */}            <option value="10">Class 10</option>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Filter by Class</label>
          <select>
            name="class"
            value={filters.class}"
            onChange={handleFilterChange}}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">All Classes</option>
            <option value="8">Class 8</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>ion>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Filter by Gender</label>
          <select
            name="gender"ame="mb-6">
            value={filters.gender}xt-xl font-bold mb-4 text-gray-800">Student List</h2>
            onChange={handleFilterChange}-auto">
            className="w-full px-4 py-2 border rounded-lg"rder-collapse border border-gray-300">
          >
            <option value="">All Genders</option>   <tr className="bg-gray-100">
            <option value="Male">Male</option>-300 px-4 py-2 text-left text-gray-700 font-medium">
            <option value="Female">Female</option>
          </select>
        </div> className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">
      </div>    Gender
    </th>
      {/* Student List */}                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Student List</h2>
        <div className="overflow-x-auto">-gray-700 font-medium">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">
                  Name
                </th>dStudents.map((student) => (
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">ey={student.id} className="hover:bg-gray-50">
                  Gender
                </th>assName="border border-gray-300 px-4 py-2 text-gray-800">{student.gender}</td>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium"> className="border border-gray-300 px-4 py-2 text-gray-800">{student.class}</td>
                  Classtact}</td>
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-gray-700 font-medium">
                  Guardian Contact
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (tudent */}
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{student.name}</td>ew Student</h2>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{student.gender}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{student.class}</td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-800">{student.guardianContact}</td>
                </tr>
              ))}er="Student Name"
            </tbody>={newStudent.name}
          </table>={handleInputChange}
        </div>ame="w-full px-4 py-2 border rounded-lg"
      </div>
nput
      {/* Add New Student */}            type="text"
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Student</h2> placeholder="Father's Name"
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"sName="w-full px-4 py-2 border rounded-lg"
            name="name"
            placeholder="Student Name"
            value={newStudent.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <inputonChange={handleInputChange}
            type="text"sName="w-full px-4 py-2 border rounded-lg"
            name="fatherName"
            placeholder="Father's Name"
            value={newStudent.fatherName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"h}
          />
          <inputclassName="w-full px-4 py-2 border rounded-lg"
            type="text"
            name="motherName"
            placeholder="Mother's Name"
            value={newStudent.motherName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"border rounded-lg"
          />
          <input<option value="">Select Gender</option>
            type="date"ion value="Male">Male</option>
            name="dateOfBirth"ue="Female">Female</option>
            value={newStudent.dateOfBirth}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <selectplaceholder="Class"
            name="gender"={newStudent.class}
            value={newStudent.gender}dleInputChange}
            onChange={handleInputChange}-2 border rounded-lg"
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Select Gender</option> type="text"
            <option value="Male">Male</option>
            <option value="Female">Female</option>mber"
          </select>
          <inpute={handleInputChange}
            type="text"sName="w-full px-4 py-2 border rounded-lg"
            name="class"
            placeholder="Class"
            value={newStudent.class}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg""
          />
          <inputonChange={handleInputChange}
            type="text"sName="w-full px-4 py-2 border rounded-lg"
            name="guardianContact"
            placeholder="Guardian's Contact Number"
            value={newStudent.guardianContact}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <inputonChange={handleInputChange}
            type="text"sName="w-full px-4 py-2 border rounded-lg"
            name="currentAddress"
            placeholder="Current Address"
            value={newStudent.currentAddress}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="number"ion value="">Payment Status</option>
            name="courseFee"="Paid">Paid</option>
            placeholder="Course Fee"ue">Due</option>
            value={newStudent.courseFee}Pending</option>
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <selectvalue={newStudent.paymentMethod}
            name="paymentStatus"nge={handleInputChange}
            value={newStudent.paymentStatus}-4 py-2 border rounded-lg"
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"hod</option>
          >
            <option value="">Payment Status</option> <option value="Bkash">Bkash</option>
            <option value="Paid">Paid</option>
            <option value="Due">Due</option> Transfer</option>
            <option value="Pending">Pending</option>
          </select>
          <selectext"
            name="paymentMethod""username"
            value={newStudent.paymentMethod}e"
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Payment Method</option>>
            <option value="Cash">Cash</option>
            <option value="Bkash">Bkash</option>
            <option value="Nagad">Nagad</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
          <inpute={handleInputChange}
            type="text"sName="w-full px-4 py-2 border rounded-lg"
            name="username"
            placeholder="Username"
            value={newStudent.username}
            onChange={handleInputChange}oChange}
            className="w-full px-4 py-2 border rounded-lg"border rounded-lg"
          />
          <inputv>
            type="password"
            name="password"dStudent}
            placeholder="Password"g-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
            value={newStudent.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="file"
            onChange={handleProfilePhotoChange}
            className="w-full px-4 py-2 border rounded-lg"
          />        </div>        <button          onClick={handleAddStudent}          className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"        >          Add Student        </button>      </div>    </div>  );}export default ManageStudents;