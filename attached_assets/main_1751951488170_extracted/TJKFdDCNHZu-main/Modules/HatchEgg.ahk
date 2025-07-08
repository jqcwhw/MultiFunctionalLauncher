#Requires AutoHotkey v2.0

; Pixel search areas.
HATCH_MENU_BUTTON := [191, 451]

; Click locations.
HATCH_MENU_CLOSE_BUTTON := [477, 192]
HATCH_MENU_BUY_MAX_BUTTON := [552, 429]

hatchEgg(clientId) {

    Loop 50 {
        SendEvent "{e}"
        Sleep 10
        if isHatchMenuOpen()
            break 
            
    }

    if !isHatchMenuOpen() {
        earliestTime := actionList.GetText(1, 4)
        newTime := DateAdd(earliestTime, -1, "Seconds")
        addActionToQueue(clientId, "Teleport Best Zone", newTime)
        addActionToQueue(clientId, "Move To Best Egg", newTime)
        addActionToQueue(clientId, "Hatch Best Egg", newTime)        
        return
    }

    button := HATCH_MENU_BUY_MAX_BUTTON
    SendEvent "{Click, " button[1] ", " button[2] ", 1}" 

    Loop 100 {  ; Wait for the hatch menu to close.
        if !isHatchMenuOpen()
            break
        Sleep 50
    }
}

isHatchMenuOpen() {
    pixel := HATCH_MENU_BUTTON
    colour := "0x6BF206"
    return PixelSearch(&X, &Y, pixel[1], pixel[2], pixel[1], pixel[2], colour, 2)    
}

closeHatchMenu() {
    button := HATCH_MENU_CLOSE_BUTTON
    SendEvent "{Click, " button[1] ", " button[2] ", 1}" 
}