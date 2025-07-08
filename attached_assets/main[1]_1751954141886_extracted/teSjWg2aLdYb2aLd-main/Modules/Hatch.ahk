#Requires AutoHotkey v2.0

; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; HATCHING FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

; Control locations.
HATCH_EGG_MENU_BUY_MAX_BUTTON := {x: 552, y: 429}
HATCH_SPAM_CLICK := {x: 241, y: 580}

; Pixel searches.
HATCH_EGG_MENU_CLOSE_BUTTON := {x: 614, y: 109, colour: "0xff155f"}
HATCH_EGG_MENU_BUY_BUTTON := {x: 191, y: 451, colour: "0x6bf206"}

hatchBestEgg(amountToHatch) {
    if getCurrentArea() != "Best Egg" {
        
        if gamepassAutoFarmSetting.Value
            if getCurrentZone() != BEST_ZONE
                farmBestZone()
    
        moveToBestEgg()
        Sleep 100
    }

    eggsAtOnce := eggsAtOnceSetting.Value
    timesToHatch := Ceil(amountToHatch / eggsAtOnce)
    setCurrentArea("Best Egg")
    hatchEgg(timesToHatch)
}

hatchRarePetEgg() {
    if (getCurrentArea() != "Rare Egg") {
        
        if gamepassAutoFarmSetting.Value
            if (getCurrentZone() != BEST_ZONE)
                farmBestZone()

        moveToRareEgg()
        applyAutoHatchSettings(true)
        Sleep 100
    }

    timesToHatch := rareEggHatchesSetting.Value
    setCurrentArea("Rare Egg")
    hatchEgg(timesToHatch)
}

openHatchEggMenu() {
    if isHatchEggMenuOpen()
        return true

    loop 100 {
        SendEvent "{e}"
        Sleep 50
        loop 10 {
            if isHatchEggMenuOpen()
                return true
            Sleep 50
        }
    }
    return false
}

hatchEgg(timesToHatch) {
    closeAllWindows()
    eggHatched := false

    loop timesToHatch {      
        
        if !openHatchEggMenu() {
            ; The path to the egg was affected and the player did not reach the egg correctly.
            if A_Index == 1 {
                setCurrentArea("-")
                setCurrentAction("Missed Egg")
                writeToLogFile("  Missed Egg")                
            }
            break
        }

        setCurrentAction("Hatching Eggs (" A_Index "/" timesToHatch ")")
        writeToLogFile("  Hatching Eggs (" A_Index "/" timesToHatch ")")

        if !buyMaxEggs()
            break

        if !waitForInventoryIconToBeHidden()
            break

        if !spamClickToOpenEggs()
            break

    }

    loop 10 {
        if spamClickToOpenEggs()
            break
    }
    
    closeAllWindows()
    setCurrentAction("-")
}

buyMaxEggs() {
    button := HATCH_EGG_MENU_BUY_MAX_BUTTON
    loop 100 {
        MouseMove button.x, button.y
        activateMouseHover()
        SendEvent "{Click, " button.x ", " button.y ", 1}"        
        if !isHatchEggMenuOpen()
            return true
        Sleep 50
    }
    return false
}

waitForInventoryIconToBeHidden() {
    loop 100 {
        if !isInventoryButtonVisible()
            return true
        Sleep 50
    }
    return false
}

spamClickToOpenEggs() {
    pixel := HATCH_SPAM_CLICK    
    loop 500 {
        if isInventoryButtonVisible()
            return true
        SendEvent "{Click, " pixel.x ", " pixel.y ", 1}"
        Sleep 10
    }
    return false
}

stopHatching() {
    activateRoblox()
    closeAllWindows()
    
    setCurrentAction("Stopping Hatching")
    setCurrentArea("-")

    ; Clear remaining eggs after the expected amount is hatched.
    pixel := HATCH_SPAM_CLICK
    loop 1000 {  
        if isInventoryButtonVisible()
            break
        SendEvent "{Click, " pixel.x ", " pixel.y ", 1}"
        Sleep 10
    }
}

closeHatchEggMenu() {
    search := HATCH_EGG_MENU_CLOSE_BUTTON
    if PixelSearch(&X, &Y, search.x, search.y, search.x, search.y, search.colour, 2)  
        SendEvent "{Click, " X ", " Y ", 1}"
}

isHatchEggMenuOpen() {
    search := HATCH_EGG_MENU_BUY_BUTTON
    return PixelSearch(&X, &Y, search.x, search.y, search.x, search.y, search.colour, 2)   
}
