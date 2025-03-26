import React, { useState, useEffect } from 'react';
import { fetchStudents, addStudent } from '../../utils/api';

function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    class: '',
    gender: '',
    guardianContact: '',
    currentAddress: '',
    courseFee: '',
    paymentStatus: '',
    paymentMethod: '',
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const response = await fetchStudents();
        setStudents(response.data);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to load students. Please try again later.');
      }
    };
    loadStudents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStudent = async () => {
    if (!newStudent.name || !newStudent.email || !newStudent.class) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await addStudent(newStudent);
      setStudents((prev) => [...prev, response.data]);
      setNewStudent({
        name: '',
        email: '',
        class: '',
        gender: '',
        guardianContact: '',
        currentAddress: '',
        courseFee: '',
        paymentStatus: '',
        paymentMethod: '',
        username: '',
        password: '',
      });
      setError('');
    } catch (err) {
      console.error('Error adding student:', err);
      setError('Failed to add student. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6">Manage Students</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Add New Student</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newStudent.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newStudent.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
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
            name="gender"
            placeholder="Gender"
            value={newStudent.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            name="guardianContact"
            placeholder="Guardian Contact"
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
          <input
            type="text"
            name="paymentStatus"
            placeholder="Payment Status"
            value={newStudent.paymentStatus}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            name="paymentMethod"
            placeholder="Payment Method"
            value={newStudent.paymentMethod}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={newStudent.username}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={newStudent.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
        <button
          onClick={handleAddStudent}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Student'}
        </button>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Student List</h2>
        {students.length === 0 ? (
          <p>No students found.</p>
        ) : (
          <ul>
            {students.map((student) => (
              <li key={student._id} className="mb-2">
                {student.name} - {student.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ManageStudents;