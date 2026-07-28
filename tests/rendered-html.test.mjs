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
    "Tax &amp; VAT",
    "Accounting &amp; Financial Reporting",
    "Corporate &amp; Administrative Services",
    "Business Planning &amp; Loan Application Support",
    "Funding Application Support",
  ]) assert.match(html, new RegExp(label, "i"));
  assert.match(html, /href="\/book"[^>]*>Book a Meeting</i);
  assert.match(html, /Services/);
  assert.match(html, /Organisations/);
  assert.match(html, /Field Notes/);
  assert.match(html, /FST Approach/);
  assert.match(html, /src="\/fst-hero\.webp"/);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
});

test("does not expose removed practices or inherited KMFINCO language", async () => {
  const routes = ["/", "/services", "/about", "/who-we-work-with", "/insights", "/contact", "/privacy", "/terms"];
  const forbidden = /KMFINCO|K Mi|Audit &amp; Assurance|External audit|Statutory audit|Investment &amp; Family Office|Fiduciary|Clarity for what comes next|Close enough to understand|Advice shaped around your reality|Useful thinking for consequential decisions/i;
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
  const routes = ["/", "/services", "/about", "/who-we-work-with", "/insights", "/contact"];
  const forbiddenLabels = /Six coordinated workstreams|Three settings where connected support matters|One question\. Every relevant discipline|Reserve a focused 45 minutes/i;
  for (const pathname of routes) {
    const html = await (await render(pathname)).text();
    assert.doesNotMatch(html, forbiddenLabels, `${pathname} should use descriptive rather than numeric framing`);
  }
});

test("uses direct service labels on the services index", async () => {
  const html = await (await render("/services")).text();
  assert.match(html, /Business Planning &amp; Loan Application Support/i);
  assert.match(html, /Funding Application Support/i);
  assert.doesNotMatch(html, /Six coordinated workstreams|Business Planning &amp; Finance Applications|Funding Application Services/i);
});

test("uses explicit loan and funding application support wording across public routes", async () => {
  const routes = ["/", "/services", "/who-we-work-with", "/services/business-planning-finance-applications", "/services/funding-applications"];
  const combined = (await Promise.all(routes.map(async (pathname) => (await (await render(pathname)).text())))).join("\n");
  assert.match(combined, /Loan Application Support/i);
  assert.match(combined, /Funding Application Support/i);
  assert.doesNotMatch(combined, /Business Planning &amp; Loan Support|Funding &amp; Grant Support|Budgets, projections and loan support/i);
});

test("removes the inherited green palette from live source", async () => {
  const paletteFiles = [
    "app/globals.css",
    "app/page.tsx",
    "app/about/page.tsx",
    "app/insights/page.tsx",
    "app/services/page.tsx",
    "app/components/ServicePage.tsx",
    "app/services/corporate-services/page.tsx",
    "app/services/funding-applications/page.tsx",
  ];
  const source = (await Promise.all(paletteFiles.map((file) => readFile(path.join(root, file), "utf8")))).join("\n");
  const forbiddenPalette = /\b(?:green|sage)\b|#(?:0e382f|0f392f|103a32|103d34|113d34|154f43|174f43|1b5b4d|1f6153|397c48|65a970|65df6d|edf7ef|edf9ef|edfaef|eff9f1|f1fff3|f2f8f4|f4faf5|f4fbf5|f5fbf6|f6fbf7|f7faf8|f8faf7|f8faf8|f8fff8)\b|rgba\((?:101,\s*(?:151,\s*141|223,\s*109)|109,\s*151,\s*142|16,\s*58,\s*50|23,\s*(?:79,\s*67|91,\s*76)|25,\s*63,\s*56|26,\s*70,\s*61|35,\s*94,\s*81|4,\s*29,\s*24|7,\s*32,\s*27),/i;
  assert.doesNotMatch(source, forbiddenPalette);
});

test("lists all requested components under their clear service categories", async () => {
  const expectations = [
    ["/services/management-consulting", ["Management support", "Risk management", "Internal audit", "Internal controls", "Policies &amp; procedures"]],
    ["/services/tax-vat", ["VAT registration", "VAT returns &amp; reconciliations", "Corporate income tax", "Tax planning &amp; advisory"]],
    ["/services/accounting-financial-reporting", ["Bookkeeping &amp; general ledger", "Financial statement preparation", "Financial statement review", "Budgets &amp; projections", "Payroll &amp; FSS support"]],
    ["/services/corporate-services", ["Company formation", "Company secretarial", "Statutory registers &amp; filings", "Administrative support"]],
    ["/services/business-planning-finance-applications", ["Business-plan preparation", "Business-plan review", "Financial projections", "Loan application readiness assessment", "Loan application support"]],
    ["/services/funding-applications", ["Funding opportunity scan", "Route fit &amp; eligibility", "Narrative &amp; forms", "Budget &amp; co-financing", "Submission-readiness review", "Post-award support"]],
  ];
  for (const [pathname, labels] of expectations) {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    for (const label of labels) assert.match(html, new RegExp(label, "i"), `${pathname} should list ${label}`);
  }
});

test("funding application support uses the three official routes and retains human submission control", async () => {
  const html = await (await render("/services/funding-applications")).text();
  assert.match(html, /href="https:\/\/fondi\.eu\/what-funding-is-available\/"/i);
  assert.match(html, /href="https:\/\/maltaenterprise\.com\/support"/i);
  assert.match(html, /href="https:\/\/xjenzamalta\.mt\/media\/open-funding-schemes\/"/i);
  assert.match(html, /authorised human keeps approval and submission control/i);
});

test("every rendered public image exists and none matches a KMFINCO public asset", async () => {
  const routes = ["/", "/services", "/about", "/who-we-work-with", "/insights", "/contact", "/privacy", "/terms", "/services/management-consulting", "/services/tax-vat", "/services/accounting-financial-reporting", "/services/corporate-services", "/services/business-planning-finance-applications", "/services/funding-applications"];
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
  assert.ok(publicFiles.every((name) => /^(fst-|funding-|favicon\.svg$|og\.jpg$)/.test(name)), "public should contain only FST/funding exports and core brand files");
});

test("removed legacy service routes return 404", async () => {
  for (const pathname of ["/services/audit-assurance", "/services/investment-family-office", "/services/corporate-fiduciary", "/services/tax-accounting-payroll"]) {
    assert.equal((await render(pathname)).status, 404);
  }
});

test("contact, legal, SEO and discovery routes render production signals", async () => {
  const [contactResponse, privacyResponse, termsResponse, sitemapResponse, robotsResponse] = await Promise.all([
    render("/contact"), render("/privacy"), render("/terms"), render("/sitemap.xml"), render("/robots.txt"),
  ]);
  const [contact, privacy, terms, sitemap, robots] = await Promise.all([
    contactResponse.text(), privacyResponse.text(), termsResponse.text(), sitemapResponse.text(), robotsResponse.text(),
  ]);
  assert.match(contact, /wa\.me\/35699152999/);
  assert.match(contact, />\+35699152999</);
  assert.doesNotMatch(contact, /tel:/i);
  assert.doesNotMatch(contact, /Open FST WhatsApp/i);
  assert.doesNotMatch(contact, /7942\s*8604|79428604/);
  assert.doesNotMatch(contact, /hello@fst\.ikanisa\.com/i);
  assert.doesNotMatch(contact, /mailto:/i);
  assert.match(privacy, /src="\/fst-legal\.webp"/);
  assert.match(terms, /src="\/fst-legal\.webp"/);
  assert.match(sitemap, /services\/funding-applications/);
  assert.doesNotMatch(sitemap, /services\/audit-assurance|investment-family-office|corporate-fiduciary/);
  assert.match(robots, /Sitemap: https:\/\/fst-advisory\.ikanisa\.chatgpt\.site\/sitemap\.xml/);
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
