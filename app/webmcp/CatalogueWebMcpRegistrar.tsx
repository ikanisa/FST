"use client";

import { useEffect } from "react";
import { registerTools } from "@nekuda/webmcp-sdk";
import {
  attachCatalogueToolBindings,
  prepareFstServiceRequestTool,
  type CatalogueToolBindings,
} from "./tools/prepare-fst-service-request";

export function CatalogueWebMcpRegistrar({ bindings }: { bindings: CatalogueToolBindings }) {
  useEffect(() => {
    const detach = attachCatalogueToolBindings(bindings);
    const registration = registerTools([prepareFstServiceRequestTool], { telemetry: false });
    return () => {
      registration.unregister();
      detach();
    };
  }, [bindings]);
  return null;
}
