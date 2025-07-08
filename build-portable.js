const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Building Portable Roblox Multi-Instance Manager...\n');

// Step 1: Build the client
console.log('📦 Building client...');
try {
  execSync('npm run build:client', { stdio: 'inherit' });
  console.log('✅ Client built successfully\n');
} catch (error) {
  console.error('❌ Client build failed:', error.message);
  process.exit(1);
}

// Step 2: Build the server
console.log('🔧 Building server...');
try {
  execSync('npm run build:server', { stdio: 'inherit' });
  console.log('✅ Server built successfully\n');
} catch (error) {
  console.error('❌ Server build failed:', error.message);
  process.exit(1);
}

// Step 3: Create portable directory structure
console.log('📁 Creating portable directory structure...');
const portableDir = path.join(__dirname, 'portable-build');
const distDir = path.join(portableDir, 'dist');
const serverDir = path.join(portableDir, 'server');
const resourcesDir = path.join(portableDir, 'resources');

// Clean and create directories
if (fs.existsSync(portableDir)) {
  fs.rmSync(portableDir, { recursive: true, force: true });
}

fs.mkdirSync(portableDir, { recursive: true });
fs.mkdirSync(distDir, { recursive: true });
fs.mkdirSync(serverDir, { recursive: true });
fs.mkdirSync(resourcesDir, { recursive: true });

// Step 4: Copy built files
console.log('📋 Copying built files...');

// Copy client build
const clientDist = path.join(__dirname, 'dist');
if (fs.existsSync(clientDist)) {
  copyRecursive(clientDist, distDir);
}

// Copy server build
const serverBuild = path.join(__dirname, 'server-dist');
if (fs.existsSync(serverBuild)) {
  copyRecursive(serverBuild, serverDir);
}

// Copy necessary resources
const resourceFiles = [
  'package.json',
  'electron-standalone.js',
  'electron-preload.js'
];

resourceFiles.forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(portableDir, file));
  }
});

// Step 5: Create launcher scripts
console.log('🚀 Creating launcher scripts...');

// Windows launcher
const windowsLauncher = `@echo off
title Roblox Multi-Instance Manager
echo Starting Roblox Multi-Instance Manager...
echo.

REM Check if Node.js is available
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Start the application
echo Starting server...
cd /d "%~dp0"
node electron-standalone.js

pause
`;

// Linux/Mac launcher
const unixLauncher = `#!/bin/bash
echo "Starting Roblox Multi-Instance Manager..."
echo

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed or not in PATH"
    echo "Please install Node.js from https://nodejs.org/"
    read -p "Press any key to continue..."
    exit 1
fi

# Start the application
echo "Starting server..."
cd "$(dirname "$0")"
node electron-standalone.js

read -p "Press any key to continue..."
`;

fs.writeFileSync(path.join(portableDir, 'start.bat'), windowsLauncher);
fs.writeFileSync(path.join(portableDir, 'start.sh'), unixLauncher);

// Make shell script executable
if (process.platform !== 'win32') {
  try {
    execSync(`chmod +x "${path.join(portableDir, 'start.sh')}"`);
  } catch (error) {
    console.warn('Warning: Could not make start.sh executable');
  }
}

// Step 6: Create README
console.log('📝 Creating documentation...');
const readme = `# Roblox Multi-Instance Manager - Portable

## Quick Start

### Windows
1. Double-click \`start.bat\` to launch the application
2. The application will open in your default web browser
3. If prompted by Windows Defender, allow the application to run

### Linux/Mac
1. Open terminal in this directory
2. Run: \`./start.sh\`
3. Or run directly: \`node electron-standalone.js\`

## Requirements

- Node.js (version 18 or higher)
- Windows 10/11, macOS 10.15+, or modern Linux distribution
- For full functionality: Windows (registry and mutex operations)

## Features

- ✅ Multi-instance Roblox management
- ✅ Account synchronization
- ✅ UWP instance control
- ✅ Enhanced process management
- ✅ Anti-detection measures (Windows only)
- ✅ Resource monitoring
- ✅ Cross-platform compatibility

## Troubleshooting

### Application won't start
- Ensure Node.js is installed: https://nodejs.org/
- Try running: \`node --version\` in terminal/command prompt
- Check that all files are present in the directory

### Port already in use
- The application will automatically find an available port
- Default ports tried: 3000, 3001, 3002, etc.

### Windows-specific features not working
- Run as Administrator for full registry access
- Some features require Windows platform

## Support

This is a standalone portable version. No installation required!
Just extract and run the launcher script for your platform.

## Security Note

This application runs a local web server on your machine.
The server is only accessible from your computer (localhost).
No external network access is required except for Roblox itself.
`;

fs.writeFileSync(path.join(portableDir, 'README.md'), readme);

// Step 7: Create package.json for portable version
const portablePackage = {
  name: "roblox-multi-instance-portable",
  version: "1.0.0",
  description: "Portable Roblox Multi-Instance Manager",
  main: "electron-standalone.js",
  scripts: {
    "start": "node electron-standalone.js"
  },
  dependencies: {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  }
};

fs.writeFileSync(path.join(portableDir, 'package.json'), JSON.stringify(portablePackage, null, 2));

console.log('✅ Portable build completed successfully!\n');
console.log(`📦 Portable application created in: ${portableDir}`);
console.log('\n🚀 To use:');
console.log('  Windows: Run start.bat');
console.log('  Linux/Mac: Run ./start.sh or node electron-standalone.js');
console.log('\n📋 Features included:');
console.log('  ✅ Full web interface');
console.log('  ✅ Multi-instance management'); 
console.log('  ✅ Account synchronization');
console.log('  ✅ Cross-platform compatibility');
console.log('  ✅ No installation required');

// Helper function to copy files recursively
function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  
  const stat = fs.statSync(src);
  
  if (stat.isDirectory()) {
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