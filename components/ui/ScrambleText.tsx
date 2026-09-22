"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleChars?: string;
  speed?: number;
  trigger?: "hover" | "always" | "none";
  as?: "span" | "div" | "h1" | "h2" | "h3" | "p";
}

const DEFAULT_CHARS = "!<>-_\\/[]{}—=+*^?#________01";

export function ScrambleText({
  text,
  className = "",
  scrambleChars = DEFAULT_CHARS,
  speed = 30,
  trigger = "hover",
  as: Component = "span",
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);

  // Keep displayText in sync if text prop updates
  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  const scramble = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    let iteration = 0;
    const maxIterations = text.length;

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join("")
      );

      iteration += 1 / 2;

      if (iteration >= maxIterations) {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
        }
        setDisplayText(text);
        isAnimatingRef.current = false;
      }
    }, speed);
  }, [text, scrambleChars, speed]);

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      scramble();
    }
  };

  useEffect(() => {
    if (trigger === "always") {
      scramble();
    }
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [trigger, scramble]);

  return (
    <Component
      onMouseEnter={handleMouseEnter}
      className={`inline-block font-mono select-none ${className}`}
      aria-label={text}
    >
      <span aria-hidden="true">{displayText}</span>
    </Component>
  );
}
