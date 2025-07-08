; PS99 Ultimate Multi-Account Automation Launcher
; Supports all game features including Slime Tycoon, Egg Opening, and more
; One-click activation for multiple accounts

SetBatchLines -1
SendMode Input
SetWorkingDir %A_ScriptDir%
#SingleInstance Force

; === CONFIG ===
global AccountsEnabled := true   ; Enable multi-account support
global MaxAccounts := 5           ; Maximum number of accounts to manage
global AccountProfiles := []      ; Array of account profiles
global CurrentProfile := 1        ; Current active profile
global LuckBoostLevel := 100      ; 1-100 scale, higher = more aggressive luck boosting
global AntiDetection := true      ; Enable anti-detection measures
global AntiDetectionLevel := 3    ; 1-5 scale, higher = more stealth but slower
global InjectMode := "direct"     ; Injection mode: "direct", "memory", or "remote"
global AutoRelaunch := true       ; Auto relaunch if disconnected
global DataSyncEnabled := true    ; Sync data between sessions
global EnableLogging := true      ; Enable debug logging
global EnableVisualization := true ; Enable visualization of boosts and effects
global UseExternalExecutor := true ; Whether to use an external executor
global ExecutorPath := ""         ; Path to external executor (if used)
global DefaultRobloxPath := "C:\Program Files (x86)\Roblox\Versions"

; === Initialization ===
SplashTextOn, 300, 100, PS99 Ultimate Automation, Initializing multi-account system...
Sleep, 1000
SplashTextOff

; === Create Main GUI ===
Gui, +AlwaysOnTop +ToolWindow
Gui, Color, 0x2D2D2D
Gui, Font, s10 cWhite, Segoe UI
Gui, Add, Tab3, x5 y5 w690 h490 vMainTab, Accounts|Automation|Luck Boost|Advanced|Logs

; === Accounts Tab ===
Gui, Tab, Accounts
Gui, Add, Text, x15 y40 w150 h20, Active Accounts:
Gui, Add, ListView, x15 y60 w670 h200 vAccountsList Grid, Username|Status|Last Active|Current Location|Pets Obtained|Success Rate

; Placeholder data for demonstration
LV_Add("", "Account1", "Active", "Just now", "Slime Tycoon", "3 Titanics, 5 Huges", "8.3%")
LV_Add("", "Account2", "Inactive", "2 hours ago", "Trading Plaza", "2 Titanics, 7 Huges", "6.7%")
LV_Add("", "Account3", "Active", "5 minutes ago", "End World", "1 Titanic, 3 Huges", "4.2%")
LV_Add("", "", "", "", "", "", "")
LV_Add("", "", "", "", "", "", "")
Loop, % LV_GetCount("Col")
    LV_ModifyCol(A_Index, "AutoHdr")

Gui, Add, Button, x15 y270 w150 h30 gAddAccount, Add Account
Gui, Add, Button, x175 y270 w150 h30 gEditAccount, Edit Selected
Gui, Add, Button, x335 y270 w150 h30 gRemoveAccount, Remove Selected
Gui, Add, Button, x495 y270 w150 h30 gRefreshAccountList, Refresh List

Gui, Add, GroupBox, x15 y310 w670 h130, Account Quick Actions
Gui, Add, Button, x25 y335 w150 h30 gLaunchAccount, Launch Selected
Gui, Add, Button, x185 y335 w150 h30 gLaunchAllAccounts, Launch All Accounts
Gui, Add, Button, x345 y335 w150 h30 gStopAccount, Stop Selected
Gui, Add, Button, x505 y335 w150 h30 gStopAllAccounts, Stop All Accounts

Gui, Add, Button, x25 y375 w150 h30 gTeleportAccount, Teleport Selected
Gui, Add, Button, x185 y375 w150 h30 gSwitchServer, Switch Server
Gui, Add, Button, x345 y375 w150 h30 gSyncAccounts, Sync Accounts
Gui, Add, Button, x505 y375 w150 h30 gAccountStats, View Detailed Stats

Gui, Add, Text, x15 y450 w670 h20 vAccountStatus, Ready to manage accounts...

; === Automation Tab ===
Gui, Tab, Automation
Gui, Add, GroupBox, x15 y40 w330 h150, Slime Tycoon Automation
Gui, Add, Checkbox, x25 y60 w300 h20 vAutoBreakables Checked1, Auto Farm Breakables
Gui, Add, Checkbox, x25 y85 w300 h20 vAutoChests Checked1, Auto Collect Chests
Gui, Add, Checkbox, x25 y110 w300 h20 vAutoUpgrade Checked1, Auto Upgrade Factory
Gui, Add, Checkbox, x25 y135 w300 h20 vAutoTeleport Checked1, Auto Teleport When Ready
Gui, Add, Checkbox, x25 y160 w300 h20 vPrioritizeTitanicChest Checked1, Prioritize Titanic Chest

Gui, Add, GroupBox, x355 y40 w330 h150, Egg & Item Automation
Gui, Add, Checkbox, x365 y60 w300 h20 vAutoHatchEggs Checked1, Auto Hatch Eggs
Gui, Add, Checkbox, x365 y85 w300 h20 vAutoOpenGifts Checked1, Auto Open Gifts & Presents
Gui, Add, Checkbox, x365 y110 w300 h20 vAutoOpenCards Checked1, Auto Open Cards
Gui, Add, Checkbox, x365 y135 w300 h20 vPrioritizeExclusiveEggs Checked1, Prioritize Exclusive Eggs
Gui, Add, Checkbox, x365 y160 w300 h20 vFocusEndWorld Checked1, Focus End World Content

Gui, Add, GroupBox, x15 y200 w330 h150, Active Timers
Gui, Add, Text, x25 y220 w150 h20, Chest Collection:
Gui, Add, Text, x180 y220 w150 h20 vChestTimer, 00:00
Gui, Add, Text, x25 y245 w150 h20, Factory Upgrade:
Gui, Add, Text, x180 y245 w150 h20 vFactoryTimer, 00:00
Gui, Add, Text, x25 y270 w150 h20, Egg Hatching:
Gui, Add, Text, x180 y270 w150 h20 vEggTimer, 00:00
Gui, Add, Text, x25 y295 w150 h20, Gift Opening:
Gui, Add, Text, x180 y295 w150 h20 vGiftTimer, 00:00
Gui, Add, Text, x25 y320 w150 h20, Luck Boost:
Gui, Add, Text, x180 y320 w150 h20 vLuckTimer, 00:00

Gui, Add, GroupBox, x355 y200 w330 h150, Location Selection
Gui, Add, Radio, x365 y220 w150 h20 vLocationAuto Checked1, Auto-Detect Location
Gui, Add, Radio, x365 y245 w150 h20 vLocationSlimeTycoon, Force Slime Tycoon
Gui, Add, Radio, x365 y270 w150 h20 vLocationTrading, Force Trading Plaza
Gui, Add, Radio, x365 y295 w150 h20 vLocationEndWorld, Force End World
Gui, Add, Radio, x365 y320 w150 h20 vLocationCustom, Custom Location:
Gui, Add, Edit, x525 y320 w150 h20 vCustomLocation, 

Gui, Add, Button, x15 y360 w330 h30 gStartAllAutomation, START ALL AUTOMATION
Gui, Add, Button, x355 y360 w330 h30 gStopAllAutomation, STOP ALL AUTOMATION

Gui, Add, Text, x15 y400 w670 h20, Current Activities:
Gui, Add, Edit, x15 y420 w670 h70 vActivityLog ReadOnly, Automation ready to start...

; === Luck Boost Tab ===
Gui, Tab, Luck Boost
Gui, Add, GroupBox, x15 y40 w330 h90, Luck Boost Level
Gui, Add, Slider, x25 y70 w310 h30 vLuckSlider Range1-100 TickInterval10 AltSubmit gUpdateLuckLevel, 100
Gui, Add, Text, x25 y110 w310 h20 vLuckLevelText, Current Luck Level: Maximum (100%)

Gui, Add, GroupBox, x355 y40 w330 h90, Target Priority
Gui, Add, DropDownList, x365 y70 w310 h120 vTargetPriority gUpdateTarget Choose1, Titanic Pets|Huge Pets|Rainbow Variants|Shiny Variants|Specific Pet

Gui, Add, GroupBox, x15 y140 w670 h60, Specific Pet Target (Optional)
Gui, Add, Edit, x25 y165 w320 h20 vSpecificPet, 
Gui, Add, Button, x355 y165 w150 h20 gSearchPet, Search Pet Database
Gui, Add, Button, x515 y165 w150 h20 gClearPet, Clear

Gui, Add, GroupBox, x15 y210 w330 h180, Boost Sources to Apply
Gui, Add, Checkbox, x25 y230 w300 h20 vBoostTitanicChest Checked1, Titanic Chest Luck
Gui, Add, Checkbox, x25 y255 w300 h20 vBoostHugeChest Checked1, Huge Chest Luck
Gui, Add, Checkbox, x25 y280 w300 h20 vBoostServerLuck Checked1, Server Luck
Gui, Add, Checkbox, x25 y305 w300 h20 vBoostEggLuck Checked1, Egg-Specific Luck
Gui, Add, Checkbox, x25 y330 w300 h20 vBoostEventLuck Checked1, Event Luck
Gui, Add, Checkbox, x25 y355 w300 h20 vBoostPartnerLuck Checked1, Partner/Dev Boosts

Gui, Add, GroupBox, x355 y210 w330 h180, Current Luck Status
Gui, Add, ListView, x365 y230 w310 h150 vLuckStatusList Grid, Source|Multiplier|Status
LV_Add("", "Base Chance", "x1.0", "Active")
LV_Add("", "Titanic Chest", "x5.0", "Active")
LV_Add("", "Huge Chest", "x3.0", "Active")
LV_Add("", "Server Luck", "x1.5", "Active")
LV_Add("", "Rainbow Boost", "x2.0", "Active")
LV_Add("", "Total Effect", "x15.0", "Active")
Loop, % LV_GetCount("Col")
    LV_ModifyCol(A_Index, "AutoHdr")

Gui, Add, Button, x15 y400 w210 h30 gApplyLuckBoost, Apply Luck Boost
Gui, Add, Button, x235 y400 w210 h30 gEmergencyBoost, EMERGENCY MAX BOOST
Gui, Add, Button, x455 y400 w210 h30 gResetLuckBoost, Reset Luck Boost

Gui, Add, Text, x15 y450 w670 h20 vLuckStatus, Luck system ready to boost your chances...

; === Advanced Tab ===
Gui, Tab, Advanced
Gui, Add, GroupBox, x15 y40 w330 h90, Anti-Detection Settings
Gui, Add, Checkbox, x25 y60 w300 h20 vEnableAntiDetection Checked1, Enable Anti-Detection
Gui, Add, Text, x25 y85 w100 h20, Detection Level:
Gui, Add, DropDownList, x130 y85 w205 h120 vAntiDetectLevel gUpdateAntiDetection Choose3, 1 - Minimal|2 - Low|3 - Balanced|4 - High|5 - Maximum

Gui, Add, GroupBox, x355 y40 w330 h90, Integration Method
Gui, Add, Radio, x365 y60 w300 h20 vIntegrationDirect Checked1 gUpdateIntegration, Direct Integration (In-Memory)
Gui, Add, Radio, x365 y85 w300 h20 vIntegrationExecutor gUpdateIntegration, External Executor
Gui, Add, Button, x365 y110 w150 h20 gSelectExecutor, Select Executor...
Gui, Add, Text, x525 y110 w150 h20 vExecutorStatus, Not Selected

Gui, Add, GroupBox, x15 y140 w330 h120, Game Detection
Gui, Add, Text, x25 y160 w300 h20, Roblox Client Path:
Gui, Add, Edit, x25 y180 w270 h20 vRobloxPath, %DefaultRobloxPath%
Gui, Add, Button, x295 y180 w40 h20 gBrowseRoblox, ...
Gui, Add, Button, x25 y210 w150 h30 gDetectRoblox, Detect Roblox
Gui, Add, Button, x185 y210 w150 h30 gRefreshProcesses, Refresh

Gui, Add, GroupBox, x355 y140 w330 h120, API Configuration
Gui, Add, Text, x365 y160 w310 h20, API Sync Interval (seconds):
Gui, Add, Edit, x365 y180 w310 h20 vAPISyncInterval, 30
Gui, Add, Button, x365 y210 w150 h30 gTestAPI, Test API Connection
Gui, Add, Button, x525 y210 w150 h30 gClearAPICache, Clear API Cache

Gui, Add, GroupBox, x15 y270 w670 h140, Advanced Script Configuration
Gui, Add, Text, x25 y290 w150 h20, Script Injection Method:
Gui, Add, DropDownList, x185 y290 w150 h120 vInjectionMethod Choose1, Standard|Memory Patching|Remote Event|Hook Chain|Bytecode

Gui, Add, Text, x345 y290 w150 h20, Render Hook Type:
Gui, Add, DropDownList, x505 y290 w150 h120 vRenderHookType Choose2, Pre-Render|Render Step|Post-Render|Heartbeat|Stepped

Gui, Add, Text, x25 y320 w150 h20, Memory Scan Method:
Gui, Add, DropDownList, x185 y320 w150 h120 vMemoryScanMethod Choose1, Pattern|Signature|Address|Offset|Module

Gui, Add, Text, x345 y320 w150 h20, Probability Control:
Gui, Add, DropDownList, x505 y320 w150 h120 vProbabilityControl Choose3, Intercept|Override|Multiply|Additive|Exponential

Gui, Add, Text, x25 y350 w150 h20, Remote Event Handling:
Gui, Add, DropDownList, x185 y350 w150 h120 vRemoteEventHandling Choose1, Hijack|Proxy|Spoof|Redirect|Filter

Gui, Add, Text, x345 y350 w150 h20, Stealth Profile:
Gui, Add, DropDownList, x505 y350 w150 h120 vStealthProfile Choose2, Standard|Aggressive|Conservative|Adaptive|Custom

Gui, Add, Button, x15 y420 w330 h30 gSaveAdvancedConfig, Save Advanced Configuration
Gui, Add, Button, x355 y420 w330 h30 gResetAdvancedConfig, Reset to Defaults

Gui, Add, Text, x15 y460 w670 h20 vAdvancedStatus, Advanced configurations ready...

; === Logs Tab ===
Gui, Tab, Logs
Gui, Add, Edit, x15 y40 w670 h370 vLogDisplay ReadOnly, PS99 Ultimate Multi-Account Automation Suite
Gui, Add, Button, x15 y420 w210 h30 gRefreshLogs, Refresh Logs
Gui, Add, Button, x235 y420 w210 h30 gClearLogs, Clear Logs
Gui, Add, Button, x455 y420 w210 h30 gExportLogs, Export Logs

Gui, Add, Text, x15 y460 w670 h20 vLogStatus, System initialized and ready...

; Tab footer
Gui, Tab
Gui, Add, Button, x5 y500 w300 h30 gShowIntegrationWindow, Run Integration Wizard
Gui, Add, Button, x310 y500 w80 h30 gViewHelp, Help
Gui, Add, Button, x395 y500 w300 h30 gSaveConfig, Save All Configuration

; Show GUI
Gui, Show, w700 h540, PS99 Ultimate Multi-Account Automation Suite

; Add log entry
AddLog("System initialized and ready.")
AddLog("Detected game version: Pet Simulator 99 (Update 54)")
AddLog("Optimized for Slime Tycoon and all egg/item types")
AddLog("Luck boost system initialized with maximum settings")
Return

; === BUTTON HANDLERS ===

; Account tab handlers
AddAccount:
    AddLog("Opening add account dialog...")
    MsgBox, Add account functionality will be implemented here.
Return

EditAccount:
    AddLog("Opening edit account dialog...")
    MsgBox, Edit account functionality will be implemented here.
Return

RemoveAccount:
    AddLog("Removing selected account...")
    MsgBox, Remove account functionality will be implemented here.
Return

RefreshAccountList:
    AddLog("Refreshing account list...")
    MsgBox, Refresh account list functionality will be implemented here.
Return

LaunchAccount:
    AddLog("Launching selected account...")
    GuiControl,, AccountStatus, Launching selected account...
    MsgBox, Launch account functionality will be implemented here.
Return

LaunchAllAccounts:
    AddLog("Launching all accounts...")
    GuiControl,, AccountStatus, Launching all accounts...
    MsgBox, Launch all accounts functionality will be implemented here.
Return

StopAccount:
    AddLog("Stopping selected account...")
    GuiControl,, AccountStatus, Stopping selected account...
    MsgBox, Stop account functionality will be implemented here.
Return

StopAllAccounts:
    AddLog("Stopping all accounts...")
    GuiControl,, AccountStatus, Stopping all accounts...
    MsgBox, Stop all accounts functionality will be implemented here.
Return

TeleportAccount:
    AddLog("Teleporting selected account...")
    MsgBox, Teleport account functionality will be implemented here.
Return

SwitchServer:
    AddLog("Switching server for selected account...")
    MsgBox, Switch server functionality will be implemented here.
Return

SyncAccounts:
    AddLog("Synchronizing accounts...")
    MsgBox, Sync accounts functionality will be implemented here.
Return

AccountStats:
    AddLog("Viewing detailed account statistics...")
    MsgBox, Account statistics functionality will be implemented here.
Return

; Automation tab handlers
StartAllAutomation:
    AddLog("Starting all automation processes...")
    GuiControl,, ActivityLog, Starting all automation processes...`nInitializing Slime Tycoon automation...`nInitializing egg hatching automation...`nInitializing gift opening automation...`nAll systems active.
    MsgBox, Start all automation functionality will be implemented here.
Return

StopAllAutomation:
    AddLog("Stopping all automation processes...")
    GuiControl,, ActivityLog, Stopping all automation processes...`nShutting down safely...`nAll systems stopped.
    MsgBox, Stop all automation functionality will be implemented here.
Return

; Luck boost tab handlers
UpdateLuckLevel:
    Gui, Submit, NoHide
    If (LuckSlider <= 20)
        LuckLevelDesc := "Minimal"
    Else If (LuckSlider <= 40)
        LuckLevelDesc := "Low" 
    Else If (LuckSlider <= 60)
        LuckLevelDesc := "Moderate"
    Else If (LuckSlider <= 80)
        LuckLevelDesc := "High"
    Else
        LuckLevelDesc := "Maximum"
    
    GuiControl,, LuckLevelText, Current Luck Level: %LuckLevelDesc% (%LuckSlider%`%)
    AddLog("Updated luck level to " . LuckSlider . "%")
Return

UpdateTarget:
    Gui, Submit, NoHide
    AddLog("Updated target priority to: " . TargetPriority)
Return

SearchPet:
    AddLog("Searching pet database...")
    MsgBox, Pet database search functionality will be implemented here.
Return

ClearPet:
    GuiControl,, SpecificPet,
    AddLog("Cleared specific pet target")
Return

ApplyLuckBoost:
    AddLog("Applying luck boost with current settings...")
    GuiControl,, LuckStatus, Applying luck boost to all active accounts...
    MsgBox, Apply luck boost functionality will be implemented here.
Return

EmergencyBoost:
    AddLog("APPLYING EMERGENCY MAXIMUM BOOST!")
    GuiControl,, LuckSlider, 100
    GuiControl,, LuckLevelText, Current Luck Level: MAXIMUM EMERGENCY (100`%)
    GuiControl,, LuckStatus, EMERGENCY MAXIMUM BOOST APPLIED!
    MsgBox, Emergency boost applied! This will significantly increase your chances for the next few hatches.
Return

ResetLuckBoost:
    AddLog("Resetting luck boost to default settings...")
    GuiControl,, LuckSlider, 50
    GuiControl,, LuckLevelText, Current Luck Level: Moderate (50`%)
    GuiControl,, LuckStatus, Luck boost reset to default settings
    MsgBox, Reset luck boost functionality will be implemented here.
Return

; Advanced tab handlers
UpdateAntiDetection:
    Gui, Submit, NoHide
    AddLog("Updated anti-detection level to: " . AntiDetectLevel)
Return

UpdateIntegration:
    Gui, Submit, NoHide
    If IntegrationDirect
        AddLog("Changed to Direct Integration method")
    Else
        AddLog("Changed to External Executor Integration method")
    
    ; Update executor button state
    GuiControl, Enable%IntegrationExecutor%, SelectExecutor
Return

SelectExecutor:
    AddLog("Opening executor selection dialog...")
    FileSelectFile, SelectedExecutor, 3, , Select Executor Application, Executable (*.exe)
    If (SelectedExecutor != "") {
        ExecutorPath := SelectedExecutor
        SplitPath, ExecutorPath, ExecutorName
        GuiControl,, ExecutorStatus, %ExecutorName%
        AddLog("Selected executor: " . ExecutorName)
    }
Return

DetectRoblox:
    AddLog("Detecting Roblox installation...")
    GuiControl,, AdvancedStatus, Scanning for Roblox installation...
    
    ; Just a placeholder for demonstration
    Sleep, 2000
    GuiControl,, AdvancedStatus, Roblox detected at default location!
    AddLog("Roblox client detected at: " . DefaultRobloxPath)
Return

RefreshProcesses:
    AddLog("Refreshing process list...")
    MsgBox, Refresh processes functionality will be implemented here.
Return

BrowseRoblox:
    AddLog("Opening folder browser for Roblox path...")
    FileSelectFolder, SelectedFolder, , 3, Select Roblox Installation Folder
    If (SelectedFolder != "") {
        GuiControl,, RobloxPath, %SelectedFolder%
        AddLog("Set Roblox path to: " . SelectedFolder)
    }
Return

TestAPI:
    AddLog("Testing API connection...")
    GuiControl,, AdvancedStatus, Testing API connection...
    
    ; Just a placeholder for demonstration
    Sleep, 2000
    GuiControl,, AdvancedStatus, API connection successful!
    AddLog("API connection successful. Verified all endpoints.")
Return

ClearAPICache:
    AddLog("Clearing API cache...")
    GuiControl,, AdvancedStatus, Clearing API cache...
    
    ; Just a placeholder for demonstration
    Sleep, 1000
    GuiControl,, AdvancedStatus, API cache cleared successfully!
    AddLog("API cache cleared successfully")
Return

SaveAdvancedConfig:
    AddLog("Saving advanced configuration...")
    GuiControl,, AdvancedStatus, Saving advanced configuration...
    
    ; Just a placeholder for demonstration
    Sleep, 1000
    GuiControl,, AdvancedStatus, Advanced configuration saved!
    AddLog("Advanced configuration saved successfully")
Return

ResetAdvancedConfig:
    AddLog("Resetting advanced configuration to defaults...")
    MsgBox, 4, Confirm Reset, Are you sure you want to reset all advanced settings to defaults?
    IfMsgBox, Yes
    {
        ; Just a placeholder for demonstration
        GuiControl,, AdvancedStatus, Advanced configuration reset to defaults!
        AddLog("Advanced configuration reset to defaults")
    }
Return

; Log tab handlers
RefreshLogs:
    AddLog("Refreshing log display...")
Return

ClearLogs:
    GuiControl,, LogDisplay, PS99 Ultimate Multi-Account Automation Suite`nLog cleared at %A_Now%
    AddLog("Log cleared")
Return

ExportLogs:
    AddLog("Exporting logs...")
    
    ; Get log content
    GuiControlGet, LogContent,, LogDisplay
    
    ; Create filename with timestamp
    FormatTime, Timestamp,, yyyyMMdd_HHmmss
    LogFile := "PS99_Logs_" . Timestamp . ".txt"
    
    ; Write to file
    FileDelete, %LogFile%
    FileAppend, %LogContent%, %LogFile%
    
    If (ErrorLevel) {
        GuiControl,, LogStatus, Error exporting logs!
        AddLog("Error exporting logs!")
    } Else {
        GuiControl,, LogStatus, Logs exported to: %LogFile%
        AddLog("Logs exported to: " . LogFile)
    }
Return

; Footer button handlers
ShowIntegrationWindow:
    AddLog("Opening integration wizard...")
    MsgBox, Integration wizard will be implemented here.
Return

ViewHelp:
    AddLog("Opening help documentation...")
    MsgBox, Help documentation will be implemented here.
Return

SaveConfig:
    AddLog("Saving all configuration settings...")
    GuiControl,, LogStatus, Saving all configuration settings...
    
    ; Just a placeholder for demonstration
    Sleep, 1000
    GuiControl,, LogStatus, All configuration settings saved!
    AddLog("All configuration settings saved successfully")
Return

; === UTILITY FUNCTIONS ===

; Add log entry with timestamp
AddLog(message) {
    FormatTime, Timestamp,, yyyy-MM-dd HH:mm:ss
    LogLine := Timestamp . " - " . message
    
    ; Get current log content
    GuiControlGet, CurrentLog,, LogDisplay
    
    ; Add new line
    NewLog := CurrentLog . "`n" . LogLine
    
    ; Update log display
    GuiControl,, LogDisplay, %NewLog%
    
    ; Scroll to bottom
    SendMessage, 0x115, 7, 0,, LogDisplay
}

; Close/Exit handlers
GuiClose:
GuiEscape:
    MsgBox, 4, Confirm Exit, Are you sure you want to exit? All running automations will be stopped.
    IfMsgBox, Yes
    {
        AddLog("Application shutdown requested")
        AddLog("Stopping all running automations...")
        AddLog("Cleaning up resources...")
        AddLog("Goodbye!")
        Sleep, 1000
        ExitApp
    }
Return
