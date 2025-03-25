import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import StudentDashboard from './pages/StudentDashboard';
import AdminPanel from './pages/AdminPanel';
import DailyRoutine from './pages/StudentDashboard/DailyRoutine.jsx';
import Homework from './pages/StudentDashboard/Homework.jsx';
import Results from './pages/StudentDashboard/Results.jsx';
import Payments from './pages/StudentDashboard/Payments.jsx';
import Notifications from './pages/StudentDashboard/Notifications.jsx';
import Profile from './pages/StudentDashboard/Profile.jsx';
import StudentLogin from './pages/StudentLogin.jsx';
import Chat from './pages/Chat.jsx';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherLogin from './pages/TeacherLogin.jsx';
import TeacherDailyRoutine from './pages/TeacherDashboard/DailyRoutine.jsx';
import SubmitResults from './pages/TeacherDashboard/SubmitResults.jsx';
import ControllerPanel from './pages/ControllerPanel';
import Dashboard from './pages/AdminPanel/Dashboard';
import ManageStudents from './pages/AdminPanel/ManageStudents';
import ManageTeachers from './pages/AdminPanel/ManageTeachers';
import Courses from './pages/AdminPanel/Courses';
import Reports from './pages/AdminPanel/Reports';
import Settings from './pages/AdminPanel/Settings';
import ManageAdmins from './pages/AdminPanel/ManageAdmins';
import AdminLogin from './pages/AdminLogin';
import SuperAdminProfile from './pages/AdminPanel/SuperAdminProfile';
import SuperAdminSetup from './pages/SuperAdminSetup';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch('http://localhost:5000/');
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchdata();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/super-admin-setup" element={<SuperAdminSetup />} />
        <Route path="/student-dashboard/*" element={<StudentDashboard />}>
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="daily-routine" element={<DailyRoutine />} />
          <Route path="homework" element={<Homework />} />
          <Route path="results" element={<Results />} />
          <Route path="payments" element={<Payments />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
        <Route path="/admin-panel/*" element={<AdminPanel />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manage-students" element={<ManageStudents />} />
          <Route path="manage-teachers" element={<ManageTeachers />} />
          <Route path="manage-admins" element={<ManageAdmins />} />
          <Route path="courses" element={<Courses />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="super-admin-profile" element={<SuperAdminProfile />} />
        </Route>
        <Route path="/controller-panel/*" element={<ControllerPanel />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/teacher-dashboard/*" element={<TeacherDashboard />}>
          <Route path="daily-routine" element={<TeacherDailyRoutine />} />
          <Route path="submit-results" element={<SubmitResults />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
