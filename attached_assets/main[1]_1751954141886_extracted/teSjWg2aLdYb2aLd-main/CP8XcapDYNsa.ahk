#Requires AutoHotkey v2.0  ; Ensures the script runs only on AutoHotkey version 2.0, which supports the syntax and functions used in this script.

; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; RANK QUEST - AutoHotKey 2.0 Macro for Pet Simulator 99
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; DIRECTIVES & CONFIGURATIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

#SingleInstance Force
#NoTrayIcon
CoordMode "Mouse", "Client"
CoordMode "Pixel", "Client"
SetMouseDelay 10

; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; GLOBAL VARIABLES
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

; Titles and versioning for GUI elements.
MACRO_TITLE := "Rank Quests" 
MACRO_VERSION := "1.3.3"

; File and folder locations.
LOG_FOLDER := A_ScriptDir "\Logs\"
NUMBER_IMAGES := A_ScriptDir "\Images\Numbers\"

BUTTON_IMAGES := A_ScriptDir "\Images\Buttons\"
KEYBIND_IMAGES := A_ScriptDir "\Images\Keybinds\"
DATE_TODAY := FormatTime(A_Now, "yyyyMMdd")
ICON_FOLDER := A_ScriptDir "\a9f3d4b7e2c6a1f8b5d7e9c2a4f6b3d1e8c7a2f9b4d5e3c1a7f6b8d2e4c5a1f7b9e\"

; Mathematics and constants.
RADIUS := 100
PI := 3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679
ONE_SECOND := 1000

USE_FLAG_ZONES := [200, 201, 202, 203, 204]

; Font settings for GUI and other text displays.
TIMES_NEW_ROMAN := A_ScriptDir "\Assets\TimesNewRoman.ttf"
TIMES_NEW_ROMAN_INVERTED := A_ScriptDir "\Assets\TimesNewRoman-Inverted.ttf"
FREDOKA_ONE_REGULAR := A_ScriptDir "\Assets\FredokaOne-Regular.ttf"
SOURCE_SANS_PRO_BOLD := A_ScriptDir "\Assets\SourceSansPro-Bold.ttf"

; User settings loaded from an INI file.
SETTINGS_INI := A_ScriptDir "\Settings.ini"

; Pixel colours for the close icon for each of the user interface windows.
ERROR_WINDOW_X := Map("Start", [603, 109], "End", [603, 109], "Colour", "0xFF155F", "Tolerance", 2)
INVENTORY_MENU_X := Map("Start", [730, 109], "End", [730, 109], "Colour", "0xFF155F", "Tolerance", 2)

FREE_GIFTS_MENU_X := Map("Start", [608, 109], "End", [608, 109], "Colour", "0xFF155F", "Tolerance", 2)
TELEPORT_MENU_X := Map("Start", [725, 109], "End", [725, 109], "Colour", "0xFF155F", "Tolerance", 2)

AUTOHATCH_MENU_X := Map("Start", [605, 109], "End", [605, 109], "Colour", "0xFF155F", "Tolerance", 2)
SUPERCOMPUTER_MENU_X := Map("Start", [730, 109], "End", [730, 109], "Colour", "0xFF155F", "Tolerance", 2)

; Pixel colours for other checks.
CHAT_ICON_WHITE := Map("Start", [81, 24], "End", [81, 24], "Colour", "0xFFFFFF", "Tolerance", 2)
OOPS_ERROR_QUESTION_MARK := Map("Start", [434, 287], "End", [438, 291], "Colour", "0xFFB436", "Tolerance", 5)
ITEM_MISSING := Map("Start", [293, 425], "End", [293, 425], "Colour", "0xA51116", "Tolerance", 5)
INVENTORY_BUTTON := Map("Start", [384, 505], "End", [384, 505], "Colour", "0x15DECF", "Tolerance", 2)
ZONE_SEARCH := Map("Start", [437, 243], "End", [437, 243], "Colour", "0x5BDBFF", "Tolerance", 2)
FREE_GIFTS_READY := Map("Start", [50, 150], "End", [77, 177], "Colour", "0xFF0948", "Tolerance", 2)
AUTO_HATCH_MENU := Map("Start", [439, 155], "End", [604, 438], "Colour", "0x6FF308", "Tolerance", 2)
SKILL_MASTERY := Map("Start", [88, 309], "End", [88, 309], "Colour", "0xFFFFFF", "Tolerance", 2)

; Pixel colours for droppable boosts.
LUCKY_BLOCK_PINK := Map("Start", [140, 0], "End", [610, 380], "Colour", "0xEFB4FB", "Tolerance", 2)
LUCKY_BLOCK_BLUE := Map("Start", [140, 280], "End", [610, 380], "Colour", "0x00ACFF", "Tolerance", 2)        
LUCKY_BLOCK_YELLOW := Map("Start", [140, 280], "End", [610, 380], "Colour", "0xFFA300", "Tolerance", 2)  
COMET_COLOUR := Map("Start", [140, 280], "End", [610, 380], "Colour", "0x00A6FB", "Tolerance", 2)
PINATA_COLOUR := Map("Start", [140, 200], "End", [610, 380], "Colour", "0xFF00FF", "Tolerance", 2)

BUTTON_SEARCH_AREA := [18, 160, 128, 396]

ICON_MAP := Map(
    "Application", {icon: "c7d1e8f3a4b2f5e6c9a3b7d8e2c1f4a5b9e7d6c2a8f3b4d1e5f6a9c2b3d7e4f8a"},
    "Discord", {icon: "4a5c9e1b3f7d2e6c8a4b9f1d3c2e7b8a6d1f5c4b7e9a3d6f2b8c1e4a5f7d3b9e2"},
    "Donate", {icon: "9e3d7c1b2a6f8e4c3d5b9f2a7e6c1b4f3d8a2c5b7e9f1a4d6c3b8e2f5a7c9d4b1"},
    "PlayPause", {icon: "d2b8c5a4f9e1d3b7c6a8f2e9d4c3b1e7a6f5d9c2b3e4a1f7c8d6b9e2a5f4c1b7e"},
    "Font", {icon: "a59dc00c579f7baed19740d2efdadf02134da96daa2ef125e302fa3112e50aa0"},
    "PsychoHatcher", {icon: "a7f2c3d9b4e6a1f8c2b5d7e4c9a3f6b1d8e2c5a4b7f9d1e3c6b8a2f5d9c4e1b7f"}
)

KEYBIND_MAP := Map()

; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; HOT KEYS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

F1::startMacro()
F2::pauseMacro()
F3::exitMacro()


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; LIBRARIES
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

; Third-party Libraries:
#Include <OCR>        ; Includes an Optical Character Recognition library for extracting text from images.
#Include <Pin>        ; Includes a library for creating pinned overlays or highlights on the screen, enhancing visual interfaces.
#Include <JXON>       ; Includes a library for handling JSON data, useful for configuration and data management tasks.

; Macro Related Libraries:
#Include "%A_ScriptDir%\Modules"
#Include Coords.ahk
#Include Delays.ahk
#Include Gui-Main.ahk
#Include Gui-Settings.ahk
#Include Hatch.ahk
#Include Keybinds.ahk
#Include LeaderboardMenu.ahk
#Include Machine.ahk
#Include Mastery.ahk
#Include Movement.ahk
#Include Quests.ahk
#Include RewardsMenu.ahk
#Include RobloxMenu.ahk
#Include Settings.ahk
#Include Supercomputer.ahk
#Include Teleport.ahk
#Include VipArea.ahk

; Map libraries.
#Include "%A_ScriptDir%\Maps"
#Include Map-Egg.ahk
#Include Map-Machine.ahk
#Include Map-Quest.ahk
#Include Map-QuestPriority.ahk
#Include Map-Supercomputer.ahk
#Include Map-Vip.ahk
#Include Map-Zone.ahk


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; MACRO
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

runMacro()

runMacro() {
    displayQuestsGui()
    runTests()
    completeInitialisationTasks()
    writeToLogFile("*** MACRO START ***")
}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; QUEST PRIORITISATION & COMPLETION
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

startMacro(*) {
    global 

    SHINY_HOVERBOARD_MODIFIER := shinyHoverboardSetting.Value ? 20 / 27 : 1
    BEST_ZONE := Integer(bestZoneSetting.Text)
    SECOND_BEST_ZONE := BEST_ZONE - 1
    BEST_EGG := ZONE_MAP[BEST_ZONE].egg
    RARE_EGG := ZONE_MAP[BEST_ZONE].rareEgg
    WORLD := ZONE_MAP[BEST_ZONE].world

    ; Main loop to handle all macro actions repeatedly.
    loop {
        
        lvCurrent.Delete
        lvCurrent.Add(, "-", "-", "-", "-", "-")  ; Initialize with a default row.

        closeAllWindows()
        checkForMaxRank()
        applyAutoHatchSettings()
        loadQuestPriorities()
        loadQuestData()

        DATE_TODAY := FormatTime(A_Now, "yyyyMMdd")
        
        loopTimes := numberOfloopsSetting.Value  ; Retrieve the number of times the loop should run.

        ; Perform defined tasks for each iteration of the loop.
        loop loopTimes {
            checkForClaimRewards()  ; Check and claim any available game rewards.
            refreshQuests()  ; Update the list of quests from the game interface.
            currentloop := A_Index "/" loopTimes  ; Update the current loop count.
            setCurrentloop(currentloop)  ; Display the current loop count in the UI.

            ; Find the quest with the highest priority to execute.
            highestPriority := 0
            priorityIndex := 0
            failedQuests := 0
            loop lvQuests.GetCount() {  ; Iterate through all listed quests.
                currentPriority := lvQuests.GetText(A_Index, 5)
                currentPriority := (currentPriority == "") ? 0 : Integer(currentPriority)
                if (currentPriority > 0 && currentPriority >= highestPriority) {  ; Identify the highest priority quest.
                    priorityIndex := A_Index
                    highestPriority := currentPriority
                }
                if (lvQuests.GetText(A_Index, 3) == "?") {
                    failedQuests++  ; Count quests that failed to read correctly.
                }
            }

            ; Execute the quest with the highest priority or default to a waiting quest.
            if (priorityIndex > 0) {
                currentType := lvQuests.GetText(priorityIndex, 2)
                currentQuest := lvQuests.GetText(priorityIndex, 3)
                currentAmount := lvQuests.GetText(priorityIndex, 4)
                doQuest(currentType, currentQuest, currentAmount)
            } else if (failedQuests != lvQuests.GetCount()) {
                doQuest(100, "Waiting For A Quest")  ; Perform a default action if no specific quests are available.
            }
            
            if (getCurrentZone() == BEST_ZONE) {
                useUltimate()  ; Use the ultimate ability if in the best ZONE
            }

            checkForDisconnection()  ; Monitor and handle any disconnections.

        }

        eatFruit()  ; Consume fruit as part of the game actions.
        claimFreeGifts()  ; Claim any free gifts available in the game.

        if reconnectAfterloopsCompleteSetting.Value
            reconnectClient()

        ;Reload  ; Reload the script to refresh all settings and start fresh.
    }
}



addQuestToGui(quest) {
    ocrTextResult := quest
    questId := getquestId(ocrTextResult)  ; Identify the quest type from OCR results.
    questName := QUEST_DATA[questId]["Name"]  ; Retrieve the name of the quest from a map based on questId.
    questStatus := QUEST_DATA[questId]["Status"]  ; Get the status of the quest.
    questPriority := QUEST_PRIORITY[questId]  ; Determine the priority of the quest.
    questZone := QUEST_DATA[questId]["Zone"]  ; Get the associated quest zone.
    questAmount := fixAmount(ocrTextResult)  ; Correct the OCR-extracted amount if necessary.
    starsMultiplier := gamepassDoubleStarsSetting.Value ? 2 : 1  ; Determine star multiplier based on gamepass.
    questStars := starsMultiplier * A_Index  ; Calculate the total stars earned for this quest.
    lvQuests.Add(, questStars, questId, questName, questAmount, questPriority, questStatus, questZone, ocrTextResult)  ; Add quest data to the list view.
    writeToLogFile("  OCR Result: " ocrTextResult "   Id: " questId "   Quest: " questName "   Amount: " Round(questAmount, 0) "   Priority: " questPriority)
    waitTime("QuestAfterOcrCompleted")  ; Pause until OCR processing is confirmed complete.
}

getquestId(ocrTextResult) {
    ; Iterate through each quest in the globally defined Quest.
    for questKey, questItem in QUEST_DATA {
        ; Check if the OCR text matches the regex pattern defined for the current quest.
        if (regexMatch(ocrTextResult, questItem["Regex"])) {
            return questKey  ; If a match is found, return the key associated with this quest.
        }
    }
    return "-"  ; If no matches are found after checking all quests, return a default value.
}


doQuest(questId, questName, questAmount := 1) {
    activateRoblox()  ; Focus on the Roblox window to ensure actions are sent to the right place.
    writeToLogFile("*** ACTIVE QUEST***   Id: " questId "   Quest: " questName "   Amount: " Round(questAmount, 0) "   loop: " getCurrentloop())

    ; Check if the current quest is still active, and stop hatching if in an egg area.
    if (questName != getCurrentQuest()) {
        if getCurrentArea() == "Best Egg"
            stopHatching()  ; Stop hatching actions if the area is for hatching eggs.
        else if getCurrentArea() == "Rare Egg" {
            stopHatching() 
            applyAutoHatchSettings()
        }
    }

    setCurrentQuest(questName)  ; Update the system with the new or current quest.

    ; Perform actions based on the quest ID provided.
    Switch questId {
        Case "7":  ; Quest for earning diamonds.
            earnDiamonds()
        Case "9":  ; Quest for breaking diamond breakables.
            breakDiamondBreakables()
        Case "14":  ; Quest for collecting potions.
            doQuestUpgradePotions(questId, questAmount)
        Case "15":  ; Quest for collecting enchants.
            doQuestUpgradeEnchants(questId, questAmount)
        Case "20":  ; Quest for hatching the best egg.
            hatchBestEgg(questAmount)
        Case "21":  ; Quest for breaking breakables in the best area.
            breakBreakables()
        Case "33":  ; Quest for using flags.
            useFlags(questAmount)
        Case "34-1", "34-2", "34-3":  ; Quest for using specific tier potions.
            usePotions(questId, questAmount)
        Case "35":  ; Quest for eating fruitArray.
            useFruit(questAmount)
        Case "37":  ; Quest for breaking coin jars.
            breakBasicCoinJars(questId, questAmount)
        Case "38":  ; Quest for breaking comets.
            breakComets(questId, questAmount)
        Case "39":  ; Quest for breaking mini-chests.
            breakMiniChests()
        Case "40":  ; Quest for making golden pets from the best egg.
            doQuestMakeGoldenPets(questId, questAmount)
        Case "41":  ; Quest for making rainbow pets from the best egg.
            doQuestMakeRainbowPets(questId, questAmount)
        Case "42":  ; Quest for hatching rare pets.
            hatchRarePetEgg()
        Case "43":  ; Quest for breaking pinatas.
            breakPinatas(questId, questAmount)
        Case "44":  ; Quest for breaking lucky blocks.
            breakLuckyBlocks(questId, questAmount)
        Case "66":  ; "Break Superior Mini-Chests in Best Area"
            breakSuperiorMiniChests()
        Case "100":  ; Default action when there are no specific quests.
            waitForQuest()
        Default:
            ; No action for undefined questId.
    }
}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; QUEST FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

breakComets(questId, questAmount) {
    farmBestZone()  ; Navigate to the optimal zone for breaking comets.

    keybind := getKeybind("Comet")
    timeToBreakComet := breakCometsSetting.Value

    loop questAmount {
        currentAction := "Breaking Comets (" A_Index "/" questAmount ")"
        setCurrentAction(currentAction)  ; Update and display the current action status.
        writeToLogFile(currentAction)  ; Log the current action status.

        itemUsed := useBoostKeybind(keybind, questId)
        if !itemUsed
            break  ; Exit the loop if the item is not used successfully.

        newTime := DateAdd(A_Now, timeToBreakComet, "Seconds")
        loop {
            if PixelSearch(&foundX, &foundY,  ; Perform pixel search within specified coordinates and color.
                COMET_COLOUR["Start"][1], COMET_COLOUR["Start"][2], 
                COMET_COLOUR["End"][1], COMET_COLOUR["End"][2],  
                COMET_COLOUR["Colour"], COMET_COLOUR["Tolerance"])
            {
                leftClickMouse([foundX, foundY])  ; Click on the comet's location if found.
            }

            if A_Now > newTime {
                break  ; Exit the inner loop if the time limit is reached.
            }
        }
    }
}

breakPinatas(questId, questAmount) {
    farmBestZone()  ; Navigate to the optimal zone for breaking piñatas.

    keybind := getKeybind("Pinata")
    timeToBreakPinata := breakPinatasSetting.Value
    
    ; loop through the number of piñatas to break.
    loop questAmount {
        currentAction := "Breaking Pinatas (" A_Index "/" questAmount ")"
        setCurrentAction(currentAction)  ; Update and display the current action status.
        writeToLogFile(currentAction)  ; Log the current action status.

        itemUsed := useBoostKeybind(keybind, questId)
        if !itemUsed
            break  ; Exit the loop if the item is not used successfully.

        newTime := DateAdd(A_Now, timeToBreakPinata, "Seconds")
        loop {
            ; Perform pixel search within specified coordinates and color.
            if PixelSearch(&foundX, &foundY, 
                PINATA_COLOUR["Start"][1], PINATA_COLOUR["Start"][2], 
                PINATA_COLOUR["End"][1], PINATA_COLOUR["End"][2],  
                PINATA_COLOUR["Colour"], PINATA_COLOUR["Tolerance"])
            {
                leftClickMouse([foundX, foundY])  ; Click on the piñata's location if found.
            }

            if A_Now > newTime {
                break  ; Exit the inner loop if the time limit is reached.
            }
        }
    }
}

breakLuckyBlocks(questId, questAmount) {
    farmBestZone()  ; Navigate to the optimal zone for breaking Lucky Blocks.
    keybind := getKeybind("Lucky Block")
    timeToBreakLuckyBlock := breakLuckyBlocksSetting.Value

    ; loop through the number of Lucky Blocks to break.
    loop questAmount {
        currentAction := "Breaking Lucky Blocks (" A_Index "/" questAmount ")"
        setCurrentAction(currentAction)  ; Display the current action in the UI.
        writeToLogFile(currentAction)  ; Log the current action status.
        
        itemUsed := useBoostKeybind(keybind, questId)
        if !itemUsed
            break  ; Exit the loop if the item is not used successfully.

        newTime := DateAdd(A_Now, timeToBreakLuckyBlock, "Seconds")
        
        loop {
            ; Perform pixel search for pink Lucky Blocks within specified coordinates and color.
            if PixelSearch(&foundX, &foundY, 
                LUCKY_BLOCK_PINK["Start"][1], LUCKY_BLOCK_PINK["Start"][2], 
                LUCKY_BLOCK_PINK["End"][1], LUCKY_BLOCK_PINK["End"][2],  
                LUCKY_BLOCK_PINK["Colour"], LUCKY_BLOCK_PINK["Tolerance"]) 
            {
                leftClickMouse([foundX, foundY])  ; Click on the Lucky Block's location if found.
            }

            ; Perform pixel search for blue Lucky Blocks within specified coordinates and color.
            if PixelSearch(&foundX, &foundY, 
                LUCKY_BLOCK_BLUE["Start"][1], LUCKY_BLOCK_BLUE["Start"][2], 
                LUCKY_BLOCK_BLUE["End"][1], LUCKY_BLOCK_BLUE["End"][2],  
                LUCKY_BLOCK_BLUE["Colour"], LUCKY_BLOCK_BLUE["Tolerance"]) 
            {
                leftClickMouse([foundX, foundY])  ; Click on the Lucky Block's location if found.
            }

            ; Perform pixel search for yellow Lucky Blocks within specified coordinates and color.
            if PixelSearch(&foundX, &foundY, 
                LUCKY_BLOCK_YELLOW["Start"][1], LUCKY_BLOCK_YELLOW["Start"][2], 
                LUCKY_BLOCK_YELLOW["End"][1], LUCKY_BLOCK_YELLOW["End"][2],  
                LUCKY_BLOCK_YELLOW["Colour"], LUCKY_BLOCK_YELLOW["Tolerance"]) 
            {
                leftClickMouse([foundX, foundY])  ; Click on the Lucky Block's location if found.
            }

            if A_Now > newTime {
                break  ; Exit the inner loop if the time limit is reached.
            }
        }
    }
}

breakBasicCoinJars(questId, questAmount) {
    farmBestZone()  ; Navigate to the optimal zone for breaking coin jars.

    ; loop through the number of coin jars to break.
    loop questAmount {
        currentAction := "Breaking Coin Jars (" A_Index "/" questAmount ")"
        setCurrentAction(currentAction)  ; Update and display the current action status.
        writeToLogFile(currentAction)  ; Log the current action status.

        keybind := getKeybind("Basic Coin Jar")
        itemUsed := useBoostKeybind(keybind, questId)
        if !itemUsed
            break  ; Exit the loop if the item is not used successfully.

        loopAmountOfSeconds(breakBasicCoinJarsSetting.Value)  ; Wait for the specified amount of time to break the coin jar.
    }
}

breakMiniChests() {
    farmBestZone()  ; Navigate to the optimal zone for breaking mini-chests.

    currentAction := "Breaking Mini-Chests"
    setCurrentAction(currentAction)  ; Update and display the current action status.
    writeToLogFile(currentAction)  ; Log the current action status.

    loopAmountOfSeconds(breakMiniChestsSetting.Value)  ; Wait for the specified amount of time to break the mini-chests.
}

breakSuperiorMiniChests() {
    farmBestZone()  ; Navigate to the optimal zone for breaking superior mini-chests.

    currentAction := "Breaking Superior Mini-Chests"
    setCurrentAction(currentAction)  ; Update and display the current action status.
    writeToLogFile(currentAction)  ; Log the current action status.

    loopAmountOfSeconds(breakSuperiorMiniChestsSetting.Value)  ; Wait for the specified amount of time to break the superior mini-chests.
}

useFruit(amountToUse) {
    amountPerFruit := Ceil(amountToUse / 6)  ; Calculate how many times each fruit type should be used by dividing the total amount by 6.
    fruitArray := ["Apple", "Banana", "Orange", "Pineapple", "Rainbow Fruit", "Watermelon"] ; List of fruitArray to be used.
    ; loop through each fruit in the list and apply the action.
    for fruit in fruitArray {
        useItem(fruit, 2, amountPerFruit)  ; Use the calculated amount of each fruit.
    }
}

useFlags(amountToUse) {
    flagsUsed := 0
    questFlag := questFlagSetting.Text
    keybind := getKeybind(questFlag)
    questCompleted := false

    for zone in USE_FLAG_ZONES {  ; Iterate through each zone
        teleportToZone(zone)  ; Teleport to the current zone
        moveToZoneCentre(zone)  ; Move to the center of the zone 
        shootDownBalloons()  ; Shoot down balloons in the zone

        loop {
            flagsUsed += 1
            setCurrentAction("Using Flags (" flagsUsed "/" amountToUse ")")  ; Update and display the current action status
            SendEvent keybind  ; Send the keybind event to use the flag
            Sleep 250  ; Wait for 250 milliseconds

            if isOopsWindowOpen() {
                flagsUsed -= 1  ; Decrement the flag count if 'Oops' window is open
                break  ; Exit the loop
            }

            questCompleted := (flagsUsed == amountToUse)
            if questCompleted
                break  ; Exit the loop if the quest is completed
        }

        closeAllWindows()  ; Close all open windows
        moveMouseToCentreOfScreen()  ; Re-center the mouse on the screen

        if questCompleted
            return  ; Exit the function if the quest is completed
    }
}


usePotions(questId, amountToUse) {
    Switch questId {  ; Determine the potion type based on the quest ID.
        Case "34-1":
            setting := tier3PotionToUseSetting.Text
            keybind := getKeybind(setting)
        Case "34-2":
            setting := tier4PotionToUseSetting.Text
            keybind := getKeybind(setting)
        Case "34-3":
            setting := tier5PotionToUseSetting.Text
            keybind := getKeybind(setting)
        Default:
            keybind := ""  ; No action for undefined questId.
    }
    
    if keybind != "" {
        loop amountToUse {
            currentAction := "Using potions (" A_Index "/" amountToUse ")"
            setCurrentAction(currentAction)  ; Update and display the current action status.
            SendEvent keybind  ; Send the keybind for using the potion.
            Sleep 500  ; Wait for 0.5 seconds between each use.
        }
    }
}

breakBreakables() {
    farmBestZone()  ; Navigate to the optimal zone for breaking breakables.

    currentAction := "Breaking Breakables"
    setCurrentAction(currentAction)  ; Update and display the current action status.
    writeToLogFile(currentAction)  ; Log the current action status.

    loopAmountOfSeconds(breakBreakablesSetting.Value)  ; Wait for the specified amount of time to break the breakables.
}


breakDiamondBreakables() {
    if gamepassVipSetting.Value {  ; Check for VIP gamepass availability.
        goToVipArea()  ; Navigate to VIP area for exclusive activities.
    } else {
        farmBestZone()  ; Navigate to the best zone for general activities.
    }

    currentAction := "Breaking Diamond Breakables"
    setCurrentAction(currentAction)  ; Update and display the current action status.
    writeToLogFile(currentAction)  ; Log the current action status.

    loopAmountOfSeconds(breakDiamondBreakablesSetting.Value)  ; Wait for the specified amount of time to break the diamond breakables.
}

earnDiamonds() {
    farmBestZone()  ; Navigate to the best zone for earning diamonds.

    currentAction := "Earning Diamonds"
    setCurrentAction(currentAction)  ; Update and display the current action status.
    writeToLogFile(currentAction)  ; Log the current action status.

    loopAmountOfSeconds(earnDiamondsSetting.Value)  ; Wait for the specified amount of time to earn diamonds.
}




waitForQuest() {
    farmBestZone()  ; Navigate to the optimal zone for breaking activities.
    setCurrentAction("Breaking Breakables")  ; Indicate the current default activity to the user.
    loopAmountOfSeconds(breakBreakablesSetting.Value)    
    setCurrentAction("-")  ; Reset the UI display to indicate the completion of the default activity.
}


loopAmountOfSeconds(amountOfSeconds) {
    totalSeconds := Floor(amountOfSeconds)  ; Convert milliseconds to seconds for duration.
    setCurrentTime(totalSeconds)  ; Set and display the countdown timer.
    loop totalSeconds {  ; loop through the total duration in seconds.
        setCurrentTime(totalSeconds - A_Index)  ; Update countdown timer each second.
        Sleep ONE_SECOND  ; Wait for one second, simulating the time it takes to break each breakable.
    }
}




; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; AUTO-RECONNECT FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰


checkForDisconnection() {
    setCurrentAction("Checking Connection")  ; Indicate checking connection status.

    isDisconnected := checkForDisconnect()  ; Check for any disconnection.
    if (isDisconnected == true) {
        reconnectClient()  ; Reconnect if disconnected.
        Reload  ; Reload the script to refresh all settings and start fresh.
    }

    setCurrentAction("-")  ; Reset action status.
}


reconnectClient(*) {
    writeToLogFile("*** RECONNECTING ***")
    reconnectTime := reconnectionTimeSecondsSetting.Value  ; Get the reconnect duration.

    privateServerLinkCode := privateServerLinkCodeSetting.Value  ; Get the private server code.
    if (privateServerLinkCode == "") {
        try Run "roblox://placeID=8737899170"  ; Default reconnect without private server.
    }
    else {
        try Run "roblox://placeID=8737899170&linkCode=" privateServerLinkCode  ; Reconnect using private server link.
    }

    loop reconnectTime {
        setCurrentAction("Reconnecting " A_Index "/" reconnectTime)  ; Update reconnecting progress.
        Sleep ONE_SECOND  ; Wait for 1 second.
    }
}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; ULTIMATE FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

; ----------------------------------------------------------------------------------------
; useUltimate Function
; Description: Activates the ultimate ability in the game.
; Operation:
;   - Updates the current action to indicate that the ultimate ability is being used.
;   - Clicks on the ultimate button and waits for the action to process.
;   - Updates the current action to indicate completion.
; Dependencies:
;   - setCurrentAction, leftClickMouseAndWait: Functions for updating UI actions and performing clicks.
; Return: None; interacts with the game's UI to use an ultimate ability.
; ----------------------------------------------------------------------------------------
useUltimate() {
    setCurrentAction("Using Ultimate")
    leftClickMouseAndWait(COORDS["Controls"]["Ultimate"], "UltimateAfterUsed")
    setCurrentAction("-")
}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; FRUIT FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰


eatFruit() {
    if eatFruitSetting.Value {
        fruitArray := ["Apple", "Banana", "Orange", "Pineapple", "Rainbow Fruit", "Watermelon"]
        for fruitItem in fruitArray {
            useItem(fruitItem, 2, 2, true)
        }
        closeAllWindows()
    }
}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; AUTO FARM FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

clickAutoFarmButton() {
    if !gamepassAutoFarmSetting.Value
        return
    
    ; Only proceed if the auto-farm gamepass is active.
    setCurrentAction("Enabling/Disabling Auto Farm...")

    filePath := BUTTON_IMAGES "AutoFarm.bmp"

    if not FileExist(filePath)
        return false

    buttonFound := false
    loop 5 {
        Sleep 100
        if ImageSearch(&foundX, &foundY, BUTTON_SEARCH_AREA[1], BUTTON_SEARCH_AREA[2], 
            BUTTON_SEARCH_AREA[3], BUTTON_SEARCH_AREA[4], " *15 " filePath) {
            MouseMove foundX, foundY  ; Move the mouse to the second color found.
            activateMouseHover()  ; Activate mouse hover.
            leftClickMouseAndWait([foundX, foundY], 100)  ; Click the button and wait.
            buttonFound := true
            break
        }
        if buttonFound
            break
    }

    moveMouseToCentreOfScreen()
    setCurrentAction("-")
}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; AUTO HATCH FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰


applyAutoHatchSettings(chargedOverride := false) {
    activateRoblox()  ; Activate the Roblox window.
    closeAllWindows()
    openAutoHatchMenu()
    setCurrentAction("Updating Auto Hatch Settings")

    loop 10 {
        if PixelSearch(&foundX, &foundY, 
            AUTO_HATCH_MENU["Start"][1], AUTO_HATCH_MENU["Start"][2],  
            AUTO_HATCH_MENU["End"][1], AUTO_HATCH_MENU["End"][2],  
            AUTO_HATCH_MENU["Colour"], AUTO_HATCH_MENU["Tolerance"])
            leftClickMouseAndWait([foundX, foundY], 100)
        else
            break
    }

    if chargedOverride
        leftClickMouseAndWait(COORDS["HatchSettings"]["ChargedEggsOff"], 200)

    closeAllWindows()
}

openAutoHatchMenu() {
    filePath := BUTTON_IMAGES "AutoHatch.bmp"

    if not FileExist(filePath)
        return false

    loop 5 {
        buttonFound := false
        Sleep 100
        if ImageSearch(&foundX, &foundY, BUTTON_SEARCH_AREA[1], BUTTON_SEARCH_AREA[2], 
            BUTTON_SEARCH_AREA[3], BUTTON_SEARCH_AREA[4], " *10 " filePath) {
            MouseMove foundX, foundY  ; Move the mouse to the second color found.
            activateMouseHover()  ; Activate mouse hover.
            leftClickMouseAndWait([foundX, foundY], 100)  ; Click the button and wait.
            buttonFound := true
            break
        }
        if buttonFound
            break
    }
}

; ----------------------------------------------------------------------------------------
; closeAutoHatchMenu Function
; Description: Closes the auto hatch menu by clicking the 'X' button.
; Operation:
;   - Directly clicks the close button using coordinates from the UI control structure.
; Dependencies:
;   - leftClickMouseAndWait: Function to perform mouse click and wait operations.
; Return: None; interacts directly with the game's UI.
; ----------------------------------------------------------------------------------------
closeAutoHatchMenu() {
    closeWindow(AUTOHATCH_MENU_X)
}




; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; FREE GIFTS / REWARDS FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰


claimFreeGifts() {
    if !areFreeGiftsReady()  ; Check if the free gifts are ready to be claimed.
        return
        
    openFreeGiftsMenu()

    firstGiftLocation := COORDS["FreeRewards"]["Reward1"]  ; Get coordinates for the first gift.
    giftOffset := COORDS["FreeRewards"]["Offset"]  ; Get offset for positioning between gifts.

    ; Iterate over three rows of gifts.
    loop 3 {
        giftToClickY := firstGiftLocation[2] + ((A_Index - 1) * giftOffset[2])  ; Calculate y-coordinate for the current row.

        ; Iterate over four gifts in the current row.
        loop 4 {
            giftToClickX := firstGiftLocation[1] + ((A_Index - 1) * giftOffset[1])  ; Calculate x-coordinate for the current gift.
            giftToClick := [giftToClickX, giftToClickY]  ; Form the coordinate array for the gift.
            MouseMove giftToClickX, giftToClickY
            activateMouseHover()
            leftClickMouseAndWait(giftToClick, "FreeGiftAfterClicked")  ; Click on the gift to claim it.
        }
    }

    closeFreeGiftsMenu()

}

openFreeGiftsMenu() {
    filePath := BUTTON_IMAGES "FreeGifts.bmp"

    if not FileExist(filePath)
        return false

    loop 5 {
        buttonFound := false
        Sleep 100
        if ImageSearch(&foundX, &foundY, BUTTON_SEARCH_AREA[1], BUTTON_SEARCH_AREA[2], 
            BUTTON_SEARCH_AREA[3], BUTTON_SEARCH_AREA[4], " *10 " filePath) {
            MouseMove foundX, foundY  ; Move the mouse to the second color found.
            activateMouseHover()  ; Activate mouse hover.
            leftClickMouseAndWait([foundX, foundY], 100)  ; Click the button and wait.
            buttonFound := true
            break
        }
        if buttonFound
            break
    }    
}




; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; ZONE/AREA TRAVEL FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰



goToVoid() {
    currentZone := getCurrentZone()

    if (currentZone == "Void" || currentZone == "-")
        teleportToZone(BEST_ZONE)  

    openTeleportMenu()
    setCurrentZone("Void")
    setCurrentAction("Teleporting to the Void")

    teleportToWorld(3)
}




farmBestZone() {
    if getCurrentArea() != "Best Area" {

        clickAutoFarmButton()

        if getCurrentZone() == "-" || getCurrentZone() == BEST_ZONE
            teleportToZone(SECOND_BEST_ZONE)

        teleportToZone(BEST_ZONE)
        moveToZoneCentre(BEST_ZONE)

        setCurrentArea("Best Area") 
        clickAutoFarmButton()
    }

    if bestAreaUseFlagSetting.Value {  ; Check for flag usage setting.
        setting := bestAreaFlagSetting.Text
        keybind := getKeybind(setting)
        SendEvent keybind  ; Use the flag keybind.
    }
    if bestAreaUseSprinklerSetting.Value { ; Check for sprinkler usage setting.
        keybind := getKeybind("Sprinkler")
        SendEvent keybind  ; Use the sprinkler keybind.
    }

    useUltimate()  ; Use the ultimate ability.
    loop 5 {
        closeAllWindows()  ; Close all open windows.
    }
    zoomCameraOut(1500)  ; Zoom the camera out.
    shootDownBalloons()  ; Shoot down balloons.
}



; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; INVENTORY FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

; ----------------------------------------------------------------------------------------
; openInventoryMenu Function
; Description: Opens the inventory menu by simulating a key press.
; Operation:
;   - Sends a keystroke to open the inventory (default key 'f').
;   - Waits for a short delay to ensure the inventory menu is fully opened.
; Dependencies:
;   - SendEvent: Sends specified keystrokes or mouse events.
;   - Wait: Pauses the script execution for a predefined time or until a certain condition is met.
; Return: None; interacts directly with the game's UI.
; ----------------------------------------------------------------------------------------
openInventoryMenu() {
    activateRoblox()
    SendEvent "{f}"  ; Trigger the inventory open key.
    waitTime("InventoryAfterOpened")  ; Ensure inventory is opened.
}

; ----------------------------------------------------------------------------------------
; closeInventoryMenu Function
; Description: Closes the inventory menu by clicking the 'X' (close) button.
; Operation:
;   - Performs a left click at the 'X' button's coordinates and waits until the menu is observed to be closed.
; Dependencies:
;   - leftClickMouseAndWait: Performs a left-click and waits for a UI response.
; Return: None; directly interacts with the game's UI.
; ----------------------------------------------------------------------------------------
closeInventoryMenu() {
    closeWindow(INVENTORY_MENU_X)
}

; ----------------------------------------------------------------------------------------
; clickInventoryTab Function
; Description: Navigates to a specific tab within the inventory menu.
; Parameters:
;   - Tab: Numerical identifier of the tab (e.g., 2 for Items, 3 for Potions).
; Operation:
;   - Determines the coordinates of the specified tab.
;   - Clicks on the tab to switch to it.
; Dependencies:
;   - leftClickMouseAndWait: Performs a left-click and waits for a UI response.
; Return: None; modifies the visible inventory tab.
; ----------------------------------------------------------------------------------------
clickInventoryTab(tabToUse) {
    Switch tabToUse {
        Case 2:  ; For "Items" tab.
            inventoryTab := COORDS["Inventory"]["Items"]
        Case 3:  ; For "Potions" tab.
            inventoryTab := COORDS["Inventory"]["Potions"]
        Default:
    }
    leftClickMouseAndWait(inventoryTab, "InventoryAfterTabClicked")  ; Click the tab.
}

; ----------------------------------------------------------------------------------------
; clickInventorySearchBox Function
; Description: Clicks the search box in the inventory to enable text entry.
; Operation:
;   - Clicks the search box and waits for the UI to show it's active.
; Dependencies:
;   - leftClickMouseAndWait: Performs a left-click and waits for a UI response.
; Return: None; prepares the search box for text input.
; ----------------------------------------------------------------------------------------
clickInventorySearchBox() {
    leftClickMouseAndWait(COORDS["Inventory"]["Search"], "InventoryAfterSearchClicked")  ; Activate the search box.
}

; ----------------------------------------------------------------------------------------
; searchInventoryForItem Function
; Description: Searches for an item within the specified tab of the inventory.
; Parameters:
;   - Tab: The tab to search under (e.g., Items, Potions).
;   - Item: The name of the item to search for.
; Operation:
;   - Sends the item name to the search box.
;   - Waits for the search to complete.
;   - Optionally, could include a pixel search to verify item presence.
; Dependencies:
;   - SendText, Wait: Used for entering text and pausing execution.
; Return: Boolean indicating whether the item was found (demonstrative, depending on pixel search results).
; ----------------------------------------------------------------------------------------
searchInventoryForItem(tabToUse, itemToUse) {
    SendText(itemToUse)  ; Input the item name.
    waitTime("InventoryAfterSearchCompleted")  ; Wait for search results.
    Switch tabToUse {
        Case 2:  ; Locate first item slot under "Items".
            inventoryTab := COORDS["Inventory"]["Item1"]
        Case 3:  ; Locate first item slot under "Potions".
            inventoryTab := COORDS["Inventory"]["Potion1"]
        Default:
    }
    return !(PixelSearch(&X, &Y, inventoryTab[1], inventoryTab[2], inventoryTab[1], inventoryTab[2], 0xFFFFFF, 5))  ; Optional: Check item's presence.
}


useItem(itemToUse, tabToUse := 2, amountToUse := 1, useMaxItem := false, checkForitemFound := false) {
    openInventoryMenu()  ; Open the inventory to access items.
    clickInventoryTab(tabToUse)  ; Navigate to the specified tab in the inventory.
    clickInventorySearchBox()  ; Activate the search box for item input.

    isitemFound := searchInventoryForItem(tabToUse, itemToUse)

    ; Use the item if it's found.
    if !checkForitemFound || (checkForitemFound && isitemFound) {
        clickItem(tabToUse, amountToUse, useMaxItem)  ; Interact with the item based on the specified amount and max usage flag.
    }
    
    closeAllWindows()
    moveMouseToCentreOfScreen()  ; Re-center the mouse on the screen.
    return isitemFound  ; Return the result of the item search and use process.
}


clickItem(tabToUse, amountToUse, useMaxItem) {
    ; Identify first item coordinates based on inventory tab.
    Switch tabToUse {
        Case 2:  ; "Items"
            inventoryTab := COORDS["Inventory"]["Item1"]
        Case 3:  ; "Potions"
            inventoryTab := COORDS["Inventory"]["Potion1"]
        Default:
    }

    ; Initialize flag to track if maximum usage operation was performed.
    multipleItemUsed := false

    ; Handle max usage based on user input.
    if useMaxItem {
        rightClickMouseAndWait(inventoryTab, 200)  ; Right-click to open options for using items.
        ocrObjectResult := getOcrResult(COORDS["OCR"]["FruitMenuStart"], COORDS["OCR"]["FruitMenuSize"], 5, false)  ; Obtain text from the item menu.
        ocrTextResult := ocrObjectResult.Text

        ; Determine the highest quantity option available from OCR results.
        searchString := ""
        if InStr(ocrTextResult, "Max") {
            searchString := "Max"
        } else if InStr(ocrTextResult, "20") {
            searchString := "20"
        } else if InStr(ocrTextResult, "10") {
            searchString := "10"
        } else if InStr(ocrTextResult, "5") {
            searchString := "5"
        }
        Sleep 200
        
        ; Click the highest available quantity button if identified.
        if (searchString != "") {
            try {
                eatMaxButtonStart := ocrObjectResult.FindString(searchString)
                Sleep 200
                eatMaxButton := [COORDS["OCR"]["FruitMenuStart"][1] + eatMaxButtonStart.X + (eatMaxButtonStart.W / 2), COORDS["OCR"]["FruitMenuStart"][2] + eatMaxButtonStart.Y + (eatMaxButtonStart.H / 2)]
                leftClickMouseAndWait(eatMaxButton, 200)
                multipleItemUsed := true
            }
            catch {
                multipleItemUsed := false  ; Handle cases where the item moved or the OCR failed.
            }
        } else {
            leftClickMouseAndWait(inventoryTab, "InventoryAfterItemClicked")  ; Fallback if no max options found.
        }
    }

    ; If not using maximum amount, perform standard item click actions.
    if (!multipleItemUsed) {
        if (amountToUse == 1) {
            leftClickMouseAndWait(inventoryTab, "InventoryAfterItemClicked")  ; Single item interaction.
        } else {
            loop amountToUse {  ; Multiple item interactions based on Amount.
                leftClickMouseAndWait(inventoryTab, "InventoryBetweenMultipleItemsUsed")
            }
        }
    }
}







; ----------------------------------------------------------------------------------------
moveMouseToCentreOfScreen() {
    MouseMove 400, 300  ; Move cursor to screen center (assuming 800x600 resolution).
    activateMouseHover()
    Sleep 50  ; Pause to stabilize cursor position.
}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; CAMERA FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

; ----------------------------------------------------------------------------------------
; zoomCameraOut Function
; Description: Holds the 'o' key down to zoom out the camera for a specified duration.
; Parameters:
;   - milliseconds: Duration in milliseconds for which the 'o' key is held down.
; Operation:
;   - Presses and holds the 'o' key.
;   - Pauses execution for the duration specified by 'milliseconds'.
;   - Releases the 'o' key.
; Return: None; modifies the camera zoom level in an application.
; ----------------------------------------------------------------------------------------
zoomCameraOut(milliseconds) {
    Send "{o Down}"  ; Press and hold the 'o' key.
    Sleep milliseconds  ; Wait for the specified duration.
    Send "{o Up}"  ; Release the 'o' key.
}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; MOUSE FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

; ----------------------------------------------------------------------------------------
; leftClickMouse Function
; Description: Executes a left-click at a specified screen position.
; Parameters:
;   - Position: Can be an array with X and Y coordinates or a string key for coordinates from 'COORDS'.
; Operation:
;   - Checks if 'Position' is an object (array) or a string.
;   - Performs a left-click at the appropriate coordinates.
; Return: None; directly interacts with the UI by performing a click.
; ----------------------------------------------------------------------------------------
leftClickMouse(clickPosition) {
    if IsObject(clickPosition)
        SendEvent "{Click, " clickPosition[1] ", " clickPosition[2] ", 1}"  ; Left-click using array coordinates.
    else
        SendEvent "{Click, " COORDS[clickPosition][1] ", " COORDS[clickPosition][2] ", 1}"  ; Left-click using named position coordinates.
}

; ----------------------------------------------------------------------------------------
; leftClickMouseAndWait Function
; Description: Executes a left-click at a specified screen position, followed by a pause.
; Parameters:
;   - Position: Can be an array with X and Y coordinates or a string key for named coordinates from 'COORDS'.
;   - Time: Duration in milliseconds to wait after the click.
; Operation:
;   - Determines if 'Position' is an object (array) or a string, and performs a left-click at the coordinates.
;   - Waits for the specified 'Time' to allow UI interactions to complete.
; Return: None; affects the UI by executing a click and delay.
; ----------------------------------------------------------------------------------------
leftClickMouseAndWait(clickPosition, timeToWait) {
    if IsObject(clickPosition)
        SendEvent "{Click, " clickPosition[1] ", " clickPosition[2] ", 1}"  ; Left-click using array coordinates.
    else
        SendEvent "{Click, " COORDS[clickPosition][1] ", " COORDS[clickPosition][2] ", 1}"  ; Left-click using named position coordinates.
    waitTime(timeToWait)  ; Pause for specified duration.
}

; ----------------------------------------------------------------------------------------
; rightClickMouse Function
; Description: Performs a right-click at the specified position on the screen.
; Parameters:
;   - Position: An array of X and Y coordinates, or a string key to access coordinates from the 'COORDS' object.
; Operation:
;   - Determines if 'Position' is an object or a string.
;   - Executes a right-click at the resolved coordinates.
; Return: None; this function performs a UI action without returning data.
; ----------------------------------------------------------------------------------------
rightClickMouse(clickPosition) {
    if IsObject(clickPosition)
        SendEvent "{Click, " clickPosition[1] ", " clickPosition[2] ", 1, Right}"  ; Right-click using direct coordinates.
    else
        SendEvent "{Click, " COORDS[clickPosition][1] ", " COORDS[clickPosition][2] ", 1, Right}"  ; Right-click using coordinates from 'COORDS'.
}

; ----------------------------------------------------------------------------------------
; rightClickMouseAndWait Function
; Description: Executes a right-click at a specific position and waits for a specified duration.
; Parameters:
;   - Position: Can be an array with X and Y coordinates or a key to retrieve coordinates from 'COORDS'.
;   - Time: Duration in milliseconds to wait after the click.
; Operation:
;   - Determines if 'Position' is an array or a string and performs a right-click at the coordinates.
;   - Pauses execution for the specified 'Time'.
; Return: None (affects the UI by performing click and wait operations).
; ----------------------------------------------------------------------------------------
rightClickMouseAndWait(clickPosition, timeToWait) {
    if IsObject(clickPosition)
        SendEvent "{Click, " clickPosition[1] ", " clickPosition[2] ", 1, Right}"  ; Right-click using array coordinates.
    else
        SendEvent "{Click, " COORDS[clickPosition][1] ", " COORDS[clickPosition][2] ", 1, Right}"  ; Right-click using named position coordinates.
    waitTime(timeToWait)  ; Delay following the click.
}

; ----------------------------------------------------------------------------------------
; shiftLeftClickMouse Function
; Description: Performs a shift-left-click at a specified position. Useful for selection actions that require degreesToMove keys.
; Parameters:
;   - Position: Can be an array with X and Y coordinates, or a key to retrieve coordinates from 'COORDS'.
; Operation:
;   - Holds down the shift key.
;   - Determines whether 'Position' is an object (array) or string and performs a click using appropriate coordinates.
;   - Releases the shift key.
; Return: None (directly interacts with the UI).
; ----------------------------------------------------------------------------------------
shiftLeftClickMouse(clickPosition) {
    SendEvent "{Shift down}"  ; Hold shift key.
    if IsObject(clickPosition)
        SendEvent "{Click, " clickPosition[1] ", " clickPosition[2] ", 1}"  ; Click at array coordinates.
    else
        SendEvent "{Click, " COORDS[clickPosition][1] ", " COORDS[clickPosition][2] ", 1}"  ; Click at named position coordinates.
    SendEvent "{Shift up}"  ; Release shift key.
}


activateMouseHover() {
    MouseMove 1, 0,, "R"
    Sleep 10
    MouseMove -1, 0,, "R"
    Sleep 10
}

closeFreeGiftsMenu() {
    closeWindow(FREE_GIFTS_MENU_X)
}

; ----------------------------------------------------------------------------------------
; scrollMouseWheel Function
; Description: Scrolls the mouse wheel in a specified direction for a given number of increments.
; Parameters:
;   - Direction: The direction to scroll ('up' or 'down').
;   - Scrolls: The number of increments to scroll.
; Operation:
;   - loops through the number of specified scrolls.
;   - Sends a scroll command in the given direction for each iteration.
;   - Includes a brief pause between scrolls to simulate a realistic scrolling speed.
; Return: None; directly manipulates the mouse wheel.
; ----------------------------------------------------------------------------------------
scrollMouseWheel(scrollDirection, timesToScroll := 1) {
    loop timesToScroll {  ; Repeat scroll for the number of specified increments.
        Send scrollDirection  ; Send scroll command in the specified direction.
        Sleep 50  ; Short pause to mimic natural scrolling behavior.
    }
}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; HOVERBOARD FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

; ----------------------------------------------------------------------------------------
; clickHoverboard Function
; Description: Simulates pressing the 'q' key to start or stop riding the hoverboard and waits for a specified time to ensure the action is completed.
; Operation:
;   - Sends the 'q' key event to toggle the hoverboard.
;   - Waits for a specific duration based on whether starting or stopping the hoverboard.
; Dependencies:
;   - SendEvent: Function that sends a key event.
;   - waitTime: Function that pauses execution for a specified duration.
; Parameters:
;   - startRiding: Boolean indicating whether to start (true) or stop (false) riding the hoverboard. Default is true.
; Return: None
; ----------------------------------------------------------------------------------------
clickHoverboard(startRiding := true) {
    SendEvent "{q}"  ; Simulate pressing the 'q' key to toggle the hoverboard.
    
    if (startRiding == true)
        waitTime("HoverboardAfterEquipped")  ; Wait for the hoverboard to be equipped.
    else
        waitTime(200)  ; Wait for a short duration when stopping the hoverboard.
}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; OCR FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰


getOcrResult(ocrStart, ocrSize, ocrScale, returnText := true) {
    ; Retrieve the position of the Roblox window.
    WinGetClientPos &windowTopLeftX, &windowTopLeftY, , , "ahk_exe RobloxPlayerBeta.exe"

    ; Adjust OCR start coordinates based on the window position.
    ocrStart := [ocrStart[1] + windowTopLeftX, ocrStart[2] + windowTopLeftY]

    ; Calculate end coordinates for the OCR area.
    ocrEnd := [ocrStart[1] + ocrSize[1], ocrStart[2] + ocrSize[2]]

    ; Optionally draw a border around the OCR area for visual feedback.
    ocrBorder := Pin(ocrStart[1], ocrStart[2], ocrEnd[1], ocrEnd[2], 1000, "b1 flash0")  ; Draw a border around the OCR area.
    waitTime("QuestAfterOcrBorderDrawn")  ; Wait for the border to be visually confirmed.

    ; Perform OCR on the specified rectangular area with the given scale.
    ocrObjectResult := OCR.FromRect(ocrStart[1], ocrStart[2], ocrSize[1], ocrSize[2], , ocrScale)

        ocrBorder.Destroy()

    ; Return either the text result or the OCR object based on the returnText parameter.
    if (returnText)
        return ocrObjectResult.Text
    else
        return ocrObjectResult
}


; ----------------------------------------------------------------------------------------
; checkForDisconnect Function
; Description: Uses OCR to detect disconnection messages within the Roblox game interface.
; Operation:
;   - Activates the Roblox window to ensure it's in focus.
;   - Uses OCR to read the specified screen area for disconnection keywords.
; Dependencies:
;   - activateRoblox, getOcrResult: Functions to focus window and perform OCR.
; Return: Boolean; true if disconnected, false otherwise.
; ----------------------------------------------------------------------------------------
checkForDisconnect() {
    activateRoblox()  ; Focus the Roblox window.
    ocrTextResult := getOcrResult(COORDS["OCR"]["DisconnectMessageStart"], COORDS["OCR"]["DisconnectMessageSize"], 20)  ; Get OCR results.
    return (regexMatch(ocrTextResult, "Disconnected|Reconnect|Leave"))  ; Check for disconnection phrases.
}

; ----------------------------------------------------------------------------------------
; areFreeGiftsReady Function
; Description: Checks if free gifts are ready by performing a pixel search in the specified area for a specific color.
; Operation:
;   - Uses PixelSearch to find the specified color within the defined coordinates.
;   - Returns the result of the PixelSearch function, indicating whether the specified color was found.
; Dependencies:
;   - PixelSearch: Function that searches a rectangular area of the screen for a pixel with a specific color.
; Parameters: None
; Return: Boolean indicating whether the free gifts are ready (true if the color is found, false otherwise).
; ----------------------------------------------------------------------------------------
areFreeGiftsReady() {
    return PixelSearch(&foundX, &foundY, 
        FREE_GIFTS_READY["Start"][1], FREE_GIFTS_READY["Start"][2],  
        FREE_GIFTS_READY["End"][1], FREE_GIFTS_READY["End"][2],  
        FREE_GIFTS_READY["Colour"], FREE_GIFTS_READY["Tolerance"])
}


fixAmount(ocrTextResult) {
    ; Fix common OCR misreads.
    ocrTextResult := RegExReplace(ocrTextResult, "\s*SOO", "500")
    ocrTextResult := RegExReplace(ocrTextResult, "\s*SO", "50")
    ocrTextResult := RegExReplace(ocrTextResult, "\s*SS", "55")
    ocrTextResult := RegExReplace(ocrTextResult, "\bS\b", "5")

    ; Handle 'Index (x20) new pets quest' formatting.
    hasMultiplier := RegexMatch(ocrTextResult, "(\(x\d+\))", &multiplierAmount)
    if hasMultiplier {
        ocrAmount := RegExReplace(multiplierAmount[1], "[^\d.]", "")
        return ocrAmount
    }

    ; Check for shorthand notation for thousands (e.g., "1.5k").
    hasThousandsShorthand := RegexMatch(ocrTextResult, "(\b\d+(\.\d+)?k\b)", &shorthandAmount)
    if hasThousandsShorthand {
        ocrAmount := RegExReplace(shorthandAmount[1], "[^\d.]", "")
        ocrAmount *= 1000  ; Multiply the amount by 1000 if 'k' is found to reflect the correct number.
        return Round(ocrAmount, 0)
    }

    ; Extract standalone numbers.
    hasAmount := RegexMatch(ocrTextResult, "(\d+\b)", &standaloneAmount)
    if hasAmount
        return standaloneAmount[1]
    else
        return 1  ; Return 1 if no valid amount is found.
}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; ROBLOX CLIENT FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

; ----------------------------------------------------------------------------------------
; activateRoblox Function
; Description: Activates the Roblox game window, ensuring it's the current foreground application.
; Operation:
;   - Attempts to activate the Roblox window using its executable name.
;   - If the window cannot be found, displays an error message and exits the application.
;   - Waits for a predefined delay after successful activation to stabilize the environment.
; Dependencies:
;   - WinActivate: AHK command to focus a window based on given criteria.
;   - MsgBox ExitApp: Functions to handle errors and exit.
;   - Wait: Function to pause the script, ensuring timing consistency.
; Return: None; the function directly interacts with the system's window management.
; ----------------------------------------------------------------------------------------
activateRoblox() {
    try {
        WinActivate "ahk_exe RobloxPlayerBeta.exe"  ; Try to focus on Roblox window.
    } catch {
        MsgBox "Roblox window not found."  ; Error message if window is not found.
        ExitApp  ; Exit the script.
    }
    waitTime("AfterRobloxActivated")  ; Delay for stabilization after activation.
}

; ----------------------------------------------------------------------------------------
; resizeRobloxWindow Function
; Description: Resizes the Roblox window to specific dimensions to fix any scaling issues with the Supercomputer.
; Operation:
;   - Activates the Roblox window.
;   - Restores the Roblox window if it is minimized.
;   - Resizes the window twice to ensure any scaling issues are fixed.
; Dependencies:
;   - WinActivate: Activates the specified window.
;   - WinRestore: Restores the specified window if it is minimized.
;   - WinMove: Resizes and moves the specified window.
; Parameters: None
; Return: None
; ----------------------------------------------------------------------------------------
resizeRobloxWindow() {
    try {
        windowHandle := WinGetID("ahk_exe RobloxPlayerBeta.exe")
    } catch {
        MsgBox "Roblox window not found."  ; Error message if window is not found.
        ExitApp  ; Exit the script.
    }

    WinActivate windowHandle ; Activate the Roblox window.
    WinRestore windowHandle   ; Restore the Roblox window if it is minimized.
    ; Resize the window twice to fix any scaling issues with the Supercomputer.
    WinMove , , A_ScreenWidth, 600, windowHandle  ; Resize the window to screen width by 600 pixels height.
    WinMove , , 800, 600, windowHandle  ; Resize the window to 800x600 pixels dimensions.    
}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; GUI FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

; ----------------------------------------------------------------------------------------
; getCurrentQuest Function
; Description: Retrieves the displayed quest information from a designated cell in a ListView control.
; Operation:
;   - Fetches the text from the first row and fourth column of the ListView, indicating the current quest.
; Dependencies:
;   - lvCurrent.GetText: Method used to get text from specified cells in a ListView control.
; Return: Returns the quest text as a string, reflecting the current quest status or task.
; ----------------------------------------------------------------------------------------
getCurrentQuest() {
    return lvCurrent.GetText(1, 4)  ; Return text from the first row, fourth column.
}

; ----------------------------------------------------------------------------------------
; getCurrentArea Function
; Description: Retrieves the displayed area information from a specific cell in a ListView control.
; Operation:
;   - Fetches the text from the first row and third column of the ListView, which holds the current area information.
; Dependencies:
;   - lvCurrent.GetText: Method used to get text from specified cells in a ListView control.
; Return: Returns the area text as a string, providing current context or location.
; ----------------------------------------------------------------------------------------
getCurrentArea() {
    return lvCurrent.GetText(1, 3)  ; Return text from the first row, third column.
}

; ----------------------------------------------------------------------------------------
; getCurrentZone Function
; Description: Retrieves the displayed zone information from a ListView control.
; Operation:
;   - Fetches the text from the first row and second column of the ListView, which holds the current zone information.
; Dependencies:
;   - lvCurrent.GetText: Method used to get text from specified cells in a ListView control.
; Return: Returns the zone text as a string.
; ----------------------------------------------------------------------------------------
getCurrentZone() {
    return lvCurrent.GetText(1, 2)  ; Return text from the first row, second column.
}

; ----------------------------------------------------------------------------------------
; getCurrentloop Function
; Description: Retrieves the displayed quest information from a designated cell in a ListView control.
; Operation:
;   - Fetches the text from the first row and first column of the ListView, indicating the current quest.
; Dependencies:
;   - lvCurrent.GetText: Method used to get text from specified cells in a ListView control.
; Return: Returns the quest text as a string, reflecting the current quest status or task.
; ----------------------------------------------------------------------------------------
getCurrentloop() {
    return lvCurrent.GetText(1, 1)  ; Return text from the first row, first column.
}


; ----------------------------------------------------------------------------------------
; setCurrentloop Function
; Description: Updates the displayed loop number in a specific UI element to reflect the current iteration.
; Parameters:
;   - loopNumber: The current loop number to display, usually an integer.
; Operation:
;   - Modifies the text of the first row in a ListView control to show the new loop number.
; Dependencies:
;   - lvCurrent.Modify: Method used to update properties of items in a ListView control.
; Return: None; directly modifies the UI to display the updated loop number.
; ----------------------------------------------------------------------------------------
setCurrentloop(loopNumber) {
    lvCurrent.Modify(1, , loopNumber)  ; Modify the first row to display the new loop number.
}

; ----------------------------------------------------------------------------------------
; setCurrentZone Function
; Description: Updates the displayed zone in a specific UI element to reflect changes or current status.
; Parameters:
;   - Zone: The new zone to display, typically a string representing the geographic or contextual area.
; Operation:
;   - Modifies the text of the first row in a ListView control to show the updated ZONE
; Dependencies:
;   - lvCurrent.Modify: Method used to update properties of items in a ListView control.
; Return: None; directly modifies the UI to display the updated zone information.
; ----------------------------------------------------------------------------------------
setCurrentZone(currentZone) {
    lvCurrent.Modify(1, , , currentZone)  ; Modify the first row to display the new ZONE
}

; ----------------------------------------------------------------------------------------
; setCurrentArea Function
; Description: Updates the displayed area in a specific UI element to reflect the current location or context.
; Parameters:
;   - Area: The new area to display, typically a string representing the location or context.
; Operation:
;   - Modifies the text of the first row in a ListView control to show the new area.
; Dependencies:
;   - lvCurrent.Modify: Method used to update properties of items in a ListView control.
; Return: None; directly modifies the UI to display the updated area information.
; ----------------------------------------------------------------------------------------
setCurrentArea(currentArea) {
    lvCurrent.Modify(1, , , , currentArea)  ; Modify the first row to display the new area.
}

; ----------------------------------------------------------------------------------------
; setCurrentQuest Function
; Description: Updates the displayed quest in a specific UI element to reflect the current quest status.
; Parameters:
;   - Quest: The new quest to display, usually a string describing the ongoing quest.
; Operation:
;   - Modifies the text of the first row in a ListView control to show the new quest.
; Dependencies:
;   - lvCurrent.Modify: Method used to update properties of items in a ListView control.
; Return: None; directly modifies the UI to display the updated quest information.
; ----------------------------------------------------------------------------------------
setCurrentQuest(currentQuest) {
    lvCurrent.Modify(1, , , , , currentQuest)  ; Modify the first row to display the new quest.
}

; ----------------------------------------------------------------------------------------
; setCurrentAction Function
; Description: Updates the displayed action in a specific UI element to reflect current activities.
; Parameters:
;   - Action: The new action to display, typically a string describing the current activity.
; Operation:
;   - Modifies the text of a specified row in a ListView control to show the new action.
; Dependencies:
;   - lvCurrent.Modify: Method used to update properties of items in a ListView control.
; Return: None; directly modifies the UI to display the updated action.
; ----------------------------------------------------------------------------------------
setCurrentAction(currentAction) {
    lvCurrent.Modify(1, , , , , , currentAction)  ; Modify the first row to display the new action.
}

; ----------------------------------------------------------------------------------------
; setCurrentTime Function
; Description: Updates the displayed time in a specific UI element.
; Parameters:
;   - Time: The new time to display, typically a string.
; Operation:
;   - Modifies the text of a specified row in a ListView control to reflect the new time.
; Dependencies:
;   - lvCurrent.Modify: A method used to update properties of items in a ListView control.
; Return: None; directly modifies the UI to display the updated time.
; ----------------------------------------------------------------------------------------
setCurrentTime(currentTime) {
    lvCurrent.Modify(1, , , , , , , currentTime)  ; Modify the first row to display the new time.
}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; SETTINGS.INI FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰


getSetting(keyName) {
    try {
        IniRead(SETTINGS_INI, "Settings", keyName) ; Read and return the setting value from the INI file.
    } catch {
        MsgBox keyName " setting not found."
    }
    return IniRead(SETTINGS_INI, "Settings", keyName)  
}

getKeybind(keyName) {
    try {
        IniRead(SETTINGS_INI, "Keybinds", keyName) ; Read and return the setting value from the INI file.
    } catch {
        MsgBox keyName " keybind not found."
    }
    return IniRead(SETTINGS_INI, "Keybinds", keyName)  
}

; ----------------------------------------------------------------------------------------
; putSetting Function
; Description: Writes a setting value to an INI file under a specified key.
; Parameters:
;   - Value: The value to be written to the INI file.
;   - Key: The setting key under which the value is to be stored.
; Operation:
;   - Writes the specified value under the specified key in a designated INI file section.
; Dependencies:
;   - IniWrite: Function used to write data to an INI file.
;   - SETTINGS_INI: Global variable specifying the path to the INI file.
; Return: None; modifies the INI file by updating the setting.
; ----------------------------------------------------------------------------------------
putSetting(keyValue, keyName) {
    IniWrite keyValue, SETTINGS_INI, "Settings", keyName  ; Write the specified value under the given key in the INI file.
}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; INITIALISATION SETTINGS/FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

; ----------------------------------------------------------------------------------------
; completeInitialisationTasks Function
; Description: Completes a series of initialization tasks to set up the environment for the Roblox macro.
; Operation:
;   - Updates the tray icon.
;   - Creates a folder for logs.
;   - Clears any previous OCR results.
;   - Resizes the Roblox window to address scaling issues.
;   - Replaces the Roblox fonts for better readability.
;   - Defines hotkeys for various macro functions.
;   - Zooms the camera out to the maximum level.
; Dependencies:
;   - updateTrayIcon: Updates the tray icon.
;   - createLogsFolder: Creates a folder for logs.
;   - resizeRobloxWindow: Resizes the Roblox window to specific dimensions.
;   - replaceRobloxFonts: Replaces the Roblox fonts.
;   - defineHotKeys: Defines hotkeys for various macro functions.
;   - zoomCameraOut: Zooms the camera out to the maximum level.
; Parameters: None
; Return: None
; ----------------------------------------------------------------------------------------
completeInitialisationTasks() {
    checkDisplayScaling()
    updateTrayIcon()
    createLogsFolder()
    resizeRobloxWindow()
    replaceRobloxFonts()
    defineHotKeys()
    zoomCameraOut(1500)
    changeBackgroundTransparency()
}

checkDisplayScaling() {
    if A_ScreenDPI == 96
        return

    Msgbox "Display scaling must be 100%.`nUpdate in Windows display settings.", "Rank Quests", 0x30
    ExitApp
}

createLogsFolder() {
    DirCreate "Logs"  ; Create a directory named "Logs".
}

; Define hot keys in addition to the standard F1, F2, and F3.
defineHotKeys() {
    if startModeSetting.Value != ""
        HotKey startModeSetting.Value, startMacro
    if pauseModeSetting.Value != ""
        HotKey pauseModeSetting.Value, pauseMacro
    if exitModeSetting.Value != ""
        HotKey exitModeSetting.Value, exitMacro
}

updateTrayIcon() {
    iconFile := A_WorkingDir . "\Assets\PS99_Ranks.ico"  ; Set the tray icon file path.
    TraySetIcon iconFile  ; Apply the new tray icon.
}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; OTHER FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

waitTime(timeToWait) {
    newWaitTime := IsInteger(timeToWait) ? timeToWait : Delay[timeToWait]

    if (newWaitTime > ONE_SECOND) {
        totalSeconds := Ceil(newWaitTime / 1000)  ; Calculate breaking duration.
        setCurrentTime(totalSeconds)  ; Set initial countdown timer.
        loop totalSeconds {
            setCurrentTime(totalSeconds - A_Index)  ; Update the countdown timer.
            Sleep ONE_SECOND  ; Wait one second.
        }        
    }
    else
        Sleep newWaitTime  ; Pause execution for 'Time' milliseconds or predefined 'Delay'.

}

changeToDefaultFont(*) {
    robloxFontPath := StrReplace(WinGetProcessPath("ahk_exe RobloxPlayerBeta.exe"), "RobloxPlayerBeta.exe", "") "content\fonts\"  ; Path to Roblox fonts directory.
    FileCopy FREDOKA_ONE_REGULAR, robloxFontPath "FredokaOne-Regular.ttf", true  ; Copy Fredoka One font.
    FileCopy SOURCE_SANS_PRO_BOLD, robloxFontPath "SourceSansPro-Bold.ttf", true  ; Copy Source Sans Pro Bold font.
}

replaceRobloxFonts() {
    robloxFontPath := StrReplace(WinGetProcessPath("ahk_exe RobloxPlayerBeta.exe"), "RobloxPlayerBeta.exe", "") "content\fonts\"  ; Path to Roblox fonts directory.
    FileCopy TIMES_NEW_ROMAN, robloxFontPath "FredokaOne-Regular.ttf", true  ; Replace 'FredokaOne-Regular' with Times New Roman.
    FileCopy TIMES_NEW_ROMAN_INVERTED, robloxFontPath "SourceSansPro-Bold.ttf", true  ; Replace 'SourceSansPro-Bold' with Times New Roman (Inverted).
}

closeErrorMessageWindow() {
    closeWindow(ERROR_WINDOW_X)  ; Close the error message window using its X coordinate.
}

writeToLogFile(messages) {
    ; If messages is not already an array, convert it into one
    if !IsObject(messages) {
        messages := [messages]  ; Wrap the single string in an array
    }

    logDateTime := FormatTime(A_Now, "yyyy-MM-dd HH:mm:ss")
    logFile := LOG_FOLDER DATE_TODAY ".log"
    
    ; Iterate through the array and append each message
    for index, message in messages {
        formattedMessage := "[" logDateTime "]   " message "`n"
        try {
            FileAppend(formattedMessage, logFile)
        }
    }
}





; ----------------------------------------------------------------------------------------
; isOopsWindowOpen Function
; Description: Checks if the "Oops" error window is open by searching for a specific icon on the screen.
; Operation:
;   - Uses PixelSearch to find the "Oops" error window icon within specified coordinates and color.
; Dependencies: None
; Parameters: None
; Return: Boolean; true if the "Oops" error window is found, false otherwise.
; ----------------------------------------------------------------------------------------
isOopsWindowOpen() {
    ; Perform pixel search within specified coordinates and color.
    return PixelSearch(&foundX, &foundY,  
        OOPS_ERROR_QUESTION_MARK["Start"][1], OOPS_ERROR_QUESTION_MARK["Start"][2], 
        OOPS_ERROR_QUESTION_MARK["End"][1], OOPS_ERROR_QUESTION_MARK["End"][2],  
        OOPS_ERROR_QUESTION_MARK["Colour"], OOPS_ERROR_QUESTION_MARK["Tolerance"])  
}

; ----------------------------------------------------------------------------------------
; closeChatLog Function
; Description: Searches for the chat log icon on the screen and closes the chat log if found.
; Operation:
;   - Uses PixelSearch to find the chat log icon within specified coordinates and color.
;   - If the chat log icon is found, clicks on it to close the chat log.
; Dependencies:
;   - leftClickMouse: Function to simulate mouse click at given coordinates.
; Parameters: None
; Return: None; performs the search and click operations to close the chat log.
; ----------------------------------------------------------------------------------------
closeChatLog() {
    ; Perform pixel search within specified coordinates and color.
    if PixelSearch(&foundX, &foundY,  
        CHAT_ICON_WHITE["Start"][1], CHAT_ICON_WHITE["Start"][2], 
        CHAT_ICON_WHITE["End"][1], CHAT_ICON_WHITE["End"][2],  
        CHAT_ICON_WHITE["Colour"], CHAT_ICON_WHITE["Tolerance"]) 
        leftClickMouse([foundX, foundY])  ; Click on the found coordinates to close the chat log.
}

; ----------------------------------------------------------------------------------------
; closeWindow Function
; Description: Searches for a specific window on the screen and closes it if found.
; Operation:
;   - Uses PixelSearch to find the window within specified coordinates and color.
;   - If the window is found, clicks on it to close.
; Dependencies:
;   - leftClickMouse: Function to simulate mouse click at given coordinates.
; Parameters:
;   - WINDOW_X: Map containing the start and end coordinates, color, and tolerance for the search.
; Return: None; performs the search and click operations to close the window.
; ----------------------------------------------------------------------------------------
closeWindow(windowMap) {
    ; Perform pixel search within specified coordinates and color.
    if PixelSearch(&foundX, &foundY,  
        windowMap["Start"][1], windowMap["Start"][2], 
        windowMap["End"][1], windowMap["End"][2],  
        windowMap["Colour"], windowMap["Tolerance"]) 
        leftClickMouse([foundX, foundY])  ; Click on the found coordinates to close the window.
}

; ----------------------------------------------------------------------------------------
; closeAllWindows Function
; Description: Closes all open game menus and windows.
; Operation:
;   - Calls various functions to close specific game menus and windows.
; Dependencies:
;   - closeInventoryMenu, closeErrorMessageWindow, closeRewardsMenu, closeTeleportMenu, closeAutoHatchMenu, closeHatchingMenu, closeSuperComputerMenu, closeChatLog, closeLeaderboard:
;     Functions to close specific game menus and windows.
; Parameters: None
; Return: None; performs the action of closing all specified windows.
; ----------------------------------------------------------------------------------------
closeAllWindows() {
    closeLeaderboard()

    X_SEARCH_AREA := {x1: 430, y1: 90, x2: 770, y2: 130}
    search := X_SEARCH_AREA

    activateRoblox()
    if PixelSearch(&x, &y, search.x1, search.y1, search.x2, search.y2, "0xff155e", 2) {
        SendEvent "{Click, " x ", " y ", 1}"
        Sleep 100
    }

    ;closeInventoryMenu()         ; Close the inventory menu.
    ;closeErrorMessageWindow()    ; Close the error message window.
    ;closeRewardsMenu()           ; Close the rewards menu.
    ;closeFreeGiftsMenu()         ; Close the free gifts menu.
    ;closeTeleportMenu()          ; Close the teleport menu.
    ;closeAutoHatchMenu()         ; Close the auto hatch menu.
    ;closeHatchEggMenu()          ; Close the hatching menu.
    ;closeSuperComputerMenu()     ; Close the super computer menu.
    ;closeChatLog()               ; Close the chat log.
    ;closeLeaderboard()           ; Close the leaderboard.
}

; ----------------------------------------------------------------------------------------
; useBoostKeybind Function
; Description: Repeatedly sends a keybind to use a boost and handles any error messages.
; Operation:
;   - Sends the specified keybind to use a boost.
;   - Continuously checks if an error message window ("Oops" window) is open and closes it if present.
; Dependencies:
;   - isOopsWindowOpen, closeErrorMessageWindow: Functions that check for and close the error message window.
; Parameters:
;   - keybind: The keybind to be sent. If empty, the function exits.
; Return: None; repeatedly sends the keybind and manages error messages until resolved.
; ----------------------------------------------------------------------------------------
useBoostKeybind(keybind, questId) {
    if keybind == "" {
        MsgBox "Keybind missing."  ; Notify user of max rank.
        return false
    } ; If keybind is empty, exit the function.
        
    loop 10 {
        SendEvent keybind  ; Send the keybind.
        Sleep 1000  ; Wait for 1 second.

        if isItemMissing() {
            QUEST_PRIORITY[questId] := 0  ; Downgrade quest priority if item not found.
            return false
        }
            

        if !isOopsWindowOpen()  ; If the "Oops" window is not open, exit the function.
            return true
            
        while isOopsWindowOpen() {  ; While the "Oops" window is open.
            closeErrorMessageWindow()  ; Close the error message window.
            Sleep 250  ; Wait for 250 milliseconds.
        }
        Sleep 250  ; Wait for 250 milliseconds before the next iteration.
    }

}

; ----------------------------------------------------------------------------------------
; isItemMissing Function
; Description: Checks if an item is missing by performing a pixel search in the specified area for a specific color.
; Operation:
;   - Uses PixelSearch to find the specified color within the defined coordinates.
;   - Returns the result of the PixelSearch function, indicating whether the specified color was found.
; Dependencies:
;   - PixelSearch: Function that searches a rectangular area of the screen for a pixel with a specific color.
; Parameters: None
; Return: Boolean indicating whether the item is missing (true if the color is found, false otherwise).
; ----------------------------------------------------------------------------------------
isItemMissing() {
    ; Perform pixel search within specified coordinates and color.
    return PixelSearch(&foundX, &foundY,  
        ITEM_MISSING["Start"][1], ITEM_MISSING["Start"][2], 
        ITEM_MISSING["End"][1], ITEM_MISSING["End"][2],  
        ITEM_MISSING["Colour"], ITEM_MISSING["Tolerance"])      
}

; ----------------------------------------------------------------------------------------
; isInventoryButtonVisible Function
; Description: Checks if the inventory button is visible on the screen by performing a pixel search in the specified area for a specific color.
; Operation:
;   - Uses PixelSearch to find the specified color within the defined coordinates.
;   - Returns the result of the PixelSearch function, indicating whether the specified color was found.
; Dependencies:
;   - PixelSearch: Function that searches a rectangular area of the screen for a pixel with a specific color.
; Parameters: None
; Return: Boolean indicating whether the inventory button is visible (true if the color is found, false otherwise).
; ----------------------------------------------------------------------------------------
isInventoryButtonVisible() {
    return PixelSearch(&foundX, &foundY, 
        INVENTORY_BUTTON["Start"][1], INVENTORY_BUTTON["Start"][2],  
        INVENTORY_BUTTON["End"][1], INVENTORY_BUTTON["End"][2],  
        INVENTORY_BUTTON["Colour"], INVENTORY_BUTTON["Tolerance"])
}

; ----------------------------------------------------------------------------------------
; hasSkillMastery Function
; Description: Checks if the player has skill mastery by performing a pixel search in the specified area for a specific color.
; Operation:
;   - Uses PixelSearch to find the specified color within the defined coordinates.
;   - Returns the result of the PixelSearch function, indicating whether the specified color was found.
; Dependencies:
;   - PixelSearch: Function that searches a rectangular area of the screen for a pixel with a specific color.
; Parameters: None
; Return: Boolean indicating whether the player has skill mastery (true if the color is found, false otherwise).
; ----------------------------------------------------------------------------------------
hasSkillMastery() {
    return PixelSearch(&foundX, &foundY,  
        SKILL_MASTERY["Start"][1], SKILL_MASTERY["Start"][2], 
        SKILL_MASTERY["End"][1], SKILL_MASTERY["End"][2],  
        SKILL_MASTERY["Colour"], SKILL_MASTERY["Tolerance"])          
}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; BALLOON FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

; ----------------------------------------------------------------------------------------
; shootDownBalloons Function
; Description: Sets the current action and shoots down red and blue balloons on the screen.
; Operation:
;   - Sets the current action to "Shooting Down Balloons".
;   - Defines the search parameters for red and blue balloons.
;   - Calls the findAndShootBalloon function for each balloon color.
; Dependencies:
;   - setCurrentAction: Function to set the current action.
;   - findAndShootBalloon: Function to search for and shoot balloons.
; Parameters: None
; Return: None; performs the action of shooting down balloons.
; ----------------------------------------------------------------------------------------
shootDownBalloons() {
    setCurrentAction("Shooting Down Balloons")  ; Set the current action to "Shooting Down Balloons".

    ; Define search parameters for the red balloon.
    RED_BALLOON := Map("Start", [120, 0], "End", [680, 240], "Colour", "0xFF1010", "Tolerance", 2)
    ; Define search parameters for the blue balloon.
    BLUE_BALLOON := Map("Start", [120, 0], "End", [680, 240], "Colour", "0x00E8FF", "Tolerance", 5)

    findAndShootBalloon(RED_BALLOON)  ; Search for and shoot the red balloon.
    findAndShootBalloon(BLUE_BALLOON)  ; Search for and shoot the blue balloon.
}

; ----------------------------------------------------------------------------------------
; findAndShootBalloon Function
; Description: Searches for a balloon on the screen and shoots it multiple times if found.
; Operation:
;   - Uses PixelSearch to find the balloon within specified coordinates and color.
;   - If the balloon is found, clicks on it 10 times.
;   - Repeats the search up to 5 times or stops if the balloon is not found.
; Dependencies:
;   - leftClickMouse: Function to simulate mouse click at given coordinates.
; Parameters:
;   - balloonMap: Map containing the start and end coordinates, color, and tolerance for the search.
; Return: None; performs the search and click operations.
; ----------------------------------------------------------------------------------------
findAndShootBalloon(balloonMap) {
    loop 10 {
        ; Perform pixel search within specified coordinates and color.
        balloonExists := PixelSearch(&foundX, &foundY,  
            balloonMap["Start"][1], balloonMap["Start"][2], 
            balloonMap["End"][1], balloonMap["End"][2],  
            balloonMap["Colour"], balloonMap["Tolerance"]) 

        if balloonExists {  ; If balloon is found, click on it 10 times.
            loop 10 {
                leftClickMouse([foundX, foundY])
            }
        } else {  ; If balloon is not found, exit the loop.
            break        
        }
    }
}




; ---------------------------------------------------------------------------------------------------
; Function: readNumbers
; Description: Reads numeric characters from a specified location on the screen by comparing them 
;              to predefined images of numbers (0-9). It returns the recognized number as a string.
; Operation:
;   - Iterates through a map of images representing the digits 0-9.
;   - Searches for occurrences of each digit in the specified screen area.
;   - Sorts the detected digits based on their position and assembles them into a final string.
;   - Returns the recognized number if it forms a valid integer, otherwise returns 0.
; Dependencies: Requires image files for each digit (0.bmp, 1.bmp, etc.) stored in the specified folder.
; Parameters:
;   - numberLocation: An array specifying the area on the screen to search for digits.
;   - imageFolder: The folder path containing the digit images.
; Return: The recognized number as a string, or 0 if no valid number is found.
; ---------------------------------------------------------------------------------------------------
readNumbers(numberLocation, imageFolder) {
    WinGetClientPos &clientX, &clientY, , , "ahk_exe RobloxPlayerBeta.exe"
    numbers := Pin(numberLocation[1] + clientX, numberLocation[2] + clientY, 
        numberLocation[3] + clientX, numberLocation[4]+ clientY, 1000, "b1 flash0")

    ; Create a map linking each number (0-9) to its corresponding image file.
    imageMap := Map(
        "0.bmp", 0,
        "0-mastery.bmp", 0,
        "1.bmp", 1,
        "1-mastery.bmp", 1,
        "2.bmp", 2,
        "2-mastery.bmp", 2,
        "2-non-mastery-potions.bmp", 2,
        "3.bmp", 3,
        "3-mastery.bmp", 3,
        "3-non-mastery-potions.bmp", 3,
        "4.bmp", 4,
        "4-mastery.bmp", 4,
        "5.bmp", 5,
        "5-mastery.bmp", 5,
        "6.bmp", 6,
        "6-mastery.bmp", 6,
        "6-non-mastery-potions.bmp", 6,
        "7.bmp", 7,
        "7-mastery.bmp", 7,
        "8.bmp", 8,
        "8-mastery.bmp", 8,
        "8-non-mastery-potions.bmp", 8,
        "9.bmp", 9,
        "9-mastery.bmp", 9
    )

    foundCharacter := []  ; Initialize an array to store found characters and their positions.
    resultString := ""  ; Initialize the string that will store the recognized number.

    activateRoblox()

    ; Iterate over each key-value pair in the imageMap.
    for image, number in imageMap {
        currentX := numberLocation[1]  ; Start searching from the leftmost x-coordinate of the area.
        filePath := imageFolder image  ; Construct the full path to the image file.

        if not FileExist(filePath)
            continue

        ; Keep searching for the current digit image in the specified area.
        while true {
            if ImageSearch(&foundX, &foundY, currentX, numberLocation[2], numberLocation[3], numberLocation[4], "*75 " filePath) {
                foundCharacter.Push([number, foundX])  ; Store the found character and its x-coordinate.
                currentX := foundX + 1  ; Update currentX to search for the next occurrence.
            } 
            else
                break  ; Exit the loop if no more occurrences are found.
        }
    }

    ; Sort the found characters based on their x-coordinates.
    while foundCharacter.Length > 0 {
        minIndex := 1
        for i, pair in foundCharacter {
            if pair[2] < foundCharacter[minIndex][2] {
                minIndex := i
            }
        }
        resultString .= foundCharacter[minIndex][1]  ; Append the digit to the result string.
        foundCharacter.RemoveAt(minIndex)  ; Remove the processed character from the list.
    }

    ; Check if the result is a valid integer and return it.
    if IsInteger(resultString)
        return resultString
    else
        return -1
}

setKeybinds(*) {
    keybindSection := IniRead(SETTINGS_INI, "Keybinds")
    keybindSection := StrReplace(keybindSection, "Pinata", "Piñata")

    ; Split the string by line (``n is the newline character)
    lines := StrSplit(keybindSection, "`n")

    ; loop through each line and extract key-value pairs
    for line in lines {
        if (Trim(line) = "")  ; Skip empty lines
            continue

        ; Split the line into key and value at the first "="
        keyValue := StrSplit(line, "=", 2)
        if (keyValue.Length = 2) {
            key := Trim(keyValue[1])    ; Get the key
            value := Trim(keyValue[2])  ; Get the value

            ; Display each key-value pair
            KEYBIND_MAP[key] := {key: value}

        }
    }

    kb_addKeybindsFromMap()
}

; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; DEBUGGING
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰


runTests() {
    ;global 

    ;loadQuestPriorities()

    ;SHINY_HOVERBOARD_MODIFIER := shinyHoverboardSetting.Value ? 20 / 27 : 1
    ;BEST_ZONE := Integer(bestZoneSetting.Text)
    ;SECOND_BEST_ZONE := BEST_ZONE - 1
    ;BEST_EGG := ZONE_MAP[BEST_ZONE].egg
    ;RARE_EGG := ZONE_MAP[BEST_ZONE].rareEgg
    ;WORLD := ZONE_MAP[BEST_ZONE].world

    ;clickRewardsButton()
    ;findAndClickClaimButtons()

    ;teleportToZone(239)
    ;moveToBestEgg()
    ;pause
    ;moveToVipArea()

    ;doQuestMakeGoldenPets("20", 20)
    ;travelToMachine("Rainbow")
    ;pause
    ;global
    ;activateRoblox()
    
    ;BEST_ZONE := 229

    ;BEST_EGG := ZONE_MAP[BEST_ZONE].egg
    ;hatchBestEgg(1)

    ;RARE_EGG := ZONE_MAP[BEST_ZONE].rareEgg
    
    ;hatchRarePetEgg()
    ;moveToRareEgg()
    
    ;teleportToZone(199)
    ;moveToZoneCentre(199)
    ;pause
    
    ;msgbox ZONE_MAP[234].pathToCentre[1].direction
    
    ;getMasteries()
    ;pause

    ;msgbox ZONE_MAP[100].Name
    ;hasMastery := hasSkillMastery()
    ;numberLocation := hasMastery ? [407, 159, 468, 177] : [350, 166, 411, 184] 
    ;hasAmount := readNumbers(numberLocation, NUMBER_IMAGES)
    ;msgbox hasAmount

    ;changeBackgroundTransparency()
    ;loadQuestData()
    ;msgbox getquestId("Hatch SO race pets")
    ;msgbox getquestId("Use 2 Tier IV Potions")
    ;activateRoblox()
    ;clickAutoFarmButton()
    ;msgbox "done"
    ;pause
    ;msgbox fixAmount("Make SO golden pets", )
    ;activateRoblox()  ; Ensures that the Roblox window is active and ready for input, critical for reliably sending commands to the game.
    ;numberLocation := [350, 164, 411, 182] 
    ;amount := readNumbers(numberLocation, NUMBER_IMAGES)    
    ;findAngle(1500, 9, false, amount)
    ;pause
    ;claimFreeGifts()
    ;numberLocation := [350, 164, 411, 182] 
    ;msgbox readNumbers(numberLocation, NUMBER_IMAGES)
    ;pause
    ;msgbox getquestId("Tier IV Potions")
    ;hasMastery := hasSkillMastery()
    ;numberLocation := hasMastery ? [407, 159, 468, 177] : [350, 164, 411, 182] 
    ;hasAmount := readNumbers(numberLocation, POTION_NUMBERS)
    ;msgbox hasAmount
    ;findAngle(10, 3, hasMastery, hasAmount)

    ;pause
    ;msgbox hasSkillMastery()
    ;numberLocation := [407, 159, 468, 177]
    ;msgbox readNumbers(numberLocation, POTION_NUMBERS_MASTERY)
    ;pause
}