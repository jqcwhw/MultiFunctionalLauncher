#Requires AutoHotkey v2.0

; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; QUEST PRIORITIES
; ----------------------------------------------------------------------------------------
; Modify the settings below to change how quests are prioritized and executed.  Quests are
; initially sorted and executed based on their priority. If multiple quests share the same
; priority, they are then sorted and executed according to their star level, with higher
; star levels being prioritized.
; * Note: Setting the priority to 0 will cause the macro to skip the quest.
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

loadQuestPriorities() {
    global QUEST_PRIORITY := Map()
    QUEST_PRIORITY.Default := 0
    
    QUEST_PRIORITY["9"] := 20  ; "Break Diamond Breakables"
    QUEST_PRIORITY["14"] := 15  ; "Collect Potions"
    QUEST_PRIORITY["15"] := 15  ; "Collect Enchants"
    QUEST_PRIORITY["20"] := 20  ; "Hatch Best Egg"
    QUEST_PRIORITY["21"] := 10  ; "Break Breakables in Best Area"
    QUEST_PRIORITY["31"] := 20  ; "Break Coin Jars"
    QUEST_PRIORITY["33"] := 30  ; "Use Flags"
    QUEST_PRIORITY["34-1"] := 30  ; "Use Tier 3 Potions"
    QUEST_PRIORITY["34-2"] := 30  ; "Use Tier 4 Potions"
    QUEST_PRIORITY["34-3"] := 30  ; "Use Tier 5 Potions"
    QUEST_PRIORITY["35"] := 5  ; "Eat Fruits"
    QUEST_PRIORITY["37"] := 20  ; "Break Coin Jars in Best Area"
    QUEST_PRIORITY["38"] := 20  ; "Break Comets in Best Area"
    QUEST_PRIORITY["39"] := 3  ; "Break Mini-Chests in Best Area"
    QUEST_PRIORITY["40"] := 25  ; "Make Golden Pets from Best Egg"
    QUEST_PRIORITY["41"] := 25  ; "Make Rainbow Pets from Best Egg"
    QUEST_PRIORITY["42"] := 20  ; "Hatch Rare Pets"
    QUEST_PRIORITY["43"] := 20  ; "Break Pinatas in the Best Area"
    QUEST_PRIORITY["44"] := 20  ; "Break Lucky Blocks in the Best Area"
    QUEST_PRIORITY["66"] := 3  ; "Break Superior Mini-Chests in Best Area"

    ; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
    ; QUEST PRIORITY OVERRIDES
    ; ----------------------------------------------------------------------------------------
    ; The quest overrides below are utilized by the macro and should not be altered by the
    ; user.
    ; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

    ; Update the priority if the player does not have VIP.
    if !gamepassVipSetting.Value
        QUEST_PRIORITY["9"] := 0  ; "Break Diamond Breakables"

    ; Update the priority if the player has Super Drops.
    if gamepassSuperDropsSetting.Value {
        QUEST_PRIORITY["14"] := 0  ; "Collect Potions"
        QUEST_PRIORITY["15"] := 0  ; "Collect Enchants"
    }

}
