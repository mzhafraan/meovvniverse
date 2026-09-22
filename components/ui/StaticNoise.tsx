"use client";

import { useEffect, useRef } from "react";

export function StaticNoise({ opacity = 0.04 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Small tile dimensions for extreme performance (scaled up via CSS pixelated)
    const w = 180;
    const h = 120;
    canvas.width = w;
    canvas.height = h;

    // Pre-generate 6 noise frames ONCE into memory
    const frames: ImageData[] = [];
    for (let f = 0; f < 6; f++) {
      const imgData = ctx.createImageData(w, h);
      const buf = new Uint32Array(imgData.data.buffer);
      const len = buf.length;
      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.1) {
          const shade = Math.floor(Math.random() * 220 + 35);
          buf[i] = (255 << 24) | (shade << 16) | (shade << 8) | shade;
        } else {
          buf[i] = 0;
        }
      }
      frames.push(imgData);
    }

    let frameIndex = 0;
    let intervalId: number;

    // Cycle through pre-generated noise frames at ~14 FPS (classic analog film noise rate)
    // ZERO memory allocation per frame!
    intervalId = window.setInterval(() => {
      frameIndex = (frameIndex + 1) % frames.length;
      ctx.putImageData(frames[frameIndex], 0, 0);
    }, 70);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden mix-blend-screen select-none"
      style={{ opacity }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{ imageRendering: "pixelated" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(8,8,12,0.6)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02)_50%,transparent_50%)] bg-[length:100%_4px]" />
    </div>
  );
}
