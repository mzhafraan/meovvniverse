"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Member } from "@/types";
import { GlitchImage } from "@/components/ui/GlitchImage";
import { ArrowUpRight } from "lucide-react";

interface MemberPillarProps {
  member: Member;
  index: number;
}

export function MemberPillar({ member, index }: MemberPillarProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/member/${member.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col h-[520px] sm:h-[580px] lg:h-[640px] border border-concrete-light/80 hover:border-chrome/80 bg-concrete-dark transition-all duration-500 overflow-hidden select-none focus:outline-none focus:ring-1 focus:ring-chrome"
    >
      {/* Top Roman Numeral Header */}
      <div className="relative z-20 flex items-center justify-between px-3 py-2 bg-void/80 border-b border-concrete-light/60 font-mono text-[10px] text-chrome-dim tracking-widest uppercase">
        <span>NO. 0{index + 1}</span>
        <span className="text-chrome font-bold">{member.name}</span>
      </div>

      {/* Main Image Container */}
      <div className="relative flex-1 w-full overflow-hidden bg-void">
        <GlitchImage
          src={member.pillarImage}
          alt={member.name}
          fill
          interactive={isHovered}
          className="w-full h-full"
        />

        {/* Gradient Overlay for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

        {/* Vertical Stage Name (Watermark) */}
        <div
          aria-hidden="true"
          className="absolute bottom-16 -right-6 font-gothic text-6xl font-black text-white/[0.07] group-hover:text-white/[0.15] select-none pointer-events-none transition-all duration-500 tracking-[0.2em] rotate-90"
        >
          {member.name}
        </div>
      </div>

      {/* Bottom Content & Reveal Overlay */}
      <div className="relative z-20 p-4 bg-void-light/95 border-t border-concrete-light flex flex-col justify-between transition-all duration-500">
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <h3 className="font-gothic text-2xl font-bold tracking-[0.15em] text-ash group-hover:text-white transition-colors">
              {member.name}
            </h3>
            <span className="font-mono text-[10px] text-fog tracking-wider">
              {member.koreanName.split(" ")[0]}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 my-2">
            {member.positions.map((pos) => (
              <span
                key={pos}
                className="px-1.5 py-0.5 bg-concrete-dark border border-concrete-light text-[9px] font-mono text-chrome-dim tracking-wider"
              >
                {pos}
              </span>
            ))}
          </div>
        </div>

        {/* Dynamic Stats Snippet */}
        <div className="mt-2 pt-2 border-t border-concrete-light/60 flex items-center justify-between text-[10px] font-mono text-fog">
          <span>MBTI: <strong className="text-chrome">{member.mbti}</strong></span>
          <span>ZODIAC: <strong className="text-chrome">{member.zodiac}</strong></span>
          <ArrowUpRight className="w-3.5 h-3.5 text-chrome-dim group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
      </div>

      {/* Gothic Filigree Corner Markers */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-chrome/50 z-30" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-chrome/50 z-30" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-chrome/50 z-30" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-chrome/50 z-30" />
    </Link>
  );
}
