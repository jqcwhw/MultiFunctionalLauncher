@echo off
REM Enhanced Roblox Multi-Instance Manager - Desktop App Launcher
REM This script fixes Windows compatibility issues with NODE_ENV

echo.
echo ==========================================
echo  Enhanced Roblox Multi-Instance Manager
echo ==========================================
echo.

REM Check if we're in the app-package directory
if exist "app-package" (
    echo Entering app-package directory...
    cd app-package
)

REM Check if package.json exists
if not exist "package.json" (
    echo ERROR: package.json not found!
    echo Please run this script from the main project directory.
    pause
    exit /b 1
)

REM Install dependencies if needed
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

REM Set environment variable for Windows and run the app
echo Starting Enhanced Roblox Multi-Instance Manager...
echo.
set NODE_ENV=development
npm run dev

REM Keep window open on error
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to start the application
    echo Error code: %errorlevel%
    pause
)