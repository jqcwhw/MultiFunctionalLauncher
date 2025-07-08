#Requires AutoHotkey v2.0

doQuestMakeGoldenPets(questId, questAmount) {
    machine := "Gold Machine"
    itemNames := ZONE_MAP[BEST_ZONE].bestPets
    perConversion := numberPetsToMakeGoldenSetting.Text
    ignoreItem := "i)shiny"

    openMachine(machine)
    useMachine(machine, questAmount, perConversion, questId, itemNames, ignoreItem)
}

doQuestMakeRainbowPets(questId, questAmount) {
    machine := "Rainbow Machine"
    itemNames := ZONE_MAP[BEST_ZONE].bestPets
    perConversion := numberPetsToMakeRainbowSetting.Text
    ignoreItem := "i)shiny"

    openMachine(machine)
    useMachine(machine, questAmount, perConversion, questId, itemNames, ignoreItem)
}

doQuestUpgradePotions(questId, questAmount) {
    machine := "Upgrade Potions Machine"
    itemNames := potionsToUpgradeSetting.Value
    perConversion := numberPotionsToUpgradeSetting.Text

    openMachine(machine)
    useMachine(machine, questAmount, perConversion, questId, itemNames)
}

doQuestUpgradeEnchants(questId, questAmount) {
    machine := "Upgrade Enchants Machine"
    itemNames := enchantsToUpgradeSetting.Value
    perConversion := numberEnchantsToUpgradeSetting.Text

    openMachine(machine)
    useMachine(machine, questAmount, perConversion, questId, itemNames)
}