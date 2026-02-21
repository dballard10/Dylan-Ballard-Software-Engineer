import { useEffect } from "react";

export function useMouseGlow() {
  useEffect(() => {
    // Disable on touch-only devices
    const isTouchOnly = window.matchMedia("(hover: none)").matches;
    if (isTouchOnly) return;

    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--glow-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--glow-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
}
