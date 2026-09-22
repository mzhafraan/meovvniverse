import { getTracks } from "@/lib/sanity/client";
import { ConsoleTabsView } from "@/components/console/ConsoleTabsView";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Console & Vinyl Player | MEOVVNIVERSE",
  description: "Mechanical audio player and interactive spinning vinyl player widget with synchronized lyrics for MEOVV.",
};

export default async function ConsoleDedicatedPage() {
  const tracks = await getTracks();

  return (
    <div className="min-h-screen bg-void pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <div className="border-b border-concrete-light pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-chrome hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO PORTAL</span>
          </Link>
        </div>

        {/* Embedded Console Component with Vinyl Widget Switcher */}
        <ConsoleTabsView tracks={tracks} />
      </div>
    </div>
  );
}
