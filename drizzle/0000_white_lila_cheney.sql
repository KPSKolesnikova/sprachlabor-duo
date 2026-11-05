CREATE TABLE `activity` (
	`owner` text NOT NULL,
	`key` text NOT NULL,
	`payload` text NOT NULL,
	PRIMARY KEY(`owner`, `key`)
);
--> statement-breakpoint
CREATE TABLE `homework` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`alias` text NOT NULL,
	`level` text NOT NULL,
	`kind` text NOT NULL,
	`task` text NOT NULL,
	`body` text NOT NULL,
	`duo` text,
	`submitted` text NOT NULL,
	`review` text
);
--> statement-breakpoint
CREATE INDEX `homework_owner_submitted` ON `homework` (`owner`,`submitted`);--> statement-breakpoint
CREATE INDEX `homework_duo_submitted` ON `homework` (`duo`,`submitted`);--> statement-breakpoint
CREATE TABLE `members` (
	`owner` text PRIMARY KEY NOT NULL,
	`duo` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `members_duo` ON `members` (`duo`);