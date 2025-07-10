import fs from 'fs';
import path from 'path';

// Create app package directory
const appDir = 'app-package';
if (!fs.existsSync(appDir)) {
    fs.mkdirSync(appDir, { recursive: true });
}

// Copy files recursively
function copyRecursive(src, dest) {
    if (fs.statSync(src).isDirectory()) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(file => {
            copyRecursive(path.join(src, file), path.join(dest, file));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

console.log('Creating Enhanced Desktop App Package...');

// Copy essential directories
const directories = ['client', 'server', 'shared', 'standalone-manager'];
directories.forEach(dir => {
    if (fs.existsSync(dir)) {
        copyRecursive(dir, path.join(appDir, dir));
    }
});

// Copy essential files
const essentialFiles = [
    'package.json',
    'package-lock.json',
    'electron-main.js',
    'electron-preload.js',
    'electron-standalone.js',
    'electron-builder.yml',
    'vite.config.ts',
    'tsconfig.json',
    'tailwind.config.ts',
    'postcss.config.js',
    'components.json',
    'drizzle.config.ts'
];

essentialFiles.forEach(file => {
    if (fs.existsSync(file)) {
        fs.copyFileSync(file, path.join(appDir, file));
    }
});

// Create app-specific README
const appReadme = `# Enhanced Roblox Multi-Instance Manager - Desktop App

## Features
- Native desktop application with embedded server
- Launch multiple Roblox instances simultaneously
- Real-time FPS monitoring (30-1000 FPS support)
- RAM usage tracking and automatic optimization
- Performance statistics dashboard
- Cross-platform support (Windows, Mac, Linux)
- Modern React-based UI with advanced monitoring

## Quick Start

### Option 1: Run Development Version
1. Install dependencies: \`npm install\`
2. Start the app: \`npm run electron:dev\`

### Option 2: Build Desktop App
1. Install dependencies: \`npm install\`
2. Build the app: \`npm run electron:build\`
3. Find the built app in the \`dist\` folder

### Option 3: Standalone Mode
1. Run: \`node electron-standalone.js\`
2. Open http://localhost:5000 in your browser

## Enhanced Performance Features

### FPS Monitoring System
- Real-time FPS tracking for all instances
- Customizable FPS targets (30-1000 FPS)
- Visual progress bars and statistics
- Based on FPSPingGraph.lua techniques

### RAM Management
- System-wide RAM usage monitoring
- Per-instance memory limits (512MB-16GB)
- Automatic cleanup when usage exceeds 85%
- Based on RAMDecrypt optimization methods

### Advanced Dashboard
- Performance cards with live statistics
- Interactive toggle switches for settings
- Real-time progress bars and indicators
- Modern gradient design with responsive layout

## Technical Implementation

### Multi-Instance Engine
- ROBLOX_singletonEvent mutex bypass
- UWP package cloning support
- Multiple launch methods (Direct, Protocol, UWP, PowerShell)
- Cross-platform process management

### Performance Optimization
- ClientAppSettings.json FPS unlocking
- DFIntTaskSchedulerTargetFps modification
- PowerShell-based memory monitoring
- Automatic resource optimization

### Anti-Detection Methods
- Mutex management and bypass
- Registry modification support
- Process isolation techniques
- Based on analysis of 19+ projects

## Development Commands
- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run electron:dev\` - Start Electron app in development
- \`npm run electron:build\` - Build desktop application
- \`npm run db:push\` - Push database schema changes

## Requirements
- Node.js 18+ (Download from https://nodejs.org/)
- Modern web browser (for standalone mode)
- 4GB+ RAM recommended for multiple instances

Created: January 2025
Version: Enhanced Edition with Advanced Performance Monitoring
Technology: React + Node.js + Electron + PostgreSQL
`;

fs.writeFileSync(path.join(appDir, 'README.md'), appReadme);

// Create build script
const buildScript = `@echo off
title Building Enhanced Roblox Multi-Instance Manager
echo ===============================================
echo  Building Enhanced Desktop Application
echo ===============================================
echo.

echo [INFO] Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

echo [INFO] Building desktop application...
npm run electron:build
if %errorlevel% neq 0 (
    echo [ERROR] Build failed
    pause
    exit /b 1
)

echo.
echo [SUCCESS] Build completed!
echo [INFO] Check the 'dist' folder for your application
echo.
pause
`;

fs.writeFileSync(path.join(appDir, 'build-app.bat'), buildScript);

console.log('Desktop app package created successfully!');
console.log('Location:', path.resolve(appDir));