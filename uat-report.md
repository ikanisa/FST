# FST production-readiness UAT and QA report

Date: 28 July 2026
Profiles: desktop 1440 × 900 and mobile 390 × 844

## Acceptance summary

| Area | Result |
| --- | --- |
| FST rebrand | Pass |
| Six main service categories | Pass |
| Full component lists | Pass |
| Funding Application Services | Pass |
| Removed external/statutory audit, investment and fiduciary services | Pass |
| Desktop responsive layout | Pass |
| Mobile responsive layout and menu | Pass |
| Broken-image sweep | Pass |
| Horizontal-overflow sweep | Pass |
| SEO, sitemap and removed-route checks | Pass |
| Booking validation and safe unconfigured state | Pass |
| Production dependency audit | Pass — zero known vulnerabilities |

## Route matrix

The browser sweep passed all 15 retained public routes:

- `/`
- `/services`
- `/services/management-consulting`
- `/services/tax-vat`
- `/services/accounting-financial-reporting`
- `/services/corporate-services`
- `/services/business-planning-finance-applications`
- `/services/funding-applications`
- `/who-we-work-with`
- `/about`
- `/insights`
- `/contact`
- `/book`
- `/privacy`
- `/terms`

The removed `/services/audit-assurance`, `/services/investment-family-office`, `/services/corporate-fiduciary` and superseded `/services/tax-accounting-payroll` routes return 404.

## Service-content acceptance

- Management Advisory, Risk & Controls includes management support, strategy, operating models, risk management, internal audit, internal controls, governance, compliance, policies and performance improvement.
- Tax & VAT includes VAT registration, returns, reconciliations, advisory, corporate income tax, planning, refunds, authority support and reviews.
- Accounting & Financial Reporting includes bookkeeping, reconciliations, management accounts, financial-statement preparation and review, budgets, projections, cash flow, payroll and close.
- Corporate & Administrative Services includes formation, company secretarial, registers, filings, governance, beneficial ownership, corporate changes and administration.
- Business Planning & Finance Applications includes business-plan preparation and review, projections, budgets, cash planning, loan readiness, lender applications, evidence packs and post-approval planning.
- Funding Application Services includes route scans, eligibility, concept design, official forms, business plans, budgets, state-aid and double-funding checks, evidence packs, submission-readiness review and post-award support.

## Evidence

- `qa/fst/home-desktop-1440x900.jpg`
- `qa/fst/home-mobile-390x844.jpg`
- `qa/fst/services-desktop-1440x900.jpg`
- `qa/fst/services-mobile-390x844.jpg`
- `qa/fst/funding-desktop-1440x900.jpg`
- Source-design reference: `qa/home-desktop.png`
