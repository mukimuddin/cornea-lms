import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`, // Ensure correct base URL
  withCredentials: true,
});

console.log('API Base URL:', `${import.meta.env.VITE_BACKEND_URL}/api`); // Debugging: Log the base URL

export const fetchStudents = () => api.get('/students'); // Fetch students
export const addStudent = (data) => api.post('/students', data); // Add a new student
