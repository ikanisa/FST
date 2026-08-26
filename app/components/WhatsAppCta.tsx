"use client";

import type { AnchorHTMLAttributes } from "react";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr/WhatsappLogo";
import { jurisdictionConfig, type JurisdictionCode } from "../../lib/jurisdictions";
import { TrackedLink } from "./TrackedLink";

type WhatsAppCtaProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> & {
  jurisdiction: JurisdictionCode;
  label?: string;
};

export function WhatsAppCta({ jurisdiction, label = "Chat on WhatsApp", className = "whatsapp-button", ...props }: WhatsAppCtaProps) {
  const config = jurisdictionConfig[jurisdiction];

  return (
    <TrackedLink
      {...props}
      className={className}
      href={config.whatsappUrl}
      event="contact_whatsapp_click"
      target="_blank"
      rel="noreferrer"
      aria-label={`${label} at ${config.whatsappDisplay}`}
    >
      <WhatsappLogo size={22} weight="fill" aria-hidden="true" />
      <span>{label}</span>
    </TrackedLink>
  );
}
