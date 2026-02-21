import { useState, useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

interface UseTextScrambleOptions {
  /** Target text to resolve to */
  text: string;
  /** Delay before starting the scramble (ms) */
  delay?: number;
  /** Duration of the scramble effect (ms) */
  duration?: number;
  /** How fast individual characters cycle (ms) */
  speed?: number;
}

/**
 * Text scramble animation hook. Characters cycle through random glyphs
 * before resolving to the target string one character at a time.
 */
export function useTextScramble({
  text,
  delay = 0,
  duration = 1500,
  speed = 30,
}: UseTextScrambleOptions): string {
  const [display, setDisplay] = useState("");
  const frameRef = useRef<number>(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animFrame: number;

    const timeout = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Number of characters that should be resolved
        const resolvedCount = Math.floor(progress * text.length);

        let result = "";
        for (let i = 0; i < text.length; i++) {
          if (i < resolvedCount) {
            result += text[i];
          } else if (text[i] === " ") {
            result += " ";
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }

        setDisplay(result);
        frameRef.current++;

        if (progress < 1) {
          animFrame = requestAnimationFrame(animate);
        } else {
          setDisplay(text);
        }
      };

      // Start with scrambled text immediately
      const initial = text
        .split("")
        .map((c) => (c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]))
        .join("");
      setDisplay(initial);

      animFrame = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animFrame);
    };
  }, [text, delay, duration, speed]);

  return display;
}
