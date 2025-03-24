import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import StudentDashboard from './pages/StudentDashboard'; // Correctly import the dashboard layout
import AdminPanel from './pages/AdminPanel'; // Correct import for Admin Panel
import DailyRoutine from './pages/StudentDashboard/DailyRoutine.jsx'
import Homework from './pages/StudentDashboard/Homework.jsx'
import Results from './pages/StudentDashboard/Results.jsx'
import Payments from './pages/StudentDashboard/Payments.jsx'
import Notifications from './pages/StudentDashboard/Notifications.jsx'
import Profile from './pages/StudentDashboard/Profile.jsx'; // Import Profile
import StudentLogin from './pages/StudentLogin.jsx'; // Import StudentLogin
import Chat from './pages/Chat.jsx'; // Import Chat page
import TeacherDashboard from './pages/TeacherDashboard'; // Import Teacher Dashboard
import TeacherLogin from './pages/TeacherLogin.jsx'; // Import TeacherLogin
import TeacherDailyRoutine from './pages/TeacherDashboard/DailyRoutine.jsx'; // Import Teacher Routine
import SubmitResults from './pages/TeacherDashboard/SubmitResults.jsx'; // Import Submit Results
import ControllerPanel from './pages/ControllerPanel'; // Import Controller Panel
import Dashboard from './pages/AdminPanel/Dashboard';
import ManageStudents from './pages/AdminPanel/ManageStudents';
import ManageTeachers from './pages/AdminPanel/ManageTeachers';
import Courses from './pages/AdminPanel/Courses';
import Reports from './pages/AdminPanel/Reports';
import Settings from './pages/AdminPanel/Settings';
import ManageAdmins from './pages/AdminPanel/ManageAdmins';
import AdminLogin from './pages/AdminLogin';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const fetchdata = async () => {
      const response = await fetch("http://localhost:5000/");
      const data = await response.json();
      console.log(data);
    }
    fetchdata();
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/student-login" element={<StudentLogin />} /> {/* Add login route */}
        <Route path="/teacher-login" element={<TeacherLogin />} /> {/* Add Teacher Login route */}
        <Route path="/admin-login" element={<AdminLogin />} /> {/* Add Admin Login route */}
        <Route path="/student-dashboard/*" element={<StudentDashboard />}>
          <Route index element={<Profile />} /> {/* Default route */}
          <Route path="profile" element={<Profile />} />
          <Route path="daily-routine" element={<DailyRoutine />} />
          <Route path="homework" element={<Homework />} />
          <Route path="results" element={<Results />} />
          <Route path="payments" element={<Payments />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
        <Route path="/admin-panel/*" element={<AdminPanel />}> {/* Admin Panel */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manage-students" element={<ManageStudents />} />
          <Route path="manage-teachers" element={<ManageTeachers />} />
          <Route path="manage-admins" element={<ManageAdmins />} />
          <Route path="courses" element={<Courses />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/controller-panel/*" element={<ControllerPanel />} /> {/* Controller Panel */}
        <Route path="/chat" element={<Chat />} /> {/* Add Chat route */}
        <Route path="/teacher-dashboard/*" element={<TeacherDashboard />}>
          <Route path="daily-routine" element={<TeacherDailyRoutine />} /> {/* Nested Teacher Routine route */}
          <Route path="submit-results" element={<SubmitResults />} /> {/* Add Submit Results route */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
