import { ExternalLink } from "lucide-react";
import { FeedItem } from "@/types";
import { GothicFrame } from "@/components/ui/GothicFrame";
import { GlitchImage } from "@/components/ui/GlitchImage";

interface TransmissionVaultProps {
  feedItems: FeedItem[];
}

export function TransmissionVault({ feedItems }: TransmissionVaultProps) {
  return (
    <div className="space-y-6">
      <h2 className="font-mono text-sm tracking-[0.25em] text-ash uppercase border-b border-concrete-light pb-2">
        MEDIA & BROADCASTS
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
  );
}
