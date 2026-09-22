"use client";

import React from "react";

interface GothicFrameProps {
  children: React.ReactNode;
  className?: string;
  variant?: "filigree" | "industrial" | "minimal";
  highlight?: boolean;
}

export function GothicFrame({
  children,
  className = "",
  variant = "filigree",
  highlight = false,
}: GothicFrameProps) {
  return (
    <div
      className={`relative group bg-concrete-dark/90 backdrop-blur-md border ${
        highlight
          ? "border-chrome/60 shadow-[0_0_25px_rgba(192,192,192,0.15)]"
          : "border-concrete-light/70 hover:border-chrome/40 transition-colors duration-500"
      } ${className}`}
    >
      {/* Top-Left Gothic Filigree Corner */}
      <div className="absolute -top-1.5 -left-1.5 w-4 h-4 pointer-events-none z-10 text-chrome/70">
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full">
          <path d="M0 0h6v2H2v4H0V0zm3 3h2v2H3V3z" />
        </svg>
      </div>

      {/* Top-Right Gothic Filigree Corner */}
      <div className="absolute -top-1.5 -right-1.5 w-4 h-4 pointer-events-none z-10 text-chrome/70">
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full">
          <path d="M10 0h6v6h-2V2h-4V0zm1 3h2v2h-2V3z" />
        </svg>
      </div>

      {/* Bottom-Left Gothic Filigree Corner */}
      <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 pointer-events-none z-10 text-chrome/70">
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full">
          <path d="M0 10h2v4h4v2H0v-6zm3 1h2v2H3v-2z" />
        </svg>
      </div>

      {/* Bottom-Right Gothic Filigree Corner */}
      <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 pointer-events-none z-10 text-chrome/70">
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-full h-full">
          <path d="M14 10h2v6h-6v-2h4v-4zm-3 1h2v2h-2v-2z" />
        </svg>
      </div>

      {/* Top Center Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent via-chrome/80 to-transparent" />
      
      {/* Bottom Center Notch */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent via-chrome/80 to-transparent" />

      {/* Content wrapper */}
      <div className="relative z-0 h-full">{children}</div>
    </div>
  );
}

export function GothicDivider({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center my-8 gap-4 select-none opacity-80">
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-concrete-light to-chrome/40" />
      <div className="flex items-center gap-2 text-chrome text-xs tracking-[0.3em] font-mono uppercase">
        <span className="text-[10px] text-chrome/50">✦</span>
        {label && <span>{label}</span>}
        <span className="text-[10px] text-chrome/50">✦</span>
      </div>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-concrete-light to-chrome/40" />
    </div>
  );
}
