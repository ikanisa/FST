import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
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

test("server-renders the FST homepage and social metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>FST \| Clarity for what comes next<\/title>/i);
  assert.match(
    html,
    /property="og:image" content="https:\/\/fst-advisory\.ikanisa\.chatgpt\.site\/og\.jpg"/i,
  );
  assert.match(html, /Clarity for what comes next\./);
  assert.match(html, /Management Advisory, Risk &amp; Controls/);
  assert.match(html, /Tax &amp; VAT/);
  assert.match(html, /Accounting &amp; Financial Reporting/);
  assert.match(html, /Corporate &amp; Administrative Services/);
  assert.match(html, /Business Planning &amp; Finance Applications/);
  assert.match(html, /Funding Application Services/);
  assert.doesNotMatch(html, /Audit &amp; Assurance/i);
  assert.doesNotMatch(html, /Investment &amp; Family Office/i);
  assert.doesNotMatch(html, /Fiduciary/i);
  assert.match(html, /Who we work with/);
  assert.doesNotMatch(html, /Who we help/);
  assert.match(html, /Many connected capabilities\./);
  assert.doesNotMatch(html, /<details[^>]+class="expertise-row"/i);
  assert.match(html, /Internal audit &amp; controls/);
  assert.match(html, /src="\/advisory-team\.webp"/);
  assert.doesNotMatch(html, /<span[^>]*>0[1-9]<\/span>/, "homepage should not render decorative sequence numbers");
  assert.match(html, /class="rail-icon [^"]+"[^>]*><svg/, "homepage capability rail should render semantic icons");
  assert.match(html, /href="\/book"[^>]*>Book a Meeting</i);
  assert.match(html, /href="#main-content">Skip to main content/i);
  assert.match(html, /Image slider controls/i);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
});

test("uses semantic icons instead of decorative numbering across content systems", async () => {
  const routes = ["/", "/services", "/about", "/services/management-consulting", "/contact"];

  for (const pathname of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, `${pathname} should render`);
    const html = await response.text();
    assert.doesNotMatch(html, /<span[^>]*>0[1-9]<\/span>/, `${pathname} should not render decorative sequence numbers`);
  }

  const [homeResponse, servicesResponse, aboutResponse, consultingResponse, contactResponse] = await Promise.all([
    render("/"),
    render("/services"),
    render("/about"),
    render("/services/management-consulting"),
    render("/contact"),
  ]);
  const [home, services, about, consulting, contact] = await Promise.all([
    homeResponse.text(),
    servicesResponse.text(),
    aboutResponse.text(),
    consultingResponse.text(),
    contactResponse.text(),
  ]);

  assert.match(home, /class="item-icon audience-icon/, "audience cards should render meaningful icons");
  assert.match(home, /class="approach-icon"[^>]*><svg/, "approach steps should render meaningful icons");
  assert.match(services, /class="item-icon service-index-icon/, "service cards should render service icons");
  assert.match(about, /class="item-icon principle-icon/, "principles should render meaningful icons");
  assert.match(consulting, /class="item-icon service-offering-icon/, "offerings should render service-specific icons");
  assert.match(contact, /Book a Meeting/, "contact route should provide the uniform booking action");
});

test("server-renders retained service, audience, booking and legal routes", async () => {
  const [consultingResponse, audienceResponse, contactResponse, privacyResponse, termsResponse] = await Promise.all([
    render("/services/management-consulting"),
    render("/who-we-work-with"),
    render("/contact"),
    render("/privacy"),
    render("/terms"),
  ]);

  assert.equal(consultingResponse.status, 200);
  assert.equal(audienceResponse.status, 200);
  assert.equal(contactResponse.status, 200);
  assert.equal(privacyResponse.status, 200);
  assert.equal(termsResponse.status, 200);

  const [consulting, audience, contact, privacy, terms] = await Promise.all([
    consultingResponse.text(),
    audienceResponse.text(),
    contactResponse.text(),
    privacyResponse.text(),
    termsResponse.text(),
  ]);

  assert.match(consulting, /Turn complexity into practical progress\./);
  assert.match(consulting, /Risk management/);
  assert.match(consulting, /Internal audit/);
  assert.match(consulting, /Internal controls/);
  assert.match(audience, /Advice shaped around your reality\./);
  assert.match(audience, /Businesses &amp; leadership teams/);
  assert.doesNotMatch(audience, /Built around your context/i);
  assert.match(audience, /src="\/who-we-work-with-hero-v2\.webp"/);
  assert.match(contact, /Choose a time that works\./);
  assert.match(contact, /creates Google Meet/);
  assert.match(contact, /tel:\+35679428604/);
  assert.match(contact, /wa\.me\/35679428604/);
  assert.doesNotMatch(contact, /mailto:/i);
  assert.doesNotMatch(contact, /Google Meet · 45 min/);
  assert.match(contact, /src="\/contact-conversation\.webp"/);
  assert.match(privacy, /Your information, handled with care\./);
  assert.match(privacy, /src="\/privacy-policy-v2\.webp"/);
  assert.match(terms, /Clear terms for using this website\./);
  assert.match(terms, /src="\/terms-of-use-v2\.webp"/);
});

test("removed audit, investment, fiduciary and superseded combined service routes return 404", async () => {
  const [auditResponse, investmentResponse, fiduciaryResponse, combinedResponse] = await Promise.all([
    render("/services/audit-assurance"),
    render("/services/investment-family-office"),
    render("/services/corporate-fiduciary"),
    render("/services/tax-accounting-payroll"),
  ]);
  assert.equal(auditResponse.status, 404);
  assert.equal(investmentResponse.status, 404);
  assert.equal(fiduciaryResponse.status, 404);
  assert.equal(combinedResponse.status, 404);
});

test("clearly presents all six service categories and their requested components", async () => {
  const routeExpectations = [
    ["/services/management-consulting", ["Management advisory", "Risk management", "Internal audit", "Internal controls", "Governance &amp; compliance", "Policies &amp; procedures"]],
    ["/services/tax-vat", ["VAT registration", "VAT returns &amp; reconciliations", "VAT advisory", "Corporate income tax", "Tax planning &amp; advisory"]],
    ["/services/accounting-financial-reporting", ["Bookkeeping &amp; general ledger", "Management accounts", "Financial statement preparation", "Financial statement review", "Budgets &amp; projections", "Payroll &amp; FSS support"]],
    ["/services/corporate-services", ["Company formation", "Corporate administration", "Company secretarial", "Statutory registers &amp; filings", "Administrative support"]],
    ["/services/business-planning-finance-applications", ["Business-plan preparation", "Business-plan review", "Financial projections", "Budgeting &amp; cash planning", "Loan readiness assessment", "Loan application support"]],
    ["/services/funding-applications", ["Funding opportunity scan", "Route fit &amp; eligibility", "Application narrative &amp; forms", "Business plan &amp; annexes", "Budget &amp; co-financing", "Submission-readiness review", "Post-award support"]],
  ];

  for (const [pathname, components] of routeExpectations) {
    const response = await render(pathname);
    assert.equal(response.status, 200, `${pathname} should render`);
    const html = await response.text();
    for (const component of components) assert.match(html, new RegExp(component, "i"), `${pathname} should list ${component}`);
    assert.doesNotMatch(html, /Audit &amp; Assurance|External audit|Statutory audit|Investment &amp; Family Office|Fiduciary/i);
  }

  const funding = await (await render("/services/funding-applications")).text();
  assert.match(funding, /FONDI\.eu/);
  assert.match(funding, /Malta Enterprise/);
  assert.match(funding, /Xjenza Malta/);
  assert.match(funding, /submission retained for the authorised human/i);
});

test("renders the insights hero without the removed Perspectives label", async () => {
  const response = await render("/insights");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Useful thinking for consequential decisions\./);
  assert.doesNotMatch(html, />Perspectives</);
  assert.doesNotMatch(html, /Discuss this topic/i);
  const articleCards = html.match(/<article[^>]+class="article-card[^"]*"[\s\S]*?<\/article>/g) ?? [];
  assert.equal(articleCards.length, 3);
  for (const card of articleCards) assert.doesNotMatch(card, /<a\b/i, "insight cards should not render redundant CTA links");
});

test("omits redundant exploratory CTA labels", async () => {
  const routes = ["/", "/services", "/about", "/who-we-work-with"];
  const removedLabels = [
    "Explore this service",
    "Explore management consulting",
    "Read perspective",
    "Explore service",
    "Explore our expertise",
  ];

  for (const pathname of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, `${pathname} should render`);
    const html = await response.text();
    for (const label of removedLabels) {
      assert.doesNotMatch(html, new RegExp(label, "i"), `${pathname} should not render ${label}`);
    }
  }
});

test("every content section renders a distinct relevant image", async () => {
  const routeExpectations = [
    ["/", 8, ["home-capabilities-v2.webp", "home-expertise-v2.webp", "home-consulting-v2.webp", "home-audience-v2.webp", "home-approach-v2.webp", "home-insights-v2.webp", "home-contact-v2.webp"]],
    ["/services", 8, ["services-overview-hero-v2.webp", "management-consulting.webp", "insights-tax-v2.webp", "accounting-financial-reporting.webp", "corporate-services.webp", "who-we-work-with-business-v2.webp", "funding-application-services.webp", "services-cta-v2.webp"]],
    ["/services/management-consulting", 5, ["consulting-intro-v2.webp", "consulting-offerings-v2.webp", "consulting-outcomes-v2.webp", "consulting-cta-v2.webp"]],
    ["/services/tax-vat", 5, ["insights-tax-v2.webp", "tax-intro-v2.webp", "tax-offerings-v2.webp", "tax-outcomes-v2.webp", "tax-cta-v2.webp"]],
    ["/services/accounting-financial-reporting", 5, ["accounting-financial-reporting.webp", "home-expertise-v2.webp", "home-capabilities-v2.webp", "tax-outcomes-v2.webp", "contact-conversation.webp"]],
    ["/services/corporate-services", 5, ["corporate-intro-v2.webp", "corporate-offerings-v2.webp", "corporate-outcomes-v2.webp", "corporate-cta-v2.webp"]],
    ["/services/business-planning-finance-applications", 5, ["who-we-work-with-business-v2.webp", "insights-strategy-v2.webp", "home-consulting-v2.webp", "about-story-v2.webp", "consulting-cta-v2.webp"]],
    ["/services/funding-applications", 5, ["funding-application-services.webp", "funding-intro-v2.webp", "funding-offerings-v2.webp", "funding-outcomes-v2.webp", "funding-cta-v2.webp"]],
    ["/about", 3, ["about-principles-v2.webp", "about-story-v2.webp"]],
    ["/who-we-work-with", 5, ["who-we-work-with-hero-v2.webp", "who-we-work-with-business-v2.webp", "who-we-work-with-owners-v2.webp", "who-we-work-with-organisations-v2.webp", "who-we-work-with-cta-v2.webp"]],
    ["/insights", 4, ["insights-risk-v2.webp", "insights-strategy-v2.webp", "insights-tax-v2.webp"]],
    ["/contact", 1, ["contact-conversation.webp"]],
    ["/privacy", 1, ["privacy-policy-v2.webp"]],
    ["/terms", 1, ["terms-of-use-v2.webp"]],
  ];

  for (const [pathname, minimumUniqueImages, requiredNames] of routeExpectations) {
    const response = await render(pathname);
    assert.equal(response.status, 200, `${pathname} should render`);
    const html = await response.text();
    const imageSources = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((match) => match[1]);
    assert.ok(new Set(imageSources).size >= minimumUniqueImages, `${pathname} should have ${minimumUniqueImages} unique images`);
    for (const name of requiredNames) assert.ok(imageSources.some((src) => src.endsWith(name)), `${pathname} should render ${name}`);
  }
});

test("renders production SEO signals", async () => {
  const [homeResponse, consultingResponse, sitemapResponse, robotsResponse] = await Promise.all([
    render("/"),
    render("/services/management-consulting"),
    render("/sitemap.xml"),
    render("/robots.txt"),
  ]);

  const home = await homeResponse.text();
  const consulting = await consultingResponse.text();
  const sitemap = await sitemapResponse.text();
  const robots = await robotsResponse.text();

  assert.match(home, /rel="canonical" href="https:\/\/fst-advisory\.ikanisa\.chatgpt\.site\/"/i);
  assert.match(home, /"@type":\["Organization","ProfessionalService"\]/);
  assert.match(consulting, /Management advisory, strategy, risk management, internal audit/i);
  assert.match(consulting, /rel="canonical" href="https:\/\/fst-advisory\.ikanisa\.chatgpt\.site\/services\/management-consulting"/i);
  assert.equal(sitemapResponse.status, 200);
  assert.doesNotMatch(sitemap, /services\/audit-assurance/);
  assert.doesNotMatch(sitemap, /services\/investment-family-office/);
  assert.doesNotMatch(sitemap, /services\/corporate-fiduciary/);
  assert.doesNotMatch(sitemap, /services\/tax-accounting-payroll/);
  assert.match(sitemap, /services\/tax-vat/);
  assert.match(sitemap, /services\/accounting-financial-reporting/);
  assert.match(sitemap, /services\/business-planning-finance-applications/);
  assert.match(sitemap, /services\/funding-applications/);
  assert.match(sitemap, /<loc>https:\/\/fst-advisory\.ikanisa\.chatgpt\.site\/privacy<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/fst-advisory\.ikanisa\.chatgpt\.site\/who-we-work-with<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/fst-advisory\.ikanisa\.chatgpt\.site\/terms<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/fst-advisory\.ikanisa\.chatgpt\.site\/book<\/loc>/);
  assert.equal(robotsResponse.status, 200);
  assert.match(robots, /Sitemap: https:\/\/fst-advisory\.ikanisa\.chatgpt\.site\/sitemap\.xml/);
});

test("native booking validates input and fails safely without credentials", async () => {
  const invalid = await post("/api/book", { name: "", email: "not-an-email", start: "invalid", duration: 30, privacy_consent: false });
  assert.equal(invalid.status, 400);

  const future = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();
  const unconfigured = await post("/api/book", { name: "Test Client", email: "test@example.com", start: future, duration: 30, timezone: "Europe/Malta", privacy_consent: "agreed" });
  assert.equal(unconfigured.status, 503);
  assert.deepEqual(await unconfigured.json(), { error: "booking_not_configured" });

  const rejectedOrigin = await post(
    "/api/book",
    { name: "Test", email: "test@example.com" },
    {},
    { origin: "https://example.net" },
  );
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
