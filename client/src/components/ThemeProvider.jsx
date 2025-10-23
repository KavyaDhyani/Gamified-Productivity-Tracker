import React, { useEffect } from 'react';

export const ThemeProvider = ({ children }) => {
  useEffect(() => {
    // Always set dark mode
    document.documentElement.classList.add('dark');
  }, []);

  return <>{children}</>;
};
