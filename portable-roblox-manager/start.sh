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