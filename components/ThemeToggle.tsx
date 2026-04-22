'use client';

import * as React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-black/5 animate-pulse" />
    );
  }

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 p-2 border border-black/10 dark:border-white/10 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Sun className={`absolute w-5 h-5 transition-all duration-500 transform ${
          theme === 'light' ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-90 opacity-0'
        }`} />
        <Moon className={`absolute w-5 h-5 transition-all duration-500 transform ${
          theme === 'dark' ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'
        }`} />
        <Monitor className={`absolute w-5 h-5 transition-all duration-500 transform ${
          theme === 'system' ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-180 opacity-0'
        }`} />
      </div>
      
      {/* Tooltip */}
      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none capitalize">
        {theme} Mode
      </span>
    </button>
  );
}
