"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FeedItem, LiveScheduleItem } from "@/types";
import { GothicFrame, GothicDivider } from "@/components/ui/GothicFrame";
import { TerminalText } from "@/components/ui/TerminalText";
import { GlitchImage } from "@/components/ui/GlitchImage";
import { Radio, Youtube, ExternalLink, Play, Clock, Sparkles } from "lucide-react";

interface SocialTerminalProps {
  feedItems: FeedItem[];
  liveSchedules: LiveScheduleItem[];
}

export function SocialTerminal({ feedItems, liveSchedules }: SocialTerminalProps) {
  const [filter, setFilter] = useState<"all" | "youtube" | "churrrr" | "dispatch">("all");
  const [activeModalVideo, setActiveModalVideo] = useState<string | null>(null);

  const filteredItems = feedItems.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  return (
    <section id="terminal" className="relative w-full bg-void-light py-24 px-4 sm:px-6 lg:px-8 border-t border-concrete-light">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-chrome/30 bg-concrete-dark text-[10px] font-mono tracking-[0.3em] text-chrome uppercase">
            <span>SECTOR 03 // AGGREGATOR ENGINE</span>
          </div>

          <h2 className="font-gothic text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[0.2em] text-ash uppercase">
            SOCIAL TERMINAL
          </h2>

          <p className="font-sans text-xs sm:text-sm text-fog leading-relaxed">
            Consolidated telemetry intercepted from YouTube transmissions, scheduled CHURRRR broadcasts, and gothic visual dispatches. Encased in distressed chrome filigree.
          </p>

          <GothicDivider label="TRANSMISSION GRID" />
        </div>

        {/* Live CHURRRR Broadcast Radar (Alert Banner) */}
        {liveSchedules.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <Radio className="w-4 h-4 text-red-500 animate-pulse" />
              <h3 className="font-mono text-xs tracking-[0.25em] text-ash uppercase">
                SCHEDULED BROADCAST RADAR (CHURRRR // KST)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {liveSchedules.map((schedule) => (
                <GothicFrame
                  key={schedule.id}
                  highlight={schedule.isLive}
                  className="p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-concrete border border-concrete-light text-chrome tracking-wider uppercase">
                      {schedule.platform}
                    </span>
                    {schedule.isLive ? (
                      <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-red-400 bg-red-950/60 border border-red-800/80 px-2 py-0.5 animate-pulse">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                        LIVE NOW
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-fog flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        UPCOMING
                      </span>
                    )}
                  </div>

                  <h4 className="font-sans text-sm font-semibold text-ash mb-2 line-clamp-2">
                    {schedule.title}
                  </h4>

                  <p className="text-xs text-fog font-sans mb-3 line-clamp-2">
                    {schedule.tagline}
                  </p>

                  <div className="pt-2 border-t border-concrete-light/50 flex items-center justify-between text-[10px] font-mono text-fog">
                    <span>{schedule.scheduledAt}</span>
                    <a
                      href={schedule.streamUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-chrome hover:text-white flex items-center gap-1 font-bold underline"
                    >
                      CONNECT <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </GothicFrame>
              ))}
            </div>
          </div>
        )}

        {/* Filter Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-concrete-light pb-4">
          <div className="flex items-center gap-2">
            {(["all", "youtube", "churrrr", "dispatch"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 text-[11px] font-mono tracking-widest uppercase transition-all duration-300 border ${
                  filter === tab
                    ? "bg-ash text-void border-white font-bold"
                    : "bg-concrete-dark text-fog border-concrete-light hover:border-chrome/50 hover:text-ash"
                }`}
              >
                {tab === "all" ? "ALL TRANSMISSIONS" : tab}
              </button>
            ))}
          </div>

          <div className="text-[11px] font-mono text-fog/70">
            SHOWING {filteredItems.length} INTERCEPTED FEEDS
          </div>
        </div>

        {/* Masonry / Responsive Feed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <GothicFrame
              key={item.id}
              highlight={item.highlight}
              className="flex flex-col h-full overflow-hidden"
            >
              {/* Media Thumbnail */}
              <div className="relative w-full h-48 bg-void overflow-hidden">
                <GlitchImage
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="w-full h-full"
                />

                {item.type === "youtube" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all pointer-events-none">
                    <div className="w-11 h-11 rounded-full bg-void/80 border border-chrome/60 flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Badge */}
                {item.badge && (
                  <div className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-void/90 border border-chrome/40 text-[9px] font-mono text-chrome tracking-widest uppercase">
                    {item.badge}
                  </div>
                )}

                {item.views && (
                  <div className="absolute bottom-2 right-2 z-10 px-2 py-0.5 bg-void/90 border border-concrete-light text-[9px] font-mono text-fog tracking-wider">
                    {item.views}
                  </div>
                )}
              </div>

              {/* Feed Meta & Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-fog mb-1">
                    <span>{item.source}</span>
                    <span>{item.date}</span>
                  </div>
                  <h4 className="font-sans text-sm font-semibold text-ash group-hover:text-white transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                </div>

                <div className="pt-2 border-t border-concrete-light/40 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-chrome-dim tracking-wider uppercase">
                    PROTOCOL: {item.type}
                  </span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-chrome hover:text-white flex items-center gap-1 font-bold group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>TRANSMIT</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </GothicFrame>
          ))}
        </div>
      </div>
    </section>
  );
}
