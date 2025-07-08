#Requires AutoHotkey v2.0

; Image search areas.
HATCH_SETTINGS_BUTTON_SEARCH_AREA := [18, 160, 128, 336]

; Pixel search areas.
AUTO_HATCH_TOGGLE_SEARCH_AREA := [447, 169, 596, 217]
CHARGED_EGGS_TOGGLE_SEARCH_AREA := [447, 274, 596, 319]
GOLDEN_EGGS_TOGGLE_SEARCH_AREA := [447, 337, 596, 423]
HATCH_SETTINGS_MENU_ICON := [163, 120]

; Click locations.
AUTO_HATCH_OFF_BUTTON := [477, 192]
CHARGED_EGGS_OFF_BUTTON := [477, 294]
CHARGED_EGGS_ON_BUTTON := [561, 294]
GOLDEN_EGGS_OFF_BUTTON := [477, 396]
GOLDEN_EGGS_ON_BUTTON := [561, 396]
HATCH_SETTINGS_CLOSE_BUTTON := [605, 109]

applyAutoHatchSettings(clientId) {
    activateWindow(clientId)
    openHatchSettingsMenu()
    applyAutoHatchSetting()
    applyChargedEggsSetting(clientId)
    applyGoldenEggsSetting(clientId)
    closeHatchSettingsMenu()
}

openHatchSettingsMenu() {

    button := [104, 246]

    Loop 100 {
        SendEvent "{Click, " button[1] ", " button[2] ", 1}"
        Loop 25 {
            Sleep 10
            if isHatchSettingsMenuOpen()
                return
        }
    }

}

applyAutoHatchSetting() {
    if isAutoHatchOn()
        return

    button := AUTO_HATCH_OFF_BUTTON
    SendEvent "{Click, " button[1] ", " button[2] ", 1}" 
}

isAutoHatchOn() {
    area := AUTO_HATCH_TOGGLE_SEARCH_AREA
    colour := "0x70f308"
    return PixelSearch(&X, &Y, area[1], area[2], area[3], area[4], colour, 2)    
}

applyChargedEggsSetting(clientId) {
    turnOnChargedEggs := CLIENT_MAP[clientId]["charged"]
    isSettingOn := isChargedEggsOn()

    if (turnOnChargedEggs AND isSettingOn) OR (!turnOnChargedEggs AND !isSettingOn)
        return

    if turnOnChargedEggs
        button := CHARGED_EGGS_OFF_BUTTON
    else
        button := CHARGED_EGGS_ON_BUTTON

    SendEvent "{Click, " button[1] ", " button[2] ", 1}" 
}

isChargedEggsOn() {
    area := CHARGED_EGGS_TOGGLE_SEARCH_AREA
    colour := "0x70f308"
    return PixelSearch(&X, &Y, area[1], area[2], area[3], area[4], colour, 2)   
}

applyGoldenEggsSetting(clientId) {
    turnOnGoldenEggs := CLIENT_MAP[clientId]["golden"]
    isSettingOn := isGoldenEggsOn()

    if (turnOnGoldenEggs AND isSettingOn) OR (!turnOnGoldenEggs AND !isSettingOn)
        return

    if turnOnGoldenEggs
        button := GOLDEN_EGGS_OFF_BUTTON
    else
        button := GOLDEN_EGGS_ON_BUTTON

    SendEvent "{Click, " button[1] ", " button[2] ", 1}" 
}

isGoldenEggsOn() {
    area := GOLDEN_EGGS_TOGGLE_SEARCH_AREA
    colour := "0x70f308"
    return PixelSearch(&X, &Y, area[1], area[2], area[3], area[4], colour, 2)       
}

closeHatchSettingsMenu() {
    button := HATCH_SETTINGS_CLOSE_BUTTON
    SendEvent "{Click, " button[1] ", " button[2] ", 1}" 
}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; PIXEL CHECKS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

isHatchSettingsMenuOpen() {
    pixel := HATCH_SETTINGS_MENU_ICON
    colour := "0x67f267"
    return PixelSearch(&X, &Y, pixel[1], pixel[2], pixel[1], pixel[2], colour, 2)
}