import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function AdminPanel() {
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
          <Link to="/admin-panel/super-admin-profile" className="block hover:text-red-500">
            Super Admin Profile
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet /> {/* Render child routes here */}
      </main>
    </div>
  );
}

export default AdminPanel;
