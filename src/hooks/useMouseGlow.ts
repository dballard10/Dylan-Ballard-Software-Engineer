import { useEffect } from "react";

export function useMouseGlow() {
  useEffect(() => {
    const isTouchOnly = window.matchMedia("(hover: none)").matches;
    if (isTouchOnly) return;

    let rafId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--glow-x", `${e.clientX}px`);
        document.documentElement.style.setProperty("--glow-y", `${e.clientY}px`);
        rafId = 0;
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);
}
