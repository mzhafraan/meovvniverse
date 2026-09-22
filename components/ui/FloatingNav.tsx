"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

/**
 * Renders a word with the first letter in Bathory and the rest in pixel font.
 * Not uppercase — title case with lowercase pixel body.
 */
function MixedFontWord({ word }: { word: string }) {
  if (!word) return null;
  const first = word[0].toUpperCase();
  const rest = word.slice(1).toLowerCase();
  return (
    <span className="inline-flex items-baseline">
      <span className="font-bathory text-[1.15em] leading-none">{first}</span>
      <span className="font-glyphius font-black text-[0.75em] leading-none tracking-tight uppercase">{rest}</span>
    </span>
  );
}

function MixedFontLabel({ label }: { label: string }) {
  const words = label.split(" ");
  return (
    <span className="inline-flex items-baseline gap-[0.3em] flex-wrap">
      {words.map((word, i) => (
        <MixedFontWord key={i} word={word} />
      ))}
    </span>
  );
}

/**
 * FloatingNav — Minimal top-right floating navigation.
 *
 * - Always visible in the top-right corner
 * - Hovering one item blurs/fades the others
 * - Arrow indicator (→) slides in on hover
 * - Mixed font: first letter Bathory, rest pixel
 */
export function FloatingNav() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();

  const navLinks = [
    { label: "Portal", href: "/#portal", target: "#portal" },
    { label: "The Coven", href: "/#coven", target: "#coven" },
    { label: "Terminal", href: "/#terminal", target: "#terminal" },
    { label: "Audio Vault", href: "/#console", target: "#console" },
    { label: "Archive", href: "/archive", target: null },
  ];

  const handleLinkClick = useCallback(
    (
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
      }
    },
    [pathname, scrollTo]
  );

  return (
    <nav
      className="fixed top-6 right-6 sm:top-8 sm:right-8 lg:top-10 lg:right-10 z-50 select-none"
      aria-label="Main navigation"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* Menu label */}
      <div className="font-pixel text-[11px] tracking-[0.35em] text-fog uppercase mb-4 text-right">
        Menu
      </div>

      {/* Nav items */}
      <div className="flex flex-col items-end gap-1">
        {navLinks.map((link, idx) => {
          const isHovered = hoveredIndex === idx;
          const isOtherHovered = hoveredIndex !== null && !isHovered;

          return (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link)}
              onMouseEnter={() => setHoveredIndex(idx)}
              className={`group relative flex items-center gap-2 py-1 tracking-tight cursor-pointer transition-all duration-300 ease-out
                text-xl sm:text-2xl md:text-3xl lg:text-4xl
                ${
                  isHovered
                    ? "text-white opacity-100 translate-x-0 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                    : isOtherHovered
                    ? "text-fog/60 blur-[1.5px] opacity-60 scale-[0.98] skew-x-1"
                    : "text-ash/80 opacity-85 hover:text-white"
                }`}
            >
              {/* Arrow indicator */}
              <span
                className={`inline-block transition-all duration-300 text-volt font-bathory text-base sm:text-lg md:text-xl ${
                  isHovered
                    ? "opacity-100 translate-x-0 w-5 sm:w-6 md:w-8"
                    : "opacity-0 translate-x-3 w-0 overflow-hidden"
                }`}
              >
                →
              </span>
              <MixedFontLabel label={link.label} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

