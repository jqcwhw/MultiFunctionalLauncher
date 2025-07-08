# Roblox Multi-Instance Manager - Release Package

## 🎮 What This Does

This is a **real, working multi-instance system** for Roblox that uses proven techniques from 19+ researched projects including:

- **MultiBloxy** by Zgoly (C# mutex bypass)
- **MultiRoblox** by Dashbloxx (C implementation)  
- **UWP Multi-Platform** (Package cloning technique)
- **Working AutoHotkey scripts** for multi-client management

## 🚀 Quick Start

### Windows Users
1. Download the portable package
2. Double-click `START_WINDOWS.bat`
3. Browser opens automatically to http://localhost:3000
4. Start launching multiple Roblox instances!

### Mac/Linux Users  
1. Download the portable package
2. Open terminal in the folder
3. Run: `./START_UNIX.sh`
4. Open browser to http://localhost:3000

## 🔧 How It Works

### Core Multi-Instance Technique
Uses the **ROBLOX_singletonEvent mutex bypass** technique:

1. **Mutex Creation**: Creates `ROBLOX_singletonEvent` mutex before Roblox does
2. **Registry Modification**: Modifies Windows registry for multi-client support
3. **Process Spawning**: Launches multiple `RobloxPlayerBeta.exe` processes  
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
Set `DEBUG=true` in server.js for detailed logging.

## 📁 Package Contents

### Portable Version
- `server.js` - Main server application
- `real-multi-instance.js` - Core multi-instance engine
- `public/index.html` - Web interface
- `START_WINDOWS.bat` - Windows launcher
- `START_UNIX.sh` - Mac/Linux launcher
- `package.json` - Dependencies

### Development Version
- Complete source code
- Documentation and implementation guides
- Research analysis from 19+ projects
- Build scripts and configuration

## 🎮 Usage Examples

### Launch Instance with Game URL
```javascript
// Via web interface
Instance ID: "player1"
Game URL: "https://www.roblox.com/games/606849621/Jailbreak"
Launch Method: "Auto"
```

### Quick Game Launch
Use the Quick Launch buttons for popular games:
- Jailbreak
- Prison Life  
- Build A Boat
- Roblox Home

### Authentication
Add .ROBLOSECURITY cookies for account authentication:
```
Auth Cookie: "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_..."
```

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
