#Requires AutoHotkey v2.0

SUPERCOMPUTER_IMAGES := A_ScriptDir "\Images\Supercomputer\"
SUPERCOMPUTER_BUTTON_SEARCH_AREA := {x1: 64, y1: 173, x2: 754, y2: 505}

travelToSupercomputer() {
    setCurrentAction("Moving To Supercomputer")

    zone := SUPERCOMPUTER_MAP[WORLD].zone

    ; Player is already using the Supercomputer!
    if getCurrentArea() = "Supercomputer!" {
        pathAway := SUPERCOMPUTER_MAP[WORLD].pathAway
        for index, movement in pathAway {
            moveDirection(movement.direction, movement.time)
        }
        
        pathBack := SUPERCOMPUTER_MAP[WORLD].pathBack
        for index, movement in pathBack {
            moveDirection(movement.direction, movement.time)
        }
    }

    ; Player must travel to the Supercomputer!
    else {
        path := SUPERCOMPUTER_MAP[WORLD].path

        switch zone {
            case 100:
                interimZone := zone + 1
                teleportToZone(interimZone)
                teleportToZone(zone)
            case "Void":
                teleportToZone(200)
                teleportToWorld(3)
            default:
        }
        
        clickHoverboard(true)
        stabiliseHoverboard(path[1].direction)
        for index, movement in path {
            moveDirection(movement.direction, movement.time * SHINY_HOVERBOARD_MODIFIER)
        }
        clickHoverboard(false)
    }

    setCurrentArea("Supercomputer!")
    setCurrentAction("-")
}

findAndClickSupercomputerButton(machine) {

    imageMap := Map(
        "Gold Machine", {image: "GoldMachine.bmp"},
        "Rainbow Machine", {image: "RainbowPets.bmp"},
        "Upgrade Potions Machine", {image: "UpgradePotions.bmp"},
        "Upgrade Enchants Machine", {image: "UpgradeEnchants.bmp"}
    )

    filePath := SUPERCOMPUTER_IMAGES imageMap[machine].image  ; Construct the file path for each image.

    if not FileExist(filePath)
        return false

    search := SUPERCOMPUTER_BUTTON_SEARCH_AREA

    Loop 5 {
        moveMouseToCentreOfScreen()
        Sleep 100
        activateMouseHover()
        scrollMouseWheel("{WheelUp}", 4)
        Sleep 100
        Loop 4 {
            if ImageSearch(&x, &y, search.x1, search.y1, search.x2, search.y2, " *10 " filePath) {
                MouseMove x, y
                activateMouseHover()
                SendEvent "{Click, " x ", " y ", 1}"
                Sleep 100
                break 2
            }
            moveMouseToCentreOfScreen()
            scrollMouseWheel("{WheelDown}")
            Sleep 100
        }
    }
}
