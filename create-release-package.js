import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Creating Release Package for Roblox Multi-Instance Manager');
console.log('============================================================');

const releaseDir = path.join(__dirname, 'release-packages');
const standaloneDir = path.join(__dirname, 'standalone-manager');

// Create release directory
if (!fs.existsSync(releaseDir)) {
  fs.mkdirSync(releaseDir, { recursive: true });
}

// Create development package
const devPackageDir = path.join(releaseDir, 'roblox-multi-instance-dev');
if (fs.existsSync(devPackageDir)) {
  fs.rmSync(devPackageDir, { recursive: true, force: true });
}

console.log('📦 Creating development package...');

// Copy essential files for development version
const devFiles = [
  'standalone-manager/',
  'COMPREHENSIVE_LAUNCH_METHODS.md',
  'IMPLEMENTATION_GUIDE.md',
  'SETUP_INSTRUCTIONS.md',
  'README.md',
  'replit.md'
];

fs.mkdirSync(devPackageDir, { recursive: true });

devFiles.forEach(file => {
  const srcPath = path.join(__dirname, file);
  const destPath = path.join(devPackageDir, file);
  
  if (fs.existsSync(srcPath)) {
    if (fs.statSync(srcPath).isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
});

// Create portable package
const portableDir = path.join(releaseDir, 'roblox-multi-instance-portable');
if (fs.existsSync(portableDir)) {
  fs.rmSync(portableDir, { recursive: true, force: true });
}

console.log('📦 Creating portable package...');

fs.mkdirSync(portableDir, { recursive: true });

// Copy standalone manager
copyRecursive(standaloneDir, portableDir);

// Create launch scripts
const windowsLauncher = `@echo off
title Roblox Multi-Instance Manager
echo.
echo ======================================
echo  Roblox Multi-Instance Manager
echo  Standalone Edition
echo ======================================
echo.
echo Based on research of 19+ multi-instance projects
echo Key techniques: MultiBloxy, UWP cloning, Registry mods
echo.
echo Starting server...
node server.js
echo.
echo Press any key to exit...
pause >nul
`;

const unixLauncher = `#!/bin/bash
clear
echo "======================================"
echo " Roblox Multi-Instance Manager"
echo " Standalone Edition"
echo "======================================"
echo ""
echo "Based on research of 19+ multi-instance projects"
echo "Key techniques: MultiBloxy, UWP cloning, Registry mods"
echo ""
echo "Starting server..."
node server.js
echo ""
echo "Press Enter to exit..."
read
`;

fs.writeFileSync(path.join(portableDir, 'START_WINDOWS.bat'), windowsLauncher);
fs.writeFileSync(path.join(portableDir, 'START_UNIX.sh'), unixLauncher);

// Make Unix launcher executable
try {
  fs.chmodSync(path.join(portableDir, 'START_UNIX.sh'), 0o755);
} catch (e) {
  console.warn('Could not make Unix launcher executable');
}

// Create comprehensive README for releases
const releaseReadme = `# Roblox Multi-Instance Manager - Release Package

## 🎮 What This Does

This is a **real, working multi-instance system** for Roblox that uses proven techniques from 19+ researched projects including:

- **MultiBloxy** by Zgoly (C# mutex bypass)
- **MultiRoblox** by Dashbloxx (C implementation)  
- **UWP Multi-Platform** (Package cloning technique)
- **Working AutoHotkey scripts** for multi-client management

## 🚀 Quick Start

### Windows Users
1. Download the portable package
2. Double-click \`START_WINDOWS.bat\`
3. Browser opens automatically to http://localhost:3000
4. Start launching multiple Roblox instances!

### Mac/Linux Users  
1. Download the portable package
2. Open terminal in the folder
3. Run: \`./START_UNIX.sh\`
4. Open browser to http://localhost:3000

## 🔧 How It Works

### Core Multi-Instance Technique
Uses the **ROBLOX_singletonEvent mutex bypass** technique:

1. **Mutex Creation**: Creates \`ROBLOX_singletonEvent\` mutex before Roblox does
2. **Registry Modification**: Modifies Windows registry for multi-client support
3. **Process Spawning**: Launches multiple \`RobloxPlayerBeta.exe\` processes  
4. **UWP Cloning**: Creates cloned UWP packages with unique identities

### Supported Methods
- **Direct Execution**: Spawns RobloxPlayerBeta.exe directly
- **Protocol Handler**: Uses roblox-player: protocol
- **UWP Shell**: Clones and registers UWP packages
- **PowerShell**: Advanced Windows-specific launching

## 🎯 Features

- **Real Multi-Instance**: Actually launches multiple Roblox processes
- **Account Management**: Support for .ROBLOSECURITY cookies
- **Game URL Support**: Direct game joining with place IDs
- **Resource Monitoring**: CPU, memory, and process tracking
- **Cross-Platform**: Works on Windows, Mac, and Linux (Windows for full functionality)

## 🔬 Technical Details

### Anti-Detection Methods
Based on analysis of 19+ projects:
- Mutex management for singleton bypass
- Process isolation techniques  
- Registry modification (Windows)
- UWP package cloning with unique identities

### Architecture
- **Frontend**: Modern web interface with real-time updates
- **Backend**: Node.js server with Express
- **Engine**: Custom multi-instance engine based on research
- **Platform**: Cross-platform with Windows optimizations

## 🛠️ Troubleshooting

### Common Issues
1. **"No Roblox installation found"**: Install Roblox from official website
2. **"Permission denied"**: Run as administrator on Windows
3. **"Port 3000 already in use"**: Change PORT in server.js
4. **"Mutex creation failed"**: Restart application or system

### Debug Mode
Set \`DEBUG=true\` in server.js for detailed logging.

## 📁 Package Contents

### Portable Version
- \`server.js\` - Main server application
- \`real-multi-instance.js\` - Core multi-instance engine
- \`public/index.html\` - Web interface
- \`START_WINDOWS.bat\` - Windows launcher
- \`START_UNIX.sh\` - Mac/Linux launcher
- \`package.json\` - Dependencies

### Development Version
- Complete source code
- Documentation and implementation guides
- Research analysis from 19+ projects
- Build scripts and configuration

## 🎮 Usage Examples

### Launch Instance with Game URL
\`\`\`javascript
// Via web interface
Instance ID: "player1"
Game URL: "https://www.roblox.com/games/606849621/Jailbreak"
Launch Method: "Auto"
\`\`\`

### Quick Game Launch
Use the Quick Launch buttons for popular games:
- Jailbreak
- Prison Life  
- Build A Boat
- Roblox Home

### Authentication
Add .ROBLOSECURITY cookies for account authentication:
\`\`\`
Auth Cookie: "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_..."
\`\`\`

## 🔬 Research Sources

This implementation is based on comprehensive analysis of:
- MultiBloxy by Zgoly (ROBLOX_singletonEvent mutex)
- MultiRoblox by Dashbloxx (Simple C implementation)
- UWP_MultiPlatform (AppxManifest cloning)
- Flarial Launcher (Modern techniques)
- Working AutoHotkey scripts (Multi-client management)
- 14+ additional multi-instance projects

## 📜 License

MIT License - Based on open-source research and community contributions.

## ⚠️ Disclaimer

This tool is for educational and legitimate multi-account management purposes. Always follow Roblox's Terms of Service. Use responsibly.
`;

fs.writeFileSync(path.join(releaseDir, 'README.md'), releaseReadme);

// Create setup instructions
const setupInstructions = `# Setup Instructions - Roblox Multi-Instance Manager

## Prerequisites

### For Windows (Full Functionality)
- Windows 10/11 (required for UWP features)
- Roblox installed (automatically detected)
- Node.js 16+ (for running the server)
- PowerShell 5.1+ (for advanced features)

### For Mac/Linux (Limited Functionality)
- Node.js 16+ (for running the server)
- Modern web browser
- Demo mode only (no real Roblox instances)

## Installation Methods

### Method 1: Portable Package (Recommended)
1. Download \`roblox-multi-instance-portable.zip\`
2. Extract to desired location
3. Run appropriate launcher:
   - Windows: \`START_WINDOWS.bat\`
   - Mac/Linux: \`./START_UNIX.sh\`

### Method 2: Development Package
1. Download \`roblox-multi-instance-dev.zip\`
2. Extract to desired location
3. Install dependencies: \`npm install\`
4. Start server: \`npm start\`

## First Run

### Windows Setup
1. Run launcher as Administrator (recommended)
2. Allow firewall exceptions if prompted
3. Roblox will be automatically detected
4. Browser opens to http://localhost:3000

### Configuration
1. Launch first instance to test
2. Add game URLs for specific games
3. Configure authentication cookies if needed
4. Use Quick Launch for popular games

## Advanced Configuration

### Registry Modifications (Windows)
The system automatically applies registry modifications:
\`\`\`
HKEY_CURRENT_USER\\SOFTWARE\\Roblox Corporation\\Roblox
- MultipleRoblox = 1
- SingletonMutex = 0
\`\`\`

### UWP Package Cloning
For UWP Roblox installations:
1. Detects UWP Roblox automatically
2. Creates cloned packages with unique identities
3. Registers packages via PowerShell
4. Launches via shell protocol

### Mutex Management
Core technique from MultiBloxy research:
1. Creates \`ROBLOX_singletonEvent\` mutex
2. Prevents Roblox from blocking multiple instances
3. Maintains mutex throughout session

## Troubleshooting

### Common Issues

#### "No Roblox installation found"
**Solution**: Install Roblox from https://www.roblox.com/download

#### "Permission denied" or "Access denied"
**Solution**: Run as Administrator on Windows

#### "Port 3000 already in use"
**Solution**: Change PORT in server.js or kill other processes using port 3000

#### "Mutex creation failed"
**Solution**: 
1. Restart application
2. Restart computer
3. Run as Administrator

#### "PowerShell execution policy"
**Solution**: Run in Administrator PowerShell:
\`\`\`powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
\`\`\`

### Debug Mode
Enable detailed logging by setting \`DEBUG=true\` in server.js:
\`\`\`javascript
const DEBUG = true; // Change to true for debug mode
\`\`\`

### Log Files
Check these locations for logs:
- Windows: \`%APPDATA%\\Roblox\\logs\`
- Console output in terminal/command prompt

## Performance Optimization

### System Requirements
- **RAM**: 4GB minimum, 8GB recommended
- **CPU**: Multi-core processor recommended
- **Storage**: 1GB free space for instances

### Resource Management
- Monitor CPU/Memory usage per instance
- Limit concurrent instances based on system specs
- Close unused instances to free resources

## Security Considerations

### Authentication
- Never share .ROBLOSECURITY cookies
- Use separate cookies for each account
- Cookies are stored in memory only

### Process Isolation
- Each instance runs in separate process
- No shared memory between instances
- Clean shutdown prevents data corruption

## Support

### Getting Help
1. Check troubleshooting section
2. Review console logs for errors
3. Verify system requirements
4. Test with single instance first

### Known Limitations
- UWP features Windows-only
- Some games may detect multiple instances
- Performance depends on system specifications
- Requires Roblox to be installed locally

## Updates

### Updating the Application
1. Download latest release package
2. Replace old files with new ones
3. Restart application
4. Check for Roblox updates

### Staying Current
- Monitor Roblox client updates
- Check for compatibility issues
- Update Node.js as needed
`;

fs.writeFileSync(path.join(releaseDir, 'SETUP_INSTRUCTIONS.md'), setupInstructions);

console.log('✅ Development package created at:', devPackageDir);
console.log('✅ Portable package created at:', portableDir);
console.log('✅ Documentation created');
console.log('');
console.log('🎮 Ready for distribution!');
console.log('Both packages contain working multi-instance functionality based on proven techniques.');

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const files = fs.readdirSync(src);
    files.forEach(file => {
      copyRecursive(path.join(src, file), path.join(dest, file));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}