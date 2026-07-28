# FST design QA

final result: passed

Date: 28 July 2026
State tested: production build, default homepage, mobile menu open/closed, all public routes
Source visual truth: `qa/fst/home-desktop-1440x900.jpg`
Implementation screenshot: `qa/fst-original/home-desktop-viewport-1440x900.png`
Viewports: 1440 × 900 desktop and 390 × 844 mobile
Image pixel dimensions: desktop evidence 1440 × 900; mobile evidence 390 × 844

## Visual comparison

The accepted FST layout baseline and the current implementation were inspected
together at 1440 × 900. Intentional changes are limited to the new FST wording,
labels and original photography.

1. Header frame: the inset white rounded navigation bar retains the same width,
   height, radius, shadow and outer margin.
2. Navigation rhythm: the wordmark, four text destinations and right-aligned
   primary button remain aligned on the same horizontal system.
3. Hero structure: the editorial copy column, angled image entrance and
   bottom-aligned promise card retain their original proportions.
4. Typography: large serif display text, compact tracked eyebrow and restrained
   sans-serif body hierarchy remain consistent with the accepted layout.
5. CTA treatment: the coral gradient, button dimensions, shadow and placement
   remain faithful while the label changes to `Arrange a Call`.
6. Section transition: the first content panel still overlaps the hero at the
   same visual depth, preserving the established page rhythm.
7. Image direction: the former seated boardroom photograph is replaced by an
   original standing planning workshop with Malta limestone, navy/cobalt and
   terracotta cues.

## Responsive and interaction evidence

- `qa/fst-original/home-mobile-390x844.png`
- `qa/fst-original/home-mobile-menu-390x844.png`
- `qa/fst-original/services-desktop-1440x900.png`
- `qa/fst-original/services-mobile-390x844.png`
- `qa/fst-original/funding-desktop-1440x900.png`
- `qa/fst-original/funding-mobile-390x844.png`

The mobile menu opens, exposes all five destinations, changes to a close state,
and returns to the closed state. The Services link was activated from the open
menu and navigated to `/services`. The booking path, direct phone path and
WhatsApp path remain present. No final external form or application submission
was made during QA.

## Findings and iteration history

- P0: none.
- P1: none.
- P2, resolved: the first full-page browser capture repeated the fixed viewport.
  A bounded 1440 × 900 implementation screenshot replaced it as the fidelity
  comparison artifact.
- P2, resolved: the first desktop readiness probe caught the transient loading
  screen and unloaded lazy images. The check was repeated against the visible
  homepage heading and evaluates only completed image failures.
- P2, resolved: the first mobile Services locator matched header and footer
  links. The interaction was scoped to the site-header navigation and passed.

## Technical QA

- Fifteen retained routes passed at both viewports.
- Every route had a rendered `main` and page-specific `h1`.
- Horizontal overflow: 0 px on all 30 route/viewport checks.
- Completed broken images: 0 on all 30 route/viewport checks.
- Browser console warnings/errors after the navigation test: 0.
- New public asset fingerprints do not match any KMFINCO public asset fingerprint.
- Lint, production build and 9 automated route/integration tests pass.
- Cloudflare Wrangler dry-run packages 89 static assets and a 656.05 KiB Worker
  module set without publishing.
