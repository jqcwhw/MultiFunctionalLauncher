@echo off
title Roblox Multi-Instance Manager
echo 🚀 Starting Roblox Multi-Instance Manager...
echo.

REM Check if Node.js is available
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js found, starting application...
echo.

REM Start the application
node portable-launcher.js

echo.
echo Application has stopped.
pause