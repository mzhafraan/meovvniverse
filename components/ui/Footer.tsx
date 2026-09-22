"use client";

import React from "react";
import Link from "next/link";
import { GothicFrame, GothicDivider } from "./GothicFrame";
import { TerminalText } from "./TerminalText";
import { MeovvLogo } from "./MeovvLogo";

export function Footer() {
  return (
    <footer className="relative bg-void border-t border-concrete-light/80 pt-16 pb-12 text-fog font-mono text-xs select-none">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(192,192,192,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-concrete-light/60">
          {/* Col 1: Brand & Manifesto */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <MeovvLogo color="#FFFFFF" className="h-6 sm:h-7" />
            </div>
            <p className="text-sm font-sans text-fog max-w-md leading-relaxed">
              An interactive digital archive dedicated to MEOVV (My Eyes Open VVide) under THEBLACKLABEL.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-[0.25em] text-ash uppercase border-b border-concrete-light pb-2">
              NAVIGATION
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#portal" className="hover:text-chrome transition-colors">
                  01. Cinematic Portal
                </Link>
              </li>
              <li>
                <Link href="/#coven" className="hover:text-chrome transition-colors">
                  02. The Coven (Members)
                </Link>
              </li>
              <li>
                <Link href="/#terminal" className="hover:text-chrome transition-colors">
                  03. Social Terminal
                </Link>
              </li>
              <li>
                <Link href="/console" className="hover:text-chrome transition-colors">
                  04. Archaic Media Console
                </Link>
              </li>
              <li>
                <Link href="/archive" className="hover:text-chrome transition-colors">
                  05. Full Media Vault
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Tech & Architecture Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-[0.25em] text-ash uppercase border-b border-concrete-light pb-2">
              SPECIFICATIONS
            </h4>
            <ul className="space-y-1.5 text-[11px] text-fog/80">
              <li>• NEXT.JS 15 APP ROUTER</li>
              <li>• TAILWIND CSS & FRAMER MOTION</li>
              <li>• MONOCHROME SHADER ENGINE</li>
              <li>• HEADLESS CMS: SANITY.IO READY</li>
              <li>• PORTFOLIO CENTERPIECE</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-fog/60">
          <div>
            © {new Date().getFullYear()} MEOVVNIVERSE. Fan-made portfolio project. All trademarks and media belong to THEBLACKLABEL & MEOVV.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-chrome/70">ARCHITECT: ZHAFRAN</span>
            <span>SYSTEM // STABLE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
