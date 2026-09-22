"use client";

import { useEffect, useRef } from "react";

export function StaticNoise({ opacity = 0.05 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = Math.min(window.innerWidth / 2, 480);
      canvas.height = Math.min(window.innerHeight / 2, 360);
    };

    resize();
    window.addEventListener("resize", resize);

    const renderNoise = () => {
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;

      const imgData = ctx.createImageData(w, h);
      const buffer = new Uint32Array(imgData.data.buffer);
      const len = buffer.length;

      for (let i = 0; i < len; i++) {
        // High-contrast monochrome noise (black & white grain)
        if (Math.random() < 0.12) {
          const shade = Math.floor(Math.random() * 255);
          buffer[i] = (255 << 24) | (shade << 16) | (shade << 8) | shade;
        } else {
          buffer[i] = 0;
        }
      }

      ctx.putImageData(imgData, 0, 0);
      animationFrameId = requestAnimationFrame(renderNoise);
    };

    renderNoise();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
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
