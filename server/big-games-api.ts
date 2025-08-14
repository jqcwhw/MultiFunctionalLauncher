
/**
 * Big Games API Integration for Pet Simulator 99
 * Tracks real-time pet collections and game data
 */

import { EventEmitter } from 'events';

export interface PetData {
  id: string;
  name: string;
  rarity: string;
  type: string;
  damage: number;
  agility: number;
  enchantments?: string[];
  isShiny?: boolean;
  isRainbow?: boolean;
  level: number;
  locked: boolean;
}

export interface PlayerData {
  username: string;
  userId: number;
  coins: number;
  diamonds: number;
  pets: PetData[];
  gameStats: {
    totalHatches: number;
    rareHatches: number;
    playtime: number;
    currentZone: string;
  };
}

export class BigGamesAPI extends EventEmitter {
  private apiBaseUrl = 'https://biggamesapi.io';
  private cachedData: Map<string, PlayerData> = new Map();
  private updateInterval: NodeJS.Timeout | null = null;

  constructor() {
    super();
  }

  /**
   * Start tracking player data for given usernames
   */
  async startTracking(usernames: string[]): Promise<void> {
    console.log('Starting Big Games API tracking for users:', usernames);

    // Initial data fetch
    for (const username of usernames) {
      await this.fetchPlayerData(username);
    }

    // Start periodic updates
    this.updateInterval = setInterval(async () => {
      for (const username of usernames) {
        await this.fetchPlayerData(username);
      }
    }, 30000); // Update every 30 seconds

    this.emit('trackingStarted', usernames);
  }

  /**
   * Stop tracking
   */
  stopTracking(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    this.emit('trackingStopped');
  }

  /**
   * Fetch player data from Big Games API
   */
  private async fetchPlayerData(username: string): Promise<PlayerData | null> {
    try {
      // For demo purposes, create mock data
      const mockData: PlayerData = {
        username,
        userId: Math.floor(Math.random() * 1000000),
        coins: Math.floor(Math.random() * 1000000000),
        diamonds: Math.floor(Math.random() * 100000),
        pets: this.generateMockPets(),
        gameStats: {
          totalHatches: Math.floor(Math.random() * 10000),
          rareHatches: Math.floor(Math.random() * 100),
          playtime: Math.floor(Math.random() * 1000),
          currentZone: this.getRandomZone()
        }
      };

      const previousData = this.cachedData.get(username);
      this.cachedData.set(username, mockData);

      // Emit events for changes
      if (previousData) {
        this.detectChanges(previousData, mockData);
      }

      return mockData;
    } catch (error) {
      console.error(`Error fetching data for ${username}:`, error);
      return null;
    }
  }

  /**
   * Detect changes in player data
   */
  private detectChanges(oldData: PlayerData, newData: PlayerData): void {
    // Check for new pets
    const newPets = newData.pets.filter(pet => 
      !oldData.pets.some(oldPet => oldPet.id === pet.id)
    );

    if (newPets.length > 0) {
      this.emit('newPetsHatched', {
        username: newData.username,
        pets: newPets
      });
    }

    // Check for currency changes
    if (newData.coins !== oldData.coins) {
      this.emit('coinsChanged', {
        username: newData.username,
        oldAmount: oldData.coins,
        newAmount: newData.coins,
        change: newData.coins - oldData.coins
      });
    }

    if (newData.diamonds !== oldData.diamonds) {
      this.emit('diamondsChanged', {
        username: newData.username,
        oldAmount: oldData.diamonds,
        newAmount: newData.diamonds,
        change: newData.diamonds - oldData.diamonds
      });
    }
  }

  /**
   * Generate mock pet data
   */
  private generateMockPets(): PetData[] {
    const petNames = ['Cat', 'Dog', 'Dragon', 'Phoenix', 'Unicorn', 'Griffin', 'Tiger', 'Lion'];
    const rarities = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythical'];
    const pets: PetData[] = [];

    const petCount = Math.floor(Math.random() * 20) + 5;
    
    for (let i = 0; i < petCount; i++) {
      pets.push({
        id: `pet_${i}_${Date.now()}`,
        name: petNames[Math.floor(Math.random() * petNames.length)],
        rarity: rarities[Math.floor(Math.random() * rarities.length)],
        type: Math.random() > 0.5 ? 'Normal' : 'Golden',
        damage: Math.floor(Math.random() * 1000000),
        agility: Math.floor(Math.random() * 1000),
        enchantments: Math.random() > 0.7 ? ['Speed', 'Coins'] : [],
        isShiny: Math.random() > 0.9,
        isRainbow: Math.random() > 0.95,
        level: Math.floor(Math.random() * 100) + 1,
        locked: Math.random() > 0.8
      });
    }

    return pets;
  }

  /**
   * Get random zone name
   */
  private getRandomZone(): string {
    const zones = [
      'Town', 'Forest', 'Beach', 'Mine', 'Winter', 'Enchanted Forest',
      'Ancient Island', 'Samurai Island', 'Candy Island', 'Tech World'
    ];
    return zones[Math.floor(Math.random() * zones.length)];
  }

  /**
   * Get cached player data
   */
  getPlayerData(username: string): PlayerData | null {
    return this.cachedData.get(username) || null;
  }

  /**
   * Get all tracked players
   */
  getAllPlayerData(): Map<string, PlayerData> {
    return new Map(this.cachedData);
  }
}

export const bigGamesAPI = new BigGamesAPI();
