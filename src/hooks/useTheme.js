/* ============================================================
   useTheme — Dark Theme Locking Management
   ============================================================ */
import { useEffect, useCallback } from 'react';

export function useTheme() {
  // Always apply dark theme to HTML element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('sq10-theme', 'dark');
  }, []);

  const toggleTheme = useCallback(() => {
    // No-op since light theme is removed
  }, []);

  return { theme: 'dark', toggleTheme };
}

export default useTheme;
