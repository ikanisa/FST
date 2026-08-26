import { writeFileSync } from 'node:fs';

const generatedAt = '2026-08-26T18:00:00Z';
const sourceNotes = 'reports/malta-sector-package-catalogue/source-notes.md';

const sources = [
  {
    id: 'nso_business_demography_2024',
    label: 'NSO Business Demography 2024',
    href: 'https://nso.gov.mt/business-demography-2024/',
    query: {
      engine: 'duckdb',
      language: 'sql',
      sql: "SELECT * FROM (VALUES ('Wholesale and retail incl. motor repair', 9755, 9050, 0.9277), ('Professional, scientific and technical', 9333, 8917, 0.9554), ('Construction', 6028, 5762, 0.9559), ('Human health and social work', 1615, 1500, 0.9288)) AS t(sector, active_enterprises, micro_enterprises, micro_share)",
      description: 'Reproducible transcription of selected 2024 active-enterprise and micro-enterprise counts from NSO Business Demography 2024.',
      url: 'https://nso.gov.mt/wp-content/uploads/NR-218-2025.pdf',
      executed_at: generatedAt,
      tables_used: ['NSO Business Demography 2024, Table 1'],
      filters: ['Four broad NACE ecosystems selected for context', 'Not treated as counts of the four target niches'],
      metric_definitions: ['micro_share = micro-enterprises divided by active enterprises in the selected broad activity sector']
    }
  },
  {
    id: 'fst_malta_sector_scores',
    label: 'FST Malta sector-design scoring synthesis',
    path: sourceNotes,
    query: {
      engine: 'duckdb',
      language: 'sql',
      sql: "SELECT * FROM (VALUES ('Engineering / construction', 5, 1, 3, 5, 5, 5, 'R5 · I1 · T3 · L5 · F5 · P5', 'Contract, project, WIP, variations, certificates, retention and professional route'), ('Hardware shops', 4, 4, 5, 1, 4, 2, 'R4 · I4 · T5 · L1 · F4 · P2', 'SKU/specification, product evidence, economic-operator role and cross-border triggers'), ('Pharmacies', 5, 5, 4, 5, 4, 1, 'R5 · I5 · T4 · L5 · F4 · P1', 'Batch, expiry, recall and licensed-premises evidence'), ('Spare-parts shops', 4, 5, 5, 1, 4, 2, 'R4 · I5 · T5 · L1 · F4 · P2', 'Part/compatibility, import batch, landed cost, warranty and obsolescence')) AS t(sector, regulatory, inventory, tax_cross_border, licensed_people, funding_evidence, project_contract, pressure_profile, defining_control)",
      description: 'Reproducible sector-design scoring table assembled from the documented 1-to-5 qualitative rubric and official-source review.',
      executed_at: generatedAt,
      tables_used: ['FST Malta sector package source and method notes'],
      metric_definitions: ['Each score runs from 1 (low or occasional package pressure) to 5 (a defining feature that changes package architecture); scores are analytical judgements, not survey measurements']
    }
  },
  {
    id: 'fst_malta_package_blueprints',
    label: 'FST Malta sector package blueprint synthesis',
    path: sourceNotes,
    query: {
      engine: 'duckdb',
      language: 'sql',
      sql: "SELECT * FROM (VALUES (1, 'Pharmacies', 'Pharmacy Control & Compliance Desk', 'Books; bank/card/POS; VAT/fiscal receipts; payroll/FSS; management summary; batch/expiry; recall/return and inspection-evidence registers', '1 premises · 100 finance entries · 750 SKUs · 5 staff', 'EUR 300', 'EUR 550 / month', 'Licence/variation readiness; physical count; cold chain; wholesale/GDP; annual accounts; finance'), (2, 'Engineering / construction', 'Engineering Practice & Project Finance Desk', 'Books; VAT/FSS; project/contract/BOQ register; job cost and WIP; advances, variations, certificates, retention and collections', '1 entity · 2 active projects · 75 entries · 5 staff', 'EUR 400', 'EUR 650 / month', 'Warrant/licence evidence; tender pack; bid model; contract review; insurance; finance; annual accounts'), (3, 'Hardware shops', 'Hardware Stock, VAT & Product Evidence Desk', 'Books; bank/card/POS; VAT/FSS; SKU/UOM/specification; stock/margin; supplier and applicable product evidence; cross-border triggers', '1 branch · 100 finance entries · 750 SKUs · 5 staff', 'EUR 250', 'EUR 450 / month', 'EORI/customs readiness; VIES/Intrastat; stock count; multi-branch; tender supply; finance'), (4, 'Spare-parts shops', 'Spare Parts Stock & Cross-Border Desk', 'Books; bank/card/POS; VAT/FSS; part/compatibility master; landed cost; warranty/returns/core exchange; obsolete stock; cross-border triggers', '1 branch · 100 finance entries · 1,000 parts · 5 staff', 'EUR 300', 'EUR 500 / month', 'EORI/customs readiness; VIES/Intrastat; item-rule evidence; stock count; multi-branch; finance')) AS t(priority, sector, package, entry_scope, entry_limits, setup_floor, monthly_floor, event_add_ons)",
      description: 'Reproducible extraction of the four proposed Malta pilot package rows.',
      executed_at: generatedAt,
      tables_used: ['FST Malta sector package source and method notes', 'Existing FST atomic service catalogue'],
      filters: ['Pilot scopes assume one entity and one location unless stated, clean digital records and remote delivery']
    }
  },
  {
    id: 'fst_malta_pricing_basis',
    label: 'FST Malta pilot price calibration',
    path: sourceNotes,
    query: {
      engine: 'duckdb',
      language: 'sql',
      sql: "SELECT * FROM (VALUES ('Pharmacy Control & Compliance Desk', 300, 550, 'Licensed-premises, batch/expiry and recall evidence'), ('Hardware Stock, VAT & Product Evidence Desk', 250, 450, 'SKU/specification, stock and applicable product evidence'), ('Spare Parts Stock & Cross-Border Desk', 300, 500, 'Compatibility, landed cost, returns and obsolescence'), ('Engineering Practice & Project Finance Desk', 400, 650, 'Project/WIP, variations, certificates and retention')) AS t(package, setup_eur, monthly_eur, sector_control_driver)",
      description: 'Pilot commercial floors calibrated to FST atomic workpacks plus the additional sector-control module.',
      executed_at: generatedAt,
      tables_used: ['FST Malta sector package source and method notes', 'lib/service-catalogue.ts'],
      metric_definitions: ['setup_eur and monthly_eur are recommended FST pilot floors, not observed market averages']
    }
  },
  {
    id: 'fst_malta_backend_model',
    label: 'FST hybrid catalogue architecture synthesis',
    path: sourceNotes,
    query: {
      engine: 'duckdb',
      language: 'sql',
      sql: "SELECT * FROM (VALUES (1, 'Atomic workpack', 'Reusable tax, accounting, payroll, funding or control unit', 'serviceId, jurisdiction, scope, unit, fee, regulated flag, source review', 'Usually presented as a package inclusion or add-on'), (2, 'Sector control module', 'Captures the stock, product-evidence or project records that make the sector distinct', 'stock/project master, evidence register, reconciliation rules, review triggers', 'Explains sector fit without duplicating common services'), (3, 'Package version', 'Curates workpacks into one bounded commercial offer', 'included ids, limits, eligibility, add-ons, exclusions, price bands, version', 'One package card with visible scope and fee'), (4, 'Scope response', 'Produces an indicative fit from non-sensitive answers', 'location, volume, SKU/project, staff, VAT/POS, cross-border, record condition', 'Recommendation, assumptions and referral reasons'), (5, 'Engagement gate', 'Separates catalogue interest from professional acceptance', 'conflict, competence, evidence, consent, final quote, approval', 'No automatic filing, licence, product, credit or regulated conclusion')) AS t(layer_order, layer, purpose, key_fields, public_behavior)",
      description: 'Reproducible extraction of the recommended five-layer hybrid catalogue architecture.',
      executed_at: generatedAt,
      tables_used: ['FST Malta sector package source and method notes', 'Existing FST atomic service catalogue']
    }
  }
];

const sectorContext = [
  { sector: 'Wholesale and retail incl. motor repair', active_enterprises: 9755, micro_enterprises: 9050, micro_share: 0.9277 },
  { sector: 'Professional, scientific and technical', active_enterprises: 9333, micro_enterprises: 8917, micro_share: 0.9554 },
  { sector: 'Construction', active_enterprises: 6028, micro_enterprises: 5762, micro_share: 0.9559 },
  { sector: 'Human health and social work', active_enterprises: 1615, micro_enterprises: 1500, micro_share: 0.9288 }
];

const sectorScores = [
  { sector: 'Engineering / construction', regulatory: 5, inventory: 1, tax_cross_border: 3, licensed_people: 5, funding_evidence: 5, project_contract: 5, pressure_profile: 'R5 · I1 · T3 · L5 · F5 · P5', defining_control: 'Contract, project, WIP, variations, certificates, retention and professional route' },
  { sector: 'Hardware shops', regulatory: 4, inventory: 4, tax_cross_border: 5, licensed_people: 1, funding_evidence: 4, project_contract: 2, pressure_profile: 'R4 · I4 · T5 · L1 · F4 · P2', defining_control: 'SKU/specification, product evidence, economic-operator role and cross-border triggers' },
  { sector: 'Pharmacies', regulatory: 5, inventory: 5, tax_cross_border: 4, licensed_people: 5, funding_evidence: 4, project_contract: 1, pressure_profile: 'R5 · I5 · T4 · L5 · F4 · P1', defining_control: 'Batch, expiry, recall and licensed-premises evidence' },
  { sector: 'Spare-parts shops', regulatory: 4, inventory: 5, tax_cross_border: 5, licensed_people: 1, funding_evidence: 4, project_contract: 2, pressure_profile: 'R4 · I5 · T5 · L1 · F4 · P2', defining_control: 'Part/compatibility, import batch, landed cost, warranty and obsolescence' }
];

const packageBlueprints = [
  { priority: 1, sector: 'Pharmacies', package: 'Pharmacy Control & Compliance Desk', entry_scope: 'Books; bank/card/POS; VAT/fiscal receipts; payroll/FSS; management summary; batch/expiry; recall/return and inspection-evidence registers', entry_limits: '1 premises · 100 finance entries · 750 SKUs · 5 staff', setup_floor: 'EUR 300', monthly_floor: 'EUR 550 / month', event_add_ons: 'Licence/variation readiness; physical count; cold chain; wholesale/GDP; annual accounts; finance' },
  { priority: 2, sector: 'Engineering / construction', package: 'Engineering Practice & Project Finance Desk', entry_scope: 'Books; VAT/FSS; project/contract/BOQ register; job cost and WIP; advances, variations, certificates, retention and collections', entry_limits: '1 entity · 2 active projects · 75 entries · 5 staff', setup_floor: 'EUR 400', monthly_floor: 'EUR 650 / month', event_add_ons: 'Warrant/licence evidence; tender pack; bid model; contract review; insurance; finance; annual accounts' },
  { priority: 3, sector: 'Hardware shops', package: 'Hardware Stock, VAT & Product Evidence Desk', entry_scope: 'Books; bank/card/POS; VAT/FSS; SKU/UOM/specification; stock/margin; supplier and applicable product evidence; cross-border triggers', entry_limits: '1 branch · 100 finance entries · 750 SKUs · 5 staff', setup_floor: 'EUR 250', monthly_floor: 'EUR 450 / month', event_add_ons: 'EORI/customs readiness; VIES/Intrastat; stock count; multi-branch; tender supply; finance' },
  { priority: 4, sector: 'Spare-parts shops', package: 'Spare Parts Stock & Cross-Border Desk', entry_scope: 'Books; bank/card/POS; VAT/FSS; part/compatibility master; landed cost; warranty/returns/core exchange; obsolete stock; cross-border triggers', entry_limits: '1 branch · 100 finance entries · 1,000 parts · 5 staff', setup_floor: 'EUR 300', monthly_floor: 'EUR 500 / month', event_add_ons: 'EORI/customs readiness; VIES/Intrastat; item-rule evidence; stock count; multi-branch; finance' }
];

const pricingBasis = [
  { package: 'Pharmacy Control & Compliance Desk', setup_eur: 300, monthly_eur: 550, sector_control_driver: 'Licensed-premises, batch/expiry and recall evidence' },
  { package: 'Hardware Stock, VAT & Product Evidence Desk', setup_eur: 250, monthly_eur: 450, sector_control_driver: 'SKU/specification, stock and applicable product evidence' },
  { package: 'Spare Parts Stock & Cross-Border Desk', setup_eur: 300, monthly_eur: 500, sector_control_driver: 'Compatibility, landed cost, returns and obsolescence' },
  { package: 'Engineering Practice & Project Finance Desk', setup_eur: 400, monthly_eur: 650, sector_control_driver: 'Project/WIP, variations, certificates and retention' }
];

const backendModel = [
  { layer_order: 1, layer: 'Atomic workpack', purpose: 'Reusable tax, accounting, payroll, funding or control unit', key_fields: 'serviceId, jurisdiction, scope, unit, fee, regulated flag, source review', public_behavior: 'Usually presented as a package inclusion or add-on' },
  { layer_order: 2, layer: 'Sector control module', purpose: 'Captures the stock, product-evidence or project records that make the sector distinct', key_fields: 'stock/project master, evidence register, reconciliation rules, review triggers', public_behavior: 'Explains sector fit without duplicating common services' },
  { layer_order: 3, layer: 'Package version', purpose: 'Curates workpacks into one bounded commercial offer', key_fields: 'included ids, limits, eligibility, add-ons, exclusions, price bands, version', public_behavior: 'One package card with visible scope and fee' },
  { layer_order: 4, layer: 'Scope response', purpose: 'Produces an indicative fit from non-sensitive answers', key_fields: 'location, volume, SKU/project, staff, VAT/POS, cross-border, record condition', public_behavior: 'Recommendation, assumptions and referral reasons' },
  { layer_order: 5, layer: 'Engagement gate', purpose: 'Separates catalogue interest from professional acceptance', key_fields: 'conflict, competence, evidence, consent, final quote, approval', public_behavior: 'No automatic filing, licence, product, credit or regulated conclusion' }
];

const artifact = {
  surface: 'report',
  manifest: {
    version: 1,
    surface: 'report',
    title: "Sector Packages for Malta's SMEs",
    description: 'Critical product and architecture report for dedicated catalogue packages serving pharmacies, hardware shops, spare-parts shops and engineering or construction practices.',
    generatedAt,
    sources,
    charts: [
      {
        id: 'active_enterprises_by_ecosystem',
        title: 'Active enterprises in adjacent sector ecosystems',
        subtitle: '2024 broad-sector context; not a count of the four target customer niches',
        type: 'bar',
        dataset: 'sector_context',
        sourceId: 'nso_business_demography_2024',
        encodings: {
          x: { field: 'sector', type: 'ordinal', label: 'Broad activity ecosystem' },
          y: { field: 'active_enterprises', type: 'quantitative', label: 'Active enterprises', format: 'number' },
          tooltip: [
            { field: 'micro_enterprises', type: 'quantitative', label: 'Micro-enterprises' },
            { field: 'micro_share', type: 'quantitative', label: 'Micro share', format: 'percent' }
          ]
        },
        yAxisTitle: 'Active enterprises',
        valueFormat: 'number',
        layout: 'full'
      }
    ],
    tables: [
      {
        id: 'sector_context_table',
        title: 'Selected broad-sector context',
        subtitle: 'NSO Business Demography 2024; broad NACE proxies only',
        dataset: 'sector_context',
        sourceId: 'nso_business_demography_2024',
        defaultSort: { field: 'active_enterprises', direction: 'desc' },
        columns: [
          { field: 'sector', label: 'Broad activity ecosystem', type: 'text' },
          { field: 'active_enterprises', label: 'Active enterprises', type: 'number', format: 'number' },
          { field: 'micro_enterprises', label: 'Micro-enterprises', type: 'number', format: 'number' },
          { field: 'micro_share', label: 'Micro share', type: 'percent', format: 'percent' }
        ],
        layout: 'full'
      },
      {
        id: 'sector_design_pressure',
        title: 'Sector design pressure',
        subtitle: 'Analytical scores from 1 (low) to 5 (defining); not survey data',
        dataset: 'sector_scores',
        sourceId: 'fst_malta_sector_scores',
        defaultSort: { field: 'sector', direction: 'asc' },
        columns: [
          { field: 'sector', label: 'Sector', type: 'text' },
          { field: 'pressure_profile', label: 'Pressure profile', type: 'text' },
          { field: 'defining_control', label: 'Package-defining control', type: 'text' }
        ],
        layout: 'full'
      },
      {
        id: 'package_blueprints',
        title: 'Recommended one-package menu',
        subtitle: 'Pilot entry scopes; one entity and one location unless stated',
        dataset: 'package_blueprints',
        sourceId: 'fst_malta_package_blueprints',
        defaultSort: { field: 'package', direction: 'asc' },
        columns: [
          { field: 'package', label: 'One-package menu', type: 'text' },
          { field: 'entry_scope', label: 'Included recurring scope', type: 'text' },
          { field: 'entry_limits', label: 'Pilot limits', type: 'text' },
          { field: 'monthly_floor', label: 'Starting fee', type: 'text' },
          { field: 'event_add_ons', label: 'Event add-ons', type: 'text' }
        ],
        layout: 'full',
        density: 'dense'
      },
      {
        id: 'pricing_basis',
        title: 'Pilot fee calibration',
        subtitle: 'FST commercial floors, not observed market averages; applicable VAT and external costs excluded',
        dataset: 'pricing_basis',
        sourceId: 'fst_malta_pricing_basis',
        defaultSort: { field: 'monthly_eur', direction: 'asc' },
        columns: [
          { field: 'package', label: 'Package', type: 'text' },
          { field: 'setup_eur', label: 'Setup floor', type: 'currency', format: 'EUR' },
          { field: 'monthly_eur', label: 'Monthly floor', type: 'currency', format: 'EUR' },
          { field: 'sector_control_driver', label: 'Sector-control burden', type: 'text' }
        ],
        layout: 'full'
      },
      {
        id: 'backend_model',
        title: 'Backend package model',
        subtitle: 'Keep reusable workpacks canonical; let the sector page curate them',
        dataset: 'backend_model',
        sourceId: 'fst_malta_backend_model',
        defaultSort: { field: 'layer', direction: 'asc' },
        columns: [
          { field: 'layer', label: 'Layer', type: 'text' },
          { field: 'purpose', label: 'Purpose', type: 'text' },
          { field: 'key_fields', label: 'Key fields', type: 'text' },
          { field: 'public_behavior', label: 'Public behaviour', type: 'text' }
        ],
        layout: 'full'
      }
    ],
    blocks: [
      { id: 'title', type: 'markdown', body: "# Sector Packages for Malta's SMEs" },
      { id: 'executive_summary', type: 'markdown', body: "## Executive Summary\n\n- **Build four recognisable sector packages on one canonical catalogue.** The public offer should speak in the owner's operating language; the backend should assemble versioned accounting, VAT, payroll, corporate, funding and control workpacks.\n- **Prioritise pharmacy and engineering/construction.** Their regulated objects are most distinctive: licensed premises and medicine custody for pharmacy; warranted practice, contractor licensing, contracts and project finance for engineering/construction.\n- **Reuse an inventory engine for hardware and spare parts, but keep separate masters.** Hardware needs units/specifications and applicable product evidence; spare parts needs part/vehicle compatibility, import batches, warranty/returns and obsolescence.\n- **Use visible caps and professional gates.** No package should silently include physical counts, customs declarations, licence applications, reserved professional work, authority filings or funding approval.\n- **Treat EUR 450–650 monthly fees as pilot floors, not market evidence.** Time-track ten accepted clients per sector and reset prices and caps using actual delivery cost and contribution." },
      { id: 'market_context', type: 'markdown', sourceId: 'nso_business_demography_2024', body: "## The addressable ecosystems are substantial—but overwhelmingly micro\n\nThe NSO counted **60,856 active enterprises in 2024**, including **57,228 micro-enterprises (94.0%)**. Wholesale/retail represented **16.0%**, professional/scientific/technical **15.3%**, and construction **9.9%** of active enterprises; sole proprietors and partnerships represented **73.2%**. This supports a simple one-package menu with transparent limits. It does not support unlimited retainers or a market-size claim based on broad NACE categories." },
      { id: 'market_chart', type: 'chart', chartId: 'active_enterprises_by_ecosystem', layout: 'full' },
      { id: 'market_table', type: 'table', tableId: 'sector_context_table', layout: 'full' },
      { id: 'architecture', type: 'markdown', body: "## Best architecture: one engine, four sector facades\n\nA separate catalogue for each sector would duplicate common VAT, payroll, accounting, corporate and funding logic. A single generic catalogue leaves the owner to translate professional jargon into their operating reality. The recommended hybrid keeps atomic workpacks canonical, adds a sector-control module, curates a versioned package, produces a non-sensitive scope response and ends with an engagement gate.\n\nJurisdiction should remain routing and configuration logic except where a visible legal label changes meaning. The sector page should sell a controlled result, not repeat country names." },
      { id: 'scores', type: 'table', tableId: 'sector_design_pressure', layout: 'full' },
      { id: 'pharmacy', type: 'markdown', body: "## Pharmacy: licensed-premises and medicine-custody controls\n\nA pharmacy package must go beyond retail bookkeeping. Its differentiators are batch and expiry visibility, near-expiry exposure, returns/recalls, licensed-premises and inspection evidence, responsible-person coverage and the boundary between retail pharmacy and wholesale distribution. The VAT matrix must be SKU-aware rather than assume every pharmacy product has one rate.\n\n**Boundary:** FST can prepare reconciliations, registers and evidence packs. Dispensing judgement, product release, licence/variation outcomes, wholesale authorisation, inspection conclusions and regulator submissions remain with the authorised business and responsible professional." },
      { id: 'hardware', type: 'markdown', body: "## Hardware: stock economics plus role-specific product evidence\n\nThe package needs units of measure, brand/specification, supplier provenance, slow stock, shrinkage, family margin and cross-border triggers. For products within an applicable construction-product or other conformity route, it should index markings, declarations and instructions and flag gaps.\n\n**Boundary:** not every hardware SKU requires CE marking or a Declaration of Performance. Applicability depends on the product, specification or assessment route, and whether the business is retailer, distributor, importer or private-label manufacturer. FST does not certify conformity through the catalogue." },
      { id: 'spares', type: 'markdown', body: "## Spare parts: compatibility, import batches and obsolescence\n\nSpare-parts inventory requires part number, vehicle compatibility, OEM/aftermarket status, landed cost, warranty/returns or core exchange and obsolescence. Article 12, VIES, Intrastat, EORI and customs triggers must be first-class intake fields where cross-border activity exists.\n\n**Boundary:** component rules are item-specific. Batteries, tyres, waste and safety-critical parts require trigger-based review; the package must never imply that all parts share one certification route." },
      { id: 'engineering', type: 'markdown', body: "## Engineering and construction: organise around contracts and projects\n\nThe package's primary unit is an active project. Its control spine is the engagement, scope/BOQ, job cost, WIP, advances, variations, certificates, retention, invoices and collections. It must distinguish the engineering-warrant route, the Perit route and contractor licensing before claiming professional or licence readiness.\n\n**Boundary:** FST can prepare finance controls and evidence registers. Reserved design, certification, statutory submission, permit/licence decisions, valuations, legal opinions and professional sign-off remain with the competent warranted or licensed person." },
      { id: 'package_table', type: 'table', tableId: 'package_blueprints', layout: 'full' },
      { id: 'pricing', type: 'markdown', body: "## Price the control burden, not the label\n\nUse **recurring finance workpacks + volume/SKU/employee/project band + sector-control module − pilot bundle allowance**. The proposed monthly floors are **EUR 550 pharmacy**, **EUR 450 hardware**, **EUR 500 spare parts** and **EUR 650 engineering/construction**, with setup floors of EUR 250–400. These are FST pilot prices—not observed market averages.\n\nApplicable VAT, official/professional fees, third-party costs, travel, physical stock counts, historical clean-up, urgent deadlines and authority work remain excluded. Route volume or complexity beyond the published caps to manual scope and quote." },
      { id: 'pricing_table', type: 'table', tableId: 'pricing_basis', layout: 'full' },
      { id: 'tax_controls', type: 'markdown', body: "## Malta-specific backend controls\n\nThe package version must store `vatRoute`, `vatRateMatrixStatus`, `fiscalReceiptRoute`, `crossBorderRole`, Article 12/VIES/Intrastat/EORI triggers, `productComplianceRole`, `professionalWarrantGate`, `contractorLicenceGate`, `regulatedProviderGate`, `sourceReviewedAt` and `feeVersion`.\n\nDo not hard-code the default 18% VAT rate across the catalogue. Article 10/11/12 routes, reduced or zero-rate treatments, fiscal-receipt setup and cross-border obligations depend on the facts. Thresholds and filing routes require a current source-review date." },
      { id: 'backend_table', type: 'table', tableId: 'backend_model', layout: 'full' },
      { id: 'api', type: 'markdown', body: "## Website and API design\n\nUse routes such as `/mt/sectors/pharmacies`, `/mt/sectors/hardware-shops`, `/mt/sectors/spare-parts` and `/mt/sectors/engineering-practices`. Country selection remains automatic routing logic; public copy should use a country name only when legal or service meaning requires it.\n\nRecommended endpoints:\n\n- `GET /api/v1/sector-packages?jurisdiction=mt` — public summaries and version metadata.\n- `GET /api/v1/sector-packages/{slug}?jurisdiction=mt` — inclusions, limits, evidence checklist, add-ons and price rules.\n- `POST /api/v1/package-scope` — an indicative fit result from non-sensitive answers, never an acceptance or regulated conclusion.\n- Extend `POST /api/v1/enquiries` with `packageId`, `packageVersion`, `scopeAnswers`, `addonIds`, `atomicServiceIds` and `quoteStatus`." },
      { id: 'next_steps', type: 'markdown', body: "## Recommended next steps\n\n1. Implement the package schema and common scope engine.\n2. Pilot pharmacy first, including SKU VAT mapping, expiry and inspection-evidence controls.\n3. Build the shared retail inventory engine, then configure distinct hardware and spare-parts masters.\n4. Build engineering independently around projects, contracts and professional/licence gates.\n5. Pilot with ten accepted businesses per sector; measure completeness, hours, rework, add-ons and contribution.\n6. Publish only after named Malta tax, legal/regulatory and finance owners approve source dates, wording, exclusions, caps and fees." },
      { id: 'questions', type: 'markdown', body: "## Further questions\n\n- Which of the four sectors already appears in FST enquiries, and what are their actual transaction, SKU, staff and project distributions?\n- Can FST reconcile POS/inventory data without manual re-entry, and which systems dominate each sector?\n- Which exact activities will FST deliver internally and which require a pharmacist, warranted engineer/Perit, lawyer, auditor, customs representative or other competent professional?\n- What gross-contribution target should each package meet before it leaves pilot status?\n- Which personal, prescription, employee or commercially sensitive data should be explicitly excluded from web intake?" },
      { id: 'caveats', type: 'markdown', body: "## Caveats and assumptions\n\nThis is a product-architecture recommendation, not a market-size forecast or advice to a named business. No FST enquiry dataset, customer interviews, delivery-time ledger, willingness-to-pay study or client-level financial data was available. Broad NACE categories do not map cleanly to the four target niches. Product and professional rules are fact-specific; funding criteria and calls change.\n\nConfidence is **high** on the hybrid architecture and sector separation, **moderate-to-high** on package composition and **low-to-moderate** on fee floors until pilot evidence exists. All filings, payments, declarations, licences, permits, authority communications, lender decisions and regulated conclusions remain outside automatic website acceptance." }
    ]
  },
  snapshot: {
    version: 1,
    generatedAt,
    status: 'ready',
    datasets: {
      sector_context: sectorContext,
      sector_scores: sectorScores,
      package_blueprints: packageBlueprints,
      pricing_basis: pricingBasis,
      backend_model: backendModel
    }
  },
  sources: [
    { id: 'nso_business_demography_2024', label: 'NSO Business Demography 2024', href: 'https://nso.gov.mt/business-demography-2024/' },
    { id: 'mtca_vat_rates', label: 'MTCA VAT rates', href: 'https://mtca.gov.mt/business-tax/vat1/vat-compliance/vat-rates' },
    { id: 'mtca_vat_registration', label: 'MTCA VAT registration routes', href: 'https://mtca.gov.mt/docs/default-source/documents/personal-tax/self-employed/registration/06-small-undertakings-registered-as-exemptv2.pdf' },
    { id: 'mtca_fiscal_receipts', label: 'MTCA fiscal receipts and tax invoices', href: 'https://mtca.gov.mt/business-tax/vat1/vat-compliance/fiscal-receipts--invoices-and--credit-notes/fiscal-receipts--invoices-and-credit-notes' },
    { id: 'mtca_fss', label: 'MTCA Final Settlement System', href: 'https://mtca.gov.mt/business-tax/fss-system' },
    { id: 'intrastat', label: 'NSO Intrastat', href: 'https://nso.gov.mt/intrastat/' },
    { id: 'medicines_authority_pharmacies', label: 'Medicines Authority pharmacies', href: 'https://medicinesauthority.gov.mt/pharmacies' },
    { id: 'medicines_authority_gdp', label: 'Medicines Authority GDP', href: 'https://medicinesauthority.gov.mt/gooddistributionpractice' },
    { id: 'eu_cpr_2024', label: 'Regulation (EU) 2024/3110', href: 'https://eur-lex.europa.eu/eli/reg/2024/3110/oj' },
    { id: 'eu_vehicle_rules', label: 'EU motor-vehicle general safety and type approval', href: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02019R2144-20260107' },
    { id: 'engineering_warrant', label: 'Servizz.gov engineering warrant', href: 'https://www.servizz.gov.mt/en/Services/web-00747' },
    { id: 'bca_licensing', label: 'BCA Construction Industry Licensing Regulations', href: 'https://bca.org.mt/wp-content/uploads/2025/01/SL-623.09-Construction-Industry-Licensing-Regulations.pdf' },
    { id: 'mdb_scheme', label: 'Malta Development Bank SME Guarantee Scheme', href: 'https://mdb.org.mt/sme-guarantee-scheme-2/' },
    { id: 'fst_malta_synthesis', label: 'FST Malta sector package source and method notes', path: sourceNotes },
    { id: 'fst_atomic_catalogue', label: 'Existing FST atomic service catalogue', path: 'lib/service-catalogue.ts' }
  ],
  package_info: {
    root: 'reports/malta-sector-package-catalogue',
    manifestPath: 'reports/malta-sector-package-catalogue/artifact.json',
    snapshotPath: 'reports/malta-sector-package-catalogue/artifact.json'
  }
};

writeFileSync(new URL('./artifact.json', import.meta.url), `${JSON.stringify(artifact, null, 2)}\n`);
