#Requires AutoHotkey v2.0  ; Ensures the script runs only on AutoHotkey version 2.0, which supports the syntax and functions used in this script.

MASTERY_MENU_BUTTON := {x: 566, y: 521}
MASTERY_POTIONS_BUTTON := {x: 176, y: 243, scrolls: 0}
MASTERY_ENCHANTS_BUTTON := {x: 629, y: 261, scrolls: 3}
MASTERY_PETS_BUTTON := {x: 177, y: 259, scrolls: 3}
MASTERY_FRUIT_BUTTON := {x: 403, y: 323, scrolls: 1}

; Pixel checks.
MASTERY_MENU_ICON := {x: 66, y: 107, colour: "0xfd2dff"}

; OCR areas.
MASTERY_LEVEL := {x: 64, y: 322, w: 100, h: 37}

; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; MASTERY FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

getPotionsRequiredForUpgrade() {
    mastery := getMasteryLevel(MASTERY_POTIONS_BUTTON)
    switch true {
        case mastery >= 0 && mastery < 60:
            potions := 5
        default:
            potions := 4
    }
    numberPotionsToUpgradeSetting.Text := potions
}

getEnchantsRequiredForUpgrade() {
    mastery := getMasteryLevel(MASTERY_ENCHANTS_BUTTON)
    switch true {
        case mastery >= 0 && mastery < 60:
            enchants := 7
        case mastery >= 60 && mastery < 90:
            enchants := 6
        default:
            enchants := 5
    }
    numberEnchantsToUpgradeSetting.Text := enchants
}

getGoldenPetsRequiredForUpgrade() {
    mastery := getMasteryLevel(MASTERY_PETS_BUTTON)
    switch true {
        case mastery >= 0 && mastery < 60:
            pets := 10
        case mastery >= 60 && mastery < 99:
            pets := 9
        default:
            pets := 8
    }
    numberPetsToMakeGoldenSetting.Text := pets
}

getRainbowPetsRequiredForUpgrade() {
    mastery := getMasteryLevel(MASTERY_PETS_BUTTON)
    switch true {
        case mastery >= 0 && mastery < 90:
            pets := 10
        case mastery >= 90 && mastery < 98:
            pets := 9
        default:
            pets := 8
    }
    numberPetsToMakeRainbowSetting.Text := pets
}

getEatFruitSetting() {
    mastery := getMasteryLevel(MASTERY_FRUIT_BUTTON)
    switch true {
        case mastery >= 0 && mastery < 99:
            eat := true
        default:
            eat := false
    }
    eatFruitSetting.Value := eat
}

openMasteryMenu() {
    activateRoblox()
    button := MASTERY_MENU_BUTTON
    loop 100 {
        MouseMove button.x, button.y
        activateMouseHover()
        SendEvent "{Click, " button.x ", " button.y ", 1}"        
        if !isMasteryMenuOpen()
            return true
        Sleep 50
    }
}

getMasteryLevel(button) {
    activateRoblox()
    closeAllWindows()
    openInventoryMenu()

    if !openMasteryMenu()
        return false

    activateRoblox()
    moveMouseToCentreOfScreen()
    loop 8 {
        scrollMouseWheel("{WheelUp}")
        Sleep 50
    }

    if button.scrolls > 0 {
        activateRoblox()
        moveMouseToCentreOfScreen()
        loop button.scrolls {
            scrollMouseWheel("{WheelDown}")
            Sleep 50
        }
    }
        
    SendEvent "{Click, " button.x ", " button.y ", 1}"   
    Sleep 200

    area := MASTERY_LEVEL
    result := getOcrResult([area.x, area.y], [area.w, area.h], 20)

    closeAllWindows()

    return RegExReplace(result, "\D", "")
}

isMasteryMenuOpen() {
    search := MASTERY_MENU_ICON
    return PixelSearch(&X, &Y, search.x, search.y, search.x, search.y, search.colour, 2)   
}
