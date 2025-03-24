import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SuperAdminSetup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSetup = (e) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Save the Super Admin credentials (for now, using localStorage)
    localStorage.setItem('superadmin_username', username);
    localStorage.setItem('superadmin_password', password);

    setSuccess('Super Admin setup successful! Redirecting to login...');
    setTimeout(() => {
      navigate('/admin-login');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSetup}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
        aria-labelledby="setup-form-title"
      >
        <h2 id="setup-form-title" className="text-2xl font-bold mb-4 text-gray-800">
          Super Admin Setup
        </h2>

        {error && <p className="text-red-500 mb-4" role="alert">{error}</p>}
        {success && <p className="text-green-500 mb-4" role="alert">{success}</p>}

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirm-password" className="block text-gray-700 mb-2">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Setup Super Admin
        </button>
      </form>
    </div>
  );
}

export default SuperAdminSetup;
