'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme-mode', newMode);
    }
  }, []);

  const resolveTheme = useCallback((themeMode: ThemeMode): 'light' | 'dark' => {
    if (themeMode === 'system') {
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return themeMode;
  }, []);

  useEffect(() => {
    setMounted(true);

    // Load saved preference
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme-mode') as ThemeMode | null;
      if (saved) {
        setModeState(saved);
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const theme = resolveTheme(mode);
    setResolvedTheme(theme);

    // Apply to document
    document.documentElement.setAttribute('data-theme', theme);

    // Also set class for Tailwind dark mode
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode, mounted, resolveTheme]);

  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handler = () => {
      if (mode === 'system') {
        const theme = resolveTheme('system');
        setResolvedTheme(theme);
        document.documentElement.setAttribute('data-theme', theme);
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [mode, mounted, resolveTheme]);

  const defaultContext: ThemeContextValue = {
    mode: 'system',
    setMode: () => {},
    resolvedTheme: 'dark',
  };

  if (!mounted) {
    return (
      <ThemeContext.Provider value={defaultContext}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ mode, setMode, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}