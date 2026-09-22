"use client";

import { useState, useCallback } from "react";

export interface GlitchState {
  isGlitching: boolean;
  intensity: number;
  sliceOffset: number;
}

export function useGlitch() {
  const [isGlitching, setIsGlitching] = useState(false);
  const [sliceOffset, setSliceOffset] = useState(0);

  const triggerGlitch = useCallback((durationMs = 350) => {
    setIsGlitching(true);
    setSliceOffset(Math.floor(Math.random() * 8) - 4);

    const timer = setTimeout(() => {
      setIsGlitching(false);
      setSliceOffset(0);
    }, durationMs);

    return () => clearTimeout(timer);
  }, []);

  return {
    isGlitching,
    sliceOffset,
    triggerGlitch,
    setIsGlitching,
  };
}
