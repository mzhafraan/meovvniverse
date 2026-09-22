"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const MARQUEE_ROW_1 =
  "My Eyes Open Vvide · The Black Label · Meovv · Archival Edition · ";
const MARQUEE_ROW_2 =
  "STREAM DDI RRO RI NOW! · BITE NOW · DDI RRO RRI · HIT 'EM · FAVORITE SONG · IN MY HANDS · REVENGE · ";

export function LedMarqueeDivider() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Voltage surge entrance on scroll
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0.4,
          scaleY: 0.94,
          filter: "brightness(0.7) contrast(1.2)",
        },
        {
          opacity: 1,
          scaleY: 1,
          filter: "brightness(1) contrast(1)",
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      id="marquee-ticker"
      className="relative w-full bg-[#07070A] border-y-4 border-volt/50 shadow-[0_0_100px_rgba(204,255,0,0.25)] overflow-hidden py-10 sm:py-16 md:py-20 lg:py-28 select-none z-20 will-change-transform animate-short-circuit"
      aria-label="LED Running Ticker Divider"
    >
      {/* Background LED Matrix Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(204, 255, 0, 0.35) 1.5px, transparent 1.5px)",
          backgroundSize: "8px 8px",
        }}
      />

      {/* Atmospheric Glitch Scanline Layer */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(7,7,10,0)_50%,rgba(0,0,0,0.65)_50%)] bg-[length:100%_6px] opacity-45" />

      {/* Colossal Dual LED Running Marquee Streams (No small text, only giant running ticker) */}
      <div className="relative z-20 flex flex-col gap-4 sm:gap-6 md:gap-8 overflow-hidden py-2">
        {/* Row 1: Font Bathory Gothic Blackletter in Fluorescent Volt Lime (Scrolling Left) */}
        <div className="w-full overflow-hidden flex select-none py-2">
          <div className="flex whitespace-nowrap animate-marquee-left">
            <span className="font-bathory text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10.5rem] 2xl:text-[12.5rem] text-volt tracking-tight pr-12 md:pr-16 text-shadow-volt drop-shadow-[0_0_35px_rgba(204,255,0,0.75)] leading-none inline-block">
              {MARQUEE_ROW_1.repeat(4)}
            </span>
            <span className="font-bathory text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10.5rem] 2xl:text-[12.5rem] text-volt tracking-tight pr-12 md:pr-16 text-shadow-volt drop-shadow-[0_0_35px_rgba(204,255,0,0.75)] leading-none inline-block">
              {MARQUEE_ROW_1.repeat(4)}
            </span>
          </div>
        </div>

        {/* Row 2: Pixel Font in Crisp White (Scrolling Right) */}
        <div className="w-full overflow-hidden flex select-none py-2">
          <div className="flex whitespace-nowrap animate-marquee-right">
            <span className="font-pixel font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[7.5rem] 2xl:text-[9rem] text-white tracking-widest uppercase pr-12 md:pr-16 leading-none inline-block drop-shadow-[0_0_30px_rgba(255,255,255,0.45)]">
              {MARQUEE_ROW_2.repeat(4)}
            </span>
            <span className="font-pixel font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[7.5rem] 2xl:text-[9rem] text-white tracking-widest uppercase pr-12 md:pr-16 leading-none inline-block drop-shadow-[0_0_30px_rgba(255,255,255,0.45)]">
              {MARQUEE_ROW_2.repeat(4)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
