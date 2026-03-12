import { useState } from "react";

const FONTS = [
  { name: "Syne", stack: '"Syne", sans-serif' },
  { name: "Helvetica", stack: '"Helvetica Neue", "Helvetica", sans-serif' },
  { name: "Futura", stack: '"Futura", "Futura-Medium", sans-serif' },
  { name: "Proxima Nova", stack: '"Proxima Nova", "proxima-nova", sans-serif' },
  { name: "Caslon", stack: '"Libre Caslon Display", "Big Caslon", "Caslon", serif' },
  { name: "Didot", stack: '"Didot", "GFS Didot", serif' },
];

export default function FontSwitcher() {
  const [index, setIndex] = useState(0);

  const apply = (i: number) => {
    setIndex(i);
    document.documentElement.style.setProperty(
      "--hero-name-font",
      FONTS[i].stack
    );
  };

  const prev = () => apply((index - 1 + FONTS.length) % FONTS.length);
  const next = () => apply((index + 1) % FONTS.length);

  return (
    <div className="font-switcher">
      <button className="font-switcher__btn" onClick={prev} aria-label="Previous font">
        &larr;
      </button>
      <span className="font-switcher__label">{FONTS[index].name}</span>
      <button className="font-switcher__btn" onClick={next} aria-label="Next font">
        &rarr;
      </button>
    </div>
  );
}
