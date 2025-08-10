import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertAssetSchema, 
  insertGameVersionSchema, 
  insertScanActivitySchema, 
  insertTrackedEntitySchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for assets
  app.get('/api/assets', async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
      const offset = req.query.offset ? parseInt(req.query.offset as string) : 0;
      const assets = await storage.getAssets(limit, offset);
      res.json(assets);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch assets' });
    }
  });

  app.get('/api/assets/recent', async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const assets = await storage.getRecentAssets(limit);
      res.json(assets);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch recent assets' });
    }
  });

  app.get('/api/assets/types/count', async (req, res) => {
    try {
      const counts = await storage.getAssetCountByType();
      res.json(counts);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch asset type counts' });
    }
  });

  app.get('/api/assets/status/:status', async (req, res) => {
    try {
      const assets = await storage.getAssetsByStatus(req.params.status);
      res.json(assets);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch assets by status' });
    }
  });

  app.get('/api/assets/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const asset = await storage.getAssetById(id);
      if (!asset) {
        return res.status(404).json({ message: 'Asset not found' });
      }
      res.json(asset);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch asset' });
    }
  });

  app.post('/api/assets', async (req, res) => {
    try {
      const validatedData = insertAssetSchema.parse(req.body);
      const newAsset = await storage.createAsset(validatedData);
      res.status(201).json(newAsset);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid asset data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to create asset' });
    }
  });

  app.put('/api/assets/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertAssetSchema.partial().parse(req.body);
      const updatedAsset = await storage.updateAsset(id, validatedData);
      if (!updatedAsset) {
        return res.status(404).json({ message: 'Asset not found' });
      }
      res.json(updatedAsset);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid asset data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to update asset' });
    }
  });

  app.delete('/api/assets/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteAsset(id);
      if (!success) {
        return res.status(404).json({ message: 'Asset not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete asset' });
    }
  });

  // API routes for game versions
  app.get('/api/game-versions', async (req, res) => {
    try {
      const versions = await storage.getGameVersions();
      res.json(versions);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch game versions' });
    }
  });

  app.get('/api/game-versions/latest', async (req, res) => {
    try {
      const version = await storage.getLatestGameVersion();
      if (!version) {
        return res.status(404).json({ message: 'No game versions found' });
      }
      res.json(version);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch latest game version' });
    }
  });
  
  // Added endpoint for comparing game versions
  app.get('/api/game-versions/compare', async (req, res) => {
    try {
      const oldVersionId = parseInt(req.query.oldVersionId as string);
      const newVersionId = parseInt(req.query.newVersionId as string);
      
      if (isNaN(oldVersionId) || isNaN(newVersionId)) {
        return res.status(400).json({ message: 'Invalid version IDs' });
      }
      
      // Fetch both versions
      const oldVersion = await storage.getGameVersionById(oldVersionId);
      const newVersion = await storage.getGameVersionById(newVersionId);
      
      if (!oldVersion || !newVersion) {
        return res.status(404).json({ message: 'One or both versions not found' });
      }
      
      // Get all assets for the old version and the new version
      const allAssets = await storage.getAssets(1000); // Get a large number of assets
      
      // Filter assets by gameVersionId
      const oldVersionAssets = allAssets.filter(asset => asset.gameVersionId === oldVersionId);
      const newVersionAssets = allAssets.filter(asset => asset.gameVersionId === newVersionId);
      
      // Find new assets (in new version but not in old version)
      const newAssets = newVersionAssets.filter(newAsset => 
        !oldVersionAssets.some(oldAsset => oldAsset.assetId === newAsset.assetId)
      );
      
      // Find modified assets (in both versions but with different status or metadata)
      const modifiedAssets = newVersionAssets.filter(newAsset => {
        const oldAsset = oldVersionAssets.find(oldAsset => oldAsset.assetId === newAsset.assetId);
        if (!oldAsset) return false;
        
        // Check if there are differences
        return (
          newAsset.status !== oldAsset.status ||
          JSON.stringify(newAsset.metadata) !== JSON.stringify(oldAsset.metadata)
        );
      });
      
      // Find removed assets (in old version but not in new version)
      const removedAssets = oldVersionAssets.filter(oldAsset => 
        !newVersionAssets.some(newAsset => newAsset.assetId === oldAsset.assetId)
      );
      
      // Find potential leaks (new assets with status "potential_leak")
      const potentialLeaks = newAssets.filter(asset => asset.status === "potential_leak");
      
      res.json({
        newAssets,
        modifiedAssets,
        removedAssets,
        potentialLeaks,
        oldVersionId,
        newVersionId,
        oldVersionName: oldVersion.version,
        newVersionName: newVersion.version
      });
      
    } catch (error) {
      console.error('Version comparison error:', error);
      res.status(500).json({ message: 'Failed to compare versions' });
    }
  });

  app.post('/api/game-versions', async (req, res) => {
    try {
      const validatedData = insertGameVersionSchema.parse(req.body);
      const newVersion = await storage.createGameVersion(validatedData);
      res.status(201).json(newVersion);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid game version data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to create game version' });
    }
  });

  // API routes for scan activities
  app.get('/api/scan-activities', async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const activities = await storage.getScanActivities(limit);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch scan activities' });
    }
  });

  app.post('/api/scan-activities', async (req, res) => {
    try {
      const validatedData = insertScanActivitySchema.parse(req.body);
      const newActivity = await storage.createScanActivity(validatedData);
      res.status(201).json(newActivity);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid scan activity data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to create scan activity' });
    }
  });

  // API routes for tracked entities (developers, groups, places)
  app.get('/api/tracked-entities', async (req, res) => {
    try {
      // Optional filter by entity type
      const type = req.query.type as string | undefined;
      const entities = await storage.getTrackedEntities(type);
      res.json(entities);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch tracked entities' });
    }
  });

  app.get('/api/tracked-entities/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const entity = await storage.getTrackedEntityById(id);
      if (!entity) {
        return res.status(404).json({ message: 'Tracked entity not found' });
      }
      res.json(entity);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch tracked entity' });
    }
  });

  app.post('/api/tracked-entities', async (req, res) => {
    try {
      const validatedData = insertTrackedEntitySchema.parse(req.body);
      
      // Check if entity with this entityId already exists
      const existing = await storage.getTrackedEntityByEntityId(validatedData.entityId);
      if (existing) {
        return res.status(409).json({ 
          message: 'Entity with this ID already tracked',
          entity: existing
        });
      }
      
      const newEntity = await storage.createTrackedEntity(validatedData);
      res.status(201).json(newEntity);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid tracked entity data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to create tracked entity' });
    }
  });

  app.put('/api/tracked-entities/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertTrackedEntitySchema.partial().parse(req.body);
      const updatedEntity = await storage.updateTrackedEntity(id, validatedData);
      if (!updatedEntity) {
        return res.status(404).json({ message: 'Tracked entity not found' });
      }
      res.json(updatedEntity);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid tracked entity data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to update tracked entity' });
    }
  });

  app.delete('/api/tracked-entities/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteTrackedEntity(id);
      if (!success) {
        return res.status(404).json({ message: 'Tracked entity not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete tracked entity' });
    }
  });

  // API route for Lua script
  app.get('/api/lua-script', (req, res) => {
    const scannerScript = `-- Enhanced Asset Scanner for Pet Simulator 99
-- Recursively scans all game objects for assets

local MarketplaceService = game:GetService("MarketplaceService")
local HttpService = game:GetService("HttpService")

local function scanForAsset(targetAssetId)
    -- Track where we find the assets
    local foundLocations = {}
    
    -- Scan all descendants in workspace
    for _, child in pairs(workspace:GetDescendants()) do
        if child:IsA("Part") or child:IsA("MeshPart") or child:IsA("BasePart") then
            -- Check for the target asset ID in properties
            for propName, propValue in pairs(child:GetProperties()) do
                if type(propValue) == "string" and string.find(propValue, "rbxassetid://" .. targetAssetId) then
                    table.insert(foundLocations, {
                        object = child,
                        property = propName,
                        fullPath = getFullPath(child),
                        position = child.Position
                    })
                    print("Found asset ID " .. targetAssetId .. " in " .. child:GetFullName())
                end
            end
        end
    end
    
    -- Also scan ReplicatedStorage for models and other assets
    local replicatedStorage = game:GetService("ReplicatedStorage")
    for _, child in pairs(replicatedStorage:GetDescendants()) do
        -- Similar scanning logic for ReplicatedStorage
        if child:IsA("BasePart") or child:IsA("Decal") or child:IsA("Sound") or child:IsA("Script") then
            for propName, propValue in pairs(child:GetProperties()) do
                if type(propValue) == "string" and string.find(propValue, "rbxassetid://" .. targetAssetId) then
                    table.insert(foundLocations, {
                        object = child,
                        property = propName,
                        fullPath = getFullPath(child),
                        position = child:IsA("BasePart") and child.Position or nil
                    })
                    print("Found asset ID " .. targetAssetId .. " in " .. child:GetFullName())
                end
            end
        end
    end
    
    -- Also check SoundService
    local soundService = game:GetService("SoundService")
    for _, child in pairs(soundService:GetDescendants()) do
        if child:IsA("Sound") then
            if string.find(child.SoundId, "rbxassetid://" .. targetAssetId) then
                table.insert(foundLocations, {
                    object = child,
                    property = "SoundId",
                    fullPath = getFullPath(child)
                })
                print("Found sound asset ID " .. targetAssetId .. " in " .. child:GetFullName())
            end
        end
    end
    
    return foundLocations
end

local function getFullPath(instance)
    local path = instance.Name
    local current = instance.Parent
    
    while current and current ~= game do
        path = current.Name .. "." .. path
        current = current.Parent
    end
    
    return path
end

-- Function to scan all assets and report back to web app
local function scanAllAssets(serverEndpoint)
    local allAssets = {}
    local scannedServices = {
        workspace,
        game:GetService("ReplicatedStorage"),
        game:GetService("SoundService"),
        game:GetService("StarterGui"),
        game:GetService("StarterPack")
    }
    
    for _, service in ipairs(scannedServices) do
        for _, instance in pairs(service:GetDescendants()) do
            -- Scan for different types of assets
            if instance:IsA("BasePart") or instance:IsA("Decal") or 
               instance:IsA("Sound") or instance:IsA("Animation") or
               instance:IsA("Texture") or instance:IsA("MeshPart") then
                
                -- Extract asset IDs from properties
                local properties = {"TextureID", "MeshId", "SoundId", "ImageId", "AnimationId"}
                for _, prop in ipairs(properties) do
                    if instance[prop] and instance[prop] ~= "" then
                        -- Extract asset ID from format rbxassetid://123456789
                        local assetId = string.match(instance[prop], "rbxassetid://(%d+)")
                        if assetId then
                            table.insert(allAssets, {
                                assetId = assetId,
                                type = getAssetType(prop),
                                location = getFullPath(instance),
                                name = instance.Name
                            })
                        end
                    end
                end
            end
        end
    end
    
    -- You would send this data to your web application here
    -- Using HttpService to send a POST request
    -- Note: This requires HTTP requests to be enabled in the game
    if serverEndpoint then
        local success, result = pcall(function()
            return HttpService:PostAsync(serverEndpoint, HttpService:JSONEncode(allAssets))
        end)
        
        if success then
            print("Successfully reported " .. #allAssets .. " assets to server")
        else
            print("Failed to report assets: " .. tostring(result))
        end
    end
    
    return allAssets
end

local function getAssetType(propertyName)
    if propertyName == "TextureID" or propertyName == "ImageId" then
        return "texture"
    elseif propertyName == "MeshId" then
        return "model"
    elseif propertyName == "SoundId" then
        return "sound"
    elseif propertyName == "AnimationId" then
        return "animation"
    else
        return "unknown"
    end
end

-- Example usage:
-- local results = scanForAsset("123456789")
-- local allAssets = scanAllAssets("https://your-server-endpoint.com/api/assets")

return {
    scanForAsset = scanForAsset,
    scanAllAssets = scanAllAssets
}`;

    res.setHeader('Content-Type', 'text/plain');
    res.send(scannerScript);
  });

  const httpServer = createServer(app);
  return httpServer;
}
