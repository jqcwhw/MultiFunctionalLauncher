# Roblox Multi-Instance Manager - Setup Instructions

## 📦 Package Contents

This package contains two versions of the Roblox Multi-Instance Manager:

1. **Portable Version** - Standalone, no installation required
2. **Electron Desktop App** - Native desktop application

## 🚀 Quick Start Guide

### Option 1: Portable Version (Recommended)

**For Windows:**
1. Extract the zip file to any folder
2. Navigate to the `portable-roblox-manager` folder
3. Double-click `start.bat`
4. The application will open in your browser automatically

**For Mac/Linux:**
1. Extract the zip file to any folder
2. Open terminal in the `portable-roblox-manager` folder
3. Run: `./start.sh`
4. The application will open in your browser automatically

### Option 2: Electron Desktop App

1. Extract the zip file
2. Run the installer for your platform:
   - Windows: `RobloxManager-Setup.exe`
   - Mac: `RobloxManager.dmg`
   - Linux: `RobloxManager.AppImage`

## 📋 System Requirements

### Minimum Requirements
- **Operating System**: Windows 10/11, macOS 10.15+, or modern Linux
- **Node.js**: Version 16 or higher ([Download here](https://nodejs.org/))
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB free space
- **Internet**: Broadband connection for Roblox connectivity

### For Full Windows Features
- **Windows 10/11** (some features require Windows)
- **Administrator privileges** (for registry and mutex operations)
- **Roblox UWP app** installed from Microsoft Store

## 🔧 Detailed Setup Instructions

### Step 1: Install Node.js (Portable Version Only)

1. Download Node.js from [https://nodejs.org/](https://nodejs.org/)
2. Choose the "LTS" (Long Term Support) version
3. Run the installer and follow the setup wizard
4. Verify installation by opening terminal/command prompt and typing:
   ```bash
   node --version
   ```
   You should see a version number like `v18.17.0`

### Step 2: Extract the Package

1. **Download** the zip file
2. **Right-click** and select "Extract All" (Windows) or double-click (Mac/Linux)
3. **Choose a location** like Desktop or Documents folder
4. **Navigate** to the extracted folder

### Step 3: Launch the Application

#### Windows Users (Portable)
1. Open the `portable-roblox-manager` folder
2. Double-click `start.bat`
3. If Windows Security asks, click "Allow" or "Run anyway"
4. Wait for the browser to open automatically

#### Mac/Linux Users (Portable)
1. Open Terminal
2. Navigate to the extracted folder:
   ```bash
   cd /path/to/portable-roblox-manager
   ```
3. Make the script executable (first time only):
   ```bash
   chmod +x start.sh
   ```
4. Run the launcher:
   ```bash
   ./start.sh
   ```

#### All Platforms (Electron)
1. Run the installer for your platform
2. Follow the installation wizard
3. Launch from Start Menu (Windows), Applications (Mac), or desktop shortcut

## 🌐 First-Time Setup

### 1. Access the Interface
- The application will automatically open at `http://localhost:3000`
- If it doesn't open automatically, manually open your browser and go to that address

### 2. Configure Accounts
1. Click on **"Accounts"** in the sidebar
2. Click **"Add Account"** 
3. Enter account details:
   - **Username**: Your Roblox username
   - **Roblosecurity Token** (optional): For automatic login
   - **Notes**: Any additional information

### 3. Set Up Multi-Instance Features (Windows Only)
1. Go to **"Enhanced System"** page
2. Click **"Enable Protection"** to activate mutex bypass
3. This allows multiple Roblox instances to run simultaneously

### 4. Launch Your First Instance
1. Go to **"UWP Instances"** (Windows) or **"Legacy Instances"** (other platforms)
2. Click **"Launch Instance"**
3. Configure settings:
   - **Instance Name**: Choose a unique name
   - **Account**: Select from configured accounts
   - **Game URL** (optional): Direct link to a specific game

## 🛠️ Troubleshooting

### Common Issues

#### "Node.js not found" Error
**Problem**: Node.js is not installed or not in system PATH
**Solution**:
1. Download and install Node.js from [nodejs.org](https://nodejs.org/)
2. Restart your computer after installation
3. Try running the application again

#### "Port already in use" Error
**Problem**: Another application is using port 3000
**Solution**: The application will automatically try ports 3001, 3002, etc. No action needed.

#### Application won't start on Windows
**Problem**: Windows Security is blocking the application
**Solution**:
1. Right-click `start.bat` and select "Run as administrator"
2. When Windows asks, click "Allow" or add an exception
3. Consider adding the folder to Windows Defender exclusions

#### Browser doesn't open automatically
**Problem**: System couldn't auto-launch browser
**Solution**:
1. Look for the URL in the console output (usually `http://localhost:3000`)
2. Manually open your browser and navigate to that address

#### Features not working on Mac/Linux
**Problem**: Some features are Windows-specific
**Solution**:
- Mutex bypass and registry modifications only work on Windows
- Basic multi-instance features still available on all platforms
- Consider running on Windows for full functionality

### Windows-Specific Setup

#### Enable Developer Mode (Optional)
For advanced UWP features:
1. Open **Settings** > **Update & Security** > **For developers**
2. Select **"Developer mode"**
3. Restart the application

#### Run as Administrator
For full registry and mutex access:
1. Right-click `start.bat`
2. Select **"Run as administrator"**
3. Click **"Yes"** when prompted

### Performance Optimization

#### System Resources
- **Close unnecessary programs** before launching multiple instances
- **Monitor CPU and memory usage** in the Enhanced System page
- **Adjust instance limits** based on your hardware capabilities

#### Network Optimization
- **Use wired internet** for better stability
- **Close bandwidth-heavy applications** (streaming, downloads)
- **Consider QoS settings** on your router for gaming traffic

## 🔐 Security & Privacy

### Data Storage
- **All data stays local** on your computer
- **No cloud synchronization** or external data transmission
- **Account tokens stored securely** in local files or registry

### Network Usage
- **Only connects to Roblox servers** for legitimate game traffic
- **No telemetry or analytics** sent to external servers
- **Local web server** only accessible from your computer

### Antivirus Considerations
Some antivirus software may flag the application due to:
- **Advanced system access** required for multi-instance features
- **Process manipulation** techniques for Roblox integration
- **Registry modifications** for instance isolation

**To resolve**:
1. Add the application folder to antivirus exclusions
2. Mark the executable as trusted/safe
3. Temporarily disable real-time protection during setup

## 🔄 Updates & Maintenance

### Checking for Updates
- Monitor the project repository for new releases
- Download updated packages and extract over existing installation
- Portable version: simply replace files
- Electron version: run new installer

### Backup Configuration
Your settings are stored in:
- **Windows**: `%APPDATA%/roblox-multi-manager/`
- **Mac**: `~/Library/Application Support/roblox-multi-manager/`
- **Linux**: `~/.config/roblox-multi-manager/`

### Uninstalling
- **Portable**: Simply delete the extracted folder
- **Electron**: Use system uninstaller (Add/Remove Programs on Windows)
- **Clean removal**: Also delete configuration folders mentioned above

## 📞 Support

### Getting Help
1. **Check this guide** for common solutions
2. **Review the Implementation Guide** for technical details
3. **Check system requirements** are met
4. **Try running as administrator** on Windows

### Reporting Issues
When reporting problems, include:
- **Operating system** and version
- **Node.js version** (`node --version`)
- **Error messages** (exact text)
- **Steps to reproduce** the issue

### Best Practices
- **Start with one instance** to test functionality
- **Gradually increase** the number of instances
- **Monitor system resources** to avoid overload
- **Use legitimate accounts** and respect Roblox ToS
- **Keep the application updated** for best compatibility

## ✅ Quick Checklist

Before contacting support, verify:
- [ ] Node.js is installed (version 16+)
- [ ] Extracted zip file completely
- [ ] Running appropriate launcher for your platform
- [ ] Browser can access localhost:3000
- [ ] Windows users: tried running as administrator
- [ ] Antivirus isn't blocking the application
- [ ] Have at least 4GB free RAM
- [ ] Internet connection is stable

---

**Ready to start?** Choose your platform launcher and begin managing multiple Roblox instances with advanced anti-detection features!