import { useMouseGlow } from "../hooks/useMouseGlow";

export default function MouseGlow() {
  useMouseGlow();

  return (
    <div
      className="mouse-glow"
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1,
        background: `radial-gradient(
          var(--glow-radius) circle at var(--glow-x, 50%) var(--glow-y, 50%),
          rgba(var(--glow-color), var(--glow-opacity)),
          transparent 70%
        )`,
        transition: "background 0.15s ease",
      }}
    />
  );
}
