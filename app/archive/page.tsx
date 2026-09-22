import { getFeedItems, getTracks } from "@/lib/sanity/client";
import { GothicDivider } from "@/components/ui/GothicFrame";
import { ArchiveHeader } from "./_partials/ArchiveHeader";
import { DiscographyVault } from "./_partials/DiscographyVault";
import { TransmissionVault } from "./_partials/TransmissionVault";
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
        <ArchiveHeader totalEntries={feedItems.length + tracks.length} />
        <DiscographyVault tracks={tracks} />
        <GothicDivider label="BROADCAST ARCHIVES" />
        <TransmissionVault feedItems={feedItems} />
      </div>
    </div>
  );
}
