import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './app/store';
import { getUser } from './features/authSlice';
import Navbar from './components/Navbar';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import PastSessions from './pages/PastSessions';
import Landing from './pages/Landing';
import { ToastProvider } from './components/ToastProvider';
import { ThemeProvider } from './components/ThemeProvider';

/**
 * AppContent Component
 * Main app routing and authentication logic
 */
const AppContent = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  // Check authentication status on app load
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Show Navbar only for authenticated users */}
        {isAuthenticated && <Navbar />}
        <Routes>
          {/* Root redirects based on auth status */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/landing" replace />
              )
            }
          />
          <Route
            path="/landing"
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Landing />}
          />
          <Route
            path="/signin"
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signin />}
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />}
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/landing" replace />}
          />
          <Route
            path="/past-sessions"
            element={isAuthenticated ? <PastSessions /> : <Navigate to="/landing" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
};

/**
 * Main App Component
 * Wraps app with Redux Provider, ThemeProvider (dark mode), and ToastProvider
 */
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;