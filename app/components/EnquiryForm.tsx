"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { marketPath, type JurisdictionCode } from "../../lib/jurisdictions";
import { trackConversion } from "../../lib/analytics";

type EnquiryFormProps = {
  jurisdiction: JurisdictionCode;
  initialServiceIds?: string[];
  initialServiceLabels?: string[];
  packageContext?: {
    id: string;
    slug: string;
    version: string;
    title: string;
    catalogueEntryId: string;
    catalogueEntryTitle: string;
    addonIds: string[];
    addonLabels: string[];
    atomicServiceIds: string[];
    scopeAnswers: Record<string, string | boolean>;
    quoteStatus: "indicative_fit" | "manual_review_required" | "scope_requested";
  };
  whatsappUrl?: string;
  contactEmail?: string;
};

type EnquiryResult = { ok?: boolean; requestId?: string; error?: string };

export function EnquiryForm({ jurisdiction, initialServiceIds = [], initialServiceLabels = [], packageContext, whatsappUrl = "", contactEmail = "" }: EnquiryFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" | "unavailable">("idle");
  const [result, setResult] = useState<EnquiryResult>({});

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    if (values.get("company_website")) return;

    setStatus("submitting");
    trackConversion("contact_form_submit");
    try {
      const response = await fetch("/api/v1/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          jurisdiction,
          name: values.get("name"),
          email: values.get("email"),
          organisation: values.get("organisation"),
          phone: values.get("phone"),
          message: values.get("message"),
          serviceIds: initialServiceIds,
          packageId: packageContext?.id,
          packageVersion: packageContext?.version,
          packageEntryId: packageContext?.catalogueEntryId,
          scopeAnswers: packageContext?.scopeAnswers,
          addonIds: packageContext?.addonIds,
          atomicServiceIds: packageContext?.atomicServiceIds,
          quoteStatus: packageContext?.quoteStatus,
          privacy_consent: values.get("privacy_consent"),
          company_website: values.get("company_website"),
          sourcePath: window.location.pathname,
        }),
      });
      const data = (await response.json()) as EnquiryResult;
      setResult(data);
      if (response.ok) {
        setStatus("success");
        form.reset();
        trackConversion("contact_form_success");
      } else if (data.error === "enquiry_storage_not_configured") {
        setStatus("unavailable");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("unavailable");
    }
  }

  if (status === "success") {
    return (
      <div className="booking-success" role="status">
        <p className="eyebrow">Request received</p>
        <h2>Your request is in the controlled intake queue.</h2>
        <p>Reference <strong>{result.requestId}</strong>. This confirms receipt only; the responsible provider, scope, fee and engagement terms are confirmed separately.</p>
        <button type="button" className="reset-button" onClick={() => setStatus("idle")}>Send another request</button>
      </div>
    );
  }

  return (
    <form className="booking-form enquiry-form" onSubmit={submit}>
      <input className="honeypot-field" type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {initialServiceIds.length > 0 && (
        <div className="enquiry-selection-summary" aria-label="Selected catalogue services">
          <strong>{initialServiceIds.length} {initialServiceIds.length === 1 ? "service" : "services"} attached</strong>
          {initialServiceLabels.length > 0 && <ul>{initialServiceLabels.map((label) => <li key={label}>{label}</li>)}</ul>}
        </div>
      )}
      {packageContext && (
        <div className="enquiry-selection-summary package-selection-summary" aria-label="Selected sector package">
          <strong>{packageContext.catalogueEntryTitle || packageContext.title}</strong>
          {packageContext.catalogueEntryTitle && <small>{packageContext.title}</small>}
          <span>Package version {packageContext.version} · {packageContext.quoteStatus === "manual_review_required" ? "manual scope review" : "indicative scope"}</span>
          {packageContext.addonLabels.length > 0 && <ul>{packageContext.addonLabels.map((label) => <li key={label}>{label}</li>)}</ul>}
        </div>
      )}
      <div className="field-row">
        <label>Your name<input name="name" autoComplete="name" required maxLength={120} /></label>
        <label>Business email<input type="email" name="email" autoComplete="email" required maxLength={254} /></label>
      </div>
      <div className="field-row">
        <label>Organisation or project<input name="organisation" autoComplete="organization" maxLength={160} /></label>
        <label>Phone (optional)<input name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>
      </div>
      <label>What must be decided or completed?<textarea name="message" rows={6} required maxLength={3000} aria-describedby="enquiry-data-note" placeholder={packageContext ? "Add the current deadline, operating issue and records available." : undefined} /></label>
      <p className="booking-data-note" id="enquiry-data-note">Do not include passwords, payment credentials, identity documents, health information or confidential client records.</p>
      <label className="consent-check">
        <input type="checkbox" name="privacy_consent" value="agreed" required />
        <span>I permit FST to use these details to assess and respond to this request as described in the <Link href={marketPath(jurisdiction, "/privacy")}>privacy notice</Link>.</span>
      </label>
      {status === "error" && <p className="form-error" role="alert">The request could not be accepted. Check the fields and try again.</p>}
      {status === "unavailable" && (
        <div className="form-error" role="alert">
          <p>The secure intake queue is temporarily unavailable.</p>
          {whatsappUrl && <a className="text-link" href={whatsappUrl} target="_blank" rel="noreferrer">Continue on WhatsApp</a>}
          {!whatsappUrl && contactEmail && <a className="text-link" href={`mailto:${contactEmail}`}>Continue by email</a>}
        </div>
      )}
      <button className="submit-button" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Submitting securely…" : "Submit secure request"}</button>
      <p className="booking-data-note">Submitting does not create an engagement, professional relationship or payment obligation.</p>
    </form>
  );
}
