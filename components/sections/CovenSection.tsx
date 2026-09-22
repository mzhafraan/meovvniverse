"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Member } from "@/types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* Full official names */
const MEMBER_FULL_NAMES: Record<string, string> = {
  sooin: "Kim Sooin",
  gawon: "Lee Gawon",
  anna: "Anna Tanaka",
  narin: "Lyn Narin",
  ella: "Ella Gross",
};

/* ---------- Row Component ---------- */

function MemberRow({
  member,
  index,
  isActive,
  setActiveId,
  isMobile,
  isAnyActive,
  onHoverStart,
}: {
  member: Member;
  index: number;
  isActive: boolean;
  setActiveId: (id: string | null) => void;
  isMobile: boolean;
  isAnyActive: boolean;
  onHoverStart: (e: React.MouseEvent, id: string) => void;
}) {
  const isDimmed = isAnyActive && !isActive;
  const fullName = MEMBER_FULL_NAMES[member.slug] || member.name;
  const roleText = member.positions.join(" · ").toUpperCase();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{
        opacity: isDimmed ? 0.25 : 1,
        filter: isDimmed ? "blur(2px)" : "blur(0px)",
        scale: isDimmed ? 0.985 : 1,
        y: 0,
      }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      onMouseEnter={(e) => !isMobile && onHoverStart(e, member.id)}
      onMouseLeave={() => !isMobile && setActiveId(null)}
      onClick={() => isMobile && setActiveId(isActive ? null : member.id)}
      className={`group relative border-t border-concrete-light transition-all duration-500 last:border-b hover:bg-white/[0.015] ${
        isMobile ? "cursor-pointer" : "cursor-default"
      }`}
    >
      <Link
        href={`/member/${member.slug}`}
        className="relative z-10 flex flex-col py-8 sm:py-10 md:flex-row md:items-center md:justify-between md:py-12 no-underline"
      >
        {/* Full Name in Gothic Bathory */}
        <div className="flex items-baseline pl-4 md:pl-2 transition-transform duration-500 ease-out group-hover:translate-x-4 md:group-hover:translate-x-6">
          <h2 className="font-bathory text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-normal text-fog/70 transition-colors duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_35px_rgba(255,255,255,0.45)]">
            {fullName}
          </h2>
        </div>

        {/* Official Role */}
        <div className="mt-4 flex items-center justify-between pl-6 pr-4 md:mt-0 md:justify-end md:gap-10 md:pl-0 md:pr-2">
          <span className="font-glyphius text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-fog/80 transition-colors duration-300 group-hover:text-volt group-hover:drop-shadow-[0_0_15px_rgba(204,255,0,0.5)]">
            {roleText}
          </span>

          {/* Mobile Accordion Toggle */}
          <div className="block md:hidden text-fog">
            {isActive ? <Minus size={20} /> : <Plus size={20} />}
          </div>

          {/* Desktop Arrow Indicator */}
          <motion.div
            animate={{
              x: isActive ? 0 : -14,
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1.05 : 0.9,
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="hidden md:flex items-center text-volt"
          >
            <ArrowUpRight size={32} strokeWidth={1.75} />
          </motion.div>
        </div>
      </Link>

      {/* MOBILE: Accordion Image */}
      <AnimatePresence>
        {isMobile && isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden pb-6 px-4"
          >
            <div className="relative aspect-[3/4] w-full max-w-sm mx-auto overflow-hidden rounded-lg border border-concrete-light/80 shadow-2xl">
              <Image
                src={member.profileImage}
                alt={member.name}
                className="object-cover object-top"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------- Main Section ---------- */

interface CovenSectionProps {
  members: Member[];
}

export function CovenSection({ members }: CovenSectionProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLElement | null>(null);
  const mouseInitializedRef = useRef(false);

  // Smooth floating cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 220, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const updateMouseCoords = useCallback(
    (clientX: number, clientY: number) => {
      if (isMobile) return;
      const cardWidth = 260;
      const cardHeight = 350;
      const margin = 24;

      // Smart boundary offset: flip to left if too close to right edge
      const targetX =
        clientX + cardWidth + margin > window.innerWidth
          ? clientX - cardWidth - margin
          : clientX + margin;

      // Clamp Y so it doesn't overflow bottom
      const targetY = Math.min(
        Math.max(margin, clientY - cardHeight * 0.4),
        window.innerHeight - cardHeight - margin
      );

      if (!mouseInitializedRef.current) {
        mouseX.jump(targetX);
        mouseY.jump(targetY);
        mouseInitializedRef.current = true;
      } else {
        mouseX.set(targetX);
        mouseY.set(targetY);
      }
    },
    [isMobile, mouseX, mouseY]
  );

  const handleMouseMove = (e: React.MouseEvent) => {
    updateMouseCoords(e.clientX, e.clientY);
  };

  const handleHoverStart = (e: React.MouseEvent, id: string) => {
    updateMouseCoords(e.clientX, e.clientY);
    setActiveId(id);
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.fromTo(
        ".coven-section-beam",
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

      gsap.from(".coven-header-anim", {
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
    },
    { scope: containerRef }
  );

  const activeMember = members.find((m) => m.id === activeId);

  return (
    <section
      ref={containerRef}
      id="coven"
      className="relative w-full bg-void py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-concrete-light overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setActiveId(null)}
    >
      {/* Cybernetic Section Scanner Beam */}
      <div className="coven-section-beam absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-volt to-transparent origin-center pointer-events-none z-10 shadow-[0_0_15px_rgba(204,255,0,0.8)]" />

      <div className="mx-auto max-w-6xl">
        {/* Minimalist Section Header */}
        <div className="mb-16 sm:mb-20 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="coven-header-anim font-bathory text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-wide text-white">
            The Coven
          </h2>
          <div className="h-px flex-1 bg-concrete-light mx-8 hidden md:block" />
        </div>

        {/* Kinetic Member Rows */}
        <div className="flex flex-col">
          {members.map((member, index) => (
            <MemberRow
              key={member.id}
              member={member}
              index={index}
              isActive={activeId === member.id}
              setActiveId={setActiveId}
              isMobile={isMobile}
              isAnyActive={activeId !== null}
              onHoverStart={handleHoverStart}
            />
          ))}
        </div>
      </div>

      {/* DESKTOP: Global Floating Follow Card */}
      {!isMobile && (
        <motion.div
          style={{ x: cursorX, y: cursorY }}
          className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
        >
          <AnimatePresence mode="wait">
            {activeMember && (
              <motion.div
                key={activeMember.id}
                initial={{ opacity: 0, scale: 0.88, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.88, filter: "blur(10px)" }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                className="relative h-[350px] w-[260px] overflow-hidden rounded-xl border border-concrete-light/80 bg-concrete-dark/95 shadow-[0_30px_70px_rgba(0,0,0,0.95)] backdrop-blur-md"
              >
                <Image
                  src={activeMember.profileImage}
                  alt={activeMember.name}
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="260px"
                />

                {/* Subtle vignette border gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent pointer-events-none" />

                {/* Top glow edge */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-volt to-transparent shadow-[0_0_12px_#CCFF00]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
