import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">Event Manager</Link>
        </h1>
        <nav className="space-x-4">
          {localStorage.getItem('userToken') ? (
            <>
              <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-200">Login</Link>
              <Link
                to="/register"
                className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
