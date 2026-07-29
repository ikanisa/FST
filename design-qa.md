# FST service catalogue design QA

final result: passed

Date: 29 July 2026
State tested: catalogue landing view, service search, service selection, desktop order panel, mobile order tray and mobile order form
Source visual truth: `qa/fst/services-desktop-1440x900.jpg`
Implementation screenshot: `qa/service-catalogue-desktop-viewport-1440x900.png`
Combined comparison: `qa/service-catalogue-source-vs-implementation.jpg`
Viewport: 1440 × 900 CSS px at 1× density; responsive pass at 390 × 844 CSS px at 1× density
Source pixels: 1440 × 900; implementation pixels: 1440 × 900; mobile implementation pixels: 390 × 844

## Full-view comparison evidence

The existing FST Services page is the visual authority for the new catalogue.
The source and implementation were placed in one 2880 × 960 comparison image
before judgement. The implementation intentionally changes the hero composition
to support pricing and ordering, while preserving FST's inset rounded header,
large editorial serif, tightly tracked eyebrow, ivory canvas, cobalt/navy
palette, coral action colour, restrained radii and soft elevation system.

The catalogue's first viewport maintains the source's whitespace, premium
editorial scale and two-part hero balance. The pricing panel is visually
subordinate to the main proposition while remaining immediately legible.
Navigation, hero and CTA rhythm align with the accepted desktop system.

## Focused-region comparison evidence

- Service grid and desktop order panel:
  `qa/service-catalogue-desktop-cards-1440x900.png`
- Mobile first viewport:
  `qa/service-catalogue-mobile-390x844.png`
- Mobile filters and cards:
  `qa/service-catalogue-mobile-filters-390x844.png` and
  `qa/service-catalogue-mobile-cards-390x844.png`
- Mobile order form:
  `qa/service-catalogue-mobile-order-390x844.png`

Focused evidence was required because the source page does not contain search,
selection or order-form states. The service cards use the same serif/sans
hierarchy and border/shadow restraint as the source. The mobile order sheet
uses the same navy/cobalt professional surface and coral primary action.

## Required fidelity surfaces

- Fonts and typography: Cormorant Garamond remains the display face and Manrope
  the UI/body face. Display weight, line height and wrapping match FST's
  editorial character. Small labels use tracked uppercase text without leaking
  implementation language.
- Spacing and layout rhythm: 28 px outer radii, inset page margins, 16–34 px
  card/grid gaps and a sticky order rail create a clear hierarchy. Desktop and
  mobile checks show zero horizontal overflow.
- Colors and visual tokens: the implementation reuses `--navy`, `--cobalt`,
  `--coral`, `--ivory`, `--paper`, `--line` and the existing shadow tokens.
  Text/background combinations remain legible in the tested states.
- Image quality and asset fidelity: no decorative image was required for this
  information-dense product flow. The design uses typography and existing
  brand tokens rather than a placeholder, imitation illustration or fake icon.
  Phosphor icons match the site's established icon system.
- Copy and content: service names, units, safeguards, fee qualifiers and order
  instructions are concrete. “From” prices never imply payment or automatic
  professional acceptance. The 50% statement is framed as an approximate
  pricing-design target and not a universal market guarantee.

## Findings and comparison history

- P0: none.
- P1: none.
- P2, resolved: singular search results initially rendered as `1 services`.
  The result label now switches correctly between `service` and `services`.
- P2, resolved: the first mobile order overlay exposed two controls with the
  same accessible close name. The backdrop and explicit close control now have
  distinct accessible names.
- P2, resolved: the mobile overlay initially lacked explicit focus containment.
  Focus now opens on the close control, Tab/Shift+Tab remain within the sheet,
  Escape closes it, and background body scrolling is locked while open.
- P3: the catalogue is intentionally long when the `All` filter is active.
  Search, category counts and the sticky order rail make this acceptable; future
  usage analytics can determine whether a popular-only default is preferable.

## Interaction and browser evidence

- Search for `privacy` returned exactly one service: `Privacy and cookie policy`.
- Adding `Monthly bookkeeping` produced one selected card and one matching
  desktop order item.
- Adding a statutory audit on mobile displayed the one-service order bar and
  opened the correct modal order item.
- The mobile order form exposed name, email, organisation, timing, context,
  consent, WhatsApp continuation and a prefilled email fallback.
- No WhatsApp message, email, payment, filing or external submission was made.
- Browser console warnings/errors after the tested interactions: 0.
- Primary desktop and mobile implementation checks show 0 px horizontal
  overflow.

## Implementation checklist

- [x] Search and category filters are keyboard reachable and stateful.
- [x] Add/remove controls expose pressed state and descriptive accessible names.
- [x] Desktop order summary stays visible without covering the catalogue.
- [x] Mobile order controls, focus behaviour and body-scroll lock work.
- [x] Regulated-service safeguards and fee exclusions are visible.
- [x] Reduced-motion preferences inherit the site's global treatment.

---

# Prior site-wide FST design QA

historical result: passed

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

- Twelve retained content routes passed at both viewports.
- Every route had a rendered `main` and page-specific `h1`.
- Horizontal overflow: 0 px on the focused desktop and mobile identity checks.
- Completed broken images: 0 after the full lazy-image traversal.
- Browser console warnings/errors after the navigation test: 0.
- New public asset fingerprints do not match any KMFINCO public asset fingerprint.
- Lint, production build and 19 automated route/integration tests pass.
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
  The current consolidated category is `Loan & Funding Application Support`.
- Earlier separate route paths permanently redirect to the consolidated
  canonical page so published links retain continuity.

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
  label is replaced by `Loan & Funding Application Support`, with lender- and
  funder-ready wording beneath it.

## Annotation pass — explicit application support

- Comment 17: generic `loan support` and `funding support` wording is replaced
  with the explicit consolidated term `Loan & Funding Application Support`
  across public content and service selectors.
- Focused implementation evidence:
  `qa/fst-original/annotation-application-support-833x674.png` at the exact
  annotated 833 × 674 viewport.

## Annotation pass — comprehensive tax scope

- Comment 18: the narrow VAT-and-corporate-tax summary is replaced by the
  direct category `Taxation` and a detailed Malta scope covering income tax,
  VAT, payroll/FSS, social security, withholding, property and transfers,
  international tax, provisional tax, refunds, planning and MTCA support.
- Focused implementation evidence:
  `qa/fst-original/annotation-tax-loan-833x674.png` at the exact annotated
  833 × 674 viewport.

## Current taxonomy — consolidated finance applications

- The latest instruction supersedes the earlier standalone loan category:
  loan and funding application services now share one complete service page.
- Business planning, plan preparation, plan review, feasibility, budgeting,
  projections and scenarios remain under Management Advisory, Risk & Controls.
- Audit & Assurance is now a dedicated category with separate independence and
  professional-authorisation safeguards.

## Annotation pass — organisation types

- Comment 20: the Organisations page now explicitly serves start-ups,
  self-employed professionals, SMEs, established businesses, NGOs, voluntary
  and community organisations, and international programmes.

## Annotation pass — combined approach and field notes

- Comment 21: `Field Notes` and `FST Approach` are merged into the single
  `Our Approach` page at `/about`.
- The former `/insights` page, navigation item and sitemap entry are removed.
- Focused implementation evidence:
  `qa/fst-original/annotation-merged-approach-notes-833x674.png` at the exact
  annotated 833 × 674 viewport.

## Annotation pass — approach label

- Comment 22: the combined `/about` page is labelled `Our Approach` in the
  header, footer and page metadata. The Field Notes content remains within the
  page without competing for space in the primary navigation.

## Annotation pass — legal-page removal

- Comments 23–24: `Data notice` and `Site rules` are removed from the footer,
  sitemap and retained route set. Their former `/privacy` and `/terms` pages
  now return 404, and booking consent remains clear without dead links.

## Annotation pass — FST brand identity

- Comment 25: the text-only FST wordmark is replaced with the selected Refined
  FST Wordmark, using ink navy and the requested FST orange accent.
- The source-approved mark is vector traced into production SVG assets rather
  than recreated with CSS, inline SVG or a substitute typeface.
- The new identity is applied consistently to the header, footer, favicon,
  Apple touch icon, web-app icons, Open Graph card, web manifest and structured
  organisation metadata.

### Identity fidelity evidence

- Source visual truth:
  `creative-production/fst-brand-system/fst-selected-wordmark-orange.png`
  at 1749 × 899 pixels.
- Browser-rendered implementation:
  `qa/fst-original/annotation-brand-logo-our-approach-833x674.png`
  at an 833 × 674 CSS-pixel viewport and 1× capture density.
- Combined comparison:
  `qa/fst-original/brand-logo-source-vs-implementation.png`
  at 1600 × 760 pixels. This places the approved source and rendered header in
  one review surface.
- Focused mobile evidence:
  `qa/fst-original/brand-logo-mobile-390x844.png` and
  `qa/fst-original/brand-logo-mobile-menu-390x844.png`.
- State: `/about`, desktop navigation visible; mobile navigation tested closed
  and open.
- Typography: the selected custom letterforms are retained as SVG paths, so no
  substitute font or browser font rendering changes the identity.
- Spacing and layout rhythm: the header lockup renders at 118 × 29.9 CSS pixels
  and the footer lockup at 142 × 36 CSS pixels without altering surrounding
  navigation spacing.
- Colours: the production paths use ink navy `#102635` and the selected orange
  `#FF6845`; no cobalt remains in the mark.
- Image quality: SVG paths remain crisp at header, footer and favicon sizes;
  PNG exports use the same approved geometry.
- Copy: the exact brand name `FST` is present in accessible image text.
- Interaction and accessibility: the logo links to the homepage with a clear
  accessible name, the mobile menu opens and closes, horizontal overflow is
  zero, completed broken images are zero and browser console errors are zero.
- Findings: P0 none; P1 none; P2 none. The approved source and implementation
  preserve the same mark, wordmark, proportions and orange accent.
- final result: passed
