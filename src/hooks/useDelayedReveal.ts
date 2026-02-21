import { useState, useEffect } from "react";

/**
 * Returns false initially, true after delayMs OR when user scrolls
 * past scrollThreshold (percentage of viewport height). Whichever comes first.
 */
export function useDelayedReveal(
  delayMs: number,
  scrollThreshold = 80
): boolean {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) return;

    const timer = setTimeout(() => setRevealed(true), delayMs);

    const handleScroll = () => {
      const threshold = (window.innerHeight * scrollThreshold) / 100;
      if (window.scrollY > threshold) {
        setRevealed(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [revealed, delayMs, scrollThreshold]);

  return revealed;
}
