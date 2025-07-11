# Enhanced Roblox Multi-Instance Manager - Desktop App Launcher (PowerShell)
# This script fixes Windows compatibility issues with NODE_ENV

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Enhanced Roblox Multi-Instance Manager" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the app-package directory
if (Test-Path "app-package") {
    Write-Host "Entering app-package directory..." -ForegroundColor Green
    Set-Location "app-package"
}

# Check if package.json exists
if (-not (Test-Path "package.json")) {
    Write-Host "ERROR: package.json not found!" -ForegroundColor Red
    Write-Host "Please run this script from the main project directory." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Install dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Set environment variable for Windows and run the app
Write-Host "Starting Enhanced Roblox Multi-Instance Manager..." -ForegroundColor Green
Write-Host ""

$env:NODE_ENV = "development"
npm run dev

# Keep window open on error
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "ERROR: Failed to start the application" -ForegroundColor Red
    Write-Host "Error code: $LASTEXITCODE" -ForegroundColor Red
    Read-Host "Press Enter to exit"
}