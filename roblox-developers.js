/**
 * Pet Simulator 99 Known Developers and Asset Types
 * These are the official Roblox developers associated with the game
 */

// Define Pet Simulator 99 constants
const PET_SIMULATOR_99_GAME_ID = '8737899170';
const PET_SIMULATOR_DEV_GAME_ID = '15502302041';

// List of known Pet Simulator 99 developers
const petSimulatorDevelopers = [
  {
    id: 13365322, // Preston
    username: "Builderboy1005",
    role: "founder",
    isOfficial: true,
    games: [PET_SIMULATOR_99_GAME_ID],
    description: "Founder of Big Games and creator of Pet Simulator series"
  },
  {
    id: 1210210, // Big Games Studio
    username: "bigGames",
    role: "developer",
    isOfficial: true,
    games: [PET_SIMULATOR_99_GAME_ID],
    description: "Big Games Studio official account"
  },
  {
    id: 2878290231, // Development account
    username: "bigGamesDev",
    role: "developer",
    isOfficial: true,
    games: [PET_SIMULATOR_99_GAME_ID, PET_SIMULATOR_DEV_GAME_ID],
    description: "Big Games developer account"
  },
  {
    id: 1784060946, // Another developer
    username: "ChickenEngineer",
    role: "developer",
    isOfficial: true,
    games: [PET_SIMULATOR_99_GAME_ID],
    description: "Big Games developer, works on Pet Simulator pets"
  }
];

// Asset types that can be included in leaks
const assetTypes = [
  { id: 'mesh', name: 'Mesh', description: '3D object geometry data' },
  { id: 'model', name: 'Model', description: 'Assembly of multiple objects' },
  { id: 'animation', name: 'Animation', description: 'Character/object animation data' },
  { id: 'decal', name: 'Decal', description: 'Texture/image applied to surfaces' },
  { id: 'audio', name: 'Audio', description: 'Sound effects and music' },
  { id: 'package', name: 'Package', description: 'Bundled assets' },
  { id: 'script', name: 'Script', description: 'Lua code files' },
  { id: 'texture', name: 'Texture', description: 'Image files for 3D models' }
];

// Leak types for classification
const leakTypes = [
  { id: 'map', name: 'Map', description: 'Game world/map content' },
  { id: 'asset', name: 'Asset', description: 'Models, meshes, or other game assets' },
  { id: 'script', name: 'Script', description: 'Game code/scripts' },
  { id: 'model', name: 'Model', description: 'Character or object models' },
  { id: 'texture', name: 'Texture', description: 'Image/texture files' },
  { id: 'audio', name: 'Audio', description: 'Sound files and music' },
  { id: 'other', name: 'Other', description: 'Miscellaneous content' },
  { id: 'automatic', name: 'Automatic', description: 'Automatically discovered content' }
];

// Export the constants and arrays
module.exports = {
  PET_SIMULATOR_99_GAME_ID,
  PET_SIMULATOR_DEV_GAME_ID,
  petSimulatorDevelopers,
  assetTypes,
  leakTypes,
  
  // Helper functions
  getDeveloperById(id) {
    return petSimulatorDevelopers.find(dev => dev.id === parseInt(id, 10));
  },
  
  getDeveloperByUsername(username) {
    return petSimulatorDevelopers.find(
      dev => dev.username.toLowerCase() === username.toLowerCase()
    );
  },
  
  isOfficialDeveloper(id) {
    const dev = this.getDeveloperById(id);
    return dev ? dev.isOfficial : false;
  },
  
  getAssetType(id) {
    return assetTypes.find(type => type.id === id);
  },
  
  getLeakType(id) {
    return leakTypes.find(type => type.id === id);
  }
};