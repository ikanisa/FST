# Malta sector package catalogue — source and method notes

## Decision being made

FST should add four recognisable sector packages for small owner-managed businesses while retaining the current atomic service catalogue as the canonical delivery and pricing layer. This note covers community pharmacies, hardware shops, spare-parts shops and engineering/construction practices.

The recommendation is a hybrid catalogue:

1. reusable accounting, VAT, payroll, corporate, funding and control workpacks;
2. a sector-control module for stock, product evidence or projects;
3. a versioned public package with explicit limits, add-ons and exclusions;
4. a non-sensitive scope response; and
5. an engagement gate before any filing, regulated conclusion, professional sign-off or authority interaction.

The jurisdiction belongs primarily in routing and backend configuration. Public pages should not repeat country labels where they add no legal or service meaning.

## Market context

Malta's National Statistics Office reported 60,856 active enterprises in 2024. Of these, 57,228 were micro-enterprises, or 94.0 per cent. Wholesale and retail represented 16.0 per cent of active enterprises, professional/scientific/technical activities 15.3 per cent, and construction 9.9 per cent. Sole proprietors and partnerships represented 73.2 per cent of active enterprises.

Selected broad-sector counts used for contextual comparison are:

| Broad NACE ecosystem | Active enterprises | Micro-enterprises | Micro share |
|---|---:|---:|---:|
| Wholesale and retail, including motor repair | 9,755 | 9,050 | 92.77% |
| Professional, scientific and technical | 9,333 | 8,917 | 95.54% |
| Construction | 6,028 | 5,762 | 95.59% |
| Human health and social work | 1,615 | 1,500 | 92.88% |

These are broad NACE proxies. They are not counts of pharmacies, hardware shops, spare-parts shops or engineering practices, and they are not a market-size estimate. Their purpose is to show that each adjacent ecosystem is dominated by micro-enterprises and therefore needs tight, visible scope limits.

Primary source: [NSO, Business Demography 2024](https://nso.gov.mt/business-demography-2024/) and [release PDF](https://nso.gov.mt/wp-content/uploads/NR-218-2025.pdf).

## Common Malta control spine

Every package should start with the same reusable primitives, selected only when applicable:

- bookkeeping, bank/card/POS reconciliation and management reporting;
- VAT route and rate mapping, VAT-return preparation support, tax-invoice and fiscal-receipt control;
- payroll, Final Settlement System (FSS), social-security contribution and annual FS3/FS7 reconciliation support;
- company annual-return, beneficial-ownership confirmation and annual-accounts calendar where the client is a company;
- Article 12, VIES, Intrastat, EORI and customs trigger detection for cross-border activity;
- finance-readiness, loan or grant evidence modules where separately selected; and
- evidence gaps, owner, due date, review status and source-review date.

The common layer must not hard-code one VAT rate. The default rate is 18 per cent, with reduced and zero-rate or exemption-with-credit treatments depending on the supply and sometimes the CN classification. Article 10, 11 and 12 routes have different obligations. Retail fiscal-receipt controls also depend on the approved cash-register or approved computerised/POS route.

Primary sources:

- [MTCA VAT rates](https://mtca.gov.mt/business-tax/vat1/vat-compliance/vat-rates)
- [MTCA small-undertaking VAT registration note](https://mtca.gov.mt/docs/default-source/documents/personal-tax/self-employed/registration/06-small-undertakings-registered-as-exemptv2.pdf)
- [MTCA fiscal receipts, invoices and credit notes](https://mtca.gov.mt/business-tax/vat1/vat-compliance/fiscal-receipts--invoices-and--credit-notes/fiscal-receipts--invoices-and-credit-notes)
- [MTCA FSS system](https://mtca.gov.mt/business-tax/fss-system)
- [NSO Intrastat](https://nso.gov.mt/intrastat/)
- [MTCA EORI](https://mtca.gov.mt/customs/business/economic-operators/economic-operators-registration-identification)
- [Malta Business Registry annual filings](https://www.mbr.mt/website-pages/annual-filings)

## Package 1 — Pharmacy Control & Compliance Desk

### Why it needs its own package

A community pharmacy is simultaneously a retail business, a licensed premises and a controlled medicine-supply environment. Ordinary bookkeeping does not address batch and expiry visibility, near-expiry exposure, recall/return evidence, licensed-person coverage, inspection evidence or the distinction between retail-pharmacy and wholesale-dealer activity.

The Medicines Authority states that more than 200 community pharmacies are licensed and that supervision includes new, follow-up, renewal, variation, for-cause and desk/self-audit routes. The Medicines Act and subsidiary rules require licensed premises and appropriate conservation/dispensing facilities. Wholesale distribution is a separate Good Distribution Practice route with a Responsible Person and specific sourcing, storage, supply and recall responsibilities.

### Recurring entry scope

- bookkeeping; bank/card/POS and supplier reconciliation;
- fiscal receipt/tax invoice and VAT-rate-matrix controls;
- payroll/FSS/SSC support;
- monthly management summary and gross-margin view;
- SKU, batch, expiry and near-expiry register;
- return, recall, disposal and evidence-gap register; and
- licence, inspection and responsible-person evidence calendar.

### Entry limits and fee

- one licensed premises;
- up to 100 monthly finance entries;
- up to 750 active SKUs;
- up to five employees;
- clean digital records and remote delivery;
- setup from **EUR 300**; recurring from **EUR 550 per month**.

### Add-ons and boundaries

Add-ons include renewal or variation readiness, a physical stock count, cold-chain evidence, recall/disposal workpack, wholesale/GDP readiness, e-commerce, annual accounts/tax and finance-readiness.

FST may prepare records, reconciliations and evidence packs. It must not promise dispensing judgement, a licence or variation decision, an inspection outcome, product release, a wholesale authorisation, a regulatory submission or a pharmacist's reserved professional conclusion.

Primary sources:

- [Medicines Authority pharmacies](https://medicinesauthority.gov.mt/pharmacies)
- [Medicines Act](https://legislation.mt/getpdf/689056a6bed0ed26189a5c41)
- [S.L. 458.16](https://legislation.mt/eli/sl/458.16/eng/pdf)
- [Pharmacy Council — practising as a pharmacist](https://pharmacycouncil.gov.mt/en/service/practicing-as-a-pharmacist/)
- [Medicines Authority GDP](https://medicinesauthority.gov.mt/gooddistributionpractice)

## Package 2 — Hardware Stock, VAT & Product Evidence Desk

### Why it needs its own package

The defining problem is not merely retail bookkeeping. A hardware merchant must maintain usable units of measure, brand/specification data, supplier provenance, landed cost, shrinkage and slow-stock information, while identifying which construction products fall within a harmonised product or other conformity route.

Regulation (EU) 2024/3110 changes the Construction Products Regulation framework. For an applicable construction product, distributors have duties concerning markings, declarations, instructions/safety information, non-conforming products and storage/transport. These obligations do not mean every hardware SKU requires a CE mark or Declaration of Performance; applicability depends on the product, the relevant specification or assessment route, and whether the business acts as retailer, distributor, importer or private-label manufacturer.

### Recurring entry scope

- books, bank/card/POS, supplier and VAT reconciliation;
- payroll/FSS support;
- SKU, unit-of-measure, brand and specification master;
- stock movement, slow-stock, shrinkage and margin by product family;
- supplier and conformity-evidence index where applicable; and
- cross-border trigger register for Article 12/VIES/Intrastat/EORI/customs.

### Entry limits and fee

- one branch;
- up to 100 monthly finance entries;
- up to 750 active SKUs;
- up to five employees;
- no physical stock count or customs declaration;
- setup from **EUR 250**; recurring from **EUR 450 per month**.

### Add-ons and boundaries

Add-ons include importer/EORI readiness, VIES or Intrastat, a physical stock count, multi-branch reporting, tender-supply evidence, product-evidence remediation, working-capital finance and annual accounts/tax.

FST should index and reconcile product evidence, not certify products, determine legal conformity conclusively, act as customs declarant, or assume manufacturer/importer obligations without a separately accepted competent route.

Primary sources:

- [Regulation (EU) 2024/3110](https://eur-lex.europa.eu/eli/reg/2024/3110/oj)
- [European Commission construction-products overview](https://single-market-economy.ec.europa.eu/sectors/construction/construction-products-regulation-cpr)
- [European Commission declaration and CE-marking guide](https://single-market-economy.ec.europa.eu/sectors/construction/construction-products-regulation-cpr/declaration-performance-and-ce-marking_en)
- [European Commission importers and distributors](https://single-market-economy.ec.europa.eu/single-market/goods/ce-marking/importers-and-distributors_en)

## Package 3 — Spare Parts Stock & Cross-Border Desk

### Why it needs its own package

Spare-parts inventory is defined by part numbers, vehicle compatibility, OEM/aftermarket status, import batches, warranty/returns or core exchange and obsolescence. It therefore needs a different stock master from a hardware shop even though both can share the same accounting, VAT, payroll and inventory infrastructure.

Vehicle-component rules are product-specific. EU type-approval and general-safety legislation, and detailed rules such as the replacement-braking-components regulation, cannot be collapsed into one universal certification statement. Batteries, tyres, waste, safety-critical components and private-label imports must be handled through trigger-based add-ons.

### Recurring entry scope

- books, bank/card/POS, supplier and VAT reconciliation;
- payroll/FSS support;
- part number, vehicle compatibility and OEM/aftermarket master;
- purchase/import-batch landed cost;
- warranty, return, core-exchange and obsolete-stock register; and
- Article 12/VIES/Intrastat/EORI/customs trigger register.

### Entry limits and fee

- one branch;
- up to 100 monthly finance entries;
- up to 1,000 active part numbers;
- up to five employees;
- no physical stock count or customs declaration;
- setup from **EUR 300**; recurring from **EUR 500 per month**.

### Add-ons and boundaries

Add-ons include customs/EORI readiness, VIES or Intrastat, multi-branch reporting, garage credit control, battery/tyre/waste or item-specific type-approval evidence, stock counts, inventory finance and annual accounts/tax.

FST may maintain the evidence and reconciliation layer; it must not imply that every item has one certification route or provide a product-approval conclusion without item-level competent review.

Primary sources:

- [Regulation (EU) 2019/2144, consolidated](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02019R2144-20260107)
- [Regulation (EU) 2018/858](https://eur-lex.europa.eu/legal-content/EN/ALL/?uri=CELEX:32018R0858)
- [UN Regulation on replacement braking components](https://eur-lex.europa.eu/eli/reg/2018/1706/oj/eng)

## Package 4 — Engineering Practice & Project Finance Desk

### Why it needs its own package

The controlling object is the contract and project, not the SKU or a generic transaction allowance. The operational records are the engagement, BOQ or scope, job cost, work in progress, advances, variations, certificates, retentions, subcontractors, invoices and collections. Professional warrant routes and contractor licensing are separate controls and must not be blended into a generic compliance claim.

An engineering warrant licenses the individual to practise the engineering profession. The Perit route applies to architects and civil engineers under its own statutory framework. Construction-industry licensing separately covers specified demolition, excavation/piling and construction service activities. The package must record which route applies before any professional or contractor evidence claim is made.

### Recurring entry scope

- books, bank, VAT, payroll/FSS and subcontractor reconciliations;
- contract, scope/BOQ and project register;
- job cost, WIP and forecast-to-complete;
- advances, variations, certificates, retention, billing and collections; and
- monthly project cash-runway and management view.

### Entry limits and fee

- one entity;
- up to two active projects;
- up to 75 monthly finance entries;
- up to five employees;
- remote records and no site verification;
- setup from **EUR 400**; recurring from **EUR 650 per month**.

### Add-ons and boundaries

Add-ons include warrant/practice evidence, BCA/CILA contractor-licence readiness, a tender pack, bid model, contract review, professional-indemnity/insurance evidence, finance-readiness and annual accounts/tax.

FST may prepare registers, finance controls and evidence packs. Reserved design, certification, statutory submission, permit or licence decision, valuation, legal opinion and professional sign-off remain with the warranted or otherwise competent person.

Primary sources:

- [Servizz.gov engineering warrant](https://www.servizz.gov.mt/en/Services/web-00747)
- [Inġiniera Act](https://legislation.mt/eli/act/1988/7/eng)
- [Kamra tal-Periti warrant route](https://kamratalperiti.org/profession/how-to-obtain-the-warrant-of-perit/)
- [BCA Construction Industry Licensing Regulations](https://bca.org.mt/wp-content/uploads/2025/01/SL-623.09-Construction-Industry-Licensing-Regulations.pdf)

## Pricing method

The fees are **FST pilot floors**, not market averages and not quotations for a named client. They are calibrated against the existing FST atomic catalogue and the additional recurring sector-control burden:

`entry fee = recurring finance workpacks + volume/SKU/employee/project band + sector-control module - pilot bundle allowance`

| Package | Setup floor | Monthly floor | Main cost driver |
|---|---:|---:|---|
| Pharmacy Control & Compliance Desk | EUR 300 | EUR 550 | batch/expiry and licensed-premises evidence |
| Hardware Stock, VAT & Product Evidence Desk | EUR 250 | EUR 450 | SKU/specification and applicable product evidence |
| Spare Parts Stock & Cross-Border Desk | EUR 300 | EUR 500 | compatibility, landed cost and returns/obsolescence |
| Engineering Practice & Project Finance Desk | EUR 400 | EUR 650 | project/WIP, variations, certificates and retention |

Applicable VAT, official charges, third-party costs, travel, physical counts, historical clean-up, urgent deadlines and professional or authority fees remain excluded. The first ten accepted clients in each sector should be time-tracked; fees and caps should be reset when actual delivery hours, rework and contribution margin are known.

## Funding modules

The packages should expose funding readiness as an add-on rather than imply that ordinary monthly compliance produces credit approval. The Malta Development Bank SME Guarantee Scheme operates through accredited banks and can support eligible loans from EUR 10,000 to EUR 1 million with an 80 per cent guarantee, but the bank's credit decision remains separate. EU-funded SME calls also have scheme-specific windows, eligibility and evidence requirements.

Primary sources:

- [Malta Development Bank SME Guarantee Scheme](https://mdb.org.mt/sme-guarantee-scheme-2/)
- [FONDI SME Enhance](https://fondi.eu/what-funding-is-available/sme-enhance/)
- [Business Enhance](https://fondi.eu/business-enhance/)

## Product and API implications

Recommended public routes:

- `/mt/sectors/pharmacies`
- `/mt/sectors/hardware-shops`
- `/mt/sectors/spare-parts`
- `/mt/sectors/engineering-practices`

Recommended endpoints:

- `GET /api/v1/sector-packages?jurisdiction=mt`
- `GET /api/v1/sector-packages/{slug}?jurisdiction=mt`
- `POST /api/v1/package-scope`
- `POST /api/v1/enquiries` with `packageId`, `packageVersion`, `scopeAnswers`, `addonIds`, `atomicServiceIds` and `quoteStatus`

The package data model should add `vatRoute`, `fiscalReceiptRoute`, `crossBorderRole`, `intrastatViesTrigger`, `eoriTrigger`, `productComplianceRole`, `professionalWarrantGate`, `contractorLicenceGate`, `regulatedProviderGate`, `sourceReviewedAt` and `feeVersion`.

## Evidence and confidence

Official live sources were used for all external regulatory and statistical claims. Local Claire, Matthew and Sofia corpus searches were also run for Malta pharmacy, regulated-profession, product, VAT and finance context; broad retrieval was noisy, so official current sources control this product recommendation.

Confidence is high on the hybrid architecture, high on the need for distinct pharmacy and project-led engineering modules, moderate-to-high on the hardware/spares control separation, and low-to-moderate on the commercial fee floors until pilot evidence exists.

This is a product-architecture report, not legal, tax, accounting, pharmacy, customs, product-conformity or engineering advice to a named business. All official filings, declarations, licences, permits, authority communications, lender decisions and regulated conclusions remain subject to client evidence, responsible-professional review and formal engagement acceptance.
