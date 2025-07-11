# Windows Compatibility Fix

## Problem
The desktop app package uses `NODE_ENV=development` syntax which doesn't work on Windows command line.

## Solutions

### Option 1: Use Batch File (Recommended)
1. Double-click `run-desktop-app.bat`
2. The script will automatically set the environment variable and start the app

### Option 2: Use PowerShell Script
1. Right-click `run-desktop-app.ps1` → "Run with PowerShell"
2. If you get execution policy errors, run this first:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

### Option 3: Manual Commands
Open Command Prompt or PowerShell in the project directory and run:

**Command Prompt:**
```cmd
cd app-package
set NODE_ENV=development
npm run dev
```

**PowerShell:**
```powershell
cd app-package
$env:NODE_ENV = "development"
npm run dev
```

### Option 4: Install cross-env (Global Fix)
```cmd
npm install -g cross-env
```
Then the original commands will work.

## Production Mode
For production mode, use:
```cmd
set NODE_ENV=production
npm start
```

## What This Fixes
- Windows command line doesn't recognize `NODE_ENV=development` syntax
- The scripts set the environment variable using Windows-compatible methods
- All functionality remains the same, just better Windows compatibility

## Files Created
- `run-desktop-app.bat` - Batch file launcher
- `run-desktop-app.ps1` - PowerShell launcher
- `Windows-Fix-Instructions.md` - This guide

## Next Steps
1. Use any of the above methods to start the app
2. The web interface will be available at `http://localhost:3000`
3. Use the multi-instance manager as normal