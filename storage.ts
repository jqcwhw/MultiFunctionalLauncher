import { 
  users, type User, type InsertUser, 
  assets, type Asset, type InsertAsset,
  gameVersions, type GameVersion, type InsertGameVersion,
  scanActivities, type ScanActivity, type InsertScanActivity,
  trackedEntities, type TrackedEntity, type InsertTrackedEntity
} from "@shared/schema";

// Extend the storage interface to include all CRUD operations
export interface IStorage {
  // User operations (keep original)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Asset operations
  getAssets(limit?: number, offset?: number): Promise<Asset[]>;
  getAssetById(id: number): Promise<Asset | undefined>;
  getAssetByAssetId(assetId: string): Promise<Asset | undefined>;
  createAsset(asset: InsertAsset): Promise<Asset>;
  updateAsset(id: number, asset: Partial<InsertAsset>): Promise<Asset | undefined>;
  deleteAsset(id: number): Promise<boolean>;
  getAssetsByType(type: string): Promise<Asset[]>;
  getAssetsByStatus(status: string): Promise<Asset[]>;
  getRecentAssets(limit?: number): Promise<Asset[]>;
  getAssetCountByType(): Promise<Record<string, number>>;
  
  // Game version operations
  getGameVersions(): Promise<GameVersion[]>;
  getGameVersionById(id: number): Promise<GameVersion | undefined>;
  getLatestGameVersion(): Promise<GameVersion | undefined>;
  createGameVersion(version: InsertGameVersion): Promise<GameVersion>;
  updateGameVersion(id: number, version: Partial<InsertGameVersion>): Promise<GameVersion | undefined>;
  
  // Scan activity operations
  getScanActivities(limit?: number): Promise<ScanActivity[]>;
  createScanActivity(activity: InsertScanActivity): Promise<ScanActivity>;
  
  // Tracked entity operations (developers, groups, places)
  getTrackedEntities(type?: string): Promise<TrackedEntity[]>;
  getTrackedEntityById(id: number): Promise<TrackedEntity | undefined>;
  getTrackedEntityByEntityId(entityId: string): Promise<TrackedEntity | undefined>;
  createTrackedEntity(entity: InsertTrackedEntity): Promise<TrackedEntity>;
  updateTrackedEntity(id: number, entity: Partial<InsertTrackedEntity>): Promise<TrackedEntity | undefined>;
  deleteTrackedEntity(id: number): Promise<boolean>;
}

// Memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private assets: Map<number, Asset>;
  private gameVersions: Map<number, GameVersion>;
  private scanActivities: Map<number, ScanActivity>;
  private trackedEntities: Map<number, TrackedEntity>;
  
  private userIdCounter: number;
  private assetIdCounter: number;
  private gameVersionIdCounter: number;
  private scanActivityIdCounter: number;
  private trackedEntityIdCounter: number;

  constructor() {
    this.users = new Map();
    this.assets = new Map();
    this.gameVersions = new Map();
    this.scanActivities = new Map();
    this.trackedEntities = new Map();
    
    this.userIdCounter = 1;
    this.assetIdCounter = 1;
    this.gameVersionIdCounter = 1;
    this.scanActivityIdCounter = 1;
    this.trackedEntityIdCounter = 1;
    
    // Initialize with default game versions
    const currentDate = new Date();
    
    this.createGameVersion({
      version: "v2.14.5",
      releaseDate: currentDate,
      assetCount: 14382,
      notes: "Latest game version"
    });
    
    this.createGameVersion({
      version: "v2.14.0",
      releaseDate: new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      assetCount: 14271,
      notes: "Added new pets"
    });
    
    this.createGameVersion({
      version: "v2.13.5",
      releaseDate: new Date(currentDate.getTime() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
      assetCount: 14201,
      notes: "New world and fixes"
    });
    
    // Initialize with some scan activities
    this.createScanActivity({
      type: "complete_scan",
      timestamp: new Date(currentDate.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
      details: "Found 32 new assets",
      newAssetsFound: 32,
      status: "success"
    });
    
    this.createScanActivity({
      type: "api_scan",
      timestamp: new Date(currentDate.getTime() - 24 * 60 * 60 * 1000), // 1 day ago
      details: "Rate limit reached",
      newAssetsFound: 15,
      status: "partial"
    });
    
    this.createScanActivity({
      type: "game_update",
      timestamp: new Date(currentDate.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      details: "Version 2.14.5 released",
      status: "success"
    });
    
    // Add sample assets (Pet Simulator 99 related)
    const sampleAssets = [
      {
        assetId: "12983552829",
        type: "model",
        name: "Golden Dragon Pet",
        status: "potential_leak",
        location: "ReplicatedStorage.PetModels",
        metadata: { 
          petRarity: "Legendary", 
          petPower: 15000,
          creator: "BIG Games",
          creatorId: "5732882",
          creatorType: "developer",
          description: "A legendary dragon pet with golden scales that emits a powerful radiance",
          imageUrl: "https://i.imgur.com/Jy2ZxQx.png",
          dimensions: "48x32x56 studs",
          gameReference: "Pet Simulator 99",
          potentialUpdate: "Dragon Update - v2.15.0",
          estimatedReleaseDate: "Next update (1-2 weeks)",
          detectionMethod: "Model scanning",
          polygons: 12850,
          textured: true
        },
        discoveredAt: new Date(currentDate.getTime() - 12 * 60 * 60 * 1000), // 12 hours ago
        gameVersionId: 1
      },
      {
        assetId: "12983771842",
        type: "texture",
        name: "Ice Cream World Texture",
        status: "potential_leak",
        location: "Workspace.WorldModels.IceCreamWorld",
        metadata: { 
          worldType: "Secret", 
          accessLevel: "VIP",
          creator: "BIG Games",
          creatorId: "5732882",
          creatorType: "developer",
          description: "Texture map for a new secret world filled with giant ice cream cones and sundaes",
          imageUrl: "https://i.imgur.com/vLw5GVY.png",
          resolution: "2048x2048",
          fileFormat: "PNG",
          gameReference: "Pet Simulator 99",
          colorPalette: "Pastel, vibrant colors",
          potentialUpdate: "Summer Update - v2.16.0",
          detectionMethod: "Texture scanning in ReplicatedStorage",
          associatedModels: ["IceCreamCone", "ChocolateSundae", "SprinkleField"]
        },
        discoveredAt: new Date(currentDate.getTime() - 15 * 60 * 60 * 1000), // 15 hours ago
        gameVersionId: 1
      },
      {
        assetId: "12983654421",
        type: "sound",
        name: "Mythical Pet Unlock",
        status: "new",
        location: "SoundService.Effects",
        metadata: { 
          duration: "3.5s", 
          category: "Effects",
          creator: "BIG Games Sound Team",
          creatorId: "9646932",
          creatorType: "group",
          description: "A triumphant fanfare sound that plays when a mythical rarity pet is hatched",
          audioFormat: "MP3",
          bitrate: "192kbps",
          imageUrl: "https://i.imgur.com/z1qG8aA.png",
          gameReference: "Pet Simulator 99",
          usageContext: "Pet hatching animation",
          associatedFeature: "Mythical pet hatching system",
          detectionMethod: "Sound service scanning"
        },
        discoveredAt: new Date(currentDate.getTime() - 24 * 60 * 60 * 1000), // 1 day ago
        gameVersionId: 1
      },
      {
        assetId: "12983892156",
        type: "model",
        name: "Pirate Ship Vehicle",
        status: "unreleased_content",
        location: "ReplicatedStorage.Vehicles",
        metadata: { 
          vehicleType: "Legendary", 
          speed: 120,
          creator: "BIG Games Vehicle Designer",
          creatorId: "5732882",
          creatorType: "developer",
          description: "A flying pirate ship vehicle that allows players to navigate the map in style",
          imageUrl: "https://i.imgur.com/gQHE1xk.png",
          dimensions: "120x80x100 studs",
          gameReference: "Pet Simulator 99",
          potentialUpdate: "Pirate Adventure Update - v2.15.0",
          estimatedReleaseDate: "Coming soon",
          detectionMethod: "Asset ID reference in game code",
          capacity: "Up to 6 players",
          specialAbility: "Water walking and flying capabilities"
        },
        discoveredAt: new Date(currentDate.getTime() - 36 * 60 * 60 * 1000), // 36 hours ago
        gameVersionId: 1
      },
      {
        assetId: "12984005319",
        type: "model",
        name: "Rainbow Unicorn",
        status: "tracked",
        location: "ReplicatedStorage.PetModels",
        metadata: { 
          petRarity: "Mythical", 
          petPower: 25000,
          creator: "BIG Games Pet Designer",
          creatorId: "5732882", 
          creatorType: "developer",
          description: "A majestic unicorn pet with rainbow effects that leaves a trail of sparkles",
          imageUrl: "https://i.imgur.com/3K9csNN.png",
          dimensions: "36x28x52 studs",
          gameReference: "Pet Simulator 99",
          potentialUpdate: "Rainbow Update - v2.15.0",
          detectionMethod: "Direct model reference found in game files",
          polygons: 9745,
          animations: ["Gallop", "Jump", "Rainbow Trail", "Special Dance"],
          specialAbility: "Rainbow Boost - increases luck by 15%"
        },
        discoveredAt: new Date(currentDate.getTime() - 48 * 60 * 60 * 1000), // 2 days ago
        gameVersionId: 1
      },
      {
        assetId: "12983448760",
        type: "texture",
        name: "Halloween Event Banner",
        status: "unreleased_content",
        location: "ReplicatedStorage.UI.EventBanners",
        metadata: { 
          eventStart: "October 25", 
          eventType: "Seasonal",
          creator: "BIG Games UI Team",
          creatorId: "5732882",
          creatorType: "developer",
          description: "Promotional banner for the upcoming Halloween event featuring spooky pets and items",
          imageUrl: "https://i.imgur.com/V4SWlYz.png",
          resolution: "1920x540",
          fileFormat: "PNG",
          gameReference: "Pet Simulator 99",
          colors: "Orange, black, purple with glowing effects",
          potentialEvent: "Spooky Spectacular 2025",
          detectionMethod: "UI element scanning",
          containsText: "Frightfully Fun Pets Coming Soon!"
        },
        discoveredAt: new Date(currentDate.getTime() - 60 * 60 * 60 * 1000), // 60 hours ago
        gameVersionId: 1
      },
      {
        assetId: "12984125688",
        type: "script",
        name: "Trading System Update",
        status: "new",
        location: "ServerScriptService.TradingSystem",
        metadata: { 
          featureType: "Economy", 
          version: "2.0",
          creator: "BIG Games Dev Team",
          creatorId: "5732882",
          creatorType: "developer",
          description: "Server-side script for an updated pet trading system with new UI and security features",
          imageUrl: "https://i.imgur.com/T9aWLFU.png",
          language: "Luau",
          lineCount: 1248,
          gameReference: "Pet Simulator 99", 
          mainFunctions: ["TradeRequest", "VerifyTrade", "ConfirmTrade", "CalculateValue"],
          securityFeatures: ["Anti-scam verification", "Value calculator", "Trade history"],
          detectionMethod: "Script analysis"
        },
        discoveredAt: new Date(currentDate.getTime() - 72 * 60 * 60 * 1000), // 3 days ago
        gameVersionId: 2
      },
      {
        assetId: "12984231973",
        type: "model",
        name: "Space Station World",
        status: "potential_leak",
        location: "ReplicatedStorage.WorldModels",
        metadata: { 
          worldType: "Premium", 
          accessLevel: "All",
          creator: "BIG Games World Designer",
          creatorId: "5732882",
          creatorType: "developer",
          description: "A futuristic space station world with low gravity gameplay and unique alien pets",
          imageUrl: "https://i.imgur.com/j8zAHcq.png",
          dimensions: "2000x2000x1000 studs",
          gameReference: "Pet Simulator 99",
          potentialUpdate: "Cosmic Explorers Update - v2.16.0",
          estimatedReleaseDate: "Expected within 1-2 months",
          detectionMethod: "Model reference in game code",
          specialMechanics: ["Low gravity", "Oxygen system", "Alien technology"],
          exclusivePets: ["Alien Blob", "Space Cadet", "Cosmic Dragon"]
        },
        discoveredAt: new Date(currentDate.getTime() - 96 * 60 * 60 * 1000), // 4 days ago
        gameVersionId: 2
      },
      {
        assetId: "12984356841",
        type: "sound",
        name: "New Background Music",
        status: "tracked",
        location: "SoundService.Music",
        metadata: { 
          duration: "3:45", 
          composer: "RobloxMusic",
          creator: "BIG Games Sound Team",
          creatorId: "9646932",
          creatorType: "group",
          description: "New orchestral background music for the main hub area with upbeat adventure theme",
          imageUrl: "https://i.imgur.com/z1qG8aA.png",
          audioFormat: "MP3",
          bitrate: "320kbps",
          gameReference: "Pet Simulator 99",
          musicStyle: "Orchestral adventure with electronic elements",
          potentialUpdate: "Sound system update - v2.15.0",
          detectionMethod: "SoundService scanning",
          loopable: true
        },
        discoveredAt: new Date(currentDate.getTime() - 120 * 60 * 60 * 1000), // 5 days ago
        gameVersionId: 2
      },
      {
        assetId: "12984478932",
        type: "texture",
        name: "New Pet Egg Design",
        status: "unreleased_content",
        location: "ReplicatedStorage.EggModels",
        metadata: { 
          eggType: "Ultra Rare", 
          cost: 50000,
          creator: "BIG Games Art Team",
          creatorId: "5732882",
          creatorType: "developer",
          description: "A shimmering crystal egg design with galaxy patterns that contains exclusive cosmic pets",
          imageUrl: "https://i.imgur.com/8ZE4mPf.png",
          resolution: "1024x1024",
          fileFormat: "PNG",
          gameReference: "Pet Simulator 99",
          colors: "Deep blue, purple, with glittering star effects",
          potentialUpdate: "Cosmic Explorers Update - v2.16.0",
          detectionMethod: "Texture reference scanning",
          hatchableContents: "Ultra rare cosmic-themed pets with special abilities",
          specialEffect: "Glowing aura with orbiting star particles"
        },
        discoveredAt: new Date(currentDate.getTime() - 144 * 60 * 60 * 1000), // 6 days ago
        gameVersionId: 2
      }
    ];
    
    // Add the sample assets to storage
    sampleAssets.forEach(asset => {
      this.createAsset(asset);
    });
    
    // Add sample tracked entities
    const sampleEntities = [
      {
        entityId: "5732882",
        entityType: "developer",
        name: "BIG Games",
        addedAt: new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000),
        lastScannedAt: new Date(currentDate.getTime() - 2 * 24 * 60 * 60 * 1000),
        metadata: { 
          developerType: "Studio", 
          website: "https://www.biggames.io",
          gameCount: 8
        },
        isActive: true
      },
      {
        entityId: "14550339",
        entityType: "place",
        name: "Pet Simulator 99",
        addedAt: new Date(currentDate.getTime() - 45 * 24 * 60 * 60 * 1000),
        lastScannedAt: new Date(currentDate.getTime() - 1 * 24 * 60 * 60 * 1000),
        metadata: { 
          visits: 5248763245,
          createdAt: "2022-08-15",
          universeId: 4105420587
        },
        isActive: true
      },
      {
        entityId: "9646932",
        entityType: "group",
        name: "BIG Games Fan Group",
        addedAt: new Date(currentDate.getTime() - 60 * 24 * 60 * 60 * 1000),
        lastScannedAt: new Date(currentDate.getTime() - 5 * 24 * 60 * 60 * 1000),
        metadata: { 
          memberCount: 1248763,
          isVerified: true,
          ownerName: "BIG Games"
        },
        isActive: true
      }
    ];
    
    // Add the sample tracked entities to storage
    sampleEntities.forEach(entity => {
      this.createTrackedEntity(entity);
    });
  }

  // User methods (from original storage)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Asset methods
  async getAssets(limit = 100, offset = 0): Promise<Asset[]> {
    const assets = Array.from(this.assets.values())
      .sort((a, b) => new Date(b.discoveredAt).getTime() - new Date(a.discoveredAt).getTime())
      .slice(offset, offset + limit);
    return assets;
  }
  
  async getAssetById(id: number): Promise<Asset | undefined> {
    return this.assets.get(id);
  }
  
  async getAssetByAssetId(assetId: string): Promise<Asset | undefined> {
    return Array.from(this.assets.values()).find(
      (asset) => asset.assetId === assetId,
    );
  }
  
  async createAsset(insertAsset: InsertAsset): Promise<Asset> {
    const id = this.assetIdCounter++;
    // Ensure all required fields are present
    const asset: Asset = { 
      id,
      assetId: insertAsset.assetId,
      type: insertAsset.type,
      name: insertAsset.name || null,
      status: insertAsset.status,
      location: insertAsset.location || null,
      discoveredAt: insertAsset.discoveredAt || new Date(),
      gameVersionId: insertAsset.gameVersionId || null,
      metadata: insertAsset.metadata || null
    };
    this.assets.set(id, asset);
    return asset;
  }
  
  async updateAsset(id: number, assetUpdate: Partial<InsertAsset>): Promise<Asset | undefined> {
    const existingAsset = this.assets.get(id);
    if (!existingAsset) return undefined;
    
    const updatedAsset: Asset = {
      ...existingAsset,
      ...assetUpdate,
    };
    
    this.assets.set(id, updatedAsset);
    return updatedAsset;
  }
  
  async deleteAsset(id: number): Promise<boolean> {
    return this.assets.delete(id);
  }
  
  async getAssetsByType(type: string): Promise<Asset[]> {
    return Array.from(this.assets.values())
      .filter(asset => asset.type === type)
      .sort((a, b) => new Date(b.discoveredAt).getTime() - new Date(a.discoveredAt).getTime());
  }
  
  async getAssetsByStatus(status: string): Promise<Asset[]> {
    return Array.from(this.assets.values())
      .filter(asset => asset.status === status)
      .sort((a, b) => new Date(b.discoveredAt).getTime() - new Date(a.discoveredAt).getTime());
  }
  
  async getRecentAssets(limit = 10): Promise<Asset[]> {
    return Array.from(this.assets.values())
      .sort((a, b) => new Date(b.discoveredAt).getTime() - new Date(a.discoveredAt).getTime())
      .slice(0, limit);
  }
  
  async getAssetCountByType(): Promise<Record<string, number>> {
    const counts: Record<string, number> = {};
    Array.from(this.assets.values()).forEach(asset => {
      counts[asset.type] = (counts[asset.type] || 0) + 1;
    });
    return counts;
  }
  
  // Game version methods
  async getGameVersions(): Promise<GameVersion[]> {
    return Array.from(this.gameVersions.values())
      .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
  }
  
  async getGameVersionById(id: number): Promise<GameVersion | undefined> {
    return this.gameVersions.get(id);
  }
  
  async getLatestGameVersion(): Promise<GameVersion | undefined> {
    return Array.from(this.gameVersions.values())
      .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())[0];
  }
  
  async createGameVersion(insertVersion: InsertGameVersion): Promise<GameVersion> {
    const id = this.gameVersionIdCounter++;
    const version: GameVersion = { 
      id,
      version: insertVersion.version,
      releaseDate: insertVersion.releaseDate,
      assetCount: insertVersion.assetCount,
      notes: insertVersion.notes || null
    };
    this.gameVersions.set(id, version);
    return version;
  }
  
  async updateGameVersion(id: number, versionUpdate: Partial<InsertGameVersion>): Promise<GameVersion | undefined> {
    const existingVersion = this.gameVersions.get(id);
    if (!existingVersion) return undefined;
    
    const updatedVersion: GameVersion = {
      ...existingVersion,
      ...versionUpdate,
    };
    
    this.gameVersions.set(id, updatedVersion);
    return updatedVersion;
  }
  
  // Scan activity methods
  async getScanActivities(limit = 10): Promise<ScanActivity[]> {
    return Array.from(this.scanActivities.values())
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }
  
  async createScanActivity(insertActivity: InsertScanActivity): Promise<ScanActivity> {
    const id = this.scanActivityIdCounter++;
    const activity: ScanActivity = { 
      id,
      type: insertActivity.type,
      status: insertActivity.status,
      timestamp: insertActivity.timestamp || new Date(),
      details: insertActivity.details || null,
      newAssetsFound: insertActivity.newAssetsFound || null
    };
    this.scanActivities.set(id, activity);
    return activity;
  }
  
  // Tracked entity methods (developers, groups, places)
  async getTrackedEntities(type?: string): Promise<TrackedEntity[]> {
    let entities = Array.from(this.trackedEntities.values());
    
    if (type) {
      entities = entities.filter(entity => entity.entityType === type);
    }
    
    return entities.sort((a, b) => 
      new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
    );
  }
  
  async getTrackedEntityById(id: number): Promise<TrackedEntity | undefined> {
    return this.trackedEntities.get(id);
  }
  
  async getTrackedEntityByEntityId(entityId: string): Promise<TrackedEntity | undefined> {
    return Array.from(this.trackedEntities.values()).find(
      (entity) => entity.entityId === entityId
    );
  }
  
  async createTrackedEntity(insertEntity: InsertTrackedEntity): Promise<TrackedEntity> {
    const id = this.trackedEntityIdCounter++;
    const entity: TrackedEntity = {
      id,
      entityId: insertEntity.entityId,
      entityType: insertEntity.entityType,
      name: insertEntity.name,
      addedAt: insertEntity.addedAt || new Date(),
      lastScannedAt: insertEntity.lastScannedAt || null,
      metadata: insertEntity.metadata || null,
      isActive: insertEntity.isActive !== undefined ? insertEntity.isActive : true
    };
    this.trackedEntities.set(id, entity);
    return entity;
  }
  
  async updateTrackedEntity(id: number, entityUpdate: Partial<InsertTrackedEntity>): Promise<TrackedEntity | undefined> {
    const existingEntity = this.trackedEntities.get(id);
    if (!existingEntity) return undefined;
    
    const updatedEntity: TrackedEntity = {
      ...existingEntity,
      ...entityUpdate,
    };
    
    this.trackedEntities.set(id, updatedEntity);
    return updatedEntity;
  }
  
  async deleteTrackedEntity(id: number): Promise<boolean> {
    return this.trackedEntities.delete(id);
  }
}

export const storage = new MemStorage();
