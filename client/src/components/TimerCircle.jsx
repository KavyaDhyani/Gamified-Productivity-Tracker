import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSession, endSession, getStats } from '../features/sessionSlice';
import Badge from './Badge';
import { useToast } from './ToastProvider';

/**
 * TimerCircle Component
 * Displays a circular timer with progress ring for tracking focus sessions
 * Handles session start, pause/resume, and end functionality
 */
const TimerCircle = () => {
  const dispatch = useDispatch();
  const { currentSession, loading } = useSelector((state) => state.session);
  const { show } = useToast(); // Toast notifications

  // Local state
  const [category, setCategory] = useState('work'); // Selected category for new session
  const [elapsed, setElapsed] = useState(0); // Elapsed time in seconds
  const [isPaused, setIsPaused] = useState(false); // Pause state
  const intervalRef = useRef(null); // Reference to timer interval

  // Timer calculations
  const FULL_DASH_ARRAY = 283; // Circumference of progress circle
  const startTime = useMemo(() => (currentSession ? new Date(currentSession.startTime) : null), [currentSession]);

  useEffect(() => {
    if (!currentSession) {
      clearInterval(intervalRef.current);
      setElapsed(0);
      setIsPaused(false);
      return;
    }
    // Timer effect: Update elapsed time every second when session is active and not paused
    if (currentSession && !isPaused) {
      intervalRef.current = setInterval(() => {
        const now = new Date();
        setElapsed(Math.floor((now - new Date(startTime)) / 1000));
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentSession, isPaused, startTime]);

  // Progress visualization: loop every 60 mins for animation feel
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const progress = (elapsed % (60 * 60)) / (60 * 60); // 0..1 over an hour
  const dashOffset = FULL_DASH_ARRAY * (1 - progress);

  /**
   * Start a new focus session
   */
  const handleStart = async () => {
    try {
      await dispatch(startSession({ category })).unwrap();
      setElapsed(0);
      setIsPaused(false);
      show('Session started', { type: 'success' });
    } catch (e) {
      show(typeof e === 'string' ? e : 'Failed to start session', { type: 'error' });
    }
  };

  /**
   * End the current session and refresh stats
   */
  const handleEnd = async () => {
    try {
      await dispatch(endSession(currentSession._id)).unwrap();
      show('Session ended', { type: 'success' });
      dispatch(getStats()); // Refresh dashboard stats
    } catch (e) {
      show(typeof e === 'string' ? e : 'Failed to end session', { type: 'error' });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 flex flex-col items-center gap-4 border border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-2">
        <Badge color={currentSession ? 'green' : 'gray'}>
          {currentSession ? currentSession.category : 'Idle'}
        </Badge>
      </div>

      <div className="relative w-64 h-64">
        <svg className="w-64 h-64 -rotate-90 filter drop-shadow-lg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="#E5E7EB" strokeWidth="8" fill="none" className="dark:stroke-gray-700" />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#grad)"
            strokeWidth="8"
            strokeDasharray={`${FULL_DASH_ARRAY}`}
            strokeDashoffset={`${dashOffset}`}
            strokeLinecap="round"
            fill="none"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tabular-nums">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">{currentSession ? 'In Progress' : 'Ready'}</div>
        </div>
      </div>

      {!currentSession && (
        <div className="w-full flex flex-col gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium transition-all"
          >
            <option value="work">💼 Work</option>
            <option value="study">📚 Study</option>
            <option value="exercise">💪 Exercise</option>
            <option value="reading">📖 Reading</option>
            <option value="other">✨ Other</option>
          </select>
          <button
            onClick={handleStart}
            disabled={loading}
            className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {loading ? '⏳ Starting...' : '🚀 Start Session'}
          </button>
        </div>
      )}

      {currentSession && (
        <div className="w-full flex gap-3">
          <button
            onClick={() => setIsPaused((p) => !p)}
            className="flex-1 px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            {isPaused ? '▶️ Resume' : '⏸️ Pause'}
          </button>
          <button
            onClick={handleEnd}
            disabled={loading}
            className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold hover:from-red-700 hover:to-pink-700 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {loading ? '⏳ Ending...' : '🏁 End Session'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TimerCircle;
