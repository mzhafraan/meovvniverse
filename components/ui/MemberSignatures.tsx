"use client";

import React from "react";

interface MemberSignatureProps {
  slug: string;
  className?: string;
}

export function MemberSignature({ slug, className = "" }: MemberSignatureProps) {
  // Color: Bright neon volt chartreuse matching reference
  const voltColor = "#CCFF00";

  switch (slug.toLowerCase()) {
    case "anna":
      return (
        <svg
          viewBox="0 0 420 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full drop-shadow-volt select-none pointer-events-none ${className}`}
        >
          {/* Main Anna cursive sweep */}
          <path
            d="M 50 210 C 70 140, 110 50, 160 40 C 190 35, 200 80, 175 140 C 150 200, 115 230, 95 230 C 75 230, 80 180, 125 155 C 195 120, 290 110, 360 85"
            stroke={voltColor}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Double 'n' loop and flourish */}
          <path
            d="M 190 145 C 220 120, 245 160, 260 140 C 275 120, 295 155, 310 135 C 330 110, 350 140, 375 120"
            stroke={voltColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Dynamic cross slash & underline */}
          <path
            d="M 70 170 L 380 145 M 120 220 L 330 200"
            stroke={voltColor}
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Star accent */}
          <path
            d="M 330 65 L 340 75 M 340 65 L 330 75"
            stroke={voltColor}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      );

    case "ella":
      return (
        <svg
          viewBox="0 0 420 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full drop-shadow-volt select-none pointer-events-none ${className}`}
        >
          {/* Grand loop 'E' */}
          <path
            d="M 130 90 C 80 80, 50 120, 70 180 C 85 220, 140 235, 185 200 C 215 175, 200 130, 150 135 C 100 140, 120 80, 170 50 C 210 30, 250 80, 230 160 C 210 240, 270 240, 320 180"
            stroke={voltColor}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Ascending dual 'll' with lightning loop */}
          <path
            d="M 235 150 C 255 70, 275 40, 285 75 C 295 110, 290 190, 305 150 C 315 100, 335 45, 345 80 C 355 120, 345 195, 370 160"
            stroke={voltColor}
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Bold zig-zag scribble across */}
          <path
            d="M 40 160 L 390 120 M 160 215 L 290 170"
            stroke={voltColor}
            strokeWidth="5.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case "gawon":
      return (
        <svg
          viewBox="0 0 420 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full drop-shadow-volt select-none pointer-events-none ${className}`}
        >
          {/* Sculpted gothic 'G' */}
          <path
            d="M 220 50 C 120 40, 45 100, 55 170 C 65 230, 140 240, 200 210 C 250 185, 240 135, 180 140 L 250 140 C 270 140, 260 210, 230 250"
            stroke={voltColor}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Swift 'won' connecting loop */}
          <path
            d="M 220 170 C 250 130, 280 200, 300 150 C 320 110, 350 180, 375 130 C 390 105, 410 130, 395 160"
            stroke={voltColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Horizontal lightning strike */}
          <path
            d="M 40 180 L 170 160 L 150 195 L 380 110"
            stroke={voltColor}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case "narin":
      return (
        <svg
          viewBox="0 0 420 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full drop-shadow-volt select-none pointer-events-none ${className}`}
        >
          {/* Dynamic cursive 'N' */}
          <path
            d="M 70 220 L 110 50 C 125 40, 150 90, 180 170 L 220 55 C 235 45, 255 80, 265 140"
            stroke={voltColor}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Flowing 'arin' with sharp loop */}
          <path
            d="M 255 160 C 275 130, 290 170, 310 140 C 330 110, 350 160, 365 130 C 380 110, 400 135, 385 180"
            stroke={voltColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Dynamic multi-line slash (Lando Norris style) */}
          <path
            d="M 40 140 L 390 155 M 80 190 L 350 195 M 180 120 L 290 220"
            stroke={voltColor}
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      );

    case "sooin":
      return (
        <svg
          viewBox="0 0 420 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full drop-shadow-volt select-none pointer-events-none ${className}`}
        >
          {/* Expressive fluid 'S' loop */}
          <path
            d="M 180 50 C 110 40, 70 80, 85 125 C 100 160, 180 155, 170 200 C 160 235, 100 240, 60 210 C 30 190, 50 160, 80 170"
            stroke={voltColor}
            strokeWidth="7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* 'ooin' rhythmic wave */}
          <path
            d="M 175 175 C 210 135, 240 185, 265 150 C 290 120, 320 175, 345 140 C 370 110, 395 150, 375 190"
            stroke={voltColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* High voltage cross streak */}
          <path
            d="M 45 120 L 395 160 M 110 215 L 340 185"
            stroke={voltColor}
            strokeWidth="5.5"
            strokeLinecap="round"
          />
        </svg>
      );

    default: // MEOVV Group Signature
      return (
        <svg
          viewBox="0 0 420 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full drop-shadow-volt select-none pointer-events-none ${className}`}
        >
          {/* MEOVV Monogram Graffiti */}
          <path
            d="M 50 210 L 90 60 L 150 180 L 205 60 L 245 200"
            stroke={voltColor}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 230 130 C 260 80, 330 70, 310 140 C 290 200, 240 190, 280 140 C 310 100, 360 80, 390 140"
            stroke={voltColor}
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Aggressive claw underline */}
          <path
            d="M 40 160 L 400 130 M 70 230 L 360 190"
            stroke={voltColor}
            strokeWidth="5.5"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}
