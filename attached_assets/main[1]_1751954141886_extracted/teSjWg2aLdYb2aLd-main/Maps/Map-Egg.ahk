#Requires AutoHotkey v2.0

global EGG_MAP := Map(
    1, {
        name: "Cracked Egg",
        world: 1,
        zone: 1,
        path: []
    },
    2, {
        name: "Spotted Egg",
        world: 1,
        zone: 1,
        path: []
    },
    3, {
        name: "Paw Egg",
        world: 1,
        zone: 2,
        path: []
    },
    4, {
        name: "Grass Egg",
        world: 1,
        zone: 3,
        path: []
    },
    5, {
        name: "Wood Egg",
        world: 1,
        zone: 4,
        path: []
    },
    6, {
        name: "Pumpkin Egg",
        world: 1,
        zone: 5,
        path: []
    },
    7, {
        name: "Hive Egg",
        world: 1,
        zone: 5,
        path: []
    },
    8, {
        name: "Acorn Egg",
        world: 1,
        zone: 6,
        path: []
    },
    9, {
        name: "Blossom Egg",
        world: 1,
        zone: 7,
        path: []
    },
    10, {
        name: "Corgi Egg",
        world: 1,
        zone: 8,
        path: []
    },
    11, {
        name: "Cat Egg",
        world: 1,
        zone: 8,
        path: []
    },
    12, {
        name: "Dog Egg",
        world: 1,
        zone: 9,
        path: []
    },
    13, {
        name: "Dragon Egg",
        world: 1,
        zone: 10,
        path: []
    },
    14, {
        name: "Rock Egg",
        world: 1,
        zone: 10,
        path: []
    },
    15, {
        name: "Geode Egg",
        world: 1,
        zone: 11,
        path: []
    },
    16, {
        name: "Hut Egg",
        world: 1,
        zone: 12,
        path: []
    },
    17, {
        name: "Grave Egg",
        world: 1,
        zone: 12,
        path: []
    },
    18, {
        name: "Spike Egg",
        world: 1,
        zone: 13,
        path: []
    },
    19, {
        name: "Sprout Egg",
        world: 1,
        zone: 14,
        path: []
    },
    20, {
        name: "Mushroom Egg",
        world: 1,
        zone: 14,
        path: []
    },
    21, {
        name: "Spirit Egg",
        world: 1,
        zone: 15,
        path: []
    },
    22, {
        name: "Crimson Egg",
        world: 1,
        zone: 16,
        path: []
    },
    23, {
        name: "Overgrown Egg",
        world: 1,
        zone: 17,
        path: []
    },
    24, {
        name: "Mossy Egg",
        world: 1,
        zone: 18,
        path: []
    },
    25, {
        name: "Jungle Egg",
        world: 1,
        zone: 18,
        path: []
    },
    26, {
        name: "Sandcastle Egg",
        world: 1,
        zone: 19,
        path: []
    },
    27, {
        name: "Palm Tree Egg",
        world: 1,
        zone: 19,
        path: []
    },
    28, {
        name: "Beach Ball Egg",
        world: 1,
        zone: 20,
        path: []
    },
    29, {
        name: "Coral Egg",
        world: 1,
        zone: 21,
        path: []
    },
    30, {
        name: "Anchor Egg",
        world: 1,
        zone: 22,
        path: []
    },
    31, {
        name: "Atlantis Egg",
        world: 1,
        zone: 23,
        path: []
    },
    32, {
        name: "Tropical Egg",
        world: 1,
        zone: 24,
        path: []
    },
    33, {
        name: "Beach Egg",
        world: 1,
        zone: 24,
        path: []
    },
    34, {
        name: "Coconut Egg",
        world: 1,
        zone: 25,
        path: []
    },
    35, {
        name: "Tiki Egg",
        world: 1,
        zone: 26,
        path: []
    },
    36, {
        name: "Sand Bucket Egg",
        world: 1,
        zone: 26,
        path: []
    },
    37, {
        name: "Sunny Egg",
        world: 1,
        zone: 27,
        path: []
    },
    38, {
        name: "Pirate Egg",
        world: 1,
        zone: 27,
        path: []
    },
    39, {
        name: "Ship Egg",
        world: 1,
        zone: 28,
        path: []
    },
    40, {
        name: "Zebra Egg",
        world: 1,
        zone: 28,
        path: []
    },
    41, {
        name: "Cheetah Egg",
        world: 1,
        zone: 29,
        path: []
    },
    42, {
        name: "Cactus Egg",
        world: 1,
        zone: 29,
        path: []
    },
    43, {
        name: "Fossil Egg",
        world: 1,
        zone: 30,
        path: []
    },
    44, {
        name: "Egyptian Egg",
        world: 1,
        zone: 31,
        path: []
    },
    45, {
        name: "Sandstone Egg",
        world: 1,
        zone: 32,
        path: []
    },
    46, {
        name: "Cowboy Egg",
        world: 1,
        zone: 33,
        path: []
    },
    47, {
        name: "Canyon Egg",
        world: 1,
        zone: 34,
        path: []
    },
    48, {
        name: "Hyena Egg",
        world: 1,
        zone: 35,
        path: []
    },
    49, {
        name: "Melted Egg",
        world: 1,
        zone: 36,
        path: []
    },
    50, {
        name: "Snow Egg",
        world: 1,
        zone: 37,
        path: []
    },
    51, {
        name: "Icicle Egg",
        world: 1,
        zone: 38,
        path: []
    },
    52, {
        name: "Snowman Egg",
        world: 1,
        zone: 39,
        path: []
    },
    53, {
        name: "Yeti Egg",
        world: 1,
        zone: 40,
        path: []
    },
    54, {
        name: "Ice Egg",
        world: 1,
        zone: 41,
        path: []
    },
    55, {
        name: "Thawed Egg",
        world: 1,
        zone: 42,
        path: []
    },
    56, {
        name: "Magma Egg",
        world: 1,
        zone: 43,
        path: []
    },
    57, {
        name: "Obsidian Egg",
        world: 1,
        zone: 44,
        path: []
    },
    58, {
        name: "Volcano Egg",
        world: 1,
        zone: 45,
        path: []
    },
    59, {
        name: "Bone Egg",
        world: 1,
        zone: 46,
        path: []
    },
    60, {
        name: "Tentacle Egg",
        world: 1,
        zone: 47,
        path: []
    },
    61, {
        name: "Hell Egg",
        world: 1,
        zone: 48,
        path: []
    },
    62, {
        name: "Metal Egg",
        world: 1,
        zone: 49,
        path: []
    },
    63, {
        name: "Sakura Egg",
        world: 1,
        zone: 50,
        path: []
    },
    64, {
        name: "Ninja Egg",
        world: 1,
        zone: 51,
        path: []
    },
    65, {
        name: "Lantern Egg",
        world: 1,
        zone: 52,
        path: []
    },
    66, {
        name: "Bonsai Egg",
        world: 1,
        zone: 53,
        path: []
    },
    67, {
        name: "Garden Egg",
        world: 1,
        zone: 54,
        path: []
    },
    68, {
        name: "Pixie Egg",
        world: 1,
        zone: 55,
        path: []
    },
    69, {
        name: "Pedal Egg",
        world: 1,
        zone: 56,
        path: []
    },
    70, {
        name: "Crowned Egg",
        world: 1,
        zone: 57,
        path: []
    },
    71, {
        name: "Royal Egg",
        world: 1,
        zone: 58,
        path: []
    },
    72, {
        name: "Dandelion Egg",
        world: 1,
        zone: 59,
        path: []
    },
    73, {
        name: "Colorful Egg",
        world: 1,
        zone: 60,
        path: []
    },
    74, {
        name: "Colorful Geode Egg",
        world: 1,
        zone: 61,
        path: []
    },
    75, {
        name: "Colorful Mosaic Egg",
        world: 1,
        zone: 62,
        path: []
    },
    76, {
        name: "Frosted Geode Egg",
        world: 1,
        zone: 63,
        path: []
    },
    77, {
        name: "Ice Sculpture Egg",
        world: 1,
        zone: 64,
        path: []
    },
    78, {
        name: "Hot Cocoa Egg",
        world: 1,
        zone: 65,
        path: []
    },
    79, {
        name: "Ice Castle Egg",
        world: 1,
        zone: 66,
        path: []
    },
    80, {
        name: "Teddy Egg",
        world: 1,
        zone: 67,
        path: []
    },
    81, {
        name: "Firefly Egg",
        world: 1,
        zone: 68,
        path: []
    },
    82, {
        name: "Golden Brick Egg",
        world: 1,
        zone: 69,
        path: []
    },
    83, {
        name: "Cobblestone Egg",
        world: 1,
        zone: 70,
        path: []
    },
    84, {
        name: "Ruins Egg",
        world: 1,
        zone: 71,
        path: []
    },
    85, {
        name: "Runic Egg",
        world: 1,
        zone: 72,
        path: []
    },
    86, {
        name: "Wizard Egg",
        world: 1,
        zone: 73,
        path: []
    },
    87, {
        name: "Witch Egg",
        world: 1,
        zone: 74,
        path: []
    },
    88, {
        name: "Eerie Egg",
        world: 1,
        zone: 75,
        path: []
    },
    89, {
        name: "Abyssal Egg",
        world: 1,
        zone: 76,
        path: []
    },
    90, {
        name: "Cursed Egg",
        world: 1,
        zone: 77,
        path: []
    },
    91, {
        name: "Dungeon Egg",
        world: 1,
        zone: 78,
        path: []
    },
    92, {
        name: "Shadow Egg",
        world: 1,
        zone: 79,
        path: []
    },
    93, {
        name: "Treasure Egg",
        world: 1,
        zone: 80,
        path: []
    },
    94, {
        name: "Empyrean Egg",
        world: 1,
        zone: 81,
        path: []
    },
    95, {
        name: "Mythic Egg",
        world: 1,
        zone: 82,
        path: []
    },
    96, {
        name: "Cotton Candy Egg",
        world: 1,
        zone: 83,
        path: []
    },
    97, {
        name: "Gummy Egg",
        world: 1,
        zone: 84,
        path: []
    },
    98, {
        name: "Ice Cream Egg",
        world: 1,
        zone: 85,
        path: []
    },
    99, {
        name: "Sweets Egg",
        world: 1,
        zone: 86,
        path: []
    },
    100, {
        name: "Toy Egg",
        world: 1,
        zone: 87,
        path: []
    },
    101, {
        name: "Carnival Egg",
        world: 1,
        zone: 88,
        path: []
    },
    102, {
        name: "Hot Air Balloon Egg",
        world: 1,
        zone: 89,
        path: []
    },
    103, {
        name: "Cloud Egg",
        world: 1,
        zone: 90,
        path: []
    },
    104, {
        name: "Cloud Garden Egg",
        world: 1,
        zone: 91,
        path: []
    },
    105, {
        name: "Cloud Forest Egg",
        world: 1,
        zone: 92,
        path: []
    },
    106, {
        name: "Cloud House Egg",
        world: 1,
        zone: 93,
        path: []
    },
    107, {
        name: "Cloud Castle Egg",
        world: 1,
        zone: 94,
        path: []
    },
    108, {
        name: "Angel Egg",
        world: 1,
        zone: 95,
        path: []
    },
    109, {
        name: "Heaven Egg",
        world: 1,
        zone: 96,
        path: []
    },
    110, {
        name: "Heaven Castle Egg",
        world: 1,
        zone: 97,
        path: []
    },
    111, {
        name: "Colorful Cloud Egg",
        world: 1,
        zone: 98,
        path: []
    },
    112, {
        name: "Rainbow Egg",
        world: 1,
        zone: 99,
        path: []
    },
    113, {
        name: "Tech Circuit Egg",
        world: 2,
        zone: 100,
        path: []
    },
    114, {
        name: "Tech City Egg",
        world: 2,
        zone: 100,
        path: []
    },
    115, {
        name: "Tech Forest Egg",
        world: 2,
        zone: 100,
        path: []
    },
    116, {
        name: "Tech Silo Egg",
        world: 2,
        zone: 100,
        path: []
    },
    117, {
        name: "Tech Data Egg",
        world: 2,
        zone: 100,
        path: [
            {direction: "d", time: 380},
            {direction: "s", time: 1400}
        ]
    },
    118, {
        name: "Tech Cuboid Egg",
        world: 2,
        zone: 100,
        path: []
    },
    119, {
        name: "Tech Sprout Egg",
        world: 2,
        zone: 100,
        path: []
    },
    120, {
        name: "Tech Tree Egg",
        world: 2,
        zone: 100,
        path: []
    },
    121, {
        name: "Tech Incubator Egg",
        world: 2,
        zone: 100,
        path: []
    },
    122, {
        name: "Tech Overgrown Egg",
        world: 2,
        zone: 100,
        path: []
    },
    123, {
        name: "Tech Magna Egg",
        world: 2,
        zone: 100,
        path: []
    },
    124, {
        name: "Tech Oasis Egg",
        world: 2,
        zone: 100,
        path: []
    },
    125, {
        name: "Tech Palm Egg",
        world: 2,
        zone: 100,
        path: []
    },
    126, {
        name: "Tech Coral Egg",
        world: 2,
        zone: 100,
        path: []
    },
    127, {
        name: "Tech Ship Egg",
        world: 2,
        zone: 100,
        path: []
    },
    128, {
        name: "Tech Ruins Egg",
        world: 2,
        zone: 100,
        path: []
    },
    129, {
        name: "Tech Dusty Egg",
        world: 2,
        zone: 100,
        path: []
    },
    130, {
        name: "Tech Luminati Egg",
        world: 2,
        zone: 100,
        path: []
    },
    131, {
        name: "Tech Cactus Egg",
        world: 2,
        zone: 100,
        path: []
    },
    132, {
        name: "Tech Cowboy Egg",
        world: 2,
        zone: 100,
        path: []
    },
    133, {
        name: "Tech Canyon Egg",
        world: 2,
        zone: 100,
        path: []
    },
    134, {
        name: "Tech Snow Egg",
        world: 2,
        zone: 100,
        path: []
    },
    135, {
        name: "Tech Mossy Egg",
        world: 2,
        zone: 100,
        path: []
    },
    136, {
        name: "Tech Ice Crystal Egg",
        world: 2,
        zone: 100,
        path: []
    },
    137, {
        name: "Tech Flurry Egg",
        world: 2,
        zone: 100,
        path: []
    },
    138, {
        name: "Tech Ice Circuit Egg",
        world: 2,
        zone: 100,
        path: []
    },
    139, {
        name: "Tech Glacier Egg",
        world: 2,
        zone: 100,
        path: []
    },
    140, {
        name: "Tech Melted Egg",
        world: 2,
        zone: 100,
        path: []
    },
    141, {
        name: "Tech Nexus Egg",
        world: 2,
        zone: 100,
        path: []
    },
    142, {
        name: "Tech Nuclear Crack Egg",
        world: 2,
        zone: 100,
        path: []
    },
    143, {
        name: "Tech Nuclear Forest Egg",
        world: 2,
        zone: 100,
        path: []
    },
    144, {
        name: "Tech Nuclear Mine Egg",
        world: 2,
        zone: 100,
        path: []
    },
    145, {
        name: "Tech Nuclear Egg",
        world: 2,
        zone: 100,
        path: []
    },
    146, {
        name: "Tech Rocket Egg",
        world: 2,
        zone: 100,
        path: []
    },
    147, {
        name: "Tech Planets Egg",
        world: 2,
        zone: 100,
        path: []
    },
    148, {
        name: "Tech Moon Egg",
        world: 2,
        zone: 100,
        path: []
    },
    149, {
        name: "Tech Mars Egg",
        world: 2,
        zone: 100,
        path: []
    },
    150, {
        name: "Tech Saturn Egg",
        world: 2,
        zone: 100,
        path: []
    },
    151, {
        name: "Tech Comet Egg",
        world: 2,
        zone: 100,
        path: []
    },
    152, {
        name: "Tech Galaxy Egg",
        world: 2,
        zone: 100,
        path: []
    },
    153, {
        name: "Electric Garden Egg",
        world: 2,
        zone: 100,
        path: []
    },
    154, {
        name: "Electric City Egg",
        world: 2,
        zone: 100,
        path: []
    },
    155, {
        name: "Electric Forest Egg",
        world: 2,
        zone: 100,
        path: []
    },
    156, {
        name: "Electric Egg",
        world: 2,
        zone: 100,
        path: []
    },
    157, {
        name: "Tech Factory Egg",
        world: 2,
        zone: 100,
        path: []
    },
    158, {
        name: "Tech Robot Egg",
        world: 2,
        zone: 100,
        path: []
    },
    159, {
        name: "Tech Hive Egg",
        world: 2,
        zone: 100,
        path: []
    },
    160, {
        name: "Alien Garden Egg",
        world: 2,
        zone: 100,
        path: []
    },
    161, {
        name: "Alien Forest Egg",
        world: 2,
        zone: 100,
        path: []
    },
    162, {
        name: "Alien Lab Egg",
        world: 2,
        zone: 100,
        path: []
    },
    163, {
        name: "Alien UFO Egg",
        world: 2,
        zone: 100,
        path: []
    },
    164, {
        name: "Space Forge Egg",
        world: 2,
        zone: 100,
        path: []
    },
    165, {
        name: "Space Factory Egg",
        world: 2,
        zone: 100,
        path: []
    },
    166, {
        name: "Space Junkyard Egg",
        world: 2,
        zone: 100,
        path: []
    },
    167, {
        name: "Steampunk Gears Egg",
        world: 2,
        zone: 100,
        path: []
    },
    168, {
        name: "Steampunk Lantern Egg",
        world: 2,
        zone: 100,
        path: []
    },
    169, {
        name: "Steampunk Clockwork Egg",
        world: 2,
        zone: 100,
        path: []
    },
    170, {
        name: "Steampunk Airship Egg",
        world: 2,
        zone: 100,
        path: []
    },
    171, {
        name: "Motherboard Egg",
        world: 2,
        zone: 100,
        path: []
    },
    172, {
        name: "Aura Egg",
        world: 2,
        zone: 100,
        path: []
    },
    173, {
        name: "Wizard Ruins Egg",
        world: 2,
        zone: 100,
        path: []
    },
    174, {
        name: "Wizard Temple Egg",
        world: 2,
        zone: 100,
        path: []
    },
    175, {
        name: "Wizard Forest Egg",
        world: 2,
        zone: 100,
        path: []
    },
    176, {
        name: "Wizard Tower Egg",
        world: 2,
        zone: 100,
        path: []
    },
    177, {
        name: "Wizard Dungeon Egg",
        world: 2,
        zone: 100,
        path: []
    },
    178, {
        name: "Cyberpunk Undercity Egg",
        world: 2,
        zone: 100,
        path: []
    },
    179, {
        name: "Cyberpunk Industrial Egg",
        world: 2,
        zone: 100,
        path: []
    },
    180, {
        name: "Cyberpunk City Egg",
        world: 2,
        zone: 100,
        path: []
    },
    181, {
        name: "Cyberpunk Road Egg",
        world: 2,
        zone: 100,
        path: []
    },
    182, {
        name: "Tech Kyoto Egg",
        world: 2,
        zone: 100,
        path: []
    },
    183, {
        name: "Tech Samurai Egg",
        world: 2,
        zone: 100,
        path: []
    },
    184, {
        name: "Tech Dojo Egg",
        world: 2,
        zone: 100,
        path: []
    },
    185, {
        name: "Tech Sakura Egg",
        world: 2,
        zone: 100,
        path: []
    },
    186, {
        name: "Dominus Rex Egg",
        world: 2,
        zone: 100,
        path: []
    },
    187, {
        name: "Dominus Frigidus Egg",
        world: 2,
        zone: 100,
        path: []
    },
    188, {
        name: "Dominus Infernus Egg",
        world: 2,
        zone: 100,
        path: []
    },
    189, {
        name: "Holographic Pipe Egg",
        world: 2,
        zone: 100,
        path: []
    },
    190, {
        name: "Holographic Egg",
        world: 2,
        zone: 100,
        path: []
    },
    191, {
        name: "Holographic Tree Egg",
        world: 2,
        zone: 100078,
        path: []
    },
    192, {
        name: "Holographic Crystal Egg",
        world: 2,
        zone: 100,
        path: []
    },
    193, {
        name: "Dark Tech Stone Egg",
        world: 2,
        zone: 100,
        path: []
    },
    194, {
        name: "Dark Tech Relic Egg",
        world: 2,
        zone: 100,
        path: []
    },
    195, {
        name: "Dark Tech Castle Egg",
        world: 2,
        zone: 100,
        path: []
    },
    196, {
        name: "Dark Tech Brick Egg",
        world: 2,
        zone: 100,
        path: []
    },
    197, {
        name: "Dark Tech Spike Egg",
        world: 2,
        zone: 100,
        path: []
    },
    198, {
        name: "Hacker Metal Egg",
        world: 2,
        zone: 100,
        path: []
    },
    199, {
        name: "Hacker Gear Egg",
        world: 2,
        zone: 100,
        path: []
    },
    200, {
        name: "Hacker Matrix Egg",
        world: 2,
        zone: 100,
        path: []
    },
    201, {
        name: "Hacker Error Egg",
        world: 2,
        zone: 100,
        path: []
    },
    202, {
        name: "Glitch Tree Egg",
        world: 2,
        zone: 100,
        path: []
    },
    203, {
        name: "Glitch Green Egg",
        world: 2,
        zone: 100,
        path: []
    },
    204, {
        name: "Glitch Aqua Egg",
        world: 2,
        zone: 100,
        path: []
    },
    205, {
        name: "Glitch Cyan Egg",
        world: 2,
        zone: 100,
        path: []
    },
    206, {
        name: "Quantum Egg",
        world: 2,
        zone: 100,
        path: []
    },
    207, {
        name: "Quantum Leafy Egg",
        world: 2,
        zone: 100,
        path: []
    },
    208, {
        name: "Quantum Space Egg",
        world: 2,
        zone: 100,
        path: []
    },
    209, {
        name: "Quantum Galaxy Egg",
        world: 2,
        zone: 100,
        path: []
    },
    210, {
        name: "Void Crystal Egg",
        world: 2,
        zone: 100,
        path: []
    },
    211, {
        name: "Void Fracture Egg",
        world: 2,
        zone: 100,
        path: []
    },
    212, {
        name: "Void Spiral Egg",
        world: 2,
        zone: 100,
        path: [
            {direction: "a", time: 1175},
            {direction: "s", time: 3075}
        ]
    },
    213, {
        name: "Rusty Egg",
        world: 3,
        zone: 200,
        path: [
            {direction: "s", time: 225},
            {direction: "a", time: 1025}
        ]
    },
    214, {
        name: "Striped Egg",
        world: 3,
        zone: 200,
        path: []
    },
    215, {
        name: "Cinderblocks Egg",
        world: 3,
        zone: 200,
        path: []
    },
    216, {
        name: "Lootbag Egg",
        world: 3,
        zone: 200,
        path: [
            {direction: "w", time: 225},
            {direction: "a", time: 1025}
        ]
    },
    217, {
        name: "Summer Beach Egg",
        world: 3,
        zone: 205,
        path: []
    },
    218, {
        name: "Summer Floatie Egg",
        world: 3,
        zone: 206,
        path: []
    },
    219, {
        name: "Summer Melon Egg",
        world: 3,
        zone: 207,
        path: []
    },
    220, {
        name: "Summer Beachball Egg",
        world: 3,
        zone: 208,
        path: []
    },
    221, {
        name: "Summer Sun Egg",
        world: 3,
        zone: 209,
        path: [
            {direction: "a", time: 1500}
        ]
    },
    222, {
        name: "Hacker Circuit Egg",
        world: 3,
        zone: 210,
        path: []
    },
    223, {
        name: "Hacker Wireframe Egg",
        world: 3,
        zone: 211,
        path: []
    },
    224, {
        name: "Hacker Crystal Egg",
        world: 3,
        zone: 212,
        path: []
    },
    225, {
        name: "Hacker Electric Egg",
        world: 3,
        zone: 213,
        path: []
    },
    226, {
        name: "Hacker Secure Egg",
        world: 3,
        zone: 214,
        path: [
            {direction: "w", time: 1500},
            {direction: "d", time: 700}
        ]
    },
    227, {
        name: "Growing Egg",
        world: 3,
        zone: 215,
        path: []
    },
    228, {
        name: "Sturdy Egg",
        world: 3,
        zone: 216,
        path: []
    },
    229, {
        name: "Established Egg",
        world: 3,
        zone: 217,
        path: []
    },
    230, {
        name: "Elegant Egg",
        world: 3,
        zone: 218,
        path: []
    },
    231, {
        name: "Luxe Egg",
        world: 3,
        zone: 219,
        path: []
    },
    232, {
        name: "Sakura Blossom Egg",
        world: 3,
        zone: 220,
        path: []
    },
    233, {
        name: "Dream Egg",
        world: 3,
        zone: 221,
        path: []
    },
    234, {
        name: "Moonlight Egg",
        world: 3,
        zone: 222,
        path: []
    },
    235, {
        name: "Strawberry Egg",
        world: 3,
        zone: 223,
        path: []
    },
    236, {
        name: "Kawaii Egg",
        world: 3,
        zone: 224,
        path: [
            {direction: "w", time: 700},
            {direction: "d", time: 1000}
        ]
    },
    237, {
        name: "Grass Type Egg",
        world: 3,
        zone: 225,
        path: []
    },
    238, {
        name: "Rock Type Egg",
        world: 3,
        zone: 226,
        path: []
    },
    239, {
        name: "Water Type Egg",
        world: 3,
        zone: 227,
        path: []
    },
    240, {
        name: "Electric Type Egg",
        world: 3,
        zone: 228,
        path: []
    },
    241, {
        name: "Fire Type Egg",
        world: 3,
        zone: 229,
        path: [
            {direction: "w", time: 750},
            {direction: "d", time: 1100}
        ]
    },
    242, {
        name: "Elysium Egg",
        world: 3,
        zone: 230,
        path: []
    },
    243, {
        name: "Paradise Egg",
        world: 3,
        zone: 231,
        path: []
    },
    244, {
        name: "Lost Library Egg",
        world: 3,
        zone: 232,
        path: []
    },
    245, {
        name: "Nebula Egg",
        world: 3,
        zone: 233,
        path: []
    },
    246, {
        name: "Colosseum Egg",
        world: 3,
        zone: 234,
        path: [
            {direction: "w", time: 825},
            {direction: "d", time: 900}
        ]
    },
    247, {
        name: "Meadow Egg",
        world: 3,
        zone: 235,
        path: []
    },
    248, {
        name: "Safari Egg",
        world: 3,
        zone: 236,
        path: []
    },
    249, {
        name: "Fairyland Egg",
        world: 3,
        zone: 237,
        path: []
    },
    250, {
        name: "Cave Egg",
        world: 3,
        zone: 238,
        path: []
    },
    251, {
        name: "Oasis Egg",
        world: 3,
        zone: 239,
        path: [
            {direction: "w", time: 825},
            {direction: "d", time: 900}
        ]
      }    
)
