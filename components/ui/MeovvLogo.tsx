"use client";

import React, { useRef, useId } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

interface MeovvLogoProps {
  className?: string;
  color?: string; // Default base color for the logo fill
  strokeColor?: string; // Accent color for the traveling tracer stroke
  interactive?: boolean;
}

export function MeovvLogo({
  className = "",
  color = "#F0F0F0",
  strokeColor = "#CCFF00",
  interactive = true,
}: MeovvLogoProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const rawId = useId();
  const filterId = `tracerGlow_${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  // Stroke paths refs (M -> E -> O -> V1 -> V2)
  const strokeMRef = useRef<SVGPathElement | null>(null);
  const strokeERef = useRef<SVGPathElement | null>(null);
  const strokeORef = useRef<SVGPathElement | null>(null);
  const strokeV1Ref = useRef<SVGPathElement | null>(null);
  const strokeV2Ref = useRef<SVGPathElement | null>(null);

  // Fill paths refs
  const fillMRef = useRef<SVGPathElement | null>(null);
  const fillERef = useRef<SVGPathElement | null>(null);
  const fillORef = useRef<SVGPathElement | null>(null);
  const fillV1Ref = useRef<SVGPathElement | null>(null);
  const fillV2Ref = useRef<SVGPathElement | null>(null);

  const isAnimating = useRef(false);

  // Execute the path travel animation from left foot of M to right arm of V
  const playPathTravelAnimation = () => {
    if (!svgRef.current) return;

    const strokePaths = [
      strokeMRef.current,
      strokeERef.current,
      strokeORef.current,
      strokeV1Ref.current,
      strokeV2Ref.current,
    ].filter(Boolean) as SVGPathElement[];

    const fillPaths = [
      fillMRef.current,
      fillERef.current,
      fillORef.current,
      fillV1Ref.current,
      fillV2Ref.current,
    ].filter(Boolean) as SVGPathElement[];

    if (strokePaths.length < 5) return;

    // Calculate total length of each letter path
    const lengths = strokePaths.map((p) => p.getTotalLength());

    const tl = gsap.timeline({
      onStart: () => {
        isAnimating.current = true;
      },
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    // Reset initial stroke state: hidden via dashoffset
    strokePaths.forEach((path, idx) => {
      const len = lengths[idx];
      gsap.set(path, {
        strokeDasharray: len,
        strokeDashoffset: len,
        opacity: 1,
      });
    });

    // Sequential Path Travel: M (foot) -> E -> O -> V1 -> V2 (arm)
    strokePaths.forEach((path, idx) => {
      const len = lengths[idx];
      const fill = fillPaths[idx];

      // Draw stroke along letter
      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: idx === 0 ? 0.45 : idx === 2 ? 0.4 : 0.35,
          ease: "power2.inOut",
        },
        idx === 0 ? 0 : "-=0.08"
      );

      // Illuminate letter fill as the stroke travels through it
      if (fill) {
        tl.to(
          fill,
          {
            fill: strokeColor,
            opacity: 1,
            duration: 0.25,
            ease: "power1.out",
          },
          `<+0.05`
        ).to(
          fill,
          {
            fill: color,
            duration: 0.4,
            ease: "power2.out",
          },
          `>+0.1`
        );
      }
    });

    // Fade out stroke lines smoothly once the path reaches the tip of V2
    tl.to(
      strokePaths,
      {
        opacity: 0,
        duration: 0.35,
        ease: "power2.out",
      },
      "-=0.1"
    );

    return tl;
  };

  useGSAP(
    () => {
      if (!svgRef.current) return;

      // Run path travel animation on initial entrance
      const timer = setTimeout(() => {
        playPathTravelAnimation();
      }, 400);

      // Periodic ambient travel every 12 seconds
      const interval = setInterval(() => {
        if (!isAnimating.current) {
          playPathTravelAnimation();
        }
      }, 12000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    },
    { scope: containerRef }
  );

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleMouseEnter = contextSafe(() => {
    if (!interactive || isAnimating.current) return;
    playPathTravelAnimation();
  });

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={`inline-flex items-center cursor-pointer select-none ${className}`}
      title="MEOVV"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 246 55"
        className="h-6 sm:h-7 md:h-8 w-auto overflow-visible"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        fillRule="evenodd"
        clipRule="evenodd"
      >
        <defs>
          {/* Volt glow filter for the traveling path */}
          <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. BASE FILL LAYER */}
        <g className="meovv-base-fill">
          {/* M */}
          <path
            ref={fillMRef}
            fill={color}
            d="M 0,52.02 c 0,-0.99 0,-1.99 0,-2.98 c 0.48,-0.34 0.72,-0.81 0.69,-1.42 c 2.21,-14.67 4.39,-29.34 6.55,-44.02 c 0.21,-1.89 2.39,-1.98 3.36,-0.75 c 6.7,12.27 13.39,24.56 20.06,36.85 c 0.33,0.84 0.9,1.45 1.69,1.81 c 6.54,-12.75 12.97,-25.59 19.3,-38.5 c 1.13,-1.3 1.96,-1.15 2.51,0.45 c 2.03,15.7 4.05,31.41 6.05,47.11 c 0.06,0.64 -0.18,1.13 -0.72,1.46 c -1.41,0.05 -6.52,0.78 -7.18,-0.77 c -1.26,-9.52 -2.46,-19.05 -3.63,-28.59 c -0.16,-1.87 -0.59,-3.65 -1.27,-5.35 c -5.47,11.04 -10.94,22.1 -16.42,33.16 c -0.91,1.84 -2.08,2.04 -3.51,0.6 c -6.01,-11.55 -12.17,-23.01 -18.49,-34.39 c -0.23,-0.27 -0.47,-0.28 -0.72,-0.03 c -1.75,11.58 -3.55,23.15 -5.39,34.72 c -0.8,0.84 -1.76,1.05 -2.88,0.64 Z"
          />
          {/* E */}
          <path
            ref={fillERef}
            fill={color}
            d="M 67.09,49 c -0.01,-15.44 0.04,-30.88 0.14,-46.32 c 0.61,-0.61 1.36,-0.86 2.25,-0.73 c 0.23,0.49 27.94,-1.17 23.72,1.52 c 0.17,0.97 -0.09,1.79 -0.79,2.44 c -5.3,0.13 -10.61,0.17 -15.92,0.12 c -0.58,-0.05 -1.04,0.15 -1.4,0.59 c -0.24,6.22 -0.19,12.44 0.13,18.66 c 1.1,1.23 13.46,-0.01 16.19,0.76 c 0.88,1.15 0.59,1.89 -0.85,2.23 c -4.67,0.04 -9.35,0.04 -14.02,0.02 c -0.51,-0.06 -0.94,0.09 -1.29,0.46 c -0.25,5.91 -0.33,11.83 -0.25,17.77 c 0,0.98 0.49,1.51 1.46,1.59 c 2.52,0.68 17.75,-1.47 17.53,1.4 c 0.38,1.41 -0.1,2.28 -1.45,2.61 c -8.02,0.02 -16.05,0.02 -24.07,-0.02 c -1.79,0.02 -1.34,-1.94 -1.38,-3.1 Z"
          />
          {/* O */}
          <path
            ref={fillORef}
            fill={color}
            d="M 122.03,0 c 3.64,0 7.29,0 10.94,0 c 0.11,0.31 0.32,0.53 0.61,0.68 c 18.03,3.71 26.77,22.89 17.48,38.91 c -26.92,40.68 -83.11,-12.55 -32.47,-38.53 c 1,-0.23 3.15,0.36 3.44,-1.06 Z M 105.48,23.87 c 0.88,29.01 38.92,39.99 42.21,9.59 c 2.6,-34.35 -43.02,-43.1 -42.21,-9.59 Z"
          />
          {/* V1 */}
          <path
            ref={fillV1Ref}
            fill={color}
            d="M 155.19,2.2 c 1.63,-0.1 7.71,-0.78 8.66,0.48 c 5.18,12.73 10.46,25.39 15.86,37.98 c 0.72,-0.05 1.16,-0.44 1.33,-1.16 c 4.86,-12.09 9.71,-24.17 14.55,-36.26 c 0.49,-1.31 2.24,-1.82 3.12,-0.6 c -6.17,15.95 -12.48,31.87 -18.9,47.73 c -0.2,0.76 -0.64,1.31 -1.33,1.65 c -1.64,0.54 -2.89,0.1 -3.73,-1.34 c -6.11,-14.89 -12.22,-29.78 -18.34,-44.67 c -0.59,-1.21 -0.99,-2.49 -1.22,-3.81 Z"
          />
          {/* V2 */}
          <path
            ref={fillV2Ref}
            fill={color}
            d="M 201.88,2.97 c 0.25,-1.75 6.27,-0.75 7.57,-0.85 c 0.48,0.09 0.84,0.35 1.08,0.78 c 5.03,12.29 10.1,24.56 15.21,36.82 c 0.42,1.02 0.95,1.11 1.58,0.26 c 5.08,-12.36 10.09,-24.75 15.01,-37.18 c 1.04,-1.44 3.91,-0.98 2.49,1.57 c -6.21,15.43 -12.4,30.87 -18.56,46.31 c -0.84,1.46 -2.08,1.89 -3.73,1.3 c -0.47,-0.15 -0.81,-0.45 -1.02,-0.9 c -6.6,-16.02 -13.14,-32.05 -19.63,-48.11 Z"
          />
        </g>

        {/* 2. OVERLAY TRAVELING PATH LAYER (From Left Foot of M to Right Arm of V) */}
        <g
          className="meovv-traveling-strokes pointer-events-none"
          stroke={strokeColor}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter={`url(#${filterId})`}
        >
          {/* M - Starts from Left Foot at (0, 52.02) */}
          <path
            ref={strokeMRef}
            opacity="0"
            d="M 0,52.02 c 0,-0.99 0,-1.99 0,-2.98 c 0.48,-0.34 0.72,-0.81 0.69,-1.42 c 2.21,-14.67 4.39,-29.34 6.55,-44.02 c 0.21,-1.89 2.39,-1.98 3.36,-0.75 c 6.7,12.27 13.39,24.56 20.06,36.85 c 0.33,0.84 0.9,1.45 1.69,1.81 c 6.54,-12.75 12.97,-25.59 19.3,-38.5 c 1.13,-1.3 1.96,-1.15 2.51,0.45 c 2.03,15.7 4.05,31.41 6.05,47.11 c 0.06,0.64 -0.18,1.13 -0.72,1.46 c -1.41,0.05 -6.52,0.78 -7.18,-0.77 c -1.26,-9.52 -2.46,-19.05 -3.63,-28.59 c -0.16,-1.87 -0.59,-3.65 -1.27,-5.35 c -5.47,11.04 -10.94,22.1 -16.42,33.16 c -0.91,1.84 -2.08,2.04 -3.51,0.6 c -6.01,-11.55 -12.17,-23.01 -18.49,-34.39 c -0.23,-0.27 -0.47,-0.28 -0.72,-0.03 c -1.75,11.58 -3.55,23.15 -5.39,34.72 c -0.8,0.84 -1.76,1.05 -2.88,0.64 Z"
          />

          {/* E */}
          <path
            ref={strokeERef}
            opacity="0"
            d="M 67.09,49 c -0.01,-15.44 0.04,-30.88 0.14,-46.32 c 0.61,-0.61 1.36,-0.86 2.25,-0.73 c 0.23,0.49 27.94,-1.17 23.72,1.52 c 0.17,0.97 -0.09,1.79 -0.79,2.44 c -5.3,0.13 -10.61,0.17 -15.92,0.12 c -0.58,-0.05 -1.04,0.15 -1.4,0.59 c -0.24,6.22 -0.19,12.44 0.13,18.66 c 1.1,1.23 13.46,-0.01 16.19,0.76 c 0.88,1.15 0.59,1.89 -0.85,2.23 c -4.67,0.04 -9.35,0.04 -14.02,0.02 c -0.51,-0.06 -0.94,0.09 -1.29,0.46 c -0.25,5.91 -0.33,11.83 -0.25,17.77 c 0,0.98 0.49,1.51 1.46,1.59 c 2.52,0.68 17.75,-1.47 17.53,1.4 c 0.38,1.41 -0.1,2.28 -1.45,2.61 c -8.02,0.02 -16.05,0.02 -24.07,-0.02 c -1.79,0.02 -1.34,-1.94 -1.38,-3.1 Z"
          />

          {/* O */}
          <path
            ref={strokeORef}
            opacity="0"
            d="M 122.03,0 c 3.64,0 7.29,0 10.94,0 c 0.11,0.31 0.32,0.53 0.61,0.68 c 18.03,3.71 26.77,22.89 17.48,38.91 c -26.92,40.68 -83.11,-12.55 -32.47,-38.53 c 1,-0.23 3.15,0.36 3.44,-1.06 Z M 105.48,23.87 c 0.88,29.01 38.92,39.99 42.21,9.59 c 2.6,-34.35 -43.02,-43.1 -42.21,-9.59 Z"
          />

          {/* V1 */}
          <path
            ref={strokeV1Ref}
            opacity="0"
            d="M 155.19,2.2 c 1.63,-0.1 7.71,-0.78 8.66,0.48 c 5.18,12.73 10.46,25.39 15.86,37.98 c 0.72,-0.05 1.16,-0.44 1.33,-1.16 c 4.86,-12.09 9.71,-24.17 14.55,-36.26 c 0.49,-1.31 2.24,-1.82 3.12,-0.6 c -6.17,15.95 -12.48,31.87 -18.9,47.73 c -0.2,0.76 -0.64,1.31 -1.33,1.65 c -1.64,0.54 -2.89,0.1 -3.73,-1.34 c -6.11,-14.89 -12.22,-29.78 -18.34,-44.67 c -0.59,-1.21 -0.99,-2.49 -1.22,-3.81 Z"
          />

          {/* V2 - Ends at Top Right Arm at (246, 3) */}
          <path
            ref={strokeV2Ref}
            opacity="0"
            d="M 201.88,2.97 c 0.25,-1.75 6.27,-0.75 7.57,-0.85 c 0.48,0.09 0.84,0.35 1.08,0.78 c 5.03,12.29 10.1,24.56 15.21,36.82 c 0.42,1.02 0.95,1.11 1.58,0.26 c 5.08,-12.36 10.09,-24.75 15.01,-37.18 c 1.04,-1.44 3.91,-0.98 2.49,1.57 c -6.21,15.43 -12.4,30.87 -18.56,46.31 c -0.84,1.46 -2.08,1.89 -3.73,1.3 c -0.47,-0.15 -0.81,-0.45 -1.02,-0.9 c -6.6,-16.02 -13.14,-32.05 -19.63,-48.11 Z"
          />
        </g>
      </svg>
    </div>
  );
}
