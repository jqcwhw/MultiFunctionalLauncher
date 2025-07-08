import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAccountSchema, insertInstanceSchema, insertActivityLogSchema, insertSettingsSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Account routes
  app.get("/api/accounts", async (req, res) => {
    try {
      const accounts = await storage.getAccounts();
      res.json(accounts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch accounts" });
    }
  });

  app.get("/api/accounts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const account = await storage.getAccountWithInstances(id);
      if (!account) {
        return res.status(404).json({ error: "Account not found" });
      }
      res.json(account);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch account" });
    }
  });

  app.post("/api/accounts", async (req, res) => {
    try {
      const accountData = insertAccountSchema.parse(req.body);
      const account = await storage.createAccount(accountData);
      res.status(201).json(account);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid account data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create account" });
    }
  });

  app.put("/api/accounts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertAccountSchema.partial().parse(req.body);
      const account = await storage.updateAccount(id, updates);
      if (!account) {
        return res.status(404).json({ error: "Account not found" });
      }
      res.json(account);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid account data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update account" });
    }
  });

  app.delete("/api/accounts/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteAccount(id);
      if (!success) {
        return res.status(404).json({ error: "Account not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete account" });
    }
  });

  // Instance routes
  app.get("/api/instances", async (req, res) => {
    try {
      const instances = await storage.getInstancesWithAccounts();
      res.json(instances);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch instances" });
    }
  });

  app.get("/api/instances/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const instance = await storage.getInstance(id);
      if (!instance) {
        return res.status(404).json({ error: "Instance not found" });
      }
      res.json(instance);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch instance" });
    }
  });

  app.post("/api/instances", async (req, res) => {
    try {
      const instanceData = insertInstanceSchema.parse(req.body);
      const instance = await storage.createInstance(instanceData);
      
      // Log instance creation
      await storage.createActivityLog({
        instanceId: instance.id,
        level: "info",
        message: `Instance '${instance.name}' created`
      });
      
      res.status(201).json(instance);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid instance data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create instance" });
    }
  });

  app.put("/api/instances/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = insertInstanceSchema.partial().parse(req.body);
      const instance = await storage.updateInstance(id, updates);
      if (!instance) {
        return res.status(404).json({ error: "Instance not found" });
      }
      res.json(instance);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid instance data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to update instance" });
    }
  });

  app.delete("/api/instances/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteInstance(id);
      if (!success) {
        return res.status(404).json({ error: "Instance not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete instance" });
    }
  });

  // Instance control routes
  app.post("/api/instances/:id/start", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const instance = await storage.getInstance(id);
      if (!instance) {
        return res.status(404).json({ error: "Instance not found" });
      }

      // Update instance status
      await storage.updateInstance(id, { 
        status: "starting", 
        lastStarted: new Date() 
      });

      // Log the action
      await storage.createActivityLog({
        instanceId: id,
        level: "info",
        message: `Starting instance '${instance.name}'`
      });

      // In a real implementation, this would start the Roblox process
      // For now, we'll simulate it by setting status to running after a delay
      setTimeout(async () => {
        await storage.updateInstance(id, { 
          status: "running", 
          processId: Math.floor(Math.random() * 10000) + 1000 
        });
        await storage.createActivityLog({
          instanceId: id,
          level: "info",
          message: `Instance '${instance.name}' started successfully`
        });
      }, 2000);

      res.json({ message: "Instance start initiated" });
    } catch (error) {
      res.status(500).json({ error: "Failed to start instance" });
    }
  });

  app.post("/api/instances/:id/stop", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const instance = await storage.getInstance(id);
      if (!instance) {
        return res.status(404).json({ error: "Instance not found" });
      }

      // Update instance status
      await storage.updateInstance(id, { 
        status: "stopping", 
        processId: null 
      });

      // Log the action
      await storage.createActivityLog({
        instanceId: id,
        level: "info",
        message: `Stopping instance '${instance.name}'`
      });

      // Simulate stopping process
      setTimeout(async () => {
        await storage.updateInstance(id, { status: "stopped" });
        await storage.createActivityLog({
          instanceId: id,
          level: "info",
          message: `Instance '${instance.name}' stopped`
        });
      }, 1000);

      res.json({ message: "Instance stop initiated" });
    } catch (error) {
      res.status(500).json({ error: "Failed to stop instance" });
    }
  });

  app.post("/api/instances/:id/restart", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const instance = await storage.getInstance(id);
      if (!instance) {
        return res.status(404).json({ error: "Instance not found" });
      }

      // Update instance status
      await storage.updateInstance(id, { status: "stopping" });

      // Log the action
      await storage.createActivityLog({
        instanceId: id,
        level: "info",
        message: `Restarting instance '${instance.name}'`
      });

      // Simulate restart process
      setTimeout(async () => {
        await storage.updateInstance(id, { 
          status: "running", 
          processId: Math.floor(Math.random() * 10000) + 1000,
          lastStarted: new Date()
        });
        await storage.createActivityLog({
          instanceId: id,
          level: "info",
          message: `Instance '${instance.name}' restarted successfully`
        });
      }, 3000);

      res.json({ message: "Instance restart initiated" });
    } catch (error) {
      res.status(500).json({ error: "Failed to restart instance" });
    }
  });

  // Activity log routes
  app.get("/api/logs", async (req, res) => {
    try {
      const instanceId = req.query.instanceId ? parseInt(req.query.instanceId as string) : undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
      const logs = await storage.getActivityLogs(instanceId, limit);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch activity logs" });
    }
  });

  app.delete("/api/logs", async (req, res) => {
    try {
      const instanceId = req.query.instanceId ? parseInt(req.query.instanceId as string) : undefined;
      await storage.clearActivityLogs(instanceId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to clear activity logs" });
    }
  });

  // Settings routes
  app.get("/api/settings", async (req, res) => {
    try {
      const settings = await storage.getSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch settings" });
    }
  });

  app.put("/api/settings/:key", async (req, res) => {
    try {
      const key = req.params.key;
      const { value } = req.body;
      if (!value) {
        return res.status(400).json({ error: "Value is required" });
      }
      const setting = await storage.setSetting({ key, value });
      res.json(setting);
    } catch (error) {
      res.status(500).json({ error: "Failed to update setting" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
