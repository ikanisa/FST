# FST

FST is a senior-led multidisciplinary advisory website with an original visual
system, a distinct editorial voice and clearly named service categories.

## Main service categories

- **Management Advisory, Risk & Controls** — management support, business planning and review, feasibility, budgeting and projections, strategy, operating models, risk management, internal audit, internal controls, governance, compliance, policies and performance improvement.
- **Taxation** — corporate and personal income tax, VAT, payroll and FSS, social security, withholding tax, property and transfer taxes, international tax and transfer pricing, provisional tax, planning, refunds and MTCA support.
- **Accounting & Financial Reporting** — bookkeeping, reconciliations, payables and receivables, management accounts, financial-statement preparation and review, payroll, close, budgets, projections and cash-flow support.
- **Corporate & Administrative Services** — company formation, company secretarial, registers, filings, board and shareholder support, beneficial ownership, corporate changes and ongoing administration.
- **Loan Application Support** — application readiness, borrowing requirement and facility fit, forms, lender financial schedules, evidence packs, queries, approval, drawdown and post-approval monitoring.
- **Funding Application Support** — opportunity scans, eligibility, project design, forms, business plans, budgets, state-aid checks, evidence packs, submission-readiness review and post-award support across FONDI.eu, Malta Enterprise and Xjenza Malta routes.

FST does not advertise external or statutory audit and assurance, investment or family-office services, or fiduciary services. Internal audit remains available as a management, risk and controls service.

## Brand assets

The approved FST identity uses an ink-navy wordmark with an orange monogram
accent. Production assets are served from `/public/brand/` and include the
horizontal logo, standalone mark and reverse logo. The same identity is applied
to the favicon, Apple touch icon, web-app icons, Open Graph image, header,
footer and structured organisation metadata.

## Routes

- `/` — firm overview
- `/services` — connected expertise
- `/services/management-consulting`
- `/services/taxation`
- `/services/accounting-financial-reporting`
- `/services/corporate-services`
- `/services/loan-application-support`
- `/services/funding-applications`
- `/about` — FST approach and field notes
- `/contact`
- `/book` — Google Calendar and Google Meet booking

## First-party integrations

- `/api/book` validates meeting requests, checks Google Calendar free/busy availability, and creates a Calendar event with Google Meet and attendee notifications.
- Every primary website action uses the label “Book a Meeting” and routes to `/book`.
- Confirmed Calendar events invite the prospective client and FST’s approved scheduling contact with `sendUpdates=all`.
- No public email address, `mailto:` action or website email workflow is included; direct contact is handled through WhatsApp and meeting scheduling.
- Booking fails safely when production credentials are absent by producing a dated Google Calendar invitation.
- Required hosted values are listed in `.env.example` and `GO_LIVE_IMPLEMENTATION.md`.

## Local development

```bash
npm install
npm run dev
```

## Verification

```bash
npm test
npm run lint
```

The production build is created with `npm run build`. Current design evidence is
stored in `qa/fst-original/`, the visual production manifest is under
`creative-production/fst-visual-system/`, and the final design QA record is in
`design-qa.md`.

## Cloudflare deployment

The production site is configured for Cloudflare Workers through Vinext:

```bash
npm run deploy
```

For a deployment-package check that does not publish:

```bash
npx wrangler deploy --dry-run
```
