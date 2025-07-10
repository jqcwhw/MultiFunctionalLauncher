@echo off
title Enhanced Roblox Multi-Instance Manager - Standalone Edition
echo ===============================================
echo  Enhanced Roblox Multi-Instance Manager
echo  Standalone Edition with FPS Monitoring
echo ===============================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not available
    echo Please reinstall Node.js with npm included
    echo.
    pause
    exit /b 1
)

echo [INFO] Node.js detected, starting Enhanced Multi-Instance Manager...
echo.

REM Install dependencies if needed
if not exist "node_modules" (
    echo [INFO] Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Set environment variables
set NODE_ENV=production
set PORT=5000

echo [INFO] Starting Enhanced Roblox Multi-Instance Manager on http://localhost:5000
echo [INFO] Press Ctrl+C to stop the server
echo.

REM Start the standalone manager
node standalone-manager/server.js

echo.
echo [INFO] Server stopped. Press any key to exit...
pause >nul