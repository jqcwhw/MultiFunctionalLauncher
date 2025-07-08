#Requires AutoHotkey v2.0

; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
; DIRECTIVES & CONFIGURATIONS
; ▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

#SingleInstance Force  ; Forces the script to run only in a single instance. If this script is executed again, the new instance will replace the old one.
CoordMode "Mouse", "Client"  ; Sets the coordinate mode for mouse functions (like Click, MouseMove) to be relative to the active window's client area, ensuring consistent mouse positioning across different window states.
CoordMode "Pixel", "Client"  ; Sets the coordinate mode for pixel functions (like PixelSearch, PixelGetColor) to be relative to the active window's client area, improving accuracy in color detection and manipulation.
SetMouseDelay 10  ; Sets the delay between mouse events to 10 milliseconds, balancing speed and reliability of automated mouse actions.

getRobloxClients() {
    clients := WinGetList("ahk_exe RobloxPlayerBeta.exe")

    if clients.Length == 0 {
        MsgBox("No Roblox windows found.")
        ExitApp()
    }

    return clients
}

resizeWindow(windowHandle) {
    window := "ahk_id " windowHandle
    
    if !WinExist(window)
        return

    WinActivate window
    WinRestore window
    WinMove , , A_ScreenWidth, 600, window
    WinMove , , 800, 600, window
}

activateWindow(windowHandle := -1) {
    window := "ahk_id " windowHandle

    if !WinExist(window)
        return false

    Loop 100 {
        WinActivate window
        Sleep 10
        if WinGetID("A") == windowHandle
            return true
    }
}