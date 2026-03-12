import { useState, useEffect } from "react";
import { profile } from "../../data/profile";
import FontSwitcher from "./FontSwitcher";

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

      </div>

      <FontSwitcher />

      <div className="ve-hero__right">
        <p
          className={`ve-hero__tagline${
            visible ? " ve-hero__tagline--visible" : ""
          }`}
        >
          I build full-stack products end-to-end.
        </p>
      </div>
    </section>
  );
}
