# FST go-live implementation

Updated: 3 August 2026

## Implemented

- FST branding across visible copy, metadata, structured data, booking, legal pages and runtime configuration.
- Legal information, privacy and website terms routes with a fail-closed warning until the approved legal identity, controller and contact details are configured.
- A substantive Insights index with three directly addressable field notes and Article structured data.
- Enquiry and catalogue language consistently describes a non-binding request rather than an order, appointment or engagement.
- Clearly separated service categories with detailed component lists.
- Dedicated Audit & Assurance category covering statutory and voluntary audit, assurance, agreed-upon procedures, internal audit, controls, operational, donor, NGO, project, compliance, regulatory, systems and special-purpose work.
- Statutory and regulated assurance wording includes explicit Malta authorisation, independence, ethics, quality-management and engagement-acceptance safeguards.
- Consolidated Loan & Funding Application Support across lender, FONDI.eu, Malta Enterprise and Xjenza Malta routes.
- Investment, family-office and fiduciary services remain removed from public routes, sitemap, assets and copy.
- First-party `/book` flow with input validation, availability checking and Google Meet event creation when approved Calendar credentials are configured.
- Responsive desktop and mobile layouts, semantic icons, accessible navigation, SEO metadata, sitemap, robots and production security headers.
- Dedicated `/ai-agent-team` page explaining FST’s supervised use of IKANISA’s Patrick, Sofia, Matthew, Claire and Emma agents, the workpacks they prepare and the professional approval boundary.
- Production dependency audit at zero known vulnerabilities after the validated overrides.
- Twelve original FST photographs, a new favicon and a reproducible social card; no deployed public asset matches a KMFINCO source fingerprint.
- Original FST wording and labels across navigation, service pages, contact, legal, booking and metadata surfaces.

## Activation values still required

Add these hosting values only after each underlying destination has been verified.

| Requirement | Environment value | Safe fallback |
| --- | --- | --- |
| Canonical public origin | `NEXT_PUBLIC_SITE_URL` | Defaults to the production Cloudflare domain `https://fst.ikanisa.com` |
| Google Calendar API | `GOOGLE_CALENDAR_CLIENT_ID`, `GOOGLE_CALENDAR_CLIENT_SECRET`, `GOOGLE_CALENDAR_REFRESH_TOKEN`, `GOOGLE_CALENDAR_ID`, `GOOGLE_CALENDAR_TIMEZONE` | Booking fails safely when credentials are absent |
| Catalogue-request WhatsApp | `https://wa.me/35677186193` (`+356 7718 6193`) | The catalogue creates a prefilled request link without a server-side binding |
| Public appointment schedule | `NEXT_PUBLIC_GOOGLE_BOOKING_URL` | Optional and hidden when absent |
| LinkedIn company page | `NEXT_PUBLIC_LINKEDIN_URL` | Hidden when absent |
| Google Analytics 4 | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Analytics and consent banner remain off |
| Search Console | `GOOGLE_SITE_VERIFICATION` | Verification meta tag remains absent |
| Approved legal identity | `NEXT_PUBLIC_LEGAL_NAME`, `NEXT_PUBLIC_COMPANY_REGISTRATION_NUMBER`, `NEXT_PUBLIC_VAT_NUMBER`, `NEXT_PUBLIC_REGISTERED_ADDRESS` | Legal and privacy pages display a prominent incomplete-disclosure warning |
| Approved public contact | `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_COMPLAINTS_EMAIL` | No public email is invented or exposed |
| Approved professional disclosure | `NEXT_PUBLIC_ACCOUNTANCY_BOARD_REGISTRATION`, `NEXT_PUBLIC_RESPONSIBLE_PRINCIPAL`, `NEXT_PUBLIC_PRINCIPAL_WARRANT_NUMBER` | No registration or warrant claim is shown |

## Human approval boundary

FST may prepare and review loan, funding and finance submission packages. No filing or external submission is made without explicit recorded human approval. The website states that final submission remains with the authorised applicant.

Statutory audit and other regulated assurance engagements are accepted and performed only where the responsible auditor or audit firm holds the required Malta authorisation and the engagement passes conflict, independence, competence, ethics, quality-management and acceptance checks.

## Verification

- `npm run lint` passes.
- `npm test` passes the production build and the rendered-route, content, professional-safeguard, brand-separation, WhatsApp-request and booking integration tests.
- `npm audit --omit=dev` reports zero production vulnerabilities.
- Browser QA passes at 1440 × 900 and 390 × 844 with no completed broken images or horizontal overflow.
- All 21 sitemap routes are covered by production rendering and route checks; key journeys are included in desktop and mobile browser QA.
- Removed service routes return 404.
- `npx wrangler deploy --dry-run --outdir .wrangler/fst-dry-run` completes and packages the Cloudflare Worker without publishing.

## Remaining external actions

1. Supply and approve the legal identity, company registration, registered address, controller contact, complaints contact and any professional registration or warrant details before deployment.
2. Add approved Google Calendar, LinkedIn, analytics and Search Console values if required.
3. Complete an authorised test booking after production Calendar credentials are supplied.
4. Obtain legal/privacy approval for the final controller identity, jurisdiction and retention wording.
