import Link from "next/link";
import Image from "next/image";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  showText?: boolean;
  clickable?: boolean;
  className?: string;
}

export function BrandLogo({
  size = "md",
  showTagline = false,
  showText = true,
  clickable = true,
  className = "",
}: BrandLogoProps) {
  const iconDimensions = {
    sm: { box: "w-7 h-7 p-0.5", img: 26 },
    md: { box: "w-9 h-9 p-1", img: 34 },
    lg: { box: "w-11 h-11 p-1.5", img: 42 },
    xl: { box: "w-14 h-14 p-2", img: 54 },
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  const content = (
    <div className={`group inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* 3D Isometric Noxsov Shield Emblem */}
      <div
        className={`relative flex items-center justify-center ${iconDimensions[size].box}`}
      >
        <Image
          src="/noxsov-logo.png"
          alt="NOXSOV Logo"
          width={iconDimensions[size].img}
          height={iconDimensions[size].img}
          priority
          className="w-full h-full object-contain  transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 rounded-xl bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5 transition-colors ${textSizes[size]}`}
          >
            NOXSOV
          </span>
          {showTagline && (
            <span className="text-xs tracking-wider uppercase text-slate-500 dark:text-neutral-400 font-medium">
              Sovereign Ecosystem
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (!clickable) {
    return content;
  }

  return (
    <Link
      href="/"
      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg inline-block"
      aria-label="NOXSOV Home"
    >
      {content}
    </Link>
  );
}
