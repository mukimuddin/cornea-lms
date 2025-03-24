import React from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaBook } from 'react-icons/fa';

function Dashboard() {
  const metrics = [
    { label: 'Total Students', value: 1200, icon: <FaUserGraduate />, color: 'bg-blue-500' },
    { label: 'Total Teachers', value: 75, icon: <FaChalkboardTeacher />, color: 'bg-green-500' },
    { label: 'Total Courses', value: 50, icon: <FaBook />, color: 'bg-red-500' },
  ];

  const pendingTasks = [
    { task: 'Approve new student registrations', priority: 'High' },
    { task: 'Review teacher applications', priority: 'Medium' },
    { task: 'Generate monthly performance reports', priority: 'Low' },
  ];

  const recentActivities = [
    { activity: 'John Doe registered for Physics 101', time: '2 hours ago' },
    { activity: 'Jane Smith submitted Chemistry homework', time: '5 hours ago' },
    { activity: 'Admin added a new course: Advanced Math', time: '1 day ago' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className={`flex items-center p-4 rounded-lg shadow-md text-white ${metric.color}`}
          >
            <div className="text-4xl mr-4">{metric.icon}</div>
            <div>
              <h2 className="text-2xl font-bold">{metric.value}</h2>
              <p className="text-lg">{metric.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pending Tasks Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Pending Tasks</h2>
        <ul className="space-y-4">
          {pendingTasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 border rounded-lg shadow-sm"
            >
              <span className="text-gray-800">{task.task}</span>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  task.priority === 'High'
                    ? 'bg-red-500 text-white'
                    : task.priority === 'Medium'
                    ? 'bg-yellow-500 text-white'
                    : 'bg-green-500 text-white'
                }`}
              >
                {task.priority}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Activities Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activities</h2>
        <ul className="space-y-4">
          {recentActivities.map((activity, index) => (
            <li key={index} className="flex items-start space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-gray-800">{activity.activity}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
