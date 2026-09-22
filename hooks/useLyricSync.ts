"use client";

import { useMemo } from "react";
import { LyricLine } from "@/types";

export function useLyricSync(lyrics: LyricLine[], currentTime: number) {
  const activeIndex = useMemo(() => {
    if (!lyrics || lyrics.length === 0) return -1;
    let index = 0;
    for (let i = 0; i < lyrics.length; i++) {
      if (currentTime >= lyrics[i].time) {
        index = i;
      } else {
        break;
      }
    }
    return index;
  }, [lyrics, currentTime]);

  const activeLine = lyrics && activeIndex >= 0 ? lyrics[activeIndex] : null;
  const previousLine = lyrics && activeIndex > 0 ? lyrics[activeIndex - 1] : null;
  const nextLine = lyrics && activeIndex < lyrics.length - 1 ? lyrics[activeIndex + 1] : null;

  return {
    activeIndex,
    activeLine,
    previousLine,
    nextLine,
  };
}
