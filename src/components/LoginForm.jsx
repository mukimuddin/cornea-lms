import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Notification from './Notification';

function LoginForm({ role, credentials, redirectPath }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setNotification({ message: 'Both fields are required.', type: 'error' });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (username === credentials.username && password === credentials.password) {
        setNotification({ message: `${role} Login Successful!`, type: 'success' });
        localStorage.setItem('role', role);
        setTimeout(() => {
          navigate(redirectPath);
        }, 1000); // Wait for notification to disappear
      } else {
        setNotification({ message: 'Invalid credentials. Please try again.', type: 'error' });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        aria-labelledby="login-form-title"
      >
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center mb-4 text-red-500 hover:text-red-600"
        >
          <FaArrowLeft className="mr-2" /> {/* Icon */}
          <span className="text-sm font-medium">Back to Homepage</span>
        </button>

        {/* Branding */}
        <div className="text-center mb-6">
          <h2 id="login-form-title" className="text-2xl font-bold text-gray-800">
            {role} Login
          </h2>
        </div>

        {/* Username Field */}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 mb-2"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-required="true"
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-required="true"
          />
        </div>

        {/* Forgot Password */}
        <div className="mb-4 text-right">
          <a
            href="/forgot-password"
            className="text-sm text-red-500 hover:underline"
          >
            Forgot Password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-2 rounded-lg text-white ${
            loading ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'
          }`}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

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

export default LoginForm;
