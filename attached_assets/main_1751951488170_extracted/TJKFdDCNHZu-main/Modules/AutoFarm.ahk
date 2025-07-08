#Requires AutoHotkey v2.0

; Pixel checks.
AUTO_FARM_ON := {x: 58, y: 294, colour: "0xff1760"}
AUTO_FARM_OFF := {x: 58, y: 294, colour: "0x84f710"}

; Click locations.
AUTO_FARM_BUTTON := {x: 44, y: 313}

enableAutoFarm() {
    button := AUTO_FARM_BUTTON

    if isAutoFarmOn() {
        SendEvent "{Click, " button.x ", " button.y ", 1}"
        Sleep 50
    }

    if isAutoFarmOff() {
        SendEvent "{Click, " button.x ", " button.y ", 1}"
        Sleep 50
    }
        
}

isAutoFarmOff() {
    pixel := AUTO_FARM_OFF
    return PixelSearch(&x, &y, pixel.x, pixel.y, pixel.x, pixel.y, pixel.colour, 2)
}

isAutoFarmOn() {
    pixel := AUTO_FARM_ON
    return PixelSearch(&x, &y, pixel.x, pixel.y, pixel.x, pixel.y, pixel.colour, 2)
}