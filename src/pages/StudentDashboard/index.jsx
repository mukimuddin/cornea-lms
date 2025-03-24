import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function StudentDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '', visible: false }); // Notification state
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  const handleLogout = () => {
    setNotification({ message: 'Logout successful!', type: 'success', visible: true });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false })); // Fade out
      setTimeout(() => navigate('/student-login'), 500); // Redirect after fade-out
    }, 2000);
  };

  return (
    <div className={`flex h-screen bg-gray-100 dark:bg-gray-900 relative`}>
      {/* Notification */}
      {notification.message && (
        <div
          className={`absolute top-4 right-4 p-3 rounded-lg text-white transition-opacity duration-500 ${
            notification.visible ? 'opacity-100' : 'opacity-0'
          } ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {notification.message}
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-md p-4">
        <h2 className="text-lg md:text-xl font-bold mb-6">Student Dashboard</h2>
        <nav className="space-y-4">
          <Link to="/student-dashboard/profile" className="block hover:text-red-500">
            Profile
          </Link>
          <Link to="/student-dashboard/daily-routine" className="block hover:text-red-500">
            Daily Routine
          </Link>
          <Link to="/student-dashboard/homework" className="block hover:text-red-500">
            Homework
          </Link>
          <Link to="/student-dashboard/results" className="block hover:text-red-500">
            Results
          </Link>
          <Link to="/student-dashboard/payments" className="block hover:text-red-500">
            Payments
          </Link>
          <Link to="/student-dashboard/notifications" className="block hover:text-red-500">
            Notifications
          </Link>
          <Link to="/chat" className="block hover:text-red-500">
            Chat
          </Link>
        </nav>
        <button
          onClick={toggleDarkMode}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 text-sm md:text-base"
        >
          Toggle {darkMode ? 'Light' : 'Dark'} Mode
        </button>
        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 text-sm md:text-base"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <Outlet /> {/* Render child routes here */}
      </main>
    </div>
  );
}

export default StudentDashboard;
