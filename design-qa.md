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
   remain faithful; the annotated label is `Book a Meeting`.
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
menu and navigated to `/services`. The booking path and WhatsApp path remain
present. No final external form or submission was made during QA.

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
- Lint, production build and 14 automated route/integration tests pass.
- Cloudflare Wrangler dry-run packages 89 static assets and a 656.05 KiB Worker
  module set without publishing.

## Annotation pass — homepage CTA and eyebrow

- Comment 1: all primary CTA instances now retain the requested `Book a Meeting`
  label while continuing to route to `/book`.
- Comment 2: the homepage `Advisory · Finance · Applications` eyebrow is removed
  from the DOM, leaving the hero to begin directly with its main heading.
- Focused implementation evidence:
  `qa/fst-original/annotation-cta-eyebrow-833x674.png` at the exact annotated
  833 × 674 viewport.
- Automated rendered-HTML coverage protects both requirements.

## Annotation pass — capability heading and promise card

- Comment 3: the capability heading was simplified while the clearly named
  service categories remain listed below it.
- Comment 4: the inherited promise-card surface is replaced by an
  FST-specific cobalt-to-navy gradient with a restrained terracotta highlight.
- Comment 5: the repeated `Service line` labels are removed from all six
  homepage service cards; each icon now leads directly into the service name.
- Focused implementation evidence:
  `qa/fst-original/annotation-disciplines-card-833x674.png` at the exact
  annotated 833 × 674 viewport.
- Automated rendered-HTML coverage protects the revised heading and removed
  repeated label.

## Annotation pass — inherited palette and contact number

- Comment 6: all inherited dark-green tokens, hard-coded colour values,
  semantic class names and live component treatments are removed from the
  website source. Cobalt, navy, sky and terracotta now carry those roles.
- Comment 7: the displayed WhatsApp number and deep link now use
  `+35699152999`.
- Focused implementation evidence:
  `qa/fst-original/annotation-no-green-833x674.png` at the exact annotated
  833 × 674 viewport.
- Automated source and rendered-HTML checks protect both requirements.

## Annotation pass — descriptive labels

- Comment 8: numeric copywriting frames are removed from public headings,
  eyebrows, summaries and image descriptions. Labels now describe the subject
  directly, while operational durations, legal dates and service facts remain
  explicit where users need them.
- Automated rendered-HTML checks protect the revised public labels.

## Annotation pass — direct service language

- Comment 9: the abstract term formerly used for service areas is removed from
  public copy and replaced with direct wording such as `service`, `specialist
  support` and `expertise`.
- Automated rendered-HTML checks protect the revised homepage heading.

## Annotation pass — clearer funding terminology

- Comment 10: broad or ambiguous use of the term is removed from public labels.
  The precise categories are `Business Planning & Loan Application Support`
  and `Funding Application Support`.
- Existing route paths remain stable so published links and search indexing do
  not break.

## Annotation pass — contact channels

- Comment 11: the former public FST email address is removed from the contact
  page, footer, runtime configuration and structured data.
- WhatsApp uses `+35699152999`; the meeting route remains available separately.

## Annotation pass — WhatsApp-only direct contact

- Comments 12–14: the email card and separate WhatsApp card are removed. The
  remaining number card is the sole direct-contact card and opens WhatsApp.
- Footer contact is consolidated to the same WhatsApp deep link; direct-call
  links and telephone structured data are removed.

## Annotation pass — services index

- Comments 15–16: the services-page eyebrow is removed. The unclear finance
  label is replaced by `Business Planning & Loan Application Support`, with
  lender-ready application wording beneath it.

## Annotation pass — explicit application support

- Comment 17: generic `loan support` and `funding support` wording is replaced
  with the explicit terms `Loan Application Support` and
  `Funding Application Support` across public content and service selectors.
- Focused implementation evidence:
  `qa/fst-original/annotation-application-support-833x674.png` at the exact
  annotated 833 × 674 viewport.
