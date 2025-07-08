#Requires AutoHotkey v2.0

closeChatMenu() {
    button := [80, 25]
    if isChatIconWhite()
        SendEvent "{Click, " button[1] ", " button[2] ", 1}"
}

isChatIconWhite() {
    pixel := [80, 25]
    colour := "0xffffff"
    return PixelSearch(&X, &Y, pixel[1], pixel[2], pixel[1], pixel[2], colour, 2)    
}