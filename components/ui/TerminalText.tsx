"use client";

import React, { useState, useEffect } from "react";

interface TerminalTextProps {
  text: string;
  speed?: number;
  prefix?: string;
  className?: string;
  showCursor?: boolean;
}

export function TerminalText({
  text,
  speed = 25,
  prefix = "> ",
  className = "",
  showCursor = true,
}: TerminalTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    setIsDone(false);

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        setIsDone(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={`font-mono text-chrome tracking-wide ${className}`}>
      {prefix && <span className="text-chrome/50 select-none">{prefix}</span>}
      {displayedText}
      {showCursor && (
        <span
          className={`inline-block w-2 h-4 ml-1 bg-chrome/80 align-middle ${
            isDone ? "animate-pulse" : "animate-flicker"
          }`}
          aria-hidden="true"
        />
      )}
    </span>
  );
}
