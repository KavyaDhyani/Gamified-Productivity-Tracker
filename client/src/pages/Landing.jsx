import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 dark:from-blue-500/10 dark:to-purple-500/10 dark:text-blue-300 text-sm font-bold shadow-lg animate-bounce-slow">
              <span className="text-xl">⚡</span> Gamified Productivity
            </div>
            <h1 className="mt-6 text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
              Level Up Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Focus</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Track sessions, earn XP, unlock achievements, and build streaks. Turn productivity into a game you'll love to play.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg shadow">
                <span className="text-2xl">🔥</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">Build Streaks</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg shadow">
                <span className="text-2xl">🏆</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">Earn Badges</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg shadow">
                <span className="text-2xl">⚡</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">Gain XP</span>
              </div>
            </div>
            <div className="mt-10">
              <Link
                to="/signin"
                className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
              >
                🚀 Start Free
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-200/40 to-purple-200/40 dark:from-blue-500/10 dark:to-purple-500/10 rounded-3xl blur-2xl"></div>
            <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-6 border border-gray-100 dark:border-gray-800">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 border border-blue-100 dark:border-gray-700">
                  <div className="text-3xl">⏱️</div>
                  <div className="mt-2 font-semibold text-gray-800 dark:text-gray-100">Live Timer</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Start, pause, end</div>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 border border-purple-100 dark:border-gray-700">
                  <div className="text-3xl">📈</div>
                  <div className="mt-2 font-semibold text-gray-800 dark:text-gray-100">Progress Charts</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Category insights</div>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-50 to-white dark:from-gray-800 dark:to-gray-900 border border-yellow-100 dark:border-gray-700">
                  <div className="text-3xl">🏷️</div>
                  <div className="mt-2 font-semibold text-gray-800 dark:text-gray-100">Smart Labels</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Clean summaries</div>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-900 border border-green-100 dark:border-gray-700">
                  <div className="text-3xl">🧭</div>
                  <div className="mt-2 font-semibold text-gray-800 dark:text-gray-100">Simple Navigation</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Fast & responsive</div>
                </div>
              </div>
              <div className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center">No signup required to preview the UI.</div>
            </div>
          </div>
        </div>

        <div id="features" className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 shadow border border-gray-100 dark:border-gray-800">
            <div className="text-2xl">✨</div>
            <div className="mt-3 font-semibold text-gray-900 dark:text-gray-100">Modern UI</div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Built with TailwindCSS, smooth transitions, and responsive layouts.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 shadow border border-gray-100 dark:border-gray-800">
            <div className="text-2xl">🔒</div>
            <div className="mt-3 font-semibold text-gray-900 dark:text-gray-100">Cookie Auth</div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Secure JWT cookies with withCredentials across all API calls.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 shadow border border-gray-100 dark:border-gray-800">
            <div className="text-2xl">📊</div>
            <div className="mt-3 font-semibold text-gray-900 dark:text-gray-100">Insightful Analytics</div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">View category distributions and total time spent at a glance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
