"use client";

import React from "react";
import { Member } from "@/types";
import { MemberPillar } from "@/components/member/MemberPillar";
import { GothicDivider } from "@/components/ui/GothicFrame";
import { TerminalText } from "@/components/ui/TerminalText";

interface CovenSectionProps {
  members: Member[];
}

export function CovenSection({ members }: CovenSectionProps) {
  return (
    <section id="coven" className="relative w-full bg-void py-24 px-4 sm:px-6 lg:px-8 border-t border-concrete-light">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-chrome/30 bg-concrete-dark text-[10px] font-mono tracking-[0.3em] text-chrome uppercase">
            <span>SECTOR 02 // DYNAMIC MEMBER WIKI</span>
          </div>

          <h2 className="font-gothic text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[0.2em] text-ash uppercase">
            THE COVEN
          </h2>

          <p className="font-sans text-xs sm:text-sm text-fog leading-relaxed">
            Five monolithic pillars housing the verified telemetry, psychological indices, and kinetic signatures of MEOVV. Select an avatar to penetrate the encrypted profile codex.
          </p>

          <GothicDivider label="COVEN ENTITIES" />
        </div>

        {/* 5 Pillars Grid (Desktop: 5 columns, Tablet: 3-2, Mobile: 1-2) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-3">
          {members.map((member, index) => (
            <MemberPillar key={member.id} member={member} index={index} />
          ))}
        </div>

        {/* Bottom Section Terminal Note */}
        <div className="mt-12 p-4 bg-concrete-dark/60 border border-concrete-light flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-fog">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            <TerminalText text="TELEMETRY REAL-TIME SYNC: ACTIVE WITH DATABASE" speed={30} />
          </div>
          <span className="text-chrome-dim tracking-widest">
            TOTAL CODEX RECORDS: 05 ENTITIES
          </span>
        </div>
      </div>
    </section>
  );
}
