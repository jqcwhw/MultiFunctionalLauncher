#SingleInstance Force
#NoEnv
SetWorkingDir %A_ScriptDir%
SendMode Input
SetBatchLines -1

; Roblox ID Scraper
; This simple tool extracts IDs from Roblox games and users:
; - Game/Place IDs
; - Universe IDs
; - User/Group IDs
; - Asset IDs

; Create UI
Gui, +AlwaysOnTop
Gui, Color, 0x2D2D2D
Gui, Font, s12 cWhite, Segoe UI
Gui, Add, Text, w450 Center, Roblox ID Scraper

Gui, Font, s10 cWhite
Gui, Add, Text, w100 xm, Roblox URL or ID:
Gui, Add, Edit, vInputID w340 x+10, 

Gui, Add, Button, xm w100 gScrapeID, Scrape ID
Gui, Add, Button, x+10 w100 gClearLog, Clear Log
Gui, Add, Button, x+10 w100 gSaveLog, Save Log
Gui, Add, Button, x+10 w100 gExtractFromClipboard, From Clipboard

Gui, Font, s10 cWhite
Gui, Add, GroupBox, xm w450 h250, Results
Gui, Font, s9 cLime
Gui, Add, Edit, xm+10 yp+20 w430 h220 vResultsBox ReadOnly, Enter a Roblox ID or URL to extract information.

Gui, Show, w470 h380, Roblox ID Scraper

; Function to scrape ID info
ScrapeID:
    Gui, Submit, NoHide
    if (InputID = "") {
        AppendResult("Error: Please enter a Roblox URL or ID")
        return
    }
    
    ; Clean up input and extract ID
    inputValue := Trim(InputID)
    
    ; Check if input is a URL or raw ID
    if (RegExMatch(inputValue, "https?:\/\/|www\.roblox\.com")) {
        ; It's a URL, extract ID based on type
        if (RegExMatch(inputValue, "i)games\/(\d+)", match)) {
            ; Game URL
            gameID := match1
            ScrapeGameInfo(gameID)
        }
        else if (RegExMatch(inputValue, "i)catalog\/(\d+)|asset\/(\d+)", match)) {
            ; Asset URL
            assetID := match1 ? match1 : match2
            ScrapeAssetInfo(assetID)
        }
        else if (RegExMatch(inputValue, "i)users\/(\d+)|profile\/(\d+)", match)) {
            ; User URL
            userID := match1 ? match1 : match2
            ScrapeUserInfo(userID)
        }
        else if (RegExMatch(inputValue, "i)groups\/(\d+)", match)) {
            ; Group URL
            groupID := match1
            ScrapeGroupInfo(groupID)
        }
        else {
            AppendResult("Error: Could not determine the type of Roblox URL")
        }
    }
    else if (RegExMatch(inputValue, "^\d+$")) {
        ; It's a raw ID, try to determine type
        idValue := inputValue
        AppendResult("Analyzing ID: " . idValue . "...")
        AppendResult("Testing as multiple ID types...")
        
        ; Try as game ID
        ScrapeGameInfo(idValue)
        
        ; Also try as user ID
        ScrapeUserInfo(idValue)
        
        ; Also try as group ID
        ScrapeGroupInfo(idValue)
        
        ; Also try as asset ID
        ScrapeAssetInfo(idValue)
    }
    else {
        AppendResult("Error: Input must be a valid Roblox URL or numeric ID")
    }
return

; Function to scrape game info
ScrapeGameInfo(gameID) {
    AppendResult("Checking as Game/Place ID: " . gameID)
    
    ; Create temp file
    tempFile := A_Temp . "\robloxscrape.txt"
    
    ; Try to get universe ID
    RunWait, %comspec% /c curl -s "https://apis.roblox.com/universes/v1/places/%gameID%/universe" > "%tempFile%", , Hide
    FileRead, universeData, %tempFile%
    
    if (InStr(universeData, "universeId")) {
        RegExMatch(universeData, "universeId""\s*:\s*(\d+)", universeID)
        AppendResult("✓ VALID GAME/PLACE ID")
        AppendResult("  Place ID: " . gameID)
        AppendResult("  Universe ID: " . universeID1)
        
        ; Get game details
        RunWait, %comspec% /c curl -s "https://games.roblox.com/v1/games?universeIds=%universeID1%" > "%tempFile%", , Hide
        FileRead, gameData, %tempFile%
        
        if (InStr(gameData, "name")) {
            ; Extract root place
            RegExMatch(gameData, """rootPlaceId""\s*:\s*(\d+)", rootPlace)
            
            ; Extract creator info
            RegExMatch(gameData, """creator""[\s\S]*?""id""\s*:\s*(\d+)", creatorId)
            RegExMatch(gameData, """type""\s*:\s*""([^""]+)", creatorType)
            
            ; Extract game name
            RegExMatch(gameData, """name""\s*:\s*""([^""]+)", gameName)
            cleanName := RegExReplace(gameName1, "\\u[0-9a-fA-F]{4}", "?")
            
            AppendResult("  Game Name: " . cleanName)
            
            if (rootPlace1 != gameID) {
                AppendResult("  Root Place ID: " . rootPlace1)
                AppendResult("  This appears to be a private server or alternate place")
            }
            
            AppendResult("  Creator ID: " . creatorId1 . " (Type: " . creatorType1 . ")")
            
            ; Add links
            AppendResult("`n  Access URLs:")
            AppendResult("  - https://www.roblox.com/games/" . gameID)
            AppendResult("  - https://www.roblox.com/games/" . rootPlace1)
        }
    }
    else {
        AppendResult("✗ Not a valid Game/Place ID")
    }
    
    ; Clean up
    FileDelete, %tempFile%
}

; Function to scrape user info
ScrapeUserInfo(userID) {
    AppendResult("Checking as User ID: " . userID)
    
    ; Create temp file
    tempFile := A_Temp . "\robloxscrape.txt"
    
    ; Try to get user info
    RunWait, %comspec% /c curl -s "https://users.roblox.com/v1/users/%userID%" > "%tempFile%", , Hide
    FileRead, userData, %tempFile%
    
    if (InStr(userData, "name")) {
        AppendResult("✓ VALID USER ID")
        
        ; Extract username
        RegExMatch(userData, """name""\s*:\s*""([^""]+)", userName)
        RegExMatch(userData, """displayName""\s*:\s*""([^""]+)", displayName)
        
        AppendResult("  User ID: " . userID)
        AppendResult("  Username: " . userName1)
        AppendResult("  Display Name: " . displayName1)
        
        ; Add links
        AppendResult("`n  Access URLs:")
        AppendResult("  - https://www.roblox.com/users/" . userID . "/profile")
        
        ; Get creations
        RunWait, %comspec% /c curl -s "https://games.roblox.com/v2/users/%userID%/games?sortOrder=Desc&limit=10" > "%tempFile%", , Hide
        FileRead, gamesData, %tempFile%
        
        if (InStr(gamesData, "data")) {
            AppendResult("`n  Has published games/experiences")
        }
    }
    else {
        AppendResult("✗ Not a valid User ID")
    }
    
    ; Clean up
    FileDelete, %tempFile%
}

; Function to scrape group info
ScrapeGroupInfo(groupID) {
    AppendResult("Checking as Group ID: " . groupID)
    
    ; Create temp file
    tempFile := A_Temp . "\robloxscrape.txt"
    
    ; Try to get group info
    RunWait, %comspec% /c curl -s "https://groups.roblox.com/v1/groups/%groupID%" > "%tempFile%", , Hide
    FileRead, groupData, %tempFile%
    
    if (InStr(groupData, "name")) {
        AppendResult("✓ VALID GROUP ID")
        
        ; Extract group name
        RegExMatch(groupData, """name""\s*:\s*""([^""]+)", groupName)
        
        AppendResult("  Group ID: " . groupID)
        AppendResult("  Group Name: " . groupName1)
        
        ; Extract owner if exists
        if (InStr(groupData, """owner""") && !InStr(groupData, """owner"":null")) {
            RegExMatch(groupData, """owner""[\s\S]*?""id""\s*:\s*(\d+)", ownerId)
            RegExMatch(groupData, """owner""[\s\S]*?""username""\s*:\s*""([^""]+)", ownerName)
            
            AppendResult("  Owner ID: " . ownerId1)
            AppendResult("  Owner Name: " . ownerName1)
        }
        
        ; Add links
        AppendResult("`n  Access URLs:")
        AppendResult("  - https://www.roblox.com/groups/" . groupID)
        
        ; Get games
        RunWait, %comspec% /c curl -s "https://games.roblox.com/v2/groups/%groupID%/games?sortOrder=Desc&limit=10" > "%tempFile%", , Hide
        FileRead, gamesData, %tempFile%
        
        if (InStr(gamesData, "data")) {
            AppendResult("`n  Has published games/experiences")
        }
    }
    else {
        AppendResult("✗ Not a valid Group ID")
    }
    
    ; Clean up
    FileDelete, %tempFile%
}

; Function to scrape asset info
ScrapeAssetInfo(assetID) {
    AppendResult("Checking as Asset ID: " . assetID)
    
    ; Create temp file
    tempFile := A_Temp . "\robloxscrape.txt"
    
    ; Try to get asset info
    RunWait, %comspec% /c curl -s "https://economy.roblox.com/v2/assets/%assetID%/details" > "%tempFile%", , Hide
    FileRead, assetData, %tempFile%
    
    if (InStr(assetData, "name")) {
        AppendResult("✓ VALID ASSET ID")
        
        ; Extract asset info
        RegExMatch(assetData, """name""\s*:\s*""([^""]+)", assetName)
        RegExMatch(assetData, """assetType""\s*:\s*(\{[^\}]+\})", assetType)
        RegExMatch(assetType, """name""\s*:\s*""([^""]+)", typeName)
        
        AppendResult("  Asset ID: " . assetID)
        AppendResult("  Asset Name: " . assetName1)
        AppendResult("  Asset Type: " . typeName1)
        
        ; Extract creator info
        RegExMatch(assetData, """creator""[\s\S]*?""id""\s*:\s*(\d+)", creatorId)
        RegExMatch(assetData, """creatorType""\s*:\s*""([^""]+)", creatorType)
        
        AppendResult("  Creator ID: " . creatorId1 . " (Type: " . creatorType1 . ")")
        
        ; Add links
        AppendResult("`n  Access URLs:")
        AppendResult("  - https://www.roblox.com/catalog/" . assetID)
        
        ; Check for game using this asset
        if (InStr(typeName1, "Place") || InStr(typeName1, "Model")) {
            AppendResult("  This asset might be used in games/experiences")
        }
    }
    else {
        AppendResult("✗ Not a valid Asset ID")
    }
    
    ; Clean up
    FileDelete, %tempFile%
}

; Extract from clipboard
ExtractFromClipboard:
    clipboard := RegExReplace(clipboard, "\s+", " ")
    
    ; Extract all IDs from clipboard
    AppendResult("Extracting IDs from clipboard...")
    
    ; Look for game IDs
    gameIDs := []
    pos := 1
    While pos := RegExMatch(clipboard, "games\/(\d+)|place\?id=(\d+)", match, pos + StrLen(match)) {
        gameID := match1 ? match1 : match2
        if (gameID && !HasValue(gameIDs, gameID))
            gameIDs.Push(gameID)
    }
    
    ; Look for user IDs
    userIDs := []
    pos := 1
    While pos := RegExMatch(clipboard, "users\/(\d+)|profile\/(\d+)", match, pos + StrLen(match)) {
        userID := match1 ? match1 : match2
        if (userID && !HasValue(userIDs, userID))
            userIDs.Push(userID)
    }
    
    ; Look for group IDs
    groupIDs := []
    pos := 1
    While pos := RegExMatch(clipboard, "groups\/(\d+)", match, pos + StrLen(match)) {
        if (match1 && !HasValue(groupIDs, match1))
            groupIDs.Push(match1)
    }
    
    ; Look for asset IDs
    assetIDs := []
    pos := 1
    While pos := RegExMatch(clipboard, "catalog\/(\d+)|asset\/(\d+)", match, pos + StrLen(match)) {
        assetID := match1 ? match1 : match2
        if (assetID && !HasValue(assetIDs, assetID))
            assetIDs.Push(assetID)
    }
    
    ; Also try to find raw numeric IDs that are large enough to be Roblox IDs
    ; Only if they're on a line by themselves or separated clearly
    pos := 1
    While pos := RegExMatch(clipboard, "(^|\s)(\d{8,19})($|\s)", match, pos + StrLen(match)) {
        rawID := match2
        if (rawID && !HasValue(gameIDs, rawID) && !HasValue(userIDs, rawID) && 
            !HasValue(groupIDs, rawID) && !HasValue(assetIDs, rawID)) {
            ; Try as all types
            GuiControl,, InputID, %rawID%
            ScrapeID()
        }
    }
    
    ; Process found IDs
    if (gameIDs.Length() > 0) {
        AppendResult("`nFound " . gameIDs.Length() . " Game/Place IDs:")
        for i, id in gameIDs {
            AppendResult("Game ID: " . id)
            GuiControl,, InputID, %id%
            ScrapeID()
        }
    }
    
    if (userIDs.Length() > 0) {
        AppendResult("`nFound " . userIDs.Length() . " User IDs:")
        for i, id in userIDs {
            AppendResult("User ID: " . id)
            GuiControl,, InputID, %id%
            ScrapeID()
        }
    }
    
    if (groupIDs.Length() > 0) {
        AppendResult("`nFound " . groupIDs.Length() . " Group IDs:")
        for i, id in groupIDs {
            AppendResult("Group ID: " . id)
            GuiControl,, InputID, %id%
            ScrapeID()
        }
    }
    
    if (assetIDs.Length() > 0) {
        AppendResult("`nFound " . assetIDs.Length() . " Asset IDs:")
        for i, id in assetIDs {
            AppendResult("Asset ID: " . id)
            GuiControl,, InputID, %id%
            ScrapeID()
        }
    }
    
    if (gameIDs.Length() = 0 && userIDs.Length() = 0 && groupIDs.Length() = 0 && assetIDs.Length() = 0) {
        AppendResult("No Roblox IDs found in clipboard.")
    }
return

; Check if array contains value
HasValue(arr, val) {
    for i, v in arr {
        if (v = val)
            return true
    }
    return false
}

; Append to results
AppendResult(text) {
    GuiControlGet, currentText,, ResultsBox
    GuiControl,, ResultsBox, %currentText%`n%text%
}

; Clear log
ClearLog:
    GuiControl,, ResultsBox, Enter a Roblox ID or URL to extract information.
    GuiControl,, InputID, 
return

; Save log
SaveLog:
    FormatTime, timestamp,, yyyy-MM-dd_HHmmss
    GuiControlGet, results,, ResultsBox
    filename := "RobloxIDs_" . timestamp . ".txt"
    
    FileDelete, %filename%
    FileAppend, %results%, %filename%
    
    if ErrorLevel
        MsgBox, Error saving results to file.
    else
        MsgBox, Results saved to %filename%
return

GuiClose:
ExitApp