"use client";

import { useEffect, useState } from "react";
import { ResponsiveImage } from "./ResponsiveImage";

const slides = [
  {
    src: "/fst-management.webp",
    alt: "A standing team mapping operational risks and controls on a glass wall",
    eyebrow: "Work the problem",
    title: "Move from diagnosis to accountable action.",
  },
  {
    src: "/fst-operations.webp",
    alt: "A business owner and adviser reviewing operations on a production floor",
    eyebrow: "Stay close to operations",
    title: "Make the numbers useful where work happens.",
  },
  {
    src: "/fst-consultation.webp",
    alt: "A senior adviser listening during a private working conversation",
    eyebrow: "Own the next move",
    title: "Leave every session with decisions and owners.",
  },
] as const;

export function EditorialSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    const frame = window.requestAnimationFrame(updatePreference);
    preference.addEventListener("change", updatePreference);
    return () => {
      window.cancelAnimationFrame(frame);
      preference.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setInterval(() => setCurrent((value) => (value + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  const selectPrevious = () => setCurrent((value) => (value - 1 + slides.length) % slides.length);
  const selectNext = () => setCurrent((value) => (value + 1) % slides.length);

  return (
    <section className="editorial-slider section-shell" aria-labelledby="slider-title" aria-roledescription="carousel">
      <div className="slider-heading">
        <div>
          <p className="section-index">How FST works</p>
          <h2 id="slider-title">Advice that stays connected to delivery.</h2>
        </div>
        <div className="slider-controls" aria-label="Story controls">
          <button type="button" onClick={selectPrevious} aria-label="Back — show the previous story">Back</button>
          {!reducedMotion && (
            <button type="button" onClick={() => setPaused((value) => !value)} aria-pressed={paused}>
              {paused ? "Resume" : "Pause"}
            </button>
          )}
          <button type="button" onClick={selectNext} aria-label="Forward — show the next story">Forward</button>
        </div>
      </div>
      <div className="slider-viewport">
        <div className="slider-track" style={{ transform: `translate3d(-${current * 100}%, 0, 0)` }}>
          {slides.map((slide, index) => (
            <figure className="slider-slide" key={slide.src} aria-hidden={current !== index}>
              <ResponsiveImage
                src={slide.src}
                alt={slide.alt}
                sizes="(max-width: 720px) 100vw, 80vw"
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                <span>{slide.eyebrow}</span>
                <strong>{slide.title}</strong>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <p className="slider-position">{String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</p>
    </section>
  );
}
