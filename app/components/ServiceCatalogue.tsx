"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check } from "@phosphor-icons/react/Check";
import { MagnifyingGlass } from "@phosphor-icons/react/MagnifyingGlass";
import { Minus } from "@phosphor-icons/react/Minus";
import { Plus } from "@phosphor-icons/react/Plus";
import { WhatsappLogoIcon } from "@phosphor-icons/react/WhatsappLogo";
import { X } from "@phosphor-icons/react/X";
import {
  catalogueCategories,
  catalogueServices,
  formatCatalogueAmount,
  formatCataloguePrice,
  type CatalogueCategoryId,
  type CatalogueCategory,
  type CatalogueService,
} from "../../lib/service-catalogue";
import { trackConversion } from "../../lib/analytics";
import { siteConfig } from "../../lib/site-config";
import { marketPath, type JurisdictionCode } from "../../lib/jurisdictions";
import {
  formatSectorPackagePrice,
  getSectorCatalogueEntries,
  getSectorPackages,
  type SectorCatalogueEntry,
  type SectorPackage,
} from "../../lib/sector-packages";

const allCategory = "all";

type IndustryPackageSelection = {
  slug: string;
  sector: SectorPackage;
  entry: SectorCatalogueEntry;
};

type ServiceCatalogueProps = {
  jurisdiction?: JurisdictionCode;
  services?: CatalogueService[];
  categories?: readonly CatalogueCategory[];
  currency?: "EUR" | "RWF";
  currencyLocale?: string;
  serviceOrderWhatsappUrl?: string;
  serviceOrderWhatsappDisplay?: string;
};

export function ServiceCatalogue({
  jurisdiction = "mt",
  services = catalogueServices,
  categories = catalogueCategories,
  currency = "EUR",
  currencyLocale = "en-IE",
  serviceOrderWhatsappUrl = siteConfig.serviceOrderWhatsappUrl,
}: ServiceCatalogueProps = {}) {
  const [activeCategory, setActiveCategory] = useState<CatalogueCategoryId | typeof allCategory>(allCategory);
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedPackageSlugs, setSelectedPackageSlugs] = useState<string[]>([]);
  const [orderOpen, setOrderOpen] = useState(false);
  const [cartAnnouncement, setCartAnnouncement] = useState("");
  const orderPanelRef = useRef<HTMLDivElement>(null);
  const orderTriggerRef = useRef<HTMLElement | null>(null);

  const selectedServices = useMemo(
    () => selectedIds.map((id) => services.find((service) => service.id === id)).filter(Boolean),
    [selectedIds, services],
  );
  const industryCards = getSectorPackages(jurisdiction).flatMap((sector) => {
    const entry = getSectorCatalogueEntries(sector)[0];
    return entry ? [{ slug: sector.slug, label: sector.sectorLabel, image: sector.image, alt: sector.imageAlt, sector, entry }] : [];
  });
  const selectedPackages = industryCards.filter((item) => selectedPackageSlugs.includes(item.slug));
  const selectedItemCount = selectedServices.length + selectedPackages.length;

  useEffect(() => {
    if (!orderOpen) return;
    const previousOverflow = document.body.style.overflow;
    const handleModalKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOrderOpen(false);
      if (event.key !== "Tab") return;
      const focusable = Array.from(
        orderPanelRef.current?.querySelectorAll<HTMLElement>(
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
      orderTriggerRef.current?.focus();
    };
  }, [orderOpen]);

  const filteredServices = useMemo(() => {
    const search = query.trim().toLowerCase();
    return services.filter((service) => {
      const matchesCategory = activeCategory === allCategory || service.category === activeCategory;
      const matchesSearch =
        !search ||
        [service.title, service.description, ...service.tags].some((value) => value.toLowerCase().includes(search));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, query, services]);

  function toggleService(id: string) {
    const service = services.find((item) => item.id === id);
    const isRemoving = selectedIds.includes(id);
    const next = isRemoving ? selectedIds.filter((serviceId) => serviceId !== id) : [...selectedIds, id];
    setSelectedIds(next);
    const nextCount = next.length + selectedPackages.length;
    setCartAnnouncement(`${service?.title || "Service"} ${isRemoving ? "removed from" : "added to"} your order. ${nextCount} ${nextCount === 1 ? "item" : "items"} selected.`);
    if (!isRemoving) {
      orderTriggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setOrderOpen(true);
    }
    if (isRemoving && !next.length && !selectedPackages.length) setOrderOpen(false);
  }

  function togglePackage(slug: string) {
    const item = industryCards.find((card) => card.slug === slug);
    const isRemoving = selectedPackageSlugs.includes(slug);
    const next = isRemoving ? selectedPackageSlugs.filter((packageSlug) => packageSlug !== slug) : [...selectedPackageSlugs, slug];
    setSelectedPackageSlugs(next);
    const nextCount = selectedServices.length + next.length;
    setCartAnnouncement(`${item?.entry.title || "Package"} ${isRemoving ? "removed from" : "added to"} your order. ${nextCount} ${nextCount === 1 ? "item" : "items"} selected.`);
    if (!isRemoving) {
      orderTriggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setOrderOpen(true);
    }
    if (isRemoving && !next.length && !selectedServices.length) setOrderOpen(false);
  }

  return (
    <>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{cartAnnouncement}</p>
      <section className="catalogue-industry-browser section-shell" aria-labelledby="industry-package-title">
        <div className="catalogue-section-heading catalogue-section-heading-single">
          <h2 id="industry-package-title">Industry packages</h2>
        </div>
        <div className="catalogue-industry-grid" aria-label="Industry package catalogue">
          {industryCards.map((item) => {
            const selected = selectedPackageSlugs.includes(item.slug);
            return (
              <article className={`catalogue-industry-card accent-${item.sector.accent} ${selected ? "is-selected" : ""}`} key={item.slug}>
                <img
                  src={item.image.replace(/\.webp$/, "-640.webp")}
                  alt={item.alt}
                  loading="lazy"
                  decoding="async"
                />
                <div className="catalogue-industry-card-copy">
                  <small className="catalogue-industry-sector-label">{item.label}</small>
                  <strong>{item.entry.title}</strong>
                  <small>{item.entry.description}</small>
                  <div className="catalogue-industry-package-price">
                    <strong>{formatSectorPackagePrice(item.sector, item.entry.from)}</strong>
                    <span>per {item.entry.billingUnit}</span>
                  </div>
                  <ul>{item.entry.includes.slice(0, 5).map((included) => <li key={included}>{included}</li>)}</ul>
                  <button
                    type="button"
                    className="catalogue-industry-add-button"
                    onClick={() => togglePackage(item.slug)}
                    aria-pressed={selected}
                    aria-label={`${selected ? "Remove" : "Add"} ${item.entry.title} ${selected ? "from" : "to"} order`}
                  >
                    {selected ? <><Check size={17} aria-hidden="true" /> Added</> : <><Plus size={17} aria-hidden="true" /> Add</>}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="catalogue-service-browser" aria-labelledby="service-catalogue-title">
        <div className="catalogue-toolbar section-shell">
          <div className="catalogue-section-heading catalogue-service-heading">
            <h2 id="service-catalogue-title">Services</h2>
          </div>
          <label className="catalogue-search">
            <MagnifyingGlass size={20} aria-hidden="true" />
            <span className="sr-only">Search services</span>
            <input
              type="search"
              aria-label="Search services"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={jurisdiction === "rw" ? "Search bookkeeping, tax, controls, grants…" : "Search bookkeeping, VAT, contracts, grants…"}
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
              All <span>{services.length}</span>
            </button>
            {categories.map((category) => {
              const count = services.filter((service) => service.category === category.id).length;
              if (!count) return null;
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
        </div>

        <div className="catalogue-layout section-shell">
          <div className="catalogue-results">
          <div className="catalogue-results-heading" aria-live="polite">
            <p><strong>{filteredServices.length}</strong> {filteredServices.length === 1 ? "service" : "services"}</p>
            <span>{query ? `Matching “${query}”` : activeCategory === allCategory ? "Across all FST practices" : categories.find((category) => category.id === activeCategory)?.description}</span>
          </div>

          {filteredServices.length ? (
            <div className="catalogue-card-grid">
              {filteredServices.map((service) => {
                const selected = selectedIds.includes(service.id);
                const category = categories.find((item) => item.id === service.category);
                return (
                  <article className={`catalogue-card ${selected ? "is-selected" : ""}`} key={service.id}>
                    <div className="catalogue-card-topline">
                      <span>{category?.shortLabel}</span>
                    </div>
                    <h2>{service.title}</h2>
                    <p>{service.description}</p>
                    <div className="catalogue-card-action">
                      <div className="catalogue-price">
                        <strong>{formatCataloguePrice(service, currency, currencyLocale)}</strong>
                      </div>
                      <button
                        type="button"
                        className={selected ? "catalogue-remove-button" : "catalogue-add-button"}
                        onClick={() => toggleService(service.id)}
                        aria-pressed={selected}
                        aria-label={`${selected ? "Remove" : "Add"} ${service.title} ${selected ? "from" : "to"} request`}
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

        </div>
      </section>

      {selectedItemCount > 0 && (
        <button
          type="button"
          className="catalogue-mobile-order-bar"
          onClick={(event) => {
            orderTriggerRef.current = event.currentTarget;
            setOrderOpen(true);
          }}
          aria-haspopup="dialog"
          aria-expanded={orderOpen}
        >
          <span>{selectedItemCount} {selectedItemCount === 1 ? "item" : "items"} selected</span>
          <strong>Review order</strong>
        </button>
      )}

      {orderOpen && (
        <div className="catalogue-order-modal" role="dialog" aria-modal="true" aria-labelledby="service-request-title">
          <button className="catalogue-order-backdrop" type="button" onClick={() => setOrderOpen(false)} aria-label="Dismiss service-request overlay" />
          <div className="catalogue-order-sheet" ref={orderPanelRef}>
            <button className="catalogue-order-close" type="button" onClick={() => setOrderOpen(false)} aria-label="Close service-request summary" autoFocus>
              <X size={20} aria-hidden="true" />
            </button>
            <RequestPanel
              selectedPackages={selectedPackages}
              selectedServices={selectedServices}
              removePackage={togglePackage}
              removeService={toggleService}
              titleId="service-request-title"
              jurisdiction={jurisdiction}
              currency={currency}
              currencyLocale={currencyLocale}
              serviceOrderWhatsappUrl={serviceOrderWhatsappUrl}
            />
          </div>
        </div>
      )}
    </>
  );
}

function RequestPanel({
  selectedPackages,
  selectedServices,
  removePackage,
  removeService,
  titleId,
  jurisdiction,
  currency,
  currencyLocale,
  serviceOrderWhatsappUrl,
}: {
  selectedPackages: IndustryPackageSelection[];
  selectedServices: Array<CatalogueService | undefined>;
  removePackage: (slug: string) => void;
  removeService: (id: string) => void;
  titleId?: string;
  jurisdiction: JurisdictionCode;
  currency: "EUR" | "RWF";
  currencyLocale: string;
  serviceOrderWhatsappUrl: string;
}) {
  const pricedServices = selectedServices.filter((service) => service?.from !== null);
  const packageTotal = selectedPackages.reduce((total, item) => total + item.entry.from, 0);
  const startingTotal = packageTotal + selectedServices.reduce((total, service) => total + (service?.from || 0), 0);
  const formattedTotal = formatCatalogueAmount(startingTotal, currency, currencyLocale);
  const serviceRequestLines = selectedServices.flatMap((service, index) =>
    service ? [`${index + 1}. ${service.title} — ${formatCataloguePrice(service, currency, currencyLocale)} · ${service.unit}`] : [],
  );
  const packageRequestLines = selectedPackages.map((item, index) =>
    `${index + 1}. ${item.entry.title} — ${formatSectorPackagePrice(item.sector, item.entry.from)} · per ${item.entry.billingUnit}`,
  );
  const allPricesKnown = pricedServices.length === selectedServices.length;
  const whatsappMessage = [
    "Hello FST, I would like to order the following catalogue items:",
    "",
    ...(packageRequestLines.length ? ["Industry packages", ...packageRequestLines, ""] : []),
    ...(serviceRequestLines.length ? ["Individual services", ...serviceRequestLines, ""] : []),
    allPricesKnown
      ? `Indicative starting total: ${formattedTotal}`
      : "Indicative fees: confirmed after the scope check",
    "",
    "Please confirm the records required, deadline, final fee and responsible professional before work starts.",
  ].join("\n");
  const whatsappOrderUrl = serviceOrderWhatsappUrl
    ? `${serviceOrderWhatsappUrl}?text=${encodeURIComponent(whatsappMessage)}`
    : "";
  const contactQuery = new URLSearchParams();
  const serviceIds = selectedServices.flatMap((service) => service ? [service.id] : []);
  if (serviceIds.length) contactQuery.set("services", serviceIds.join(","));
  if (selectedPackages.length) contactQuery.set("packages", selectedPackages.map((item) => item.slug).join(","));
  const contactUrl = `${marketPath(jurisdiction, "/contact")}?${contactQuery.toString()}`;
  const selectedItemCount = selectedPackages.length + selectedServices.length;

  return (
    <div className="catalogue-order-panel">
      <div className="catalogue-cart-heading">
        <div>
          <h2 id={titleId}>Your order</h2>
        </div>
        <span aria-label={`${selectedItemCount} ${selectedItemCount === 1 ? "item" : "items"} in order`}>{selectedItemCount}</span>
      </div>
      <ul className="catalogue-order-list">
        {selectedPackages.map((item) => (
          <li key={`package-${item.slug}`}>
            <div>
              <small>Industry package</small>
              <strong>{item.entry.title}</strong>
              <span>{formatSectorPackagePrice(item.sector, item.entry.from)} · per {item.entry.billingUnit}</span>
            </div>
            <button type="button" onClick={() => removePackage(item.slug)} aria-label={`Remove ${item.entry.title}`}>
              <Minus size={15} aria-hidden="true" />
            </button>
          </li>
        ))}
        {selectedServices.map((service) => service && (
          <li key={service.id}>
            <div>
              <strong>{service.title}</strong>
              <span>{formatCataloguePrice(service, currency, currencyLocale)} · {service.unit}</span>
            </div>
            <button type="button" onClick={() => removeService(service.id)} aria-label={`Remove ${service.title}`}>
              <Minus size={15} aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
      <div className="catalogue-cart-total">
        <span>{allPricesKnown ? "Indicative starting total" : "Indicative fee"}</span>
        <strong>{allPricesKnown ? formattedTotal : "Confirmed after scope"}</strong>
      </div>
      {whatsappOrderUrl ? (
        <a
          className="catalogue-order-submit"
          href={whatsappOrderUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackConversion("service_catalogue_order")}
        >
          <WhatsappLogoIcon size={20} weight="fill" aria-hidden="true" />
          Order via WhatsApp
        </a>
      ) : (
        <a className="catalogue-order-submit" href={contactUrl} onClick={() => trackConversion("service_catalogue_order")}>
          Continue to secure request
        </a>
      )}
    </div>
  );
}
