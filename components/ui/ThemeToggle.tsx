'use client';

import { useTheme } from '@/components/ThemeProvider';
import { Sun, Moon, Monitor } from 'lucide-react';

export function ThemeToggle() {
  const { mode, setMode, resolvedTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 rounded-lg bg-surface-900/50 p-1" role="group" aria-label="Theme selector">
      {(['light', 'dark', 'system'] as const).map((theme) => (
        <button
          key={theme}
          onClick={() => setMode(theme)}
          className={`relative flex items-center justify-center w-10 h-10 rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 ${
            mode === theme
              ? 'bg-orange-400/20 text-orange-400 shadow-[0_0_0_1px_rgba(230,84,46,0.3)]'
              : 'text-text-300 hover:text-text-100 hover:bg-surface-800/50'
          }`}
          aria-pressed={mode === theme}
          aria-label={`Switch to ${theme} theme`}
        >
          {theme === 'light' && <Sun className="h-5 w-5" />}
          {theme === 'dark' && <Moon className="h-5 w-5" />}
          {theme === 'system' && <Monitor className="h-5 w-5" />}
          {mode === theme && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-orange-400" />
          )}
        </button>
      ))}
    </div>
  );
}