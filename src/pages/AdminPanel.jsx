import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';

function AdminPanel() {
  const [notification, setNotification] = useState(null);
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole);

    if (!userRole) {
      navigate('/admin-login'); // Redirect if no role is found
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('role'); // Clear role from localStorage
    setNotification({ message: 'Logged out successfully!', type: 'success' });
    setTimeout(() => {
      navigate('/admin-login'); // Redirect to login page
    }, 1000); // Wait for notification to disappear
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <Link to="/admin-panel/dashboard" className="block hover:text-red-500">
            Dashboard
          </Link>
          <Link to="/admin-panel/manage-students" className="block hover:text-red-500">
            Manage Students
          </Link>
          <Link to="/admin-panel/manage-teachers" className="block hover:text-red-500">
            Manage Teachers
          </Link>
          <Link to="/admin-panel/courses" className="block hover:text-red-500">
            Manage Courses
          </Link>
          <Link to="/admin-panel/reports" className="block hover:text-red-500">
            Reports
          </Link>
          <Link to="/admin-panel/settings" className="block hover:text-red-500">
            Settings
          </Link>
          <Link to="/admin-panel/manage-admins" className="block hover:text-red-500">
            Manage Admins
          </Link>
          <Link to="/admin-panel/admin-profile" className="block hover:text-red-500">
            Admin Profile
          </Link>
          {/* Removed Super Admin Profile */}
          <button
            onClick={handleLogout}
            className="block w-full text-left text-red-500 hover:text-red-600 mt-4"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet /> {/* Render child routes here */}
      </main>

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default AdminPanel;
