/**
 * Information about Pet Simulator 99 developers and relevant game IDs
 */

export const PET_SIMULATOR_99_GAME_ID = '8737899170';
export const PET_SIMULATOR_DEV_GAME_ID = '15502302041';

// List of known Pet Simulator 99 developers
export const petSimulatorDevelopers = [
  {
    id: 13365322, // Preston
    username: "Builderboy1005",
    role: "founder",
    isOfficial: true,
    games: [PET_SIMULATOR_99_GAME_ID],
    description: "Founder of Big Games and creator of Pet Simulator series"
  },
  {
    id: 1210210, // Another developer
    username: "bigGames",
    role: "developer",
    isOfficial: true,
    games: [PET_SIMULATOR_99_GAME_ID],
    description: "Big Games Studio official account"
  },
  {
    id: 2878290231,
    username: "bigGamesDev",
    role: "developer",
    isOfficial: true,
    games: [PET_SIMULATOR_99_GAME_ID, PET_SIMULATOR_DEV_GAME_ID],
    description: "Big Games developer account"
  },
  {
    id: 1784060946,
    username: "ChickenEngineer",
    role: "developer",
    isOfficial: true,
    games: [PET_SIMULATOR_99_GAME_ID],
    description: "Big Games developer, works on Pet Simulator pets"
  }
];

/**
 * Check if a user ID belongs to an official Pet Simulator developer
 */
export function isOfficialPetSimulatorDeveloper(userId: number): boolean {
  return petSimulatorDevelopers.some(dev => dev.id === userId && dev.isOfficial);
}

/**
 * Verify if content is likely related to Pet Simulator 99
 */
export function verifyPetSimulatorContent(
  content: {
    title?: string;
    description?: string;
    tags?: string[];
    metadata?: any;
  }
): { isVerified: boolean; confidence: number; reason: string } {
  // Start with base confidence
  let confidence = 0;
  let reasons: string[] = [];

  // Check for Pet Simulator keywords in title
  if (content.title) {
    const title = content.title.toLowerCase();
    if (title.includes("pet simulator") || title.includes("pet sim") || title.includes("ps99")) {
      confidence += 30;
      reasons.push("Title contains Pet Simulator keywords");
    }
    if (title.includes("huge") && title.includes("pet")) {
      confidence += 20;
      reasons.push("Title references Huge Pets (PS99 feature)");
    }
  }

  // Check for Pet Simulator keywords in description
  if (content.description) {
    const desc = content.description.toLowerCase();
    if (desc.includes("pet simulator") || desc.includes("pet sim") || desc.includes("ps99")) {
      confidence += 20;
      reasons.push("Description contains Pet Simulator keywords");
    }
    if (desc.includes("big games") || desc.includes("preston")) {
      confidence += 15;
      reasons.push("Description mentions Big Games or Preston");
    }
  }

  // Check for relevant tags
  if (content.tags && content.tags.length > 0) {
    const relevantTags = content.tags.filter(tag => {
      const lowerTag = tag.toLowerCase();
      return lowerTag.includes("pet") || 
        lowerTag.includes("simulator") || 
        lowerTag.includes("ps99") || 
        lowerTag.includes("biggames");
    });
    
    if (relevantTags.length > 0) {
      confidence += 15 * Math.min(relevantTags.length, 3);
      reasons.push(`Contains ${relevantTags.length} relevant tags`);
    }
  }

  // Check metadata if available
  if (content.metadata) {
    if (content.metadata.gameId === PET_SIMULATOR_99_GAME_ID) {
      confidence += 50;
      reasons.push("Content directly linked to Pet Simulator 99 game ID");
    }
    
    if (content.metadata.developerId && 
        petSimulatorDevelopers.some(dev => dev.id === content.metadata.developerId)) {
      confidence += 40;
      reasons.push("Content created by known Pet Simulator developer");
    }
  }

  // Determine if the content is verified based on confidence
  const isVerified = confidence >= 50;
  const reason = reasons.join(", ");

  return {
    isVerified,
    confidence,
    reason: reason || "No specific indicators found"
  };
}