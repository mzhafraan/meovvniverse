import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ArchiveHeaderProps {
  totalEntries: number;
}

export function ArchiveHeader({ totalEntries }: ArchiveHeaderProps) {
  return (
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
          <span className="font-mono text-[11px] text-chrome tracking-[0.25em] uppercase block mb-1">
            OFFICIAL RELEASES & BROADCASTS
          </span>
          <h1 className="font-bathory text-5xl sm:text-7xl font-normal text-white tracking-wide">
            Media Archive
          </h1>
        </div>
        <div className="font-mono text-xs text-fog">
          {totalEntries} ARCHIVED RELEASES
        </div>
      </div>
    </div>
  );
}
