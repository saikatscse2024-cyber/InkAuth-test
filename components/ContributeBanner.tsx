'use client';

import { useState, useEffect } from 'react';
import { X, PenLine, Sparkles } from 'lucide-react';

const CONTRIBUTE_FORM_URL = 'https://forms.gle/diSgxTrEejfwLvaP8'; // Replace with Google Form URL later

export default function ContributeBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Always show on mount (reload)
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    // Wait for exit animation to finish before removing from DOM
    setTimeout(() => {
      setDismissed(true);
    }, 400);
  };

  if (dismissed) return null;

  return (
    <div
      className={`absolute top-0 left-0 right-0 z-40 transition-all duration-700 ease-out ${visible
          ? 'translate-y-[72px] sm:translate-y-[80px] opacity-100'
          : '-translate-y-full opacity-0'
        }`}
    >
      <div className="contribute-banner mx-auto max-w-5xl px-2 sm:px-6 mt-2">
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-[0_20px_50px_rgba(79,70,229,0.3)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/30 backdrop-blur-md">
          {/* Animated gradient background */}
          <div className="absolute inset-0 contribute-gradient animate-gradient-shift" />

          {/* Subtle shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />

          {/* Floating decorative dots */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />

          {/* Content */}
          <div className="relative px-3 py-2.5 sm:px-6 sm:py-4 flex items-center justify-between gap-2 sm:gap-3">
            {/* Left section - icon + text */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="hidden sm:flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl shrink-0 animate-gentle-bounce">
                <PenLine className="w-5 h-5 text-white" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-200 shrink-0 animate-pulse" />
                  <span className="text-[9px] sm:text-xs font-bold uppercase tracking-wider text-white/80">
                    Open for Writers
                  </span>
                </div>
                <p className="text-[11px] sm:text-sm text-white font-medium leading-tight sm:leading-snug truncate sm:whitespace-normal">
                  Share your stories with{' '}
                  <span className="font-bold text-yellow-100">thousands</span>!
                  <span className="hidden md:inline"> Your words deserve an audience ✨</span>
                </p>
              </div>
            </div>

            {/* Right section - CTA + dismiss */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <a
                href={CONTRIBUTE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-1 bg-white text-purple-700 font-bold text-[10px] sm:text-sm px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl hover:bg-yellow-50 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
              >
                <span>Contribute</span>
                <svg
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>

              <button
                onClick={handleDismiss}
                className="p-1 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                aria-label="Dismiss banner"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
