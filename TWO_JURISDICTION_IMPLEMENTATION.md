# FST Malta and Rwanda implementation

## Release architecture

FST now runs one application with an explicit jurisdiction contract:

```text
fst.ikanisa.com
├── /mt
│   ├── services and service detail routes
│   ├── catalogue in EUR
│   ├── contact and booking
│   └── Malta legal, privacy and site terms
└── /rw
    ├── Rwanda service and service detail routes
    ├── catalogue with scope-first pricing
    ├── Rwanda contact and fail-closed booking
    └── Rwanda legal, privacy and site terms
```

The root route selects a market automatically. Cloudflare country data routes Rwanda and Malta visitors at the edge without a location-permission prompt. Browser timezone and locale provide a silent fallback when an edge country is unavailable, with Malta as the legacy default. Existing unprefixed content routes remain available during migration so established links and search authority are not broken in one release.

## Domain model

`lib/jurisdictions.ts` is the public jurisdiction registry. Every market defines:

- country and locale;
- currency and formatting locale;
- operating timezone;
- public contact destinations;
- market-specific service area and homepage content;
- operational and professional boundary wording.

`lib/jurisdiction-services.ts` owns the service-page content for each market. Shared route templates and components consume this data, so Malta and Rwanda do not need cloned applications.

`lib/service-catalogue.ts` retains the controlled Malta catalogue. `lib/rwanda-catalogue.ts` owns the Rwanda catalogue and its approved RWF minimum fees.

## User experience

The public header and footer do not expose a manual market switcher. Market selection occurs automatically only when a visitor enters through `/`; explicit `/mt` and `/rw` links remain stable and are never silently rewritten.

Both jurisdictions implement:

- homepage;
- services index;
- six service detail routes;
- searchable, selectable catalogue;
- organisation/audience page;
- approach page;
- contact intake;
- meeting booking;
- legal information;
- privacy and cookie notice;
- site terms.

The Rwanda route never falls back to a Malta phone number, WhatsApp channel, public fee or Google Calendar. Missing Rwanda operational configuration produces a controlled alternative or a fail-closed response.

## API contracts

### `GET /api/v1/jurisdictions`

Returns public market configuration and canonical route destinations. It never returns booking recipients or credentials.

### `GET /api/v1/catalogue?jurisdiction=mt|rw`

Optional parameters:

- `category=<category-id>`;
- `q=<search phrase>`.

The response includes the jurisdiction, currency, pricing mode, active categories, services and formatted public price labels.

### `POST /api/v1/enquiries`

Accepts:

- `jurisdiction`;
- `name` and `email`;
- optional organisation and phone;
- message;
- optional catalogue service IDs;
- privacy consent;
- source path;
- honeypot field.

The endpoint verifies same-origin requests, applies an IP-and-jurisdiction rate window, validates the market/source-path relationship, limits every field, requires consent and writes only to the Cloudflare D1 `enquiries` table. The receipt contains an opaque request reference and no submitted personal data.

### `POST /api/book`

The existing booking API now requires or defaults a validated jurisdiction. It selects calendar, timezone and recipients server-side. Rwanda does not inherit the generic Malta calendar. It fails with `booking_not_configured` until `RW_GOOGLE_CALENDAR_ID` and `RW_BOOKING_RECIPIENTS` are configured.

## Persistence

The generated migration is `drizzle/0000_loud_rhino.sql`. It creates the `enquiries` table with:

- opaque request ID;
- jurisdiction;
- contact and message fields;
- selected service IDs as JSON;
- market-scoped source path;
- consent timestamp;
- status, timestamps and optimistic version;
- jurisdiction/created and status/created indexes.

Production must create or select the D1 database, bind it as `DB` in `wrangler.jsonc`, apply the generated migration and verify a controlled test enquiry before enabling the form as a live intake channel.

## Required production configuration

Public Rwanda configuration:

- `NEXT_PUBLIC_RW_CONTACT_EMAIL`;
- `NEXT_PUBLIC_RW_WHATSAPP_DISPLAY` (defaults to `+250795588248`);
- `NEXT_PUBLIC_RW_SERVICE_WHATSAPP_DISPLAY` (defaults to the same approved number).

Private operational routing:

- `RW_GOOGLE_CALENDAR_ID`;
- `RW_GOOGLE_CALENDAR_TIMEZONE`;
- `RW_BOOKING_RECIPIENTS`;
- shared Google OAuth credentials or a separately governed credential set;
- Cloudflare D1 `DB` binding.

Malta can optionally move from the legacy calendar variables to:

- `MT_GOOGLE_CALENDAR_ID`;
- `MT_GOOGLE_CALENDAR_TIMEZONE`;
- `MT_BOOKING_RECIPIENTS`.

## Search and discovery

Jurisdiction pages publish:

- self-canonical URLs;
- reciprocal `en-MT` and `en-RW` alternates;
- `x-default` on market homepages;
- market-specific Open Graph locale;
- market-scoped breadcrumbs and service catalogue structured data;
- complete `/mt` and `/rw` sitemap entries.

The final root-gateway cutover should happen only after both market route families are live and reciprocal alternates are verified from the deployed domain.

## Release gates

Before production cutover:

1. Approve Rwanda services, claims, legal wording and professional-provider boundaries with Rwanda owners.
2. Configure and verify Rwanda contact channels without Malta fallbacks.
3. Decide whether to publish Rwanda indicative fees; otherwise retain `Scope first`.
4. Bind and migrate D1, then verify receipt persistence and controlled access.
5. Configure separate calendars and recipients; run real controlled booking tests for both markets.
6. Verify desktop and mobile routes, keyboard navigation, forms, structured data, sitemap and analytics attribution.
7. Monitor legacy traffic before converting unprefixed routes to permanent `/mt` redirects.

Local validation currently includes a successful production build, lint, TypeScript checks, 33 rendered-route/API tests, desktop review at 1440×900 and mobile review at 390×844.
