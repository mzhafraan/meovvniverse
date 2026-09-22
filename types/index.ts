export interface Member {
  id: string;
  name: string;
  koreanName: string;
  slug: string;
  positions: string[];
  birthDate: string;
  birthplace: string;
  zodiac: string;
  mbti: string;
  height: string;
  bloodType?: string;
  profileImage: string;
  pillarImage: string;
  heroImage: string;
  quote: string;
  bio: string[];
  trivia: string[];
  colorToken: string;
  stats: {
    label: string;
    value: string;
  }[];
  socialLinks?: {
    instagram?: string;
    twitter?: string;
  };
}

export interface LyricLine {
  time: number; // in seconds
  text: string;
  romanization?: string;
  translation?: string;
  speaker?: string;
}

export interface Track {
  id: string;
  title: string;
  album: string;
  releaseDate: string;
  duration: number; // in seconds
  audioUrl: string;
  fallbackAudioUrl?: string;
  coverArt: string;
  youtubeId?: string;
  lyrics: LyricLine[];
}

export interface LiveScheduleItem {
  id: string;
  title: string;
  platform: "CHURRRR" | "YouTube Live" | "Instagram Live" | "Special";
  scheduledAt: string;
  isLive: boolean;
  memberNames: string[];
  streamUrl: string;
  thumbnail?: string;
  tagline: string;
}

export interface FeedItem {
  id: string;
  type: "youtube" | "churrrr" | "photo" | "dispatch";
  title: string;
  date: string;
  source: string;
  url: string;
  thumbnail: string;
  views?: string;
  badge?: string;
  highlight?: boolean;
}
