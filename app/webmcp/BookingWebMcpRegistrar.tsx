"use client";

import { useEffect } from "react";
import { registerTools } from "@nekuda/webmcp-sdk";
import {
  attachBookingToolBindings,
  prepareFstMeetingRequestTool,
  type BookingToolBindings,
} from "./tools/prepare-fst-meeting-request";

export function BookingWebMcpRegistrar({ bindings }: { bindings: BookingToolBindings }) {
  useEffect(() => {
    const detach = attachBookingToolBindings(bindings);
    const registration = registerTools([prepareFstMeetingRequestTool], { telemetry: false });
    return () => {
      registration.unregister();
      detach();
    };
  }, [bindings]);
  return null;
}
