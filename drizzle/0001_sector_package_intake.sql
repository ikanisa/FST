ALTER TABLE `enquiries` ADD `package_id` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `enquiries` ADD `package_version` text DEFAULT '' NOT NULL;
--> statement-breakpoint
ALTER TABLE `enquiries` ADD `scope_answers_json` text DEFAULT '{}' NOT NULL;
--> statement-breakpoint
ALTER TABLE `enquiries` ADD `addon_ids_json` text DEFAULT '[]' NOT NULL;
--> statement-breakpoint
ALTER TABLE `enquiries` ADD `atomic_service_ids_json` text DEFAULT '[]' NOT NULL;
--> statement-breakpoint
ALTER TABLE `enquiries` ADD `quote_status` text DEFAULT '' NOT NULL;
--> statement-breakpoint
CREATE INDEX `enquiries_package_created_idx` ON `enquiries` (`package_id`,`created_at`);
