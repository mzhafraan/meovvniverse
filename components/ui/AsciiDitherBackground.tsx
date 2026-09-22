"use client";

import React, { useEffect, useRef, useCallback } from "react";

interface AsciiDitherConfig {
  cellSize: number;
  density: number;
  coverage: number;
  brightness: number;
  contrast: number;
  saturation: number;
  grayscale: number;
  invert: boolean;
  renderMode: string;
  bgMode: string;
  animSpeed: number;
  animStyle: string;
  animIntensity: number;
  chromaticEnabled: boolean;
  chromaticIntensity: number;
  halftoneEnabled: boolean;
  halftoneIntensity: number;
  filmDustEnabled: boolean;
  filmDustIntensity: number;
  tiltBlur: boolean;
  tiltFocus: number;
  tiltPosition: number;
  tiltFeather: number;
  blurAmount: number;
}

interface AsciiDitherBackgroundProps {
  imageSrc: string;
  className?: string;
  config?: Partial<AsciiDitherConfig>;
}

const DEFAULT_CONFIG: AsciiDitherConfig = {
  cellSize: 10,
  density: 0,
  coverage: 100,
  brightness: 0,
  contrast: 128,
  saturation: 0,
  grayscale: 100,
  invert: false,
  renderMode: "dither",
  bgMode: "solid",
  animSpeed: 100,
  animStyle: "shimmer",
  animIntensity: 60,
  chromaticEnabled: true,
  chromaticIntensity: 20,
  halftoneEnabled: true,
  halftoneIntensity: 20,
  filmDustEnabled: true,
  filmDustIntensity: 20,
  tiltBlur: true,
  tiltFocus: 35,
  tiltPosition: 50,
  tiltFeather: 15,
  blurAmount: 30,
};

// Bayer 4×4 ordered dither matrix
const BAYER_4X4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

interface CachedCell {
  x: number;
  y: number;
  col: number;
  row: number;
  r: number;
  g: number;
  b: number;
  luminance: number;
}

export function AsciiDitherBackground({
  imageSrc,
  className = "",
  config: userConfig,
}: AsciiDitherBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  // Cached grid data (calculated ONCE on load/resize, NOT every frame)
  const cachedCellsRef = useRef<CachedCell[]>([]);
  const gridDimsRef = useRef<{ cols: number; rows: number }>({ cols: 0, rows: 0 });

  // Reusable offscreen canvas for resizing
  const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const dustParticlesRef = useRef<
    Array<{ x: number; y: number; size: number; opacity: number; vx: number; vy: number; life: number }>
  >([]);

  const config = { ...DEFAULT_CONFIG, ...userConfig };

  // Initialize film dust particles once
  const initDust = useCallback(
    (w: number, h: number) => {
      const count = Math.floor((config.filmDustIntensity / 100) * 35) + 10;
      dustParticlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 2.2 + 0.6,
        opacity: Math.random() * 0.45 + 0.1,
        vx: (Math.random() - 0.5) * 0.25,
        vy: Math.random() * 0.2 + 0.05,
        life: Math.random() * 600 + 200,
      }));
    },
    [config.filmDustIntensity]
  );

  // Pre-process and sample image into grid cells (runs ONLY on resize/image load)
  const computeGrid = useCallback(
    (w: number, h: number) => {
      const img = imgRef.current;
      if (!img || img.naturalWidth === 0 || w === 0 || h === 0) return;

      const { cellSize, brightness, contrast, grayscale, invert } = config;
      const cols = Math.ceil(w / cellSize);
      const rows = Math.ceil(h / cellSize);
      gridDimsRef.current = { cols, rows };

      // Reuse single offscreen canvas
      if (!offscreenCanvasRef.current) {
        offscreenCanvasRef.current = document.createElement("canvas");
      }
      const offscreen = offscreenCanvasRef.current;
      offscreen.width = cols;
      offscreen.height = rows;

      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      // Smart focal aspect cover: Keep members' faces and silhouettes visible
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;
      const imgAspect = imgW / imgH;
      const canvasAspect = w / h;

      let sx = 0;
      let sy = 0;
      let sw = imgW;
      let sh = imgH;

      if (imgAspect > canvasAspect) {
        sw = imgH * canvasAspect;
        sx = (imgW - sw) * 0.5;
        sy = 0;
        sh = imgH;
      } else {
        sh = imgW / canvasAspect;
        sx = 0;
        sw = imgW;
        sy = Math.max(0, (imgH - sh) * 0.15); // Biased to heads/faces
      }

      // Draw directly downscaled to cols x rows (Hardware GPU downscale)
      offCtx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
      const imgData = offCtx.getImageData(0, 0, cols, rows);
      const pixels = imgData.data;

      const bAdj = brightness * 2.55;
      const cFactor = (259 * (contrast + 255)) / (255 * (259 - contrast));
      const tGray = grayscale / 100;

      const cells: CachedCell[] = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const idx = (row * cols + col) * 4;
          let r = pixels[idx];
          let g = pixels[idx + 1];
          let b = pixels[idx + 2];

          // Brightness
          r = Math.max(0, Math.min(255, r + bAdj));
          g = Math.max(0, Math.min(255, g + bAdj));
          b = Math.max(0, Math.min(255, b + bAdj));

          // Contrast
          r = Math.max(0, Math.min(255, cFactor * (r - 128) + 128));
          g = Math.max(0, Math.min(255, cFactor * (g - 128) + 128));
          b = Math.max(0, Math.min(255, cFactor * (b - 128) + 128));

          // Grayscale
          if (grayscale > 0) {
            const gray = 0.299 * r + 0.587 * g + 0.114 * b;
            r = r * (1 - tGray) + gray * tGray;
            g = g * (1 - tGray) + gray * tGray;
            b = b * (1 - tGray) + gray * tGray;
          }

          if (invert) {
            r = 255 - r;
            g = 255 - g;
            b = 255 - b;
          }

          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          cells.push({
            x: col * cellSize + cellSize / 2,
            y: row * cellSize + cellSize / 2,
            col,
            row,
            r,
            g,
            b,
            luminance,
          });
        }
      }

      cachedCellsRef.current = cells;
    },
    [config]
  );

  // Fast animation render loop (ZERO allocation, pure arithmetic rendering)
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) return;

    const cells = cachedCellsRef.current;
    if (cells.length === 0) {
      animFrameRef.current = requestAnimationFrame(render);
      return;
    }

    const {
      cellSize,
      density,
      animSpeed,
      animStyle,
      animIntensity,
      chromaticEnabled,
      chromaticIntensity,
      halftoneEnabled,
      halftoneIntensity,
      filmDustEnabled,
      filmDustIntensity,
      tiltBlur,
      tiltFocus,
      tiltPosition,
      tiltFeather,
    } = config;

    const time = timeRef.current;
    const speedFactor = (animSpeed / 100) * 0.05;
    const intensFactor = animIntensity / 100;
    const densityMod = 1.0 + (1.0 - density / 100) * 0.8;
    const focusBand = tiltPosition / 100;
    const focusHalf = tiltFocus / 100 / 2;
    const feather = tiltFeather / 100;
    const chromOffset = chromaticEnabled ? (chromaticIntensity / 100) * cellSize * 0.6 : 0;

    // Clear with background void
    ctx.fillStyle = "#08080C";
    ctx.fillRect(0, 0, w, h);

    // Draw pre-cached dither cells
    const len = cells.length;
    for (let i = 0; i < len; i++) {
      const cell = cells[i];
      const { col, row, x, y, r, g, b, luminance } = cell;

      // Tilt-shift focus cull
      if (tiltBlur) {
        const normalizedY = y / h;
        const dist = Math.abs(normalizedY - focusBand);
        if (dist > focusHalf + feather) {
          if ((col + row) % 3 !== 0) continue;
        } else if (dist > focusHalf) {
          if ((col + row) % 2 !== 0) continue;
        }
      }

      // Animation wave
      let animMod = 1.0;
      if (animStyle === "shimmer") {
        animMod = 1.0 + Math.sin(time * speedFactor * 2.0 + (col + row) * 0.35) * 0.22 * intensFactor;
      } else if (animStyle === "pulse") {
        animMod = 1.0 + Math.sin(time * speedFactor + col * 0.15 + row * 0.15) * 0.3 * intensFactor;
      } else if (animStyle === "wave") {
        animMod = 1.0 + Math.sin(time * speedFactor + col * 0.25) * 0.3 * intensFactor;
      }

      const modLum = Math.max(0, Math.min(1, luminance * animMod));
      const bayerVal = BAYER_4X4[row % 4][col % 4] / 16;

      if (modLum > bayerVal * densityMod) {
        const alpha = Math.min(1, modLum * 1.35 + 0.15);
        const size = cellSize * (0.35 + modLum * 0.65);

        const colorR = Math.round(Math.max(0, Math.min(255, r * animMod)));
        const colorG = Math.round(Math.max(0, Math.min(255, g * animMod)));
        const colorB = Math.round(Math.max(0, Math.min(255, b * animMod)));

        // Chromatic split
        if (chromaticEnabled && chromOffset > 0) {
          ctx.fillStyle = `rgba(${Math.min(255, colorR + 35)}, 0, 0, ${alpha * 0.3})`;
          ctx.fillRect(x - size / 2 - chromOffset, y - size / 2, size, size);
          ctx.fillStyle = `rgba(0, 0, ${Math.min(255, colorB + 35)}, ${alpha * 0.3})`;
          ctx.fillRect(x - size / 2 + chromOffset, y - size / 2, size, size);
        }

        ctx.fillStyle = `rgba(${colorR}, ${colorG}, ${colorB}, ${alpha})`;
        ctx.fillRect(x - size / 2, y - size / 2, size, size);
      }
    }

    // Halftone overlay
    if (halftoneEnabled && halftoneIntensity > 0) {
      const htStep = 12;
      ctx.fillStyle = `rgba(255, 255, 255, ${(halftoneIntensity / 100) * 0.08})`;
      for (let hy = 0; hy < h; hy += htStep) {
        for (let hx = 0; hx < w; hx += htStep) {
          const xOffset = (hy / htStep) % 2 === 0 ? 0 : htStep / 2;
          ctx.beginPath();
          ctx.arc(hx + xOffset, hy, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // Film dust
    if (filmDustEnabled && filmDustIntensity > 0) {
      const dust = dustParticlesRef.current;
      for (let i = 0; i < dust.length; i++) {
        const p = dust[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        if (p.life <= 0 || p.y > h + 10 || p.x < -10 || p.x > w + 10) {
          dust[i] = {
            x: Math.random() * w,
            y: -5,
            size: Math.random() * 2.2 + 0.6,
            opacity: Math.random() * 0.45 + 0.1,
            vx: (Math.random() - 0.5) * 0.25,
            vy: Math.random() * 0.2 + 0.05,
            life: Math.random() * 600 + 200,
          };
          continue;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * (filmDustIntensity / 100)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Soft radial edge vignette
    const grad = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.7);
    grad.addColorStop(0, "rgba(8, 8, 12, 0)");
    grad.addColorStop(1, "rgba(8, 8, 12, 0.65)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    timeRef.current += 1;
    animFrameRef.current = requestAnimationFrame(render);
  }, [config]);

  // Load image and manage window resizing
  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    img.onload = () => {
      imgRef.current = img;

      const updateDimensions = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const newW = Math.round(rect.width) || window.innerWidth;
        const newH = Math.round(rect.height) || window.innerHeight;

        if (canvas.width !== newW || canvas.height !== newH) {
          canvas.width = newW;
          canvas.height = newH;
          initDust(newW, newH);
          computeGrid(newW, newH);
        }
      };

      updateDimensions();

      const resizeObserver = new ResizeObserver(() => {
        updateDimensions();
      });

      if (canvasRef.current) {
        resizeObserver.observe(canvasRef.current);
      }

      window.addEventListener("resize", updateDimensions);

      timeRef.current = 0;
      animFrameRef.current = requestAnimationFrame(render);

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener("resize", updateDimensions);
      };
    };

    return () => cancelAnimationFrame(animFrameRef.current);
  }, [imageSrc, render, initDust, computeGrid]);

  useEffect(() => {
    cancelAnimationFrame(animFrameRef.current);
    if (imgRef.current && canvasRef.current) {
      computeGrid(canvasRef.current.width, canvasRef.current.height);
      animFrameRef.current = requestAnimationFrame(render);
    }
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [render, computeGrid]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  );
}
