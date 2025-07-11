; Pet Simulator 99 - Legitimate Automation Helper (AutoHotkey)
; =============================================================
; 
; This AutoHotkey script provides legitimate automation helpers for Pet Simulator 99
; that work within Roblox's Terms of Service by automating mouse/keyboard actions
; rather than modifying game data.
; 
; IMPORTANT: This script automates USER INPUT, not game data modification.
; It helps you play more efficiently but doesn't cheat or hack the game.

#NoEnv
#SingleInstance Force
#Persistent

; Configuration Variables
HatchInterval := 500      ; Time between egg hatches (milliseconds)
ClaimInterval := 300      ; Time between pet claims (milliseconds)
TrainingInterval := 1000  ; Time between gym actions (milliseconds)
SafetyDelay := 100        ; Safety delay between actions (milliseconds)

; State Variables
EggHatching := false
PetClaiming := false
StrengthTraining := false
AutoRunning := false

; Screen Positions (calibrate these for your screen)
EggHatchX := 960
EggHatchY := 540
ClaimPetX := 960
ClaimPetY := 600
GymBenchX := 800
GymBenchY := 400
PetSlot1X := 500
PetSlot1Y := 700
PetSlot2X := 600
PetSlot2Y := 700
PetSlot3X := 700
PetSlot3Y := 700

; Initialize
Gosub, ShowInstructions
return

ShowInstructions:
    MsgBox, 64, Pet Simulator 99 Helper, 
    (
    Pet Simulator 99 - Legitimate Automation Helper
    =============================================
    
    HOTKEYS:
    Ctrl+F1 - Toggle Auto Egg Hatching
    Ctrl+F2 - Toggle Auto Pet Claiming  
    Ctrl+F3 - Toggle Auto Strength Training
    Ctrl+F4 - Emergency Stop All
    Ctrl+F5 - Show Pet Optimization Tips
    Ctrl+F6 - Calibrate Screen Positions
    Ctrl+F7 - Show This Help
    
    IMPORTANT: This only automates mouse clicks.
    It does NOT modify game data or cheat.
    Use responsibly and follow Roblox ToS.
    
    Make sure Roblox is running and Pet Simulator 99 is active!
    )
return

; Hotkey Definitions
^F1::
    EggHatching := !EggHatching
    if (EggHatching) {
        ToolTip, 🥚 Auto Egg Hatching: ENABLED
        SetTimer, AutoHatchEggs, %HatchInterval%
    } else {
        ToolTip, 🥚 Auto Egg Hatching: DISABLED
        SetTimer, AutoHatchEggs, Off
    }
    Sleep, 1000
    ToolTip
return

^F2::
    PetClaiming := !PetClaiming
    if (PetClaiming) {
        ToolTip, 🐾 Auto Pet Claiming: ENABLED
        SetTimer, AutoClaimPets, %ClaimInterval%
    } else {
        ToolTip, 🐾 Auto Pet Claiming: DISABLED
        SetTimer, AutoClaimPets, Off
    }
    Sleep, 1000
    ToolTip
return

^F3::
    StrengthTraining := !StrengthTraining
    if (StrengthTraining) {
        ToolTip, 💪 Auto Strength Training: ENABLED
        SetTimer, AutoStrengthTraining, %TrainingInterval%
    } else {
        ToolTip, 💪 Auto Strength Training: DISABLED
        SetTimer, AutoStrengthTraining, Off
    }
    Sleep, 1000
    ToolTip
return

^F4::
    ; Emergency Stop All
    EggHatching := false
    PetClaiming := false
    StrengthTraining := false
    SetTimer, AutoHatchEggs, Off
    SetTimer, AutoClaimPets, Off
    SetTimer, AutoStrengthTraining, Off
    ToolTip, 🚨 EMERGENCY STOP - All automation disabled
    Sleep, 2000
    ToolTip
return

^F5::
    Gosub, ShowOptimizationTips
return

^F6::
    Gosub, CalibratePositions
return

^F7::
    Gosub, ShowInstructions
return

; Automation Functions
AutoHatchEggs:
    if (!EggHatching)
        return
    
    ; Click egg hatch button
    Click, %EggHatchX%, %EggHatchY%
    Sleep, %SafetyDelay%
    
    ; Optional: Click claim if pets appear
    Click, %ClaimPetX%, %ClaimPetY%
    Sleep, %SafetyDelay%
return

AutoClaimPets:
    if (!PetClaiming)
        return
    
    ; Click claim pet button
    Click, %ClaimPetX%, %ClaimPetY%
    Sleep, %SafetyDelay%
return

AutoStrengthTraining:
    if (!StrengthTraining)
        return
    
    ; Click gym bench button
    Click, %GymBenchX%, %GymBenchY%
    Sleep, %SafetyDelay%
    
    ; Wait for cooldown (based on decompiled data analysis)
    Sleep, 2000
return

ShowOptimizationTips:
    MsgBox, 64, Pet Optimization Tips,
    (
    🔥 PET OPTIMIZATION TIPS (From Decompiled Code):
    
    1. Enable showPetStrength=true in game settings
    2. Focus on pets with GetExclusiveLevel() >= 1
    3. Priority order: Rainbow (1000x) > Golden (100x) > Shiny (10x)
    
    4. TARGET THESE PETS:
       • Huge VR Robot (Golden + Rainbow + Shiny)
       • Gym Scorpion (Gym events only)
       • Titanic Sun (Maximum damage)
       • Huge Atomic Forged Shark (Rainbow + Golden)
    
    5. SECRET FORMULAS:
       • Rainbow Power = Base × 1000 × Multipliers
       • Golden Power = Base × 100 × Exclusive Level
       • Strength = Base × (1 + StrengthPowerBoost/100)
    
    6. EXCLUSIVE LEVEL STRATEGY:
       • Get ALL pets to Exclusive Level 1 minimum
       • Level 1+ unlocks hidden bonuses
       • Exponential power scaling
    
    7. GYM EVENT STRATEGY:
       • Focus on Gym Scorpion during events
       • Use strength-boosting pets
       • Enable strength display for optimization
    )
return

CalibratePositions:
    MsgBox, 64, Position Calibration,
    (
    🎯 POSITION CALIBRATION
    
    Move your mouse to each position and press the key:
    
    1 - Egg Hatch Button
    2 - Claim Pet Button
    3 - Gym Bench Button
    4 - Pet Slot 1
    5 - Pet Slot 2
    6 - Pet Slot 3
    ESC - Finish calibration
    
    Current mouse position will be saved for each key.
    )
    
    Loop {
        if GetKeyState("1", "P") {
            MouseGetPos, EggHatchX, EggHatchY
            ToolTip, Egg Hatch Button: %EggHatchX%`, %EggHatchY%
            Sleep, 1000
            ToolTip
        }
        else if GetKeyState("2", "P") {
            MouseGetPos, ClaimPetX, ClaimPetY
            ToolTip, Claim Pet Button: %ClaimPetX%`, %ClaimPetY%
            Sleep, 1000
            ToolTip
        }
        else if GetKeyState("3", "P") {
            MouseGetPos, GymBenchX, GymBenchY
            ToolTip, Gym Bench Button: %GymBenchX%`, %GymBenchY%
            Sleep, 1000
            ToolTip
        }
        else if GetKeyState("4", "P") {
            MouseGetPos, PetSlot1X, PetSlot1Y
            ToolTip, Pet Slot 1: %PetSlot1X%`, %PetSlot1Y%
            Sleep, 1000
            ToolTip
        }
        else if GetKeyState("5", "P") {
            MouseGetPos, PetSlot2X, PetSlot2Y
            ToolTip, Pet Slot 2: %PetSlot2X%`, %PetSlot2Y%
            Sleep, 1000
            ToolTip
        }
        else if GetKeyState("6", "P") {
            MouseGetPos, PetSlot3X, PetSlot3Y
            ToolTip, Pet Slot 3: %PetSlot3X%`, %PetSlot3Y%
            Sleep, 1000
            ToolTip
        }
        else if GetKeyState("Escape", "P") {
            ToolTip, Calibration Complete!
            Sleep, 1000
            ToolTip
            break
        }
        Sleep, 50
    }
return

; Advanced Pet Strategy Helper
^F8::
    MsgBox, 64, Advanced Pet Strategies,
    (
    🎯 ADVANCED PET STRATEGIES (From Code Analysis):
    
    IMMEDIATE ACTIONS:
    ✓ Enable showPetStrength=true display
    ✓ Focus pets with GetExclusiveLevel() >= 1
    ✓ Target BEST_RAINBOW_PET category
    ✓ Hunt for Pet.HiddenItem bonuses
    ✓ Look for Pet.CanBypass abilities
    
    POWER FORMULAS:
    • Final Strength = Base × (1 + StrengthPowerBoost/100)
    • Rainbow = Base × 1000 × Zone Bonus
    • Golden = Base × 100 × Exclusive Level
    • Maximum Damage = MAXIMUM_PET_DAMAGE × Multipliers
    
    GARGANTUAN EVENT STRATEGY:
    • Focus ALL efforts on Gargantuan pets
    • Use "Pet will always be stronger" guarantee
    • Target Gym Scorpion during events
    • Stack strength multipliers
    
    EXPLOIT DETECTION:
    • System tracks "BestPetStat" automatically
    • Use Premium Pet advantages if available
    • VIP pets have hidden multipliers
    • Easter egg pets provide secret bonuses
    )
return

; Emergency exit
^F9::
    MsgBox, 64, Exiting, Pet Simulator 99 Helper is closing...
    ExitApp
return

; Safe exit on window close
OnExit:
    EggHatching := false
    PetClaiming := false
    StrengthTraining := false
    SetTimer, AutoHatchEggs, Off
    SetTimer, AutoClaimPets, Off
    SetTimer, AutoStrengthTraining, Off
return