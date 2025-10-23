import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../features/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  const handleSignout = async () => {
    try {
      await dispatch(signout()).unwrap();
      navigate('/signin');
    } catch (error) {
      console.error('Signout failed:', error);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-xl font-bold text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Productivity Tracker
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                {(user?.name || user?.username || user?.email || 'U').charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-700 dark:text-gray-200 font-medium hidden sm:block">
                {user?.name || user?.username || user?.email?.split('@')[0] || 'User'}
              </span>
            </div>
            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/dashboard' ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-500/10' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/past-sessions"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === '/past-sessions' ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-500/10' : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              Past Sessions
            </Link>
            <button
              onClick={handleSignout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
