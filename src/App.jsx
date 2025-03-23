import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/student-login" element={<StudentLogin />} /> {/* Add login route */}
        <Route path="/student-dashboard/*" element={<StudentDashboard />}>
          <Route index element={<Profile />} /> {/* Default route */}
          <Route path="profile" element={<Profile />} />
          <Route path="daily-routine" element={<DailyRoutine />} />
          <Route path="homework" element={<Homework />} />
          <Route path="results" element={<Results />} />
          <Route path="payments" element={<Payments />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
        <Route path="/admin-panel/*" element={<AdminPanel />} /> {/* Admin Panel */}
        <Route path="/controller-panel/*" element={<ControllerPanel />} /> {/* Controller Panel */}
        <Route path="/chat" element={<Chat />} /> {/* Add Chat route */}
        <Route path="/teacher-dashboard/*" element={<TeacherDashboard />}>
          <Route path="daily-routine" element={<TeacherDailyRoutine />} /> {/* Nested Teacher Routine route */}
          <Route path="submit-results" element={<SubmitResults />} /> {/* Add Submit Results route */}
        </Route>
        <Route path="/teacher-login" element={<TeacherLogin />} /> {/* Add Teacher Login route */}
      </Routes>
    </Router>
  )
}

export default App
