import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export const fetchStudents = () => api.get('/api/students');
export const addStudent = (data) => api.post('/api/students', data);
// Add other API calls as needed
