#!/bin/bash
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
