#Requires AutoHotkey v2.0

; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; RANK REWARDS FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

; Controls.
REWARDS_BUTTON_STANDARD := {x: 706, y: 425}  ; Standard button position.
REWARDS_BUTTON_RANK_UP := {x: 706, y: 364}  ; Button position when rank up occurs.
REWARDS_MENU_X := {x: 730, y: 109}

; Pixel searches.
RANK_REWARDS_MENU_ICON := {x: 52, y: 99, colour: "0x180596"}
CLAIM_BUTTON_SHADOW := {x1: 294, y1: 113, x2: 747, y2: 469, colour: "0x6E864D"}

; OCR areas.
RANK_QUEST := {x: 130, y: 280, w: 135, h: 135}
RANK_PROGRESS_DOUBLE_STARS := {x: 418, y: 124, w: 216, h: 34}  ; Location if player does have double stars gamepass.
RANK_PROGRESS_STANDARD := {x: 418, y: 211, w: 216, h: 34}  ; Location if player does not have double stars gamepass.
RANK_UP_MESSAGE := {x: 599, y: 278, w: 200, h: 50}  ; Rank up message ("MAX RANK" or "CLAIM REWARDS").

clickRewardsButton() {
    activateRoblox()
    closeAllWindows()
    
    button := REWARDS_BUTTON_STANDARD
    loop 100 {
        MouseMove button.x, button.y
        activateMouseHover()
        SendEvent "{Click, " button.x ", " button.y ", 1}"
    
        loop 10 {
            Sleep 50
            if isRankRewardsWindowDisplayed()
                return true
        }
        Sleep 50
    }

    return false
}

isRankRewardsWindowDisplayed() {
    search := RANK_REWARDS_MENU_ICON
    return PixelSearch(&X, &Y, search.x, search.y, search.x, search.y, search.colour, 2)
}

closeRewardsMenu() {
    if !isRankRewardsWindowDisplayed()
        return true

    button := REWARDS_MENU_X
    loop 100 {
        SendEvent "{Click, " button.x ", " button.y ", 1}"
        Sleep 50
        loop 10 {
            if !isRankRewardsWindowDisplayed()
                return true
            Sleep 50
        }
    }

    return false
}

refreshQuests(*) {
    setCurrentAction("Reading Quests")
    activateRoblox()

    lvQuests.Delete()
    clickRewardsButton()

    writeToLogFile("*** REFRESH QUESTS ***")

    readQuests()
    readRankProgress()

    closeAllWindows()
    setCurrentAction("-")
}

readQuests() {

    search := RANK_QUEST
    result := getOcrResult([search.x, search.y], [search.w, search.h], 30, false)

    combinedLines := []
    for line in result.Lines {
        ; Combine with previous line if the first character is lowercase.
        if (combinedLines.Length > 0 && RegExMatch(line.Text, "^[a-z]")) {  
            combinedLines[combinedLines.Length] .= " " line.Text
        ; Combine with previous line if the distance between the lines is less than or equal to 15 pixels.
        } else if (combinedLines.Length > 0 && (line.Words[1].y - previousLineY <= 15)) {  
            combinedLines[combinedLines.Length] .= " " line.Text
        } else {
            combinedLines.Push(line.Text)
        }
        previousLineY := line.Words[1].y
    }

    for index, quest in combinedLines {
        questSetting := "do" index "StarQuestsSetting"

        if %questSetting%.Value
            addQuestToGui(quest)
    }

}

readRankProgress() {
    activateRoblox()
    search := gamepassDoubleStarsSetting.Value ? RANK_PROGRESS_DOUBLE_STARS : RANK_PROGRESS_STANDARD
    result := getOcrResult([search.x, search.y], [search.w, search.h], 20)
    writeToLogFile("  Rank Details: " result)
    mainGui.Title := MACRO_TITLE " v" MACRO_VERSION "  (" result ")  (" FormatTime(A_Now, "h:mm tt") ")"
}

clickClaimRewardsButton() {
    activateRoblox()
    button := REWARDS_BUTTON_RANK_UP
    SendEvent "{Click, " button.x ", " button.y ", 1}"
    Sleep 500
}

checkForClaimRewards() {
    setCurrentAction("Checking For Rank Up")

    result := getRewardsText()
    if regexMatch(result, "CLAIM|REW|ARD|MAX") {

        setCurrentAction("Claiming Rewards")
        closeAllWindows()
        clickClaimRewardsButton()
        findAndClickClaimButtons()
        clearRewardsNotifications()
        closeAllWindows()

        writeToLogFile([
            "**************************************************",
            "*                    RANK UP                     *",
            "**************************************************"
            ]
        ) 
    }

    setCurrentAction("-")
}


getRewardsText() {
    activateRoblox()
    search := RANK_UP_MESSAGE
    return getOcrResult([search.x, search.y], [search.w, search.h], 20)
}

checkForMaxRank() {
    activateRoblox()
    result := getRewardsText()

    if (regexMatch(result, "MAX")) {
        MsgBox "Maximum rank already."
        pause
    }
}

findAndClickClaimButtons() {
    search := CLAIM_BUTTON_SHADOW

    ; If the player does not have the Double Stars gamepass we must scroll past the advertisement.
    if !gamepassDoubleStarsSetting.Value {
        moveMouseToCentreOfScreen()
        scrollMouseWheel("{WheelDown}")        
    }

    loop 20 {
        loop 20 {
            ; Search for a claim button.
            if !PixelSearch(&X, &Y, search.x1, search.y1, search.x2, search.y2, search.colour, 2)
                break

            ; Click the found claim button.
            MouseMove X, Y
            activateMouseHover()
            SendEvent "{Click, " X ", " Y ", 1}"
            Sleep 200
        }
        ; Scroll down through the rewards.
        moveMouseToCentreOfScreen()
        scrollMouseWheel("{WheelDown}")
        Sleep 200
    }

}

clearRewardsNotifications() {
    loop 10 {
        SendEvent "{Click, " 400 ", " 300 ", 1}"
        Sleep 50
    }
}