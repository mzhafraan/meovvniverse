"use client";

import React from "react";

export function TopographicLines({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none opacity-30 ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Subtle Gothic Topographic Contour Lines */}
        <path
          d="M-100 450 C 200 300, 400 600, 720 450 C 1040 300, 1240 600, 1540 450"
          stroke="#C0C0C0"
          strokeWidth="0.75"
          strokeDasharray="4 4"
          opacity="0.3"
        />
        <path
          d="M-50 200 C 250 100, 500 350, 720 220 C 940 90, 1200 350, 1500 200"
          stroke="#C0C0C0"
          strokeWidth="0.75"
          opacity="0.25"
        />
        <path
          d="M-80 700 C 150 550, 450 800, 720 680 C 990 560, 1300 800, 1520 700"
          stroke="#C0C0C0"
          strokeWidth="0.75"
          opacity="0.2"
        />
        <path
          d="M200 -50 C 350 250, 200 500, 350 800 C 500 1100, 350 1300, 500 1500"
          stroke="#C0C0C0"
          strokeWidth="0.5"
          opacity="0.15"
        />
        <path
          d="M1240 -50 C 1090 250, 1240 500, 1090 800 C 940 1100, 1090 1300, 940 1500"
          stroke="#C0C0C0"
          strokeWidth="0.5"
          opacity="0.15"
        />
        {/* Center Contour Ring around head area */}
        <ellipse
          cx="720"
          cy="380"
          rx="320"
          ry="300"
          stroke="#C0C0C0"
          strokeWidth="0.5"
          opacity="0.18"
        />
        <ellipse
          cx="720"
          cy="380"
          rx="440"
          ry="400"
          stroke="#C0C0C0"
          strokeWidth="0.5"
          strokeDasharray="8 8"
          opacity="0.12"
        />
        <ellipse
          cx="720"
          cy="380"
          rx="580"
          ry="520"
          stroke="#C0C0C0"
          strokeWidth="0.5"
          opacity="0.08"
        />
      </svg>
    </div>
  );
}
