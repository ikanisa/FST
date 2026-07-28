# FST production-readiness UAT and QA report

Date: 28 July 2026
Profiles: desktop 1440 × 900 and mobile 390 × 844

## Acceptance summary

| Area | Result |
| --- | --- |
| FST rebrand | Pass |
| Original FST photography and labels | Pass |
| KMFINCO public-asset fingerprint separation | Pass |
| Clearly named service categories | Pass |
| Full component lists | Pass |
| Funding Application Support | Pass |
| Removed external/statutory audit, investment and fiduciary services | Pass |
| Desktop responsive layout | Pass |
| Mobile responsive layout and menu | Pass |
| Broken-image sweep | Pass |
| Horizontal-overflow sweep | Pass |
| SEO, sitemap and removed-route checks | Pass |
| Booking validation and safe unconfigured state | Pass |
| Production dependency audit | Pass — zero known vulnerabilities |
| Cloudflare deploy dry-run | Pass |

## Route matrix

The browser sweep passed all 14 retained public routes:

- `/`
- `/services`
- `/services/management-consulting`
- `/services/tax-vat`
- `/services/accounting-financial-reporting`
- `/services/corporate-services`
- `/services/business-planning-finance-applications`
- `/services/funding-applications`
- `/who-we-work-with`
- `/about` — FST approach and field notes
- `/contact`
- `/book`
- `/privacy`
- `/terms`

The removed `/services/audit-assurance`, `/services/investment-family-office`, `/services/corporate-fiduciary` and superseded `/services/tax-accounting-payroll` routes return 404.

## Service-content acceptance

- Management Advisory, Risk & Controls includes management support, business planning and review, feasibility, budgeting and projections, strategy, operating models, risk management, internal audit, internal controls, governance, compliance, policies and performance improvement.
- Taxation includes corporate and personal income tax, VAT, payroll and FSS, social security, withholding, property and transfer taxes, international tax and transfer pricing, provisional tax, planning, refunds and MTCA support.
- Accounting & Financial Reporting includes bookkeeping, reconciliations, management accounts, financial-statement preparation and review, budgets, projections, cash flow, payroll and close.
- Corporate & Administrative Services includes formation, company secretarial, registers, filings, governance, beneficial ownership, corporate changes and administration.
- Loan Application Support includes application readiness, borrowing requirement and facility fit, forms, lender financial schedules, evidence packs, queries, approval, drawdown and post-approval monitoring.
- Funding Application Support includes route scans, eligibility, concept design, official forms, business plans, budgets, state-aid and double-funding checks, evidence packs, submission-readiness review and post-award support.

## Evidence

- Accepted layout baseline: `qa/fst/home-desktop-1440x900.jpg`
- Current homepage: `qa/fst-original/home-desktop-viewport-1440x900.png`
- Current mobile homepage: `qa/fst-original/home-mobile-390x844.png`
- Mobile menu open: `qa/fst-original/home-mobile-menu-390x844.png`
- Current service index: `qa/fst-original/services-desktop-1440x900.png`
- Current funding page: `qa/fst-original/funding-mobile-390x844.png`
- Final Product Design record: `design-qa.md`
