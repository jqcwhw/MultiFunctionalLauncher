#Requires AutoHotkey v2.0

; Control locations.
MACHINE_ICON := {x: 65, y: 114}
MACHINE_SEARCH_BOX := {x: 530, y: 107}
MACHINE_OK_BUTTON := {x: 164, y: 424}
MACHINE_SUCCESS_OK_BUTTON := {x: 396, y: 419}
MACHINE_ITEM_1_STANDARD := {x: 364, y: 208}
MACHINE_ITEM_1_MASTERY := {x: 424, y: 197}

; Pixel search locations.
MACHINE_OK_BUTTON_SEARCH := {x1: 79, y1: 392, x2: 261, y2: 547, colour: "0x84F710"}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; SUPERCOMPUTER! FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

travelToMachine(machine) {
    setCurrentAction("Moving To Machine: " machine)
       
    zone := MACHINE_MAP[machine].zone
    path := MACHINE_MAP[machine].path

    switch zone {
        case 1, 100, 200:
            interimZone := zone + 1
        default:
            interimZone := zone - 1
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

openMachine(machine) {

    ; Supercomputer Radio method.
    if hasSupercomputerRadioSetting.Value {
        farmBestZone()
        openSupercomputerRadio()
        findAndClickSupercomputerButton(machine)  
    }

    else {
        switch WORLD {
            case 1:  ; Machine method.
                travelToMachine(machine)
            case 2, 3:  ; Supercomputer method.
                travelToSupercomputer()
                findAndClickSupercomputerButton(machine)                  
            default:
        }
    }

}

useMachine(machine, amountToMake, amountMultiplier, questId, searchText := "", itemToIgnore := "") {
    activateRoblox()

    hasMastery := hasSkillMastery()
    numberLocation := hasMastery ? [407, 159, 468, 177] : [350, 166, 411, 184] 

    if (searchText != "") {
        
        items := StrSplit(searchText, "|")

        hasEnoughForAtLeastOneConversion := false
        for index, item in items {
            selectMachineSearchBox()
            SendText item
            SendEvent "{Click, " MACHINE_ICON.X ", " MACHINE_ICON.y ", 1}"
            Sleep 1000
            hasAmount := readNumbers(numberLocation, NUMBER_IMAGES)
            if hasAmount > 0 && hasAmount >= amountMultiplier {
                hasEnoughForAtLeastOneConversion := true
                break
            }
        }
        
        if hasEnoughForAtLeastOneConversion {
            findAngle(amountToMake, amountMultiplier, hasMastery, hasAmount) 
            clickMachineOkButton()
        }
        else
            QUEST_PRIORITY[questId] := 0

    }

    closeAllWindows()
    clickMachineSuccessButton()

    Loop 10 {
        closeSuperComputerMenu()
    }
}

selectMachineSearchBox() {
    control := MACHINE_SEARCH_BOX
    SendEvent "{Click, " control.x ", " control.y ", 1}"
    Sleep 500 * DELAY_MODIFIER
}

clickMachineOkButton() {
    control := MACHINE_OK_BUTTON
    SendEvent "{Click, " control.x ", " control.y ", 1}"
    Sleep 500 * DELAY_MODIFIER
}

clickMachineSuccessButton() {
    control := MACHINE_SUCCESS_OK_BUTTON
    Loop 2 {
        SendEvent "{Click, " control.x ", " control.y ", 1}"
        Sleep 500 * DELAY_MODIFIER
    }
}

closeSuperComputerMenu() {
    closeWindow(SUPERCOMPUTER_MENU_X) 
}

findAngle(amountToMake, amountMultiplier, hasMastery, hasAmount) {
    activateRoblox()
    amountNeeded := amountToMake * amountMultiplier

    writeToLogFile("*** SUPERCOMPUTER CONVERSION ***")
    writeToLogFile("  Amount To Make: " amountToMake "   Multiplier: " amountMultiplier "   Amount Needed: " amountNeeded "   Mastery: " hasMastery)

    item := hasMastery ? MACHINE_ITEM_1_MASTERY : MACHINE_ITEM_1_STANDARD

    amountEachDegree := hasAmount / 360
    angleRequired := Ceil((amountNeeded / amountEachDegree))

    if angleRequired > 360 {
        SendEvent "{Shift down}"
        SendEvent "{Click, " item.x ", " item.y ", 1}"
        SendEvent "{Shift up}"
    }
    else {
        SendEvent "{Click down, " item.x ", " item.y ", 1}"
        selectAngle(item, angleRequired)
        SendEvent "{Click up}"
    }
}

selectAngle(item, angle) {
    modifier := 0

    Loop Abs(177 - angle) {
        ; Calculate the X and Y coordinate for the required angle.
        X := item.x + RADIUS * Cos((90 + modifier) * PI / 180)
        Y := item.y + RADIUS * Sin((90 + modifier) * PI / 180)
        MouseMove X, Y
        modifier += (angle <= 177) ? -1 : 1
        Sleep 10
    }

    ; Sometimes the angle is too small to display the OK button.
    ; Select the minimum amount required for a conversion.
    Loop 360 {
        if isMachineOkButtonDisplayed()
            break
        modifier += 1
        ; Calculate the X and Y coordinate for the required angle.
        X := item.x + RADIUS * Cos((90 + modifier) * PI / 180)
        Y := item.y + RADIUS * Sin((90 + modifier) * PI / 180)       
        MouseMove X, Y
    }

}

isMachineOkButtonDisplayed() {
    search := MACHINE_OK_BUTTON_SEARCH
    return PixelSearch(&x, &y, search.x1, search.y1, search.x2, search.y2, search.colour, 2)    
}

openSupercomputerRadio() {
    closeAllWindows()
    keybind := getKeybind("Supercomputer Radio")
    SendEvent keybind
}