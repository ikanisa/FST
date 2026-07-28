export const siteConfig = {
  name: "FST",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://fst-advisory.ikanisa.chatgpt.site").replace(/\/$/, ""),
  whatsappDisplay: "+35699152999",
  whatsappUrl: "https://wa.me/35699152999",
  linkedInUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
  bookingUrl: "/book",
  primaryCtaLabel: "Book a Meeting",
  bookingRecipients: ["bosco@ikanisa.com"],
  appointmentScheduleUrl: process.env.NEXT_PUBLIC_GOOGLE_BOOKING_URL || "",
  serviceArea:
    "Supporting Malta-based and international businesses, finance teams and institutions through online and appointment-led engagements.",
} as const;

export function googleCalendarTemplateUrl({
  start,
  end,
  name,
  email,
  context,
}: {
  start: Date;
  end: Date;
  name: string;
  email: string;
  context: string;
}) {
  const compactUtc = (date: Date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "FST advisory conversation",
    dates: `${compactUtc(start)}/${compactUtc(end)}`,
    details: `Requested by ${name} (${email}).\n\nContext: ${context || "Advisory conversation"}\n\nPlease add Google Meet before sending if it is not added automatically.`,
    location: "Google Meet",
  });
  siteConfig.bookingRecipients.forEach((recipient) => params.append("add", recipient));
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
