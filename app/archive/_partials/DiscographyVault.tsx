import Link from "next/link";
import { Disc3 } from "lucide-react";
import { Track } from "@/types";
import { GothicFrame } from "@/components/ui/GothicFrame";
import { GlitchImage } from "@/components/ui/GlitchImage";

interface DiscographyVaultProps {
  tracks: Track[];
}

export function DiscographyVault({ tracks }: DiscographyVaultProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-concrete-light pb-2">
        <h2 className="font-mono text-sm tracking-[0.25em] text-ash uppercase flex items-center gap-2">
          <Disc3 className="w-4 h-4 text-chrome animate-spin" style={{ animationDuration: "12s" }} />
          DISCOGRAPHY & RELEASES
        </h2>
        <Link href="/console" className="text-xs font-mono text-chrome hover:text-white underline">
          OPEN AUDIO PLAYER →
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
  );
}
