/**
 * Leaked assets data for Pet Simulator 99
 * Structured data containing information about leaked assets from the game
 */

// Sample leaked assets data
const leakedAssets = [
  {
    id: 1,
    assetId: '12243325671',
    name: 'Hippomelon Shoulder Pet',
    description: 'This pet sits on the shoulder of your character.',
    type: 'model',
    thumbnailUrl: 'https://tr.rbxcdn.com/9aae82c43c05ba5df7ca02e0c9116e16/420/420/Model/Png',
    leakDate: '2023-07-15',
    verified: true,
    tags: ['pet', 'shoulder', 'cosmetic'],
    developerId: 13365322,
    developerName: 'Builderboy1005',
    gameId: '8737899170',
    gameName: 'Pet Simulator 99'
  },
  {
    id: 2,
    assetId: '12357841906',
    name: 'Techno Hoverboard',
    description: 'A futuristic hoverboard for quick transportation.',
    type: 'model',
    thumbnailUrl: 'https://tr.rbxcdn.com/d7fb9bb3dbd8fb7a14e71b38b7f365f3/420/420/Model/Png',
    leakDate: '2023-08-02',
    verified: true,
    tags: ['vehicle', 'hoverboard', 'transportation'],
    developerId: 1210210,
    developerName: 'bigGames',
    gameId: '8737899170',
    gameName: 'Pet Simulator 99'
  },
  {
    id: 3,
    assetId: '12378965412',
    name: 'Secret Treasure Room',
    description: 'Hidden room with special treasures.',
    type: 'map',
    thumbnailUrl: 'https://tr.rbxcdn.com/5f82e59b6a189f0bf812f5f397544d6b/420/420/Model/Png',
    leakDate: '2023-08-15',
    verified: false,
    tags: ['map', 'treasure', 'secret'],
    developerId: 2878290231,
    developerName: 'bigGamesDev',
    gameId: '8737899170',
    gameName: 'Pet Simulator 99'
  },
  {
    id: 4,
    assetId: '12401235789',
    name: 'Omega Fishing Rod',
    description: 'Ultra rare fishing rod with special abilities.',
    type: 'model',
    thumbnailUrl: 'https://tr.rbxcdn.com/e9c2b300b0c5e1bc0a7b9c727fcb77a4/420/420/Model/Png',
    leakDate: '2023-09-01',
    verified: true,
    tags: ['tool', 'fishing', 'rare'],
    developerId: 1784060946,
    developerName: 'ChickenEngineer',
    gameId: '8737899170',
    gameName: 'Pet Simulator 99'
  },
  {
    id: 5,
    assetId: '12425678901',
    name: 'Secret Boss Theme',
    description: 'Music that plays during a secret boss encounter.',
    type: 'audio',
    thumbnailUrl: 'https://tr.rbxcdn.com/9e2ae8c4ced994faece6589e78356bee/420/420/Audio/Png',
    leakDate: '2023-09-15',
    verified: false,
    tags: ['audio', 'music', 'boss'],
    developerId: 13365322,
    developerName: 'Builderboy1005',
    gameId: '8737899170',
    gameName: 'Pet Simulator 99'
  }
];

/**
 * Get all leaked assets
 * @returns {Array} Array of all leaked assets
 */
function getAllAssets() {
  return leakedAssets;
}

/**
 * Get a specific asset by ID
 * @param {number} id - Asset ID
 * @returns {Object|null} Asset object or null if not found
 */
function getAssetById(id) {
  return leakedAssets.find(asset => asset.id === id) || null;
}

/**
 * Get assets created by a specific developer
 * @param {number} developerId - Roblox developer ID
 * @returns {Array} Array of assets from the developer
 */
function getAssetsByDeveloperId(developerId) {
  return leakedAssets.filter(asset => asset.developerId === developerId);
}

/**
 * Get assets by category/type
 * @param {string} category - Asset type/category
 * @returns {Array} Array of assets matching the category
 */
function getAssetsByCategory(category) {
  return leakedAssets.filter(asset => asset.type === category);
}

/**
 * Get only verified assets
 * @returns {Array} Array of verified assets
 */
function getVerifiedAssets() {
  return leakedAssets.filter(asset => asset.verified === true);
}

/**
 * Search assets by query string
 * @param {string} query - Search query
 * @returns {Array} Array of matching assets
 */
function searchAssets(query) {
  if (!query) return leakedAssets;
  
  const lowercaseQuery = query.toLowerCase();
  return leakedAssets.filter(asset => {
    return (
      asset.name.toLowerCase().includes(lowercaseQuery) ||
      asset.description.toLowerCase().includes(lowercaseQuery) ||
      asset.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  });
}

// Export all functions
module.exports = {
  getAllAssets,
  getAssetById,
  getAssetsByDeveloperId,
  getAssetsByCategory,
  getVerifiedAssets,
  searchAssets
};