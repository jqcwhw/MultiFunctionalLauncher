import { pgTable, text, serial, integer, boolean, timestamp, json, bigint } from "drizzle-orm/pg-core";
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

// PS99 Developer Tracking Tables
export const ps99Developers = pgTable('ps99_developers', {
  id: serial('id').primaryKey(),
  userId: bigint('user_id', { mode: 'number' }).notNull().unique(),
  username: text('username').notNull(),
  displayName: text('display_name').notNull(),
  description: text('description'),
  joinDate: timestamp('join_date'),
  followerCount: integer('follower_count').default(0),
  followingCount: integer('following_count').default(0),
  friendCount: integer('friend_count').default(0),
  profilePicture: text('profile_picture'),
  role: text('role', { enum: ['developer', 'creator', 'staff', 'tester', 'community_manager'] }).notNull(),
  affiliatedGroups: text('affiliated_groups').array().default([]),
  lastProfileUpdate: timestamp('last_profile_update').defaultNow(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

export const ps99Communities = pgTable('ps99_communities', {
  id: serial('id').primaryKey(),
  groupId: bigint('group_id', { mode: 'number' }).notNull().unique(),
  name: text('name').notNull(),
  description: text('description'),
  memberCount: integer('member_count').default(0),
  owner: bigint('owner', { mode: 'number' }),
  groupType: text('group_type', { enum: ['official', 'staff', 'experimental', 'community', 'testing'] }).notNull(),
  isVerified: boolean('is_verified').default(false),
  groupPicture: text('group_picture'),
  affiliatedDevelopers: text('affiliated_developers').array().default([]),
  lastUpdated: timestamp('last_updated').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const ps99DeveloperAssets = pgTable('ps99_developer_assets', {
  id: serial('id').primaryKey(),
  developerId: integer('developer_id').references(() => ps99Developers.id),
  assetId: bigint('asset_id', { mode: 'number' }).notNull(),
  assetName: text('asset_name').notNull(),
  assetType: text('asset_type', { enum: ['place', 'model', 'decal', 'audio', 'script', 'plugin', 'gamepass'] }).notNull(),
  isPrivate: boolean('is_private').default(false),
  description: text('description'),
  thumbnailUrl: text('thumbnail_url'),
  visitCount: integer('visit_count').default(0),
  favoriteCount: integer('favorite_count').default(0),
  lastUpdated: timestamp('last_updated').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const ps99TestingEnvironments = pgTable('ps99_testing_environments', {
  id: serial('id').primaryKey(),
  placeId: bigint('place_id', { mode: 'number' }).notNull().unique(),
  name: text('name').notNull(),
  description: text('description'),
  developerId: integer('developer_id').references(() => ps99Developers.id),
  communityId: integer('community_id').references(() => ps99Communities.id),
  isActive: boolean('is_active').default(true),
  isPublic: boolean('is_public').default(false),
  playerCount: integer('player_count').default(0),
  maxPlayers: integer('max_players').default(0),
  gameVersion: text('game_version'),
  testingPurpose: text('testing_purpose'),
  lastVisited: timestamp('last_visited'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const ps99DeveloperInventories = pgTable('ps99_developer_inventories', {
  id: serial('id').primaryKey(),
  developerId: integer('developer_id').references(() => ps99Developers.id),
  itemType: text('item_type', { enum: ['hat', 'shirt', 'pants', 'gear', 'badge', 'gamepass', 'bundle'] }).notNull(),
  itemId: bigint('item_id', { mode: 'number' }).notNull(),
  itemName: text('item_name').notNull(),
  quantity: integer('quantity').default(1),
  acquiredDate: timestamp('acquired_date'),
  isLimited: boolean('is_limited').default(false),
  rapValue: integer('rap_value'),
  lastChecked: timestamp('last_checked').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const ps99DeveloperConnections = pgTable('ps99_developer_connections', {
  id: serial('id').primaryKey(),
  developerId: integer('developer_id').references(() => ps99Developers.id),
  connectedDeveloperId: integer('connected_developer_id').references(() => ps99Developers.id),
  connectionType: text('connection_type', { enum: ['friend', 'follower', 'following', 'collaborator', 'teammate'] }).notNull(),
  connectionDate: timestamp('connection_date').defaultNow(),
  isActive: boolean('is_active').default(true),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations for new tables
export const ps99DevelopersRelations = relations(ps99Developers, ({ many }) => ({
  assets: many(ps99DeveloperAssets),
  testingEnvironments: many(ps99TestingEnvironments),
  inventories: many(ps99DeveloperInventories),
  connections: many(ps99DeveloperConnections, { relationName: 'developer_connections' }),
  connectedTo: many(ps99DeveloperConnections, { relationName: 'connected_developer_connections' }),
}));

export const ps99CommunitiesRelations = relations(ps99Communities, ({ many }) => ({
  testingEnvironments: many(ps99TestingEnvironments),
}));

export const ps99DeveloperAssetsRelations = relations(ps99DeveloperAssets, ({ one }) => ({
  developer: one(ps99Developers, {
    fields: [ps99DeveloperAssets.developerId],
    references: [ps99Developers.id],
  }),
}));

export const ps99TestingEnvironmentsRelations = relations(ps99TestingEnvironments, ({ one }) => ({
  developer: one(ps99Developers, {
    fields: [ps99TestingEnvironments.developerId],
    references: [ps99Developers.id],
  }),
  community: one(ps99Communities, {
    fields: [ps99TestingEnvironments.communityId],
    references: [ps99Communities.id],
  }),
}));

export const ps99DeveloperInventoriesRelations = relations(ps99DeveloperInventories, ({ one }) => ({
  developer: one(ps99Developers, {
    fields: [ps99DeveloperInventories.developerId],
    references: [ps99Developers.id],
  }),
}));

export const ps99DeveloperConnectionsRelations = relations(ps99DeveloperConnections, ({ one }) => ({
  developer: one(ps99Developers, {
    fields: [ps99DeveloperConnections.developerId],
    references: [ps99Developers.id],
    relationName: 'developer_connections',
  }),
  connectedDeveloper: one(ps99Developers, {
    fields: [ps99DeveloperConnections.connectedDeveloperId],
    references: [ps99Developers.id],
    relationName: 'connected_developer_connections',
  }),
}));

// Insert schemas for new tables
export const insertPs99DeveloperSchema = createInsertSchema(ps99Developers, {
  userId: z.number(),
  followerCount: z.number().optional(),
  followingCount: z.number().optional(),
  friendCount: z.number().optional(),
}).omit({
  id: true,
  lastProfileUpdate: true,
  createdAt: true,
});

export const insertPs99CommunitySchema = createInsertSchema(ps99Communities, {
  groupId: z.number(),
  owner: z.number().optional(),
  memberCount: z.number().optional(),
}).omit({
  id: true,
  lastUpdated: true,
  createdAt: true,
});

export const insertPs99DeveloperAssetSchema = createInsertSchema(ps99DeveloperAssets, {
  assetId: z.number(),
  visitCount: z.number().optional(),
  favoriteCount: z.number().optional(),
}).omit({
  id: true,
  lastUpdated: true,
  createdAt: true,
});

export const insertPs99TestingEnvironmentSchema = createInsertSchema(ps99TestingEnvironments, {
  placeId: z.number(),
  playerCount: z.number().optional(),
  maxPlayers: z.number().optional(),
}).omit({
  id: true,
  createdAt: true,
});

export const insertPs99DeveloperInventorySchema = createInsertSchema(ps99DeveloperInventories, {
  itemId: z.number(),
  quantity: z.number().optional(),
  rapValue: z.number().optional(),
}).omit({
  id: true,
  lastChecked: true,
  createdAt: true,
});

export const insertPs99DeveloperConnectionSchema = createInsertSchema(ps99DeveloperConnections).omit({
  id: true,
  connectionDate: true,
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

// PS99 Developer Tracking Types
export type Ps99Developer = typeof ps99Developers.$inferSelect;
export type InsertPs99Developer = z.infer<typeof insertPs99DeveloperSchema>;
export type Ps99Community = typeof ps99Communities.$inferSelect;
export type InsertPs99Community = z.infer<typeof insertPs99CommunitySchema>;
export type Ps99DeveloperAsset = typeof ps99DeveloperAssets.$inferSelect;
export type InsertPs99DeveloperAsset = z.infer<typeof insertPs99DeveloperAssetSchema>;
export type Ps99TestingEnvironment = typeof ps99TestingEnvironments.$inferSelect;
export type InsertPs99TestingEnvironment = z.infer<typeof insertPs99TestingEnvironmentSchema>;
export type Ps99DeveloperInventory = typeof ps99DeveloperInventories.$inferSelect;
export type InsertPs99DeveloperInventory = z.infer<typeof insertPs99DeveloperInventorySchema>;
export type Ps99DeveloperConnection = typeof ps99DeveloperConnections.$inferSelect;
export type InsertPs99DeveloperConnection = z.infer<typeof insertPs99DeveloperConnectionSchema>;

// Extended types for developer ecosystem
export type Ps99DeveloperWithAssets = Ps99Developer & {
  assets: Ps99DeveloperAsset[];
  testingEnvironments: Ps99TestingEnvironment[];
  inventories: Ps99DeveloperInventory[];
  connections: Ps99DeveloperConnection[];
};

export type Ps99CommunityWithMembers = Ps99Community & {
  testingEnvironments: Ps99TestingEnvironment[];
};
