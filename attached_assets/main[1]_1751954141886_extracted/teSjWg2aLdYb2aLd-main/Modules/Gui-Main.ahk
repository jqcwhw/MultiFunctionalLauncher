#Requires AutoHotkey v2.0

; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; GUI INITIALISATION
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

displayQuestsGui() {
    global

    ; Initialize the main GUI with "AlwaysOnTop" property.
    mainGui := Gui()
    mainGui.Title := MACRO_TITLE " v" MACRO_VERSION
    mainGui.SetFont("s8", "Segoe UI")

    fileMenu := Menu()
    startText := "Start Macro`tF1"
    pauseText := "Pause Macro`tF2"
    exitText := "Exit Macro`tF3"
    fileMenu.Add(startText, startMacro)
    fileMenu.Add()
    fileMenu.Add(pauseText, pauseMacro)
    fileMenu.Add("Reload Macro", reloadMacro)
    fileMenu.Add()
    fileMenu.Add(exitText, exitMacro)
    fileMenu.SetIcon(startText, "imageres.dll", 282)
    fileMenu.SetIcon(pauseText, ICON_FOLDER ICON_MAP["PlayPause"].icon)
    fileMenu.SetIcon("Reload Macro", "imageres.dll", 230)
    fileMenu.SetIcon(exitText, "imageres.dll", 94)

    toolsMenu := Menu()
    toolsMenu.Add("Keybinds", setKeybinds)
    toolsMenu.Add()    
    toolsMenu.Add("Reconnect", reconnectClient)
    toolsMenu.Add("Standard Font", changeToDefaultFont)
    toolsMenu.SetIcon("Reconnect", WinGetProcessPath("ahk_exe RobloxPlayerBeta.exe"), 1)
    toolsMenu.SetIcon("Standard Font", ICON_FOLDER ICON_MAP["Font"].icon)

    helpMenu := Menu()
    helpMenu.Add("How To", openHowTo)
    helpMenu.Add()
    helpMenu.Add("Discord", openDiscord)
    helpMenu.Add("Website", openWebsite)
    helpMenu.Add()
    helpMenu.Add("Donate", openDonate)
    helpMenu.SetIcon("How To", "imageres.dll", 95)    
    helpMenu.SetIcon("Discord", ICON_FOLDER ICON_MAP["Discord"].icon)
    helpMenu.SetIcon("Website", ICON_FOLDER ICON_MAP["PsychoHatcher"].icon)
    helpMenu.SetIcon("Donate", ICON_FOLDER ICON_MAP["Donate"].icon)
    
    MyMenuBar := MenuBar()
    MyMenuBar.Add("&File", fileMenu)
    MyMenuBar.Add("&Tools", toolsMenu)    
    MyMenuBar.Add("&Help", helpMenu)
    mainGui.MenuBar := MyMenuBar

    ; Create a list view for quests with various columns.
    lvQuests := mainGui.AddListView("r4 w650 NoSortHdr", ["★", "Type", "Quest", "Amount", "Priority", "Status", "Zone", "OCR"])
    lvQuests.ModifyCol(1, 25)  ; Modify column widths for better data presentation.
    lvQuests.ModifyCol(2, 0)
    lvQuests.ModifyCol(3, 200)
    lvQuests.ModifyCol(4, 55)
    lvQuests.ModifyCol(5, 50)
    lvQuests.ModifyCol(6, 60)
    lvQuests.ModifyCol(7, 40)
    lvQuests.ModifyCol(8, 200)  ; Set the last column width to 0 as it may contain OCR data not needed for display.

    ; Create another list view for displaying current activities.
    lvCurrent := mainGui.AddListView("xs r1 w650 NoSortHdr", ["Loop", "Zone", "Area", "Quest", "Action", "Time"])
    lvCurrent.Add(, "-", "-", "-", "-", "-")  ; Initialize with a default row.
    lvCurrent.ModifyCol(1, 50)
    lvCurrent.ModifyCol(2, 40)
    lvCurrent.ModifyCol(3, 100)
    lvCurrent.ModifyCol(4, 200)
    lvCurrent.ModifyCol(5, 200)
    lvCurrent.ModifyCol(6, 40)

    mainGui.AddText("Section", "Player Settings")
    playerSettings := mainGui.AddDropDownList("Sort",)
    playerSettings.OnEvent("Change", (*) => loadPlayerSettings())    
    openSettings := mainGui.AddButton("yp", "Settings")
    openSettings.OnEvent("Click", (*) => openSettingsGui())
    deleteSettings := mainGui.AddButton("yp", "Delete")
    deleteSettings.OnEvent("Click", (*) => deleteSelectedSetting())

    statusBar := mainGui.AddStatusBar(, "")

    ; Display the GUI window.
    mainGui.Show()

    ; Retrieve and adjust the GUI window position to the top right of the screen.
    mainGui.GetPos(,, &Width,)
    mainGui.Move(A_ScreenWidth - Width + 8, 0)

    createSettingsGui()
    populatePlayerSettingsDropdown()

}


; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; GUI FUNCTIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

pauseMacro(*) {
    writeToLogFile("*** PAUSED ***")
    Pause -1
}

exitMacro(*) {
    ExitApp  ; Exit the macro application.
}

openHowTo(*) {
    Run "https://psychohatcher.com/rankup-tutorial/"
}

openDiscord(*) {
    Run "https://discord.gg/psychohatcher"
}

openWebsite(*) {
    Run "https://psychohatcher.com/"
}

openDonate(*) {
    Run "https://psychohatcher.com/donate/"
}

reloadMacro(*) {
    Reload
}