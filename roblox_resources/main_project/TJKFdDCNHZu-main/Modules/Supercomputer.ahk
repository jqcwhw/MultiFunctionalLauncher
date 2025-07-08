#Requires AutoHotkey v2.0

openSupercomputer(clientId) {
    activateWindow(clientId)
    supercomputerKeybind := CLIENT_MAP[clientId]["supercomputer"]

    Loop 100 {
        SendEvent supercomputerKeybind
        if isSupercomputerWindowOpen()
            break
        Sleep 10
    }
}

isSupercomputerWindowOpen() {
    pixel := [48, 116]
    colour := "0x0683f2"
    return PixelSearch(&X, &Y, pixel[1], pixel[2], pixel[1], pixel[2], colour, 2)
}

findAndClickSupercomputerButton(imagePath) {
    buttonArea := [45, 100, 754, 475]
    

    if not FileExist(imagePath)
        return false

    Loop 5 {
        buttonFound := false
        moveMouseToCentreOfScreen()
        Sleep 100
        activateMouseHover()
        scrollMouseWheel("{WheelUp}", 4)
        Sleep 100
        Loop 4 {
            if ImageSearch(&X, &Y, buttonArea[1], buttonArea[2], buttonArea[3], buttonArea[4], " *30 " imagePath) {
                MouseMove X, Y
                activateMouseHover()
                SendEvent "{Click, " X ", " Y ", 1}"
                Sleep 100
                return true
            }
            moveMouseToCentreOfScreen()
            scrollMouseWheel("{WheelDown}", 1)
        }
    }
}