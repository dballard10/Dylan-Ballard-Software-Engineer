import { useRef, useEffect } from "react";

interface ScrollParallaxResult {
  ref: React.RefObject<HTMLDivElement | null>;
}

/**
 * Applies a scroll-linked parallax transform directly to the referenced element.
 * Uses direct DOM manipulation (no React re-renders) with RAF batching.
 * @param speed - Parallax speed multiplier (default 0.3). Positive = moves slower than scroll.
 */
export function useScrollParallax(speed = 0.3): ScrollParallaxResult {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let rafId = 0;

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress =
          1 - (rect.top + rect.height) / (windowHeight + rect.height);
        const parallaxOffset = (progress - 0.5) * rect.height * speed;
        el.style.transform = `translateY(${parallaxOffset}px)`;
        rafId = 0;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return { ref };
}
