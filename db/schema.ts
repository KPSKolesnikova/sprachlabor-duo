import { index, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const activity = sqliteTable("activity", {
  owner: text("owner").notNull(),
  key: text("key").notNull(),
  payload: text("payload").notNull(),
}, (t) => [primaryKey({ columns: [t.owner, t.key] })]);

export const members = sqliteTable("members", {
  owner: text("owner").primaryKey().notNull(),
  duo: text("duo").notNull(),
}, (t) => [index("members_duo").on(t.duo)]);

export const homework = sqliteTable("homework", {
  id: text("id").primaryKey().notNull(),
  owner: text("owner").notNull(),
  alias: text("alias").notNull(),
  level: text("level").notNull(),
  kind: text("kind").notNull(),
  task: text("task").notNull(),
  body: text("body").notNull(),
  duo: text("duo"),
  submitted: text("submitted").notNull(),
  review: text("review"),
}, (t) => [index("homework_owner_submitted").on(t.owner, t.submitted), index("homework_duo_submitted").on(t.duo, t.submitted)]);
