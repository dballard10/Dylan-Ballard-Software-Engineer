import { useRef, useEffect, useState, type ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function ScrollAnimation({
  children,
  delay = 0,
  className = "",
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`scroll-animate ${visible ? "visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
