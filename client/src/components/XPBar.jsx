import React from 'react';

/**
 * XPBar Component
 * Displays user's current level and XP progress toward next level
 * @param {number} currentXP - Current XP in this level
 * @param {number} level - Current level
 * @param {number} xpForNextLevel - Total XP needed for this level
 */
const XPBar = ({ currentXP, level, xpForNextLevel }) => {
  const progress = (currentXP / xpForNextLevel) * 100;
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 border border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm">
            {level}
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Level</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Focus Master</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 dark:text-gray-400">XP</p>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{currentXP} / {xpForNextLevel}</p>
        </div>
      </div>
      <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
        {xpForNextLevel - currentXP} XP to level {level + 1}
      </p>
    </div>
  );
};

export default XPBar;
