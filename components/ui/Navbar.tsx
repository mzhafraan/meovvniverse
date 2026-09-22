"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Disc3, Menu, X } from "lucide-react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { MeovvLogo } from "@/components/ui/MeovvLogo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [editorialMenuOpen, setEditorialMenuOpen] = useState(false);
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null);
  const [hoveredEditorialIndex, setHoveredEditorialIndex] = useState<number | null>(null);
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close editorial menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setEditorialMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when editorial menu is open
  useEffect(() => {
    if (editorialMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [editorialMenuOpen]);

  const navLinks = [
    { label: "PORTAL", href: "/#portal", target: "#portal" },
    { label: "THE COVEN", href: "/#coven", target: "#coven" },
    { label: "TERMINAL", href: "/#terminal", target: "#terminal" },
    { label: "CONSOLE", href: "/#console", target: "#console" },
    { label: "ARCHIVE", href: "/archive", target: null },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: (typeof navLinks)[0]
  ) => {
    if (pathname === "/" && link.target) {
      e.preventDefault();
      if (link.target === "#portal") {
        scrollTo(0, { offset: 0 });
      } else {
        scrollTo(link.target, { offset: -80 });
      }
      setEditorialMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 select-none ${
          scrolled
            ? "bg-void/90 backdrop-blur-md border-b border-concrete-light/80 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
            : "bg-gradient-to-b from-void/95 to-transparent border-b border-white/5 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Mark with GSAP-animated SVG */}
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                scrollTo(0, { offset: 0 });
              }
            }}
            className="focus:outline-none"
            aria-label="MEOVV Home"
          >
            <MeovvLogo color="#F0F0F0" className="h-6 sm:h-7" />
          </Link>

          {/* Desktop Nav with Unique Focus/Blur Interaction */}
          <nav
            className="hidden md:flex items-center gap-7 lg:gap-9"
            aria-label="Main navigation"
            onMouseLeave={() => setHoveredNavIndex(null)}
          >
            {navLinks.map((link, idx) => {
              const isHovered = hoveredNavIndex === idx;
              const isOtherHovered =
                hoveredNavIndex !== null && !isHovered;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  onMouseEnter={() => setHoveredNavIndex(idx)}
                  className={`relative flex items-center gap-1.5 text-xs font-glyphius tracking-[0.25em] py-1 transition-all duration-300 ${
                    isHovered
                      ? "text-volt font-bold scale-105 opacity-100 blur-none"
                      : isOtherHovered
                      ? "opacity-25 filter blur-[2.5px] scale-95 text-chrome-dim"
                      : "text-chrome-dim hover:text-white opacity-90"
                  }`}
                >
                  <span
                    className={`transition-all duration-200 text-volt text-xs font-bold ${
                      isHovered
                        ? "opacity-100 translate-x-0 w-3"
                        : "opacity-0 -translate-x-2 w-0 overflow-hidden"
                    }`}
                  >
                    →
                  </span>
                  <span>{link.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-volt transition-all duration-300 ${
                      isHovered ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Console Shortcut & Editorial Menu Trigger */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/console"
              className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 bg-concrete-dark text-ash border border-concrete-light hover:border-volt hover:text-volt transition-colors text-xs font-glyphius tracking-widest group"
            >
              <Disc3
                className="w-3.5 h-3.5 text-chrome group-hover:text-volt animate-spin"
                style={{ animationDuration: "10s" }}
              />
              <span>CONSOLE</span>
            </Link>

            {/* Editorial Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setEditorialMenuOpen((prev) => !prev)}
              className={`flex items-center gap-2 px-3.5 py-1.5 bg-void/90 border transition-all text-xs font-glyphius tracking-[0.2em] uppercase cursor-pointer backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.6)] ${
                editorialMenuOpen
                  ? "border-volt text-volt shadow-[0_0_20px_rgba(204,255,0,0.3)]"
                  : "border-concrete-light hover:border-volt hover:text-volt text-ash"
              }`}
              aria-label="Toggle Editorial Menu"
            >
              {editorialMenuOpen ? (
                <>
                  <X className="w-3.5 h-3.5 text-volt" />
                  <span>CLOSE</span>
                </>
              ) : (
                <>
                  <Menu className="w-3.5 h-3.5 text-volt" />
                  <span>MENU</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Unique Editorial Fullscreen Overlay (Styled exactly like user reference image) */}
      {editorialMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#08080C]/98 backdrop-blur-2xl flex flex-col md:flex-row transition-all duration-500 select-none animate-in fade-in duration-300"
        >
          {/* Left Column: Vertical Rotated Brand Telemetry (Matches HUYML reference image) */}
          <div className="hidden md:flex flex-col justify-between py-12 px-8 lg:px-12 border-r border-concrete-light/60 [writing-mode:vertical-rl] rotate-180 select-none bg-void/80">
            <div className="flex items-center gap-6">
              <span className="font-glyphius text-2xl lg:text-3xl font-black tracking-tight text-white uppercase">
                MEOVV®
              </span>
              <span className="font-glyphius text-[11px] text-fog tracking-widest uppercase">
                copyright 2026 theblacklabel
              </span>
            </div>

            <div className="flex items-center gap-6 text-[10px] text-fog/70 font-glyphius tracking-widest uppercase">
              <span>SEOUL, KR</span>
              <span>+82 MEOVV</span>
            </div>
          </div>

          {/* Main Area: Editorial Menu List with Signature Blur Hover Effect */}
          <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 md:p-16 lg:p-20 overflow-y-auto">
            {/* Header row */}
            <div className="flex items-center justify-between border-b border-concrete-light/50 pb-4">
              <span className="font-glyphius text-xs sm:text-sm font-semibold tracking-[0.3em] text-fog uppercase">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setEditorialMenuOpen(false)}
                className="font-glyphius text-xs tracking-widest text-fog hover:text-volt transition-colors uppercase cursor-pointer flex items-center gap-1.5"
              >
                <span>CLOSE</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Menu Links with Focus/Blur Interaction */}
            <div
              className="my-auto py-8 flex flex-col gap-3 sm:gap-4 md:gap-6"
              onMouseLeave={() => setHoveredEditorialIndex(null)}
            >
              {navLinks.map((link, idx) => {
                const isHovered = hoveredEditorialIndex === idx;
                const isOtherHovered =
                  hoveredEditorialIndex !== null && !isHovered;

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      handleLinkClick(e, link);
                      setEditorialMenuOpen(false);
                    }}
                    onMouseEnter={() => setHoveredEditorialIndex(idx)}
                    className={`group relative flex items-center font-glyphius font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight transition-all duration-300 cursor-pointer ${
                      isHovered
                        ? "text-volt translate-x-2 sm:translate-x-4 scale-[1.02] filter-none opacity-100 drop-shadow-[0_0_30px_rgba(204,255,0,0.5)]"
                        : isOtherHovered
                        ? "text-ash/40 filter blur-[4.5px] opacity-25 scale-[0.98]"
                        : "text-ash hover:text-white filter-none opacity-90"
                    }`}
                  >
                    {/* Animated Arrow -> matching the reference design */}
                    <span
                      className={`transition-all duration-300 font-normal mr-2 sm:mr-4 text-volt ${
                        isHovered
                          ? "opacity-100 translate-x-0 inline-block w-6 sm:w-10 md:w-14"
                          : "opacity-0 -translate-x-6 w-0 overflow-hidden inline-block"
                      }`}
                    >
                      →
                    </span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Footer Telemetry */}
            <div className="pt-6 border-t border-concrete-light/50 flex flex-wrap items-center justify-between gap-4 text-xs font-glyphius tracking-widest text-fog">
              <span>THEBLACKLABEL // MY EYES OPEN VVIDE</span>
              <span className="text-volt">ARCHIVAL EDITION // ONLINE</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
