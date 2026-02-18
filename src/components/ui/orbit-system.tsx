"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface OrbitConfig {
  radius?: number;
  radiusX?: number;
  radiusY?: number;
  duration: number; // seconds
  reverse?: boolean;
  icons: React.ReactNode[];
}

interface OrbitSystemProps {
  orbits: OrbitConfig[];
  className?: string;
}

export function OrbitSystem({ orbits, className }: OrbitSystemProps) {
  return (
    <div className={cn("relative flex items-center justify-center pointer-events-none", className)}>
      {orbits.map((orbit, i) => {
        const rx = orbit.radiusX ?? orbit.radius ?? 100;
        const ry = orbit.radiusY ?? orbit.radius ?? rx;

        return (
          <React.Fragment key={i}>
            {/* Static Track (Elliptical Border) */}
            <div
              className="absolute flex items-center justify-center rounded-full border border-dashed border-gray-200"
              style={{
                width: rx * 2,
                height: ry * 2,
              }}
            />

            {/* Orbiting System (Scaled Circle) */}
            <div
              className="absolute flex items-center justify-center will-change-transform"
              style={{
                width: rx * 2,
                height: rx * 2, // Use rx for the base circle
                transform: `scaleY(${ry / rx})`, // Squash to create ellipse path
              }}
            >
              <div
                className="absolute inset-0 animate-spin will-change-transform"
                style={{
                  animationDuration: `${orbit.duration}s`,
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                  animationDirection: orbit.reverse ? "reverse" : "normal",
                }}
              >
                {orbit.icons.map((icon, j) => {
                  const count = orbit.icons.length;
                  const angle = (360 / count) * j;

                  return (
                    <div
                      key={j}
                      className="absolute left-1/2 top-1/2 flex items-center justify-center"
                      style={{
                        transform: `rotate(${angle}deg) translate(${rx}px) rotate(-${angle}deg)`,
                        width: '40px',
                        height: '40px',
                        marginLeft: '-20px',
                        marginTop: '-20px',
                      }}
                    >
                      <div
                        className="animate-spin w-full h-full flex items-center justify-center will-change-transform"
                        style={{
                          animationDuration: `${orbit.duration}s`,
                          animationTimingFunction: "linear",
                          animationIterationCount: "infinite",
                          animationDirection: orbit.reverse ? "normal" : "reverse",
                        }}
                      >
                        {/* Counter-scale the item content to restore aspect ratio */}
                        <div
                          className="pointer-events-auto hover:scale-110 transition-transform cursor-pointer"
                          style={{ transform: `scaleY(${rx / ry})` }}
                        >
                          {icon}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
