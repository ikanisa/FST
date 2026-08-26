# Rwanda sector package catalogue — source and method notes

Prepared: 26 August 2026
Decision audience: FST product and commercial stakeholders
Scope: pharmacies, hardware shops, motor-vehicle spare-parts shops, and construction/engineering practices operating in Rwanda.

## Decision frame

The report tests whether the public catalogue should remain a list of generic professional services or present one coherent package menu for each sector. The unit of analysis is a sector operating model, not an individual company. A package is therefore a curated commercial wrapper around reusable accounting, tax, payroll, governance, funding and control workpacks; it is not an unrestricted promise to handle every obligation.

Success criteria:

- a business owner can recognise the package that fits its operating cycle;
- the scope has measurable limits and exclusions;
- regulated, official and applicant-controlled actions remain gated;
- the package can be assembled from reusable backend workpacks without duplicating the catalogue;
- the starting fee remains commercially testable rather than pretending to be a final quote.

## Evidence inventory

Current official sources reviewed:

- NISR, Establishment Census 2023 and statistical tables: https://www.statistics.gov.rw/statistical-publications/business-establishment-finance-trade/establishment-census-2023
- NISR, Establishment Census 2023 PDF: https://www.statistics.gov.rw/sites/default/files/documents/2025-01/Establishment%20Census%202023.pdf
- NISR, Labour Force Survey Annual Report 2024: https://www.statistics.gov.rw/data-sources/surveys/Labour-Force-Survey/labour-force-survey-2024/labour-force-survey-annual-report-2024
- NISR, GDP National Accounts 2025: https://statistics.gov.rw/statistical-publications/gross-domestic-product/gdp-national-accounts-2025
- Rwanda FDA stakeholder documents and current licence guidance: https://monitoring.rwandafda.gov.rw/stakeholders/
- Rwanda FDA good storage and distribution practice regulations: https://rwandafda.gov.rw/wp-content/uploads/2024/05/Regulations%20governing%20Good%20Storage%20and%20Distribution%20Practices%20of%20Medical%20Products_23.04.2024.pdf
- National Pharmacy Council registration requirements: https://pharmacycouncil.rw/registration-requirements/
- RRA VAT requirements: https://www.rra.gov.rw/en/domestic-tax-services/value-added-tax/penalties-and-interest
- RRA EBM 2.1 booklet: https://www.rra.gov.rw/fileadmin/user_upload/EBM_2.1_Booklet_EN.pdf
- RRA withholding-tax types: https://www.rra.gov.rw/en/domestic-tax-services/withholding-tax-wht/types-of-withholding-tax
- RRA unified PAYE/RSSB declaration: https://www.rra.gov.rw/en/domestic-tax-services/employment-tax-paye/declare-paye
- RSSB January 2025 mandatory-pension-rate notice: https://www.rssb.rw/uploads/merged_1_adba12649b.pdf
- RRA tax-compliance certificate route: https://www.rra.gov.rw/en/domestic-tax-services/other-services/apply-for-tcc
- RDB/ORG business registration: https://org.rdb.rw/business-registration/
- RSB construction-material certification: https://www.rsb.gov.rw/certifications/system-certification/system-certification-schemes-1
- RICA services, inspection and market surveillance: https://www.rica.gov.rw/s
- Law governing architecture, engineering and quantity-surveying professions, 2025: https://www.engineersrwanda.rw/documents/ier_documents/1759312897.Law%20on%20the%20Professions%20of%20Architecture%2C%20Engineering%20and%20Quantity%20Surveying%202025-1.pdf
- Institution of Engineers Rwanda registration requirements: https://www.engineersrwanda.rw/registration/requirements
- BRD Hatana technical-assistance and finance programme information: https://hatana.brd.rw/

Local professional-source routes and searches:

- `agents/emmanuel/codex/EMMANUEL_CURRENT_TAX_SOURCE_MATRIX.md`
- `agents/emmanuel/codex/EMMANUEL_WORK_TYPE_ROUTER.md`
- `agents/sofia/codex/SOFIA_CURRENT_FINANCE_SOURCE_MATRIX.md`
- `agents/sofia/codex/SOFIA_WORK_TYPE_ROUTER.md`
- `agents/fundable/codex/FUNDABLE_CURRENT_BUSINESS_LOAN_SOURCE_MATRIX.md`
- `agents/fundable/codex/FUNDABLE_WORK_TYPE_ROUTER.md`
- Emmanuel corpus query: `Rwanda retail SME VAT EBM stock reconciliation payroll tax clearance`
- Sofia corpus query: `inventory accounting retail stock landed cost project accounting construction WIP`
- Fundable corpus query: `Rwanda SME working capital inventory finance TCC CRB DSCR bankability`
- Existing FST workpacks: `lib/rwanda-catalogue.ts`
- Prior FST catalogue research: `RWANDA_SERVICE_CATALOGUE_RESEARCH.md`

## Analytical method

The factual market chart uses the NISR Establishment Census 2023. Its formal-share values are broad activity-sector statistics, not counts of the four target customer niches. They show that the relevant business environment is heterogeneous; they must not be used as a pharmacy, hardware, spare-parts or engineering market-size estimate.

The 1–5 sector-design scores are an explicit qualitative synthesis of official requirements and operating-cycle analysis:

- 1 = low or occasional package pressure;
- 3 = material and recurring;
- 5 = defining feature that changes the package architecture.

Scores compare regulatory load, inventory complexity, import/tax exposure, licensed-person dependency, funding evidence, and project/contract complexity. They are prioritisation aids, not survey measurements.

## Chart map

| Section | Question | Form | Dataset | Design policy |
| --- | --- | --- | --- | --- |
| Market evidence | Why is a single generic SME package unsafe? | Vertical bar | NISR broad-sector formal share | Single-root blue; direct percentages; zero baseline; exact counts retained in the source rows |
| Sector differences | Which operating dimensions define each package? | Exact table | Evidence synthesis, 1–5 rubric | Numeric lookup, not a decorative heatmap |
| Package blueprint | What should FST sell and what should each package contain? | Exact table | FST product synthesis | Full-width table with concise scope bands |

## Price calibration

The recommended `from` fees are pilot entry prices aligned to the current FST decision to display approximately 10% of earlier catalogue levels. They are not asserted market averages. Each price assumes one entity, one location, clean digital records, the stated transaction/SKU/employee/project cap, remote delivery, and no portal submission or licensed conclusion. VAT, authority fees, travel, stock counts, legal work, assurance, emergency deadlines and third-party costs remain separate.

The recommended commercial formula is:

`monthly base + volume band + branch/project band + regulated or event add-ons`

FST should time-track the first ten accepted clients in each sector and revise floors only after observed delivery hours, rework, acceptance rate and gross contribution are known.

## Evidence gaps and confidence

- No primary survey of the four target sectors, current FST lead data, conversion data, delivery-time data or willingness-to-pay research was available.
- NISR activity classifications do not isolate these exact customer niches; pharmacy retail may sit within wholesale/retail rather than human health.
- Product certification and import requirements are item- and route-specific; RSB/RICA applicability must be confirmed for each product category or HS code.
- Pharmacy licensing documents are actively revised; the live Rwanda FDA document index controls over older guidance.
- Lender eligibility, pricing, collateral and guarantees require an identified applicant, lender and facility; the report makes no credit decision or approval prediction.

Overall confidence is high on the hybrid catalogue architecture, moderate on package composition, and low-to-moderate on starting fees until pilot cost data exists.

## Required-structure mapping

The executive-report contract is implemented as: title; visible Executive Summary; evidence and findings sections; recommendation and rollout steps; further questions; caveats and assumptions. Method, chart rationale and detailed source inventory stay in this supporting note rather than cluttering the reader-facing report.
