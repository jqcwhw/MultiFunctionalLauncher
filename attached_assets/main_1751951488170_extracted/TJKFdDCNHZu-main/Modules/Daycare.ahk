#Requires AutoHotkey v2.0

; Image search areas.


; Pixel search areas.
DAYCARE_ICON := [61, 111]
DAYCARE_ENROLL_BUTTON_SEARCH := [332, 371, 465, 417]

; Custom OCR areas.
DAYCARE_PET_STACK_AMOUNT_AREAS := Map(
    1, [426, 164, 492, 182], 2, [537, 164, 604, 182], 3, [642, 164, 717, 182],
    4, [426, 273, 492, 295], 5, [537, 273, 604, 295], 6, [642, 273, 717, 295],
    7, [426, 385, 492, 407], 8, [537, 385, 604, 407], 9, [642, 385, 717, 407]
)

; Click locations.
DAYCARE_ENROLL_BUTTON := [400, 400]
DAYCARE_ENROLL_OK_BUTTON := [210, 463]
DAYCARE_ENROLL_CONFIRM_YES_BUTTON := [291, 424]
DAYCARE_PET_BUTTONS := Map(
    1, [445, 215], 2, [560, 215], 3, [675, 215],
    4, [445, 325], 5, [560, 325], 6, [675, 325],
    7, [445, 435], 8, [560, 435], 9, [675, 435]
)
DAYCARE_CLOSE_BUTTON := [748, 111]
DAYCARE_CLAIM_ALL_BUTTON := [397, 412]
DAYCARE_REWARDS_OK_BUTTON := [400, 480]
DAYCARE_PET_SECTION := [383, 125]


useDaycare(clientId) {
    openSupercomputer(clientId)
    clickDaycareButton()
    scrollToBottomOfDaycareMenu()

    if isEnrollButtonDisplayed()
        enrollPets(clientId)
    else if isClaimAllButtonDisplayed() {
        claimAllPets()
        earliestTime := actionList.GetText(1, 4)
        newTime := DateAdd(earliestTime, -1, "Seconds")        
        addActionToQueue(clientId, "Daycare", newTime)
        closeDaycareWindow()
    }
    else
        closeDaycareWindow()
        
}

enrollPets(clientId) {
    if !isEnrollButtonDisplayed() {
        openSupercomputer(clientId)
        clickDaycareButton()
        scrollToBottomOfDaycareMenu()
    }
    clickEnrollButton()
    waitForEnrollWindowToOpen()
    if selectPets(clientId) {
        clickEnrollOkButton()
        waitForEnrollWindowToClose()
        waitForEnrollConfirmationWindowToOpen()    
        clickEnrollYesButton()
        waitForEnrollConfirmationWindowToClose()
    }
    closeDaycareWindow()
}

clickEnrollYesButton() {
    button := DAYCARE_ENROLL_CONFIRM_YES_BUTTON
    loop 100 {
        SendEvent "{Click, " button[1] ", " button[2] ", 1}"
        Sleep 50
        if waitForEnrollConfirmationWindowToClose() 
            break
    }
}

closeDaycareWindow() {
    button := DAYCARE_CLOSE_BUTTON

    Loop 100 {
        SendEvent "{Click, " button[1] ", " button[2] ", 1}"
        if !isDaycareWindowOpen()
            break
        Sleep 10
    }
}

clickEnrollButton() {
    area := DAYCARE_ENROLL_BUTTON_SEARCH
    colour := "0x5fdefe"

    if !PixelSearch(&X, &Y, area[1], area[2], area[3], area[4], colour, 2)
        return
    
    ; Click the Enroll button and wait for the Daycare window to close.
    Loop 100 {
        SendEvent "{Click, " X ", " Y ", 1}"
        Loop 10 {
            Sleep 10
            if !isDaycareWindowOpen()
                return
        }
    }
}

selectPets(clientId) {
    daycareSlots := CLIENT_MAP[clientId]["daycareSlots"]

    MouseMove DAYCARE_PET_SECTION[1], DAYCARE_PET_SECTION[2]
    activateMouseHover()
    scrollMouseWheel("{WheelUp}", 5)
    for index, area in DAYCARE_PET_STACK_AMOUNT_AREAS {
        stackAmount := readValue(area[1], area[2], area[3], area[4])
        if stackAmount >= daycareSlots {
            SendEvent "{Shift down}"
            Sleep 100
            SendEvent "{Click, " DAYCARE_PET_BUTTONS[index][1] ", " DAYCARE_PET_BUTTONS[index][2] ", 1}"
            Sleep 100
            SendEvent "{Shift up}"
            return true
        }
    }
    return false
}

waitForEnrollWindowToOpen() {
    Loop 100 {
        Sleep 10
        if isEnrollWindowOpen()
            break
    }
}

waitForEnrollConfirmationWindowToClose() {
    Loop 100 {
        Sleep 10
        if !isEnrollConfirmWindowOpen()
            return true
    }    
    return false
}

waitForEnrollWindowToClose() {
    Loop 100 {
        Sleep 10
        if !isEnrollWindowOpen()
            break
    }
}

waitForEnrollConfirmationWindowToOpen() {
    Loop 100 {
        Sleep 10
        if isEnrollConfirmWindowOpen()
            break
    }
}

waitForDaycareWindowToClose() {
    Loop 100 {
        Sleep 10
        if !isDaycareWindowOpen()
            break
    }
}

waitforRewardsWindowToOpen() {
    Loop 100 {
        Sleep 10
        if isDaycareRewardsWindowOpen()
            break
    }    
}

clickEnrollOkButton() {
    button := DAYCARE_ENROLL_OK_BUTTON
    SendEvent "{Click, " button[1] ", " button[2] ", 1}"
}

claimAllPets() {
    clickClaimAllButton()
    waitForDaycareWindowToClose()
    waitforRewardsWindowToOpen()
    clickDaycareRewardsOkButton()
}

clickDaycareRewardsOkButton() {
    button := DAYCARE_REWARDS_OK_BUTTON
    SendEvent "{Click, " button[1] ", " button[2] ", 1}"    
}

clickClaimAllButton() {
    button := DAYCARE_CLAIM_ALL_BUTTON
    SendEvent "{Click, " button[1] ", " button[2] ", 1}"
}

clickDaycareButton() {
    imagePath := BUTTON_IMAGES "Daycare.bmp"
    findAndClickSupercomputerButton(imagePath)
}

scrollToBottomOfDaycareMenu() {
    moveMouseToCentreOfScreen()
    scrollMouseWheel("{WheelDown}", 15)
    Sleep 1000
}

isDaycareRewardsWindowOpen() {
    pixel := [286, 150]
    colour := "0x42cfff"
    return PixelSearch(&X, &Y, pixel[1], pixel[2], pixel[1], pixel[2], colour, 2)       
}

isEnrollConfirmWindowOpen() {
    pixel := [523, 154]
    colour := "0x3fccff"
    return PixelSearch(&X, &Y, pixel[1], pixel[2], pixel[1], pixel[2], colour, 2)    
}

isEnrollButtonDisplayed() {
    area := DAYCARE_ENROLL_BUTTON_SEARCH
    colour := "0x5fdefe"
    return PixelSearch(&X, &Y, area[1], area[2], area[3], area[4], colour, 2)
}

isClaimAllButtonDisplayed() {
    pixel := [397, 440]
    colour := "0x66f104"
    return PixelSearch(&X, &Y, pixel[1], pixel[2], pixel[1], pixel[2], colour, 2)
}

isEnrollWindowOpen() {
    pixel := [63, 154]
    colour := "0x59eaff"
    return PixelSearch(&X, &Y, pixel[1], pixel[2], pixel[1], pixel[2], colour, 2)    
}

isDaycareWindowOpen() {
    pixel := DAYCARE_ICON
    colour := "0x00e9d1"
    daycareIcon := PixelSearch(&X, &Y, pixel[1], pixel[2], pixel[1], pixel[2], colour, 2)

    pixel := [612, 108]
    colour := "0x2a2b31"
    daycareBorder := PixelSearch(&X, &Y, pixel[1], pixel[2], pixel[1], pixel[2], colour, 2)

    return (daycareIcon && daycareBorder)    
}
