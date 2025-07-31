import { 
  accounts, 
  instances, 
  activityLogs, 
  settings,
  ps99Pets,
  ps99ScrapedData,
  ps99ActionRecordings,
  ps99CoordinateRecordings,
  ps99ApiData,
  ps99BoostScheduler,
  ps99MacroScripts,
  ps99PerformanceSettings,
  ps99ValueTracker,
  ps99DoubleHatchSettings,
  type Account, 
  type InsertAccount,
  type Instance,
  type InsertInstance,
  type ActivityLog,
  type InsertActivityLog,
  type Settings,
  type InsertSettings,
  type InstanceWithAccount,
  type AccountWithInstances,
  type Ps99Pet,
  type InsertPs99Pet,
  type Ps99ScrapedData,
  type InsertPs99ScrapedData,
  type Ps99ActionRecording,
  type InsertPs99ActionRecording,
  type Ps99CoordinateRecording,
  type InsertPs99CoordinateRecording,
  type Ps99ApiData,
  type InsertPs99ApiData,
  type Ps99BoostScheduler,
  type InsertPs99BoostScheduler,
  type Ps99MacroScript,
  type InsertPs99MacroScript,
  type Ps99PerformanceSettings,
  type InsertPs99PerformanceSettings,
  type Ps99ValueTracker,
  type InsertPs99ValueTracker,
  type Ps99DoubleHatchSettings,
  type InsertPs99DoubleHatchSettings
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // Account operations
  getAccounts(): Promise<Account[]>;
  getAccount(id: number): Promise<Account | undefined>;
  getAccountByUsername(username: string): Promise<Account | undefined>;
  createAccount(account: InsertAccount): Promise<Account>;
  updateAccount(id: number, updates: Partial<InsertAccount>): Promise<Account | undefined>;
  deleteAccount(id: number): Promise<boolean>;
  getAccountWithInstances(id: number): Promise<AccountWithInstances | undefined>;

  // Instance operations
  getInstances(): Promise<Instance[]>;
  getInstance(id: number): Promise<Instance | undefined>;
  getInstancesWithAccounts(): Promise<InstanceWithAccount[]>;
  createInstance(instance: InsertInstance): Promise<Instance>;
  updateInstance(id: number, updates: Partial<InsertInstance>): Promise<Instance | undefined>;
  deleteInstance(id: number): Promise<boolean>;
  getInstancesByAccount(accountId: number): Promise<Instance[]>;
  getInstancesByStatus(status: string): Promise<Instance[]>;

  // Activity log operations
  getActivityLogs(instanceId?: number, limit?: number): Promise<ActivityLog[]>;
  createActivityLog(log: InsertActivityLog): Promise<ActivityLog>;
  clearActivityLogs(instanceId?: number): Promise<boolean>;

  // Settings operations
  getSettings(): Promise<Settings[]>;
  getSetting(key: string): Promise<Settings | undefined>;
  setSetting(setting: InsertSettings): Promise<Settings>;
  deleteSetting(key: string): Promise<boolean>;

  // PS99 Pet operations
  getPs99Pets(): Promise<Ps99Pet[]>;
  getPs99Pet(id: number): Promise<Ps99Pet | undefined>;
  createPs99Pet(pet: InsertPs99Pet): Promise<Ps99Pet>;
  updatePs99Pet(id: number, updates: Partial<InsertPs99Pet>): Promise<Ps99Pet | undefined>;
  deletePs99Pet(id: number): Promise<boolean>;
  hatchPs99Pet(id: number): Promise<Ps99Pet | undefined>;

  // PS99 Scraped data operations
  getPs99ScrapedData(): Promise<Ps99ScrapedData[]>;
  getPs99ScrapedDataByType(dataType: string): Promise<Ps99ScrapedData[]>;
  createPs99ScrapedData(data: InsertPs99ScrapedData): Promise<Ps99ScrapedData>;
  deletePs99ScrapedData(id: number): Promise<boolean>;

  // PS99 Action recording operations
  getPs99ActionRecordings(): Promise<Ps99ActionRecording[]>;
  getPs99ActionRecording(id: number): Promise<Ps99ActionRecording | undefined>;
  createPs99ActionRecording(recording: InsertPs99ActionRecording): Promise<Ps99ActionRecording>;
  deletePs99ActionRecording(id: number): Promise<boolean>;

  // PS99 Coordinate recording operations
  getPs99CoordinateRecordings(): Promise<Ps99CoordinateRecording[]>;
  getPs99CoordinateRecording(id: number): Promise<Ps99CoordinateRecording | undefined>;
  createPs99CoordinateRecording(recording: InsertPs99CoordinateRecording): Promise<Ps99CoordinateRecording>;
  deletePs99CoordinateRecording(id: number): Promise<boolean>;

  // PS99 API data operations
  getPs99ApiData(): Promise<Ps99ApiData[]>;
  getPs99ApiDataByEndpoint(endpoint: string): Promise<Ps99ApiData | undefined>;
  createOrUpdatePs99ApiData(data: InsertPs99ApiData): Promise<Ps99ApiData>;
  deletePs99ApiData(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  constructor() {
    // Initialize default settings if they don't exist
    this.initializeDefaultSettings();
  }

  private async initializeDefaultSettings() {
    try {
      const existingSettings = await db.select().from(settings);
      const settingsMap = new Map(existingSettings.map(s => [s.key, s]));
      
      const defaults = [
        { key: "roblox_path", value: "" },
        { key: "max_instances", value: "5" },
        { key: "auto_restart", value: "true" }
      ];

      for (const defaultSetting of defaults) {
        if (!settingsMap.has(defaultSetting.key)) {
          await db.insert(settings).values(defaultSetting).execute();
        }
      }
    } catch (error) {
      console.warn("Could not initialize default settings:", error);
    }
  }

  // Account operations
  async getAccounts(): Promise<Account[]> {
    return await db.select().from(accounts);
  }

  async getAccount(id: number): Promise<Account | undefined> {
    const [account] = await db.select().from(accounts).where(eq(accounts.id, id));
    return account || undefined;
  }

  async getAccountByUsername(username: string): Promise<Account | undefined> {
    const [account] = await db.select().from(accounts).where(eq(accounts.username, username));
    return account || undefined;
  }

  async createAccount(insertAccount: InsertAccount): Promise<Account> {
    const [account] = await db
      .insert(accounts)
      .values(insertAccount)
      .returning();
    return account;
  }

  async updateAccount(id: number, updates: Partial<InsertAccount>): Promise<Account | undefined> {
    const [account] = await db
      .update(accounts)
      .set(updates)
      .where(eq(accounts.id, id))
      .returning();
    return account || undefined;
  }

  async deleteAccount(id: number): Promise<boolean> {
    const result = await db.delete(accounts).where(eq(accounts.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getAccountWithInstances(id: number): Promise<AccountWithInstances | undefined> {
    const account = await this.getAccount(id);
    if (!account) return undefined;

    const accountInstances = await this.getInstancesByAccount(id);
    return { ...account, instances: accountInstances };
  }

  // Instance operations
  async getInstances(): Promise<Instance[]> {
    return await db.select().from(instances);
  }

  async getInstance(id: number): Promise<Instance | undefined> {
    const [instance] = await db.select().from(instances).where(eq(instances.id, id));
    return instance || undefined;
  }

  async getInstancesWithAccounts(): Promise<InstanceWithAccount[]> {
    const result = await db
      .select()
      .from(instances)
      .leftJoin(accounts, eq(instances.accountId, accounts.id));
    
    return result.map(row => ({
      ...row.instances,
      account: row.accounts || null
    }));
  }

  async createInstance(insertInstance: InsertInstance): Promise<Instance> {
    const [instance] = await db
      .insert(instances)
      .values(insertInstance)
      .returning();
    return instance;
  }

  async updateInstance(id: number, updates: Partial<InsertInstance>): Promise<Instance | undefined> {
    const [instance] = await db
      .update(instances)
      .set(updates)
      .where(eq(instances.id, id))
      .returning();
    return instance || undefined;
  }

  async deleteInstance(id: number): Promise<boolean> {
    const result = await db.delete(instances).where(eq(instances.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getInstancesByAccount(accountId: number): Promise<Instance[]> {
    return await db.select().from(instances).where(eq(instances.accountId, accountId));
  }

  async getInstancesByStatus(status: string): Promise<Instance[]> {
    return await db.select().from(instances).where(eq(instances.status, status));
  }

  // Activity log operations
  async getActivityLogs(instanceId?: number, limit = 100): Promise<ActivityLog[]> {
    if (instanceId !== undefined) {
      return await db
        .select()
        .from(activityLogs)
        .where(eq(activityLogs.instanceId, instanceId))
        .orderBy(desc(activityLogs.timestamp))
        .limit(limit);
    } else {
      return await db
        .select()
        .from(activityLogs)
        .orderBy(desc(activityLogs.timestamp))
        .limit(limit);
    }
  }

  async createActivityLog(insertLog: InsertActivityLog): Promise<ActivityLog> {
    const [log] = await db
      .insert(activityLogs)
      .values(insertLog)
      .returning();
    return log;
  }

  async clearActivityLogs(instanceId?: number): Promise<boolean> {
    let result;
    if (instanceId !== undefined) {
      result = await db.delete(activityLogs).where(eq(activityLogs.instanceId, instanceId));
    } else {
      result = await db.delete(activityLogs);
    }
    return (result.rowCount ?? 0) >= 0;
  }

  // Settings operations
  async getSettings(): Promise<Settings[]> {
    return await db.select().from(settings);
  }

  async getSetting(key: string): Promise<Settings | undefined> {
    const [setting] = await db.select().from(settings).where(eq(settings.key, key));
    return setting || undefined;
  }

  async setSetting(insertSetting: InsertSettings): Promise<Settings> {
    // Try to update existing setting first
    const [updated] = await db
      .update(settings)
      .set({ value: insertSetting.value, updatedAt: new Date() })
      .where(eq(settings.key, insertSetting.key))
      .returning();
    
    if (updated) {
      return updated;
    }
    
    // If no existing setting, insert new one
    const [created] = await db
      .insert(settings)
      .values(insertSetting)
      .returning();
    return created;
  }

  async deleteSetting(key: string): Promise<boolean> {
    const result = await db.delete(settings).where(eq(settings.key, key));
    return (result.rowCount ?? 0) > 0;
  }
}

// Temporarily using MemStorage until database issues are resolved
export class MemStorage implements IStorage {
  private accounts: Map<number, Account> = new Map();
  private instances: Map<number, Instance> = new Map();
  private activityLogs: Map<number, ActivityLog> = new Map();
  private settings: Map<string, Settings> = new Map();
  private ps99Pets: Map<number, Ps99Pet> = new Map();
  private ps99ScrapedData: Map<number, Ps99ScrapedData> = new Map();
  private ps99ActionRecordings: Map<number, Ps99ActionRecording> = new Map();
  private ps99CoordinateRecordings: Map<number, Ps99CoordinateRecording> = new Map();
  private ps99ApiData: Map<number, Ps99ApiData> = new Map();
  
  private currentAccountId = 1;
  private currentInstanceId = 1;
  private currentLogId = 1;
  private currentSettingsId = 1;
  private currentPs99PetId = 1;
  private currentPs99ScrapedDataId = 1;
  private currentPs99ActionRecordingId = 1;
  private currentPs99CoordinateRecordingId = 1;
  private currentPs99ApiDataId = 1;

  constructor() {
    // Initialize with some default settings
    this.setSetting({ key: "roblox_path", value: "" });
    this.setSetting({ key: "max_instances", value: "5" });
    this.setSetting({ key: "auto_restart", value: "true" });
    
    // Initialize with sample PS99 pets based on PetStatModule.lua
    this.initializeSamplePs99Data();
  }

  private initializeSamplePs99Data() {
    // Sample pets from the attached PS99 modules
    const samplePets: InsertPs99Pet[] = [
      { name: "Cat", type: "Common", minimumDamage: 1, maximumDamage: 4, hatched: false, strength: null },
      { name: "Dog", type: "Common", minimumDamage: 3, maximumDamage: 8, hatched: false, strength: null },
      { name: "Panda", type: "Uncommon", minimumDamage: 10, maximumDamage: 20, hatched: false, strength: null },
      { name: "RedPanda", type: "Rare", minimumDamage: 23, maximumDamage: 40, hatched: false, strength: null },
    ];
    
    samplePets.forEach(pet => this.createPs99Pet(pet));
  }

  // Account operations
  async getAccounts(): Promise<Account[]> {
    return Array.from(this.accounts.values());
  }

  async getAccount(id: number): Promise<Account | undefined> {
    return this.accounts.get(id);
  }

  async getAccountByUsername(username: string): Promise<Account | undefined> {
    return Array.from(this.accounts.values()).find(account => account.username === username);
  }

  async createAccount(insertAccount: InsertAccount): Promise<Account> {
    const account: Account = {
      ...insertAccount,
      id: this.currentAccountId++,
      createdAt: new Date(),
      roblosecurityToken: insertAccount.roblosecurityToken ?? null,
      isActive: insertAccount.isActive ?? true,
    };
    this.accounts.set(account.id, account);
    return account;
  }

  async updateAccount(id: number, updates: Partial<InsertAccount>): Promise<Account | undefined> {
    const account = this.accounts.get(id);
    if (!account) return undefined;

    const updatedAccount: Account = { ...account, ...updates };
    this.accounts.set(id, updatedAccount);
    return updatedAccount;
  }

  async deleteAccount(id: number): Promise<boolean> {
    return this.accounts.delete(id);
  }

  async getAccountWithInstances(id: number): Promise<AccountWithInstances | undefined> {
    const account = this.accounts.get(id);
    if (!account) return undefined;

    const accountInstances = await this.getInstancesByAccount(id);
    return { ...account, instances: accountInstances };
  }

  // Instance operations
  async getInstances(): Promise<Instance[]> {
    return Array.from(this.instances.values());
  }

  async getInstance(id: number): Promise<Instance | undefined> {
    return this.instances.get(id);
  }

  async getInstancesWithAccounts(): Promise<InstanceWithAccount[]> {
    const instances = Array.from(this.instances.values());
    return instances.map(instance => ({
      ...instance,
      account: instance.accountId ? this.accounts.get(instance.accountId) || null : null
    }));
  }

  async createInstance(insertInstance: InsertInstance): Promise<Instance> {
    const instance: Instance = {
      ...insertInstance,
      id: this.currentInstanceId++,
      createdAt: new Date(),
      lastStarted: null,
      status: insertInstance.status ?? 'stopped',
      accountId: insertInstance.accountId ?? null,
      processId: insertInstance.processId ?? null,
      port: insertInstance.port ?? null,
      gameId: insertInstance.gameId ?? null,
      config: insertInstance.config ?? null,
    };
    this.instances.set(instance.id, instance);
    return instance;
  }

  async updateInstance(id: number, updates: Partial<InsertInstance>): Promise<Instance | undefined> {
    const instance = this.instances.get(id);
    if (!instance) return undefined;

    const updatedInstance: Instance = { ...instance, ...updates };
    this.instances.set(id, updatedInstance);
    return updatedInstance;
  }

  async deleteInstance(id: number): Promise<boolean> {
    return this.instances.delete(id);
  }

  async getInstancesByAccount(accountId: number): Promise<Instance[]> {
    return Array.from(this.instances.values()).filter(instance => instance.accountId === accountId);
  }

  async getInstancesByStatus(status: string): Promise<Instance[]> {
    return Array.from(this.instances.values()).filter(instance => instance.status === status);
  }

  // Activity log operations
  async getActivityLogs(instanceId?: number, limit = 100): Promise<ActivityLog[]> {
    let logs = Array.from(this.activityLogs.values());
    
    if (instanceId !== undefined) {
      logs = logs.filter(log => log.instanceId === instanceId);
    }
    
    return logs
      .sort((a, b) => b.timestamp!.getTime() - a.timestamp!.getTime())
      .slice(0, limit);
  }

  async createActivityLog(insertLog: InsertActivityLog): Promise<ActivityLog> {
    const log: ActivityLog = {
      ...insertLog,
      id: this.currentLogId++,
      timestamp: new Date(),
      instanceId: insertLog.instanceId ?? null,
    };
    this.activityLogs.set(log.id, log);
    return log;
  }

  async clearActivityLogs(instanceId?: number): Promise<boolean> {
    if (instanceId !== undefined) {
      const logsToDelete = Array.from(this.activityLogs.entries())
        .filter(([_, log]) => log.instanceId === instanceId)
        .map(([id, _]) => id);
      
      logsToDelete.forEach(id => this.activityLogs.delete(id));
      return true;
    } else {
      this.activityLogs.clear();
      return true;
    }
  }

  // Settings operations
  async getSettings(): Promise<Settings[]> {
    return Array.from(this.settings.values());
  }

  async getSetting(key: string): Promise<Settings | undefined> {
    return this.settings.get(key);
  }

  async setSetting(insertSetting: InsertSettings): Promise<Settings> {
    const existing = this.settings.get(insertSetting.key);
    const setting: Settings = {
      id: existing?.id || this.currentSettingsId++,
      key: insertSetting.key,
      value: insertSetting.value,
      updatedAt: new Date(),
    };
    this.settings.set(setting.key, setting);
    return setting;
  }

  async deleteSetting(key: string): Promise<boolean> {
    return this.settings.delete(key);
  }

  // PS99 Pet operations
  async getPs99Pets(): Promise<Ps99Pet[]> {
    return Array.from(this.ps99Pets.values());
  }

  async getPs99Pet(id: number): Promise<Ps99Pet | undefined> {
    return this.ps99Pets.get(id);
  }

  async createPs99Pet(insertPet: InsertPs99Pet): Promise<Ps99Pet> {
    const pet: Ps99Pet = {
      ...insertPet,
      id: this.currentPs99PetId++,
      createdAt: new Date(),
      hatchedAt: insertPet.hatched ? new Date() : null,
    };
    this.ps99Pets.set(pet.id, pet);
    return pet;
  }

  async updatePs99Pet(id: number, updates: Partial<InsertPs99Pet>): Promise<Ps99Pet | undefined> {
    const pet = this.ps99Pets.get(id);
    if (!pet) return undefined;

    const updatedPet: Ps99Pet = { ...pet, ...updates };
    this.ps99Pets.set(id, updatedPet);
    return updatedPet;
  }

  async deletePs99Pet(id: number): Promise<boolean> {
    return this.ps99Pets.delete(id);
  }

  async hatchPs99Pet(id: number): Promise<Ps99Pet | undefined> {
    const pet = this.ps99Pets.get(id);
    if (!pet) return undefined;

    // Simulate hatching with random strength based on HatchingModule.lua logic
    const randomStrength = Math.floor(Math.random() * (pet.maximumDamage - pet.minimumDamage + 1)) + pet.minimumDamage;
    
    const hatchedPet: Ps99Pet = {
      ...pet,
      hatched: true,
      strength: randomStrength,
      hatchedAt: new Date(),
    };
    
    this.ps99Pets.set(id, hatchedPet);
    return hatchedPet;
  }

  // PS99 Scraped data operations
  async getPs99ScrapedData(): Promise<Ps99ScrapedData[]> {
    return Array.from(this.ps99ScrapedData.values());
  }

  async getPs99ScrapedDataByType(dataType: string): Promise<Ps99ScrapedData[]> {
    return Array.from(this.ps99ScrapedData.values()).filter(data => data.dataType === dataType);
  }

  async createPs99ScrapedData(insertData: InsertPs99ScrapedData): Promise<Ps99ScrapedData> {
    const data: Ps99ScrapedData = {
      ...insertData,
      id: this.currentPs99ScrapedDataId++,
      scrapedAt: new Date(),
    };
    this.ps99ScrapedData.set(data.id, data);
    return data;
  }

  async deletePs99ScrapedData(id: number): Promise<boolean> {
    return this.ps99ScrapedData.delete(id);
  }

  // PS99 Action recording operations
  async getPs99ActionRecordings(): Promise<Ps99ActionRecording[]> {
    return Array.from(this.ps99ActionRecordings.values());
  }

  async getPs99ActionRecording(id: number): Promise<Ps99ActionRecording | undefined> {
    return this.ps99ActionRecordings.get(id);
  }

  async createPs99ActionRecording(insertRecording: InsertPs99ActionRecording): Promise<Ps99ActionRecording> {
    const recording: Ps99ActionRecording = {
      ...insertRecording,
      id: this.currentPs99ActionRecordingId++,
      recordedAt: new Date(),
    };
    this.ps99ActionRecordings.set(recording.id, recording);
    return recording;
  }

  async deletePs99ActionRecording(id: number): Promise<boolean> {
    return this.ps99ActionRecordings.delete(id);
  }

  // PS99 Coordinate recording operations
  async getPs99CoordinateRecordings(): Promise<Ps99CoordinateRecording[]> {
    return Array.from(this.ps99CoordinateRecordings.values());
  }

  async getPs99CoordinateRecording(id: number): Promise<Ps99CoordinateRecording | undefined> {
    return this.ps99CoordinateRecordings.get(id);
  }

  async createPs99CoordinateRecording(insertRecording: InsertPs99CoordinateRecording): Promise<Ps99CoordinateRecording> {
    const recording: Ps99CoordinateRecording = {
      ...insertRecording,
      id: this.currentPs99CoordinateRecordingId++,
      recordedAt: new Date(),
    };
    this.ps99CoordinateRecordings.set(recording.id, recording);
    return recording;
  }

  async deletePs99CoordinateRecording(id: number): Promise<boolean> {
    return this.ps99CoordinateRecordings.delete(id);
  }

  // PS99 API data operations
  async getPs99ApiData(): Promise<Ps99ApiData[]> {
    return Array.from(this.ps99ApiData.values());
  }

  async getPs99ApiDataByEndpoint(endpoint: string): Promise<Ps99ApiData | undefined> {
    return Array.from(this.ps99ApiData.values()).find(data => data.endpoint === endpoint);
  }

  async createOrUpdatePs99ApiData(insertData: InsertPs99ApiData): Promise<Ps99ApiData> {
    // Check if data for this endpoint already exists
    const existing = Array.from(this.ps99ApiData.values()).find(data => data.endpoint === insertData.endpoint);
    
    if (existing) {
      const updatedData: Ps99ApiData = {
        ...existing,
        data: insertData.data,
        lastUpdated: new Date(),
      };
      this.ps99ApiData.set(existing.id, updatedData);
      return updatedData;
    } else {
      const data: Ps99ApiData = {
        ...insertData,
        id: this.currentPs99ApiDataId++,
        lastUpdated: new Date(),
      };
      this.ps99ApiData.set(data.id, data);
      return data;
    }
  }

  async deletePs99ApiData(id: number): Promise<boolean> {
    return this.ps99ApiData.delete(id);
  }
}

export const storage = new MemStorage();
