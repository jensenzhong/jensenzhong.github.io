"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface MeteorStyle {
  top: number;
  left: string;
  animationDelay: string;
  animationDuration: string;
}

interface MeteorsProps {
  number?: number;
  className?: string;
}

/**
 * Deterministic styles for SSR — pure function, no Math.random().
 * Uses a simple hash to spread meteors across the viewport.
 */
function generateDeterministicStyles(count: number): MeteorStyle[] {
  return Array.from({ length: count }, (_, i) => ({
    top: -5,
    left: `${((i * 37 + 13) % 100)}%`,
    animationDelay: `${((i * 1.3) % 5).toFixed(2)}s`,
    animationDuration: `${((i * 1.7) % 8 + 2).toFixed(2)}s`,
  }));
}

/**
 * Random styles generated client-side only (via useEffect).
 */
function generateRandomStyles(count: number): MeteorStyle[] {
  return Array.from({ length: count }, () => ({
    top: -5,
    left: `${Math.floor(Math.random() * 100)}%`,
    animationDelay: `${(Math.random() * 5).toFixed(2)}s`,
    animationDuration: `${(Math.random() * 8 + 2).toFixed(2)}s`,
  }));
}

export function Meteors({ number = 20, className }: MeteorsProps) {
  const [styles, setStyles] = useState<MeteorStyle[]>(() =>
    generateDeterministicStyles(number)
  );

  // Replace deterministic styles with random ones after hydration
  useEffect(() => {
    setStyles(generateRandomStyles(number));
  }, [number]);

  return (
    <>
      {styles.map((style, idx) => (
        <span
          key={`meteor-${idx}`}
          className={cn(
            "pointer-events-none absolute h-0.5 w-0.5 rotate-[250deg] animate-meteor-effect rounded-full bg-white shadow-[0_0_0_1px_#ffffff20]",
            "before:content-[''] before:absolute before:top-1/2 before:w-[50px] before:h-[1px] before:-translate-y-1/2 before:bg-gradient-to-r before:from-white/60 before:to-transparent",
            className
          )}
          style={style}
        />
      ))}
    </>
  );
}
