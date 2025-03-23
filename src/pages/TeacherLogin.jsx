import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TeacherLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });
  const navigate = useNavigate();

  const demoCredentials = {
    username: 'demoTeacher',
    password: 'demoPassword',
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === demoCredentials.username && password === demoCredentials.password) {
      setNotification({ message: 'Login successful! Redirecting...', type: 'success', visible: true });
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, visible: false }));
        setTimeout(() => navigate('/teacher-dashboard'), 500);
      }, 2000);
    } else {
      setNotification({ message: 'Invalid credentials. Please try again.', type: 'error', visible: true });
      setTimeout(() => {
        setNotification((prev) => ({ ...prev, visible: false }));
      }, 2000);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative px-4">
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

      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">Teacher Login</h2>
          <button
            onClick={handleBackToHome}
            type="button"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 text-sm md:text-base"
          >
            Back to Home
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm md:text-base"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-sm md:text-base">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm md:text-base"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 text-sm md:text-base"
        >
          Login
        </button>
        <p className="mt-4 text-xs md:text-sm text-gray-500">
          Demo Credentials: <br />
          Username: <span className="font-bold">demoTeacher</span> <br />
          Password: <span className="font-bold">demoPassword</span>
        </p>
      </form>
    </div>
  );
}

export default TeacherLogin;
