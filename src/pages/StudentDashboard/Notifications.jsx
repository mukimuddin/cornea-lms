import { useState, useEffect } from 'react';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [filter, setFilter] = useState('all'); // Filter options: '1day', '1week', '1month', 'all'

  useEffect(() => {
    // Simulate fetching notifications from an API
    const fetchNotifications = async () => {
      const mockApiResponse = [
        {
          id: 1,
          title: 'Welcome to Cornea Coaching Center!',
          timestamp: '2023-09-15T10:00:00',
          content: 'We are excited to have you on board. Explore the dashboard to access your daily routine, homework, and more!',
          read: false,
        },
        {
          id: 2,
          title: 'How to Use the Dashboard',
          timestamp: '2023-09-16T09:00:00',
          content: 'Check out our tutorial on how to navigate the dashboard and make the most of its features.',
          read: false,
        },
        {
          id: 3,
          title: 'Upcoming Exam Notification',
          timestamp: '2023-09-17T08:00:00',
          content: 'Your next exam is scheduled for 2023-09-20. Please check the routine for more details.',
          read: false,
        },
      ];

      // Sort notifications by timestamp (latest first)
      const sortedNotifications = mockApiResponse.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );

      setNotifications(sortedNotifications);
    };

    fetchNotifications();
  }, []);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);

    // Mark the notification as read
    setNotifications((prevNotifications) =>
      prevNotifications.map((n) =>
        n.id === notification.id ? { ...n, read: true } : n
      )
    );
  };

  const handleCloseDetail = () => {
    setSelectedNotification(null);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredNotifications = notifications.filter((notification) => {
    const now = new Date();
    const notificationDate = new Date(notification.timestamp);

    if (filter === '1day') {
      return now - notificationDate <= 24 * 60 * 60 * 1000; // Last 1 day
    } else if (filter === '1week') {
      return now - notificationDate <= 7 * 24 * 60 * 60 * 1000; // Last 1 week
    } else if (filter === '1month') {
      return now - notificationDate <= 30 * 24 * 60 * 60 * 1000; // Last 1 month
    }
    return true; // 'all'
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Notifications</h1>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Filter Notifications:</label>
        <select
          value={filter}
          onChange={handleFilterChange}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="all">All</option>
          <option value="1day">Last 1 Day</option>
          <option value="1week">Last 1 Week</option>
          <option value="1month">Last 1 Month</option>
        </select>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => handleNotificationClick(notification)}
            className={`p-4 border rounded-lg shadow-sm hover:bg-gray-100 cursor-pointer ${
              notification.read ? 'bg-white' : 'bg-gray-100 font-bold'
            }`}
          >
            <h2 className="text-lg text-gray-800">{notification.title}</h2>
            <p className="text-sm text-gray-600">{new Date(notification.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Notification Detail Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-800">{selectedNotification.title}</h2>
            <p className="text-sm text-gray-600 mb-4">
              {new Date(selectedNotification.timestamp).toLocaleString()}
            </p>
            <p className="text-gray-700">{selectedNotification.content}</p>
            <button
              onClick={handleCloseDetail}
              className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;
