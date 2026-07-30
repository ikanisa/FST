"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check } from "@phosphor-icons/react/Check";
import { MagnifyingGlass } from "@phosphor-icons/react/MagnifyingGlass";
import { Minus } from "@phosphor-icons/react/Minus";
import { Plus } from "@phosphor-icons/react/Plus";
import { ShoppingCartSimple } from "@phosphor-icons/react/ShoppingCartSimple";
import { WhatsappLogoIcon } from "@phosphor-icons/react/WhatsappLogo";
import { X } from "@phosphor-icons/react/X";
import { catalogueCategories, catalogueServices, formatCataloguePrice, type CatalogueCategoryId } from "../../lib/service-catalogue";
import { trackConversion } from "../../lib/analytics";
import { siteConfig } from "../../lib/site-config";

const allCategory = "all";

export function ServiceCatalogue() {
  const [activeCategory, setActiveCategory] = useState<CatalogueCategoryId | typeof allCategory>(allCategory);
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [mobileOrderOpen, setMobileOrderOpen] = useState(false);
  const [cartAnnouncement, setCartAnnouncement] = useState("");
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
    const service = catalogueServices.find((item) => item.id === id);
    setSelectedIds((current) => {
      const isRemoving = current.includes(id);
      const next = isRemoving ? current.filter((serviceId) => serviceId !== id) : [...current, id];
      setCartAnnouncement(
        `${service?.title || "Service"} ${isRemoving ? "removed from" : "added to"} your order. ${next.length} ${next.length === 1 ? "service" : "services"} selected.`,
      );
      return next;
    });
  }

  return (
    <>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{cartAnnouncement}</p>
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
  titleId,
}: {
  selectedServices: Array<(typeof catalogueServices)[number] | undefined>;
  removeService: (id: string) => void;
  titleId?: string;
}) {
  const startingTotal = selectedServices.reduce((total, service) => total + (service?.from || 0), 0);
  const orderLines = selectedServices.flatMap((service, index) =>
    service ? [`${index + 1}. ${service.title} — ${formatCataloguePrice(service)} · ${service.unit}`] : [],
  );
  const whatsappMessage = [
    "Hello FST, I would like to request the following services:",
    "",
    ...orderLines,
    "",
    `Indicative starting total: €${startingTotal.toLocaleString("en-IE")}`,
    "",
    "Please confirm the scope, availability and final fee before work starts.",
  ].join("\n");
  const whatsappOrderUrl = `${siteConfig.serviceOrderWhatsappUrl}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="catalogue-order-panel">
      <div className="catalogue-cart-heading">
        <div>
          <p className="eyebrow">Service cart</p>
          <h2 id={titleId}>Your FST order</h2>
        </div>
        <span aria-label={`${selectedServices.length} services in cart`}>{selectedServices.length}</span>
      </div>
      {!selectedServices.length ? (
        <div className="catalogue-order-empty">
          <ShoppingCartSimple size={28} aria-hidden="true" />
          <p>Your cart is empty. Add services from the catalogue to build one order.</p>
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
          <div className="catalogue-cart-total">
            <span>Indicative starting total</span>
            <strong>€{startingTotal.toLocaleString("en-IE")}</strong>
          </div>
          <a
            className="catalogue-order-submit"
            href={whatsappOrderUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackConversion("service_catalogue_order")}
          >
            <WhatsappLogoIcon size={20} weight="fill" aria-hidden="true" />
            Send order on WhatsApp
          </a>
          <p className="catalogue-order-note">
            WhatsApp opens with your service list ready to send to FST at {siteConfig.serviceOrderWhatsappDisplay}. No contact form or payment at this stage.
          </p>
        </>
      )}
    </div>
  );
}
