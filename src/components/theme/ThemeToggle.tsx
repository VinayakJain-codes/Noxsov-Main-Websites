"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { Sun, Moon, Laptop, Check } from "lucide-react";

interface ThemeToggleProps {
  showDropdown?: boolean;
  className?: string;
}

export function ThemeToggle({ showDropdown = false, className = "" }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  if (!mounted) {
    // Render placeholder with same dimensions to avoid layout shift
    return (
      <div className={`w-9 h-9 rounded-lg border border-transparent ${className}`} />
    );
  }

  if (!showDropdown) {
    return (
      <button
        id="theme-toggle-btn"
        type="button"
        onClick={toggleTheme}
        className={`relative p-2 rounded-lg cursor-pointer transition-all duration-200 
          bg-slate-200/60 hover:bg-slate-300/80 text-slate-800 border border-slate-300/60
          dark:bg-white/[0.05] dark:hover:bg-white/[0.1] dark:text-neutral-200 dark:border-white/[0.1]
          focus:outline-none focus:ring-2 focus:ring-cyan-500/50 shadow-sm ${className}`}
        aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
        title={`Current: ${resolvedTheme === "dark" ? "Dark Mode" : "Light Mode"} (click to toggle)`}
      >
        <div className="relative w-4 h-4">
          <Sun
            className={`w-4 h-4 text-amber-500 transition-all duration-300 absolute inset-0 ${
              resolvedTheme === "light"
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-0 opacity-0"
            }`}
          />
          <Moon
            className={`w-4 h-4 text-cyan-400 transition-all duration-300 absolute inset-0 ${
              resolvedTheme === "dark"
                ? "rotate-0 scale-100 opacity-100"
                : "rotate-90 scale-0 opacity-0"
            }`}
          />
        </div>
      </button>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        id="theme-dropdown-btn"
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
          bg-slate-200/60 hover:bg-slate-300/80 text-slate-800 border border-slate-300/60
          dark:bg-white/[0.05] dark:hover:bg-white/[0.1] dark:text-neutral-200 dark:border-white/[0.1]
          focus:outline-none focus:ring-2 focus:ring-cyan-500/50 shadow-sm"
        aria-expanded={dropdownOpen}
        aria-label="Theme selector"
      >
        {resolvedTheme === "dark" ? (
          <Moon className="w-3.5 h-3.5 text-cyan-400" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber-500" />
        )}
        <span className="capitalize font-mono text-[11px]">{theme}</span>
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-1.5 w-36 rounded-xl p-1 shadow-xl z-50
          bg-white/95 border border-slate-200 text-slate-800 backdrop-blur-xl
          dark:bg-[#0b101b]/95 dark:border-white/[0.1] dark:text-neutral-200">
          <button
            type="button"
            onClick={() => {
              setTheme("light");
              setDropdownOpen(false);
            }}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              theme === "light"
                ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold"
                : "hover:bg-slate-100 dark:hover:bg-white/[0.05]"
            }`}
          >
            <div className="flex items-center gap-2">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Light</span>
            </div>
            {theme === "light" && <Check className="w-3.5 h-3.5 text-cyan-500" />}
          </button>

          <button
            type="button"
            onClick={() => {
              setTheme("dark");
              setDropdownOpen(false);
            }}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              theme === "dark"
                ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold"
                : "hover:bg-slate-100 dark:hover:bg-white/[0.05]"
            }`}
          >
            <div className="flex items-center gap-2">
              <Moon className="w-3.5 h-3.5 text-cyan-400" />
              <span>Dark</span>
            </div>
            {theme === "dark" && <Check className="w-3.5 h-3.5 text-cyan-500" />}
          </button>

          <button
            type="button"
            onClick={() => {
              setTheme("system");
              setDropdownOpen(false);
            }}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              theme === "system"
                ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold"
                : "hover:bg-slate-100 dark:hover:bg-white/[0.05]"
            }`}
          >
            <div className="flex items-center gap-2">
              <Laptop className="w-3.5 h-3.5 text-neutral-400" />
              <span>System</span>
            </div>
            {theme === "system" && <Check className="w-3.5 h-3.5 text-cyan-500" />}
          </button>
        </div>
      )}
    </div>
  );
}
