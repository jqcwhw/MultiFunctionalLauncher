#Requires AutoHotkey v2.0

; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; LEADERBOARD MENU
; Updated: 2024-01-04
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

; Pixel checks.
LEADERBOARD_COLOURS := [
    "0x121215",     ; Almost black leaderboard.
    "0x000000",     ; Black leaderboard.
    "0x494a4c",     ; Light black leaderboard.
    "0x494b4c",     ; Another light black leaderboard.
    "0x434446",     ; More light black leaderboard.
    "0x191b1d",     ; Mostly black leaderboard.
]

; Detects and closes the leaderboard menu.
closeLeaderboard() {

    if isLeaderboardDisplayed() {
        Send "{Tab}"
        Sleep 200
    }
}

; Detects and opens the leaderboard menu.
openLeaderboard() {

    if !isLeaderboardDisplayed() {
        Send "{Tab}"
        Sleep 200
    }
}

; Checks if the leaderboard menu is visible.
isLeaderboardDisplayed() {

    search := {x1: 790, y1: 70, x2: 790, y2: 70}
    for index, colour in LEADERBOARD_COLOURS {
        if PixelSearch(&X, &Y, search.x1, search.y1, search.x2, search.y2, colour, 2)
            return true
    }   

    return false   
}