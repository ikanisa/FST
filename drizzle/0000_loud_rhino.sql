CREATE TABLE `enquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`jurisdiction` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`organisation` text DEFAULT '' NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`message` text NOT NULL,
	`service_ids_json` text DEFAULT '[]' NOT NULL,
	`source_path` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`privacy_consent_at` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	`version` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE INDEX `enquiries_jurisdiction_created_idx` ON `enquiries` (`jurisdiction`,`created_at`);--> statement-breakpoint
CREATE INDEX `enquiries_status_created_idx` ON `enquiries` (`status`,`created_at`);