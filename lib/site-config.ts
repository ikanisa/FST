export const siteConfig = {
  name: "FST",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://fst.ikanisa.com").replace(/\/$/, ""),
  portfolioRelationship:
    "FST operates within the IKANISA portfolio and uses IKANISA’s supervised professional AI-agent infrastructure.",
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME || "",
  companyRegistrationNumber: process.env.NEXT_PUBLIC_COMPANY_REGISTRATION_NUMBER || "",
  vatNumber: process.env.NEXT_PUBLIC_VAT_NUMBER || "",
  registeredAddress: process.env.NEXT_PUBLIC_REGISTERED_ADDRESS || "",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  complaintsEmail: process.env.NEXT_PUBLIC_COMPLAINTS_EMAIL || "",
  accountancyBoardRegistration: process.env.NEXT_PUBLIC_ACCOUNTANCY_BOARD_REGISTRATION || "",
  responsiblePrincipal: process.env.NEXT_PUBLIC_RESPONSIBLE_PRINCIPAL || "",
  principalWarrantNumber: process.env.NEXT_PUBLIC_PRINCIPAL_WARRANT_NUMBER || "",
  whatsappDisplay: "+35699711145",
  whatsappUrl: "https://wa.me/35699711145",
  linkedInUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
  bookingUrl: "/book",
  primaryCtaLabel: "Book a Meeting",
  bookingRecipients: ["bosco@ikanisa.com"],
  serviceOrderWhatsappDisplay: "+35699711145",
  serviceOrderWhatsappUrl: "https://wa.me/35699711145",
  appointmentScheduleUrl: process.env.NEXT_PUBLIC_GOOGLE_BOOKING_URL || "",
  serviceArea:
    "Supporting local and international businesses, finance teams and institutions through online and appointment-led engagements.",
} as const;

export const legalDisclosureReady = Boolean(
  siteConfig.legalName &&
  siteConfig.companyRegistrationNumber &&
  siteConfig.registeredAddress &&
  siteConfig.contactEmail,
);

export function googleCalendarTemplateUrl({
  start,
  end,
  name,
  email,
  context,
  title = "FST advisory conversation",
  timezone,
  recipients = siteConfig.bookingRecipients,
}: {
  start: Date;
  end: Date;
  name: string;
  email: string;
  context: string;
  title?: string;
  timezone?: string;
  recipients?: readonly string[];
}) {
  const compactUtc = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${compactUtc(start)}/${compactUtc(end)}`,
    details: `Requested by ${name} (${email}).\n\nContext: ${context || "Advisory conversation"}\n\nPlease add Google Meet before sending if it is not added automatically.`,
    location: "Google Meet",
  });
  if (timezone) params.set("ctz", timezone);
  recipients.filter(Boolean).forEach((recipient) => params.append("add", recipient));
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
