#Requires AutoHotkey v2.0

goToVipArea() {
    if getCurrentArea() == "VIP"
        return

    goToVoid()
    clickAutoFarmButton()
    moveToVipArea()
    clickAutoFarmButton()

    if vipUseFlagSetting.Value {
        keybind := getKeybind("Diamonds Flag")
        SendEvent keybind
    }
    if vipUseSprinklerSetting.Value {
        keybind := getKeybind("Sprinkler")
        SendEvent keybind
    }
}

moveToVipArea() {

    setCurrentArea("VIP")
    setCurrentAction("Moving To VIP")
    writeToLogFile("  Moving to the VIP Area")
    
    zone := VIP_MAP[WORLD].zone
    path := VIP_MAP[WORLD].path    

    switch zone {
        case 1, 100:
            interimZone := zone + 1
        case "Void":
            interimZone := 200
        default:
    }
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