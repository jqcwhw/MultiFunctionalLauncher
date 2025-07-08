#Requires AutoHotkey v2.0  ; Ensures the script runs only on AutoHotkey version 2.0, which supports the syntax and functions used in this script.

; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; PSYCHO MANAGER - AutoHotKey 2.0 Macro for Pet Simulator 99
; Written by waktool
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; DIRECTIVES & CONFIGURATIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

#SingleInstance Force  ; Forces the script to run only in a single instance. If this script is executed again, the new instance will replace the old one.
CoordMode "Mouse", "Client"  ; Sets the coordinate mode for mouse functions (like Click, MouseMove) to be relative to the active window's client area, ensuring consistent mouse positioning across different window states.
CoordMode "Pixel", "Client"  ; Sets the coordinate mode for pixel functions (like PixelSearch, PixelGetColor) to be relative to the active window's client area, improving accuracy in color detection and manipulation.
SetMouseDelay 10  ; Sets the delay between mouse events to 10 milliseconds, balancing speed and reliability of automated mouse actions.
SendMode "Input"

OnMessage(0x0100, WM_KEYDOWN)

; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; LIBRARIES
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

; Third-party Libraries:
#Include <OCR>

; Macro Related Libraries:
#Include "%A_ScriptDir%\Modules"
#Include AutoFarm.ahk
#Include ChatMenu.ahk
#Include Daycare.ahk
#Include HatchEgg.ahk
#Include HatchSettingsMenu.ahk
#Include LeaderboardMenu.ahk
#Include Movement.ahk
#Include Multiclient.ahk
#Include ReadNumber.ahk
#Include Supercomputer.ahk
#Include Teleport.ahk
#Include Zones.ahk


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; GLOBAL VARIABLES
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

; Macro details.
MACRO_TITLE := "Psycho Manager"  ; The title displayed in main GUI elements.
MACRO_VERSION := "0.5.0"  ; Script version, helpful for user support and debugging.

; File settings.
LOG_FOLDER := A_ScriptDir "\Logs\"
SAVED_CONFIG_FOLDER := A_ScriptDir "\Configs\Saved\"
TEMP_CONFIG_FOLDER := A_ScriptDir "\Configs\Temp\"
SETTINGS_INI := A_ScriptDir "\Settings.ini"  ; Path to settings INI file.
BUTTON_IMAGES := A_ScriptDir "\Images\Buttons\"

NUMBER_IMAGE_FOLDER := A_ScriptDir "\Images\Numbers\"

; Other settings.
LOG_DATE := FormatTime(A_Now, "yyyyMMdd")
ONE_SECOND := 1000

MACRO_ICON := A_WorkingDir . "\Assets\PsychoHatcher.ico"  ; Set the tray icon file path.
DISCORD_ICON := A_WorkingDir . "\Assets\Discord.ico"  ; Set the tray icon file path.
GITHUB_ICON := A_WorkingDir . "\Assets\Github.ico"  ; Set the tray icon file path.
PSYCHO_HATCHER_ICON := A_WorkingDir . "\Assets\PsychoHatcher.ico"  ; Set the tray icon file path.
PAUSE_ICON := A_WorkingDir . "\Assets\PlayPause.ico"  ; Set the tray icon file path.
FONT_ICON := A_WorkingDir . "\Assets\Font.ico"  ; Set the tray icon file path.

FREDOKA_ONE_REGULAR := A_ScriptDir "\Assets\FredokaOne-Regular.ttf"  ; Path to Fredoka One Regular font.
SOURCE_SANS_PRO_BOLD := A_ScriptDir "\Assets\SourceSansPro-Bold.ttf"  ; Path to Source Sans Pro Bold font.

START_MACRO := getSetting("startMacroKey")
PAUSE_MACRO := getSetting("pauseMacroKey")
EXIT_MACRO := getSetting("exitMacroKey")

IMAGES := A_ScriptDir "\Images\"  

CLIENT_ARRAY := []
CLIENT_MAP := Map()

; Listview columns.
CLIENT_LIST_ID_COLUMN := 1
CLIENT_LIST_NAME_COLUMN := 2
CLIENT_LIST_FLAG_KEYBIND_COLUMN := 3
CLIENT_LIST_SPRINKLER_KEYBIND_COLUMN := 4
CLIENT_LIST_EVENT_KEYBIND_COLUMN := 5
CLIENT_LIST_SUPERCOMPUTER_KEYBIND_COLUMN := 6
CLIENT_LIST_CHARGED_EGGS_COLUMN := 7
CLIENT_LIST_GOLDEN_EGGS_COLUMN := 8
CLIENT_LIST_DAYCARE_SLOTS_COLUMN := 9
CLIENT_LIST_DAYCARE_USE_COLUMN := 10
CLIENT_LIST_HATCH_EGGS_COLUMN := 11

BEST_ZONE := ZONE_MAP.Count + 1
SECOND_BEST_ZONE := BEST_ZONE - 1


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; MACRO
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

runMacro()

; ----------------------------------------------------------------------------------------
; runMacro Function
; Description: Executes the main macro loop, performing all necessary initial setup tasks,
;              traveling to the advanced digsite, and then digging holes either randomly or sequentially.
; Operation:
;   - Activates the Roblox window and completes initial setup tasks.
;   - Closes the leaderboard and chat log if open.
;   - Travels to the advanced digsite.
;   - Continuously digs holes either randomly or sequentially based on the OPTIMISED_DIG_PATTERN setting.
; Dependencies:
;   - activateRoblox: Function to activate the Roblox window.
;   - completeMacroInitialisationTasks: Function to perform initial setup tasks.
;   - closeLeaderboard: Function to close the leaderboard.
;   - closeChatLog: Function to close the chat log.
;   - travelToAdvancedDigsite: Function to travel to the advanced digsite.
;   - digHole: Function to dig a hole at a specified location.
; Parameters: None
; Return: None
; ----------------------------------------------------------------------------------------
runMacro() {

    completeMacroInitialisationTasks()  ; Perform all initial setup tasks.

    CLIENT_ARRAY := getRobloxClients()

    displayMainGui()

    for client in CLIENT_ARRAY {
        activateWindow(client)
        resizeWindow(client)
        WinSetTitle("Roblox", "ahk_id " client)
        closeLeaderboard()
        clientList.Add(, client)
        accountName := loadConfigFromTemp(client, A_Index)
        if accountName != ""
            WinSetTitle("Roblox (" accountName ")", "ahk_id " client)  
    }

}

startMacro(*) {

    ; Client initialisation.

    CLIENT_MAP.Clear()

    ; Ensure all accounts have settings defined.
    Loop clientList.GetCount() {
        clientId := clientList.GetText(A_Index, CLIENT_LIST_ID_COLUMN)
        name := clientList.GetText(A_Index, CLIENT_LIST_NAME_COLUMN)
        if name = "" {
            clientList.Modify(A_Index, "Select")
            displaySettingsGui()
            windowId.Value := clientId
            activateWindow(clientId)
            openLeaderboard()
            MsgBox "Settings must be defined for client " clientId ".", MACRO_TITLE, 16
            return
        }
    }

    Loop clientList.GetCount() {
        clientId := clientList.GetText(A_Index, CLIENT_LIST_ID_COLUMN)
        daycare := clientList.GetText(A_Index, CLIENT_LIST_DAYCARE_USE_COLUMN)
        hatchEggs := clientList.GetText(A_Index, CLIENT_LIST_HATCH_EGGS_COLUMN)
        CLIENT_MAP[clientId] := Map(
            "name", clientList.GetText(A_Index, CLIENT_LIST_NAME_COLUMN),
            "flag", clientList.GetText(A_Index, CLIENT_LIST_FLAG_KEYBIND_COLUMN),
            "sprinkler", clientList.GetText(A_Index, CLIENT_LIST_SPRINKLER_KEYBIND_COLUMN),
            "event", clientList.GetText(A_Index, CLIENT_LIST_EVENT_KEYBIND_COLUMN),
            "supercomputer", clientList.GetText(A_Index, CLIENT_LIST_SUPERCOMPUTER_KEYBIND_COLUMN),
            "charged", clientList.GetText(A_Index, CLIENT_LIST_CHARGED_EGGS_COLUMN),
            "golden", clientList.GetText(A_Index, CLIENT_LIST_GOLDEN_EGGS_COLUMN),
            "daycareSlots", clientList.GetText(A_Index, CLIENT_LIST_DAYCARE_SLOTS_COLUMN),
            "daycareUse", daycare,
            "hatchEggs", hatchEggs
        )
        addActionToQueue(clientId, "Initialise Client", A_Now)
        if daycare        
            addActionToQueue(clientId, "Daycare", A_Now)
        addActionToQueue(clientId, "Apply Auto Hatch", A_Now)
        addActionToQueue(clientId, "Teleport Best Zone", A_Now)
        
        if hatchEggs {
            addActionToQueue(clientId, "Move To Best Egg", A_Now)
            addActionToQueue(clientId, "Hatch Best Egg", A_Now)
        }
        addActionToQueue(clientId, "Farm Best Zone", A_Now)
        addActionToQueue(clientId, "Place Flag", A_Now)
        addActionToQueue(clientId, "Place Sprinkler", A_Now)
        addActionToQueue(clientId, "Start Event", A_Now)
        addActionToQueue(clientId, "Use Ultimate", A_Now)
        
        WinSetTitle("Roblox (" CLIENT_MAP[clientId]["name"] ")", "ahk_id " clientId)     
    }

    Loop {
        if actionList.GetCount() = 0 {
            MsgBox "No actions to process, stopping macro.", MACRO_TITLE, 16
            return
        }

        clientId := actionList.GetText(1, 1)
        action := actionList.GetText(1, 3),
        eventTime := actionList.GetText(1, 4)

        if A_Now > eventTime {
            activateWindow(clientId)
            closeLeaderboard()
            closeChatLog()
            Sleep 1000

            switch action {
                case "Initialise Client":
                    initialiseClient(clientId)
                case "Apply Auto Hatch":
                    applyAutoHatchSettings(clientId)
                case "Teleport Best Zone":
                    teleportToBestZone()
                case "Move To Best Egg":
                    moveToBestEgg()
                case "Hatch Best Egg":
                    hatchEgg(clientId)
                case "Farm Best Zone":
                    farmBestZone(hatchEggs)
                case "Place Flag":
                    placeFlag(clientId)
                    addActionToQueue(clientId, "Place Flag", DateAdd(A_Now, 5, "Minutes"))                      
                case "Place Sprinkler":
                    placeSprinkler(clientId)
                    addActionToQueue(clientId, "Place Sprinkler", DateAdd(A_Now, 5, "Minutes"))       
                case "Start Event":
                    startEvent(clientId)
                    addActionToQueue(clientId, "Start Event", DateAdd(A_Now, 5, "Seconds"))                    
                case "Use Ultimate":
                    useUltimate(clientId)
                    addActionToQueue(clientId, "Use Ultimate", DateAdd(A_Now, 2, "Minutes"))                    
                case "Change Worlds":
                    changeWorlds(clientId)
                case "Daycare":
                    dayCare := 30
                    useDaycare(clientId)
                    addActionToQueue(clientId, "Move Away From Egg", DateAdd(A_Now, dayCare, "Minutes"))
                    addActionToQueue(clientId, "Daycare", DateAdd(A_Now, dayCare, "Minutes"))
                    addActionToQueue(clientId, "Teleport Best Zone", DateAdd(A_Now, dayCare, "Minutes"))
                    addActionToQueue(clientId, "Move To Best Egg", DateAdd(A_Now, dayCare, "Minutes"))
                    addActionToQueue(clientId, "Hatch Best Egg", DateAdd(A_Now, dayCare, "Minutes"))
                    addActionToQueue(clientId, "Farm Best Zone", DateAdd(A_Now, dayCare, "Minutes"))                
                case "Move Away From Egg":
                    moveAwayFromEgg()
                case "Move Back To Egg":
                    moveBackToEgg()                    
                default:
            }
            
            actionList.Delete(1)
            actionList.ModifyCol(4, "Sort")
        }

    }
}

initialiseClient(clientId) {
    zoomCameraOut(2000)
}

; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; GUI INITIALISATION
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

; ----------------------------------------------------------------------------------------
; displayMainGui Function
; Description: Creates and displays the main GUI window, including a list view for items and control buttons.
; Operation:
;   - Initializes the main GUI with the "AlwaysOnTop" property and sets its title and font.
;   - Adds a ListView control to display items with multiple columns.
;   - Adds control buttons for various functionalities.
;   - Positions the main GUI window relative to another GUI window (statsGui).
;   - Assigns event handlers to the buttons for their respective functions.
; Dependencies:
;   - MACRO_TITLE: Global variable for the title of the macro.
;   - MACRO_VERSION: Global variable for the version of the macro.
;   - statsGui: Another GUI window whose position is used to position the main GUI.
; Parameters: None
; Return: None
; ----------------------------------------------------------------------------------------
displayMainGui() {
    global
    ; Initialize the main GUI with "AlwaysOnTop" property.
    mainGui := Gui()
    mainGui.Title := MACRO_TITLE " v" MACRO_VERSION  ; Set the title incorporating global variables for title and version.
    mainGui.SetFont("s8", "Segoe UI")  ; Use "Segoe UI" font for a modern look.

    fileMenu := Menu()
    startText := "Start Macro`t" START_MACRO
    pauseText := "Pause Macro`t" PAUSE_MACRO
    exitText := "Exit Macro`t" EXIT_MACRO
    fileMenu.Add(startText, startMacro)
    fileMenu.Add()
    fileMenu.Add(pauseText, pauseMacro)
    fileMenu.Add("Reload Macro", reloadMacro)
    fileMenu.Add()
    fileMenu.Add(exitText, exitMacro)
    fileMenu.SetIcon(startText, "imageres.dll", 282)
    fileMenu.SetIcon(pauseText, PAUSE_ICON)
    fileMenu.SetIcon("Reload Macro", "imageres.dll", 230)
    fileMenu.SetIcon(exitText, "imageres.dll", 94)

    toolsMenu := Menu()
    toolsMenu.Add("Reconnect", reconnectClient)
    toolsMenu.Add("Standard Font", changeToDefaultFont)
    toolsMenu.SetIcon("Reconnect", WinGetProcessPath("ahk_exe RobloxPlayerBeta.exe"), 1)
    toolsMenu.SetIcon("Standard Font", FONT_ICON)

    helpMenu := Menu()
    helpMenu.Add("Wiki", openWiki)
    helpMenu.Add()
    helpMenu.Add("Discord", openDiscord)
    helpMenu.Add("Website", openWebsite)
    helpMenu.SetIcon("Wiki", GITHUB_ICON)    
    helpMenu.SetIcon("Discord", DISCORD_ICON)
    helpMenu.SetIcon("Website", PSYCHO_HATCHER_ICON)
    
    MyMenuBar := MenuBar()
    MyMenuBar.Add("&File", fileMenu)
    MyMenuBar.Add("&Tools", toolsMenu)
    MyMenuBar.Add("&Help", helpMenu)
    mainGui.MenuBar := MyMenuBar

    mainGui.AddGroupBox("Section w420 h200", "Clients").SetFont("w700")
    clientList := mainGui.AddListView("xp+10 yp+20 r8 w400 NoSortHdr vClient -Multi", ["Id", "Name", "Flag", "Sprinkler", "Event", "Computer", "Charge", "Golden", "Daycare Slots", "Daycare Use", "Hatch"])
    clientList.OnEvent("DoubleClick", selectClient)
    clientList.ModifyCol(1, 70)
    clientList.ModifyCol(2, 100)
    clientList.ModifyCol(3, 0)
    clientList.ModifyCol(4, 0)
    clientList.ModifyCol(5, 0)
    clientList.ModifyCol(6, 0)
    clientList.ModifyCol(7, 0)
    clientList.ModifyCol(8, 0)
    clientList.ModifyCol(9, 0)
    clientList.ModifyCol(10, 0)
    clientList.ModifyCol(11, 0)

    mainGui.AddGroupBox("Section xs w420 h400", "Action Queue").SetFont("w700")
    actionList := mainGui.AddListView("xp+10 yp+20 w400 NoSortHdr r20", ["Id", "Name", "Action", "Time", "Time"])
    actionList.ModifyCol(1, 70)
    actionList.ModifyCol(2, 100)
    actionList.ModifyCol(3, 135)
    actionList.ModifyCol(4, "0 Float Sort")
    actionList.ModifyCol(5, 70)

    mainGui.Show("w440 h625")
    mainGui.Move(-8, 0)

}

displaySettingsGui() {
    global

    settingsGui := Gui()
    settingsGui.Title := ""
    settingsGui.SetFont("s8", "Segoe UI")

    settingsGui.AddText("Section", "Window Id")
    windowId := settingsGui.AddEdit("xp ReadOnly", "")

    settingsGui.AddText("xm", "Saved Configs")
    savedConfigs := settingsGui.AddDropDownList("Sort",)
    savedConfigs.OnEvent("Change", loadConfigFromSaved)

    settingsGui.AddGroupBox("xm w150 h70", "Account").SetFont("w700")
    settingsGui.AddText("xp+10 yp+20", "Account Name")
    accountName := settingsGui.AddEdit("xp", "")

    settingsGui.AddGroupBox("xm w150 h210", "Keybinds").SetFont("w700")
    settingsGui.AddText("xp+10 yp+20", "Flag Keybind")
    flagKeybind := settingsGui.AddHotkey()
    settingsGui.AddText("xp", "Sprinkler Keybind")
    sprinklerKeybind := settingsGui.AddHotkey()
    settingsGui.AddText("xp", "Event Keybind")
    eventKeybind := settingsGui.AddHotkey()    
    settingsGui.AddText("xp", "Supercomputer Keybind")
    supercomputerKeybind := settingsGui.AddHotkey()

    settingsGui.AddGroupBox("xm w150 h100", "Daycare").SetFont("w700")
    daycareUse := settingsGui.AddCheckBox("xp+10 yp+20", "Use Daycare")
    settingsGui.AddText("xp", "Daycare Slots") 
    daycareSlots := settingsGui.AddSlider("Range10-55 Line1 TickInterval5 ToolTipTop")
    
    settingsGui.AddGroupBox("xm w150 h85", "Hatching").SetFont("w700")      
    hatchEggs := settingsGui.AddCheckBox("xp+10 yp+20", "Hatch Eggs")
    chargedEggs := settingsGui.AddCheckBox("xp", "Charged Eggs")
    goldenEggs := settingsGui.AddCheckBox("xp", "Golden Eggs")
    
    saveButton := settingsGui.AddButton("xm", "Save")
    saveButton.OnEvent("Click", saveAccountSettings)    
    saveAllButton := settingsGui.AddButton("yp", "Save All")
    saveAllButton.OnEvent("Click", saveAllAccountSettings)        

    populateSavedConfigsDropdown()

    mainGui.GetClientPos(&mainX, &mainY, &mainW, &mainH)

    accountX := mainX + mainW - 6
    settingsGui.Show("w200 h625")
    settingsGui.Move(accountX, 0)

}

; Function to handle the KeyDown event using OnMessage
WM_KEYDOWN(wParam, lParam, msg, hwnd)
{
    ; Exit if the key is not the DELETE key.
    if wParam != 0x2E
        return

    if clientList.Hwnd = hwnd {
        selectedRow := clientList.GetNext(0, "Focused")
        if (selectedRow > 0)
            clientList.Delete(selectedRow)
    }

    ;if actionList.Hwnd = hwnd {
    ;    selectedRow := actionList.GetNext(0, "Focused")
    ;    if (selectedRow > 0)
    ;        actionList.Delete(selectedRow)
    ;}
}

guiKeyDown(key, info) {
    if key != 46
        return
    
    selectedRow := clientList.GetNext(0, "Focused")
    if (selectedRow > 0)
        clientList.Delete(selectedRow)
}

selectClient(*) {
    if clientList.GetCount() > 0 {

        displaySettingsGui()

        row := clientList.GetNext(0, "Focused")
        handle := clientList.GetText(row, 1)
        activateWindow(handle)

        selectedRow := clientList.GetNext(, "F")
        windowId.Text := clientList.GetText(selectedRow, CLIENT_LIST_ID_COLUMN)
        name := clientList.GetText(selectedRow, CLIENT_LIST_NAME_COLUMN)
        accountName.Text := name
        flagKeybind.Value := clientList.GetText(selectedRow, CLIENT_LIST_FLAG_KEYBIND_COLUMN)
        sprinklerKeybind.Value := clientList.GetText(selectedRow, CLIENT_LIST_SPRINKLER_KEYBIND_COLUMN)
        eventKeybind.Value := clientList.GetText(selectedRow, CLIENT_LIST_EVENT_KEYBIND_COLUMN)
        supercomputerKeybind.Value := clientList.GetText(selectedRow, CLIENT_LIST_SUPERCOMPUTER_KEYBIND_COLUMN)

        charged := clientList.GetText(selectedRow, CLIENT_LIST_CHARGED_EGGS_COLUMN)
        chargedEggs.Value := charged != "" ? charged : 0

        golden := clientList.GetText(selectedRow, CLIENT_LIST_GOLDEN_EGGS_COLUMN)
        goldenEggs.Value := golden != "" ? golden : 0

        daycare := clientList.GetText(selectedRow, CLIENT_LIST_DAYCARE_SLOTS_COLUMN)
        daycareSlots.Value := daycare != "" ? daycare : 10

        daycare := clientList.GetText(selectedRow, CLIENT_LIST_DAYCARE_USE_COLUMN)
        daycareUse.Value := daycare != "" ? daycare : 1

        hatch := clientList.GetText(selectedRow, CLIENT_LIST_HATCH_EGGS_COLUMN)
        hatchEggs.Value := hatch != "" ? hatch : 1

        if name = ""
            openLeaderboard()

    }
}

saveAllAccountSettings(*) {
    updateClientSettings(true)
}

saveAccountSettings(*) {
    updateClientSettings()
}

updateClientSettings(updateAll := false) {
    settings := Map(
        "windowId", windowId.Text,
        "account", accountName.Text,
        "flag", flagKeybind.Value,
        "sprinkler", sprinklerKeybind.Value,
        "event", eventKeybind.Value,
        "supercomputer", supercomputerKeybind.Value,
        "chargedEggs", chargedEggs.Value,
        "goldenEggs", goldenEggs.Value,
        "daycareSlots", daycareSlots.Value,
        "daycareUse", daycareUse.Value,
        "hatchEggs", hatchEggs.Value
    )

    Loop clientList.GetCount() {
        clientId := clientList.GetText(A_Index, CLIENT_LIST_ID_COLUMN)

        if updateAll {
            settings["account"] := accountName.Text "_" A_Index
            settings["windowId"] := clientId            
            clientList.Modify(A_Index,,, 
                settings["account"],
                settings["flag"],
                settings["sprinkler"],
                settings["event"],
                settings["supercomputer"],
                settings["chargedEggs"],
                settings["goldenEggs"],
                settings["daycareSlots"],
                settings["daycareUse"],
                settings["hatchEggs"]
                )
            saveAccountSettingsToFile(settings)
        }
        else if clientId = settings["windowId"] {
            clientList.Modify(A_Index,,, 
                settings["account"],
                settings["flag"],
                settings["sprinkler"],
                settings["event"],
                settings["supercomputer"],
                settings["chargedEggs"],
                settings["goldenEggs"],
                settings["daycareSlots"],
                settings["daycareUse"],
                settings["hatchEggs"]
                )
            saveAccountSettingsToFile(settings)
            break
        } 
    }

    settingsGui.Hide

}

saveAccountSettingsToFile(settings) {
    savedConfigFilename := SAVED_CONFIG_FOLDER settings["account"] ".cfg"
    saveConfigFile(savedConfigFilename, settings)

    tempFileName := TEMP_CONFIG_FOLDER settings["windowId"] ".cfg"
    saveConfigFile(tempFileName, settings)
}

populateSavedConfigsDropdown() {
    fileList := []

    Loop Files SAVED_CONFIG_FOLDER "\*.cfg" {
        fileList.Push(A_LoopFileName)
    }

    savedConfigs.Delete()
    savedConfigs.Add(fileList)
}

saveConfigFile(filename, settings) {
    section := "Settings"

    IniWrite settings["account"], filename, section, "AccountName"
    IniWrite settings["flag"], filename, section, "FlagKeybind"
    IniWrite settings["sprinkler"], filename, section, "SprinklerKeybind"
    IniWrite settings["event"], filename, section, "EventKeybind"
    IniWrite settings["supercomputer"], filename, section, "SupercomputerKeybind"
    IniWrite settings["chargedEggs"], filename, section, "ChargedEggs"
    IniWrite settings["goldenEggs"], filename, section, "GoldenEggs"
    IniWrite settings["daycareSlots"], filename, section, "DaycareSlots"
    IniWrite settings["daycareUse"], filename, section, "DaycareUse"
    IniWrite settings["hatchEggs"], filename, section, "HatchEggs"
    
}

loadConfigFromSaved(*) {
    clearConfigSection()

    filePath := SAVED_CONFIG_FOLDER savedConfigs.Text

    ; Read the entire section into a variable.
    sectionContent := IniRead(filePath, "Settings")

    ; Split the section content into individual lines.
    for line in StrSplit(sectionContent, "`n") {
        ; Split each line into key and value.
        keyValue := StrSplit(line, "=")
        key := keyValue[1]
        value := keyValue[2]
        
        ; Assign the value to the corresponding control based on the key.
        switch key {
            case "AccountName":
                accountName.Text := value
            case "FlagKeybind":
                flagKeybind.Value := value
            case "SprinklerKeybind":
                sprinklerKeybind.Value := value
            case "EventKeybind":
                eventKeybind.Value := value                
            case "SupercomputerKeybind":
                supercomputerKeybind.Value := value
            case "ChargedEggs":
                chargedEggs.Value := value
            case "GoldenEggs":
                goldenEggs.Value := value
            case "DaycareSlots":
                daycareSlots.Value := value
            case "DaycareUse":
                daycareUse.Value := value                
            case "HatchEggs":
                hatchEggs.Value := value       
            default:                
        }
    }
}

loadConfigFromTemp(windowId, listIndex) {

    filePath := TEMP_CONFIG_FOLDER windowId ".cfg"

    if !FileExist(filePath)
        return

    settings := Map(
        "account", "",
        "flag", "",
        "sprinkler", "",
        "event", "",
        "supercomputer", "",
        "chargedEggs", "",
        "goldenEggs", "",
        "daycareSlots", "",
        "daycareUse", "",
        "hatchEggs", ""
    )

    ; Read the entire section into a variable.
    sectionContent := IniRead(filePath, "Settings")

    ; Split the section content into individual lines.
    for line in StrSplit(sectionContent, "`n") {
        ; Split each line into key and value.
        keyValue := StrSplit(line, "=")
        key := keyValue[1]
        value := keyValue[2]
        
        ; Assign the value to the corresponding control based on the key.
        switch key {
            case "AccountName":
                settings["account"] := value
            case "FlagKeybind":
                settings["flag"] := value
            case "SprinklerKeybind":
                settings["sprinkler"] := value
            case "EventKeybind":
                settings["event"] := value  
            case "SupercomputerKeybind":
                settings["supercomputer"] := value  
            case "ChargedEggs":
                settings["chargedEggs"] := value
            case "GoldenEggs":
                settings["goldenEggs"] := value
            case "DaycareSlots":
                settings["daycareSlots"] := value                
            case "DaycareUse":
                settings["daycareUse"] := value             
            case "HatchEggs":
                settings["hatchEggs"] := value                            
        }
    }

    clientList.Modify(listIndex,,, 
        settings["account"],
        settings["flag"],
        settings["sprinkler"], 
        settings["event"], 
        settings["supercomputer"], 
        settings["chargedEggs"],
        settings["goldenEggs"],
        settings["daycareSlots"],
        settings["daycareUse"],
        settings["hatchEggs"]
    )

    return settings["account"]
}

clearConfigSection() {
    accountName.Text := ""
    flagKeybind.Value := ""
    sprinklerKeybind.Value := ""
    eventKeybind.Value := ""
    supercomputerKeybind.Value := ""
    hatchEggs.Value := 1
    chargedEggs.Value := 0
    goldenEggs.Value := 0
    daycareSlots.Value := 10
    daycareUse.Value := 1
}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; OCR FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

; ----------------------------------------------------------------------------------------
; getOcrResult Function
; Description: Captures and processes OCR (Optical Character Recognition) results from a specified area of the Roblox window.
; Operation:
;   - Retrieves the top-left coordinates of the Roblox window client area.
;   - Adjusts the OCR start coordinates based on the window position.
;   - Performs OCR on the specified rectangular area.
;   - Returns the OCR result object.
; Dependencies:
;   - WinGetClientPos: Retrieves the position of the client area of the specified window.
;   - OCR.FromRect: Performs OCR on a specified rectangular area.
; Parameters:
;   - ocrStart: Array containing the starting coordinates [x, y] for the OCR area.
;   - ocrSize: Array containing the size [width, height] of the OCR area.
;   - ocrScale: Scale factor for the OCR process.
; Return: OCR result object containing the recognized text and other information.
; ----------------------------------------------------------------------------------------
getOcrResult(ocrStart, ocrSize, ocrScale := 1) {
    WinGetClientPos &windowTopLeftX, &windowTopLeftY, , , "ahk_exe RobloxPlayerBeta.exe"  ; Retrieve the position of the client area of the Roblox window.
    ocrStart := [ocrStart[1] + windowTopLeftX, ocrStart[2] + windowTopLeftY]  ; Adjust the OCR start coordinates based on the window position.

    ; Perform OCR on the specified rectangular area.
    ocrObjectResult := OCR.FromRect(ocrStart[1], ocrStart[2], ocrSize[1], ocrSize[2], , ocrScale)
    
    return ocrObjectResult  ; Return the OCR result object.
}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; GUI FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

; ----------------------------------------------------------------------------------------
; pauseMacro Function
; Description: Toggles the pause state of the macro.
; Operation:
;   - Sends a keystroke to simulate a pause/unpause command.
;   - Toggles the pause state of the script.
; Dependencies:
;   - Send: Function to simulate keystrokes.
; Parameters:
;   - None
; Return: None; toggles the paused state of the macro.
; ----------------------------------------------------------------------------------------
pauseMacro(*) {
    Pause -1  ; Toggle the pause status of the macro.
}


reloadMacro(*) {
    Reload
}

; ----------------------------------------------------------------------------------------
; exitMacro Function
; Description: Exits the macro application completely.
; Operation:
;   - Terminates the application.
; Dependencies:
;   - ExitApp: Command to exit the application.
; Parameters:
;   - None
; Return: None; closes the application.
; ----------------------------------------------------------------------------------------
exitMacro(*) {
    ExitApp  ; Exit the macro application.
}

; ----------------------------------------------------------------------------------------
; openWiki Function
; Description: Opens a help text file in Notepad for user assistance.
; Operation:
;   - Executes Notepad with a specified file path to display help documentation.
; Dependencies:
;   - Run: Function to execute external applications.
; Parameters:
;   - None; uses a global variable for the file path.
; Return: None; opens a text file for user reference.
; ----------------------------------------------------------------------------------------
openWiki(*) {
    Run "https://psychohatcher.com/psychomanager-tutorial/"
}

openDiscord(*) {
    Run "https://discord.gg/psychohatcher"
}

openWebsite(*) {
    Run "https://psychohatcher.com/"
}

; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; SETTINGS.INI FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

; ----------------------------------------------------------------------------------------
; getSetting Function
; Description: Retrieves a setting value from an INI file based on a given key.
; Parameters:
;   - Key: The setting key whose value is to be retrieved.
; Operation:
;   - Reads the value associated with the specified key from a designated INI file section.
; Dependencies:
;   - IniRead: Function used to read data from an INI file.
;   - SETTINGS_INI: Global variable specifying the path to the INI file.
; Return: The value of the specified setting key, returned as a string.
; ----------------------------------------------------------------------------------------
getSetting(keyName) {
    return IniRead(SETTINGS_INI, "Settings", keyName)  ; Read and return the setting value from the INI file.
}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; INITIALISATION SETTINGS/FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰


completeMacroInitialisationTasks() {
    updateTrayIcon()  ; Update the tray icon to indicate that the macro is running.
    defineHotKeys()  ; Define hotkeys for various macro functions.
}

; ----------------------------------------------------------------------------------------
; updateTrayIcon Function
; Description: Sets a custom icon for the application in the system tray.
; Operation:
;   - Composes the file path for the icon and sets it as the tray icon.
; Dependencies: None.
; Return: None; changes the tray icon appearance.
; ----------------------------------------------------------------------------------------
updateTrayIcon() {
    TraySetIcon MACRO_ICON  ; Apply the new tray icon.
}

; ----------------------------------------------------------------------------------------
; defineHotKeys Function
; Description: Sets up hotkeys for controlling macros based on user settings.
; Operation:
;   - Retrieves hotkey settings and binds them to macro control functions.
; Dependencies: getSetting: Retrieves user-configured hotkey preferences.
; Return: None; configures hotkeys for runtime use.
; ----------------------------------------------------------------------------------------
defineHotKeys() {
    HotKey START_MACRO, startMacro  ; Bind pause macro hotkey.
    HotKey PAUSE_MACRO, pauseMacro  ; Bind pause macro hotkey.
    HotKey EXIT_MACRO, exitMacro  ; Bind exit macro hotkey.
}



; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; AUTO-RECONNECT FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

; ----------------------------------------------------------------------------------------
; checkForDisconnection Function
; Description: Monitors the game to detect if a disconnection has occurred and attempts to reconnect.
; Operation:
;   - Updates the current action status to reflect the connection check.
;   - Determines if a disconnection has occurred.
;   - Initiates a reconnection process if disconnected.
;   - Resets the action status after checking.
; Dependencies:
;   - setCurrentAction, checkForDisconnect, Reconnect: Functions to update UI, check connection, and handle reconnection.
; Return: None; primarily controls game connectivity status.
; ----------------------------------------------------------------------------------------
checkForDisconnection() {

    isDisconnected := checkForDisconnect()  ; Check for any disconnection.
    if (isDisconnected == true) {
        reconnectClient()  ; Reconnect if disconnected.
        startMacro()  ; Reload the script to refresh all settings and start fresh.
    }
}

; ----------------------------------------------------------------------------------------
; Reconnect Function
; Description: Handles the reconnection process by attempting to reconnect to a Roblox game, optionally using a private server.
; Operation:
;   - Retrieves the necessary reconnection settings (time and private server code).
;   - Initiates a connection to Roblox using the appropriate URL scheme.
;   - Displays the reconnect progress in the system tray icon.
; Dependencies:
;   - getSetting, setCurrentAction: Functions to retrieve settings and update UI.
; Return: None; attempts to reconnect to the game.
; ----------------------------------------------------------------------------------------
reconnectClient(*) {
    reconnectTime := getSetting("ReconnectTimeSeconds")  ; Get the reconnect duration.

    privateServerLinkCode := getSetting("PrivateServerLinkCode")  ; Get the private server code.
    if (privateServerLinkCode == "") {
        try Run "roblox://placeID=8737899170"  ; Default reconnect without private server.
    }
    else {
        try Run "roblox://placeID=8737899170&linkCode=" privateServerLinkCode  ; Reconnect using private server link.
    }

    Loop reconnectTime {
        Sleep ONE_SECOND  ; Wait for 1 second.
    }
}

; ----------------------------------------------------------------------------------------
; checkForDisconnect Function
; Description: Checks if the Roblox game has been disconnected by searching for specific phrases within a designated window area.
; Operation:
;   - Activates the Roblox window to ensure it is in focus.
;   - Uses OCR to scan a specific window area for text.
;   - Matches the OCR result against known disconnection phrases.
; Dependencies:
;   - activateRoblox: Function to bring the Roblox window into focus.
;   - getOcrResult: Function to perform OCR on a specified area of the screen.
; Parameters: None
; Return: Boolean value indicating if disconnection phrases are detected (true) or not (false).
; ----------------------------------------------------------------------------------------
checkForDisconnect() {
    disconnectedWindowStart := [201, 175]  ; Define the start coordinates for the disconnection window.
    disconnectedWindowSize := [398, 248]   ; Define the size of the disconnection window.
    
    ; Perform OCR on the specified window area with a scaling factor of 20.
    ocrTextResult := getOcrResult(disconnectedWindowStart, disconnectedWindowSize, 20)
    
    ; Check for disconnection phrases in the OCR result.
    return (regexMatch(ocrTextResult.Text, "Disconnected|Reconnect|Leave"))
}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; WINDOW FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

; ----------------------------------------------------------------------------------------
; closeChatLog Function
; Description: Closes the chat log in the game if it is open by searching for a specific pixel color and clicking on it.
; Operation:
;   - Searches for a specific pixel color at given coordinates.
;   - Clicks on the found pixel to close the chat log.
; Dependencies:
;   - PixelSearch: Searches for a pixel of a specific color within a defined area.
; Parameters: None
; Return: None
; ----------------------------------------------------------------------------------------
closeChatLog() {
    pixel := [81, 24]  ; Coordinates of the pixel to search for.
    colour := "0xFFFFFF"  ; Color of the pixel to search for.
    
    ; Search for the specific pixel color at the given coordinates.
    if PixelSearch(&foundX, &foundY, pixel[1], pixel[2], pixel[1], pixel[2], colour, 2)
        SendEvent "{Click, " foundX ", " foundY ", 1}"  ; Click on the found pixel to close the chat log.
}

; ----------------------------------------------------------------------------------------
; changeToDefaultFont Function
; Description: Copies specific font files to the Roblox font directory to update the default fonts.
; Operation:
;   - Copies the 'FredokaOne-Regular.ttf' font file to the Roblox font path.
;   - Copies the 'SourceSansPro-Bold.ttf' font file to the Roblox font path.
; Parameters:
;   - *: Indicates the function may potentially accept parameters, though not used here.
; Dependencies:
;   - FREDOKA_ONE_REGULAR, SOURCE_SANS_PRO_BOLD: Global variables holding the paths to the font files.
;   - g_robloxFontPath: Global variable holding the path to the Roblox font directory.
;   - FileCopy: Function used to copy files.
; Return: None; modifies the file system by updating font files in Roblox directory.
; ----------------------------------------------------------------------------------------
changeToDefaultFont(*) {
    robloxFontPath := StrReplace(WinGetProcessPath("ahk_exe RobloxPlayerBeta.exe"), "RobloxPlayerBeta.exe", "") "content\fonts\"  ; Path to Roblox fonts directory.
    FileCopy FREDOKA_ONE_REGULAR, robloxFontPath "FredokaOne-Regular.ttf", true  ; Copy Fredoka One font.
    FileCopy SOURCE_SANS_PRO_BOLD, robloxFontPath "SourceSansPro-Bold.ttf", true  ; Copy Source Sans Pro Bold font.
    reconnectClient()
}

scrollMouseWheel(scrollDirection, timesToScroll := 1) {
    Loop timesToScroll {  ; Repeat scroll for the number of specified increments.
        Send scrollDirection  ; Send scroll command in the specified direction.
        Sleep 50  ; Short pause to mimic natural scrolling behavior.
    }
}

useUltimate(clientId) {
    Loop 100 {
        SendEvent "r"
        Sleep 10
    }
}

placeFlag(clientId) {
    keybind := CLIENT_MAP[clientId]["flag"]

    if keybind = ""
        return

    SendEvent keybind

    Sleep 250
    if isOopsWindowOpen() {
        Loop 100 {
            closeErrorMessageWindow()
            if !isOopsWindowOpen()
                break
            Sleep 10
        }
    }  
}

placeSprinkler(clientId) {
    keybind := CLIENT_MAP[clientId]["sprinkler"]

    if keybind = ""
        return

    SendEvent keybind

    Sleep 250
    if isOopsWindowOpen() {
        Loop 100 {
            closeErrorMessageWindow()
            if !isOopsWindowOpen()
                break
            Sleep 10
        }
    }
}

startEvent(clientId) {
    keybind := CLIENT_MAP[clientId]["event"]

    if keybind = ""
        return

    SendEvent keybind

    Sleep 250
    if isOopsWindowOpen() {
        Loop 100 {
            closeErrorMessageWindow()
            if !isOopsWindowOpen()
                break
            Sleep 10
        }
    }
}

isOopsWindowOpen() {
    area := [434, 287, 438, 291]
    colour := "0xFFB436"
    try
        isOpen := PixelSearch(&foundX, &foundY, area[1], area[2], area[3], area[4], colour, 5)
    catch
        isOpen := true
    return isOpen
}

closeErrorMessageWindow() {
    button := [622, 110]
    SendEvent "{Click, " button[1] ", " button[2] ", 1}"
}

zoomCameraOut(time) {
    Send "{o down}"  ; Hold down the 'i' key to zoom in.
    Sleep time  ; Sleep for the specified duration.
    Send "{o up}"  ; Release the 'i' key.
}

changeCameraToOverheadView() {

    SendEvent "{Click, " 600 ", " 400 ", 1}"
    Sleep 200
    SendEvent "{RButton down}"
    Sleep 200
    MouseMove 0, 30, 50, "R"
    Sleep 200
    SendEvent "{RButton up}"
    Sleep 200

    return true
}

addActionToQueue(clientId, action, time) {
    formattedTime := FormatTime(time, "HH:mm:ss")
    actionList.Add(, clientId, CLIENT_MAP[clientId]["name"], action, time, formattedTime)
}

changeWorlds(clientId) {
    teleportToWorld(1)
    teleportToWorld(3)
}

activateMouseHover() {
    Sleep 50
    MouseMove 1, 1,, "R"
    Sleep 50
    MouseMove -1, -1,, "R"
    Sleep 50
}

moveMouseToCentreOfScreen() {
    MouseMove 400, 300
    Sleep 100
}

