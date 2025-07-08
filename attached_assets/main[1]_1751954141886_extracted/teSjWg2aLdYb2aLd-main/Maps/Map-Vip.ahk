#Requires AutoHotkey v2.0

VIP_MAP := Map(
    1, {
        world: 1,
        zone: 1,
        path: [
            {direction: "w", time: 550},
            {direction: "a", time: 1900},
            {direction: "s", time: 500},
            {direction: "a", time: 800},
            {direction: "w", time: 500},
            {direction: "a", time: 3000},
        ],         
    },
    2, {
        world: 2,
        zone: 100,
        path: [
            {direction: "a", time: 3300},
            {direction: "w", time: 625},
            {direction: "a", time: 2625},
        ],        
    },    
    3, {
        world: 3,
        zone: "Void",
        path: [
            {direction: "s", time: 600},
            {direction: "d", time: 4050}
        ],
    },             
)