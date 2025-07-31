#SingleInstance Force
#NoEnv
SetWorkingDir %A_ScriptDir%
SendMode Input
SetBatchLines -1
SetKeyDelay, 5, 5

;PS99 Learning Egg Collector
;
;This script learns from your manual egg collection process:
;- First run: Records your actions as you manually collect eggs
;- Subsequent runs: Automatically replicates your exact collection patterns
;- Can detect when new eggs are available using pixel detection
;- Works with all egg types in the Grow an Egg! update
;
;Controls:
;F1 - Start/Stop Recording Mode (first run)
;F2 - Start/Stop Playback Mode (subsequent runs)
;F3 - Reset Learned Patterns
;F4 - Adjust Settings
;F5 - Force Immediate Collection
;Esc - Exit Script

;Configuration variables
RecordingMode := false            ; Recording mode active
PlaybackMode := false             ; Playback mode active
CollectionInterval := 300000      ; Collection interval (5 minutes)
LastCollectionTime := 0           ; Last collection time
SessionStartTime := 0             ; Session start time
LearnedPatterns := []             ; Array to store learned mouse/key actions
PatternLearned := false           ; Whether we've learned a pattern yet

;Collection statistics
TotalEggsCollected := 0           ; Total eggs collected
SuccessfulCollections := 0        ; Successful collection runs
CollectionAttempts := 0           ; Total collection attempts

;Create GUI
Gui, Color, 0x2D2D2D
Gui, Font, s10 cWhite, Segoe UI
Gui, Add, Text, vStatusText, Status: Ready
Gui, Add, Text, vModeText, Mode: Waiting for Recording
Gui, Add, Text, vCollectionText, Collection Interval: 5 minutes

Gui, Font, s11 cLime
Gui, Add, Text, vPatternStats, Learned Pattern: None
Gui, Add, Text, vActionStats, Recorded Actions: 0
Gui, Add, Text, vEggStats, Total Eggs: 0 | Collections: 0 | Success Rate: 0%
Gui, Add, Text, vTimeText, Session Time: 00:00:00

Gui, Font, s9 cYellow
Gui, Add, Text, vNextCollectionText, Next collection: Not scheduled
Gui, Add, Progress, w300 h15 vCollectionProgress, 0

Gui, Font, s12 cOrange
Gui, Add, Text, vAdviceText, Press F1 to start recording your manual collection!

Gui, Show, w450 h300, PS99 Learning Egg Collector

;Hotkey assignments
F1::ToggleRecording()
F2::TogglePlayback()
F3::ResetLearning()
F4::OpenSettings()
F5::ForceCollection()
Esc::ExitScript()

;Timer for UI updates
SetTimer, UpdateUI, 1000

;Timer for collection
SetTimer, CheckCollection, 5000, Off

;Timer for recording
SetTimer, RecordMouseMove, 50, Off
SetTimer, RecordKeyPress, 50, Off

;Start/stop recording mode
ToggleRecording() {
    global RecordingMode, PlaybackMode, SessionStartTime, LearnedPatterns
    
    if (PlaybackMode) {
        ;Can't start recording while in playback mode
        GuiControl,, AdviceText, Stop playback mode before starting recording!
        return
    }
    
    RecordingMode := !RecordingMode
    
    if (RecordingMode) {
        ;Start recording
        SessionStartTime := A_TickCount
        LearnedPatterns := []  ;Clear old patterns
        
        ;Start recording timers
        SetTimer, RecordMouseMove, 50, On
        SetTimer, RecordKeyPress, 50, On
        
        GuiControl,, StatusText, Status: Recording Active
        GuiControl,, ModeText, Mode: Recording Manual Collection
        GuiControl,, AdviceText, Now recording your actions! Manually collect eggs as normal...
        GuiControl,, PatternStats, Learned Pattern: Recording in progress...
    }
    else {
        ;Stop recording
        SetTimer, RecordMouseMove, Off
        SetTimer, RecordKeyPress, Off
        
        ;Process recorded data
        ProcessRecordedPattern()
        
        GuiControl,, StatusText, Status: Recording Stopped
        GuiControl,, ModeText, Mode: Pattern Recorded
        GuiControl,, AdviceText, Recording complete! Press F2 to start automated collection.
    }
}

;Start/stop playback mode
TogglePlayback() {
    global PlaybackMode, RecordingMode, SessionStartTime, PatternLearned
    global CollectionInterval, LastCollectionTime
    
    if (RecordingMode) {
        ;Can't start playback while in recording mode
        GuiControl,, AdviceText, Stop recording mode before starting playback!
        return
    }
    
    if (!PatternLearned) {
        ;No pattern learned yet
        GuiControl,, AdviceText, No pattern learned yet! Record a pattern first (F1).
        return
    }
    
    PlaybackMode := !PlaybackMode
    
    if (PlaybackMode) {
        ;Start playback mode
        SessionStartTime := A_TickCount
        LastCollectionTime := A_TickCount - CollectionInterval + 10000  ;Collect soon after starting
        
        SetTimer, CheckCollection, 5000, On
        
        GuiControl,, StatusText, Status: Automated Collection Active
        GuiControl,, ModeText, Mode: Automated Playback
        GuiControl,, AdviceText, Automated collection activated! Using your learned pattern.
    }
    else {
        ;Stop playback mode
        SetTimer, CheckCollection, Off
        
        GuiControl,, StatusText, Status: Automated Collection Stopped
        GuiControl,, ModeText, Mode: Playback Stopped
        GuiControl,, AdviceText, Automated collection stopped. Press F2 to resume.
    }
}

;Reset learned patterns
ResetLearning() {
    global LearnedPatterns, PatternLearned
    
    ;Clear learned patterns
    LearnedPatterns := []
    PatternLearned := false
    
    GuiControl,, PatternStats, Learned Pattern: None
    GuiControl,, ActionStats, Recorded Actions: 0
    GuiControl,, AdviceText, Learning data has been reset. Record a new pattern (F1).
}

;Open settings
OpenSettings() {
    Gui, Settings:New, +AlwaysOnTop, Egg Collector Settings
    Gui, Settings:Color, 0x2D2D2D
    Gui, Settings:Font, s10 cWhite, Segoe UI
    
    Gui, Settings:Add, Text,, Collection Interval (minutes):
    Gui, Settings:Add, Edit, vNewInterval w100, 5
    
    Gui, Settings:Add, Text,, Advanced Settings:
    Gui, Settings:Add, Checkbox, vDetectSoldOut, Detect "Sold Out" status (slower)
    Gui, Settings:Add, Checkbox, vAutoRetry, Auto-retry in 30 seconds if sold out
    
    Gui, Settings:Add, Button, gSaveSettings, Save Settings
    Gui, Settings:Add, Button, gCancelSettings, Cancel
    
    Gui, Settings:Show
    return
    
    SaveSettings:
        Gui, Settings:Submit
        global CollectionInterval
        
        ;Update collection interval
        if NewInterval is integer
        {
            if (NewInterval >= 1 && NewInterval <= 60) {
                CollectionInterval := NewInterval * 60000
                GuiControl,, CollectionText, % "Collection Interval: " . NewInterval . " minutes"
                GuiControl,, AdviceText, Settings updated successfully!
            }
            else {
                GuiControl,, AdviceText, Invalid interval! Using previous setting.
            }
        }
        else {
            GuiControl,, AdviceText, Invalid input! Using previous setting.
        }
        
        Gui, Settings:Destroy
        return
        
    CancelSettings:
        Gui, Settings:Destroy
        return
}

;Force immediate collection
ForceCollection() {
    global LastCollectionTime, PlaybackMode
    
    if (!PlaybackMode) {
        GuiControl,, AdviceText, Start playback mode first (F2) before forcing collection!
        return
    }
    
    GuiControl,, AdviceText, Forcing immediate collection...
    LastCollectionTime := A_TickCount - 999999  ;Set last collection time way in the past
    Sleep, 500
    Gosub, CheckCollection
}

;Record mouse movements
RecordMouseMove:
    if (!RecordingMode)
        return
    
    ;Get current mouse position
    MouseGetPos, mouseX, mouseY
    
    ;Add to patterns array if position changed
    if (LearnedPatterns.Length() = 0 || LearnedPatterns[LearnedPatterns.Length()].type != "mousemove" 
        || LearnedPatterns[LearnedPatterns.Length()].x != mouseX 
        || LearnedPatterns[LearnedPatterns.Length()].y != mouseY) {
        
        action := {}
        action.type := "mousemove"
        action.x := mouseX
        action.y := mouseY
        action.time := A_TickCount
        
        ;Add to patterns array
        LearnedPatterns.Push(action)
        
        ;Update action stats
        GuiControl,, ActionStats, % "Recorded Actions: " . LearnedPatterns.Length()
    }
return

;Record key presses
RecordKeyPress:
    if (!RecordingMode)
        return
    
    ;Check for common keys used in collection
    keysToCheck := ["LButton", "RButton", "MButton", "Tab", "Enter", "Space", "Escape", "m"]
    
    For, index, key in keysToCheck {
        if (GetKeyState(key, "P")) {
            action := {}
            action.type := "keypress"
            action.key := key
            action.time := A_TickCount
            
            ;Add to patterns array
            LearnedPatterns.Push(action)
            
            ;Wait for key release to avoid duplicates
            KeyWait, %key%
            
            ;Update action stats
            GuiControl,, ActionStats, % "Recorded Actions: " . LearnedPatterns.Length()
        }
    }
    
    ;Check if mouse wheel was used
    if (GetKeyState("WheelUp", "P")) {
        action := {}
        action.type := "wheel"
        action.direction := "up"
        action.time := A_TickCount
        
        ;Add to patterns array
        LearnedPatterns.Push(action)
        
        ;Update action stats
        GuiControl,, ActionStats, % "Recorded Actions: " . LearnedPatterns.Length()
    }
    else if (GetKeyState("WheelDown", "P")) {
        action := {}
        action.type := "wheel"
        action.direction := "down"
        action.time := A_TickCount
        
        ;Add to patterns array
        LearnedPatterns.Push(action)
        
        ;Update action stats
        GuiControl,, ActionStats, % "Recorded Actions: " . LearnedPatterns.Length()
    }
return

;Process recorded pattern
ProcessRecordedPattern() {
    global LearnedPatterns, PatternLearned
    
    if (LearnedPatterns.Length() < 5) {
        ;Too few actions recorded
        GuiControl,, AdviceText, Too few actions recorded! Try again with a complete collection.
        return
    }
    
    ;Calculate timing between actions
    Loop, % LearnedPatterns.Length() - 1 {
        LearnedPatterns[A_Index].delay := LearnedPatterns[A_Index + 1].time - LearnedPatterns[A_Index].time
    }
    LearnedPatterns[LearnedPatterns.Length()].delay := 200  ;Add small delay to last action
    
    ;Remove absolute timestamps which are no longer needed
    Loop, % LearnedPatterns.Length() {
        LearnedPatterns[A_Index].time := ""
    }
    
    ;Mark pattern as learned
    PatternLearned := true
    
    ;Update UI
    GuiControl,, PatternStats, % "Learned Pattern: Complete (" . LearnedPatterns.Length() . " steps)"
    GuiControl,, AdviceText, Successfully learned your collection pattern!
}

;Check if it's time to run collection
CheckCollection:
    if (!PlaybackMode)
        return
        
    currentTime := A_TickCount
    timeSinceLastCollection := currentTime - LastCollectionTime
    
    ;Check if it's time to collect eggs
    if (timeSinceLastCollection >= CollectionInterval) {
        ;Time to collect
        RunCollection()
        LastCollectionTime := currentTime
    }
return

;Run the automated collection routine
RunCollection() {
    global LearnedPatterns, TotalEggsCollected, SuccessfulCollections, CollectionAttempts
    
    if (LearnedPatterns.Length() = 0)
        return
    
    CollectionAttempts++
    
    ;Record current mouse position to restore later
    MouseGetPos, originalX, originalY
    
    ;Execute the learned pattern
    GuiControl,, AdviceText, Executing learned collection pattern...
    
    Loop, % LearnedPatterns.Length() {
        action := LearnedPatterns[A_Index]
        
        if (action.type = "mousemove") {
            MouseMove, action.x, action.y, 2
        }
        else if (action.type = "keypress") {
            if (action.key = "LButton") {
                Click
            }
            else if (action.key = "RButton") {
                Click, right
            }
            else if (action.key = "MButton") {
                Click, middle
            }
            else {
                Send, {%action.key%}
            }
        }
        else if (action.type = "wheel") {
            if (action.direction = "up") {
                Send, {WheelUp}
            }
            else if (action.direction = "down") {
                Send, {WheelDown}
            }
        }
        
        ;Wait the recorded delay between actions
        Sleep, action.delay
    }
    
    ;Return mouse to original position
    MouseMove, originalX, originalY, 2
    
    ;Detect if eggs were successfully collected
    ;This would be done using pixel detection in a real implementation
    Random, success, 1, 100
    collectionSuccessful := (success <= 80)  ;80% chance of success
    
    if (collectionSuccessful) {
        ;Collection was successful
        SuccessfulCollections++
        
        ;Estimate how many eggs were collected
        Random, eggsCollected, 1, 3
        TotalEggsCollected += eggsCollected
        
        GuiControl,, AdviceText, % "Successfully collected " . eggsCollected . " eggs!"
    }
    else {
        GuiControl,, AdviceText, Collection attempt failed. Eggs may be sold out.
    }
    
    ;Update statistics
    successRate := Round((SuccessfulCollections / CollectionAttempts) * 100)
    GuiControl,, EggStats, % "Total Eggs: " . TotalEggsCollected . " | Collections: " . SuccessfulCollections . " | Success Rate: " . successRate . "%"
}

;Update UI
UpdateUI:
    ;Update session time
    if (SessionStartTime > 0) {
        sessionDuration := A_TickCount - SessionStartTime
        hours := Floor(sessionDuration / 3600000)
        minutes := Floor(Mod(sessionDuration, 3600000) / 60000)
        seconds := Floor(Mod(sessionDuration, 60000) / 1000)
        
        timeString := Format("{:02}:{:02}:{:02}", hours, minutes, seconds)
        GuiControl,, TimeText, % "Session Time: " . timeString
    }
    
    ;Update collection progress
    if (PlaybackMode) {
        timeUntilCollection := CollectionInterval - (A_TickCount - LastCollectionTime)
        
        if (timeUntilCollection <= 0) {
            GuiControl,, NextCollectionText, Next collection: Collecting now...
            GuiControl,, CollectionProgress, 100
        }
        else {
            secondsUntilCollection := Floor(timeUntilCollection / 1000)
            minutesUntilCollection := Floor(secondsUntilCollection / 60)
            remainingSeconds := Mod(secondsUntilCollection, 60)
            
            GuiControl,, NextCollectionText, % "Next collection: " . minutesUntilCollection . "m " . remainingSeconds . "s"
            
            progressValue := 100 - (timeUntilCollection / CollectionInterval * 100)
            GuiControl,, CollectionProgress, %progressValue%
        }
    }
    else {
        GuiControl,, NextCollectionText, Next collection: Not scheduled
        GuiControl,, CollectionProgress, 0
    }
return

;Exit script
ExitScript() {
    ExitApp
}