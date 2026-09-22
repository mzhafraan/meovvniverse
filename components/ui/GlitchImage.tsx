"use client";

import React, { useState } from "react";
import Image from "next/image";

interface GlitchImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  interactive?: boolean;
}

export function GlitchImage({
  src,
  alt,
  className = "",
  priority = false,
  fill = false,
  width,
  height,
  interactive = true,
}: GlitchImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden group select-none ${className}`}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      onTouchStart={() => interactive && setIsHovered((prev) => !prev)}
    >
      {/* Base Image (Monochrome & Gothic Contrast) */}
      <div
        className={`w-full h-full transition-all duration-700 filter grayscale contrast-125 brightness-90 group-hover:brightness-105 ${
          isHovered ? "scale-105" : "scale-100"
        }`}
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={priority}
            className="object-cover transition-transform duration-700"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width || 600}
            height={height || 800}
            priority={priority}
            className="w-full h-full object-cover transition-transform duration-700"
          />
        )}
      </div>

      {/* Glitch Slice 1 - Horizontal displacement */}
      {isHovered && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none mix-blend-difference filter contrast-200 invert opacity-70 animate-glitch"
          style={{
            clipPath: "polygon(0 15%, 100% 15%, 100% 30%, 0 30%)",
            transform: "translateX(-4px)",
          }}
        >
          {fill ? (
            <Image src={src} alt={alt} fill className="object-cover" />
          ) : (
            <Image
              src={src}
              alt={alt}
              width={width || 600}
              height={height || 800}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      )}

      {/* Glitch Slice 2 - Inverse displacement */}
      {isHovered && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none mix-blend-screen filter contrast-200 brightness-150 opacity-60"
          style={{
            clipPath: "polygon(0 65%, 100% 65%, 100% 82%, 0 82%)",
            transform: "translateX(5px)",
          }}
        >
          {fill ? (
            <Image src={src} alt={alt} fill className="object-cover" />
          ) : (
            <Image
              src={src}
              alt={alt}
              width={width || 600}
              height={height || 800}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      )}

      {/* Static Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,18,22,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] opacity-40 group-hover:opacity-60 transition-opacity" />

      {/* Vignette border */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_40px_rgba(8,8,12,0.85)]" />
    </div>
  );
}
