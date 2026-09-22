"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { TopographicLines } from "@/components/ui/TopographicLines";
import { AsciiDitherBackground } from "@/components/ui/AsciiDitherBackground";
import { MemberSignature } from "@/components/ui/MemberSignatures";
import { MeovvLogo } from "@/components/ui/MeovvLogo";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MEMBERS } from "@/lib/data/meovvData";
import { Member } from "@/types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Order requested by user:
// Anna Tanaka, Ella Gross, Lee Gawon, Sooin Kim, Lyn Narin
const FOLDER_ORDER_SLUGS = ["anna", "ella", "gawon", "sooin", "narin"];

const MEMBER_FLANKING_NAMES: Record<
  string,
  { first: string; last: string; fullName: string }
> = {
  anna: { first: "Anna", last: "Tanaka", fullName: "Anna Tanaka" },
  ella: { first: "Ella", last: "Gross", fullName: "Ella Gross" },
  gawon: { first: "Lee", last: "Gawon", fullName: "Lee Gawon" },
  sooin: { first: "Sooin", last: "Kim", fullName: "Sooin Kim" },
  narin: { first: "Lyn", last: "Narin", fullName: "Lyn Narin" },
};

export function HeroSection() {
  const orderedMembers: Member[] = FOLDER_ORDER_SLUGS.map(
    (slug) => MEMBERS.find((m) => m.slug === slug) || MEMBERS[0]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchPhase, setGlitchPhase] = useState<0 | 1 | 2>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Refs
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  const parallaxPortraitRef = useRef<HTMLDivElement | null>(null);
  const signatureRef = useRef<HTMLDivElement | null>(null);
  const leftNameRef = useRef<HTMLDivElement | null>(null);
  const rightNameRef = useRef<HTMLDivElement | null>(null);

  const rafParallaxRef = useRef<number>(0);

  const activeMember = orderedMembers[currentIndex];
  const flankingNames =
    MEMBER_FLANKING_NAMES[activeMember.slug] || {
      first: activeMember.name,
      last: ".",
      fullName: activeMember.name,
    };
  const CYCLE_INTERVAL = 5000; // 5 seconds per member

  // Trigger smooth glitch switch to a specific index
  const switchToMember = useCallback(
    (targetIndex: number) => {
      if (isGlitching) return;
      setIsGlitching(true);
      setGlitchPhase(1);

      // Phase 1: High frequency slice glitch
      setTimeout(() => {
        setGlitchPhase(2);
        setCurrentIndex(targetIndex);
      }, 180);

      // Phase 2: Settle down and finish glitch
      setTimeout(() => {
        setIsGlitching(false);
        setGlitchPhase(0);
      }, 420);
    },
    [isGlitching]
  );

  const nextMember = useCallback(() => {
    const nextIdx = (currentIndex + 1) % orderedMembers.length;
    switchToMember(nextIdx);
  }, [currentIndex, orderedMembers.length, switchToMember]);

  const prevMember = useCallback(() => {
    const prevIdx =
      (currentIndex - 1 + orderedMembers.length) % orderedMembers.length;
    switchToMember(prevIdx);
  }, [currentIndex, orderedMembers.length, switchToMember]);

  // Clean 5-second interval timer for portal member auto-cycling
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;

    const timer = setTimeout(() => {
      nextMember();
    }, CYCLE_INTERVAL);

    return () => clearTimeout(timer);
  }, [isAutoPlaying, isHovered, currentIndex, nextMember]);

  // Parallax mouse move handler inside portrait card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!parallaxPortraitRef.current) return;
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((clientY - rect.top) / rect.height - 0.5) * 12;

    cancelAnimationFrame(rafParallaxRef.current);
    rafParallaxRef.current = requestAnimationFrame(() => {
      if (parallaxPortraitRef.current) {
        parallaxPortraitRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    });
  };

  // Scroll entrance reveal for The Portal
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Card elevation & scale entrance
      gsap.from(cardContainerRef.current, {
        scale: 0.92,
        opacity: 0.5,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Left and Right giant names slide in
      if (leftNameRef.current) {
        gsap.from(leftNameRef.current, {
          x: -60,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }

      if (rightNameRef.current) {
        gsap.from(rightNameRef.current, {
          x: 60,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="portal"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-void text-ash overflow-hidden select-none flex flex-col justify-between py-6 sm:py-8"
    >
      {/* Background Layer 1: Ascii Dither Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <AsciiDitherBackground
          imageSrc={activeMember.heroImage}
          config={{
            density: 0.35,
            brightness: 0.85,
            contrast: 1.25,
            saturation: 0,
            animSpeed: 0.4,
          }}
        />
      </div>

      {/* Background Layer 2: Crimson Nebula Aura (Upper Right) */}
      <div
        className="absolute -top-32 -right-32 w-[650px] sm:w-[900px] h-[650px] sm:h-[900px] pointer-events-none rounded-full opacity-45 blur-[120px] z-[1]"
        style={{
          background:
            "radial-gradient(circle, rgba(200, 25, 40, 0.45) 0%, rgba(120, 10, 20, 0.25) 45%, transparent 75%)",
        }}
      />

      {/* Background Layer 3: Topographic Contour Lines Overlay */}
      <div className="absolute inset-0 pointer-events-none z-[2] opacity-15">
        <TopographicLines />
      </div>

      {/* Background Layer 4: Atmospheric Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-void/75 via-transparent to-void pointer-events-none z-[3]" />

      {/* 1. TOP HEADER ROW: Micro Caption & Monogram */}
      <div className="relative z-30 w-full px-4 sm:px-8 md:px-12 pt-2 sm:pt-4 flex items-start justify-between">
        <div className="space-y-1">
          <p className="font-sans text-[11px] sm:text-xs text-fog/90 leading-relaxed font-light">
            Quiet creation, bringing ideas to life.
          </p>
          <p className="font-sans text-[11px] sm:text-xs text-fog/90 leading-relaxed font-light">
            Through motion, detail and softness.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full border border-chrome/40 bg-concrete-dark/90 backdrop-blur-md flex items-center gap-2 text-chrome shadow-[0_0_15px_rgba(192,192,192,0.2)]">
            <MeovvLogo color="currentColor" className="scale-75 origin-center" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-ash uppercase font-semibold">
              {activeMember.name}
            </span>
          </div>
        </div>
      </div>

      {/* 2. CENTER HERO: EXACT 4:5 FRAME & COLOSSAL GEIST PIXEL NAMES */}
      <div
        className="relative z-20 flex-1 w-full max-w-[100vw] flex items-center justify-center pointer-events-auto px-2 sm:px-4 md:px-6 overflow-hidden select-none my-auto py-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Horizontal Flanking Row */}
        <div className="relative w-full flex items-center justify-center">
          {/* Left Flanking Name: First Name in Romellis Light Semi Condensed Italic (White) */}
          <div
            ref={leftNameRef}
            className="flex-1 flex justify-end items-center pr-2 sm:pr-4 md:pr-6 lg:pr-8 pointer-events-none select-none z-10 will-change-transform overflow-visible"
          >
            <span className="font-romellis italic font-light tracking-tight text-white text-[clamp(4.8rem,14.5vw,23rem)] leading-[0.85] text-right whitespace-nowrap transition-all duration-300 drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)] drop-shadow-[0_0_35px_rgba(255,255,255,0.45)]">
              {flankingNames.first}
            </span>
          </div>

          {/* Main Portrait Wrapper: Exact 4:5 Aspect Ratio Matching Photo (736x920) */}
          <div
            ref={cardContainerRef}
            onClick={nextMember}
            className="relative shrink-0 w-[300px] sm:w-[400px] md:w-[480px] lg:w-[550px] xl:w-[620px] 2xl:w-[680px] max-h-[72vh] sm:max-h-[76vh] md:max-h-[80vh] aspect-[4/5] flex items-center justify-center cursor-pointer will-change-transform z-20 group"
            title="Click photo to switch to next member"
          >
            {/* Framed Card Shell - Exact same size as the photo */}
            <div className="portrait-card-frame relative w-full h-full rounded-sm border border-concrete-light/70 group-hover:border-volt/80 transition-all duration-300 bg-void/90 shadow-[0_25px_65px_rgba(0,0,0,0.95)] flex items-center justify-center">
              {/* Corner Brackets tightly hugging the 4 corners */}
              <div className="card-corners absolute -inset-1.5 sm:-inset-2 pointer-events-none z-30 transition-opacity duration-300">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-volt" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-volt" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-volt" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-volt" />
              </div>

              {/* Inner Photo Container with parallax */}
              <div
                ref={parallaxPortraitRef}
                onMouseMove={handleMouseMove}
                className="relative w-full h-full overflow-hidden rounded-sm"
              >
                <div
                  className={`relative w-full h-full transition-all duration-300 ${
                    isGlitching
                      ? "scale-[1.03] filter contrast-150 brightness-110"
                      : "scale-100"
                  }`}
                >
                  <Image
                    src={activeMember.heroImage}
                    alt={activeMember.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 40vw"
                    className="object-cover object-top filter grayscale contrast-115 brightness-95 transition-all duration-300 group-hover:filter-none group-hover:contrast-105"
                  />

                  {/* GLITCH OVERLAY 1: Horizontal Slice Displacement */}
                  {isGlitching && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none mix-blend-difference filter contrast-200 invert opacity-90 animate-glitch"
                      style={{
                        clipPath:
                          glitchPhase === 1
                            ? "polygon(0 20%, 100% 20%, 100% 38%, 0 38%)"
                            : "polygon(0 55%, 100% 55%, 100% 75%, 0 75%)",
                        transform:
                          glitchPhase === 1
                            ? "translateX(-8px)"
                            : "translateX(10px)",
                      }}
                    >
                      <Image
                        src={activeMember.heroImage}
                        alt={activeMember.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  )}

                  {/* GLITCH OVERLAY 2: White Noise Spike */}
                  {isGlitching && (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none mix-blend-screen filter contrast-200 brightness-150 opacity-80"
                      style={{
                        clipPath:
                          glitchPhase === 1
                            ? "polygon(0 68%, 100% 68%, 100% 86%, 0 86%)"
                            : "polygon(0 10%, 100% 10%, 100% 28%, 0 28%)",
                        transform:
                          glitchPhase === 1
                            ? "translateX(12px)"
                            : "translateX(-6px)",
                      }}
                    >
                      <Image
                        src={activeMember.heroImage}
                        alt={activeMember.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                  )}

                  {/* Subtle Scanlines on Image */}
                  <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,18,22,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] opacity-20" />
                </div>
              </div>

              {/* Neon Signature Overlay */}
              <div
                ref={signatureRef}
                className="absolute inset-x-0 bottom-6 z-30 pointer-events-none opacity-85 select-none transition-opacity duration-300 flex justify-center"
              >
                <div className="w-[85%] h-auto drop-shadow-[0_0_20px_rgba(204,255,0,0.5)]">
                  <MemberSignature slug={activeMember.slug} />
                </div>
              </div>

              {/* Tap to switch hint */}
              <div className="absolute bottom-3 inset-x-0 flex justify-center z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="px-3 py-0.5 rounded-full bg-void/90 border border-volt/60 text-[9px] font-mono text-volt tracking-widest uppercase backdrop-blur-md shadow-[0_0_15px_rgba(204,255,0,0.4)]">
                  Tap to Switch
                </div>
              </div>
            </div>
          </div>

          {/* Right Flanking Name: Last Name in Romellis Light Semi Condensed Italic (Volt Green) */}
          <div
            ref={rightNameRef}
            className="flex-1 flex justify-start items-center pl-2 sm:pl-4 md:pl-6 lg:pl-8 pointer-events-none select-none z-10 will-change-transform overflow-visible"
          >
            <span className="font-romellis italic font-light tracking-tight text-volt text-[clamp(4.8rem,14.5vw,23rem)] leading-[0.85] text-left whitespace-nowrap transition-all duration-300 drop-shadow-[0_0_45px_rgba(204,255,0,0.65)] text-shadow-volt">
              {flankingNames.last}
            </span>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM BAR: Member Selector Pills (Names Only, No Numbers) */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 flex flex-col items-center gap-3">
        {/* Member Switcher Tabs: Names Only */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-void/90 p-1 sm:p-1.5 rounded-full border border-concrete-light/80 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.85)]">
          <button
            type="button"
            onClick={prevMember}
            className="p-1.5 text-fog hover:text-white transition-colors cursor-pointer"
            aria-label="Previous member"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {orderedMembers.map((member, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={member.slug}
                type="button"
                onClick={() => switchToMember(idx)}
                className={`px-3 sm:px-4 py-1.5 rounded-full font-pixel text-xs sm:text-sm tracking-wider uppercase transition-all cursor-pointer ${
                  isActive
                    ? "bg-volt text-void font-bold shadow-[0_0_15px_rgba(204,255,0,0.5)] scale-105"
                    : "text-fog hover:text-ash hover:bg-concrete-light/50"
                }`}
              >
                <span>{member.name}</span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={nextMember}
            className="p-1.5 text-fog hover:text-white transition-colors cursor-pointer"
            aria-label="Next member"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
