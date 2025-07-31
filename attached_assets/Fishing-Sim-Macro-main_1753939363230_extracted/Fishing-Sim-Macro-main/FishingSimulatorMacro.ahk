#MaxThreads 255
#Requires AutoHotkey v2.0
#SingleInstance Force
CoordMode "Mouse","Screen"
SendMode "Event"
#Include "%A_ScriptDir%\lib"
#Include "Gdip_All.ahk"
#Include "Gdip_ImageSearch.ahk"
#Include "Roblox.ahk"

windowX:=windowY:=windowWidth:=windowHeight:=0
(bitmaps:=Map()).CaseSense:=0
pToken:=Gdip_Startup()
#Include "%A_ScriptDir%\images\bitmaps.ahk"

F1:: {
    static x:=0
    x^=1
    SetTimer(AutoCast, x ? 1:0)
}
F2::Reload
F3::ExitApp

AutoCast(){
    GetRobloxClientPos(hwnd:=GetRobloxHWND())
    MouseMove(windowX+200+(WindowWidth/2), windowY+(WindowHeight/2)), Click(), Sleep(500)
    loop 50 {
        pBMScreen:=Gdip_BitmapFromScreen(windowX+(WindowWidth/2) "|" windowY+((WindowHeight/2)*.8) "|" (WindowWidth/2) "|" (WindowHeight/2)*1.2)
        if (Gdip_ImageSearch(pBMScreen,bitmaps["fishspawn"],,,,,,2)) {
            Gdip_DisposeImage(pBMScreen)
            AutoReel()
            break
        }
        Gdip_DisposeImage(pBMScreen)
        sleep(100)
    }
}
AutoReel(){
    sleep(100),Click()
    loop 20 {
        ; area finding needs improvement
        pBMScreen:=Gdip_BitmapFromScreen(windowX+(0.34409*windowWidth) "|" windowY+(0.7446*windowHeight) "|" 0.31190*windowWidth "|" 0.10393*windowHeight)
        if !(Gdip_ImageSearch(pBMScreen,bitmaps["bobber"],,,,,,2)) {
            Gdip_DisposeImage(pBMScreen)
            break
        }
        Gdip_DisposeImage(pBMScreen)
        Click(),sleep(500)
    }
}
