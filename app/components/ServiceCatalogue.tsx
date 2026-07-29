"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Check } from "@phosphor-icons/react/Check";
import { MagnifyingGlass } from "@phosphor-icons/react/MagnifyingGlass";
import { Minus } from "@phosphor-icons/react/Minus";
import { Plus } from "@phosphor-icons/react/Plus";
import { SealCheck } from "@phosphor-icons/react/SealCheck";
import { X } from "@phosphor-icons/react/X";
import { catalogueCategories, catalogueServices, formatCataloguePrice, type CatalogueCategoryId } from "../../lib/service-catalogue";
import { siteConfig } from "../../lib/site-config";
import { trackConversion } from "../../lib/analytics";

const allCategory = "all";

export function ServiceCatalogue() {
  const [activeCategory, setActiveCategory] = useState<CatalogueCategoryId | typeof allCategory>(allCategory);
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [mobileOrderOpen, setMobileOrderOpen] = useState(false);
  const mobileOrderRef = useRef<HTMLDivElement>(null);

  const selectedServices = useMemo(
    () => selectedIds.map((id) => catalogueServices.find((service) => service.id === id)).filter(Boolean),
    [selectedIds],
  );

  useEffect(() => {
    if (!mobileOrderOpen) return;
    const previousOverflow = document.body.style.overflow;
    const handleModalKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOrderOpen(false);
      if (event.key !== "Tab") return;
      const focusable = Array.from(
        mobileOrderRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
        ) || [],
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleModalKeys);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleModalKeys);
    };
  }, [mobileOrderOpen]);

  const filteredServices = useMemo(() => {
    const search = query.trim().toLowerCase();
    return catalogueServices.filter((service) => {
      const matchesCategory = activeCategory === allCategory || service.category === activeCategory;
      const matchesSearch =
        !search ||
        [service.title, service.description, ...service.tags].some((value) => value.toLowerCase().includes(search));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, query]);

  function toggleService(id: string) {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((serviceId) => serviceId !== id) : [...current, id],
    );
  }

  function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedServices.length) return;
    const values = new FormData(event.currentTarget);
    const lines = selectedServices.map((service, index) =>
      service ? `${index + 1}. ${service.title} — ${formatCataloguePrice(service)} ${service.unit}` : "",
    );
    const message = [
      "Hello FST, I would like an indicative scope and fee for:",
      "",
      ...lines,
      "",
      `Name: ${String(values.get("name") || "")}`,
      `Email: ${String(values.get("email") || "")}`,
      `Organisation: ${String(values.get("organisation") || "Not provided")}`,
      `Timing: ${String(values.get("timing") || "Flexible")}`,
      `Context: ${String(values.get("context") || "No additional context")}`,
      "",
      "I understand that these are indicative starting fees and that no work begins until FST confirms scope, professional acceptance and a final quote.",
    ].join("\n");
    const whatsappUrl = `${siteConfig.whatsappUrl}?text=${encodeURIComponent(message)}`;
    trackConversion("service_catalogue_order");
    window.location.assign(whatsappUrl);
  }

  const emailSummary = selectedServices
    .map((service, index) => service ? `${index + 1}. ${service.title} — ${formatCataloguePrice(service)} ${service.unit}` : "")
    .join("\n");
  const emailUrl = `mailto:${siteConfig.bookingRecipients[0]}?subject=${encodeURIComponent("FST service order enquiry")}&body=${encodeURIComponent(`Hello FST,\n\nI would like an indicative scope and fee for:\n${emailSummary}\n\nPlease contact me to confirm the engagement scope.`)}`;

  return (
    <>
      <section className="catalogue-toolbar section-shell" aria-label="Find a service">
        <label className="catalogue-search">
          <MagnifyingGlass size={20} aria-hidden="true" />
          <span className="sr-only">Search services</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search bookkeeping, VAT, contracts, grants…"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear service search">
              <X size={17} aria-hidden="true" />
            </button>
          )}
        </label>
        <div className="catalogue-filters" role="group" aria-label="Filter services by category">
          <button
            type="button"
            className={activeCategory === allCategory ? "is-active" : ""}
            onClick={() => setActiveCategory(allCategory)}
            aria-pressed={activeCategory === allCategory}
          >
            All <span>{catalogueServices.length}</span>
          </button>
          {catalogueCategories.map((category) => {
            const count = catalogueServices.filter((service) => service.category === category.id).length;
            return (
              <button
                type="button"
                key={category.id}
                className={activeCategory === category.id ? "is-active" : ""}
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={activeCategory === category.id}
              >
                {category.shortLabel} <span>{count}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="catalogue-layout section-shell">
        <div className="catalogue-results">
          <div className="catalogue-results-heading" aria-live="polite">
            <p><strong>{filteredServices.length}</strong> {filteredServices.length === 1 ? "service" : "services"}</p>
            <span>{query ? `Matching “${query}”` : activeCategory === allCategory ? "Across every FST practice" : catalogueCategories.find((category) => category.id === activeCategory)?.description}</span>
          </div>

          {filteredServices.length ? (
            <div className="catalogue-card-grid">
              {filteredServices.map((service) => {
                const selected = selectedIds.includes(service.id);
                const category = catalogueCategories.find((item) => item.id === service.category);
                return (
                  <article className={`catalogue-card ${selected ? "is-selected" : ""}`} key={service.id}>
                    <div className="catalogue-card-topline">
                      <span>{category?.shortLabel}</span>
                      <div>
                        {service.popular && <span className="catalogue-popular">Popular</span>}
                        {service.regulated && <span className="catalogue-regulated" title="Professional acceptance conditions apply"><SealCheck size={15} aria-hidden="true" /> Reviewed</span>}
                      </div>
                    </div>
                    <h2>{service.title}</h2>
                    <p>{service.description}</p>
                    <div className="catalogue-card-action">
                      <div className="catalogue-price">
                        <strong>{formatCataloguePrice(service)}</strong>
                        <span>{service.unit}</span>
                      </div>
                      <button
                        type="button"
                        className={selected ? "catalogue-remove-button" : "catalogue-add-button"}
                        onClick={() => toggleService(service.id)}
                        aria-pressed={selected}
                        aria-label={`${selected ? "Remove" : "Add"} ${service.title} ${selected ? "from" : "to"} order`}
                      >
                        {selected ? <><Check size={17} aria-hidden="true" /> Added</> : <><Plus size={17} aria-hidden="true" /> Add</>}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="catalogue-empty">
              <MagnifyingGlass size={28} aria-hidden="true" />
              <h2>No exact match yet.</h2>
              <p>Try a broader phrase or send FST the outcome you need. We can scope work that is not listed.</p>
              <button type="button" onClick={() => { setQuery(""); setActiveCategory(allCategory); }}>Reset filters</button>
            </div>
          )}
        </div>

        <aside className="catalogue-order-desktop" aria-label="Your selected services">
          <OrderPanel
            selectedServices={selectedServices}
            removeService={toggleService}
            submitOrder={submitOrder}
            emailUrl={emailUrl}
          />
        </aside>
      </section>

      {selectedServices.length > 0 && (
        <button
          type="button"
          className="catalogue-mobile-order-bar"
          onClick={() => setMobileOrderOpen(true)}
          aria-haspopup="dialog"
        >
          <span>{selectedServices.length} {selectedServices.length === 1 ? "service" : "services"} selected</span>
          <strong>Review order</strong>
        </button>
      )}

      {mobileOrderOpen && (
        <div className="catalogue-order-modal" role="dialog" aria-modal="true" aria-labelledby="mobile-order-title">
          <button className="catalogue-order-backdrop" type="button" onClick={() => setMobileOrderOpen(false)} aria-label="Dismiss order overlay" />
          <div className="catalogue-order-sheet" ref={mobileOrderRef}>
            <button className="catalogue-order-close" type="button" onClick={() => setMobileOrderOpen(false)} aria-label="Close order summary" autoFocus>
              <X size={20} aria-hidden="true" />
            </button>
            <OrderPanel
              selectedServices={selectedServices}
              removeService={toggleService}
              submitOrder={submitOrder}
              emailUrl={emailUrl}
              titleId="mobile-order-title"
            />
          </div>
        </div>
      )}
    </>
  );
}

function OrderPanel({
  selectedServices,
  removeService,
  submitOrder,
  emailUrl,
  titleId,
}: {
  selectedServices: Array<(typeof catalogueServices)[number] | undefined>;
  removeService: (id: string) => void;
  submitOrder: (event: FormEvent<HTMLFormElement>) => void;
  emailUrl: string;
  titleId?: string;
}) {
  return (
    <div className="catalogue-order-panel">
      <p className="eyebrow">Your FST order</p>
      <h2 id={titleId}>Build one coordinated brief.</h2>
      {!selectedServices.length ? (
        <div className="catalogue-order-empty">
          <Plus size={22} aria-hidden="true" />
          <p>Add any service. FST will confirm fit, scope, delivery timing and a fixed quote before work starts.</p>
        </div>
      ) : (
        <>
          <ul className="catalogue-order-list">
            {selectedServices.map((service) => service && (
              <li key={service.id}>
                <div>
                  <strong>{service.title}</strong>
                  <span>{formatCataloguePrice(service)} · {service.unit}</span>
                </div>
                <button type="button" onClick={() => removeService(service.id)} aria-label={`Remove ${service.title}`}>
                  <Minus size={15} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
          <form className="catalogue-order-form" onSubmit={submitOrder}>
            <div className="catalogue-order-fields">
              <label>
                Name
                <input name="name" autoComplete="name" required />
              </label>
              <label>
                Email
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label>
                Organisation <span>Optional</span>
                <input name="organisation" autoComplete="organization" />
              </label>
              <label>
                Preferred timing
                <select name="timing" defaultValue="Within 2–4 weeks">
                  <option>As soon as possible</option>
                  <option>Within 2–4 weeks</option>
                  <option>Within 1–3 months</option>
                  <option>Flexible</option>
                </select>
              </label>
              <label>
                Helpful context <span>Optional</span>
                <textarea name="context" rows={3} placeholder="Deadline, organisation size, reporting period or funding call…" />
              </label>
              <label className="catalogue-order-consent">
                <input type="checkbox" required />
                <span>I agree to share this enquiry with FST and understand that the displayed fees are indicative starting prices, not a binding quote.</span>
              </label>
            </div>
            <button className="catalogue-order-submit" type="submit">
              Continue order on WhatsApp
            </button>
            <a className="catalogue-order-email" href={emailUrl}>Prefer email? Send this service list</a>
          </form>
          <p className="catalogue-order-note">No payment is taken here. Your free scope and fee check comes first.</p>
        </>
      )}
    </div>
  );
}
