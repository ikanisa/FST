export type ConversionEvent =
  | "contact_phone_click"
  | "contact_whatsapp_click"
  | "booking_click"
  | "booking_form_submit"
  | "booking_created"
  | "booking_fallback_open"
  | "contact_form_submit"
  | "contact_form_success"
  | "service_catalogue_order"
  | "linkedin_click";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackConversion(event: ConversionEvent) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, { event_category: "conversion" });
}
