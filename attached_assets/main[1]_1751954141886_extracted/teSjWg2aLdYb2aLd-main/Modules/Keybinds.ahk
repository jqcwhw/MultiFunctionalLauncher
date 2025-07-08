#Requires AutoHotkey v2.0

; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; KEYBINDS FUNCTION
; AutoHotKey 2.0 Macro for Pet Simulator 99
; Written by waktool
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; 0.1 - Initial version.
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

kb_addKeybindsFromMap() {
    WinActivate "ahk_exe RobloxPlayerBeta.exe"

    kb_openInventory()
    kb_openSettings()
    kb_openKeybinds()

    Sleep 1000

    kb_deleteKeybinds()
    kb_addKeyBinds()
    kb_closeKeybindMenu()
}

kb_addKeyBinds() {
    WinActivate "ahk_exe RobloxPlayerBeta.exe"

    addBindArea := [302, 172, 498, 428]  ; Search area.
    colour := "0x6BF206"  ; Button colour.
    searchBox := [533, 108]
    item1 := [114, 193]
    confirm := [329, 474]
    unbound := [289, 269]
    save := [492, 474]
    ok := [400, 423]

    SendEvent "{Click, " 190 ", " 130 ", 1}"
    kb_scrollMouseWheel("{WheelUp}", 20)

    for item, value in KEYBIND_MAP {    
        
        Loop 100 {
            if kb_isKeybindsMenuOpen()
                break
            Sleep 10
        }
        
        SendEvent "{Click, " 190 ", " 130 ", 1}"
        kb_scrollMouseWheel("{WheelDown}", 20)

        Loop 20 {
            if PixelSearch(&foundX, &foundY, addBindArea[1], addBindArea[2], addBindArea[3], addBindArea[4], colour, 2)
                break
            kb_scrollMouseWheel("{WheelDown}", 1)
            Sleep 10
        }

        PixelSearch(&foundX, &foundY, addBindArea[1], addBindArea[2], addBindArea[3], addBindArea[4], colour, 2)
        Loop 5 {
            SendEvent "{Click, " foundX ", " foundY ", 1}"
        }

        Loop 100 {
            if kb_isBindAnItemMenuOpen()
                break
            Sleep 10
        }
        
        Loop 100 {
            SendEvent "{Click, " searchBox[1] ", " searchBox[2] ", 1}"
            Sleep 10    
            if kb_isSearchBoxSelected()
                break
        }
        
        SendText item

        Loop 100 {
            if kb_isSearchTextEntered()
                break
            Sleep 10
        }

        SendEvent "{Click, " item1[1] ", " item1[2] ", 1}"

        Loop 100 {
            if kb_isConfirmButtonDisplayed(confirm)
                break
            Sleep 10
        }            

        SendEvent "{Click, " confirm[1] ", " confirm[2] ", 1}"

        Loop 100 {
            if kb_isKeybindsMenuOpen()
                break
            Sleep 10
        }

        SendEvent "{Click, " 190 ", " 130 ", 1}"
        kb_scrollMouseWheel("{WheelUp}", 20)

        Sleep 100

        Loop 5 {
            SendInput kb_getKeypress(value.key, "down")
        }
        Sleep 10
        Loop 5 {
            SendEvent "{Click, " unbound[1] ", " unbound[2] ", 1}"
            Sleep 10
        }
        Sleep 10
        SendInput kb_getKeypress(value.key, "up")

        Loop 100 { 
            if kb_isSaveButtonDisplayed(save)
                break
            Sleep 10                
        }

        SendEvent "{Click, " save[1] ", " save[2] ", 1}"

        Loop 100 {
            if !kb_isSaveButtonDisplayed(save)
                break
            Sleep 10
        }

        Loop 100 {
            if kb_isChangesSavedMessageOpen()
                break
            Sleep 10
        }

        SendEvent "{Click, " ok[1] ", " ok[2] ", 1}"

        Loop 100 {
            if kb_isKeybindsMenuOpen()
                break
            Sleep 10
        }

        Sleep 1000

    }

}

kb_getKeypress(key, state) {
    strModifier := ""
    strKeypress := ""

    if InStr(key, "^") {
        strModifier := "Ctrl"
        key := StrReplace(key, "^", "")
    }
    
    strKeypress := "{" key " " state "}"

    if strModifier != "" {
        strKeypress := "{" strModifier " " state "}" strKeypress
    }
    return strKeypress
}

kb_deleteKeybinds() {
    pixel := [514, 231, 590, 300] 
    Loop 50 {
        if !PixelSearch(&foundX, &foundY, pixel[1], pixel[2], pixel[3], pixel[4], "0xFF165F", 2)
            break
    
        SendEvent "{Click, " foundX ", " foundY ", 1}"
        Sleep 1000
    }
}

kb_isChangesSavedMessageOpen() {
    return PixelSearch(&foundX, &foundY, 183, 118, 274, 148, "0x4EDDFF", 2)
}

kb_isSaveButtonDisplayed(pixel) {
    return PixelSearch(&foundX, &foundY, pixel[1], pixel[2], pixel[1], pixel[2], "0x6EEBFC", 2)
}

kb_isUnboundButtonBlue() {
    return PixelSearch(&foundX, &foundY, 285, 285, 285, 285, "0x61E0FE", 2)
}

kb_isConfirmButtonDisplayed(pixel) {
    return PixelSearch(&foundX, &foundY, pixel[1], pixel[2], pixel[1], pixel[2], "0x70ECFC", 2)
}

kb_isSearchBoxSelected() {
    return PixelSearch(&foundX, &foundY, 630, 116, 640, 166, "0xAFAFAF", 2)
}

kb_isSearchTextEntered() {
    return PixelSearch(&foundX, &foundY, 524, 107, 699, 107, "0x1E1E1E", 2)
}

kb_isBindAnItemMenuOpen() {
    return PixelSearch(&foundX, &foundY, 49, 120, 49, 120, "0xFF2E91", 2)
}

kb_openInventory() {
    SendEvent "{f}"  ; Trigger the inventory open key.
    Loop 100 {
        if kb_isInventoryOpen()
            break
        Sleep 10
    }
}

kb_openSettings() {
    icon := [642, 522]

    SendEvent "{Click, " icon[1] ", " icon[2] ", 1}"
    Loop 100 {
        if !kb_isInventoryOpen()
            break
        Sleep 10
    }    
}

kb_openKeybinds() {

    search := [433, 134, 605, 464]
    filePath := KEYBIND_IMAGES "\kb_EditKeybinds.bmp"

    ; Scroll to the top of the window.
    SendEvent "{Click, " 190 ", " 130 ", 1}"
    kb_scrollMouseWheel("{WheelUp}", 10)


    if ImageSearch(&foundX, &foundY, search[1], search[2], search[3], search[4], filePath) {
        SendEvent "{Click, " FoundX ", " FoundY ", 1}"
        Loop 100 {
            if kb_isKeybindsMenuOpen()
                break
            Sleep 10
        }
    }
        
}

kb_isKeybindsMenuOpen() {
    return PixelSearch(&foundX, &foundY, 178, 128, 178, 128, "0xABC2D5", 2)
}

kb_isInventoryOpen() {
    pixel := [29, 372, 29, 372]  ; Hoverboard icon.
    colour := "0xFF911A"  ; Hoverboard colour.
    return PixelSearch(&foundX, &foundY, pixel[1], pixel[2], pixel[3], pixel[4], colour, 2)
}


kb_scrollMouseWheel(scrollDirection, timesToScroll := 1) {
    Loop timesToScroll {  ; Repeat scroll for the number of specified increments.
        Send scrollDirection  ; Send scroll command in the specified direction.
        Sleep 50  ; Short pause to mimic natural scrolling behavior.
    }
}

kb_closeKeybindMenu() {
    ; Perform pixel search within specified coordinates and color.
    if PixelSearch(&foundX, &foundY, 600, 88, 649, 127, "0xFF155E", 2) 
        SendEvent "{Click, " foundX ", " foundY ", 1}" 
}