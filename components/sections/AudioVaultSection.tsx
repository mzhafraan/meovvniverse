"use client";

import React, { useRef } from "react";
import { MusicPlayer } from "@/components/ui/music-player-widget";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/**
 * AudioVaultSection — Homepage section wrapping the interactive vinyl
 * MusicPlayer widget with BITE NOW EP tracks and synchronized lyrics.
 * 
 * Features:
 * - Scroll-triggered entrance animations
 * - Spinning vinyl disc with Web Audio visualizer
 * - Real-time pixel-font synced lyrics
 * - Full keyboard shortcuts
 */
export function AudioVaultSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Scanner beam reveal
      gsap.fromTo(
        ".vault-beam",
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Title reveal
      gsap.from(".vault-title-anim", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Widget container reveal
      gsap.from(".vault-widget-anim", {
        y: 70,
        opacity: 0,
        scale: 0.96,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".vault-widget-anim",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="console"
      className="relative w-full bg-void py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-concrete-light select-none overflow-hidden"
    >
      {/* Scanner Beam */}
      <div className="vault-beam absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-volt to-transparent origin-center pointer-events-none z-10 shadow-[0_0_15px_rgba(204,255,0,0.8)]" />

      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <h2 className="vault-title-anim font-bathory text-5xl sm:text-6xl lg:text-7xl font-normal tracking-wide text-white">
            Audio Vault
          </h2>
          <p className="vault-title-anim font-glyphius text-sm text-fog max-w-md mx-auto leading-relaxed">
            Official discography with synchronized real-time lyrics.
          </p>
        </div>

        {/* Vinyl Player Widget */}
        <div className="vault-widget-anim flex flex-col items-center justify-center">
          <div className="w-full max-w-[420px]">
            <MusicPlayer />
          </div>
        </div>



      </div>
    </section>
  );
}
