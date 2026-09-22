import { NextResponse } from "next/server";
import { FEED_ITEMS } from "@/lib/data/meovvData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const maxResults = searchParams.get("maxResults") || "10";

  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  // Fallback gracefully if API key is not configured in environment
  if (!apiKey || !channelId) {
    const youtubeFeeds = FEED_ITEMS.filter((i) => i.type === "youtube");
    return NextResponse.json({
      source: "cached_vault",
      items: youtubeFeeds,
    });
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&order=date&maxResults=${maxResults}&key=${apiKey}`,
      { next: { revalidate: 1800 } } // 30-minute ISR cache
    );

    if (!res.ok) {
      throw new Error(`YouTube API returned HTTP ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json({
      source: "live_youtube_api",
      items: data.items,
    });
  } catch (error) {
    console.error("YouTube API Proxy Error:", error);
    return NextResponse.json({
      source: "error_fallback_vault",
      items: FEED_ITEMS.filter((i) => i.type === "youtube"),
    });
  }
}
