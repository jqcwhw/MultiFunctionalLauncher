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

// PS99 Boost Scheduler (from BoostMacro_Slymi)
export const ps99BoostScheduler = pgTable("ps99_boost_scheduler", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slot1Time: integer("slot1_time").notNull().default(0), // seconds
  slot2Time: integer("slot2_time").notNull().default(0),
  slot3Time: integer("slot3_time").notNull().default(0),
  slot4Time: integer("slot4_time").notNull().default(0),
  slot5Time: integer("slot5_time").notNull().default(0),
  slot6Time: integer("slot6_time").notNull().default(0),
  slot7Time: integer("slot7_time").notNull().default(0),
  isActive: boolean("is_active").notNull().default(false),
  lastUsed: timestamp("last_used"),
  createdAt: timestamp("created_at").defaultNow(),
});

// PS99 Macro Scripts (from MiniMacro)
export const ps99MacroScripts = pgTable("ps99_macro_scripts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'mouse', 'keyboard', 'mixed'
  script: text("script").notNull(), // stored as custom MM format
  description: text("description"),
  isRecording: boolean("is_recording").notNull().default(false),
  executionCount: integer("execution_count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// PS99 Performance Settings (from FastFlags-Collective)
export const ps99PerformanceSettings = pgTable("ps99_performance_settings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  fpsLimit: integer("fps_limit").notNull().default(60),
  renderingApi: text("rendering_api").notNull().default("DirectX11"), // DirectX11, Vulkan, OpenGL, Metal
  lightingTechnology: text("lighting_technology").notNull().default("Voxel"), // Voxel, Shadowmap, Future
  disableShadows: boolean("disable_shadows").notNull().default(false),
  graphicsQuality: integer("graphics_quality").notNull().default(5), // 1-10
  terrainQuality: integer("terrain_quality").notNull().default(16), // 4,16,32,64
  customFlags: text("custom_flags").notNull().default("{}"), // JSON string of FastFlags
  isActive: boolean("is_active").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// PS99 Value Tracker (from RoValra)
export const ps99ValueTracker = pgTable("ps99_value_tracker", {
  id: serial("id").primaryKey(),
  itemName: text("item_name").notNull(),
  itemType: text("item_type").notNull(), // 'pet', 'item', 'boost', 'currency'
  currentValue: text("current_value"), // stored as string for large numbers
  previousValue: text("previous_value"),
  valueChange: text("value_change"), // percentage or absolute change
  lastUpdated: timestamp("last_updated").defaultNow(),
  source: text("source").notNull().default("RoValra"), // tracking source
  gameRegion: text("game_region"), // region where value is tracked
});

// PS99 Double Hatch Settings (from Double Hatch)
export const ps99DoubleHatchSettings = pgTable("ps99_double_hatch_settings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  autoHatchSettingsX: integer("auto_hatch_settings_x"),
  autoHatchSettingsY: integer("auto_hatch_settings_y"),
  autoHatchX: integer("auto_hatch_x"),
  autoHatchY: integer("auto_hatch_y"),
  autoHatchOnX: integer("auto_hatch_on_x"),
  autoHatchOnY: integer("auto_hatch_on_y"),
  eggEButtonX: integer("egg_e_button_x"),
  eggEButtonY: integer("egg_e_button_y"),
  hatchEButtonX: integer("hatch_e_button_x"),
  hatchEButtonY: integer("hatch_e_button_y"),
  friendsBarX: integer("friends_bar_x"),
  friendsBarY: integer("friends_bar_y"),
  speed: integer("speed").notNull().default(40),
  betweenHatchSpeed: integer("between_hatch_speed").notNull().default(50),
  colorCheck: integer("color_check").notNull().default(121215),
  isActive: boolean("is_active").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
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

export const insertPs99BoostSchedulerSchema = createInsertSchema(ps99BoostScheduler).omit({
  id: true,
  createdAt: true,
  lastUsed: true,
});

export const insertPs99MacroScriptSchema = createInsertSchema(ps99MacroScripts).omit({
  id: true,
  createdAt: true,
});

export const insertPs99PerformanceSettingsSchema = createInsertSchema(ps99PerformanceSettings).omit({
  id: true,
  createdAt: true,
});

export const insertPs99ValueTrackerSchema = createInsertSchema(ps99ValueTracker).omit({
  id: true,
  lastUpdated: true,
});

export const insertPs99DoubleHatchSettingsSchema = createInsertSchema(ps99DoubleHatchSettings).omit({
  id: true,
  createdAt: true,
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
export type Ps99BoostScheduler = typeof ps99BoostScheduler.$inferSelect;
export type InsertPs99BoostScheduler = z.infer<typeof insertPs99BoostSchedulerSchema>;
export type Ps99MacroScript = typeof ps99MacroScripts.$inferSelect;
export type InsertPs99MacroScript = z.infer<typeof insertPs99MacroScriptSchema>;
export type Ps99PerformanceSettings = typeof ps99PerformanceSettings.$inferSelect;
export type InsertPs99PerformanceSettings = z.infer<typeof insertPs99PerformanceSettingsSchema>;
export type Ps99ValueTracker = typeof ps99ValueTracker.$inferSelect;
export type InsertPs99ValueTracker = z.infer<typeof insertPs99ValueTrackerSchema>;
export type Ps99DoubleHatchSettings = typeof ps99DoubleHatchSettings.$inferSelect;
export type InsertPs99DoubleHatchSettings = z.infer<typeof insertPs99DoubleHatchSettingsSchema>;
