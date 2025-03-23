import { Outlet, Link } from 'react-router-dom';

function ControllerPanel() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">Controller Panel</h2>
        <nav className="space-y-4">
          <Link to="/controller-panel/manage-students" className="block hover:text-red-500">
            Manage Students
          </Link>
          <Link to="/controller-panel/manage-teachers" className="block hover:text-red-500">
            Manage Teachers
          </Link>
          <Link to="/controller-panel/reports" className="block hover:text-red-500">
            View Reports
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

export default ControllerPanel;
