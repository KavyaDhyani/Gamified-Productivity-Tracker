import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup, clearError } from '../features/authSlice';
import { useToast } from '../components/ToastProvider';

/**
 * Signup Component
 * User registration page with real-time validation and progress indicator
 */
const Signup = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [validationErrors, setValidationErrors] = useState({}); // Real-time validation errors
  const [completionProgress, setCompletionProgress] = useState(0); // Form completion percentage

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const { show } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Real-time validation
    const errors = { ...validationErrors };
    if (name === 'name') {
      if (!value) errors.name = 'Name is required';
      else if (value.length < 2) errors.name = 'Name must be at least 2 characters';
      else delete errors.name;
    }
    if (name === 'email') {
      if (!value) errors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(value)) errors.email = 'Email is invalid';
      else delete errors.email;
    }
    if (name === 'password') {
      if (!value) errors.password = 'Password is required';
      else if (value.length < 6) errors.password = 'Password must be at least 6 characters';
      else delete errors.password;
    }
    if (name === 'confirmPassword') {
      if (!value) errors.confirmPassword = 'Please confirm your password';
      else if (value !== formData.password) errors.confirmPassword = 'Passwords do not match';
      else delete errors.confirmPassword;
    }
    setValidationErrors(errors);
    
    // Calculate completion progress
    const newFormData = { ...formData, [name]: value };
    const filledFields = Object.values(newFormData).filter(v => v).length;
    setCompletionProgress((filledFields / 4) * 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      show('Passwords do not match', { type: 'error' });
      return;
    }

    try {
      await dispatch(signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })).unwrap();
      show('Account created successfully', { type: 'success' });
      navigate('/dashboard');
    } catch (error) {
      show(typeof error === 'string' ? error : 'Signup failed', { type: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <Link
              to="/signin"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        {completionProgress > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
              <span>Profile Completion</span>
              <span>{Math.round(completionProgress)}%</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
                style={{ width: `${completionProgress}%` }}
              />
            </div>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={`mt-1 appearance-none relative block w-full px-4 py-3 border-2 ${validationErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />
              {validationErrors.name && (
                <p className="text-red-500 text-xs mt-1 animate-fadeIn">{validationErrors.name}</p>
              )}
              {formData.name && !validationErrors.name && (
                <p className="text-green-500 text-xs mt-1 animate-fadeIn flex items-center gap-1">
                  <span>✓</span> Looks good!
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`mt-1 appearance-none relative block w-full px-4 py-3 border-2 ${validationErrors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {validationErrors.email && (
                <p className="text-red-500 text-xs mt-1 animate-fadeIn">{validationErrors.email}</p>
              )}
              {formData.email && !validationErrors.email && (
                <p className="text-green-500 text-xs mt-1 animate-fadeIn flex items-center gap-1">
                  <span>✓</span> Valid email!
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`mt-1 appearance-none relative block w-full px-4 py-3 border-2 ${validationErrors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              {validationErrors.password && (
                <p className="text-red-500 text-xs mt-1 animate-fadeIn">{validationErrors.password}</p>
              )}
              {formData.password && !validationErrors.password && (
                <p className="text-green-500 text-xs mt-1 animate-fadeIn flex items-center gap-1">
                  <span>✓</span> Strong password!
                </p>
              )}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className={`mt-1 appearance-none relative block w-full px-4 py-3 border-2 ${validationErrors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {validationErrors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1 animate-fadeIn">{validationErrors.confirmPassword}</p>
              )}
              {formData.confirmPassword && !validationErrors.confirmPassword && formData.password === formData.confirmPassword && (
                <p className="text-green-500 text-xs mt-1 animate-fadeIn flex items-center gap-1">
                  <span>✓</span> Passwords match!
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || Object.keys(validationErrors).length > 0 || completionProgress < 100}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating account...
                </div>
              ) : (
                <span>🎉 Create Account</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
