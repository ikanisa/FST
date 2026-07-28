"use client";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { PrimaryCta } from "./PrimaryCta";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
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
      <header className={scrolled ? "site-header is-scrolled" : "site-header"} aria-label="Website navigation">
        <Link className="wordmark" href="/" onClick={closeMenu} aria-label="Go to the FST homepage">FST</Link>
        <nav id="primary-navigation" className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Main links">
          <Link href="/services" onClick={closeMenu}>Services</Link>
          <Link href="/who-we-work-with" onClick={closeMenu}>Organisations</Link>
          <Link href="/about" onClick={closeMenu}>Approach & Field Notes</Link>
          <PrimaryCta className="nav-cta" onClick={closeMenu} />
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
