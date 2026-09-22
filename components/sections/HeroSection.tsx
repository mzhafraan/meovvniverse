"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { TopographicLines } from "@/components/ui/TopographicLines";
import { AsciiDitherBackground } from "@/components/ui/AsciiDitherBackground";
import { TerminalText } from "@/components/ui/TerminalText";
import { ArrowUpRight, ChevronDown, Play, Pause, RefreshCw, Disc3, Shield } from "lucide-react";
import { MEMBERS } from "@/lib/data/meovvData";
import { Member } from "@/types";

// Urutan foto sesuai folder D:\ZHAFRAN\FOTO_MEOVV:
// 1. ANNA.jpg
// 2. ELLA.jpg
// 3. GAWON.jpg
// 4. NARIN.jpg
// 5. SOOIN.jpg
const FOLDER_ORDER_SLUGS = ["anna", "ella", "gawon", "narin", "sooin"];

export function HeroSection() {
  // Sort members according to the exact folder order
  const orderedMembers: Member[] = FOLDER_ORDER_SLUGS.map(
    (slug) => MEMBERS.find((m) => m.slug === slug) || MEMBERS[0]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchPhase, setGlitchPhase] = useState<0 | 1 | 2>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse parallax
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const activeMember = orderedMembers[currentIndex];
  const CYCLE_INTERVAL = 5000; // 5 seconds per member
  const PROGRESS_TICK = 50;

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
        setProgress(0);
      }, 200);

      // Phase 2: Settle down and finish glitch
      setTimeout(() => {
        setIsGlitching(false);
        setGlitchPhase(0);
      }, 450);
    },
    [isGlitching]
  );

  const nextMember = useCallback(() => {
    const nextIdx = (currentIndex + 1) % orderedMembers.length;
    switchToMember(nextIdx);
  }, [currentIndex, orderedMembers.length, switchToMember]);

  const prevMember = useCallback(() => {
    const prevIdx = (currentIndex - 1 + orderedMembers.length) % orderedMembers.length;
    switchToMember(prevIdx);
  }, [currentIndex, orderedMembers.length, switchToMember]);

  // Auto-play timer with progress bar
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextMember();
          return 0;
        }
        return prev + (PROGRESS_TICK / CYCLE_INTERVAL) * 100;
      });
    }, PROGRESS_TICK);

    return () => clearInterval(timer);
  }, [isAutoPlaying, isHovered, nextMember]);

  // Parallax mouse move handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 12, y: y * 8 });
  };

  return (
    <section
      id="portal"
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-void pt-20 select-none"
    >
      {/* 1. Background: Full-Bleed ASCII Dither Effect (jjanaj recipe) from GROUP_PHOTO_BURNINGUP_MEOVV */}
      <AsciiDitherBackground
        imageSrc="/members/GROUP_PHOTO_BURNINGUP_MEOVV.jpg"
        className="z-0 opacity-85"
        config={{
          cellSize: 10,
          density: 0,
          coverage: 100,
          brightness: 0,
          contrast: 128,
          saturation: 0,
          grayscale: 100,
          invert: false,
          renderMode: "dither",
          bgMode: "solid",
          animSpeed: 100,
          animStyle: "shimmer",
          animIntensity: 60,
          chromaticEnabled: true,
          chromaticIntensity: 20,
          halftoneEnabled: true,
          halftoneIntensity: 20,
          filmDustEnabled: true,
          filmDustIntensity: 20,
          tiltBlur: true,
          tiltFocus: 35,
          tiltPosition: 50,
          tiltFeather: 15,
          blurAmount: 30,
        }}
      />
      {/* Subtle top/bottom atmospheric vignette preserving full width */}
      <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-transparent to-void pointer-events-none z-[1]" />

      {/* 2. Top Center Floating Gothic Emblem (Like the helmet icon in Lando Norris reference) */}
      <div className="relative z-20 w-full flex flex-col items-center pt-2 sm:pt-4">
        {/* Gothic Insignia */}
        <div className="group relative cursor-pointer flex flex-col items-center">
          <div className="w-10 h-10 rounded-full border border-chrome/40 bg-concrete-dark/90 backdrop-blur-md flex items-center justify-center text-chrome shadow-[0_0_15px_rgba(192,192,192,0.2)] group-hover:border-chrome group-hover:shadow-[0_0_25px_rgba(192,192,192,0.5)] transition-all">
            <span className="font-gothic text-base font-black tracking-tighter">MV</span>
          </div>
          <div className="h-4 w-[1px] bg-gradient-to-b from-chrome/60 to-transparent my-1" />
          <span className="font-mono text-[9px] tracking-[0.35em] text-fog/80 uppercase group-hover:text-chrome transition-colors">
            {activeMember.name} // ARCHIVE 0{currentIndex + 1}
          </span>
        </div>
      </div>

      {/* 3. CENTER HERO: Close-Up Portrait (Grounded at Bottom like Lando Norris) */}
      <div
        className="relative z-10 flex-1 w-full flex items-end justify-center pointer-events-auto"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Portrait Container */}
        <div
          onClick={nextMember}
          className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl h-[68vh] sm:h-[76vh] md:h-[82vh] flex items-end justify-center cursor-pointer"
          title="Click to glitch-switch to next member"
          style={{
            transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
            transition: "transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          {/* Base Member Image */}
          <div
            className={`relative w-full h-full flex items-end justify-center overflow-hidden transition-all duration-300 ${
              isGlitching ? "scale-[1.02] filter contrast-150 brightness-110" : "scale-100"
            }`}
            style={{
              maskImage: "radial-gradient(ellipse 80% 88% at 50% 50%, black 50%, transparent 92%), linear-gradient(to bottom, black 70%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 88% at 50% 50%, black 50%, transparent 92%), linear-gradient(to bottom, black 70%, transparent 100%)",
            }}
          >
            <Image
              src={activeMember.heroImage}
              alt={activeMember.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
              className="object-contain object-bottom filter grayscale contrast-115 brightness-95 transition-opacity duration-300"
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
                  transform: glitchPhase === 1 ? "translateX(-8px)" : "translateX(10px)",
                }}
              >
                <Image
                  src={activeMember.heroImage}
                  alt={activeMember.name}
                  fill
                  className="object-contain object-bottom"
                />
              </div>
            )}

            {/* GLITCH OVERLAY 2: Static White Noise & Slice Inversion */}
            {isGlitching && (
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none mix-blend-screen filter contrast-200 brightness-150 opacity-80"
                style={{
                  clipPath:
                    glitchPhase === 1
                      ? "polygon(0 68%, 100% 68%, 100% 86%, 0 86%)"
                      : "polygon(0 10%, 100% 10%, 100% 28%, 0 28%)",
                  transform: glitchPhase === 1 ? "translateX(12px)" : "translateX(-6px)",
                }}
              >
                <Image
                  src={activeMember.heroImage}
                  alt={activeMember.name}
                  fill
                  className="object-contain object-bottom"
                />
              </div>
            )}

            {/* Subtle Scanlines on Image */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,18,22,0)_50%,rgba(0,0,0,0.35)_50%)] bg-[length:100%_4px] opacity-30" />
          </div>

          {/* Glitch Indicator Tag on Hover */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 px-3 py-1 bg-void/90 border border-chrome/40 text-[10px] font-mono tracking-[0.25em] text-chrome backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity uppercase pointer-events-none flex items-center gap-2">
            <RefreshCw className={`w-3 h-3 ${isGlitching ? "animate-spin" : ""}`} />
            <span>CLICK // CYCLE ARCHIVE TAPE</span>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM BAR: Left Telemetry Card + Right Sequence Timeline (Inspired by Lando Norris UI) */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 flex flex-col md:flex-row items-end justify-between gap-6">
        {/* Bottom Left Card (Like "NEXT RACE" card on Lando's site) */}
        <div className="w-full sm:w-80 bg-concrete-dark/95 backdrop-blur-md border border-concrete-light p-4 relative shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
          {/* Gothic Corner Ornaments */}
          <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-chrome/80" />
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-chrome/80" />
          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-chrome/80" />
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-chrome/80" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-concrete-light/60 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.25em] text-chrome uppercase">
                ENTITY TELEMETRY
              </span>
            </div>
            <span className="font-mono text-[9px] text-fog">
              CODEX 0{currentIndex + 1}/05
            </span>
          </div>

          {/* Member Name & Positions */}
          <div className="space-y-1 mb-3">
            <div className="flex items-baseline justify-between">
              <h2 className="font-gothic text-2xl font-bold tracking-[0.15em] text-white uppercase">
                {activeMember.name}
              </h2>
              <span className="font-sans text-xs text-fog">
                {activeMember.koreanName.split(" ")[0]}
              </span>
            </div>
            <p className="font-mono text-[10px] text-chrome-dim tracking-wider uppercase">
              {activeMember.positions.join(" // ")}
            </p>
          </div>

          {/* Mini Stats Grid */}
          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono border-t border-concrete-light/40 pt-2 mb-3">
            <div className="flex justify-between text-fog">
              <span>MBTI:</span>
              <span className="text-white font-bold">{activeMember.mbti}</span>
            </div>
            <div className="flex justify-between text-fog">
              <span>ZODIAC:</span>
              <span className="text-white font-bold">{activeMember.zodiac}</span>
            </div>
            <div className="flex justify-between text-fog">
              <span>HEIGHT:</span>
              <span className="text-white font-bold">{activeMember.height}</span>
            </div>
            <div className="flex justify-between text-fog">
              <span>CODEX:</span>
              <span className="text-chrome font-bold">SECTOR 0{currentIndex + 1}</span>
            </div>
          </div>

          {/* Link CTA to Member Details */}
          <Link
            href={`/member/${activeMember.slug}`}
            className="flex items-center justify-between w-full py-1.5 px-2.5 bg-void border border-concrete-light hover:border-chrome text-[10px] font-mono tracking-widest text-chrome hover:text-white transition-all uppercase"
          >
            <span>ACCESS FULL DOSSIER</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Bottom Center: Scroll Hint */}
        <div className="hidden lg:flex flex-col items-center gap-1 text-fog/70 hover:text-white transition-colors cursor-pointer pb-2">
          <a href="#coven" className="flex flex-col items-center gap-1.5">
            <span className="font-mono text-[9px] tracking-[0.35em] uppercase">
              SCROLL TO PENETRATE ARCHIVE
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce text-chrome" />
          </a>
        </div>

        {/* Bottom Right Timeline & Member Sequence Selector */}
        <div className="w-full sm:w-auto bg-concrete-dark/95 backdrop-blur-md border border-concrete-light p-3 sm:p-4 shadow-[0_10px_30px_rgba(0,0,0,0.9)] space-y-3">
          {/* Header with Play/Pause Auto Cycle */}
          <div className="flex items-center justify-between gap-4 text-[10px] font-mono text-fog border-b border-concrete-light/60 pb-2">
            <span className="tracking-widest text-chrome uppercase">
              FOLDER SEQUENCE (D:\ZHAFRAN\FOTO_MEOVV)
            </span>
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-1 text-chrome hover:text-white transition-colors"
              title={isAutoPlaying ? "Pause Auto Glitch" : "Resume Auto Glitch"}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3 h-3" />
                  <span>PAUSE</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3" />
                  <span>AUTO</span>
                </>
              )}
            </button>
          </div>

          {/* Member Pills in Folder Order: ANNA, ELLA, GAWON, NARIN, SOOIN */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {orderedMembers.map((member, idx) => (
              <button
                key={member.id}
                onClick={() => switchToMember(idx)}
                className={`relative px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase transition-all duration-300 border ${
                  currentIndex === idx
                    ? "bg-ash text-void border-white font-bold shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                    : "bg-void text-fog border-concrete-light hover:border-chrome/50 hover:text-ash"
                }`}
              >
                <span>{member.name}</span>
              </button>
            ))}
          </div>

          {/* Auto Cycle Progress Bar */}
          <div className="space-y-1">
            <div className="h-1 w-full bg-void border border-concrete-light overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-chrome-dim to-white transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[8px] font-mono text-fog/60">
              <span>GLITCH CYCLE</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
