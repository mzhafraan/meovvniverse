import { getMembers, getTracks, getLiveSchedules, getFeedItems } from "@/lib/sanity/client";
import { IntroLogoSection } from "@/components/sections/IntroLogoSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { LedMarqueeDivider } from "@/components/ui/LedMarqueeDivider";
import { CovenSection } from "@/components/sections/CovenSection";
import { SocialTerminal } from "@/components/sections/SocialTerminal";
import { AudioVaultSection } from "@/components/sections/AudioVaultSection";

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
      {/* 00: Scroll-Driven Logo Tracer & Awakening Intro */}
      <IntroLogoSection />

      {/* 01: The Cinematic Portal (Featuring Large Member Portrait & Geist Pixel Typography) */}
      <HeroSection />

      {/* LED Marquee Divider: Cybernetic Running Ticker with Glitch Effects */}
      <LedMarqueeDivider />

      {/* 02: The Coven (Dynamic Member Wiki) */}
      <CovenSection members={members} />

      {/* 03: Social Terminal (Feed Aggregator) */}
      <SocialTerminal feedItems={feedItems} liveSchedules={liveSchedules} />

      {/* 04: Audio Vault — Interactive Vinyl Player Widget */}
      <AudioVaultSection />
    </div>
  );
}

