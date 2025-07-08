#Requires AutoHotkey v2.0

; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; TELEPORT FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

class Teleport {
    static ICON_AREA := {x1: 14, y1: 118, x2: 128, y2: 421}
    static TELEPORT_BUTTON := A_ScriptDir "\Images\Buttons\Teleport.bmp"
    static MAX_TRIES := 10

    static teleportToZone(zone) {


        this.closeAllWindows()
        this.open()
        this.clickTeleportSearchBox()

        switch zone {
            case "Void":
                this.teleportToWorld(4)
                return true
            default:
                this.enterTeleportSearchTerm(zone)
                buttonOffset := ZONE_MAP[zone].Has("buttonOffset") ? ZONE_MAP[zone].Get("buttonOffset") : 0

                if this.isDestinationBlue(buttonOffset) {
                    this.closeTeleportMenu()
                    return false
                } else {
                    this.clickTeleportButton(zone, buttonOffset)
                    this.closeAllWindows()
                    return true
                }
        }
    }

    static teleportToEggZone(zone) {
        if !this.teleportToZone(zone) {
            this.teleportToZone(SECOND_BEST_ZONE)
            this.teleportToZone(zone)
        }
    }

    static open() {
        a := this.ICON_AREA
        image := "*5 " this.TELEPORT_BUTTON

        Loop this.MAX_TRIES {
            if this.isTeleportMenuOpen()
                return            
            if ImageSearch(&x, &y, a.x1, a.y1, a.x2, a.y2, image)
                SendEvent "{Click, " x ", " y ", 1}"
            Sleep 100
        }
    }

    static clickTeleportMenuIcon() {
        button := [66, 108]
        Loop 100 {
            SendEvent "{Click, " button[1] ", " button[2] ", 1}"
            Sleep 50
            Loop 25 {
                if this.isTeleportMenuOpen()
                    return
                Sleep 50
            }
        }
    }

    static clickTeleportSearchBox() {
        button := [600, 107]
        closeLeaderboard()

        Loop 100 {
            SendEvent "{Click, " button[1] ", " button[2] ", 1}"
            Sleep 50
            Loop 25 {
                if this.isTeleportSearchBoxSelected()
                    return
                Sleep 50
            }
        }
    }

    static enterTeleportSearchTerm(zone) {
        SendText ZONE_MAP[zone].Get("zoneName")
        Loop 100 {
            if this.isTeleportSearchTermEntered()
                return
            Sleep 50
        }
    }

    static clickTeleportButton(zone, buttonOffset) {
        button := [341, 222]
        Loop 100 {
            SendEvent "{Click, " button[1] + Random(-2, -2) ", " button[2] + Random(2, 2) ", 1}"
            Sleep 50
            if !this.isTeleportMenuOpen()
                break
            Sleep 50
        }

        this.open()
        this.clickTeleportSearchBox()
        this.enterTeleportSearchTerm(zone)

        Loop 300 {
            if this.isDestinationBlue(buttonOffset)
                break
            Sleep 50
        }

        this.closeTeleportMenu()
    }

    static closeTeleportMenu() {
        if this.isTeleportMenuOpen() {
            button := [746, 109]
            SendEvent "{Click, " button[1] ", " button[2] ", 1}"
            Sleep 50
            Loop 100 {
                if !this.isTeleportMenuOpen()
                    break
                Sleep 50
            }
        }
    }

    static closeAllWindows() {
        closeLeaderboard()

        X_SEARCH_AREA := [430, 90, 785, 130, "0xff155e"]

        if PixelSearch(&x, &y, X_SEARCH_AREA*) {
            SendEvent "{Click, " x ", " y ", 1}"
            Sleep 100
        }        
    }

    static isTeleportMenuOpen() {
        area := [66, 108, 66, 108, "0xd81140"]
        return PixelSearch(&X, &Y, area*)
    }

    static isTeleportSearchBoxSelected() {
        area := [610, 117, 630, 117, "0xafafaf"]
        return PixelSearch(&X, &Y, area*)
    }

    static isTeleportSearchTermEntered() {
        area := [676, 100, 685, 115, "0x1e1e1e"]
        return PixelSearch(&X, &Y, area*)
    }

    static isDestinationBlue(buttonOffset) {
        area := [348 + buttonOffset, 180, 448 + buttonOffset, 280, "0x80f9fa"]
        return PixelSearch(&X, &Y, area*)
    }

    static isDestinationWhite() {
        area := [353, 165, 353, 165, "0xfefefe"]
        return PixelSearch(&X, &Y, area*)
    }

    static isTeleportWorldConfirmationOpen() {
        area := [187, 126, 187, 126, "0x53e3ff"]
        return PixelSearch(&X, &Y, area*)
    }

    static isTeleportControlVisible() {
        a := this.ICON_AREA
        image := "*5 " this.TELEPORT_BUTTON
        return ImageSearch(&x, &y, a.x1, a.y1, a.x2, a.y2, image)
    }

    static isSkipButtonShown() {
        area := [365, 575, 365, 575, "0xfd9e42"]
        return PixelSearch(&X, &Y, area*)
    }

    static getWorld() {
        worldSpawns := [15, 100, 200]
        world := -1

        Loop 10 {
            this.open()

            Loop 3 {
                this.clickTeleportMenuIcon()
                this.clickTeleportSearchBox()
                this.enterTeleportSearchTerm(worldSpawns[A_Index])

                if !this.isDestinationWhite() {
                    this.closeTeleportMenu()
                    world := A_Index
                    break
                }
            }

            if world != -1 {
                this.closeTeleportMenu()
                return world
            }
        }

        return world
    }

    static teleportToWorld(world) {
        this.open()

        buttons := Map(
            1, [22, 225],
            2, [22, 275],
            3, [22, 325],
            4, [26, 376],
        )

        SendEvent "{Click, " buttons[world][1] ", " buttons[world][2] ", 1}"
        Loop {
            Sleep 10
            if !this.isTeleportMenuOpen()
                break
        }

        confirmButton := [291, 422]
        Loop 100 {
            if this.isTeleportWorldConfirmationOpen() {
                SendEvent "{Click, " confirmButton[1] ", " confirmButton[2] ", 1}"
                break
            }
            Sleep 10
        }

        Loop 100 {
            if !this.isTeleportControlVisible()
                break
            Sleep 10
        }

        skipButton := [365, 575]
        Loop 100 {
            if this.isTeleportControlVisible()
                break
            if this.isSkipButtonShown()
                SendEvent "{Click, " skipButton[1] ", " skipButton[2] ", 1}"
            Sleep 100
        }
    }
}