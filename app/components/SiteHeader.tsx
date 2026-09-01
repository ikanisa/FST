"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { PrimaryCta } from "./PrimaryCta";
import { marketPath, type JurisdictionCode } from "../../lib/jurisdictions";

export function SiteHeader({ jurisdiction }: { jurisdiction?: JurisdictionCode } = {}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollSentinelRef = useRef<HTMLSpanElement>(null);
  const closeMenu = () => setMenuOpen(false);
  const path = (value: string) => jurisdiction ? marketPath(jurisdiction, value) : value;

  useEffect(() => {
    const sentinel = scrollSentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <Fragment>
      <span ref={scrollSentinelRef} className="header-scroll-sentinel" aria-hidden="true" />
      <header className={scrolled ? "site-header is-scrolled" : "site-header"} aria-label="Website navigation">
        <Link className="brand-logo brand-logo-header" href={jurisdiction ? marketPath(jurisdiction) : "/"} onClick={closeMenu} aria-label="Go to the FST homepage">
          <BrandLogo priority />
        </Link>
        <nav id="primary-navigation" className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Main links">
          <Link href={path("/services")} onClick={closeMenu}>Services</Link>
          <Link href={path("/services/catalogue")} onClick={closeMenu}>Services &amp; Fees</Link>
          <Link href={path("/who-we-work-with")} onClick={closeMenu}>Who We Help</Link>
          <Link href={path("/about")} onClick={closeMenu}>How We Work</Link>
          {!jurisdiction && <Link href="/insights" onClick={closeMenu}>Insights</Link>}
          {jurisdiction !== "rw" && <Link href={path("/ai-agent-team")} onClick={closeMenu}>AI Delivery Team</Link>}
          <PrimaryCta jurisdiction={jurisdiction} className="nav-cta" onClick={closeMenu} />
        </nav>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Hide" : "Menu"}
        </button>
      </header>
      {menuOpen && <button className="nav-backdrop" type="button" aria-label="Dismiss menu" onClick={closeMenu} />}
    </Fragment>
  );
}
