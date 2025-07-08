#Requires AutoHotkey v2.0

MACHINE_MAP := Map(
    "Gold Machine", {
        world: 1,
        zone: 10,
        path: [
            {direction: "a", time: 200},
            {direction: "s", time: 1550}
        ]
    },
    "Upgrade Potions Machine", {
        world: 1,
        zone: 13,
        path: [
            {direction: "w", time: 675},
            {direction: "d", time: 875}
        ]
    },
    "Upgrade Enchants Machine", {
        world: 1,
        zone: 16,
        path: [
            {direction: "d", time: 1000},
            {direction: "w", time: 950}
        ]
    },    
    "Rainbow Machine", {
        world: 1,
        zone: 31,
        path: [
            {direction: "s", time: 275},
            {direction: "d", time: 2250}
        ]
    },      
)