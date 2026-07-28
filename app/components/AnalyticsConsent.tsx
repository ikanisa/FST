"use client";

import { useEffect, useState } from "react";

const storageKey = "fst-analytics-consent";
const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";

function loadAnalytics() {
  if (!measurementId || document.querySelector(`script[data-fst-analytics]`)) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.dataset.fstAnalytics = "true";
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { anonymize_ip: true });
}

export function AnalyticsConsent() {
  const [choice, setChoice] = useState<"accepted" | "declined" | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    const frame = window.requestAnimationFrame(() => {
      if (stored === "accepted" || stored === "declined") {
        setChoice(stored);
        if (stored === "accepted") loadAnalytics();
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function choose(value: "accepted" | "declined") {
    window.localStorage.setItem(storageKey, value);
    setChoice(value);
    if (value === "accepted") loadAnalytics();
  }

  if (choice || !measurementId) return null;

  return (
    <aside className="consent-banner" aria-label="Website measurement choice">
      <div>
        <strong>Optional website measurement</strong>
        <p>
          Anonymous analytics help us identify slow or unclear pages. Refusing them does not change site access.
        </p>
      </div>
      <div className="consent-actions">
        <button type="button" className="consent-secondary" onClick={() => choose("declined")}>Continue without</button>
        <button type="button" className="consent-primary" onClick={() => choose("accepted")}>Allow measurement</button>
      </div>
    </aside>
  );
}
