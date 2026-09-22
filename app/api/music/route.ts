import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const LOCAL_MUSIC_DIR = "C:\\Users\\Chevalier Lab\\Music\\MEOVV\\BITE NOW";
const DOCUMENTS_MUSIC_DIR = "D:\\Documents\\BITE NOW";
const PUBLIC_MUSIC_DIR = path.join(process.cwd(), "public", "music", "bite-now");

const TRACK_PATTERNS: Record<string, string[]> = {
  "ddi-ro-ri": ["DDI RO RI", "ddi-ro-ri"],
  "hit-em": ["Hit 'Em", "hit-em"],
  "in-my-hands": ["In my hands", "in-my-hands"],
  "favorite-song": ["Favorite song", "favorite-song"],
  "revenge": ["Revenge", "revenge"],
};

const AUDIO_EXTENSIONS = [".mp3", ".flac", ".m4a", ".wav", ".aac", ".ogg"];

const FALLBACK_URL =
  "https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=cyberpunk-2099-122971.mp3";

function findAudioFile(trackId: string): string | null {
  const patterns = TRACK_PATTERNS[trackId] || [trackId];
  const searchDirs = [PUBLIC_MUSIC_DIR, DOCUMENTS_MUSIC_DIR, LOCAL_MUSIC_DIR];

  for (const dir of searchDirs) {
    if (!fs.existsSync(dir)) continue;

    try {
      const files = fs.readdirSync(dir);
      for (const pattern of patterns) {
        for (const ext of AUDIO_EXTENSIONS) {
          const match = files.find(
            (f) =>
              f.toLowerCase().includes(pattern.toLowerCase()) &&
              f.toLowerCase().endsWith(ext)
          );
          if (match) {
            return path.join(dir, match);
          }
        }
      }
    } catch {
      // Continue to next directory if readdir fails
    }
  }

  return null;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const trackId = searchParams.get("track") || "ddi-ro-ri";

  const filePath = findAudioFile(trackId);

  // If local audio file is found in "C:\Users\Chevalier Lab\Music\MEOVV\BITE NOW" or public, stream it!
  if (filePath && fs.existsSync(filePath)) {
    try {
      const stat = fs.statSync(filePath);
      const fileSize = stat.size;
      const range = request.headers.get("range");

      const ext = path.extname(filePath).toLowerCase();
      const contentType =
        ext === ".flac"
          ? "audio/flac"
          : ext === ".wav"
          ? "audio/wav"
          : ext === ".m4a"
          ? "audio/mp4"
          : "audio/mpeg";

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = end - start + 1;

        const fileStream = fs.createReadStream(filePath, { start, end });

        // Convert Node stream to web ReadableStream
        const stream = new ReadableStream({
          start(controller) {
            fileStream.on("data", (chunk) => controller.enqueue(chunk));
            fileStream.on("end", () => controller.close());
            fileStream.on("error", (err) => controller.error(err));
          },
        });

        return new Response(stream, {
          status: 206,
          headers: {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize.toString(),
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=3600",
          },
        });
      } else {
        const fileStream = fs.createReadStream(filePath);
        const stream = new ReadableStream({
          start(controller) {
            fileStream.on("data", (chunk) => controller.enqueue(chunk));
            fileStream.on("end", () => controller.close());
            fileStream.on("error", (err) => controller.error(err));
          },
        });

        return new Response(stream, {
          headers: {
            "Content-Length": fileSize.toString(),
            "Content-Type": contentType,
            "Accept-Ranges": "bytes",
            "Cache-Control": "public, max-age=3600",
          },
        });
      }
    } catch (err) {
      console.error("Error streaming local audio:", err);
    }
  }

  // Fallback to high-energy electronic backing stream so playback and lyric sync work smoothly
  return NextResponse.redirect(FALLBACK_URL);
}
