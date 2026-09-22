import { createClient } from "@sanity/client";
import { MEMBERS, TRACKS, LIVE_SCHEDULE, FEED_ITEMS } from "@/lib/data/meovvData";
import { Member, Track, LiveScheduleItem, FeedItem } from "@/types";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-03-01";

export const isSanityConfigured = Boolean(projectId && projectId !== "placeholder");

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === "production",
    })
  : null;

// Dual-mode data access layer (Sanity CMS with robust seed data fallback)
export async function getMembers(): Promise<Member[]> {
  if (sanityClient) {
    try {
      const query = `*[_type == "member"] | order(_createdAt asc) {
        "id": _id,
        name,
        koreanName,
        "slug": slug.current,
        positions,
        birthDate,
        birthplace,
        zodiac,
        mbti,
        height,
        bloodType,
        "profileImage": profilePhoto.asset->url,
        "pillarImage": pillarPhoto.asset->url,
        "heroImage": heroPhoto.asset->url,
        quote,
        bio,
        trivia,
        colorToken,
        stats,
        socialLinks
      }`;
      const data = await sanityClient.fetch(query);
      if (data && data.length > 0) return data;
    } catch (err) {
      console.warn("Sanity fetch failed, falling back to local archive data", err);
    }
  }
  return MEMBERS;
}

export async function getMemberBySlug(slug: string): Promise<Member | null> {
  const allMembers = await getMembers();
  return allMembers.find((m) => m.slug.toLowerCase() === slug.toLowerCase()) || null;
}

export async function getTracks(): Promise<Track[]> {
  if (sanityClient) {
    try {
      const query = `*[_type == "track"] | order(releaseDate desc) {
        "id": _id,
        title,
        album,
        releaseDate,
        duration,
        "audioUrl": audioFile.asset->url,
        "coverArt": coverArt.asset->url,
        youtubeId,
        lyrics
      }`;
      const data = await sanityClient.fetch(query);
      if (data && data.length > 0) return data;
    } catch (err) {
      console.warn("Sanity track fetch fallback", err);
    }
  }
  return TRACKS;
}

export async function getLiveSchedules(): Promise<LiveScheduleItem[]> {
  if (sanityClient) {
    try {
      const query = `*[_type == "liveSchedule"] | order(scheduledAt asc) {
        "id": _id,
        title,
        platform,
        scheduledAt,
        isLive,
        memberNames,
        streamUrl,
        "thumbnail": bannerImage.asset->url,
        tagline
      }`;
      const data = await sanityClient.fetch(query);
      if (data && data.length > 0) return data;
    } catch (err) {
      console.warn("Sanity live schedule fallback", err);
    }
  }
  return LIVE_SCHEDULE;
}

export async function getFeedItems(): Promise<FeedItem[]> {
  return FEED_ITEMS;
}
