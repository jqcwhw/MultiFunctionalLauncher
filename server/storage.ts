import { 
  accounts, 
  instances, 
  activityLogs, 
  settings,
  type Account, 
  type InsertAccount,
  type Instance,
  type InsertInstance,
  type ActivityLog,
  type InsertActivityLog,
  type Settings,
  type InsertSettings,
  type InstanceWithAccount,
  type AccountWithInstances
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

export const storage = new DatabaseStorage();
