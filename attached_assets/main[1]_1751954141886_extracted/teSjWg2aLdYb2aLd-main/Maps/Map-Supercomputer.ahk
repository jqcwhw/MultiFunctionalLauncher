#Requires AutoHotkey v2.0

SUPERCOMPUTER_MAP := Map(
    2, {
        world: 2,
        zone: 100,
        path: [
            {direction: "w", time: 500},
            {direction: "a", time: 2800}
        ],
        pathAway: [
            {direction: "d", time: 500}
        ],
        pathBack: [
            {direction: "a", time: 500}
        ]            
    },
    3, {
        world: 3,
        zone: "Void",
        path: [
            {direction: "d", time: 800}
        ],
        pathAway: [
            {direction: "a", time: 500}
        ],
        pathBack: [
            {direction: "d", time: 500}
        ]   
    },             
)