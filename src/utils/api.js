import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  withCredentials: true,
});

export const fetchStudents = () => api.get('/students');
export const addStudent = (data) => api.post('/students', data);
