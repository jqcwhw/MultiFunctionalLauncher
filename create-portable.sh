#!/bin/bash

echo "🚀 Creating Portable Roblox Multi-Instance Manager..."
echo ""

# Create portable directory
PORTABLE_DIR="portable-roblox-manager"
rm -rf "$PORTABLE_DIR"
mkdir -p "$PORTABLE_DIR"

echo "📦 Building client..."
npm run build:client || {
    echo "❌ Client build failed"
    exit 1
}

echo "🔧 Building server..."
mkdir -p server-dist
npx esbuild server/index.ts --bundle --platform=node --outfile=server-dist/index.js --external:@neondatabase/serverless || {
    echo "❌ Server build failed"
    exit 1
}

echo "📁 Copying files..."
# Copy built client
cp -r dist "$PORTABLE_DIR/"

# Copy server build
cp -r server-dist "$PORTABLE_DIR/"

# Copy launcher
cp portable-launcher.js "$PORTABLE_DIR/"

# Create package.json for portable version
cat > "$PORTABLE_DIR/package.json" << 'EOF'
{
  "name": "roblox-multi-instance-portable",
  "version": "1.0.0",
  "description": "Portable Roblox Multi-Instance Manager",
  "main": "portable-launcher.js",
  "scripts": {
    "start": "node portable-launcher.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "bin": {
    "roblox-manager": "./portable-launcher.js"
  }
}
EOF

# Create Windows launcher
cat > "$PORTABLE_DIR/start.bat" << 'EOF'
@echo off
title Roblox Multi-Instance Manager
echo 🚀 Starting Roblox Multi-Instance Manager...
echo.

REM Check if Node.js is available
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js found, starting application...
echo.

REM Start the application
node portable-launcher.js

echo.
echo Application has stopped.
pause
EOF

# Create Unix launcher
cat > "$PORTABLE_DIR/start.sh" << 'EOF'
#!/bin/bash
echo "🚀 Starting Roblox Multi-Instance Manager..."
echo ""

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ ERROR: Node.js is not installed or not in PATH"
    echo "Please install Node.js from https://nodejs.org/"
    echo ""
    read -p "Press any key to continue..."
    exit 1
fi

echo "✅ Node.js found, starting application..."
echo ""

# Start the application
node portable-launcher.js

echo ""
echo "Application has stopped."
read -p "Press any key to continue..."
EOF

# Make shell script executable
chmod +x "$PORTABLE_DIR/start.sh"

# Create README
cat > "$PORTABLE_DIR/README.md" << 'EOF'
# Roblox Multi-Instance Manager - Portable

## 🚀 Quick Start

### Windows
1. Double-click `start.bat` to launch the application
2. The application will automatically open in your browser
3. If Windows Security asks, allow the application to run

### Linux/Mac
1. Open terminal in this directory
2. Run: `./start.sh`
3. Or run directly: `node portable-launcher.js`

## 📋 Requirements

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **Operating System**: Windows 10/11, macOS 10.15+, or modern Linux
- **Browser**: Chrome, Firefox, Safari, or Edge
- **For full functionality**: Windows (some features are Windows-specific)

## ✨ Features

- ✅ **Multi-instance Management**: Run multiple Roblox instances simultaneously
- ✅ **Account Synchronization**: Mirror actions across instances
- ✅ **UWP Instance Control**: Advanced Windows UWP integration
- ✅ **Enhanced Process Management**: Resource monitoring and limits
- ✅ **Anti-detection Measures**: Bypass Roblox multi-instance restrictions (Windows)
- ✅ **Cross-platform**: Works on Windows, macOS, and Linux
- ✅ **Portable**: No installation required - just extract and run!

## 🔧 Troubleshooting

### Application won't start
1. **Check Node.js**: Run `node --version` in terminal/command prompt
2. **Install Node.js**: Download from [nodejs.org](https://nodejs.org/)
3. **Check files**: Ensure all files are present in the directory

### Port already in use
- The application automatically finds an available port
- It will try ports 3000, 3001, 3002, etc.

### Windows-specific features not working
- **Run as Administrator** for full registry access
- Some features require Windows platform and may not work on other systems

### Browser doesn't open automatically
- Manually open your browser and go to the URL shown in the console
- Usually: `http://localhost:3000`

## 🌐 Usage

1. **Launch the application** using the appropriate launcher for your system
2. **Open your browser** to the URL shown (auto-opens if possible)
3. **Configure accounts** in the Accounts section
4. **Launch instances** using the UWP or Enhanced System pages
5. **Monitor processes** and resource usage in real-time

## 🔒 Security

- **Local only**: The server runs only on your computer (localhost)
- **No external access**: Only accessible from your machine
- **No data collection**: All data stays on your device
- **Open source**: You can inspect the code

## 📞 Support

This is a portable standalone version that requires no installation.
Just extract the files and run the launcher script for your platform.

For Windows users: Full anti-detection and multi-instance features available.
For Mac/Linux users: Basic multi-instance management with limited Windows-specific features.

---

**Note**: This application is designed for legitimate use cases such as game development,
testing, and educational purposes. Please respect Roblox's Terms of Service.
EOF

echo "✅ Portable build completed successfully!"
echo ""
echo "📦 Portable application created in: $PORTABLE_DIR"
echo ""
echo "🚀 To use:"
echo "  Windows: Run start.bat"
echo "  Linux/Mac: Run ./start.sh"
echo "  Direct: node portable-launcher.js"
echo ""
echo "📋 Package contents:"
echo "  ✅ Complete web interface"
echo "  ✅ Multi-instance management"
echo "  ✅ Account synchronization"
echo "  ✅ Cross-platform compatibility"
echo "  ✅ No installation required"
echo "  ✅ Auto-opens in browser"
echo ""
echo "🎯 Ready to distribute or use!"