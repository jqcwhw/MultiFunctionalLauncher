#Requires AutoHotkey v2.0

; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; ZONE CONFIGURATION FILE
; ----------------------------------------------------------------------------------------
; This file is used to map all games ZONE number to ZONE zoneNames.
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; ZONE PROPERTIES
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

global ZONE_MAP := Map(
    1, {
        name: "Spawn",
        world: 1,
        egg: 2
    },
    2, {
        name: "Colorful Forest",
        world: 1,
        egg: 3
    },
    3, {
        name: "Castle",
        world: 1,
        egg: 4
    },
    4, {
        name: "Green Forest",
        world: 1,
        egg: 5
    },
    5, {
        name: "Autumn",
        world: 1,
        egg: 7
    },
    6, {
        name: "Cherry Blossom",
        world: 1,
        egg: 8
    },
    7, {
        name: "Farm",
        world: 1,
        egg: 9
    },
    8, {
        name: "Backyard",
        world: 1,
        egg: 11
    },
    9, {
        name: "Misty Falls",
        world: 1,
        egg: 12
    },
    10, {
        name: "Mine",
        world: 1,
        egg: 13,
        buttonOffset: -172
    },
    11, {
        name: "Chrystal Caverns",
        world: 1,
        egg: 15
    },
    12, {
        name: "Dead Forest",
        world: 1,
        egg: 17
    },
    13, {
        name: "Dark Forest",
        world: 1,
        egg: 18
    },
    14, {
        name: "Mushroom Field",
        world: 1,
        egg: 20
    },
    15, {
        name: "Enchanted Forest",
        world: 1,
        egg: 21
    },
    16, {
        name: "Crimson Forest",
        world: 1,
        egg: 22
    },
    17, {
        name: "Jungle",
        world: 1,
        egg: 23
    },
    18, {
        name: "Jungle Temple",
        world: 1,
        egg: 25
    },
    19, {
        name: "Oasis",
        world: 1,
        egg: 27
    },
    20, {
        name: "Beach",
        world: 1,
        egg: 28
    },
    21, {
        name: "Coral Reef",
        world: 1,
        egg: 29
    },
    22, {
        name: "Shipwreck",
        world: 1,
        egg: 30
    },
    23, {
        name: "Atlantis",
        world: 1,
        egg: 31
    },
    24, {
        name: "Palm Beach",
        world: 1,
        egg: 33
    },
    25, {
        name: "Tiki",
        world: 1,
        egg: 34
    },
    26, {
        name: "Pirate Cove",
        world: 1,
        egg: 36
    },
    27, {
        name: "Pirate Tavern",
        world: 1,
        egg: 38
    },
    28, {
        name: "Shanty Town",
        world: 1,
        egg: 40
    },
    29, {
        name: "Desert Village",
        world: 1,
        egg: 42
    },
    30, {
        name: "Fossil Digsite",
        world: 1,
        egg: 43
    },
    31, {
        name: "Desert Pyramids",
        world: 1,
        egg: 44
    },
    32, {
        name: "Red Desert",
        world: 1,
        egg: 45
    },
    33, {
        name: "Wild West",
        world: 1,
        egg: 46
    },
    34, {
        name: "Grand Canyons",
        world: 1,
        egg: 47
    },
    35, {
        name: "Safari",
        world: 1,
        egg: 48
    },
    36, {
        name: "Mountains",
        world: 1,
        egg: 49
    },
    37, {
        name: "Snow Village",
        world: 1,
        egg: 50
    },
    38, {
        name: "Icy Peaks",
        world: 1,
        egg: 51
    },
    39, {
        name: "Ice Rink",
        world: 1,
        egg: 52
    },
    40, {
        name: "Ski Town",
        world: 1,
        egg: 53
    },
    41, {
        name: "Hot Springs",
        world: 1,
        egg: 54
    },
    42, {
        name: "Fire and Ice",
        world: 1,
        egg: 55
    },
    43, {
        name: "Volcano",
        world: 1,
        egg: 56
    },
    44, {
        name: "Obsidian Cave",
        world: 1,
        egg: 57
    },
    45, {
        name: "Lava Forest",
        world: 1,
        egg: 58
    },
    46, {
        name: "Underworld",
        world: 1,
        egg: 59
    },
    47, {
        name: "Underworld Bridge",
        world: 1,
        egg: 60
    },
    48, {
        name: "Underworld Castle",
        world: 1,
        egg: 61
    },
    49, {
        name: "Metal Dojo",
        world: 1,
        egg: 62
    },
    50, {
        name: "Fire Dojo",
        world: 1,
        egg: 63
    },
    51, {
        name: "Samurai Village",
        world: 1,
        egg: 64
    },
    52, {
        name: "Bamboo Forest",
        world: 1,
        egg: 65
    },
    53, {
        name: "Zen Garden",
        world: 1,
        egg: 66
    },
    54, {
        name: "Flower Field",
        world: 1,
        egg: 67
    },
    55, {
        name: "Fairytale Meadows",
        world: 1,
        egg: 68
    },
    56, {
        name: "Fairytale Castle",
        world: 1,
        egg: 69
    },
    57, {
        name: "Royal Kingdom",
        world: 1,
        egg: 70
    },
    58, {
        name: "Fairy Castle",
        world: 1,
        egg: 71
    },
    59, {
        name: "Cozy Village",
        world: 1,
        egg: 72
    },
    60, {
        name: "Rainbow River",
        world: 1,
        egg: 73
    },
    61, {
        name: "Colorful Mines",
        world: 1,
        egg: 74
    },
    62, {
        name: "Colorful Mountains",
        world: 1,
        egg: 75
    },
    63, {
        name: "Frost Mountains",
        world: 1,
        egg: 76
    },
    64, {
        name: "Ice Sculptures",
        world: 1,
        egg: 77
    },
    65, {
        name: "Snowman Town",
        world: 1,
        egg: 78
    },
    66, {
        name: "Ice Castle",
        world: 1,
        egg: 79
    },
    67, {
        name: "Polar Express",
        world: 1,
        egg: 80
    },
    68, {
        name: "Firefly Cold Forest",
        world: 1,
        egg: 81
    },
    69, {
        name: "Golden Road",
        world: 1,
        egg: 82
    },
    70, {
        name: "No Path Forest",
        world: 1,
        egg: 83
    },
    71, {
        name: "Ancient Ruins",
        world: 1,
        egg: 84
    },
    72, {
        name: "Runic Altar",
        world: 1,
        egg: 85
    },
    73, {
        name: "Wizard Tower",
        world: 1,
        egg: 86
    },
    74, {
        name: "Witch Marsh",
        world: 1,
        egg: 87
    },
    75, {
        name: "Haunted Forest",
        world: 1,
        egg: 88
    },
    76, {
        name: "Haunted Graveyard",
        world: 1,
        egg: 89
    },
    77, {
        name: "Haunted Mansion",
        world: 1,
        egg: 90
    },
    78, {
        name: "Dungeon Entrance",
        world: 1,
        egg: 91
    },
    79, {
        name: "Dungeon",
        world: 1,
        egg: 92
    },
    80, {
        name: "Treasure Dungeon",
        world: 1,
        egg: 93
    },
    81, {
        name: "Empyrean Dungeon",
        world: 1,
        egg: 94
    },
    82, {
        name: "Mythic Dungeon",
        world: 1,
        egg: 95
    },
    83, {
        name: "Cotton Candy Forest",
        world: 1,
        egg: 96
    },
    84, {
        name: "Gummy Forest",
        world: 1,
        egg: 97
    },
    85, {
        name: "Chocolate Waterfall",
        world: 1,
        egg: 98
    },
    86, {
        name: "Sweets",
        world: 1,
        egg: 99
    },
    87, {
        name: "Toys and Blocks",
        world: 1,
        egg: 100
    },
    88, {
        name: "Carnival",
        world: 1,
        egg: 101
    },
    89, {
        name: "Theme Park",
        world: 1,
        egg: 102
    },
    90, {
        name: "Clouds",
        world: 1,
        egg: 103
    },
    91, {
        name: "Cloud Garden",
        world: 1,
        egg: 104
    },
    92, {
        name: "Cloud Forest",
        world: 1,
        egg: 105
    },
    93, {
        name: "Cloud Houses",
        world: 1,
        egg: 106
    },
    94, {
        name: "Cloud Palace",
        world: 1,
        egg: 107
    },
    95, {
        name: "Heaven Gates",
        world: 1,
        egg: 108
    },
    96, {
        name: "Heaven",
        world: 1,
        egg: 109
    },
    97, {
        name: "Heaven Gate Castle",
        world: 1,
        egg: 110
    },
    98, {
        name: "Colorful Clouds",
        world: 1,
        egg: 111
    },
    99, {
        name: "Rainbow Road",
        world: 1,
        egg: 112,
        rareEgg: 111,
        bestPets: "Pastel Griffin|Pastel Goat",
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "d", time: 1075}
        ]        
    },
    100, {
        name: "Tech Spawn",
        world: 2,
        egg: 113
    },
    101, {
        name: "Futuristic City",
        world: 2,
        egg: 114
    },
    102, {
        name: "Hologram Forest",
        world: 2,
        egg: 115
    },
    103, {
        name: "Robot Farm",
        world: 2,
        egg: 116
    },
    104, {
        name: "Bit Stream",
        world: 2,
        egg: 117
    },
    105, {
        name: "Neon Mine",
        world: 2,
        egg: 118
    },
    106, {
        name: "Mushroom Lab",
        world: 2,
        egg: 119
    },
    107, {
        name: "Virtual Garden",
        world: 2,
        egg: 120
    },
    108, {
        name: "Data Tree Farm",
        world: 2,
        egg: 121
    },
    109, {
        name: "Tech Jungle",
        world: 2,
        egg: 122
    },
    110, {
        name: "Lava Jungle",
        world: 2,
        egg: 123
    },
    111, {
        name: "Oasis Ruins",
        world: 2,
        egg: 124
    },
    112, {
        name: "Future Beach",
        world: 2,
        egg: 125
    },
    113, {
        name: "Tech Reef",
        world: 2,
        egg: 126
    },
    114, {
        name: "Robo Pirates",
        world: 2,
        egg: 127
    },
    115, {
        name: "Cyber Cove",
        world: 2,
        egg: 128
    },
    116, {
        name: "Ruinic Desert",
        world: 2,
        egg: 129
    },
    117, {
        name: "Charged Pyramids",
        world: 2,
        egg: 130
    },
    118, {
        name: "Fallout Desert",
        world: 2,
        egg: 131
    },
    119, {
        name: "Tech Wild West",
        world: 2,
        egg: 132
    },
    120, {
        name: "Cuboid Canyon",
        world: 2,
        egg: 133
    },
    121, {
        name: "Frozen Mountains",
        world: 2,
        egg: 134
    },
    122, {
        name: "Frostbyte Forest",
        world: 2,
        egg: 135
    },
    123, {
        name: "Forcefield Mine",
        world: 2,
        egg: 136
    },
    124, {
        name: "Cyber Base Camp",
        world: 2,
        egg: 137
    },
    126, {
        name: "Cracked Iceberg",
        world: 2,
        egg: 139
    },
    127, {
        name: "Melted River",
        world: 2,
        egg: 140
    },
    128, {
        name: "Nexus",
        world: 2,
        egg: 141
    },
    129, {
        name: "Secure Coast",
        world: 2,
        egg: 142
    },
    130, {
        name: "Nuclear Forest",
        world: 2,
        egg: 143
    },
    131, {
        name: "Radiation Mine",
        world: 2,
        egg: 144
    },
    132, {
        name: "Exploded Reactor",
        world: 2,
        egg: 145
    },
    133, {
        name: "Spaceship Dock",
        world: 2,
        egg: 146
    },
    134, {
        name: "Rocket Planet",
        world: 2,
        egg: 147
    },
    135, {
        name: "Lunar Planet",
        world: 2,
        egg: 148
    },
    136, {
        name: "Mars Planet",
        world: 2,
        egg: 149
    },
    137, {
        name: "Saturn Planet",
        world: 2,
        egg: 150
    },
    138, {
        name: "Comet Planet",
        world: 2,
        egg: 151
    },
    139, {
        name: "Galaxy Port",
        world: 2,
        egg: 152
    },
    140, {
        name: "Electric Garden",
        world: 2,
        egg: 153
    },
    141, {
        name: "Mutated Forest",
        world: 2,
        egg: 154
    },
    142, {
        name: "Neon City",
        world: 2,
        egg: 155
    },
    143, {
        name: "Arcade Town",
        world: 2,
        egg: 156
    },
    144, {
        name: "Robot Factory",
        world: 2,
        egg: 157
    },
    145, {
        name: "Egg Incubator",
        world: 2,
        egg: 158
    },
    146, {
        name: "Hi-Tech Hive",
        world: 2,
        egg: 159
    },
    147, {
        name: "Spore Garden",
        world: 2,
        egg: 160
    },
    148, {
        name: "UFO Forest",
        world: 2,
        egg: 161
    },
    149, {
        name: "Alien Lab",
        world: 2,
        egg: 162
    },
    150, {
        name: "Alien Mothership",
        world: 2,
        egg: 163
    },
    151, {
        name: "Space Forge",
        world: 2,
        egg: 164
    },
    152, {
        name: "Space Factory",
        world: 2,
        egg: 165
    },
    153, {
        name: "Space Junkyard",
        world: 2,
        egg: 166
    },
    154, {
        name: "Steampunk Alley",
        world: 2,
        egg: 167
    },
    155, {
        name: "Steampunk Town",
        world: 2,
        egg: 168
    },
    156, {
        name: "Steampunk Clockwork",
        world: 2,
        egg: 169
    },
    157, {
        name: "Steampunk Airship",
        world: 2,
        egg: 170
    },
    158, {
        name: "Circuit Board",
        world: 2,
        egg: 171
    },
    159, {
        name: "Mothership Circuit Board",
        world: 2,
        egg: 172
    },
    160, {
        name: "Wizard Ruins",
        world: 2,
        egg: 173
    },
    161, {
        name: "Wizard Forest",
        world: 2,
        egg: 174
    },
    162, {
        name: "Wizard Tech Forest",
        world: 2,
        egg: 175
    },
    163, {
        name: "Wizard Tech Tower",
        world: 2,
        egg: 176
    },
    164, {
        name: "Wizard Dungeon",
        world: 2,
        egg: 177
    },
    165, {
        name: "Cyberpunk Undercity",
        world: 2,
        egg: 178
    },
    166, {
        name: "Cyberpunk Industrial",
        world: 2,
        egg: 179
    },
    167, {
        name: "Cyberpunk City",
        world: 2,
        egg: 180
    },
    168, {
        name: "Cyberpunk Road",
        world: 2,
        egg: 181
    },
    169, {
        name: "Tech Ninja Kyoto",
        world: 2,
        egg: 182
    },
    170, {
        name: "Tech Samurai",
        world: 2,
        egg: 183
    },
    171, {
        name: "Tech Ninja Village",
        world: 2,
        egg: 184
    },
    172, {
        name: "Tech Ninja City",
        world: 2,
        egg: 185
    },
    173, {
        name: "Dominus Dungeon",
        world: 2,
        egg: 186
    },
    174, {
        name: "Dominus Vault",
        world: 2,
        egg: 187
    },
    175, {
        name: "Dominus Lair",
        world: 2,
        egg: 188
    },
    176, {
        name: "Holographic Powerplant",
        world: 2,
        egg: 189
    },
    177, {
        name: "Holographic City",
        world: 2,
        egg: 190
    },
    178, {
        name: "Holographic Forest",
        world: 2,
        egg: 191
    },
    179, {
        name: "Holographic Mine",
        world: 2,
        egg: 192
    },
    180, {
        name: "Dark Tech Cove",
        world: 2,
        egg: 193
    },
    181, {
        name: "Dark Tech Ruins",
        world: 2,
        egg: 194
    },
    182, {
        name: "Dark Tech Castle",
        world: 2,
        egg: 195
    },
    183, {
        name: "Dark Tech Dungeon",
        world: 2,
        egg: 196
    },
    184, {
        name: "Dark Tech Forest",
        world: 2,
        egg: 197
    },
    185, {
        name: "Hacker Powerplant",
        world: 2,
        egg: 198
    },
    186, {
        name: "Hacker Compound",
        world: 2,
        egg: 199
    },
    187, {
        name: "Hacker Base",
        world: 2,
        egg: 200
    },
    188, {
        name: "Hacker Error",
        world: 2,
        egg: 201
    },
    189, {
        name: "Glitch Forest",
        world: 2,
        egg: 202
    },
    190, {
        name: "Glitch City",
        world: 2,
        egg: 203
    },
    191, {
        name: "Glitch Skyscrapers",
        world: 2,
        egg: 204
    },
    192, {
        name: "Glitch Town",
        world: 2,
        egg: 205
    },
    193, {
        name: "Glitch Quantum",
        world: 2,
        egg: 206
    },
    194, {
        name: "Quantum Forest",
        world: 2,
        egg: 207
    },
    195, {
        name: "Quantum Space Base",
        world: 2,
        egg: 208
    },
    196, {
        name: "Quantum Galaxy",
        world: 2,
        egg: 209
    },
    197, {
        name: "Void Atomic",
        world: 2,
        egg: 210
    },
    198, {
        name: "Void Fracture",
        world: 2,
        egg: 211
    },
    199, {
        name: "Void Spiral",
        world: 2,
        egg: 212,
        rareEgg: 117,
        bestPets: "Wireframe Dog|Wireframe Cat",
        flagZones: [101, 102, 103, 104, 105],
        pathToCentre: [
            {direction: "d", time: 700}
        ]
    },
    200, {
        name: "Prison Tower",
        world: 3,
        egg: 213,
        rareEgg: 217,
        flagZones: [200],
        pathToCentre: [
            {direction: "d", time: 800}
        ]
    },
    201, {
        name: "Prison Block",
        world: 3,
        egg: 214,
        rareEgg: 213,
        flagZones: [200],
        pathToCentre: [
            {direction: "d", time: 925}
        ]
    },
    202, {
        name: "Prison Cafeteria",
        world: 3,
        egg: 215,
        rareEgg: 213,
        flagZones: [200, 201],
        pathToCentre: [
            {direction: "d", time: 925}
        ]
    },
    203, {
        name: "Prison Yard",
        world: 3,
        egg: 216,
        rareEgg: 213,
        flagZones: [200, 201, 202],
        pathToCentre: [
            {direction: "d", time: 925}
        ]
    },
    204, {
        name: "Prison HQ",
        world: 3,
        egg: 216,
        rareEgg: 213,
        bestPets: "Detective Cat",
        flagZones: [200, 201, 202, 203],
        pathToCentre: [
            {direction: "d", time: 925}
        ]
    },
    205, {
        name: "Beach Island",
        world: 3,
        egg: 217,
        rareEgg: 213,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "a", time: 750}
        ]
    },
    206, {
        name: "Ocean Island",
        world: 3,
        egg: 218,
        rareEgg: 213,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "a", time: 1000}
        ]
    },
    207, {
        name: "Tiki Island",
        world: 3,
        egg: 219,
        rareEgg: 213,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "a", time: 950}
        ]
    },
    208, {
        name: "Jungle Island",
        world: 3,
        egg: 220,
        rareEgg: 213,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "a", time: 650}
        ]
    },
    209, {
        name: "Volcano Island",
        world: 3,
        egg: 221,
        rareEgg: 213,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "a", time: 650}
        ]
    },
    210, {
        name: "Hacker Matrix",
        world: 3,
        egg: 222,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "a", time: 1025}
        ]
    },
    211, {
        name: "Hacker Fortress",
        world: 3,
        egg: 223,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "d", time: 1000}
        ]
    },
    212, {
        name: "Hacker Cave",
        world: 3,
        egg: 224,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "s", time: 1000}
        ]
    },
    213, {
        name: "Hacker Lab",
        world: 3,
        egg: 225,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "a", time: 1000}
        ]
    },
    214, {
        name: "Hacker Mainframe",
        world: 3,
        egg: 226,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "w", time: 1000}
        ]
    },
    215, {
        name: "Dirt Village",
        world: 3,
        egg: 227,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "d", time: 900}
        ]
    },
    216, {
        name: "Stone Forts",
        world: 3,
        egg: 228,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "d", time: 950}
        ]
    },
    217, {
        name: "Silver City",
        world: 3,
        egg: 229,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "d", time: 975}
        ]
    },
    218, {
        name: "Golden Metropolis",
        world: 3,
        egg: 230,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "d", time: 950}
        ]
    },
    219, {
        name: "Diamond Mega City",
        world: 3,
        egg: 231,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "d", time: 950}
        ]
    },
    220, {
        name: "Kawaii Tokyo",
        world: 3,
        egg: 232,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "d", time: 950}
        ]
    },
    221, {
        name: "Kawaii Village",
        world: 3,
        egg: 233,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "d", time: 950}
        ]
    },
    222, {
        name: "Kawaii Grove",
        world: 3,
        egg: 234,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "d", time: 950}
        ]
    },
    223, {
        name: "Kawaii Dreamland",
        world: 3,
        egg: 235,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "d", time: 950}
        ]
    },
    224, {
        name: "Kawaii Temple",
        world: 3,
        egg: 236,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "d", time: 950}
        ]
    },
    225, {
        name: "Grassy Plains",
        world: 3,
        egg: 237,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "d", time: 900}
        ]
    },
    226, {
        name: "Rocky Ridge",
        world: 3,
        egg: 238,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "d", time: 950}
        ]
    },
    227, {
        name: "Crystal Lake",
        world: 3,
        egg: 239,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "d", time: 950}
        ]
    },
    228, {
        name: "Electro Forge",
        world: 3,
        egg: 240,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "d", time: 950}
        ]
    },
    229, {
        name: "Elemental Realm",
        world: 3,
        egg: 241,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "d", time: 950}
        ]
    },
    230, {
        name: "Elysium Fields",
        world: 3,
        egg: 242,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "d", time: 950}
        ]
    },
    231, {
        name: "Ocean Paradise",
        world: 3,
        egg: 243,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "d", time: 950}
        ]
    },
    232, {
        name: "Lost Library",
        world: 3,
        egg: 244,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "d", time: 950}
        ]
    },
    233, {
        name: "Nebula Forest",
        world: 3,
        egg: 245,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "d", time: 950}
        ]
    },
    234, {
        name: "Aether Colosseum",
        world: 3,
        egg: 246,
        rareEgg: 221,
        bestPets: "Trojan Horse",
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "d", time: 950}
        ]
    },
    235, {
        name: "Doodle Meadow",
        world: 3,
        egg: 247,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
    },
    236, {
        name: "Doodle Safari",
        world: 3,
        egg: 248,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
    },
    237, {
        name: "Doodle Fairyland",
        world: 3,
        egg: 249,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
    },
    238, {
        name: "Doodle Cave",
        world: 3,
        egg: 250,
        rareEgg: 221,
        flagZones: [200, 201, 202, 203, 204],
    },
    239, {
        name: "Doodle Oasis",
        world: 3,
        egg: 251,
        rareEgg: 221,
        bestPets: "Doodle Narwhal|Doodle Crocodile",
        flagZones: [200, 201, 202, 203, 204],
        pathToCentre: [
            {direction: "d", time: 950}
        ]
    }    
)