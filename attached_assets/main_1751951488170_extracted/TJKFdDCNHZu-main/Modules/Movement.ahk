#Requires AutoHotkey v2.0

moveToBestEgg() {
    equipHoverboard()
    moveToEgg(BEST_ZONE)
}

farmBestZone(hatchEggs) {
    if hatchEggs
        moveIntoZone(BEST_ZONE)
    else {
        equipHoverboard()
        moveToCentreOfZone(BEST_ZONE)
    }
        
    unequipHoverboard()
}

moveToCentreOfZone(zoneNumber) {
    pathToCentre := ZONE_MAP.Get(zoneNumber).Get("pathToCentre")
    for movement in pathToCentre {
        key := movement[1]
        milliseconds := movement[2]
        
        moveDirection(key, milliseconds)
    }
}

moveToEgg(zoneNumber) {
    pathToEgg := ZONE_MAP.Get(zoneNumber).Get("pathToEgg")

    for movement in pathToEgg {
        key := movement[1]
        milliseconds := movement[2]
        
        if A_Index := 2
            enableAutoFarm()

        moveDirection(key, milliseconds)
    }
}

moveIntoZone(zoneNumber) {
    pathIntoZone := ZONE_MAP.Get(zoneNumber).Get("pathIntoZone")
    for movement in pathIntoZone {
        key := movement[1]
        milliseconds := movement[2]
        
        moveDirection(key, milliseconds)
    }
}

moveAwayFromEgg() {
    equipHoverboard()
    pathToStopHatching := ZONE_MAP.Get(BEST_ZONE).Get("pathAwayFromEgg")
    for movement in pathToStopHatching {
        key := movement[1]
        milliseconds := movement[2]
        moveDirection(key, milliseconds)
    }    
}

moveBackToEgg() {
    pathToStopHatching := ZONE_MAP.Get(BEST_ZONE).Get("pathBackToEgg")
    for movement in pathToStopHatching {
        key := movement[1]
        milliseconds := movement[2]
        moveDirection(key, milliseconds)
    }    
}

moveDirection(key, milliseconds) {
    Send "{" key " down}"  ; Send the key down event to initiate movement.
    Sleep milliseconds  ; Wait for the specified duration to continue movement.
    Send "{" key " up}"  ; Send the key up event to stop movement.
    Sleep 1000
}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; HOVERBOARD FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

equipHoverboard() {
    SendEvent "{q}"
    Sleep 2500
}

unequipHoverboard() {
    SendEvent "{q}"
    Sleep 500
}

stabaliseHoverboard(direction) {
    Loop 3 {
        moveDirection(direction, 10)
        Sleep 10 
    }
    Sleep 2000
}