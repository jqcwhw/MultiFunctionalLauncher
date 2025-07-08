#Requires AutoHotkey v2.0

; Clickable areas.
SETTINGS_BUTTON := {x: 255, y: 80}

; OCR areas.
OCR_SETTINGS_SECTION := {x1: 1, y1: 109, x2: 798, y2: 378}
OCR_SETTINGS_TABS := {x1: 1, y1: 60, x2: 798, y2: 58}

; Pixel searches.
ROBLOX_MORE_MENU_BACKGROUND := {x: 115, y: 49, colours: ["0x121215", "0x000000"]}

changeBackgroundTransparency() {

    if isMaxBackgroundTransparency()
        return

    if !openRobloxMenu()
        return

    Sleep 500
    clickSettingsTab()
    Sleep 500
    findBackgroundTransparencyText()

    closeRobloxMenu()
}

isMaxBackgroundTransparency() {
    search := ROBLOX_MORE_MENU_BACKGROUND
    for index, colour in search.colours {
        if PixelSearch(&x, &y, search.x, search.y, search.x, search.y, colour, 2)
            return true
    }
    return false
}

openRobloxMenu() {
    Send "{Esc}"
    loop 20 {
        Sleep 10
        if isRobloxMenuOpen()
            return true
    }
    return false
}

closeRobloxMenu() {
    Send "{Esc}"
    loop 20 {
        Sleep 10
        if !isRobloxMenuOpen()
            break
    }    
}

isRobloxMenuOpen() {
    area := OCR_SETTINGS_TABS
    ocrText := getOcrResult([area.x1, area.y1], [area.x2, area.y2], 5)
    return RegExMatch(ocrText, "People|Settings|Captures|Report|Help")
}

clickSettingsTab() {
    button := SETTINGS_BUTTON
    SendEvent "{Click, " button.x ", " button.y ", 1}"
}

findBackgroundTransparencyText() {
    area := OCR_SETTINGS_SECTION

    MouseMove 400, 300
    activateMouseHover()
    loop 10 {
        ocrObject := getOcrResult([area.x1, area.y1], [area.x2, area.y2], 5, false)
        if RegExMatch(ocrObject.Text, "Background Transparency") {
            menuOption := ocrObject.FindString("Background Transparency")
            plusSymbol := {x: 772, y: area.y1 + menuOption.y, colour: "0x232527"}
            loop {
                Sleep 50
                if PixelSearch(&x, &y, plusSymbol.x, plusSymbol.y, plusSymbol.x, plusSymbol.y, plusSymbol.colour, 2)
                    break 2
                SendEvent "{Click, " plusSymbol.x ", " plusSymbol.y ", 1}"
            }            
        }

        scrollMouseWheel("{WheelDown}")
        Sleep 100
    } 
}