import React from 'react';

/**
 * AchievementBadge Component
 * Displays an achievement card with unlock status and progress
 * @param {string} icon - Emoji icon for the achievement
 * @param {string} title - Achievement title
 * @param {string} description - Achievement description
 * @param {boolean} unlocked - Whether the achievement is unlocked
 * @param {number} progress - Progress percentage (0-100) for locked achievements
 */
const AchievementBadge = ({ icon, title, description, unlocked = false, progress = 0 }) => {
  return (
    <div className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
      unlocked 
        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-400 dark:border-yellow-600 shadow-lg' 
        : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-60'
    }`}>
      <div className="flex items-start gap-3">
        <div className={`text-3xl ${unlocked ? 'animate-bounce-slow' : 'grayscale'}`}>
          {icon}
        </div>
        <div className="flex-1">
          <h4 className={`font-semibold text-sm ${unlocked ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>
            {title}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
          {!unlocked && progress > 0 && (
            <div className="mt-2">
              <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">{Math.floor(progress)}%</p>
            </div>
          )}
        </div>
      </div>
      {unlocked && (
        <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1 shadow-lg">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default AchievementBadge;
