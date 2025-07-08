#Requires AutoHotkey v2.0

; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; TELEPORT FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

teleportToZone(zone) {

    setCurrentAction("Teleporting to Zone: " zone)
    writeToLogFile("  Teleporting to Zone: " zone)
    setCurrentArea("-")
    setCurrentZone(zone)

    activateRoblox()

    closeAllWindows()
    openTeleportMenu()
    closeLeaderboard()
    clickTeleportSearchBox()

    switch zone {
        case "Void":
            teleportToWorld(3)

        default:
            enterTeleportSearchTerm(zone)
            buttonOffset := HasProp(ZONE_MAP[zone], "buttonOffset") ? ZONE_MAP[zone].buttonOffset : 0
        
            if isDestinationBlue(buttonOffset)
                closeTeleportMenu()
            else {
                clickTeleportButton(zone, buttonOffset)
                closeAllWindows()
                Sleep 1000
            }
    }

}

teleportToBestZone() {
    teleportToZone(SECOND_BEST_ZONE)
    teleportToZone(BEST_ZONE)
}

openTeleportMenu() {
    if isTeleportMenuOpen()
        return

    button := [110, 190]

    Loop 100 {
        SendEvent "{Click, " button[1] ", " button[2] ", 1}"
        Sleep 50
        Loop 25 {
            if isTeleportMenuOpen()
                return
            Sleep 50
        }
    }
}

clickTeleportMenuIcon() {
    button := [66, 108]

    Loop 100 {
        SendEvent "{Click, " button[1] ", " button[2] ", 1}"
        Sleep 50
        Loop 25 {
            if isTeleportMenuOpen()
                return
            Sleep 50
        }
    }
}

clickTeleportSearchBox() {
    button := [600, 107]

    closeLeaderboard()

    Loop 100 {
        SendEvent "{Click, " button[1] ", " button[2] ", 1}"
        Sleep 50
        Loop 25 {
            if isTeleportSearchBoxSelected()
                return
            Sleep 50
        }
    }
}

enterTeleportSearchTerm(zone) {
    SendText ZONE_MAP[zone].Name

    Loop 100 {
        if isTeleportSearchTermEntered() 
            return
        Sleep 100
    }
}

clickTeleportButton(zone, buttonOffset) {
    button := [392 + buttonOffset, 196]

    Loop 10 {
        SendEvent "{Click, " button[1] + Random(-2, -2) ", " button[2] + Random(2, 2) ", 1}"
        Sleep 50
        if !isTeleportMenuOpen()
            break
        Sleep 950
    }

    openTeleportMenu()
    clickTeleportSearchBox()
    enterTeleportSearchTerm(zone)
    
    Loop 30 {
        if isDestinationBlue(buttonOffset)
            break
        Sleep 1000
    }

    closeTeleportMenu()
    Sleep 1000
}

closeTeleportMenu() {
    if isTeleportMenuOpen() {
        button := [746, 109]
        SendEvent "{Click, " button[1] ", " button[2] ", 1}"
        Sleep 50
        Loop 100 {
            if !isTeleportMenuOpen()
                break
            Sleep 50
        }
    }
}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; PIXEL CHECKS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

isTeleportMenuOpen() {
    pixel := [66, 108]
    colour := "0xd81140"
    return PixelSearch(&X, &Y, pixel[1], pixel[2], pixel[1], pixel[2], colour, 2)
}

isTeleportSearchBoxSelected() {
    pixel := [610, 117, 630, 117]
    colour := "0xafafaf"
    return PixelSearch(&X, &Y, pixel[1], pixel[2], pixel[3], pixel[4], colour, 2)
}

isTeleportSearchTermEntered() {
    pixel := [676, 100, 685, 115]
    colour := "0x1e1e1e"
    return PixelSearch(&X, &Y, pixel[1], pixel[2], pixel[3], pixel[4], colour, 2)    
}

isDestinationBlue(buttonOffset) {
    pixel := [353 + buttonOffset, 165]
    colour := "0x80f9fa"
    return PixelSearch(&X, &Y, pixel[1], pixel[2], pixel[1], pixel[2], colour, 2)
}

isDestinationWhite() {
    pixel := [353, 165]
    colour := "0xfefefe"
    return PixelSearch(&X, &Y, pixel[1], pixel[2], pixel[1], pixel[2], colour, 2)
}

isTeleportWorldConfirmationOpen() {
    pixel := [187, 126]
    colour := "0x53e3ff"
    return PixelSearch(&X, &Y, pixel[1], pixel[2], pixel[1], pixel[2], colour, 2)    
}

isTeleportControlVisible() {
    pixel := [109, 190]
    colour := "0xc80a2f"
    return PixelSearch(&X, &Y, pixel[1], pixel[2], pixel[1], pixel[2], colour, 2)  
}

isSkipButtonShown() {
    pixel := [365, 575]
    colour := "0xfd9e42"
    return PixelSearch(&X, &Y, pixel[1], pixel[2], pixel[1], pixel[2], colour, 2)  
}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; WORLD FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰


getWorld() {
    worldSpawns := [15, 100, 200]
    world := -1

    Loop 10 {
        openTeleportMenu()

        Loop 3 {
            clickTeleportMenuIcon()
            clickTeleportSearchBox()
            enterTeleportSearchTerm(worldSpawns[A_Index])

            if !isDestinationWhite() {
                world := A_Index
                break
            }
        }

        if world != -1 {
            closeTeleportMenu()
            return world
        }
    }

    return world
}

teleportToWorld(world) {
    openTeleportMenu()

    buttons := Map(
        1, [22, 238],
        2, [22, 284],
        3, [22, 328]
    )

    SendEvent "{Click, " buttons[world][1] ", " buttons[world][2] ", 1}"
    Loop {
        Sleep 10
        if !isTeleportMenuOpen()
            break
    }
    
    button := [291, 422]
    Loop 100 {
        if isTeleportWorldConfirmationOpen() {
            SendEvent "{Click, " button[1] ", " button[2] ", 1}"
            break
        }
        Sleep 10
    }

    Loop 100 {
        if !isTeleportControlVisible()
            break
        Sleep 10
    }

    button := [365, 575]
    Loop {
        if isTeleportControlVisible()
            break
        if isSkipButtonShown()
            SendEvent "{Click, " button[1] ", " button[2] ", 1}"
        Sleep 100
    }
}
