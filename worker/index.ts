/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  GOOGLE_CALENDAR_CLIENT_ID?: string;
  GOOGLE_CALENDAR_CLIENT_SECRET?: string;
  GOOGLE_CALENDAR_ID?: string;
  GOOGLE_CALENDAR_REFRESH_TOKEN?: string;
  GOOGLE_CALENDAR_TIMEZONE?: string;
  MT_GOOGLE_CALENDAR_ID?: string;
  MT_GOOGLE_CALENDAR_TIMEZONE?: string;
  MT_BOOKING_RECIPIENTS?: string;
  RW_GOOGLE_CALENDAR_ID?: string;
  RW_GOOGLE_CALENDAR_TIMEZONE?: string;
  RW_BOOKING_RECIPIENTS?: string;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

type MarketCode = "mt" | "rw";

function detectMarketAtEdge(request: Request): { market: MarketCode; source: "country" | "language" } | null {
  const cloudflareCountry = (request as Request & { cf?: { country?: string } }).cf?.country;
  const country = (cloudflareCountry || request.headers.get("CF-IPCountry") || "").trim().toUpperCase();
  if (country === "RW") return { market: "rw", source: "country" };
  if (country === "MT") return { market: "mt", source: "country" };

  const language = request.headers.get("Accept-Language") || "";
  if (/(?:^|[,;\s])(?:rw|en-RW)(?:[-,;\s]|$)/i.test(language)) return { market: "rw", source: "language" };
  if (/(?:^|[,;\s])(?:mt|en-MT)(?:[-,;\s]|$)/i.test(language)) return { market: "mt", source: "language" };
  return null;
}

function automaticMarketRedirect(request: Request, market: MarketCode, source: "country" | "language") {
  const location = new URL(`/${market}`, request.url);
  const response = new Response(null, {
    status: 307,
    headers: {
      Location: location.toString(),
      "Cache-Control": "private, no-store",
      Vary: "CF-IPCountry, Accept-Language",
      "X-FST-Market-Selection": source,
    },
  });
  return withSecurityHeaders(response, request);
}

function withSecurityHeaders(response: Response, request: Request) {
  const secured = new Response(response.body, response);
  secured.headers.set("X-Content-Type-Options", "nosniff");
  secured.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  secured.headers.set("Permissions-Policy", "camera=(), geolocation=(), microphone=(), payment=()");
  secured.headers.set("Content-Security-Policy", "base-uri 'self'; frame-ancestors 'none'; object-src 'none'");
  if (new URL(request.url).protocol === "https:") {
    secured.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  }
  return secured;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    globalThis.__FST_ENV__ = env as unknown as Record<string, unknown>;
    const url = new URL(request.url);

    if (url.pathname === "/" && (request.method === "GET" || request.method === "HEAD")) {
      const detected = detectMarketAtEdge(request);
      if (detected) return automaticMarketRedirect(request, detected.market, detected.source);
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      const response = await handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
      return withSecurityHeaders(response, request);
    }

    const response = await handler.fetch(request, env, ctx);
    return withSecurityHeaders(response, request);
  },
};

export default worker;
