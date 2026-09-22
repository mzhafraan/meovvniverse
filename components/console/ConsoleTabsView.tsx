"use client";

import React, { useState } from "react";
import { Track } from "@/types";
import { MediaConsole } from "@/components/sections/MediaConsole";
import { MusicPlayer } from "@/components/ui/music-player-widget";
import { Disc3, Sliders, Sparkles } from "lucide-react";

interface ConsoleTabsViewProps {
  tracks: Track[];
}

export function ConsoleTabsView({ tracks }: ConsoleTabsViewProps) {
  const [activeTab, setActiveTab] = useState<"archaic" | "vinyl">("vinyl");

  return (
    <div className="w-full space-y-6">
      {/* Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 border border-concrete-light bg-concrete-dark/60 p-2 backdrop-blur-md">
        <div className="flex items-center gap-2 px-2">
          <span className="w-2 h-2 rounded-full bg-volt animate-ping" />
          <span className="font-pixel text-xs tracking-widest text-chrome uppercase">
            PLAYBACK INTERFACE MODE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("vinyl")}
            className={`flex items-center gap-2 px-4 py-2 font-pixel text-xs tracking-wider uppercase transition-all cursor-pointer ${
              activeTab === "vinyl"
                ? "bg-volt text-void font-bold shadow-[0_0_15px_rgba(204,255,0,0.5)]"
                : "bg-void/70 text-fog hover:text-white border border-concrete-light"
            }`}
          >
            <Disc3 className={`w-3.5 h-3.5 ${activeTab === "vinyl" ? "animate-spin" : ""}`} />
            <span>VINYL WIDGET (BITE NOW EP)</span>
            <span className="text-[9px] bg-void/30 text-current px-1.5 py-0.5 rounded font-mono">NEW</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("archaic")}
            className={`flex items-center gap-2 px-4 py-2 font-pixel text-xs tracking-wider uppercase transition-all cursor-pointer ${
              activeTab === "archaic"
                ? "bg-volt text-void font-bold shadow-[0_0_15px_rgba(204,255,0,0.5)]"
                : "bg-void/70 text-fog hover:text-white border border-concrete-light"
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>ARCHAIC CONSOLE</span>
          </button>
        </div>
      </div>

      {/* Interface Rendering */}
      {activeTab === "vinyl" ? (
        <div className="flex flex-col items-center justify-center py-6">
          <div className="w-full max-w-[420px]">
            <MusicPlayer />
          </div>
        </div>
      ) : (
        <MediaConsole tracks={tracks} />
      )}
    </div>
  );
}
