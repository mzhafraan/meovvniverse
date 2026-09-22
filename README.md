# ☥ MEOVVNIVERSE — Gothic Tech Fan Hub & Archive

> **Dynamic Fan-Hub & Interactive Archive for MEOVV (THEBLACKLABEL)**  
> Built with Next.js 15 (App Router), TypeScript, Tailwind CSS, Framer Motion, and Headless CMS (Sanity.io).

---

## ✦ 1. Visual Identity & Art Direction

MEOVVNIVERSE mengadopsi estetika **Gothic Tech** — sintesis antara arsitektur katedral gotik monokromatik dan industrial cyberpunk era *Bite Now*.

- **Deep Obsidian (`#08080C`)**: Background void paling pekat.
- **Rough Dark Concrete (`#1A1A1A`)**: Surface panel, container, dan card.
- **Distressed Chrome (`#C0C0C0`)**: Filigree borders, mechanical accents, and ornaments.
- **Monochrome Glitch**: Distorsi horizontal slice hitam-putih dan scanlines analog.
- **Dynamic Grain**: Canvas noise shader berfrekuensi tinggi (60fps).

---

## ✦ 2. Fitur Utama yang Telah Diimplementasikan

### 1. The Cinematic Portal (Hero Section)
- **Full Viewport Close-up**: Potret wajah member beresolusi tinggi dengan bingkai gothic.
- **Cursor Parallax & Glitch**: Interaksi mouse/touch memicu distorsi slice tape corrupt hitam-putih.
- **Scroll Zoom-Out**: Visual perlahan mengecil dan memudar menyatu ke dalam void saat di-scroll.
- **Member Selector**: Quick-switch preview antara Sooin, Gawon, Anna, Narin, dan Ella.

### 2. The Coven (Dynamic Member Wiki)
- **5 Monolithic Pillars**: Komposisi pilar gotik untuk **Sooin, Gawon, Anna, Narin, Ella**.
- **Dynamic Routing**: Setiap pilar mengarah ke `/member/[slug]` yang menyajikan:
  - Telemetry stats matrix: MBTI, Zodiac, Blood Type, Height, Birthdate, Birthplace.
  - Biography naratif & Archival Trivia.
  - Cycle navigation antar member.
- **Dual-Mode Data Architecture**: Terhubung ke Sanity CMS jika API key ada, dan otomatis fallback ke seed archive lokal yang lengkap tanpa perlu setup database terlebih dahulu.

### 3. Social Terminal (Feed Aggregator)
- **Masonry Grid**: Mengagregasi video klip resmi (MEOW, BODY, Ddi Ro Ri), stage cam, dan dispatches.
- **CHURRRR Live Radar**: Kartu jadwal siaran langsung dengan indikator status *LIVE NOW* berkedip merah.
- **Gothic Filigree Frames**: Setiap kartu dibalut SVG corners khas gotik perak.

### 4. Archaic Media Console
- **Industrial Mechanical Deck**: Antarmuka terinspirasi mesin pemutar analog dengan baut industrial.
- **Analog Seek Caliper**: Progress bar mekanis dengan gradasi presisi yang bisa di-klik untuk seek lagu secara real-time.
- **Synchronized Lyric Terminal**: Window terminal auto-scroll yang menyinkronkan lirik baris demi baris mengikuti detik pemutaran audio, lengkap dengan tanda pengenal member yang bernyanyi.
- **Transport Controls**: Play/Pause, Next, Previous, Volume Slider, dan Track Switcher.

---

## ✦ 3. Hal yang Perlu Kamu Siapkan Secara Manual

Aplikasi ini **sudah 100% berfungsi langsung saat kamu jalankan (`npm run dev`)** karena telah dilengkapi data seed lokal berdefinisi tinggi. Jika kamu ingin mengintegrasikan CMS Sanity asli atau live YouTube API untuk portofolio tingkat lanjut, berikut langkah manualnya:

### A. Setup Headless CMS Sanity.io (Opsional tapi Direkomendasikan)
1. Buka [Sanity.io](https://www.sanity.io) dan login/daftar akun gratis.
2. Buat project baru (misal: `meovvniverse`).
3. Salin **Project ID** dari dashboard Sanity.
4. Buat file `.env.local` di root folder proyek ini (atau salin dari `.env.example`):
   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID=id_project_kamu_disini
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
5. Schema siap pakai sudah disediakan di folder `sanity/schemaTypes/`:
   - `member.ts` (Data profil member, foto, bio, trivia)
   - `track.ts` (Data lagu, timestamp lirik, audio file)
   - `liveSchedule.ts` (Jadwal live CHURRRR)

### B. Setup YouTube Data API v3 (Opsional)
Jika ingin feed YouTube diperbarui otomatis dari channel THEBLACKLABEL/MEOVV:
1. Buka [Google Cloud Console](https://console.cloud.google.com).
2. Aktifkan **YouTube Data API v3**.
3. Buat API Key dan tambahkan ke `.env.local`:
   ```bash
   YOUTUBE_API_KEY=kunci_api_kamu
   YOUTUBE_CHANNEL_ID=id_channel_meovv
   ```

---

## ✦ 4. Cara Menjalankan Project

### Menjalankan Server Development:
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000).

### Membangun Versi Produksi:
```bash
npm run build
npm run start
```

---

## ✦ 5. Struktur Project
```
MEOVVNIVERSE/
├── app/
│   ├── layout.tsx              # Root shell, font typography, noise overlay
│   ├── page.tsx                # Halaman utama (Portal, Coven, Terminal, Console)
│   ├── globals.css             # Gothic tokens, scrollbar, glitch keyframes
│   ├── member/[slug]/page.tsx  # Dynamic route profil member
│   ├── archive/page.tsx        # Media archive lengkap
│   ├── console/page.tsx        # Dedicated media console
│   └── api/youtube/route.ts    # Secure YouTube API proxy
├── components/
│   ├── ui/                     # Primitives (GlitchImage, GothicFrame, StaticNoise, TerminalText)
│   ├── sections/               # HeroSection, CovenSection, SocialTerminal, MediaConsole
│   └── member/                 # MemberPillar
├── hooks/
│   ├── useAudioPlayer.ts       # Audio transport, seeking, volume
│   ├── useLyricSync.ts         # Timed lyric auto-sync & active line
│   ├── useGlitch.ts            # Monochrome glitch triggers
│   └── useMouseParallax.ts     # Cursor parallax tracking
├── lib/
│   ├── data/meovvData.ts       # Rich seed data MEOVV (members, tracks, lyrics)
│   └── sanity/client.ts        # Dual-mode data fetching (Sanity + Fallback)
└── sanity/schemaTypes/         # Sanity Studio schemas (member, track, liveSchedule)
```

---
*Created with dedication for MEOVV & high-end fullstack execution.*
