import { useState, useEffect } from "react";
import { profile } from "../../data/profile";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animations after mount
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const firstName = profile.name.split(" ")[0];
  const lastName = profile.name.split(" ").slice(1).join(" ");

  return (
    <section id="hero" className="ve-hero">
      <div className="ve-hero__left">
        <span
          className={`ve-hero__name-line${
            visible ? " ve-hero__name-line--visible" : ""
          }`}
        >
          {firstName}
        </span>
        <span
          className={`ve-hero__name-line${
            visible ? " ve-hero__name-line--visible" : ""
          }`}
        >
          {lastName}
        </span>

        <div
          className={`ve-hero__accent-line${
            visible ? " ve-hero__accent-line--visible" : ""
          }`}
          aria-hidden="true"
        />

        <p
          className={`ve-hero__title${
            visible ? " ve-hero__title--visible" : ""
          }`}
        >
          {profile.title}
        </p>

        <div
          className={`ve-hero__cta-group${
            visible ? " ve-hero__cta-group--visible" : ""
          }`}
        >
          <a href="#contact" className="ve-hero__cta ve-hero__cta--primary">
            Get In Touch
          </a>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ve-hero__cta ve-hero__cta--secondary"
          >
            View Resume
          </a>
        </div>
      </div>

      <div className="ve-hero__right">
        <p
          className={`ve-hero__tagline${
            visible ? " ve-hero__tagline--visible" : ""
          }`}
        >
          I build end-to-end products for the web.
        </p>
      </div>
    </section>
  );
}
