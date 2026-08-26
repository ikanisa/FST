"use client";

import type { AnchorHTMLAttributes } from "react";
import { siteConfig } from "../../lib/site-config";
import { TrackedLink } from "./TrackedLink";
import { marketPath, type JurisdictionCode } from "../../lib/jurisdictions";

type PrimaryCtaProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> & {
  jurisdiction?: JurisdictionCode;
};

export function PrimaryCta({ jurisdiction, ...props }: PrimaryCtaProps) {
  return (
    <TrackedLink {...props} href={jurisdiction ? marketPath(jurisdiction, siteConfig.bookingUrl) : siteConfig.bookingUrl} event="booking_click">
      {siteConfig.primaryCtaLabel}
    </TrackedLink>
  );
}
