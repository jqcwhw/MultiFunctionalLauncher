#Requires AutoHotkey v2.0

SAVED_SETTINGS_FOLDER := A_ScriptDir "\Settings\"

savePlayerSettings(*) {
    global

    if accountNameSetting.Value == "" {
        MsgBox "Account name required.", MACRO_TITLE, 48
        return
    }

    settings := Map(
        "accountNameSetting", accountNameSetting.Value,
        "startModeSetting", startModeSetting.Value,
        "pauseModeSetting", pauseModeSetting.Value,
        "exitModeSetting", exitModeSetting.Value,
        "bestZoneSetting", bestZoneSetting.Text,
        "numberOfLoopsSetting", numberOfLoopsSetting.Value,
        "do1StarQuestsSetting", do1StarQuestsSetting.Value,
        "do2StarQuestsSetting", do2StarQuestsSetting.Value,
        "do3StarQuestsSetting", do3StarQuestsSetting.Value,
        "do4StarQuestsSetting", do4StarQuestsSetting.Value,
        "eatFruitSetting", eatFruitSetting.Value,
        "gamepassAutoFarmSetting", gamepassAutoFarmSetting.Value,
        "gamepassVipSetting", gamepassVipSetting.Value,
        "gamepassDoubleStarsSetting", gamepassDoubleStarsSetting.Value,
        "gamepassSuperDropsSetting", gamepassSuperDropsSetting.Value,
        "vipUseFlagSetting", vipUseFlagSetting.Value,
        "vipUseSprinklerSetting", vipUseSprinklerSetting.Value,
        "eggsAtOnceSetting", eggsAtOnceSetting.Value,
        "shinyHoverboardSetting", shinyHoverboardSetting.Value,
        "reconnectAfterLoopsCompleteSetting", reconnectAfterLoopsCompleteSetting.Value,
        "reconnectionTimeSecondsSetting", reconnectionTimeSecondsSetting.Value,
        "privateServerLinkCodeSetting", privateServerLinkCodeSetting.Value,
        "numberPetsToMakeGoldenSetting", numberPetsToMakeGoldenSetting.Text,
        "numberPetsToMakeRainbowSetting", numberPetsToMakeRainbowSetting.Text,
        "numberPotionsToUpgradeSetting", numberPotionsToUpgradeSetting.Text,
        "potionsToUpgradeSetting", potionsToUpgradeSetting.Value,
        "numberEnchantsToUpgradeSetting", numberEnchantsToUpgradeSetting.Text,
        "enchantsToUpgradeSetting", enchantsToUpgradeSetting.Value,
        "breakPinatasSetting", breakPinatasSetting.Value,
        "breakLuckyBlocksSetting", breakLuckyBlocksSetting.Value,
        "breakBasicCoinJarsSetting", breakBasicCoinJarsSetting.Value,
        "breakCometsSetting", breakCometsSetting.Value,
        "breakMiniChestsSetting", breakMiniChestsSetting.Value,
        "breakBreakablesSetting", breakBreakablesSetting.Value,
        "breakDiamondBreakablesSetting", breakDiamondBreakablesSetting.Value,
        "breakSuperiorMiniChestsSetting", breakSuperiorMiniChestsSetting.Value,
        "earnDiamondsSetting", earnDiamondsSetting.Value,
        "hasSupercomputerRadioSetting", hasSupercomputerRadioSetting.Value,
        "tier3PotionToUseSetting", tier3PotionToUseSetting.Text,
        "tier4PotionToUseSetting", tier4PotionToUseSetting.Text,
        "tier5PotionToUseSetting", tier5PotionToUseSetting.Text,
        "questFlagSetting", questFlagSetting.Text,
        "bestAreaUseFlagSetting", bestAreaUseFlagSetting.Value,
        "bestAreaFlagSetting", bestAreaFlagSetting.Text,
        "bestAreaUseSprinklerSetting", bestAreaUseSprinklerSetting.Value
    )    

    filename := SAVED_SETTINGS_FOLDER settings["accountNameSetting"] ".cfg"
    saveSettings(filename, settings)
    populatePlayerSettingsDropdown()
    SETTINGS_GUI_VISIBLE := false
    settingsGui.Hide()

}

loadPlayerSettings(*) {

    filePath := SAVED_SETTINGS_FOLDER playerSettings.Text

    sectionContent := IniRead(filePath, "Settings")

    for line in StrSplit(sectionContent, "`n") {

        keyValue := StrSplit(line, "=")
        key := keyValue[1]
        value := keyValue[2]

        try
            %key%.Value := value
        catch
            try %key%.Text := value
    }
}

saveSettings(filename, settings) {
    section := "Settings"

    for key, value in settings {
        IniWrite value, filename, section, key
    }
}

populatePlayerSettingsDropdown() {
    fileList := []

    Loop Files SAVED_SETTINGS_FOLDER "\*.cfg" {
        fileList.Push(A_LoopFileName)
    }

    playerSettings.Delete()

    if fileList.Length > 0 {
        playerSettings.Add(fileList)
        playerSettings.Choose(1)
        loadPlayerSettings()
    }
}

deleteSelectedSetting(*) {
    filePath := SAVED_SETTINGS_FOLDER playerSettings.Text

    if FileExist(filePath) {
        FileDelete(filePath)
    }
    populatePlayerSettingsDropdown()
}
