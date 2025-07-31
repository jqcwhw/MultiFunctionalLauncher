import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  displayName: text("display_name").notNull(),
  roblosecurityToken: text("roblosecurity_token"), // Optional, encrypted
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const instances = pgTable("instances", {
  id: serial("id").primaryKey(),
  accountId: integer("account_id").references(() => accounts.id),
  name: text("name").notNull(),
  status: text("status").notNull().default("stopped"), // stopped, starting, running, stopping, error
  processId: integer("process_id"),
  port: integer("port"),
  gameId: text("game_id"),
  config: text("config"), // JSON string for instance-specific config
  lastStarted: timestamp("last_started"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  instanceId: integer("instance_id").references(() => instances.id),
  level: text("level").notNull(), // info, warning, error
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// PS99 Pet data for pet simulator
export const ps99Pets = pgTable("ps99_pets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // Common, Uncommon, Rare, Epic, Legendary
  minimumDamage: integer("minimum_damage").notNull(),
  maximumDamage: integer("maximum_damage").notNull(),
  hatched: boolean("hatched").default(false),
  strength: integer("strength"),
  hatchedAt: timestamp("hatched_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// PS99 Scraped data from Roblox API
export const ps99ScrapedData = pgTable("ps99_scraped_data", {
  id: serial("id").primaryKey(),
  dataType: text("data_type").notNull(), // game, user, group, asset
  robloxId: text("roblox_id").notNull(),
  title: text("title"),
  description: text("description"),
  metadata: json("metadata"), // Store additional scraped information
  scrapedAt: timestamp("scraped_at").defaultNow().notNull(),
});

// PS99 Action recordings for automation
export const ps99ActionRecordings = pgTable("ps99_action_recordings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  actions: json("actions").notNull(), // Array of recorded actions
  duration: integer("duration"), // Duration in milliseconds
  recordedAt: timestamp("recorded_at").defaultNow().notNull(),
});

// PS99 Coordinate recordings for UI automation
export const ps99CoordinateRecordings = pgTable("ps99_coordinate_recordings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  coordinates: json("coordinates").notNull(), // Array of coordinate data
  comments: text("comments"),
  recordedAt: timestamp("recorded_at").defaultNow().notNull(),
});

// PS99 API collection data
export const ps99ApiData = pgTable("ps99_api_data", {
  id: serial("id").primaryKey(),
  endpoint: text("endpoint").notNull(),
  data: json("data").notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

// Relations
export const accountsRelations = relations(accounts, ({ many }) => ({
  instances: many(instances),
}));

export const instancesRelations = relations(instances, ({ one, many }) => ({
  account: one(accounts, {
    fields: [instances.accountId],
    references: [accounts.id],
  }),
  activityLogs: many(activityLogs),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  instance: one(instances, {
    fields: [activityLogs.instanceId],
    references: [instances.id],
  }),
}));

// Insert schemas
export const insertAccountSchema = createInsertSchema(accounts).omit({
  id: true,
  createdAt: true,
});

export const insertInstanceSchema = createInsertSchema(instances).omit({
  id: true,
  createdAt: true,
});

export const insertActivityLogSchema = createInsertSchema(activityLogs).omit({
  id: true,
  timestamp: true,
});

export const insertSettingsSchema = createInsertSchema(settings).omit({
  id: true,
  updatedAt: true,
});

export const insertPs99PetSchema = createInsertSchema(ps99Pets).omit({
  id: true,
  createdAt: true,
  hatchedAt: true,
});

export const insertPs99ScrapedDataSchema = createInsertSchema(ps99ScrapedData).omit({
  id: true,
  scrapedAt: true,
});

export const insertPs99ActionRecordingSchema = createInsertSchema(ps99ActionRecordings).omit({
  id: true,
  recordedAt: true,
});

export const insertPs99CoordinateRecordingSchema = createInsertSchema(ps99CoordinateRecordings).omit({
  id: true,
  recordedAt: true,
});

export const insertPs99ApiDataSchema = createInsertSchema(ps99ApiData).omit({
  id: true,
  lastUpdated: true,
});

// Types
export type Account = typeof accounts.$inferSelect;
export type InsertAccount = z.infer<typeof insertAccountSchema>;
export type Instance = typeof instances.$inferSelect;
export type InsertInstance = z.infer<typeof insertInstanceSchema>;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type InsertActivityLog = z.infer<typeof insertActivityLogSchema>;
export type Settings = typeof settings.$inferSelect;
export type InsertSettings = z.infer<typeof insertSettingsSchema>;

// Extended types for API responses
export type InstanceWithAccount = Instance & {
  account: Account | null;
};

export type AccountWithInstances = Account & {
  instances: Instance[];
};

// PS99 Types
export type Ps99Pet = typeof ps99Pets.$inferSelect;
export type InsertPs99Pet = z.infer<typeof insertPs99PetSchema>;
export type Ps99ScrapedData = typeof ps99ScrapedData.$inferSelect;
export type InsertPs99ScrapedData = z.infer<typeof insertPs99ScrapedDataSchema>;
export type Ps99ActionRecording = typeof ps99ActionRecordings.$inferSelect;
export type InsertPs99ActionRecording = z.infer<typeof insertPs99ActionRecordingSchema>;
export type Ps99CoordinateRecording = typeof ps99CoordinateRecordings.$inferSelect;
export type InsertPs99CoordinateRecording = z.infer<typeof insertPs99CoordinateRecordingSchema>;
export type Ps99ApiData = typeof ps99ApiData.$inferSelect;
export type InsertPs99ApiData = z.infer<typeof insertPs99ApiDataSchema>;
