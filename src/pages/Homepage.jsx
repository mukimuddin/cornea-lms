import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

function Homepage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleKeyDown = (e) => {
    if (dropdownOpen) {
      const focusableItems = dropdownRef.current.querySelectorAll('a');
      const currentIndex = Array.from(focusableItems).indexOf(document.activeElement);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % focusableItems.length;
        focusableItems[nextIndex].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + focusableItems.length) % focusableItems.length;
        focusableItems[prevIndex].focus();
      } else if (e.key === 'Escape') {
        setDropdownOpen(false);
      }
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      const firstItem = dropdownRef.current.querySelector('a');
      firstItem?.focus();
    }
  }, [dropdownOpen]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Navbar */}
      <header className="w-full bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold text-red-500">Mukim Coaching Center</h1>
          <nav className="relative">
            <button
              onClick={toggleDropdown}
              onKeyDown={handleKeyDown}
              className="text-gray-700 hover:text-red-500 px-4 py-2 rounded-lg focus:outline-none"
            >
              Login
            </button>
            {dropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg"
              >
                <Link
                  to="/student-login"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-500"
                >
                  Student Login
                </Link>
                <Link
                  to="/teacher-login"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-500"
                >
                  Teacher Login
                </Link>
                <Link
                  to="/admin-panel"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-red-500"
                >
                  Admin Login
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Cornea Coaching Center
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Your one-stop solution for academic excellence.
        </p>
        <div className="space-x-4">
          <Link
            to="/student-login"
            className="bg-red-500 text-white px-6 py-3 rounded-lg shadow hover:bg-red-600"
          >
            Student Login
          </Link>
          <Link
            to="/admin-panel"
            className="bg-gray-700 text-white px-6 py-3 rounded-lg shadow hover:bg-gray-800"
          >
            Visit Admin Panel
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Homepage;
