import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (relativePath) => readFile(path.join(root, relativePath), "utf8");

const tools = [
  ["ask-fst-site", "fst.content.ask", "ask_fst_site"],
  ["browse-fst-offerings", "fst.catalogue.browse", "browse_fst_offerings"],
  ["prepare-fst-service-request", "fst.request.prepare", "prepare_fst_service_request"],
  ["prepare-fst-meeting-request", "fst.booking.prepare", "prepare_fst_meeting_request"],
];

test("pins the approved WebMCP SDK in the npm manifest and lockfile", async () => {
  const manifest = JSON.parse(await read("package.json"));
  const lockfile = JSON.parse(await read("package-lock.json"));
  assert.equal(manifest.dependencies["@nekuda/webmcp-sdk"], "0.4.0");
  assert.equal(lockfile.packages[""].dependencies["@nekuda/webmcp-sdk"], "0.4.0");
  assert.equal(lockfile.packages["node_modules/@nekuda/webmcp-sdk"].version, "0.4.0");
});

test("keeps every generated tool on the SDK with durable identity and closed input schemas", async () => {
  for (const [id, stableKey, name] of tools) {
    const source = await read(`app/webmcp/tools/${id}.ts`);
    assert.match(source, /import \{ defineTool \} from "@nekuda\/webmcp-sdk";/);
    assert.match(source, new RegExp(`stableKey: "${stableKey.replaceAll(".", "\\.")}"`));
    assert.match(source, new RegExp(`name: "${name}"`));
    assert.match(source, /additionalProperties: false/);
    assert.doesNotMatch(source, /document\.modelContext|navigator\.modelContext|https:\/\/wa\.me|googleapis\.com/);
  }
});

test("keeps Explorer review copies byte-for-byte aligned with real tool modules", async () => {
  for (const [id] of tools) {
    assert.equal(await read(`.webmcp/${id}.code.md`), await read(`app/webmcp/tools/${id}.ts`));
  }
});

test("registers global and contextual tools with telemetry disabled and cleanup lifecycles", async () => {
  for (const file of ["WebMcpRegistrar.tsx", "CatalogueWebMcpRegistrar.tsx", "BookingWebMcpRegistrar.tsx"]) {
    const source = await read(`app/webmcp/${file}`);
    assert.match(source, /registerTools\(/);
    assert.match(source, /telemetry: false/);
    assert.match(source, /registration\.unregister\(\)/);
  }
  assert.match(await read("app/webmcp/WebMcpRegistrar.tsx"), /__WEBMCP_TELEMETRY__ = false/);
});

test("preserves human review boundaries for WhatsApp and Calendar actions", async () => {
  const catalogue = await read("app/components/ServiceCatalogue.tsx");
  const booking = await read("app/components/BookingForm.tsx");
  assert.match(catalogue, /whatsappMessageSent: false/);
  assert.match(catalogue, /prepared_for_human_review/);
  assert.match(booking, /privacyConsent: "awaiting_visitor"/);
  assert.match(booking, /calendarEventCreated: false/);
  assert.match(booking, /invitationsSent: false/);
});
