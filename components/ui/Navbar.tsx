"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Radio, Disc3, ShieldAlert, Sparkles, Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "PORTAL", href: "/#portal" },
    { label: "THE COVEN", href: "/#coven" },
    { label: "TERMINAL", href: "/#terminal" },
    { label: "CONSOLE", href: "/#console" },
    { label: "ARCHIVE", href: "/archive" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 select-none ${
        scrolled
          ? "bg-void/90 backdrop-blur-md border-b border-concrete-light/80 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          : "bg-gradient-to-b from-void/95 to-transparent border-b border-white/5 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Mark */}
        <Link
          href="/"
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="relative w-7 h-7 flex items-center justify-center border border-chrome/40 bg-concrete-dark transition-all duration-300 group-hover:border-chrome group-hover:shadow-[0_0_12px_rgba(192,192,192,0.4)]">
            <span className="text-xs font-mono font-bold text-chrome">M</span>
            <div className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-chrome/90" />
            <div className="absolute -bottom-0.5 -left-0.5 w-1 h-1 bg-chrome/90" />
          </div>

          <div className="flex flex-col">
            <span className="font-gothic text-lg sm:text-xl font-black tracking-[0.25em] text-ash group-hover:text-white transition-colors">
              MEOVVNIVERSE
            </span>
            <span className="font-mono text-[9px] tracking-[0.35em] text-fog group-hover:text-chrome/80 transition-colors uppercase">
              GOTHIC TECH ARCHIVE
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative text-xs font-mono tracking-[0.25em] text-chrome-dim hover:text-white py-1 transition-colors group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-chrome transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right Status Badge & Console Shortcut */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-concrete-dark/80 border border-concrete-light text-[10px] font-mono text-chrome tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>SYS_ONLINE // 2026.BITE</span>
          </div>

          <Link
            href="/console"
            className="flex items-center gap-2 px-3 py-1 bg-concrete text-ash border border-chrome/40 hover:border-chrome hover:text-white hover:bg-concrete-light transition-all text-xs font-mono tracking-wider"
          >
            <Disc3 className="w-3.5 h-3.5 text-chrome animate-spin" style={{ animationDuration: "10s" }} />
            <span>CONSOLE</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-chrome hover:text-white border border-concrete-light"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-void/98 border-b border-chrome/30 px-6 py-6 flex flex-col gap-4 animate-in fade-in duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-mono tracking-[0.25em] text-ash hover:text-white py-2 border-b border-concrete-light/50 flex justify-between items-center"
            >
              <span>{link.label}</span>
              <span className="text-fog">→</span>
            </Link>
          ))}
          <div className="pt-2 flex items-center justify-between text-xs font-mono text-fog">
            <span>STATUS: ACTIVE</span>
            <span className="text-chrome">THEBLACKLABEL // MEOVV</span>
          </div>
        </div>
      )}
    </header>
  );
}
