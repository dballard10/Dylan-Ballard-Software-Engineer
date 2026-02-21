import { useRef, useState, useEffect } from "react";

interface ScrollParallaxResult {
  ref: React.RefObject<HTMLDivElement | null>;
  offset: number;
}

/**
 * Returns a ref and a scroll-linked offset value for parallax effects.
 * The offset is based on how far the element has scrolled relative to the viewport.
 * @param speed - Parallax speed multiplier (default 0.3). Positive = moves slower than scroll.
 */
export function useScrollParallax(speed = 0.3): ScrollParallaxResult {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far through the viewport the element is
      // 0 = element just entering bottom, 1 = element just leaving top
      const progress = 1 - (rect.top + rect.height) / (windowHeight + rect.height);
      const parallaxOffset = (progress - 0.5) * rect.height * speed;

      setOffset(parallaxOffset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return { ref, offset };
}
