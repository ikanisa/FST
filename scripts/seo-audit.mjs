const baseUrl = (process.argv[2] || "https://fst.ikanisa.com").replace(/\/$/, "");

function match(html, pattern) {
  return html.match(pattern)?.[1]?.trim() || "";
}

function decode(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function assert(condition, message, failures) {
  if (!condition) failures.push(message);
}

const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
if (!sitemapResponse.ok) throw new Error(`Sitemap returned ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((entry) => decode(entry[1]));
const failures = [];
const titles = new Map();
const descriptions = new Map();

assert(urls.length > 0, "Sitemap does not contain URLs", failures);
assert(new Set(urls).size === urls.length, "Sitemap contains duplicate URLs", failures);

for (const url of urls) {
  const auditUrl = `${baseUrl}${new URL(url).pathname}`;
  const response = await fetch(auditUrl, { redirect: "manual" });
  assert(response.status === 200, `${url} returned ${response.status}`, failures);
  if (response.status !== 200) continue;

  const html = await response.text();
  const title = decode(match(html, /<title>(.*?)<\/title>/is));
  const description = decode(match(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i));
  const canonical = match(html, /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i);
  const h1Count = (html.match(/<h1(?:\s|>)/gi) || []).length;
  const robots = match(html, /<meta[^>]+name="robots"[^>]+content="([^"]*)"/i);
  const jsonLdBlocks = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>(.*?)<\/script>/gis)];

  assert(title.length >= 10 && title.length <= 65, `${url} title length is ${title.length}`, failures);
  assert(description.length >= 70 && description.length <= 180, `${url} description length is ${description.length}`, failures);
  assert(canonical === url, `${url} canonical is ${canonical || "missing"}`, failures);
  assert(h1Count === 1, `${url} has ${h1Count} H1 elements`, failures);
  assert(!/noindex|nofollow/i.test(robots), `${url} is not indexable`, failures);
  assert(/property="og:title"/i.test(html), `${url} is missing og:title`, failures);
  assert(/name="twitter:card"/i.test(html), `${url} is missing twitter:card`, failures);
  assert(jsonLdBlocks.length > 0, `${url} is missing JSON-LD`, failures);

  for (const block of jsonLdBlocks) {
    try {
      JSON.parse(block[1]);
    } catch {
      failures.push(`${url} contains invalid JSON-LD`);
    }
  }

  if (titles.has(title)) failures.push(`${url} duplicates title used by ${titles.get(title)}`);
  else titles.set(title, url);
  if (descriptions.has(description)) failures.push(`${url} duplicates description used by ${descriptions.get(description)}`);
  else descriptions.set(description, url);
}

for (const [legacyPath, canonicalPath] of [
  ["/services/tax-vat", "/services/taxation"],
  ["/services/business-planning-finance-applications", "/services/loan-funding-application-support"],
  ["/services/loan-application-support", "/services/loan-funding-application-support"],
  ["/services/funding-applications", "/services/loan-funding-application-support"],
]) {
  const response = await fetch(`${baseUrl}${legacyPath}`, { redirect: "manual" });
  assert([301, 308].includes(response.status), `${legacyPath} returned ${response.status} instead of a permanent redirect`, failures);
  assert(
    new URL(response.headers.get("location") || "", baseUrl).pathname === canonicalPath,
    `${legacyPath} does not redirect to ${canonicalPath}`,
    failures,
  );
}

if (failures.length) {
  console.error(`SEO audit failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`SEO audit passed for ${urls.length} canonical pages at ${baseUrl}.`);
