import { readFileSync, writeFileSync } from 'node:fs';
import { buildPortableArtifact } from '/Users/jeanbosco/.codex/plugins/cache/openai-curated-remote/data-analytics/0.2.8-13ceeea1f599/skills/build-report/scripts/build_portable_artifact.mjs';
import { extractPortableChartSvgs } from '/Users/jeanbosco/.codex/plugins/cache/openai-curated-remote/data-analytics/0.2.8-13ceeea1f599/skills/build-report/scripts/extract_portable_chart_svgs.mjs';
import { verifyPortableArtifact, verifyPortableArtifactStructure } from '/Users/jeanbosco/.codex/plugins/cache/openai-curated-remote/data-analytics/0.2.8-13ceeea1f599/skills/build-report/scripts/verify_portable_artifact.mjs';

const root = new URL('./', import.meta.url);
const artifactPath = new URL('./artifact.json', root);
const stagingPath = new URL('./report.staging.html', root);
const outputPath = new URL('./report.html', root);
const screenshotPath = new URL('./report-verification-failure.png', root);
const artifact = JSON.parse(readFileSync(artifactPath, 'utf8'));

let html = buildPortableArtifact(artifact);
html = html.replace('</head>', '<style id="fst-portable-containment">html,body{overflow-x:clip}</style></head>');
writeFileSync(stagingPath, html, 'utf8');

let extraction = { status: 'not-needed' };
if (html.includes('<figure class="portable-content-card portable-chart-summary"')) {
  try {
    const staticCharts = await extractPortableChartSvgs({
      actionTimeoutMs: 10000,
      htmlPath: stagingPath.pathname,
      readyTimeoutMs: 15000
    });
    html = buildPortableArtifact(artifact, { staticCharts });
    html = html.replace('</head>', '<style id="fst-portable-containment">html,body{overflow-x:clip}</style></head>');
    writeFileSync(stagingPath, html, 'utf8');
    extraction = { status: 'passed', charts: Object.keys(staticCharts).length };
  } catch (error) {
    extraction = { status: 'runtime-fallback', error: String(error.message ?? error) };
  }
}

writeFileSync(outputPath, html, 'utf8');
const structural = verifyPortableArtifactStructure({ artifactPath: artifactPath.pathname, htmlPath: outputPath.pathname });

let browser;
try {
  browser = await verifyPortableArtifact({
    actionTimeoutMs: 10000,
    artifactPath: artifactPath.pathname,
    htmlPath: outputPath.pathname,
    readyTimeoutMs: 15000,
    screenshotPath: screenshotPath.pathname,
    timeoutMs: 30000
  });
} catch (error) {
  browser = {
    ok: false,
    code: error.code ?? error.verificationResult?.code ?? 'browser_verification_failed',
    error: String(error.verificationResult?.error ?? error.message ?? error),
    details: error.details ?? error.verificationResult?.details ?? null,
    result: error.verificationResult ?? null
  };
}

console.log(JSON.stringify({ output: outputPath.pathname, extraction, structural, browser }, null, 2));
