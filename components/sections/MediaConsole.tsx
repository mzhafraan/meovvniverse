"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Track } from "@/types";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useLyricSync } from "@/hooks/useLyricSync";
import { GothicFrame, GothicDivider } from "@/components/ui/GothicFrame";
import { TerminalText } from "@/components/ui/TerminalText";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Disc3,
  Sliders,
  Radio,
  Terminal,
  Layers,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface MediaConsoleProps {
  tracks: Track[];
}

export function MediaConsole({ tracks }: MediaConsoleProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const {
    currentTrack,
    currentTrackIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isLoading,
    togglePlay,
    seek,
    nextTrack,
    prevTrack,
    selectTrack,
    setVolume,
    setIsMuted,
    loadCustomAudio,
  } = useAudioPlayer(tracks, 0);

  const { activeIndex, activeLine, previousLine, nextLine } = useLyricSync(
    currentTrack.lyrics,
    currentTime
  );

  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const terminalScrollRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll terminal lyrics when active index changes
  useEffect(() => {
    if (terminalScrollRef.current) {
      const activeEl = terminalScrollRef.current.querySelector(
        `[data-lyric-index="${activeIndex}"]`
      );
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [activeIndex]);

  // Handle analog progress bar click/seek
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || duration === 0) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    seek(ratio * duration);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Cybernetic section transition beam
      gsap.fromTo(
        ".console-section-beam",
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Header elements reveal
      gsap.from(".console-header-anim", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Console shell elevation
      gsap.from(".console-shell-anim", {
        y: 60,
        opacity: 0,
        scale: 0.97,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".console-shell-anim",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="console"
      className="relative w-full bg-void py-24 px-4 sm:px-6 lg:px-8 border-t border-concrete-light select-none overflow-hidden"
    >
      {/* Cybernetic Section Transition Scanner Beam */}
      <div className="console-section-beam absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-volt to-transparent origin-center pointer-events-none z-10 shadow-[0_0_15px_rgba(204,255,0,0.8)]" />

      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <h2 className="console-header-anim font-bathory text-5xl sm:text-6xl lg:text-7xl font-normal tracking-wide text-white">
            Audio Vault
          </h2>

          <p className="console-header-anim font-sans text-sm text-fog max-w-md mx-auto leading-relaxed">
            Official discography with synchronized real-time lyrics.
          </p>
        </div>

        {/* Industrial Mechanical Console Outer Shell */}
        <div className="console-shell-anim relative rounded-none bg-concrete-dark border-2 border-concrete-light shadow-[0_20px_50px_rgba(0,0,0,0.95)] p-4 sm:p-8">
          {/* Industrial Screws / Rivets in Corners */}
          <div className="absolute top-2 left-2 w-3 h-3 rounded-full border border-chrome/50 bg-concrete flex items-center justify-center">
            <div className="w-1.5 h-[1px] bg-chrome/70 rotate-45" />
          </div>
          <div className="absolute top-2 right-2 w-3 h-3 rounded-full border border-chrome/50 bg-concrete flex items-center justify-center">
            <div className="w-1.5 h-[1px] bg-chrome/70 -rotate-45" />
          </div>
          <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full border border-chrome/50 bg-concrete flex items-center justify-center">
            <div className="w-1.5 h-[1px] bg-chrome/70 -rotate-12" />
          </div>
          <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full border border-chrome/50 bg-concrete flex items-center justify-center">
            <div className="w-1.5 h-[1px] bg-chrome/70 rotate-60" />
          </div>

          {/* Top Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-concrete-light">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-volt rounded-full animate-pulse shadow-[0_0_10px_rgba(204,255,0,0.6)]" />
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-ash uppercase">
                DISCOGRAPHY PLAYER
              </span>
            </div>

            {/* Track Switcher Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-full">
              {tracks.map((tr, idx) => (
                <button
                  key={tr.id}
                  onClick={() => selectTrack(idx)}
                  className={`px-3 py-1 text-[10px] font-mono tracking-wider uppercase border transition-all whitespace-nowrap ${
                    currentTrackIndex === idx
                      ? "bg-ash text-void border-white font-bold"
                      : "bg-void text-fog border-concrete-light hover:border-chrome/50 hover:text-ash"
                  }`}
                >
                  {tr.title}
                </button>
              ))}
            </div>
          </div>

          {/* Main Console Body: Left Player Specs + Right Lyric Terminal */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Col: Album Vinyl & Physical Controls (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              {/* Vinyl / Cover Display */}
              <div className="relative w-full aspect-square max-w-xs mx-auto border-2 border-concrete-light bg-void p-3 shadow-inner flex items-center justify-center">
                {/* Spinning Vinyl Plate */}
                <div
                  className={`relative w-full h-full rounded-full border-4 border-concrete-light bg-[radial-gradient(circle,#1a1a1a_30%,#000000_70%,#111111_100%)] flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden ${
                    isPlaying ? "animate-spin" : ""
                  }`}
                  style={{ animationDuration: "16s" }}
                >
                  {/* Vinyl Grooves Simulation */}
                  <div className="absolute inset-4 rounded-full border border-white/5" />
                  <div className="absolute inset-8 rounded-full border border-white/5" />
                  <div className="absolute inset-12 rounded-full border border-white/5" />
                  <div className="absolute inset-16 rounded-full border border-white/5" />

                  {/* Center Album Art */}
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-chrome/60 shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                    <Image
                      src={currentTrack.coverArt}
                      alt={currentTrack.title}
                      fill
                      className="object-cover contrast-105 brightness-100"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 rounded-full bg-void border border-chrome" />
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 left-4 z-10 px-2 py-0.5 bg-void/90 border border-concrete-light text-[9px] font-mono text-chrome tracking-widest uppercase">
                  {isPlaying ? "PLAYING" : "STANDBY"}
                </div>
              </div>

              {/* Track Info */}
              <div className="text-center space-y-1">
                <h3 className="font-gothic text-2xl sm:text-3xl font-bold tracking-[0.15em] text-ash">
                  {currentTrack.title}
                </h3>
                <p className="font-mono text-xs text-chrome-dim tracking-widest uppercase">
                  {currentTrack.album} · {currentTrack.releaseDate}
                </p>
              </div>

              {/* Analog Transport Controls (Play, Seek, Prev, Next) */}
              <div className="space-y-4">
                {/* Mechanical Buttons */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={prevTrack}
                    className="p-3 bg-concrete border border-concrete-light hover:border-chrome text-chrome-dim hover:text-white transition-all active:scale-95 shadow-md"
                    title="Previous Track"
                    aria-label="Previous Track"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>

                  <button
                    onClick={togglePlay}
                    className="p-4 bg-ash text-void border-2 border-white hover:bg-white transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    title={isPlaying ? "Pause" : "Play"}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 fill-void" />
                    ) : (
                      <Play className="w-5 h-5 fill-void ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={nextTrack}
                    className="p-3 bg-concrete border border-concrete-light hover:border-chrome text-chrome-dim hover:text-white transition-all active:scale-95 shadow-md"
                    title="Next Track"
                    aria-label="Next Track"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>

                {/* Volume Slider */}
                <div className="flex items-center justify-center gap-3 max-w-xs mx-auto text-fog">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="hover:text-chrome transition-colors"
                    aria-label="Toggle mute"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.02"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value));
                      setIsMuted(false);
                    }}
                    className="w-32 h-1.5 bg-concrete-light rounded-none accent-chrome cursor-pointer"
                    aria-label="Volume slider"
                  />

                  <span className="font-mono text-[10px] w-8 text-right">
                    {Math.round((isMuted ? 0 : volume) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Right Col: Analog Progress Bar & Synced Terminal Lyrics (7 cols) */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              {/* ANALOG PROGRESS BAR (PRD 4.4.1) */}
              <div className="space-y-2 bg-void/80 p-4 border border-concrete-light">
                <div className="flex items-center justify-between text-[11px] font-mono text-chrome tracking-widest">
                  <span className="flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-chrome-dim" />
                    ANALOG SEEK CALIPER
                  </span>
                  <span>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                {/* Custom Analog Progress Bar Track */}
                <div
                  ref={progressBarRef}
                  onClick={handleProgressClick}
                  className="relative h-6 bg-concrete-dark border border-concrete-light cursor-pointer group overflow-hidden"
                >
                  {/* Caliper Graduations / Ticks */}
                  <div className="absolute inset-0 flex justify-between pointer-events-none opacity-20 px-1">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-[1px] ${
                          i % 5 === 0 ? "h-full bg-white" : "h-2 bg-white/60"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Filled Gauge (Mechanical Silver Gradient) */}
                  <div
                    className="h-full bg-gradient-to-r from-concrete-light via-chrome-dim to-ash border-r-2 border-white transition-all duration-100 shadow-[0_0_15px_rgba(192,192,192,0.4)]"
                    style={{ width: `${progressPercent}%` }}
                  />

                  {/* Scrubber Needle Indicator */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_8px_#ffffff] pointer-events-none"
                    style={{ left: `calc(${progressPercent}% - 2px)` }}
                  />
                </div>

                <div className="flex justify-between text-[10px] font-mono text-fog">
                  <span>00:00</span>
                  <span className="text-chrome font-bold">{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* SYNCED LYRICS CONTAINER */}
              <div className="flex-1 flex flex-col bg-void border border-concrete-light shadow-inner overflow-hidden">
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-2 bg-concrete-dark border-b border-concrete-light font-mono text-[10px] text-chrome tracking-widest uppercase">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-chrome" />
                    <span>SYNCHRONIZED LYRICS · {currentTrack.title}</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-fog">
                    <span className="w-1.5 h-1.5 bg-[#CCFF00] rounded-full" />
                    SYNCED
                  </span>
                </div>

                {/* Lyrics Content Container (Auto-scrolling) */}
                <div
                  ref={terminalScrollRef}
                  className="p-6 overflow-y-auto max-h-[320px] font-mono text-xs space-y-4 scroll-smooth scrollbar-thin scrollbar-thumb-concrete-light"
                >
                  {currentTrack.lyrics.map((line, idx) => {
                    const isCurrent = idx === activeIndex;
                    const isPast = idx < activeIndex;

                    return (
                      <div
                        key={idx}
                        data-lyric-index={idx}
                        onClick={() => seek(line.time)}
                        className={`cursor-pointer transition-all duration-300 p-2.5 rounded-none border ${
                          isCurrent
                            ? "bg-concrete-light/70 border-chrome text-white shadow-[0_0_15px_rgba(192,192,192,0.2)] translate-x-1"
                            : isPast
                            ? "border-transparent text-fog/60 hover:text-fog hover:border-concrete-light"
                            : "border-transparent text-fog/40 hover:text-fog hover:border-concrete-light"
                        }`}
                      >
                        {/* Timestamp & Speaker Tag */}
                        <div className="flex items-center justify-between text-[10px] mb-1">
                          <span
                            className={`${
                              isCurrent ? "text-chrome font-bold" : "text-fog/50"
                            }`}
                          >
                            [{formatTime(line.time)}]
                          </span>
                          {line.speaker && (
                            <span
                              className={`px-1.5 py-0.2 border text-[9px] tracking-wider uppercase ${
                                isCurrent
                                  ? "border-chrome text-white bg-void"
                                  : "border-concrete-light text-fog"
                              }`}
                            >
                              {line.speaker}
                            </span>
                          )}
                        </div>

                        {/* Primary Lyric Text */}
                        <div
                          className={`text-sm sm:text-base font-sans tracking-wide ${
                            isCurrent
                              ? "font-bold text-ash"
                              : "font-normal"
                          }`}
                        >
                          {isCurrent ? (
                            <span className="flex items-center gap-2">
                              <span className="text-chrome select-none">▶</span>
                              <span>{line.text}</span>
                            </span>
                          ) : (
                            line.text
                          )}
                        </div>

                        {/* Romanization / Translation if present */}
                        {line.romanization && (
                          <div className="text-[11px] text-fog/80 italic mt-0.5 font-sans">
                            {line.romanization}
                          </div>
                        )}
                        {line.translation && (
                          <div className="text-[11px] text-chrome-dim mt-0.5 font-sans">
                            &quot;{line.translation}&quot;
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Terminal Footer Status */}
                <div className="px-4 py-2 bg-void border-t border-concrete-light/60 flex items-center justify-between text-[10px] font-mono text-fog">
                  <span>
                    ACTIVE LINE: {activeIndex + 1} OF {currentTrack.lyrics.length}
                  </span>
                  <span className="text-chrome-dim">CLICK ANY LINE TO JUMP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Console Controls & Local Audio Loader */}
          <div className="mt-8 pt-4 border-t border-concrete-light flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono text-fog">
            <div className="flex flex-wrap items-center gap-4">
              <span>CONTROLS: [SPACE] PLAY/PAUSE</span>
              <span>[M] MUTE</span>
              <span className="hidden sm:inline text-concrete-light">|</span>
              <label
                title="Load local song file (e.g. from C:\Users\Chevalier Lab\Music\MEOVV\BITE NOW)"
                className="cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1 bg-void border border-concrete-light hover:border-volt hover:text-volt text-[10px] font-mono text-ash uppercase transition-all shadow-sm"
              >
                <Radio className="w-3 h-3 text-volt animate-pulse" />
                <span>LOAD LOCAL AUDIO</span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) loadCustomAudio(file);
                  }}
                  className="hidden"
                />
              </label>
            </div>
            <div className="flex items-center gap-2 text-chrome">
              <span className="text-volt">● VAULT LINKED:</span>
              <span className="text-fog">BITE NOW [C:\Users\Chevalier Lab\Music\MEOVV\BITE NOW]</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
