# Enhanced Roblox Multi-Instance Manager - Standalone Edition

## Features
- Launch multiple Roblox instances simultaneously
- Real-time FPS monitoring and optimization
- RAM usage tracking and automatic cleanup
- Performance statistics dashboard
- Cross-platform compatibility (Windows, Mac, Linux)
- Anti-detection techniques for seamless multi-instance support

## Quick Start

### Windows:
1. Double-click `standalone-batch-launcher.bat`
2. Wait for the server to start
3. Open http://localhost:5000 in your browser

### Mac/Linux:
1. Open terminal in this directory
2. Run: `npm install` (first time only)
3. Run: `node standalone-manager/server.js`
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
