"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { trackConversion } from "../../lib/analytics";
import { googleCalendarTemplateUrl, siteConfig } from "../../lib/site-config";

type BookingResult = { calendarUrl?: string; meetUrl?: string; error?: string };

export function BookingForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "unavailable" | "error">("idle");
  const [result, setResult] = useState<BookingResult>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    if (values.get("company_website")) return;

    const localStart = new Date(String(values.get("start") || ""));
    const duration = Number(values.get("duration"));
    if (Number.isNaN(localStart.getTime())) return;

    const payload = {
      name: String(values.get("name") || ""),
      email: String(values.get("email") || ""),
      organisation: String(values.get("organisation") || ""),
      context: String(values.get("context") || ""),
      start: localStart.toISOString(),
      duration,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      privacy_consent: values.get("privacy_consent"),
      company_website: values.get("company_website"),
    };

    setStatus("submitting");
    trackConversion("booking_form_submit");
    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as BookingResult;
      if (response.ok) {
        setResult(data);
        setStatus("success");
        trackConversion("booking_created");
        return;
      }
      if (data.error === "booking_not_configured" || data.error === "calendar_service_unavailable") {
        const fallbackUrl = googleCalendarTemplateUrl({
          start: localStart,
          end: new Date(localStart.getTime() + duration * 60 * 1000),
          name: payload.name,
          email: payload.email,
          context: payload.context,
        });
        setResult({ calendarUrl: fallbackUrl });
        setStatus("unavailable");
        return;
      }
      setResult(data);
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="booking-success" role="status">
        <p className="eyebrow">Slot confirmed</p>
        <h2>The meeting has been placed on the calendar.</h2>
        <p>The invitation has been issued to your address and the FST scheduling contacts. You can open either destination below.</p>
        <div className="booking-result-actions">
          {result.calendarUrl && <a className="text-link" href={result.calendarUrl} target="_blank" rel="noreferrer">View calendar entry</a>}
          {result.meetUrl && <a className="text-link" href={result.meetUrl} target="_blank" rel="noreferrer">Enter meeting room</a>}
        </div>
        <button type="button" className="reset-button" onClick={() => setStatus("idle")}>Start a new request</button>
      </div>
    );
  }

  if (status === "unavailable") {
    return (
      <div className="booking-success" role="status">
        <p className="eyebrow">Complete in your calendar</p>
        <h2>The draft invitation is ready for review.</h2>
        <p>Open the prepared event, add the meeting conference, check the details and send it to FST for confirmation.</p>
        {result.calendarUrl && <a className="text-link" href={result.calendarUrl} target="_blank" rel="noreferrer" onClick={() => trackConversion("booking_fallback_open")}>Review prepared event</a>}
        <button type="button" className="reset-button" onClick={() => setStatus("idle")}>Select a different slot</button>
      </div>
    );
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <input type="hidden" name="company_website" value="" readOnly />
      <div className="field-row">
        <label>Your name<input name="name" autoComplete="name" required /></label>
        <label>Business email<input type="email" name="email" autoComplete="email" required /></label>
      </div>
      <label>Organisation or project<input name="organisation" autoComplete="organization" /></label>
      <div className="field-row">
        <label>Requested start<input type="datetime-local" name="start" required /></label>
        <label>Conversation length<select name="duration" defaultValue="30"><option value="30">30 minutes</option><option value="60">60 minutes</option></select></label>
      </div>
      <label>What must be decided or completed?<textarea name="context" rows={4} /></label>
      <label className="consent-check">
        <input type="checkbox" name="privacy_consent" value="agreed" required />
        <span>I permit FST to use these details to process and respond to this scheduling request, as set out in the <Link href="/privacy">data notice</Link>.</span>
      </label>
      {status === "error" && <p className="form-error" role="alert">{result.error === "slot_unavailable" ? "That slot has just been taken. Select a different one." : "The request could not be completed. Try again or use the phone or WhatsApp channel."}</p>}
      <button className="submit-button" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Checking the requested slot…" : siteConfig.primaryCtaLabel}</button>
      <p className="booking-note">A request becomes confirmed only when the calendar invitation is issued with its meeting link.</p>
      {siteConfig.appointmentScheduleUrl && <a className="schedule-link" href={siteConfig.appointmentScheduleUrl} target="_blank" rel="noreferrer">Browse the full calendar schedule</a>}
    </form>
  );
}
