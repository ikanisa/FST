"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { trackConversion } from "../../lib/analytics";
import { googleCalendarTemplateUrl, siteConfig } from "../../lib/site-config";

type BookingResult = { calendarUrl?: string; meetUrl?: string; error?: string };

function minimumBookableStart() {
  const date = new Date(Date.now() + 60 * 60 * 1000);
  date.setMinutes(Math.ceil(date.getMinutes() / 15) * 15, 0, 0);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
  return local.toISOString().slice(0, 16);
}

export function BookingForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "unavailable" | "error">("idle");
  const [result, setResult] = useState<BookingResult>({});
  const startInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    startInputRef.current?.setAttribute("min", minimumBookableStart());
  }, []);

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
        <label>Requested start<input ref={startInputRef} type="datetime-local" name="start" required /></label>
        <label>Conversation length<select name="duration" defaultValue="30"><option value="30">30 minutes</option><option value="60">60 minutes</option></select></label>
      </div>
      <label>What must be decided or completed?<textarea name="context" rows={4} aria-describedby="booking-context-note" /></label>
      <p className="booking-data-note" id="booking-context-note">Do not include passwords, payment credentials, identity documents, health information or confidential client records in this form.</p>
      <label className="consent-check">
        <input type="checkbox" name="privacy_consent" value="agreed" required />
        <span>I permit FST to use these details to process and respond to this scheduling request as described in the <Link href="/privacy">privacy notice</Link>.</span>
      </label>
      {status === "error" && (
        <p className="form-error" role="alert">
          {result.error === "slot_unavailable"
            ? "That slot has just been taken. Select a different one."
            : result.error === "time_out_of_range"
              ? "Choose a time at least one hour from now and within the next 180 days."
              : "The request could not be completed. Try again or use the phone or WhatsApp channel."}
        </p>
      )}
      <button className="submit-button" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Checking the requested slot…" : siteConfig.primaryCtaLabel}</button>
      <p className="booking-note">A meeting request is not a professional engagement. The legal provider, responsible professional, scope and terms are confirmed separately before work starts.</p>
      {siteConfig.appointmentScheduleUrl && <a className="schedule-link" href={siteConfig.appointmentScheduleUrl} target="_blank" rel="noreferrer">Browse the full calendar schedule</a>}
    </form>
  );
}
