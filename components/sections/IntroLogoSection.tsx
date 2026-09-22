"use client";

import React, { useRef, useId } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TopographicLines } from "@/components/ui/TopographicLines";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function IntroLogoSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinnedContentRef = useRef<HTMLDivElement | null>(null);
  const introLogoRef = useRef<HTMLDivElement | null>(null);
  const introCaptionRef = useRef<HTMLDivElement | null>(null);
  const introScrollHintRef = useRef<HTMLDivElement | null>(null);

  // SVG Paths
  const strokeMRef = useRef<SVGPathElement | null>(null);
  const strokeERef = useRef<SVGPathElement | null>(null);
  const strokeORef = useRef<SVGPathElement | null>(null);
  const strokeV1Ref = useRef<SVGPathElement | null>(null);
  const strokeV2Ref = useRef<SVGPathElement | null>(null);

  const fillMRef = useRef<SVGPathElement | null>(null);
  const fillERef = useRef<SVGPathElement | null>(null);
  const fillORef = useRef<SVGPathElement | null>(null);
  const fillV1Ref = useRef<SVGPathElement | null>(null);
  const fillV2Ref = useRef<SVGPathElement | null>(null);

  const rawId = useId();
  const filterId = `introLogoGlow_${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const handleScrollToPortal = () => {
    const portalEl = document.getElementById("portal");
    if (portalEl) {
      portalEl.scrollIntoView({ behavior: "smooth" });
    } else if (typeof window !== "undefined") {
      window.scrollTo({
        top: window.innerHeight * 1.5,
        behavior: "smooth",
      });
    }
  };

  useGSAP(
    () => {
      if (!sectionRef.current || !pinnedContentRef.current) return;

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

      if (strokePaths.length === 5) {
        strokePaths.forEach((path) => {
          const len = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: len,
            strokeDashoffset: len,
            opacity: 1,
          });
        });

        gsap.set(fillPaths, {
          opacity: 0.12,
          fill: "#C0C0C0",
        });
      }

      // Scroll-driven timeline pinned until completion
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1200",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // 1. Scroll hint dissolves immediately
      tl.to(
        introScrollHintRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.08,
          ease: "power2.out",
        },
        0
      );

      // 2. Sequential Neon Stroke Tracer following mouse scroll (0 to 0.70)
      // M
      tl.to(
        strokeMRef.current,
        { strokeDashoffset: 0, duration: 0.18, ease: "none" },
        0
      )
        .to(fillMRef.current, { opacity: 1, fill: "#CCFF00", duration: 0.08 }, 0.08)
        .to(fillMRef.current, { fill: "#FFFFFF", duration: 0.12 }, 0.16);

      // E
      tl.to(
        strokeERef.current,
        { strokeDashoffset: 0, duration: 0.15, ease: "none" },
        0.14
      )
        .to(fillERef.current, { opacity: 1, fill: "#CCFF00", duration: 0.07 }, 0.2)
        .to(fillERef.current, { fill: "#FFFFFF", duration: 0.1 }, 0.27);

      // O
      tl.to(
        strokeORef.current,
        { strokeDashoffset: 0, duration: 0.16, ease: "none" },
        0.25
      )
        .to(fillORef.current, { opacity: 1, fill: "#CCFF00", duration: 0.07 }, 0.3)
        .to(fillORef.current, { fill: "#FFFFFF", duration: 0.1 }, 0.37);

      // V1
      tl.to(
        strokeV1Ref.current,
        { strokeDashoffset: 0, duration: 0.15, ease: "none" },
        0.36
      )
        .to(fillV1Ref.current, { opacity: 1, fill: "#CCFF00", duration: 0.07 }, 0.41)
        .to(fillV1Ref.current, { fill: "#FFFFFF", duration: 0.1 }, 0.48);

      // V2
      tl.to(
        strokeV2Ref.current,
        { strokeDashoffset: 0, duration: 0.16, ease: "none" },
        0.47
      )
        .to(fillV2Ref.current, { opacity: 1, fill: "#CCFF00", duration: 0.07 }, 0.52)
        .to(fillV2Ref.current, { fill: "#FFFFFF", duration: 0.1 }, 0.59);

      // Fade out stroke lines
      tl.to(
        strokePaths,
        { opacity: 0, duration: 0.08, ease: "power2.out" },
        0.6
      );

      // 3. Mentok Scroll: Logo expands, blurs, and dissolves into The Portal (0.70 to 1.00)
      tl.to(
        introLogoRef.current,
        {
          scale: 1.18,
          opacity: 0,
          y: -40,
          filter: "blur(12px)",
          duration: 0.28,
          ease: "power2.inOut",
        },
        0.7
      );

      tl.to(
        introCaptionRef.current,
        { opacity: 0, y: -20, duration: 0.2 },
        0.7
      );

      tl.to(
        pinnedContentRef.current,
        {
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        },
        0.8
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="intro"
      ref={sectionRef}
      className="relative w-full h-screen bg-void text-ash overflow-hidden select-none"
    >
      <div
        ref={pinnedContentRef}
        className="relative w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 overflow-hidden"
      >
        {/* Background Layer 1: Crimson Nebula Aura (Upper Right) */}
        <div
          className="absolute -top-32 -right-32 w-[650px] sm:w-[900px] h-[650px] sm:h-[900px] pointer-events-none rounded-full opacity-45 blur-[120px] z-[1]"
          style={{
            background:
              "radial-gradient(circle, rgba(200, 25, 40, 0.45) 0%, rgba(120, 10, 20, 0.25) 45%, transparent 75%)",
          }}
        />

        {/* Background Layer 2: Topographic Contour Lines Overlay */}
        <div className="absolute inset-0 pointer-events-none z-[2] opacity-15">
          <TopographicLines />
        </div>

        {/* Background Layer 3: Atmospheric Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-transparent to-void pointer-events-none z-[3]" />

        {/* Top Row: Luke Baffait Micro Caption */}
        <div className="relative z-10 flex items-start justify-between w-full">
          <div ref={introCaptionRef} className="space-y-1 max-w-xs text-fog">
            <p className="font-sans text-[11px] sm:text-xs text-fog/80 leading-relaxed font-light">
              Quiet creation, bringing ideas to life.
            </p>
            <p className="font-sans text-[11px] sm:text-xs text-fog/80 leading-relaxed font-light">
              Through motion, detail and softness.
            </p>
          </div>
        </div>

        {/* Center: Scroll-Driven MEOVV SVG Logo */}
        <div
          ref={introLogoRef}
          onClick={handleScrollToPortal}
          className="relative z-10 flex-1 flex flex-col items-center justify-center cursor-pointer will-change-transform"
          title="Scroll down to trace and enter The Portal"
        >
          <svg
            viewBox="0 0 246 55"
            className="w-[85vw] max-w-2xl sm:max-w-3xl md:max-w-4xl h-auto overflow-visible drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)]"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <defs>
              <filter id={filterId} x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Base Fill Letter Layer */}
            <g className="intro-base-fill">
              {/* M */}
              <path
                ref={fillMRef}
                fill="#C0C0C0"
                opacity="0.15"
                d="M 0,52.02 c 0,-0.99 0,-1.99 0,-2.98 c 0.48,-0.34 0.72,-0.81 0.69,-1.42 c 2.21,-14.67 4.39,-29.34 6.55,-44.02 c 0.21,-1.89 2.39,-1.98 3.36,-0.75 c 6.7,12.27 13.39,24.56 20.06,36.85 c 0.33,0.84 0.9,1.45 1.69,1.81 c 6.54,-12.75 12.97,-25.59 19.3,-38.5 c 1.13,-1.3 1.96,-1.15 2.51,0.45 c 2.03,15.7 4.05,31.41 6.05,47.11 c 0.06,0.64 -0.18,1.13 -0.72,1.46 c -1.41,0.05 -6.52,0.78 -7.18,-0.77 c -1.26,-9.52 -2.46,-19.05 -3.63,-28.59 c -0.16,-1.87 -0.59,-3.65 -1.27,-5.35 c -5.47,11.04 -10.94,22.1 -16.42,33.16 c -0.91,1.84 -2.08,2.04 -3.51,0.6 c -6.01,-11.55 -12.17,-23.01 -18.49,-34.39 c -0.23,-0.27 -0.47,-0.28 -0.72,-0.03 c -1.75,11.58 -3.55,23.15 -5.39,34.72 c -0.8,0.84 -1.76,1.05 -2.88,0.64 Z"
              />
              {/* E */}
              <path
                ref={fillERef}
                fill="#C0C0C0"
                opacity="0.15"
                d="M 67.09,49 c -0.01,-15.44 0.04,-30.88 0.14,-46.32 c 0.61,-0.61 1.36,-0.86 2.25,-0.73 c 0.23,0.49 27.94,-1.17 23.72,1.52 c 0.17,0.97 -0.09,1.79 -0.79,2.44 c -5.3,0.13 -10.61,0.17 -15.92,0.12 c -0.58,-0.05 -1.04,0.15 -1.4,0.59 c -0.24,6.22 -0.19,12.44 0.13,18.66 c 1.1,1.23 13.46,-0.01 16.19,0.76 c 0.88,1.15 0.59,1.89 -0.85,2.23 c -4.67,0.04 -9.35,0.04 -14.02,0.02 c -0.51,-0.06 -0.94,0.09 -1.29,0.46 c -0.25,5.91 -0.33,11.83 -0.25,17.77 c 0,0.98 0.49,1.51 1.46,1.59 c 2.52,0.68 17.75,-1.47 17.53,1.4 c 0.38,1.41 -0.1,2.28 -1.45,2.61 c -8.02,0.02 -16.05,0.02 -24.07,-0.02 c -1.79,0.02 -1.34,-1.94 -1.38,-3.1 Z"
              />
              {/* O */}
              <path
                ref={fillORef}
                fill="#C0C0C0"
                opacity="0.15"
                d="M 122.03,0 c 3.64,0 7.29,0 10.94,0 c 0.11,0.31 0.32,0.53 0.61,0.68 c 18.03,3.71 26.77,22.89 17.48,38.91 c -26.92,40.68 -83.11,-12.55 -32.47,-38.53 c 1,-0.23 3.15,0.36 3.44,-1.06 Z M 105.48,23.87 c 0.88,29.01 38.92,39.99 42.21,9.59 c 2.6,-34.35 -43.02,-43.1 -42.21,-9.59 Z"
              />
              {/* V1 */}
              <path
                ref={fillV1Ref}
                fill="#C0C0C0"
                opacity="0.15"
                d="M 155.19,2.2 c 1.63,-0.1 7.71,-0.78 8.66,0.48 c 5.18,12.73 10.46,25.39 15.86,37.98 c 0.72,-0.05 1.16,-0.44 1.33,-1.16 c 4.86,-12.09 9.71,-24.17 14.55,-36.26 c 0.49,-1.31 2.24,-1.82 3.12,-0.6 c -6.17,15.95 -12.48,31.87 -18.9,47.73 c -0.2,0.76 -0.64,1.31 -1.33,1.65 c -1.64,0.54 -2.89,0.1 -3.73,-1.34 c -6.11,-14.89 -12.22,-29.78 -18.34,-44.67 c -0.59,-1.21 -0.99,-2.49 -1.22,-3.81 Z"
              />
              {/* V2 */}
              <path
                ref={fillV2Ref}
                fill="#C0C0C0"
                opacity="0.15"
                d="M 201.88,2.97 c 0.25,-1.75 6.27,-0.75 7.57,-0.85 c 0.48,0.09 0.84,0.35 1.08,0.78 c 5.03,12.29 10.1,24.56 15.21,36.82 c 0.42,1.02 0.95,1.11 1.58,0.26 c 5.08,-12.36 10.09,-24.75 15.01,-37.18 c 1.04,-1.44 3.91,-0.98 2.49,1.57 c -6.21,15.43 -12.4,30.87 -18.56,46.31 c -0.84,1.46 -2.08,1.89 -3.73,1.3 c -0.47,-0.15 -0.81,-0.45 -1.02,-0.9 c -6.6,-16.02 -13.14,-32.05 -19.63,-48.11 Z"
              />
            </g>

            {/* Volt Tracer Strokes: Foot of M -> Arm of V2 */}
            <g
              stroke="#CCFF00"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter={`url(#${filterId})`}
            >
              <path
                ref={strokeMRef}
                d="M 0,52.02 c 0,-0.99 0,-1.99 0,-2.98 c 0.48,-0.34 0.72,-0.81 0.69,-1.42 c 2.21,-14.67 4.39,-29.34 6.55,-44.02 c 0.21,-1.89 2.39,-1.98 3.36,-0.75 c 6.7,12.27 13.39,24.56 20.06,36.85 c 0.33,0.84 0.9,1.45 1.69,1.81 c 6.54,-12.75 12.97,-25.59 19.3,-38.5 c 1.13,-1.3 1.96,-1.15 2.51,0.45 c 2.03,15.7 4.05,31.41 6.05,47.11 c 0.06,0.64 -0.18,1.13 -0.72,1.46 c -1.41,0.05 -6.52,0.78 -7.18,-0.77 c -1.26,-9.52 -2.46,-19.05 -3.63,-28.59 c -0.16,-1.87 -0.59,-3.65 -1.27,-5.35 c -5.47,11.04 -10.94,22.1 -16.42,33.16 c -0.91,1.84 -2.08,2.04 -3.51,0.6 c -6.01,-11.55 -12.17,-23.01 -18.49,-34.39 c -0.23,-0.27 -0.47,-0.28 -0.72,-0.03 c -1.75,11.58 -3.55,23.15 -5.39,34.72 c -0.8,0.84 -1.76,1.05 -2.88,0.64 Z"
              />
              <path
                ref={strokeERef}
                d="M 67.09,49 c -0.01,-15.44 0.04,-30.88 0.14,-46.32 c 0.61,-0.61 1.36,-0.86 2.25,-0.73 c 0.23,0.49 27.94,-1.17 23.72,1.52 c 0.17,0.97 -0.09,1.79 -0.79,2.44 c -5.3,0.13 -10.61,0.17 -15.92,0.12 c -0.58,-0.05 -1.04,0.15 -1.4,0.59 c -0.24,6.22 -0.19,12.44 0.13,18.66 c 1.1,1.23 13.46,-0.01 16.19,0.76 c 0.88,1.15 0.59,1.89 -0.85,2.23 c -4.67,0.04 -9.35,0.04 -14.02,0.02 c -0.51,-0.06 -0.94,0.09 -1.29,0.46 c -0.25,5.91 -0.33,11.83 -0.25,17.77 c 0,0.98 0.49,1.51 1.46,1.59 c 2.52,0.68 17.75,-1.47 17.53,1.4 c 0.38,1.41 -0.1,2.28 -1.45,2.61 c -8.02,0.02 -16.05,0.02 -24.07,-0.02 c -1.79,0.02 -1.34,-1.94 -1.38,-3.1 Z"
              />
              <path
                ref={strokeORef}
                d="M 122.03,0 c 3.64,0 7.29,0 10.94,0 c 0.11,0.31 0.32,0.53 0.61,0.68 c 18.03,3.71 26.77,22.89 17.48,38.91 c -26.92,40.68 -83.11,-12.55 -32.47,-38.53 c 1,-0.23 3.15,0.36 3.44,-1.06 Z M 105.48,23.87 c 0.88,29.01 38.92,39.99 42.21,9.59 c 2.6,-34.35 -43.02,-43.1 -42.21,-9.59 Z"
              />
              <path
                ref={strokeV1Ref}
                d="M 155.19,2.2 c 1.63,-0.1 7.71,-0.78 8.66,0.48 c 5.18,12.73 10.46,25.39 15.86,37.98 c 0.72,-0.05 1.16,-0.44 1.33,-1.16 c 4.86,-12.09 9.71,-24.17 14.55,-36.26 c 0.49,-1.31 2.24,-1.82 3.12,-0.6 c -6.17,15.95 -12.48,31.87 -18.9,47.73 c -0.2,0.76 -0.64,1.31 -1.33,1.65 c -1.64,0.54 -2.89,0.1 -3.73,-1.34 c -6.11,-14.89 -12.22,-29.78 -18.34,-44.67 c -0.59,-1.21 -0.99,-2.49 -1.22,-3.81 Z"
              />
              <path
                ref={strokeV2Ref}
                d="M 201.88,2.97 c 0.25,-1.75 6.27,-0.75 7.57,-0.85 c 0.48,0.09 0.84,0.35 1.08,0.78 c 5.03,12.29 10.1,24.56 15.21,36.82 c 0.42,1.02 0.95,1.11 1.58,0.26 c 5.08,-12.36 10.09,-24.75 15.01,-37.18 c 1.04,-1.44 3.91,-0.98 2.49,1.57 c -6.21,15.43 -12.4,30.87 -18.56,46.31 c -0.84,1.46 -2.08,1.89 -3.73,1.3 c -0.47,-0.15 -0.81,-0.45 -1.02,-0.9 c -6.6,-16.02 -13.14,-32.05 -19.63,-48.11 Z"
              />
            </g>
          </svg>
        </div>



      </div>
    </section>
  );
}
