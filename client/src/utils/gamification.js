/**
 * Gamification Utilities
 * Functions for calculating XP, levels, achievements, and other game mechanics
 */

/**
 * Calculate XP from total minutes
 * Formula: 1 minute = 10 XP
 * @param {number} totalMinutes - Total focus minutes
 * @returns {number} Total XP earned
 */
export const calculateXP = (totalMinutes) => {
  return totalMinutes * 10;
};

/**
 * Calculate level from XP
 * Formula: level = floor(sqrt(xp / 100)) + 1
 * @param {number} xp - Total XP
 * @returns {number} Current level
 */
export const calculateLevel = (xp) => {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

/**
 * Calculate total XP needed to reach a specific level
 * Formula: xp = level^2 * 100
 * @param {number} currentLevel - Target level
 * @returns {number} Total XP needed
 */
export const xpForNextLevel = (currentLevel) => {
  return currentLevel * currentLevel * 100;
};

/**
 * Get emoji icon for a category
 * @param {string} category - Session category
 * @returns {string} Emoji icon
 */
export const getCategoryIcon = (category) => {
  const icons = {
    work: '💼',
    study: '📚',
    exercise: '💪',
    reading: '📖',
    other: '✨',
  };
  return icons[category] || icons.other;
};

/**
 * Get streak icon based on streak length
 * @param {number} streak - Number of consecutive days
 * @returns {string} Emoji representing streak level
 */
export const getStreakIcon = (streak) => {
  if (streak >= 30) return '🔥🔥🔥'; // 30+ days: triple fire
  if (streak >= 7) return '🔥🔥';   // 7+ days: double fire
  if (streak >= 3) return '🔥';     // 3+ days: single fire
  return '⭐';                  // < 3 days: star
};

/**
 * Check which achievements are unlocked based on stats
 * @param {Array} stats - Array of session stats by category
 * @returns {Array} Array of unlocked achievement objects
 */
export const checkAchievements = (stats) => {
  const achievements = [];
  const totalSessions = stats.reduce((sum, s) => sum + s.count, 0);
  const totalMinutes = stats.reduce((sum, s) => sum + s.totalMinutes, 0);
  
  // First Session
  if (totalSessions >= 1) {
    achievements.push({
      id: 'first_session',
      icon: '🎯',
      title: 'First Steps',
      description: 'Complete your first session',
      unlocked: true,
    });
  }
  
  // 10 Sessions
  if (totalSessions >= 10) {
    achievements.push({
      id: '10_sessions',
      icon: '🌟',
      title: 'Getting Started',
      description: 'Complete 10 sessions',
      unlocked: true,
    });
  }
  
  // 50 Sessions
  if (totalSessions >= 50) {
    achievements.push({
      id: '50_sessions',
      icon: '💎',
      title: 'Dedicated',
      description: 'Complete 50 sessions',
      unlocked: true,
    });
  }
  
  // 10 Hours
  if (totalMinutes >= 600) {
    achievements.push({
      id: '10_hours',
      icon: '⏰',
      title: 'Time Master',
      description: 'Focus for 10 hours total',
      unlocked: true,
    });
  }
  
  // 100 Hours
  if (totalMinutes >= 6000) {
    achievements.push({
      id: '100_hours',
      icon: '👑',
      title: 'Focus Legend',
      description: 'Focus for 100 hours total',
      unlocked: true,
    });
  }
  
  return achievements;
};

/**
 * Calculate progress percentage for a specific achievement
 * @param {Array} stats - Array of session stats by category
 * @param {string} achievementId - Achievement identifier
 * @returns {number} Progress percentage (0-100)
 */
export const getAchievementProgress = (stats, achievementId) => {
  const totalSessions = stats.reduce((sum, s) => sum + s.count, 0);
  const totalMinutes = stats.reduce((sum, s) => sum + s.totalMinutes, 0);
  
  switch (achievementId) {
    case '10_sessions':
      return (totalSessions / 10) * 100;
    case '50_sessions':
      return (totalSessions / 50) * 100;
    case '10_hours':
      return (totalMinutes / 600) * 100;
    case '100_hours':
      return (totalMinutes / 6000) * 100;
    default:
      return 0;
  }
};
