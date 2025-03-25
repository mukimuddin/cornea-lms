import { Outlet, Link, useNavigate } from 'react-router-dom';

function TeacherDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); // Redirect to homepage on logout
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white text-gray-800 shadow-md p-4">
        <h2 className="text-lg md:text-xl font-bold mb-6">Teacher Dashboard</h2>
        <nav className="space-y-4">
          <Link to="/teacher-dashboard/manage-homework" className="block hover:text-red-500">
            Manage Homework
          </Link>
          <Link to="/teacher-dashboard/submit-results" className="block hover:text-red-500">
            Submit Results
          </Link>
          <Link to="/teacher-dashboard/view-results" className="block hover:text-red-500">
            View Results
          </Link>
          <Link to="/teacher-dashboard/daily-routine" className="block hover:text-red-500">
            Daily Routine
          </Link>
          <Link to="/teacher-dashboard/teacher-profile" className="block hover:text-red-500">
            Teacher Profile
          </Link>
          <Link to="/teacher-dashboard/chat" className="block hover:text-red-500">
            Chat
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800"
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

export default TeacherDashboard;
