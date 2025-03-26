import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`, // Ensure VITE_BACKEND_URL is set
  withCredentials: true,
});

export const fetchStudents = () => api.get('/students');
export const addStudent = (data) => api.post('/students', data);
