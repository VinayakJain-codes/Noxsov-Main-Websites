"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
        setIsVisible(window.scrollY > 300);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      id="back-to-top-btn"
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title="Scroll back to top"
      className="fixed bottom-6 right-6 z-40 p-2.5 rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 group
        bg-white/90 text-slate-800 border border-slate-300/80 backdrop-blur-md
        dark:bg-[#0a0f1d]/90 dark:text-neutral-200 dark:border-white/[0.12] dark:shadow-cyan-950/40"
    >
      {/* Circular Progress SVG */}
      <svg className="w-9 h-9 -rotate-90" viewBox="0 0 44 44">
        <circle
          cx="22"
          cy="22"
          r={radius}
          className="stroke-slate-200 dark:stroke-white/[0.08]"
          strokeWidth="3"
          fill="none"
        />
        <circle
          cx="22"
          cy="22"
          r={radius}
          className="stroke-cyan-500 transition-all duration-100"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <ArrowUp className="w-4 h-4 absolute inset-0 m-auto text-slate-700 dark:text-neutral-200 group-hover:text-cyan-500 transition-colors" />
    </button>
  );
}
