"use client";

import { useEffect } from "react";
import { registerTools } from "@nekuda/webmcp-sdk";
import { askFstSiteTool } from "./tools/ask-fst-site";
import { browseFstOfferingsTool } from "./tools/browse-fst-offerings";

(globalThis as typeof globalThis & { __WEBMCP_TELEMETRY__?: boolean }).__WEBMCP_TELEMETRY__ = false;

export function WebMcpRegistrar() {
  useEffect(() => {
    const registration = registerTools([askFstSiteTool, browseFstOfferingsTool], { telemetry: false });
    return () => registration.unregister();
  }, []);
  return null;
}
