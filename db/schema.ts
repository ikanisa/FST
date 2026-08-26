import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const enquiries = sqliteTable("enquiries", {
  id: text("id").primaryKey(),
  jurisdiction: text("jurisdiction", { enum: ["mt", "rw"] }).notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  organisation: text("organisation").notNull().default(""),
  phone: text("phone").notNull().default(""),
  message: text("message").notNull(),
  serviceIdsJson: text("service_ids_json").notNull().default("[]"),
  packageId: text("package_id").notNull().default(""),
  packageVersion: text("package_version").notNull().default(""),
  packageEntryId: text("package_entry_id").notNull().default(""),
  scopeAnswersJson: text("scope_answers_json").notNull().default("{}"),
  addonIdsJson: text("addon_ids_json").notNull().default("[]"),
  atomicServiceIdsJson: text("atomic_service_ids_json").notNull().default("[]"),
  quoteStatus: text("quote_status", { enum: ["", "scope_requested", "indicative_fit", "manual_review_required"] }).notNull().default(""),
  sourcePath: text("source_path").notNull(),
  status: text("status", { enum: ["new", "triaged", "responded", "closed"] }).notNull().default("new"),
  privacyConsentAt: text("privacy_consent_at").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
  version: integer("version").notNull().default(1),
}, (table) => [
  index("enquiries_jurisdiction_created_idx").on(table.jurisdiction, table.createdAt),
  index("enquiries_status_created_idx").on(table.status, table.createdAt),
  index("enquiries_package_created_idx").on(table.packageId, table.createdAt),
]);

export type Enquiry = typeof enquiries.$inferSelect;
export type NewEnquiry = typeof enquiries.$inferInsert;
