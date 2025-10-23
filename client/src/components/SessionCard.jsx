import React from 'react';
import { getCategoryIcon } from '../utils/gamification';

/**
 * SessionCard Component
 * Displays a single session with category, duration, and timestamps
 * @param {Object} session - Session object with startTime, endTime, category, duration
 */
const SessionCard = ({ session }) => {
  /**
   * Format timestamp to readable date and time (without seconds)
   * Example: "Jan 23, 2025 • 02:30 PM"
   */
  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    const date = new Date(timeString);
    const datePart = date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    const timePart = date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    return `${datePart} • ${timePart}`;
  };

  const formatDuration = (minutes) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getCategoryColor = (category) => {
    const colors = {
      work: 'bg-blue-100 text-blue-800',
      study: 'bg-green-100 text-green-800',
      exercise: 'bg-purple-100 text-purple-800',
      reading: 'bg-yellow-100 text-yellow-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return colors[category] || colors.other;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-3xl">{getCategoryIcon(session.category)}</span>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(session.category)}`}>
            {session.category}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-bold shadow">
            {formatDuration(session.duration)}
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">Start Time:</span>
          <span className="text-gray-900 dark:text-gray-100">{formatTime(session.startTime)}</span>
        </div>
        
        {session.endTime && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">End Time:</span>
            <span className="text-gray-900 dark:text-gray-100">{formatTime(session.endTime)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">Status:</span>
          <span className={`font-medium ${session.endTime ? 'text-green-600' : 'text-orange-500'}`}>
            {session.endTime ? 'Completed' : 'In Progress'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
