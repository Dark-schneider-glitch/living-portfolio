'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  const getFriendlyMessage = (err: Error) => {
    const msg = err.message || '';
    if (msg.includes('__webpack_modules__') || msg.includes('module')) {
      return "Oops, it's not working! We hit a temporary module loading hiccup.";
    }
    if (msg.includes('fetch') || msg.includes('network') || msg.includes('Failed to fetch')) {
      return "Oops, connection error! Unable to reach the server. Please check your network.";
    }
    if (msg.includes('TypeError') || msg.includes('undefined') || msg.includes('null')) {
      return "Oops, rendering error! Something unexpected happened while displaying this view.";
    }
    return "Oops, it's not working! Something went wrong on our end.";
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center p-6 text-center">
      <div className="term-card flex max-w-md flex-col items-center p-8 shadow-terminal-lg border border-border-800 bg-surface-950/95 backdrop-blur-md">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-caution-400/10 text-caution-400 border border-caution-400/20">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h2 className="mb-2 font-display text-2xl font-bold text-text-100">
          Oops, it&apos;s not working!
        </h2>
        <p className="mb-6 text-body-sm leading-relaxed text-text-200">
          {getFriendlyMessage(error)}
        </p>
        <button
          onClick={() => reset()}
          className="btn-primary flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      </div>
    </div>
  );
}

