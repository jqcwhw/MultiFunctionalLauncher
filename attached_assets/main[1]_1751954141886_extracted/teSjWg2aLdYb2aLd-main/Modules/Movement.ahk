#Requires AutoHotkey v2.0

; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; MOVEMENT/PATHS CONFIGURATION FILE
; ----------------------------------------------------------------------------------------
; This file contains all of the character movement paths to various areas within the game.
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; GLOBAL VARIABLES
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

SHINY_HOVERBOARD_MODIFIER := 1

DIRECTION_MAP := Map()
DIRECTION_MAP.Default := ""  ; Set default value to an empty string.
DIRECTION_MAP["Up"] := "W"  ; Map key for moving up.
DIRECTION_MAP["Down"] := "S"  ; Map key for moving down.
DIRECTION_MAP["Left"] := "A"  ; Map key for moving left.
DIRECTION_MAP["Right"] := "D"  ; Map key for moving right.
DIRECTION_MAP["UpRight"] := ["D", "W"]  ; Map keys for moving up-right.
DIRECTION_MAP["UpLeft"] := ["A", "W"]  ; Map keys for moving up-left.
DIRECTION_MAP["DownRight"] := ["D", "S"]  ; Map keys for moving down-right.
DIRECTION_MAP["DownLeft"] := ["A", "S"]  ; Map keys for moving down-left.


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; MOVEMENT VARIABLES
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

moveToZoneCentre(zone) {
    setCurrentAction("Moving To Centre Of Zone")
    
    clickHoverboard(true)
    stabiliseHoverboard(ZONE_MAP[zone].pathToCentre[1].direction)
    for index, movement in ZONE_MAP[zone].pathToCentre {
        direction := movement.direction
        time := movement.time * SHINY_HOVERBOARD_MODIFIER
        moveDirection(direction, time)
    }    
    clickHoverboard(false)
    
    setCurrentAction("-")
}


moveToBestEgg() {
    setCurrentArea("Best Egg")
    setCurrentAction("Moving To Best Egg")
    writeToLogFile("  Moving to the Best Egg")
    
    zone := EGG_MAP[BEST_EGG].zone
    path := EGG_MAP[BEST_EGG].path
    interimZone := getInterimZone(zone)

    teleportToZone(interimZone)
    teleportToZone(zone)

    clickHoverboard(true)
    stabiliseHoverboard(path[1].direction)
    for index, movement in path {
        moveDirection(movement.direction, movement.time * SHINY_HOVERBOARD_MODIFIER)
    }
    clickHoverboard(false)

    setCurrentAction("-")
}

getInterimZone(zone) {
    switch zone {
        case 1, 100:
            return zone + 1
        case 200:
            return "Void"
        case "Void":
            return 200
        default:
            return zone - 1
    }
}

moveToRareEgg() {
    setCurrentArea("Rare Egg")
    setCurrentAction("Moving To Rare Egg")
    writeToLogFile("  Moving to the Rare Egg")
    
    zone := EGG_MAP[RARE_EGG].zone
    path := EGG_MAP[RARE_EGG].path
    interimZone := getInterimZone(zone)

    teleportToZone(interimZone)
    teleportToZone(zone)
    
    clickHoverboard(true)
    stabiliseHoverboard(path[1].direction)
    for index, movement in path {
        moveDirection(movement.direction, movement.time * SHINY_HOVERBOARD_MODIFIER)
    }
    clickHoverboard(false)

    setCurrentAction("-")
}




moveAwayFromTheSupercomputer() {
    setCurrentArea("Supercomputer!")    
    setCurrentAction("Moving Away From the Supercomputer!")

    moveDirection(DIRECTION_MAP["Left"], 2000)

    setCurrentAction("-")
}

moveBackToTheSupercomputer() {
    setCurrentAction("Moving Back To the Supercomputer!")

    moveDirection(DIRECTION_MAP["Right"], 2000)

    setCurrentAction("-")  
}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; MOVEMENT FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

stabiliseHoverboard(moveKey) {
    Loop 3 {
        moveDirection(moveKey, 10)
    }
    Sleep 1000  ; Wait for 1000 milliseconds to stabilize the hoverboard.
}

moveDirection(moveKey, timeMs) {
    if IsObject(moveKey)
        Send "{" moveKey[1] " down}{" moveKey[2] " down}"
    else
        Send "{" moveKey " down}"  ; Send the key down event for the specified movement key.

    Sleep timeMs  ; Wait for the specified duration in milliseconds.

    if IsObject(moveKey)
        Send "{" moveKey[1] " up}{" moveKey[2] " up}"
    else
        Send "{" moveKey " up}"  ; Send the key down event for the specified movement key.    
}