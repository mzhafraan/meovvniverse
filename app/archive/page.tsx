import { getFeedItems, getTracks } from "@/lib/sanity/client";
import { GothicFrame, GothicDivider } from "@/components/ui/GothicFrame";
import { GlitchImage } from "@/components/ui/GlitchImage";
import { ExternalLink, Play, Disc3, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Vault & Archive | MEOVVNIVERSE",
  description: "Comprehensive visual and acoustic vault for MEOVV discography, music videos, and official dispatches.",
};

export default async function ArchivePage() {
  const [feedItems, tracks] = await Promise.all([
    getFeedItems(),
    getTracks(),
  ]);

  return (
    <div className="min-h-screen bg-void pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Bar */}
        <div className="border-b border-concrete-light pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-chrome hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO PORTAL</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] text-chrome tracking-[0.3em] uppercase block mb-1">
                SECTOR 05 // COMPREHENSIVE VAULT
              </span>
              <h1 className="font-gothic text-4xl sm:text-6xl font-black text-white tracking-[0.15em] uppercase">
                MEDIA ARCHIVE
              </h1>
            </div>
            <div className="font-mono text-xs text-fog">
              TOTAL RECORD INDEX: {feedItems.length + tracks.length} ENTRIES
            </div>
          </div>
        </div>

        {/* Discography Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-concrete-light pb-2">
            <h2 className="font-mono text-sm tracking-[0.25em] text-ash uppercase flex items-center gap-2">
              <Disc3 className="w-4 h-4 text-chrome animate-spin" style={{ animationDuration: "12s" }} />
              AUDIO DISCOGRAPHY CODEX
            </h2>
            <Link href="/console" className="text-xs font-mono text-chrome hover:text-white underline">
              OPEN CONSOLE →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((track) => (
              <GothicFrame key={track.id} className="p-4 flex flex-col justify-between">
                <div className="relative aspect-square w-full bg-void mb-4 overflow-hidden">
                  <GlitchImage
                    src={track.coverArt}
                    alt={track.title}
                    fill
                    className="w-full h-full"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-void/90 border border-concrete-light text-[9px] font-mono text-chrome">
                    {track.releaseDate}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-gothic text-2xl font-bold text-ash tracking-wide">
                    {track.title}
                  </h3>
                  <p className="text-xs font-mono text-fog uppercase">{track.album}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-concrete-light/60 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-chrome-dim">
                    {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, "0")} MIN
                  </span>
                  <Link
                    href="/console"
                    className="text-xs font-mono font-bold text-chrome hover:text-white flex items-center gap-1"
                  >
                    PLAY IN CONSOLE ▶
                  </Link>
                </div>
              </GothicFrame>
            ))}
          </div>
        </div>

        <GothicDivider label="BROADCAST ARTIFACTS" />

        {/* Visual Transmissions Grid */}
        <div className="space-y-6">
          <h2 className="font-mono text-sm tracking-[0.25em] text-ash uppercase border-b border-concrete-light pb-2">
            TRANSMISSION VAULT
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedItems.map((item) => (
              <GothicFrame key={item.id} className="flex flex-col h-full">
                <div className="relative w-full h-48 bg-void">
                  <GlitchImage
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="w-full h-full"
                  />
                  {item.badge && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-void/90 border border-chrome/40 text-[9px] font-mono text-chrome">
                      {item.badge}
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex justify-between text-[10px] font-mono text-fog mb-1">
                      <span>{item.source}</span>
                      <span>{item.date}</span>
                    </div>
                    <h3 className="font-sans text-sm font-semibold text-ash line-clamp-2">
                      {item.title}
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-concrete-light/40 flex justify-between items-center text-xs font-mono">
                    <span className="text-[10px] text-fog uppercase">{item.type}</span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-chrome hover:text-white flex items-center gap-1 font-bold"
                    >
                      OPEN LINK <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </GothicFrame>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
