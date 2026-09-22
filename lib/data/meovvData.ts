import { Member, Track, LiveScheduleItem, FeedItem } from "@/types";
import biteNowTracksData from "./biteNowTracks.json";

export const MEMBERS: Member[] = [
  {
    id: "sooin",
    name: "SOOIN",
    koreanName: "김수인 (Kim Sooin)",
    slug: "sooin",
    positions: ["Vocalist", "Dancer"],
    birthDate: "April 12, 2005",
    birthplace: "Daegu, South Korea",
    zodiac: "Aries",
    mbti: "ENFP",
    height: "170 cm",
    bloodType: "B",
    profileImage: "/members/SOOIN.jpg",
    pillarImage: "/members/SOOIN.jpg",
    heroImage: "/members/SOOIN.jpg",
    quote: "A quiet storm piercing the void with razor-sharp gaze.",
    bio: [
      "Sooin was officially revealed by THEBLACKLABEL for MEOVV on August 25, 2024. Renowned for her striking feline gaze and commanding stage authority, she anchors the vocal and choreographic dynamics of the group.",
      "Her vocal timbre carries an airy yet resonant weight that forms the emotional backbone of MEOVV's darker discography. In the 'Bite Now' sonic universe, Sooin represents the predatory grace at the heart of the Gothic Tech visual narrative."
    ],
    trivia: [
      "Known among fans as 'The Black Leopard' due to her swift, agile dance lines.",
      "Trained rigorously in hip-hop and contemporary choreo before joining THEBLACKLABEL.",
      "Her personal emblem is the dual-blade claw carved in oxidized titanium.",
      "Enjoys ambient darkwave and experimental film scoring in her downtime."
    ],
    colorToken: "#C0C0C0",
    stats: [
      { label: "VOCAL RESONANCE", value: "96 / 100" },
      { label: "STAGE AGILITY", value: "98 / 100" },
      { label: "CHROME AFFINITY", value: "ALPHA" },
      { label: "GOTHIC CODEX", value: "SECTOR 01" }
    ],
    socialLinks: {
      instagram: "https://instagram.com/meovv_official",
      twitter: "https://twitter.com/OFFICIAL_MEOVV"
    }
  },
  {
    id: "gawon",
    name: "GAWON",
    koreanName: "이가원 (Lee Gawon / Chloe Lee)",
    slug: "gawon",
    positions: ["Vocalist", "Rapper"],
    birthDate: "April 27, 2005",
    birthplace: "Seoul, South Korea",
    zodiac: "Taurus",
    mbti: "INTJ",
    height: "175 cm",
    bloodType: "A",
    profileImage: "/members/GAWON.jpg",
    pillarImage: "/members/GAWON.jpg",
    heroImage: "/members/GAWON.jpg",
    quote: "Architectural poise sculpted in cold monolithic marble.",
    bio: [
      "Gawon was the second member unveiled for MEOVV on August 23, 2024. Having spent years as a coveted model and high-caliber trainee, her imposing silhouette and dual vocal/rap proficiency make her an undeniable presence.",
      "Standing at 175 cm, her statuesque poise translates into monolithic authority on stage. Her vocal delivery transitions seamlessly between sultry neo-soul lower registers and rapid-fire cadence."
    ],
    trivia: [
      "Lived in both the United States and Korea, making her fluent in English and Korean.",
      "Has appeared in prominent global fashion campaigns prior to debut.",
      "Her personal insignia is the monolithic obelisk etched with cybernetic runes.",
      "Prefers brutalist architecture, monochrome fashion, and black espresso."
    ],
    colorToken: "#8A8A8E",
    stats: [
      { label: "CADENCE CONTROL", value: "95 / 100" },
      { label: "SILHOUETTE MASS", value: "99 / 100" },
      { label: "CHROME AFFINITY", value: "SIGMA" },
      { label: "GOTHIC CODEX", value: "SECTOR 02" }
    ],
    socialLinks: {
      instagram: "https://instagram.com/meovv_official"
    }
  },
  {
    id: "anna",
    name: "ANNA",
    koreanName: "타나카 안나 (Tanaka Anna)",
    slug: "anna",
    positions: ["Main Dancer", "Vocalist"],
    birthDate: "November 17, 2005",
    birthplace: "Toyama Prefecture, Japan",
    zodiac: "Scorpio",
    mbti: "ISTP",
    height: "164 cm",
    bloodType: "O",
    profileImage: "/members/ANNA.jpg",
    pillarImage: "/members/ANNA.jpg",
    heroImage: "/members/ANNA.jpg",
    quote: "Mechanical precision disguised behind an enigmatic porcelain gaze.",
    bio: [
      "Anna was revealed on August 27, 2024 as the fourth member of MEOVV. A former exclusive model for Seventeen Japan, Anna embodies the delicate collision of high-fashion minimalism and raw mechanical intensity.",
      "As MEOVV's core kinetic powerhouse, her dance movements exhibit surgical isolation and gravity-defying control. Her expression remains eerily calm amidst high-bpm industrial beats."
    ],
    trivia: [
      "Former child model and actress with extensive runway experience in Tokyo.",
      "Known for her deep obsidian eyes that match the MEOVVNIVERSE color palette exactly.",
      "Her weapon aesthetic in the lore is the filament wire woven from liquid chrome.",
      "Collector of vintage film cameras and mechanical wristwatches."
    ],
    colorToken: "#F0F0F0",
    stats: [
      { label: "KINETIC ISOLATION", value: "99 / 100" },
      { label: "PORCELAIN POISE", value: "97 / 100" },
      { label: "CHROME AFFINITY", value: "THETA" },
      { label: "GOTHIC CODEX", value: "SECTOR 03" }
    ],
    socialLinks: {
      instagram: "https://instagram.com/meovv_official"
    }
  },
  {
    id: "narin",
    name: "NARIN",
    koreanName: "나린 (Na Rin)",
    slug: "narin",
    positions: ["Main Rapper", "Vocalist"],
    birthDate: "August 15, 2007",
    birthplace: "Gangnam, Seoul, South Korea",
    zodiac: "Leo",
    mbti: "ENFJ",
    height: "169 cm",
    bloodType: "B",
    profileImage: "/members/NARIN.jpg",
    pillarImage: "/members/NARIN.jpg",
    heroImage: "/members/NARIN.jpg",
    quote: "Spitting venom wrapped in velvet dissonance.",
    bio: [
      "Narin was the fifth member revealed on August 29, 2024. As MEOVV's verbal vanguard, her delivery is electric, punchy, and soaked in raw attitude.",
      "Her vocal verses in 'MEOW' and 'BODY' cut through heavy bass synths like a scalpel. Despite her fierce sonic persona, she brings magnetic warmth and spontaneous charisma off-stage."
    ],
    trivia: [
      "Fluent in Korean, Japanese, and conversational English.",
      "Penned her own rap bars during pre-debut evaluation sessions at THEBLACKLABEL.",
      "Her gothic totem is the iron hound adorned with rusted spiked filigree.",
      "Passionate about cyberpunk graphic novels and analog sound synthesis."
    ],
    colorToken: "#3A2E2E",
    stats: [
      { label: "VERBAL VELOCITY", value: "98 / 100" },
      { label: "RHYTHMIC DENSITY", value: "94 / 100" },
      { label: "CHROME AFFINITY", value: "OMEGA" },
      { label: "GOTHIC CODEX", value: "SECTOR 04" }
    ],
    socialLinks: {
      instagram: "https://instagram.com/meovv_official"
    }
  },
  {
    id: "ella",
    name: "ELLA",
    koreanName: "엘라 그로스 (Ella McKenzie Gross)",
    slug: "ella",
    positions: ["Vocalist", "Rapper", "Maknae"],
    birthDate: "December 1, 2008",
    birthplace: "Los Angeles, California, USA",
    zodiac: "Sagittarius",
    mbti: "INFP",
    height: "168 cm",
    bloodType: "O",
    profileImage: "/members/ELLA.jpg",
    pillarImage: "/members/ELLA.jpg",
    heroImage: "/members/ELLA.jpg",
    quote: "The prodigy harbinger who bridged Los Angeles neon and Gothic Seoul.",
    bio: [
      "Ella was the sensational first member revealed for MEOVV on August 21, 2024. A global icon from childhood with millions of worldwide admirers, Ella's transition to a high-octane idol marks the dawn of a new generation.",
      "Her voice possesses a magnetic, husky texture that grounds MEOVV's sonic identity. Balancing the group's youngest age with veteran camera intuition, she commands every lens she encounters."
    ],
    trivia: [
      "Signed with THEBLACKLABEL in 2018 when she was just 10 years old.",
      "Accomplished guitarist and songwriter with an ear for acoustic grunge and alt-pop.",
      "Her symbolic relic is the shattered glass cat skull coated in black mercury.",
      "Known for her expressive, hypnotic eye contact that anchors the 'Cinematic Portal'."
    ],
    colorToken: "#C0C0C0",
    stats: [
      { label: "AURA RADIATION", value: "100 / 100" },
      { label: "ACOUSTIC INTUITION", value: "93 / 100" },
      { label: "CHROME AFFINITY", value: "PRIME" },
      { label: "GOTHIC CODEX", value: "SECTOR 05" }
    ],
    socialLinks: {
      instagram: "https://instagram.com/ellagross"
    }
  }
];

const BITE_NOW_EP_TRACKS: Track[] = (biteNowTracksData as any[]).map((t) => ({
  id: t.id,
  title: t.title,
  album: t.album,
  releaseDate: t.releaseDate,
  duration: t.duration,
  audioUrl: `/music/bite-now/${t.id}.mp3`,
  fallbackAudioUrl: t.fallbackAudioUrl,
  coverArt: t.coverArt,
  youtubeId: t.youtubeId,
  lyrics: t.lyrics,
}));

// Official BITE NOW EP track order with DDI RO RI title track
const orderedBiteNowTracks: Track[] = [
  BITE_NOW_EP_TRACKS.find((t) => t.id === "ddi-ro-ri") || BITE_NOW_EP_TRACKS[0],
  BITE_NOW_EP_TRACKS.find((t) => t.id === "hit-em") || BITE_NOW_EP_TRACKS[1],
  BITE_NOW_EP_TRACKS.find((t) => t.id === "in-my-hands") || BITE_NOW_EP_TRACKS[2],
  BITE_NOW_EP_TRACKS.find((t) => t.id === "favorite-song") || BITE_NOW_EP_TRACKS[3],
  BITE_NOW_EP_TRACKS.find((t) => t.id === "revenge") || BITE_NOW_EP_TRACKS[4],
].filter(Boolean);

export const TRACKS: Track[] = [
  ...orderedBiteNowTracks,
  {
    id: "meow",
    title: "MEOW",
    album: "MEOW - Debut Single",
    releaseDate: "2024-09-06",
    duration: 187,
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=dark-cyberpunk-112194.mp3",
    coverArt: "/members/ELLA.jpg",
    youtubeId: "v_V-lU3i9k0",
    lyrics: [
      { time: 0, text: "[SYSTEM INITIALIZE :: MEOVV PROTOCOL v1.0]" },
      { time: 4, text: "Yeah, whispers in the dark, they start to grow", speaker: "ELLA" },
      { time: 9, text: "Watch the shadows creeping down below", speaker: "GAWON" },
      { time: 14, text: "눈이 마주쳤을 때 넌 얼어붙어", speaker: "SOOIN", romanization: "Nuni majuchyeosseul ttae neon eoreobuteo", translation: "When our eyes meet, you freeze in place" },
      { time: 19, text: "Chills run down your spine, don't say a word", speaker: "ANNA" },
      { time: 24, text: "Listen to the pulse, the static line", speaker: "NARIN" },
      { time: 29, text: "You can try to run, but you run out of time", speaker: "ELLA" },
      { time: 34, text: "M-E-O-V-V, now step into the light", speaker: "ALL" },
      { time: 39, text: "We tear through the obsidian night", speaker: "GAWON" },
      { time: 45, text: "MEOW — razor claws in the chrome", speaker: "SOOIN" },
      { time: 51, text: "Leaving scars where the wild ones roam", speaker: "NARIN" },
      { time: 57, text: "Heavy bass vibrating through the stone", speaker: "ANNA" },
      { time: 64, text: "Welcome to the coven, claim your throne", speaker: "ELLA" },
      { time: 72, text: "[MECHANICAL GLITCH :: FREQUENCY OSCILLATION]" },
      { time: 80, text: "Deep beneath the concrete, pulse is high", speaker: "GAWON" },
      { time: 86, text: "Not a single star up in the sky", speaker: "SOOIN" },
      { time: 92, text: "Only silver reflections in our eyes", speaker: "ANNA" },
      { time: 98, text: "Unforgiven, untamed, we never compromise", speaker: "NARIN" },
      { time: 106, text: "M-E-O-V-V, hear the metal grind", speaker: "ALL" },
      { time: 115, text: "Leave your broken illusions far behind", speaker: "ELLA" },
      { time: 125, text: "[OUTRO :: OBSIDIAN SIGNAL FADING]" }
    ]
  },
  {
    id: "toxic",
    title: "TOXIC",
    album: "TOXIC / BODY",
    releaseDate: "2024-11-18",
    duration: 172,
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73561.mp3?filename=industrial-cinematic-10777.mp3",
    coverArt: "/members/SOOIN.jpg",
    youtubeId: "3e_x-xY6L8g",
    lyrics: [
      { time: 0, text: "[TRANSMISSION DETECTED :: SYNAPSE DECAY]" },
      { time: 5, text: "Poison dripping slow like liquid chrome", speaker: "GAWON" },
      { time: 11, text: "You made this dark abyss your home", speaker: "SOOIN" },
      { time: 18, text: "Breathless in the haze, we lose control", speaker: "ELLA" },
      { time: 25, text: "It's toxic, but it feeds the soul", speaker: "ANNA" },
      { time: 32, text: "Shattered glass against the rusted wall", speaker: "NARIN" },
      { time: 40, text: "Watch the velvet empire rise and fall", speaker: "ALL" },
      { time: 52, text: "Danger tastes so sweet when you are near", speaker: "SOOIN" },
      { time: 60, text: "Corroded signals, loud and clear", speaker: "GAWON" },
      { time: 70, text: "[TRANSMISSION TERMINATED]" }
    ]
  }
];

export const LIVE_SCHEDULE: LiveScheduleItem[] = [
  {
    id: "live-1",
    title: "CHURRRR NIGHT VOID :: Midnight Transmission",
    platform: "CHURRRR",
    scheduledAt: "Tonight @ 23:00 KST / 21:00 WIB",
    isLive: true,
    memberNames: ["Sooin", "Ella"],
    streamUrl: "https://churrrr.com/meovv",
    tagline: "Live deep dive into the 'Bite Now' archive with unreleased rehearsal tapes."
  },
  {
    id: "live-2",
    title: "ARCHAIC COVEN LOUNGE :: Acoustic & Lore Session",
    platform: "CHURRRR",
    scheduledAt: "Sunday @ 20:00 KST / 18:00 WIB",
    isLive: false,
    memberNames: ["Gawon", "Anna", "Narin"],
    streamUrl: "https://churrrr.com/meovv",
    tagline: "Breakdown of the kinetic choreo and gothic stage costumes."
  },
  {
    id: "live-3",
    title: "THEBLACKLABEL SPECIAL BROADCAST",
    platform: "YouTube Live",
    scheduledAt: "Next Friday @ 19:00 KST / 17:00 WIB",
    isLive: false,
    memberNames: ["All Members"],
    streamUrl: "https://youtube.com/@THEBLACKLABEL",
    tagline: "Global fan symposium and 2026 World Tour announcement."
  }
];

export const FEED_ITEMS: FeedItem[] = [
  {
    id: "feed-yt-1",
    type: "youtube",
    title: "MEOVV (미야오) - 'MEOW' Official Music Video",
    date: "Sep 6, 2024",
    source: "THEBLACKLABEL YouTube",
    url: "https://www.youtube.com/watch?v=v_V-lU3i9k0",
    thumbnail: "/members/ELLA.jpg",
    views: "34M+ Views",
    badge: "DEBUT ANCHOR",
    highlight: true
  },
  {
    id: "feed-churrrr-1",
    type: "churrrr",
    title: "CHURRRR STREAM LOG #089: SOOIN & ELLA IN THE LAB",
    date: "September 2026",
    source: "CHURRRR Official App",
    url: "https://churrrr.com",
    thumbnail: "/members/SOOIN.jpg",
    badge: "LIVE LOG",
    highlight: false
  },
  {
    id: "feed-yt-2",
    type: "youtube",
    title: "MEOVV - 'BODY' Performance Video (Choreography Ver.)",
    date: "Nov 2024",
    source: "MEOVV Official Channel",
    url: "https://www.youtube.com",
    thumbnail: "/members/ANNA.jpg",
    views: "18M+ Views",
    badge: "DANCE CODEX"
  },
  {
    id: "feed-photo-1",
    type: "photo",
    title: "'BITE NOW' VISUAL ARCHIVE: GAWON & ANNA METALLIC EDIT",
    date: "June 2026",
    source: "Gothic Tech Archive",
    url: "/archive",
    thumbnail: "/members/GAWON.jpg",
    badge: "EXHIBIT 07"
  },
  {
    id: "feed-dispatch-1",
    type: "dispatch",
    title: "TRANSMISSION: THEBLACKLABEL CONFIRMS GOTHIC WORLD ARCHIVE EXPANSION",
    date: "August 2026",
    source: "Industrial Wire",
    url: "/archive",
    thumbnail: "/members/NARIN.jpg",
    badge: "ANNOUNCEMENT"
  },
  {
    id: "feed-yt-3",
    type: "youtube",
    title: "MEOVV 'Ddi Ro Ri' Stage Cam at GOTHIC SOUND STAGE",
    date: "July 2026",
    source: "MEOVV Archive",
    url: "https://www.youtube.com",
    thumbnail: "/members/SOOIN.jpg",
    views: "9.2M+ Views",
    badge: "LIVE STAGE"
  }
];
