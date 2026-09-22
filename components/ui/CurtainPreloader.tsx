"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MeovvLogo } from "@/components/ui/MeovvLogo";

export function CurtainPreloader() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const darkPanelRef = useRef<HTMLDivElement | null>(null);
  const chromePanelRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Only show if DOM exists
    if (!containerRef.current || !darkPanelRef.current || !chromePanelRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsDone(true);
      },
    });

    // Initial state
    gsap.set([darkPanelRef.current, chromePanelRef.current], {
      yPercent: 0,
    });
    gsap.set(contentRef.current, {
      opacity: 0,
      scale: 0.95,
    });

    // Sequence: Fade in logo -> Hold brief moment -> Swipe panels upward sequentially
    tl.to(contentRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    })
      .to(contentRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        delay: 0.4,
        ease: "power2.in",
      })
      // Primary dark curtain lifts first
      .to(
        darkPanelRef.current,
        {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
        },
        "-=0.1"
      )
      // Secondary silver/concrete accent curtain lifts with subtle offset
      .to(
        chromePanelRef.current,
        {
          yPercent: -100,
          duration: 0.95,
          ease: "power4.inOut",
        },
        "-=0.75"
      );

    return () => {
      tl.kill();
    };
  }, []);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Secondary accent panel (underneath dark panel) */}
      <div
        ref={chromePanelRef}
        className="absolute inset-0 bg-concrete border-b border-chrome/30 pointer-events-auto"
      />

      {/* Primary dark panel (on top) */}
      <div
        ref={darkPanelRef}
        className="absolute inset-0 bg-[#08080C] flex flex-col items-center justify-center pointer-events-auto"
      >
        <div ref={contentRef} className="flex flex-col items-center text-center space-y-6 px-4">
          <MeovvLogo
            color="#FFFFFF"
            className="scale-125 sm:scale-150"
          />

          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>
      </div>
    </div>
  );
}
