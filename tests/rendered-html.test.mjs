import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const root = path.resolve(new URL("..", import.meta.url).pathname);

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

async function post(pathname, payload, bindings = {}, headers = {}) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}-post`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      method: "POST",
      headers: { accept: "application/json", "content-type": "application/json", ...headers },
      body: JSON.stringify(payload),
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) }, ...bindings },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

function gitBlobId(buffer) {
  return createHash("sha1")
    .update(Buffer.from(`blob ${buffer.length}\0`))
    .update(buffer)
    .digest("hex");
}

const kmfincoPublicBlobIds = new Set(`
004145cddf3f9db91b57b9cb596683c8eb420862 009ed83a8d5396e491b40c2109fa13cd6b660df8
03e82d4149617e300564381d104a9c8951b236c5 0784ac1bf52ade933fd190a656fa93215a500b76
12a734c1cff94b7f9e8ec16e9f721297db2c85be 12b4e436a4d091997a9085be022f98a5dedc1c24
181054354a8a2a127e92e16867d780ebf95242b5 1b874c1199ce1d7e57efe3981305f2c767f02d8f
26c2ece11eac00dba1805594cf57884214219161 2b52fa8307c142e0ea30ee8518d78d027c978f2c
33828147c1bfe1ed2c34f92bcd127fe2289a6cc4 385f5f8afbcfa9485dc392ae0d3e21ebe1987811
3b30f015def45eba680364588d731b3ffcb16149 3cd9ac5d0b5999ec5ba612c722cc2ecebe8287b9
4020ae3fbe5562dcc102fe0d53b6c3da4351d3a2 470ca89bf2bd678f67004d57c9854aa331813e2a
47efdd89e2ac7a91720a2c5abbda06802940baa3 49e589969444d1f9e9d297069714e37308d8e2d6
4e162afa36c0f925d5fae239c26e5bff22b17e4e 4f6424b84b8bd2f5c08604ae40df203af107cd59
4f951a6704f9d899d32a4ebe70558737ea2416ed 5598b8f94753d72ea2ed803f224541a75476e817
567f17b0d7c7fb662c16d4357dd74830caf2dccb 59e6c9ca52832e142045a386bde982b967c5e339
5ea20942d0967a664b1ef622c0ae737073ebbbf9 5eed4df4c72038ea9274a44ded472e5492699254
66421987faf82daa35bbaac66758c1fa19e1a8a0 678181f75117840da5d96a9b76e043d92d9a460e
69e4db24a9d6e3d048f8097cfe450c6d0feabddf 6e564bae3ed0e0afec6d55ce8faaeb45dc4217fa
75f09ae0efc131099c62af31ef2b49af6d4988a1 7baf99fb177c17e7bf9bbda42efe968e4ce4b25e
7d1e57487c66da7c719ea6128154244b27aac4e6 83c9055e1a1f6b16cf2296c064a27aed6bd76034
8ac81b4533d459e699b45d95782779d57900cf27 8c427a9fa51a337d3fff2c2093a4daa57eeb1d6e
8db9fd484be9f394b327ddf644b44a06cd9a67e7 8dd448bd03a20454af6a5bf6aec8cc97c81766b8
938b73bfb1758eebe76868f262de192ad5be8aef 964786740e5f76fddff9e18907cf8ad869070ec1
a490c6dd1c1e69dff2c5619112ff1fd6883b38d4 a99a38aef3435a9d902db464541264e080388324
afbeb6ee2809f78ce1f2a38271dc2a879b768c0c b176a6f910497d20648f835c6166a3713b5a2ada
b2b2a44f6ebc70c450043c05a002e7a93ba5d651 b52c53d39bce63dd7694f27dcd91621f52cc5327
b90b1aae9326657333852ae54e79a37f761965d0 c19ccc8e06ba06a8ca951c01f60e9669e61ff9fd
c76339dca164224cfb44550e747f8bcee485d620 ca747cb66b233fedec5ff0c84f97bb4631c05dbf
cc9241dc3d86170f17cc1128c2d8dff0fa0d1755 d8221179fb2b65c7e504775c8265d9f8ff9400a3
dd0cb2fc213af4a497c2f15667cc4dc401749b38 e0798004a3e6efe33a7ebd4c2dc96c956af12af4
e586c52689d33a69ba259d30ebbc064179e146a0 e80a709f6000405e0bc5c31db3b61889202c6c44
f02816b92852b270976c6aa5a0ae75045ffff24b
`.trim().split(/\s+/));

test("renders the new FST identity, navigation and service-category model", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>FST \| Make the next move workable<\/title>/i);
  assert.match(html, /Turn ambition into an executable plan\./);
  assert.match(html, /Specialist services\./);
  for (const label of [
    "Management Advisory, Risk &amp; Controls",
    "Audit &amp; Assurance",
    "Taxation",
    "Accounting &amp; Financial Reporting",
    "Corporate &amp; Administrative Services",
    "Loan &amp; Funding Application Support",
  ]) assert.match(html, new RegExp(label, "i"));
  assert.match(html, /href="\/book"[^>]*>Book a Meeting</i);
  assert.match(html, /Services/);
  assert.match(html, /Organisations/);
  assert.match(html, /Our Approach/);
  assert.match(html, /Insights/);
  assert.match(html, /AI Agent Team/);
  assert.match(html, /src="\/brand\/fst-logo\.svg"/);
  assert.match(html, /href="\/insights"/i);
  assert.match(html, /src="\/fst-hero\.webp"/);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
});

test("does not expose removed practices or inherited KMFINCO language", async () => {
  const routes = ["/", "/services", "/about", "/ai-agent-team", "/ai-agent-team/patrick", "/ai-agent-team/sofia", "/ai-agent-team/matthew", "/ai-agent-team/claire", "/ai-agent-team/emma", "/who-we-work-with", "/contact"];
  const forbidden = /KMFINCO|K Mi|Investment &amp; Family Office|Fiduciary|Clarity for what comes next|Close enough to understand|Advice shaped around your reality|Useful thinking for consequential decisions/i;
  for (const pathname of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, `${pathname} should render`);
    assert.doesNotMatch(await response.text(), forbidden, `${pathname} should be brand-separated`);
  }
});

test("honours the annotated homepage copy requirements", async () => {
  const html = await (await render("/")).text();
  assert.match(html, /href="\/book"[^>]*>Book a Meeting</i);
  assert.match(html, /Specialist services\./i);
  assert.doesNotMatch(html, /\bdisciplines?\b/i);
  assert.doesNotMatch(html, /One working plan\./i);
  assert.doesNotMatch(html, /expertise-card-label/i);
  assert.doesNotMatch(html, /Business Planning &amp; Finance Applications|Funding Application Services/i);
  assert.doesNotMatch(html, /Advisory\s*(?:<[^>]+>\s*)*·\s*(?:<[^>]+>\s*)*Finance\s*(?:<[^>]+>\s*)*·\s*(?:<[^>]+>\s*)*Applications/i);
});

test("avoids numeric framing in public content labels", async () => {
  const routes = ["/", "/services", "/about", "/ai-agent-team", "/who-we-work-with", "/contact"];
  const forbiddenLabels = /Six coordinated workstreams|Three settings where connected support matters|One question\. Every relevant discipline|Reserve a focused 45 minutes/i;
  for (const pathname of routes) {
    const html = await (await render(pathname)).text();
    assert.doesNotMatch(html, forbiddenLabels, `${pathname} should use descriptive rather than numeric framing`);
  }
});

test("uses direct service labels on the services index", async () => {
  const html = await (await render("/services")).text();
  assert.match(html, /Audit &amp; Assurance/i);
  assert.match(html, /Taxation/i);
  assert.match(html, /Loan &amp; Funding Application Support/i);
  assert.match(html, /href="\/services\/catalogue"[^>]*>Browse the Service Catalogue</i);
  assert.doesNotMatch(html, /Six coordinated workstreams|Tax &amp; VAT|Business Planning &amp; Finance Applications|Business Planning &amp; Loan Application Support|Funding Application Services/i);
});

test("publishes a searchable multi-service catalogue with indicative prices and professional safeguards", async () => {
  const response = await render("/services/catalogue");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Service Catalogue &amp; Indicative Fees \| FST/i);
  assert.match(html, /Choose the work\. See the starting fee\. Build one request\./i);
  assert.match(html, /Efficient by design/i);
  assert.doesNotMatch(html, /≈50% less|roughly half/i);
  for (const category of [
    "Audit & assurance",
    "Accounting & reporting",
    "Tax, VAT & payroll",
    "Corporate administration",
    "Management, risk & controls",
    "Loans & funding",
    "Legal & contract support",
  ]) assert.match(html, new RegExp(category, "i"));
  for (const service of [
    "Statutory financial statement audit",
    "Internal audit health check",
    "Monthly bookkeeping",
    "VAT return and reconciliation",
    "Monthly payroll processing",
    "Malta company formation",
    "Business-plan preparation",
    "Grant application drafting",
    "Contract drafting",
    "Legal document drafting",
    "Contract review",
    "Privacy and cookie policy",
  ]) assert.match(html, new RegExp(service, "i"));
  assert.match(html, /From €100/);
  assert.match(html, />Clear fees</);
  assert.doesNotMatch(html, /Clear [“"]From[”"] fees/);
  assert.match(html, /Free scope check/i);
  assert.match(html, /Your FST request/i);
  assert.match(html, /Your request is empty/i);
  assert.match(html, /required Malta authorisation|appropriately authorised Malta auditor|appropriately warranted legal professional/i);
  assert.doesNotMatch(html, /50%|roughly half|market provider/i);
  assert.match(html, /contracting provider and responsible professional are confirmed/i);
  const cartSource = await readFile(path.join(root, "app/components/ServiceCatalogue.tsx"), "utf8");
  assert.match(cartSource, /Send request on WhatsApp/);
  assert.match(cartSource, /wa\.me\/35677186193|serviceOrderWhatsappUrl/);
  assert.match(cartSource, /Indicative starting total/);
  assert.doesNotMatch(cartSource, /api\/service-order|<form|mailto:|name="email"|emailed directly/i);
  assert.doesNotMatch(cartSource, /catalogue-popular|catalogue-regulated|>Popular<|>Reviewed</);
  assert.doesNotMatch(html, /FST service catalogue <span>|AI-enabled professional delivery/i);
});

test("uses explicit loan and funding application support wording across public routes", async () => {
  const routes = ["/", "/services", "/who-we-work-with", "/services/loan-funding-application-support"];
  const combined = (await Promise.all(routes.map(async (pathname) => (await (await render(pathname)).text())))).join("\n");
  assert.match(combined, /Loan &amp; Funding Application Support/i);
  assert.doesNotMatch(combined, /Business Planning &amp; Loan Support|Business Planning &amp; Loan Application Support|Funding &amp; Grant Support|Budgets, projections and loan support/i);
});

test("covers Malta taxation beyond VAT and corporate income tax", async () => {
  const index = await (await render("/services")).text();
  const detail = await (await render("/services/taxation")).text();
  assert.match(index, /Complete Malta tax support/i);
  for (const label of [
    "Corporate income tax",
    "Personal &amp; self-employed income tax",
    "VAT returns &amp; reconciliations",
    "Payroll tax, FSS &amp; social security",
    "Withholding tax &amp; cross-border payments",
    "Property, capital gains &amp; transfer taxes",
    "International tax &amp; transfer pricing",
    "Provisional tax &amp; payment planning",
    "Tax refunds, credits &amp; shareholder refunds",
    "MTCA queries, reviews &amp; objections",
  ]) assert.match(detail, new RegExp(label, "i"));
  assert.doesNotMatch(index, /Malta VAT and corporate tax work/i);
});

test("keeps business planning under management advisory and financing applications separate", async () => {
  const management = await (await render("/services/management-consulting")).text();
  const finance = await (await render("/services/loan-funding-application-support")).text();
  assert.match(management, /Business planning &amp; feasibility/i);
  assert.match(management, /Business-plan preparation/i);
  assert.match(management, /Business-plan review/i);
  assert.match(management, /Budgeting, projections &amp; scenarios/i);
  assert.match(finance, /Loan &amp; Funding Application Support/i);
  assert.match(finance, /Loan application forms/i);
  assert.match(finance, /Lender financial schedules/i);
  assert.match(finance, /Funding eligibility &amp; project design/i);
  assert.doesNotMatch(finance, /Business-plan preparation|Business-plan review/i);
});

test("explicitly serves start-ups, self-employed professionals, SMEs and NGOs", async () => {
  const html = await (await render("/who-we-work-with")).text();
  for (const label of [
    "Start-ups &amp; self-employed professionals",
    "SMEs &amp; growing businesses",
    "Established businesses &amp; finance teams",
    "NGOs, voluntary &amp; community organisations",
    "International programmes &amp; institutions",
  ]) assert.match(html, new RegExp(label, "i"));
});

test("publishes the FST approach and substantive field notes on direct routes", async () => {
  const about = await (await render("/about")).text();
  assert.match(about, /The FST approach/i);
  assert.match(about, /Working notes for decisions in motion/i);
  assert.match(about, /What a useful internal-control review should leave behind/i);
  assert.match(about, /Building a tax working file that reconciles before filing day/i);
  assert.match(about, /href="\/insights\/useful-internal-control-review"/i);

  const insights = await render("/insights");
  assert.equal(insights.status, 200);
  const index = await insights.text();
  assert.match(index, /Working notes for decisions in motion/i);
  for (const slug of [
    "useful-internal-control-review",
    "stress-testing-business-plan",
    "tax-working-file-that-reconciles",
  ]) {
    assert.match(index, new RegExp(`href="/insights/${slug}"`, "i"));
    const article = await render(`/insights/${slug}`);
    assert.equal(article.status, 200);
    const articleHtml = await article.text();
    assert.match(articleHtml, /"@type":"Article"/i);
    assert.match(articleHtml, /property="og:type" content="article"/i);
    assert.match(articleHtml, /property="og:image:width" content="1536"/i);
    assert.match(articleHtml, /This article is general information/i);
  }
  assert.equal((await render("/insights/not-a-published-note")).status, 404);
});

test("presents the supervised AI agent team with internal FST profile links and a clear human approval boundary", async () => {
  const response = await render("/ai-agent-team");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Meet our AI agent team\./i);
  assert.match(html, /FST uses supervised AI to increase capacity, strengthen evidence and keep professional judgement in human hands\./i);
  assert.match(html, /More capacity for client work/i);
  assert.match(html, /Clearer evidence by design/i);
  assert.match(html, /Faster, controlled delivery/i);
  assert.doesNotMatch(html, /Professional firms are being asked to do more/i);
  assert.match(html, /Agents prepare\. Professionals approve\./i);
  for (const [name, route] of [
    ["Patrick", "patrick"],
    ["Sofia", "sofia"],
    ["Matthew", "matthew"],
    ["Claire", "claire"],
    ["Emma", "emma"],
  ]) {
    assert.match(html, new RegExp(`>${name}<`, "i"));
    assert.match(html, new RegExp(`href="/ai-agent-team/${route}"`, "i"));
  }
  for (const pack of [
    "Audit file pack",
    "Accounting close pack",
    "Tax and VAT evidence pack",
    "Corporate and regulatory pack",
    "Insurance regulatory pack",
  ]) assert.match(html, new RegExp(pack, "i"));
  assert.match(html, /do not sign reports, issue opinions, approve filings/i);
  assert.match(html, /Final judgement, approval and accountability remain human/i);
  assert.doesNotMatch(html, />Professional AI Agents</i);
  assert.doesNotMatch(html, /https:\/\/ikanisa\.com\/professional-agents|View on IKANISA/i);
});

test("publishes a dedicated internal FST page for every AI agent", async () => {
  for (const [name, route, role, workpack] of [
    ["Patrick", "patrick", "Audit workpack specialist", "Audit file pack"],
    ["Sofia", "sofia", "Accounting and finance operations specialist", "Accounting close pack"],
    ["Matthew", "matthew", "Malta tax compliance workpack specialist", "Tax and VAT evidence pack"],
    ["Claire", "claire", "Corporate and regulatory workpack specialist", "Corporate and regulatory pack"],
    ["Emma", "emma", "Insurance governance and reporting specialist", "Insurance regulatory pack"],
  ]) {
    const response = await render(`/ai-agent-team/${route}`);
    assert.equal(response.status, 200, `${name}'s FST page should render`);
    const html = await response.text();
    assert.match(html, new RegExp(`<h1>${name}</h1>`, "i"));
    assert.match(html, new RegExp(role, "i"));
    assert.match(html, new RegExp(workpack, "i"));
    assert.match(html, /href="\/ai-agent-team"[^>]*>[^<]*<svg/i);
    assert.match(html, /Preparation is automated\. Accountability is not\./i);
    assert.match(html, /href="\/book"/i);
    assert.doesNotMatch(html, /https:\/\/ikanisa\.com\/professional-agents|View on IKANISA/i);
  }
  assert.equal((await render("/ai-agent-team/unknown-agent")).status, 404);
});

test("removes the inherited green palette from live source", async () => {
  const paletteFiles = [
    "app/globals.css",
    "app/page.tsx",
    "app/about/page.tsx",
    "app/services/page.tsx",
    "app/components/ServicePage.tsx",
    "app/services/corporate-services/page.tsx",
    "app/services/loan-funding-application-support/page.tsx",
    "app/ai-agent-team/page.tsx",
  ];
  const source = (await Promise.all(paletteFiles.map((file) => readFile(path.join(root, file), "utf8")))).join("\n");
  const forbiddenPalette = /\b(?:green|sage)\b|#(?:0e382f|0f392f|103a32|103d34|113d34|154f43|174f43|1b5b4d|1f6153|397c48|65a970|65df6d|edf7ef|edf9ef|edfaef|eff9f1|f1fff3|f2f8f4|f4faf5|f4fbf5|f5fbf6|f6fbf7|f7faf8|f8faf7|f8faf8|f8fff8)\b|rgba\((?:101,\s*(?:151,\s*141|223,\s*109)|109,\s*151,\s*142|16,\s*58,\s*50|23,\s*(?:79,\s*67|91,\s*76)|25,\s*63,\s*56|26,\s*70,\s*61|35,\s*94,\s*81|4,\s*29,\s*24|7,\s*32,\s*27),/i;
  assert.doesNotMatch(source, forbiddenPalette);
});

test("lists all requested components under their clear service categories", async () => {
  const expectations = [
    ["/services/management-consulting", ["Management support", "Business planning &amp; feasibility", "Business-plan preparation", "Business-plan review", "Budgeting, projections &amp; scenarios", "Risk management", "Internal controls", "Policies &amp; procedures"]],
    ["/services/audit-assurance", ["Statutory financial statement audit", "Voluntary financial statement audit", "Limited assurance &amp; review engagements", "Agreed-upon procedures", "Internal audit", "Internal controls assurance", "Grant, donor &amp; project audit", "NGO &amp; voluntary organisation audit", "Compliance &amp; regulatory audit", "Systems &amp; data audit"]],
    ["/services/taxation", ["Tax registrations &amp; taxpayer setup", "Corporate income tax", "Personal &amp; self-employed income tax", "VAT returns &amp; reconciliations", "Payroll tax, FSS &amp; social security", "International tax &amp; transfer pricing"]],
    ["/services/accounting-financial-reporting", ["Bookkeeping &amp; general ledger", "Financial statement preparation", "Financial statement review", "Budgets &amp; projections", "Payroll &amp; FSS support"]],
    ["/services/corporate-services", ["Company formation", "Company secretarial", "Statutory registers &amp; filings", "Administrative support"]],
    ["/services/loan-funding-application-support", ["Finance &amp; funding readiness assessment", "Route &amp; facility fit", "Loan application forms", "Lender financial schedules", "Funding eligibility &amp; project design", "Budget, eligible costs &amp; co-financing", "Loan &amp; funding evidence pack", "Approval, drawdown &amp; award setup", "Authorised submission control"]],
  ];
  for (const [pathname, labels] of expectations) {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    for (const label of labels) assert.match(html, new RegExp(label, "i"), `${pathname} should list ${label}`);
  }
});

test("separates independent audit work from management advisory and states professional safeguards", async () => {
  const [audit, management] = await Promise.all([
    render("/services/audit-assurance").then((response) => response.text()),
    render("/services/management-consulting").then((response) => response.text()),
  ]);
  for (const label of [
    "Operational &amp; process audit",
    "Fraud-risk &amp; special-purpose review",
    "Audit readiness &amp; remediation",
    "Audit committee &amp; governance reporting",
  ]) assert.match(audit, new RegExp(label, "i"));
  assert.match(audit, /Regulated work begins with authority and independence/i);
  assert.match(audit, /holds the required Malta authorisation/i);
  assert.match(audit, /conflict and independence checks/i);
  assert.doesNotMatch(management, /<h3>Internal audit<\/h3>/i);
});

test("combined financing support uses the official funding routes and retains human submission control", async () => {
  const html = await (await render("/services/loan-funding-application-support")).text();
  assert.match(html, /href="https:\/\/fondi\.eu\/what-funding-is-available\/"/i);
  assert.match(html, /href="https:\/\/maltaenterprise\.com\/support"/i);
  assert.match(html, /href="https:\/\/xjenzamalta\.mt\/media\/open-funding-schemes\/"/i);
  assert.match(html, /authorised applicant retains approval, declarations and external submission control/i);
});

test("every rendered public image exists and none matches a KMFINCO public asset", async () => {
  const routes = ["/", "/services", "/about", "/ai-agent-team", "/who-we-work-with", "/contact", "/services/management-consulting", "/services/audit-assurance", "/services/taxation", "/services/accounting-financial-reporting", "/services/corporate-services", "/services/loan-funding-application-support"];
  const used = new Set(["/favicon.svg", "/og.jpg"]);
  for (const pathname of routes) {
    const html = await (await render(pathname)).text();
    for (const match of html.matchAll(/<img[^>]+src="([^"]+)"/g)) used.add(match[1]);
  }
  for (const source of used) {
    const buffer = await readFile(path.join(root, "public", source.slice(1)));
    assert.ok(buffer.length > 0, `${source} should not be empty`);
    assert.ok(!kmfincoPublicBlobIds.has(gitBlobId(buffer)), `${source} must not reuse a KMFINCO asset`);
  }
  const publicFiles = await readdir(path.join(root, "public"));
  assert.ok(
    publicFiles.every((name) => /^(fst-|funding-|catalogue-og\.jpg$|_headers$|favicon\.svg$|og\.jpg$|apple-touch-icon\.png$|icon-(?:192|512)\.png$|brand$)/.test(name)),
    "public should contain only FST/funding exports and core brand files",
  );
});

test("publishes the approved FST logo and browser asset family", async () => {
  const expected = [
    "public/brand/fst-logo.svg",
    "public/brand/fst-logo-reverse.svg",
    "public/brand/fst-mark.svg",
    "public/favicon.svg",
    "public/apple-touch-icon.png",
    "public/icon-192.png",
    "public/icon-512.png",
    "public/og.jpg",
  ];
  for (const file of expected) {
    const buffer = await readFile(path.join(root, file));
    assert.ok(buffer.length > 0, `${file} should not be empty`);
  }
  const [logo, mark, favicon] = await Promise.all([
    readFile(path.join(root, "public/brand/fst-logo.svg"), "utf8"),
    readFile(path.join(root, "public/brand/fst-mark.svg"), "utf8"),
    readFile(path.join(root, "public/favicon.svg"), "utf8"),
  ]);
  for (const svg of [logo, mark, favicon]) {
    assert.match(svg, /#102635/i);
    assert.match(svg, /#FF6845/i);
    assert.match(svg, /viewBox=/i);
  }
  const manifest = await render("/manifest.webmanifest");
  assert.equal(manifest.status, 200);
  assert.match(await manifest.text(), /icon-192\.png/);
});

test("removed legacy routes return 404 while legal and privacy routes render", async () => {
  for (const pathname of ["/services/investment-family-office", "/services/corporate-fiduciary", "/services/tax-accounting-payroll"]) {
    assert.equal((await render(pathname)).status, 404);
  }
  for (const pathname of ["/insights", "/legal-information", "/privacy", "/terms"]) {
    assert.equal((await render(pathname)).status, 200);
  }
});

test("uses clear canonical service URLs and preserves legacy link authority", async () => {
  const [tax, audit, finance, legacyTax, legacyPlanning, legacyLoan, legacyFunding, sitemapResponse] = await Promise.all([
    render("/services/taxation"),
    render("/services/audit-assurance"),
    render("/services/loan-funding-application-support"),
    render("/services/tax-vat"),
    render("/services/business-planning-finance-applications"),
    render("/services/loan-application-support"),
    render("/services/funding-applications"),
    render("/sitemap.xml"),
  ]);
  assert.equal(tax.status, 200);
  assert.equal(audit.status, 200);
  assert.equal(finance.status, 200);
  assert.equal(legacyTax.status, 308);
  assert.equal(legacyPlanning.status, 308);
  assert.equal(legacyLoan.status, 308);
  assert.equal(legacyFunding.status, 308);
  assert.equal(new URL(legacyTax.headers.get("location")).pathname, "/services/taxation");
  for (const response of [legacyPlanning, legacyLoan, legacyFunding]) {
    assert.equal(new URL(response.headers.get("location")).pathname, "/services/loan-funding-application-support");
  }
  const sitemap = await sitemapResponse.text();
  assert.match(sitemap, /https:\/\/fst\.ikanisa\.com\/services\/taxation/);
  assert.match(sitemap, /https:\/\/fst\.ikanisa\.com\/services\/audit-assurance/);
  assert.match(sitemap, /https:\/\/fst\.ikanisa\.com\/services\/catalogue/);
  assert.match(sitemap, /https:\/\/fst\.ikanisa\.com\/services\/loan-funding-application-support/);
  assert.match(sitemap, /https:\/\/fst\.ikanisa\.com\/ai-agent-team/);
  assert.match(sitemap, /https:\/\/fst\.ikanisa\.com\/insights\/useful-internal-control-review/);
  assert.match(sitemap, /https:\/\/fst\.ikanisa\.com\/legal-information/);
  assert.match(sitemap, /https:\/\/fst\.ikanisa\.com\/privacy/);
  assert.match(sitemap, /https:\/\/fst\.ikanisa\.com\/terms/);
  for (const agent of ["patrick", "sofia", "matthew", "claire", "emma"]) {
    assert.match(sitemap, new RegExp(`https://fst\\.ikanisa\\.com/ai-agent-team/${agent}`));
  }
  assert.doesNotMatch(sitemap, /services\/tax-vat|business-planning-finance-applications|services\/loan-application-support|services\/funding-applications/);
});

test("publishes page-level SEO schema, one primary heading and responsive images", async () => {
  const home = await (await render("/")).text();
  assert.equal((home.match(/<h1(?:\s|>)/gi) || []).length, 1);
  assert.match(home, /"@type":"WebSite"/);
  assert.doesNotMatch(home, /"@id":"https:\/\/fst\.ikanisa\.com\/#organization"/);
  assert.match(home, /srcset="\/fst-hero-640\.webp 640w, \/fst-hero-960\.webp 960w, \/fst-hero\.webp 1536w"/i);

  const service = await (await render("/services/taxation")).text();
  assert.match(service, /"@type":"Service"/);
  assert.match(service, /"@type":"BreadcrumbList"/);
  assert.match(service, /"@id":"https:\/\/fst\.ikanisa\.com\/services\/taxation#service"/);
  assert.match(service, /<link rel="canonical" href="https:\/\/fst\.ikanisa\.com\/services\/taxation"/i);
});

test("defines durable Cloudflare caching for fingerprinted and image assets", async () => {
  const headers = await readFile(path.join(root, "public/_headers"), "utf8");
  assert.match(headers, /\/assets\/\*/);
  assert.match(headers, /max-age=31536000,\s*immutable/i);
  assert.match(headers, /\/\*\.webp/);
  assert.match(headers, /stale-while-revalidate=86400/i);
});

test("contact, SEO and discovery routes render production signals", async () => {
  const [contactResponse, sitemapResponse, robotsResponse] = await Promise.all([
    render("/contact"), render("/sitemap.xml"), render("/robots.txt"),
  ]);
  const [contact, sitemap, robots] = await Promise.all([
    contactResponse.text(), sitemapResponse.text(), robotsResponse.text(),
  ]);
  assert.match(contact, /wa\.me\/35699152999/);
  assert.match(contact, />\+35699152999</);
  assert.match(contact, /general enquiries/i);
  assert.match(contact, /separate service-request channel/i);
  assert.match(contact, /href="\/legal-information"/i);
  assert.doesNotMatch(contact, /tel:/i);
  assert.doesNotMatch(contact, /Open FST WhatsApp/i);
  assert.doesNotMatch(contact, /7942\s*8604|79428604/);
  assert.doesNotMatch(contact, /hello@fst\.ikanisa\.com/i);
  assert.doesNotMatch(contact, /mailto:/i);
  assert.match(sitemap, /services\/audit-assurance/);
  assert.match(sitemap, /services\/catalogue/);
  assert.match(sitemap, /services\/loan-funding-application-support/);
  assert.match(sitemap, /ai-agent-team/);
  assert.match(sitemap, /\/insights/);
  assert.match(sitemap, /\/privacy/);
  assert.match(sitemap, /\/terms/);
  assert.match(sitemap, /\/legal-information/);
  assert.doesNotMatch(sitemap, /services\/funding-applications|services\/loan-application-support|investment-family-office|corporate-fiduciary/);
  assert.match(robots, /Sitemap: https:\/\/fst\.ikanisa\.com\/sitemap\.xml/);
});

test("publishes fail-closed legal, privacy and enquiry safeguards", async () => {
  const [legal, privacy, terms, booking, footer] = await Promise.all([
    render("/legal-information").then((response) => response.text()),
    render("/privacy").then((response) => response.text()),
    render("/terms").then((response) => response.text()),
    render("/book").then((response) => response.text()),
    render("/").then((response) => response.text()),
  ]);
  assert.match(legal, /legal-entity, registration, address and professional-authorisation details have not yet been approved/i);
  assert.match(legal, /website request does not itself appoint an auditor/i);
  assert.match(privacy, /Controller disclosure is awaiting approved legal details/i);
  assert.match(privacy, /Cloudflare|Google|WhatsApp/i);
  assert.match(terms, /does not create a client relationship/i);
  assert.match(booking, /href="\/privacy"/i);
  assert.match(booking, /Do not include passwords/i);
  assert.match(footer, /href="\/legal-information"/i);
  assert.match(footer, /href="\/privacy"/i);
  assert.match(footer, /href="\/terms"/i);
});

test("publishes only through the FST Cloudflare custom domain", async () => {
  const config = JSON.parse(await readFile(path.join(root, "wrangler.jsonc"), "utf8"));
  const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
  assert.equal(config.workers_dev, false);
  assert.deepEqual(config.routes, [
    {
      pattern: "fst.ikanisa.com",
      custom_domain: true,
    },
  ]);
  assert.equal(config.send_email, undefined);
  const hosting = JSON.parse(await readFile(path.join(root, ".openai", "hosting.json"), "utf8"));
  assert.match(hosting.project_id, /^appgprj_[a-z0-9]+$/);
  assert.deepEqual(Object.keys(hosting), ["project_id"]);
  assert.match(packageJson.scripts.deploy, /(?:vinext|wrangler) deploy/i);
  assert.doesNotMatch(JSON.stringify(packageJson.scripts), /vercel|netlify/i);
});

test("service request creates a WhatsApp handoff link for the dedicated catalogue number", async () => {
  const cartSource = await readFile(path.join(root, "app/components/ServiceCatalogue.tsx"), "utf8");
  const siteConfigSource = await readFile(path.join(root, "lib/site-config.ts"), "utf8");
  await assert.rejects(
    readFile(path.join(root, "app/api/service-order/route.ts"), "utf8"),
    { code: "ENOENT" },
  );
  assert.match(siteConfigSource, /serviceOrderWhatsappDisplay: "\+356 7718 6193"/);
  assert.match(siteConfigSource, /serviceOrderWhatsappUrl: "https:\/\/wa\.me\/35677186193"/);
  assert.match(cartSource, /Hello FST, I would like to request the following services/);
  assert.match(cartSource, /encodeURIComponent\(whatsappMessage\)/);
  assert.match(cartSource, /target="_blank"/);
  assert.match(cartSource, /Send request on WhatsApp/);
});

test("native booking validates input and fails safely without credentials", async () => {
  const invalid = await post("/api/book", { name: "", email: "not-an-email", start: "invalid", duration: 30, privacy_consent: false });
  assert.equal(invalid.status, 400);
  const future = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();
  const unconfigured = await post("/api/book", { name: "Test Client", email: "test@example.com", start: future, duration: 30, timezone: "Europe/Malta", privacy_consent: "agreed" });
  assert.equal(unconfigured.status, 503);
  assert.deepEqual(await unconfigured.json(), { error: "booking_not_configured" });
  const rejectedOrigin = await post("/api/book", { name: "Test", email: "test@example.com" }, {}, { origin: "https://example.net" });
  assert.equal(rejectedOrigin.status, 403);
});

test("native booking creates conflict-checked Google Meet events for approved recipients", async () => {
  const originalFetch = globalThis.fetch;
  const requests = [];
  globalThis.fetch = async (input, init = {}) => {
    const url = String(input);
    requests.push({ url, body: init.body ? String(init.body) : "" });
    if (url === "https://oauth2.googleapis.com/token") return Response.json({ access_token: "test_token" });
    if (url === "https://www.googleapis.com/calendar/v3/freeBusy") return Response.json({ calendars: { primary: { busy: [] } } });
    if (url.includes("/calendar/v3/calendars/primary/events")) return Response.json({ id: "event_123", htmlLink: "https://calendar.google.com/event?eid=test", hangoutLink: "https://meet.google.com/abc-defg-hij" });
    return new Response("Unexpected external request", { status: 500 });
  };
  try {
    const future = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString();
    const response = await post(
      "/api/book",
      { name: "Test Client", email: "test@example.com", start: future, duration: 30, timezone: "Europe/Malta", privacy_consent: "agreed" },
      { GOOGLE_CALENDAR_CLIENT_ID: "client", GOOGLE_CALENDAR_CLIENT_SECRET: "secret", GOOGLE_CALENDAR_REFRESH_TOKEN: "refresh", GOOGLE_CALENDAR_ID: "primary", GOOGLE_CALENDAR_TIMEZONE: "Europe/Malta" },
    );
    assert.equal(response.status, 200);
    const createEvent = requests.find(({ url }) => url.includes("/events?conferenceDataVersion=1"));
    assert.ok(requests.some(({ url }) => url.endsWith("/freeBusy")));
    assert.ok(createEvent);
    assert.match(createEvent.url, /sendUpdates=all/);
    assert.match(createEvent.body, /hangoutsMeet/);
    assert.match(createEvent.body, /bosco@ikanisa\.com/);
    assert.doesNotMatch(createEvent.body, /kmifsud@kmconsultants\.com\.mt/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
