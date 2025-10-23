import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getStats, clearError, getPastSessions } from '../features/sessionSlice';
import TimerCircle from '../components/TimerCircle';
import ChartCard from '../components/ChartCard';
import XPBar from '../components/XPBar';
import AchievementBadge from '../components/AchievementBadge';
import { calculateXP, calculateLevel, xpForNextLevel, getStreakIcon, checkAchievements, getAchievementProgress } from '../utils/gamification';

/**
 * Dashboard Component
 * Main dashboard displaying user stats, XP progress, achievements, timer, and analytics charts
 */
const Dashboard = () => {
  // State for timer modal visibility
  const [showTimerModal, setShowTimerModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { currentSession, stats, loading, error, pastSessions } = useSelector((state) => state.session);

  // Fetch stats and past sessions on component mount
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }
    dispatch(getStats());
    dispatch(getPastSessions());
  }, [dispatch, navigate, isAuthenticated]);

  // Clear errors on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  /**
   * Format duration from minutes to readable string (e.g., "2h 30m" or "45m")
   */
  const formatDuration = (minutes) => {
    if (!minutes) return '0m';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  // Calculate total sessions and minutes from stats
  const totalSessions = stats.reduce((sum, stat) => sum + stat.count, 0);
  const totalMinutes = stats.reduce((sum, stat) => sum + stat.totalMinutes, 0);

  // Gamification: Calculate XP and Level
  const currentXP = calculateXP(totalMinutes);
  const level = calculateLevel(currentXP);
  const xpNeeded = xpForNextLevel(level);
  const xpInCurrentLevel = currentXP - xpForNextLevel(level - 1);
  const xpForThisLevel = xpNeeded - xpForNextLevel(level - 1);

  // Date calculations for weekly stats
  const now = new Date();
  const weekAgo = new Date(now);
  weekAgo.setDate(now.getDate() - 7);
  // Calculate total minutes from the last 7 days
  const weeklyMinutes = useMemo(() => {
    if (!pastSessions || pastSessions.length === 0) return 0;
    return pastSessions
      .filter((s) => s.startTime && new Date(s.startTime) >= weekAgo)
      .reduce((sum, s) => sum + (s.duration || 0), 0);
  }, [pastSessions, weekAgo]);

  // Calculate consecutive day streak
  const streakDays = useMemo(() => {
    if (!pastSessions || pastSessions.length === 0) return 0;
    
    // Create a set of unique dates with sessions
    const daysSet = new Set(
      pastSessions.map((s) => {
        const d = new Date(s.startTime);
        return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
      })
    );
    
    // Count consecutive days from today backwards
    let streak = 0;
    for (let i = 0; ; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const key = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
      if (daysSet.has(key)) streak += 1;
      else break;
    }
    return streak;
  }, [pastSessions, now]);

  // Achievements: Check which achievements are unlocked and calculate progress
  const unlockedAchievements = checkAchievements(stats);
  const allAchievements = [
    { id: 'first_session', icon: '🎯', title: 'First Steps', description: 'Complete your first session' },
    { id: '10_sessions', icon: '🌟', title: 'Getting Started', description: 'Complete 10 sessions' },
    { id: '50_sessions', icon: '💎', title: 'Dedicated', description: 'Complete 50 sessions' },
    { id: '10_hours', icon: '⏰', title: 'Time Master', description: 'Focus for 10 hours total' },
    { id: '100_hours', icon: '👑', title: 'Focus Legend', description: 'Focus for 100 hours total' },
  ].map(ach => ({
    ...ach,
    unlocked: unlockedAchievements.some(u => u.id === ach.id),
    progress: getAchievementProgress(stats, ach.id)
  }));

  // Prepare data for bar charts
  const barData = stats.map(stat => ({
    category: stat._id,
    sessions: stat.count,
    minutes: stat.totalMinutes
  }));

  // Show loading spinner on initial load
  if (loading && stats.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 animate-fadeIn">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg animate-pulse-slow">
              <span className="text-2xl">{getStreakIcon(streakDays)}</span>
              <span className="font-bold">{streakDays} Day Streak!</span>
            </div>
          </div>
          
          {/* XP Bar */}
          <div className="mb-8">
            <XPBar currentXP={xpInCurrentLevel} level={level} xpForNextLevel={xpForThisLevel} />
          </div>

          {/* Timer Hero */}
          <div className="mb-8">
            <button
              onClick={() => setShowTimerModal(true)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-between group"
            >
              <div className="text-left">
                <div className="text-sm opacity-90 font-medium">🎯 Focus Timer</div>
                <div className="text-3xl font-bold mt-2">Start Your Session</div>
                <div className="text-sm opacity-75 mt-1">Click to track your productivity</div>
              </div>
              <div className="text-6xl group-hover:scale-110 transition-transform duration-300">⏱️</div>
            </button>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 overflow-hidden shadow-lg rounded-xl transform hover:scale-105 transition-transform duration-300">
              <div className="p-6 text-white">
                <div className="text-3xl mb-2">⏳</div>
                <div className="text-sm opacity-90 font-medium">This Week</div>
                <div className="text-2xl font-bold mt-1">{formatDuration(weeklyMinutes)}</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-red-500 overflow-hidden shadow-lg rounded-xl transform hover:scale-105 transition-transform duration-300">
              <div className="p-6 text-white">
                <div className="text-3xl mb-2 animate-bounce-slow">🔥</div>
                <div className="text-sm opacity-90 font-medium">Streak</div>
                <div className="text-2xl font-bold mt-1">{streakDays} days</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 overflow-hidden shadow-lg rounded-xl transform hover:scale-105 transition-transform duration-300">
              <div className="p-6 text-white">
                <div className="text-3xl mb-2">📊</div>
                <div className="text-sm opacity-90 font-medium">Total Sessions</div>
                <div className="text-2xl font-bold mt-1">{totalSessions}</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 overflow-hidden shadow-lg rounded-xl transform hover:scale-105 transition-transform duration-300">
              <div className="p-6 text-white">
                <div className="text-3xl mb-2">⏱️</div>
                <div className="text-sm opacity-90 font-medium">All Time</div>
                <div className="text-2xl font-bold mt-1">{formatDuration(totalMinutes)}</div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <span>🏆</span> Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allAchievements.map(achievement => (
                <AchievementBadge key={achievement.id} {...achievement} />
              ))}
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ChartCard title="Sessions by Category" subtitle="Count of sessions">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={barData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }} barCategoryGap={20}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" interval={0} tick={{ fontSize: 12 }} label={{ value: 'Category', position: 'insideBottom', offset: -5 }} />
                  <YAxis allowDecimals={false} label={{ value: 'Sessions', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#6366F1" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Total Time per Category" subtitle="Minutes tracked">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={barData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }} barCategoryGap={20}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" interval={0} tick={{ fontSize: 12 }} label={{ value: 'Category', position: 'insideBottom', offset: -5 }} />
                  <YAxis allowDecimals={false} label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value) => `${value}m`} />
                  <Bar dataKey="minutes" fill="#34D399" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          

          {/* Timer Modal */}
          {showTimerModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-xl animate-fadeIn">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Focus Timer</h3>
                  <button onClick={() => setShowTimerModal(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">✕</button>
                </div>
                <TimerCircle />
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mb-4">
              {error}
            </div>
          )}

          {/* Legacy modals removed in favor of TimerCircle */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
