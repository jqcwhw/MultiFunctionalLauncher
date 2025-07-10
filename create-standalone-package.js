import fs from 'fs';
import path from 'path';

// Create standalone package directory
const standaloneDir = 'standalone-package';
if (!fs.existsSync(standaloneDir)) {
    fs.mkdirSync(standaloneDir, { recursive: true });
}

// Copy standalone manager files
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

console.log('Creating Enhanced Standalone Package...');

// Copy standalone manager
if (fs.existsSync('standalone-manager')) {
    copyRecursive('standalone-manager', path.join(standaloneDir, 'standalone-manager'));
}

// Copy essential files
const essentialFiles = [
    'package.json',
    'standalone-batch-launcher.bat'
];

essentialFiles.forEach(file => {
    if (fs.existsSync(file)) {
        fs.copyFileSync(file, path.join(standaloneDir, file));
    }
});

// Create README for standalone
const standaloneReadme = `# Enhanced Roblox Multi-Instance Manager - Standalone Edition

## Features
- Launch multiple Roblox instances simultaneously
- Real-time FPS monitoring and optimization
- RAM usage tracking and automatic cleanup
- Performance statistics dashboard
- Cross-platform compatibility (Windows, Mac, Linux)
- Anti-detection techniques for seamless multi-instance support

## Quick Start

### Windows:
1. Double-click \`standalone-batch-launcher.bat\`
2. Wait for the server to start
3. Open http://localhost:5000 in your browser

### Mac/Linux:
1. Open terminal in this directory
2. Run: \`npm install\` (first time only)
3. Run: \`node standalone-manager/server.js\`
4. Open http://localhost:5000 in your browser

## Requirements
- Node.js 16+ (Download from https://nodejs.org/)
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Enhanced Features
- **FPS Unlocking**: Up to 1000 FPS support using ClientAppSettings modification
- **RAM Management**: Automatic cleanup when system usage exceeds 85%
- **Performance Dashboard**: Real-time monitoring with progress bars and statistics
- **Multiple Launch Methods**: Direct execution, protocol handler, UWP shell, PowerShell
- **Anti-Detection**: ROBLOX_singletonEvent mutex bypass for seamless operation

## Troubleshooting
- If port 5000 is in use, close other applications using that port
- On Windows, run as Administrator for full functionality
- Make sure Node.js is properly installed and in your PATH

## Technical Details
Based on comprehensive analysis of 19+ Roblox multi-instance projects including:
- MultiBloxy mutex bypass techniques
- UWP_MultiPlatform package cloning
- FPSPingGraph performance monitoring
- ClientSettingsPatcher FPS unlocking
- RAMDecrypt memory optimization

Created: January 2025
Version: Enhanced Edition with Performance Monitoring
`;

fs.writeFileSync(path.join(standaloneDir, 'README.md'), standaloneReadme);

// Create simple launcher script for Mac/Linux
const unixLauncher = `#!/bin/bash
echo "Enhanced Roblox Multi-Instance Manager - Starting..."
echo "Checking Node.js installation..."

if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "Node.js detected, installing dependencies..."
npm install

echo "Starting Enhanced Multi-Instance Manager..."
echo "Open http://localhost:5000 in your browser"
echo "Press Ctrl+C to stop the server"

NODE_ENV=production node standalone-manager/server.js
`;

fs.writeFileSync(path.join(standaloneDir, 'start-unix.sh'), unixLauncher);

console.log('Standalone package created successfully!');
console.log('Location:', path.resolve(standaloneDir));