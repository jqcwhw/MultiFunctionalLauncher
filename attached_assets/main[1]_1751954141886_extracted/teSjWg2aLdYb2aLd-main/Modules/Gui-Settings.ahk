#Requires AutoHotkey v2.0

SETTINGS_GUI_VISIBLE := false

createSettingsGui() {
    global

    global settingsGui := Gui("+Border")
    settingsGui.Title := "Settings"
    settingsGui.SetFont("s8", "Segoe UI")    

    ; Account Settings.
    settingsGui.AddGroupBox("Section w150 h75", "Account Settings").SetFont("w700")
    settingsGui.AddText("xp+10 yp+20", "Account Name")
    accountNameSetting := settingsGui.AddEdit("xp", "")

    ; Progress Settings.
    settingsGui.AddGroupBox("xs Section w150 h75", "Game Progress").SetFont("w700")
    settingsGui.AddText("xp+10 yp+20", "Best Zone Unlocked")
    bestZoneSetting := settingsGui.AddDropDownList("xp", [239, 234, 229, 224, 219, 214, 209, 204, 199, 99])

    ; Quests Settings.
    settingsGui.AddGroupBox("xs Section w150 h175", "Quests").SetFont("w700")
    settingsGui.AddText("xp+10 yp+20", "Number of Loops")
    numberOfLoopsSetting := settingsGui.AddEdit("xp", "")      
    do1StarQuestsSetting := settingsGui.AddCheckBox("xp Checked", "Do 1 Star Quests")
    do2StarQuestsSetting := settingsGui.AddCheckBox("xp Checked", "Do 2 Star Quests")
    do3StarQuestsSetting := settingsGui.AddCheckBox("xp Checked", "Do 3 Star Quests")
    do4StarQuestsSetting := settingsGui.AddCheckBox("xp Checked", "Do 4 Star Quests")
    questAdvancedSettings := settingsGui.AddButton("xp Disabled", "Advanced Settings")
    
    ; Gamepass Settings.
    settingsGui.AddGroupBox("xs Section w150 h130", "Gamepasses").SetFont("w700")
    gamepassAutoFarmSetting := settingsGui.AddCheckBox("xp+10 yp+20", "Auto Farm")
    gamepassVipSetting := settingsGui.AddCheckBox("xp", "VIP")
    gamepassDoubleStarsSetting  := settingsGui.AddCheckBox("xp", "Double Stars")
    gamepassSuperDropsSetting  := settingsGui.AddCheckBox("xp", "Super Drops")
    checkGamepasses := settingsGui.AddButton("xp Disabled", "Check Gamepasses")

    ; Supercomputer Settings.
    settingsGui.AddGroupBox("xs Section w150 h75", "Supercomputer Settings").SetFont("w700")
    hasSupercomputerRadioSetting := settingsGui.AddCheckBox("xp+10 yp+20", "Has Radio")
    checkSupercomputerRadio := settingsGui.AddButton("xp Disabled", "Check Inventory")

    ; Best Area Settings.
    settingsGui.AddGroupBox("ym Section w150 h115", "Best Area").SetFont("w700")
    bestAreaUseFlagSetting := settingsGui.AddCheckBox("xp+10 yp+20", "Use Flag")
    settingsGui.AddText("xp", "Last Zone Flag")
    bestAreaFlagSetting := settingsGui.AddDropDownList("xp", ["Coins Flag", "Diamonds Flag", "Fortune Flag", "Hasty Flag", "Coins Flag", "Magnet Flag", "Strength Flag"])
    bestAreaUseSprinklerSetting  := settingsGui.AddCheckBox("xp", "Use Sprinkler")

    ; VIP Area Settings.
    settingsGui.AddGroupBox("xs Section w150 h70", "VIP Area").SetFont("w700")
    vipUseFlagSetting := settingsGui.AddCheckBox("xp+10 yp+20", "Use Flag")
    vipUseSprinklerSetting  := settingsGui.AddCheckBox("xp", "Use Sprinkler")

    ; Hatching Settings.
    settingsGui.AddGroupBox("xs Section w150 h155", "Hatching Settings").SetFont("w700")
    settingsGui.AddText("xp+10 yp+20", "Eggs at Once")
    eggsAtOnceSetting := settingsGui.AddEdit("xp", "")
    checkEggMachine := settingsGui.AddButton("xp Disabled", "Check Egg Machine")
    settingsGui.AddText("xp", "Rare Egg Hatches")
    rareEggHatchesSetting := settingsGui.AddSlider("xp Range5-25 ToolTipTop TickInterval5")

    ; Hoverboard Settings.
    settingsGui.AddGroupBox("xs Section w150 h75", "Hoverboard Settings").SetFont("w700")
    shinyHoverboardSetting := settingsGui.AddCheckBox("xp+10 yp+20", "Shiny Hoverboard")
    checkHoverboard := settingsGui.AddButton("xp Disabled", "Check Inventory")

    ; Reconnection Settings.
    settingsGui.AddGroupBox("xs Section w150 h150", "Reconnection Settings").SetFont("w700")
    reconnectAfterLoopsCompleteSetting := settingsGui.AddCheckBox("xp+10 yp+20 Checked", "Loop Reconnection")
    settingsGui.AddText("xp", "Reconnect Delay")
    reconnectionTimeSecondsSetting := settingsGui.AddSlider("xp Range30-120 ToolTipTop TickInterval10")    
    settingsGui.AddText("xp", "Private Server Link Code")
    privateServerLinkCodeSetting := settingsGui.AddEdit("xp w130 h20", "")

    ; Golden Pets Settings.
    settingsGui.AddGroupBox("ym Section w150 h100", "Make Golden Pets").SetFont("w700")
    settingsGui.AddText("xp+10 yp+20", "Pets Required")
    numberPetsToMakeGoldenSetting := settingsGui.AddDropDownList("xp", [10, 9, 8])
    checkPetsMasteryGolden := settingsGui.AddButton("xp", "Check Mastery")
    checkPetsMasteryGolden.OnEvent("Click", (*) => getGoldenPetsRequiredForUpgrade())

    ; Rainbow Pets Settings.
    settingsGui.AddGroupBox("xs Section w150 h100", "Make Rainbow Pets").SetFont("w700")
    settingsGui.AddText("xp+10 yp+20", "Pets Required")
    numberPetsToMakeRainbowSetting := settingsGui.AddDropDownList("xp", [10, 9, 8])
    checkPetsMasteryRainbow := settingsGui.AddButton("xp", "Check Mastery")
    checkPetsMasteryRainbow.OnEvent("Click", (*) => getRainbowPetsRequiredForUpgrade())

    ; Potions Settings.
    settingsGui.AddGroupBox("xs Section w150 h150", "Upgrade Potions").SetFont("w700")
    settingsGui.AddText("xp+10 yp+20", "Potions Required")
    numberPotionsToUpgradeSetting := settingsGui.AddDropDownList("xp", [5, 4, 3])
    checkPotionsMastery := settingsGui.AddButton("xp", "Check Mastery")
    checkPotionsMastery.OnEvent("Click", (*) => getPotionsRequiredForUpgrade())
    settingsGui.AddText("xp", "Potions to Upgrade")
    potionsToUpgradeSetting := settingsGui.AddEdit("xp", "")   
    
    ; Enchants Settings.
    settingsGui.AddGroupBox("xs Section w150 h150", "Upgrade Enchants").SetFont("w700")
    settingsGui.AddText("xp+10 yp+20", "Enchants Required")
    numberEnchantsToUpgradeSetting := settingsGui.AddDropDownList("xp", [7, 6, 5])
    checkEnchantsMastery := settingsGui.AddButton("xp", "Check Mastery")
    checkEnchantsMastery.OnEvent("Click", (*) => getEnchantsRequiredForUpgrade())
    settingsGui.AddText("xp", "Enchants to Upgrade")
    enchantsToUpgradeSetting := settingsGui.AddEdit("xp", "")

    ; Breakables Settings.
    settingsGui.AddGroupBox("ym Section w150 h540", "Breakables Settings").SetFont("w700")
    settingsGui.AddText("xp+10 yp+20", "Break Piñatas")
    breakPinatasSetting := settingsGui.AddSlider("xp Range5-30 ToolTipTop TickInterval5")
    settingsGui.AddText("xp", "Break Lucky Blocks")
    breakLuckyBlocksSetting := settingsGui.AddSlider("xp Range5-30 ToolTipTop TickInterval5")
    settingsGui.AddText("xp", "Break Basic Coin Jars")
    breakBasicCoinJarsSetting := settingsGui.AddSlider("xp Range5-30 ToolTipTop TickInterval5")
    settingsGui.AddText("xp", "Break Comets")
    breakCometsSetting := settingsGui.AddSlider("xp Range5-30 ToolTipTop TickInterval5")
    settingsGui.AddText("xp", "Break Mini Chests")
    breakMiniChestsSetting := settingsGui.AddSlider("xp Range30-60 ToolTipTop TickInterval5")
    settingsGui.AddText("xp", "Break Breakables")
    breakBreakablesSetting := settingsGui.AddSlider("xp Range30-60 ToolTipTop TickInterval5")
    settingsGui.AddText("xp", "Break Diamonds")
    breakDiamondBreakablesSetting := settingsGui.AddSlider("xp Range30-60 ToolTipTop TickInterval5")
    settingsGui.AddText("xp", "Break Superior Chests")
    breakSuperiorMiniChestsSetting := settingsGui.AddSlider("xp Range30-60 ToolTipTop TickInterval5")
    settingsGui.AddText("xp", "Earn Diamonds")
    earnDiamondsSetting := settingsGui.AddSlider("xp Range30-60 ToolTipTop TickInterval5")

    ; Use Potions Settings.
    settingsGui.AddGroupBox("ym Section w150 h165", "Use Potions").SetFont("w700")
    settingsGui.AddText("xp+10 yp+20", "Tier 3 Potion")
    tier3PotionToUseSetting := settingsGui.AddDropDownList("xp", ["Coins Potion III", "Damage Potion III", "Diamonds Potion III", "Lucky Eggs Potion III", "Speed Potion III", "Treasure Hunter Potion III"])
    settingsGui.AddText("xp", "Tier 4 Potion")
    tier4PotionToUseSetting := settingsGui.AddDropDownList("xp", ["Coins Potion IV", "Damage Potion IV", "Diamonds Potion IV", "Lucky Eggs Potion IV", "Treasure Hunter Potion IV"])
    settingsGui.AddText("xp", "Tier 5 Potion")
    tier5PotionToUseSetting := settingsGui.AddDropDownList("xp", ["Coins Potion V", "Damage Potion V", "Diamonds Potion V", "Lucky Eggs Potion V", "Treasure Hunter Potion V"])

    ; Use Flags Settings.
    settingsGui.AddGroupBox("xs Section w150 h70", "Use Flags").SetFont("w700")
    settingsGui.AddText("xp+10 yp+20", "Use Flag Quest")
    questFlagSetting := settingsGui.AddDropDownList("xp", ["Coins Flag", "Diamonds Flag", "Hasty Flag", "Magnet Flag"])

    ; Fruit Settings.
    settingsGui.AddGroupBox("xs Section w150 h75", "Fruit").SetFont("w700")
    eatFruitSetting := settingsGui.AddCheckBox("xp+10 yp+20 Checked", "Eat Fruit")
    checkFruitMastery := settingsGui.AddButton("xp", "Check Mastery")
    checkFruitMastery.OnEvent("Click", (*) => getEatFruitSetting())

    ; Hot Key Settings.
    settingsGui.AddGroupBox("xs Section w150 h165", "Mode Hot Keys").SetFont("w700")
    settingsGui.AddText("xp+10 yp+20", "Start Mode")
    startModeSetting := settingsGui.AddHotkey("xp")
    settingsGui.AddText("xp", "Pause Mode")
    pauseModeSetting := settingsGui.AddHotkey("xp")
    settingsGui.AddText("xp", "Exit Mode")
    exitModeSetting := settingsGui.AddHotkey("xp")

    saveButton := settingsGui.AddButton("xm", "Save && Close")
    saveButton.OnEvent("Click", (*) => savePlayerSettings())

    resetButton := settingsGui.AddButton("yp", "Reset Settings")
    resetButton.OnEvent("Click", (*) => resetSettings())

    cancelButton := settingsGui.AddButton("yp", "Cancel")
    cancelButton.OnEvent("Click", (*) => closeSettings())

}

resetSettings() {
    accountNameSetting.Value := ""
    startModeSetting.Value := ""
    pauseModeSetting.Value := ""
    exitModeSetting.Value := ""
    bestZoneSetting.Text := 234
    numberOfLoopsSetting.Value := 20
    do1StarQuestsSetting.Value := true
    do2StarQuestsSetting.Value := true
    do3StarQuestsSetting.Value := true
    do4StarQuestsSetting.Value := true
    eatFruitSetting.Value := true
    gamepassAutoFarmSetting.Value := false
    gamepassVipSetting.Value := false
    gamepassDoubleStarsSetting.Value := false
    gamepassSuperDropsSetting.Value := false
    vipUseFlagSetting.Value := true
    vipUseSprinklerSetting.Value := true
    eggsAtOnceSetting.Value := 50
    shinyHoverboardSetting.Value := false
    reconnectAfterLoopsCompleteSetting.Value := true
    reconnectionTimeSecondsSetting.Value := 60
    privateServerLinkCodeSetting.Value := ""
    numberPetsToMakeGoldenSetting.Text := 10
    numberPetsToMakeRainbowSetting.Text := 10
    numberPotionsToUpgradeSetting.Text := 5
    potionsToUpgradeSetting.Value := "Coins Potion II|Damage Potion II|Diamonds Potion II|Lucky Eggs Potion II|Treasure Hunter Potion II"
    numberEnchantsToUpgradeSetting.Text := 7
    enchantsToUpgradeSetting.Value := "Coins II|Criticals II|Diamonds II|Lucky Eggs II|Magnet II|Speed II|Strong Pets II|Tap Power II|Treasure Hunter II"
    breakPinatasSetting.Value := 20
    breakLuckyBlocksSetting.Value := 20
    breakBasicCoinJarsSetting.Value := 20
    breakCometsSetting.Value := 20
    breakMiniChestsSetting.Value := 30
    breakBreakablesSetting.Value := 30
    breakDiamondBreakablesSetting.Value := 30
    breakSuperiorMiniChestsSetting.Value := 30
    earnDiamondsSetting.Value := 30
    hasSupercomputerRadioSetting.Value := false
    tier3PotionToUseSetting.Text := "Coins Potion III"
    tier4PotionToUseSetting.Text := "Coins Potion IV"
    tier5PotionToUseSetting.Text := "Coins Potion V"
    questFlagSetting.Text := "Coins Flag"
    bestAreaUseFlagSetting.Value := false
    bestAreaFlagSetting.Text := "Hasty Flag"
    bestAreaUseSprinklerSetting.Value := false
}

openSettingsGui(*) {
    global
    if SETTINGS_GUI_VISIBLE {
        settingsGui.Hide()
        SETTINGS_GUI_VISIBLE := false
    }
    else {
        settingsGui.Show("w810 h640")
        ;mainGui.GetPos(&mainX, &mainY, &mainW, &mainH)
        ;newX := (mainX + mainW - 14)
        ;newY := mainY    
        ;settingsGui.Move(newX, newY)
        SETTINGS_GUI_VISIBLE := true
    }
}

closeSettings() {
    global

    SETTINGS_GUI_VISIBLE := false  
    settingsGui.Hide()
}