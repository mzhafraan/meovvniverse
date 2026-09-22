import { getMembers, getTracks, getLiveSchedules, getFeedItems } from "@/lib/sanity/client";
import { HeroSection } from "@/components/sections/HeroSection";
import { CovenSection } from "@/components/sections/CovenSection";
import { SocialTerminal } from "@/components/sections/SocialTerminal";
import { MediaConsole } from "@/components/sections/MediaConsole";

export const revalidate = 3600; // ISR 1 hour

export default async function HomePage() {
  const [members, tracks, liveSchedules, feedItems] = await Promise.all([
    getMembers(),
    getTracks(),
    getLiveSchedules(),
    getFeedItems(),
  ]);

  return (
    <div className="flex flex-col w-full">
      {/* 01: The Cinematic Portal */}
      <HeroSection />

      {/* 02: The Coven (Dynamic Member Wiki) */}
      <CovenSection members={members} />

      {/* 03: Social Terminal (Feed Aggregator) */}
      <SocialTerminal feedItems={feedItems} liveSchedules={liveSchedules} />

      {/* 04: Archaic Media Console */}
      <MediaConsole tracks={tracks} />
    </div>
  );
}
