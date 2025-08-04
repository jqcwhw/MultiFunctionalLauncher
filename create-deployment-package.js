
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Creating Comprehensive Deployment Package');
console.log('===============================================');

const deploymentDir = path.join(__dirname, 'deployment-package');
const distDir = path.join(deploymentDir, 'dist');

// Clean and create deployment directory
if (fs.existsSync(deploymentDir)) {
  fs.rmSync(deploymentDir, { recursive: true, force: true });
}
fs.mkdirSync(deploymentDir, { recursive: true });
fs.mkdirSync(distDir, { recursive: true });

console.log('📦 Building production application...');

// Build the application
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Application built successfully');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Copy essential files
const filesToCopy = [
  'dist/',
  'server/',
  'shared/',
  'package.json',
  'package-lock.json',
  'README.md',
  'SETUP_INSTRUCTIONS.md',
  'IMPLEMENTATION_GUIDE.md',
  'COMPREHENSIVE_LAUNCH_METHODS.md',
  'drizzle.config.ts',
  'tsconfig.json'
];

console.log('📁 Copying application files...');

filesToCopy.forEach(file => {
  const srcPath = path.join(__dirname, file);
  const destPath = path.join(deploymentDir, file);
  
  if (fs.existsSync(srcPath)) {
    if (fs.statSync(srcPath).isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
    console.log(`  ✓ Copied ${file}`);
  }
});

// Copy attached assets
const attachedAssetsDir = path.join(__dirname, 'attached_assets');
if (fs.existsSync(attachedAssetsDir)) {
  const destAssetsDir = path.join(deploymentDir, 'attached_assets');
  copyRecursive(attachedAssetsDir, destAssetsDir);
  console.log('  ✓ Copied attached_assets');
}

// Copy roblox resources
const robloxResourcesDir = path.join(__dirname, 'roblox_resources');
if (fs.existsSync(robloxResourcesDir)) {
  const destResourcesDir = path.join(deploymentDir, 'roblox_resources');
  copyRecursive(robloxResourcesDir, destResourcesDir);
  console.log('  ✓ Copied roblox_resources');
}

// Create deployment-specific package.json
const deploymentPackageJson = {
  "name": "roblox-multi-instance-manager-deployment",
  "version": "1.0.0",
  "description": "Roblox Multi-Instance Manager - Production Deployment",
  "main": "server/index.js",
  "type": "module",
  "scripts": {
    "start": "NODE_ENV=production node server/index.js",
    "start:dev": "NODE_ENV=development tsx server/index.ts",
    "postinstall": "npm run build:server",
    "build:server": "esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=server-dist",
    "deploy": "npm install && npm run build:server && npm start"
  },
  "dependencies": {
    "@neondatabase/serverless": "^0.10.4",
    "connect-pg-simple": "^10.0.0",
    "drizzle-orm": "^0.39.1",
    "express": "^4.21.2",
    "express-session": "^1.18.1",
    "memorystore": "^1.6.7",
    "multer": "^2.0.1",
    "ws": "^8.18.0",
    "xml2js": "^0.6.2",
    "yauzl": "^3.2.0",
    "zod": "^3.24.2",
    "uuid": "^11.1.0"
  },
  "devDependencies": {
    "@types/express": "4.17.21",
    "@types/node": "20.16.11",
    "@types/ws": "^8.5.13",
    "esbuild": "^0.25.0",
    "tsx": "^4.19.1",
    "typescript": "5.6.3"
  },
  "engines": {
    "node": ">=18.0.0"
  }
};

fs.writeFileSync(
  path.join(deploymentDir, 'package.json'),
  JSON.stringify(deploymentPackageJson, null, 2)
);

// Create deployment start script
const startScript = `#!/bin/bash
echo "🚀 Starting Roblox Multi-Instance Manager"
echo "======================================="

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build server if needed
if [ ! -d "server-dist" ]; then
    echo "🔨 Building server..."
    npm run build:server
fi

# Start the application
echo "🌐 Starting web server..."
NODE_ENV=production node server/index.js
`;

fs.writeFileSync(path.join(deploymentDir, 'start.sh'), startScript);
fs.chmodSync(path.join(deploymentDir, 'start.sh'), 0o755);

// Create Windows batch file
const startBat = `@echo off
title Roblox Multi-Instance Manager
echo.
echo =======================================
echo  Roblox Multi-Instance Manager
echo  Production Deployment
echo =======================================
echo.

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
)

REM Build server if needed
if not exist "server-dist" (
    echo 🔨 Building server...
    npm run build:server
)

REM Start the application
echo 🌐 Starting web server...
set NODE_ENV=production
node server/index.js

pause
`;

fs.writeFileSync(path.join(deploymentDir, 'start.bat'), startBat);

// Create deployment README
const deploymentReadme = `# Roblox Multi-Instance Manager - Deployment Package

## 🚀 Quick Deployment

### Prerequisites
- Node.js 18+ installed
- Windows/Linux/macOS support

### Installation & Launch

**Option 1: Automatic Setup (Recommended)**
1. Extract this package to your desired location
2. Run the appropriate launcher:
   - Windows: Double-click \`start.bat\`
   - Linux/Mac: Run \`./start.sh\`

**Option 2: Manual Setup**
1. Open terminal in this directory
2. Run: \`npm install\`
3. Run: \`npm run build:server\`
4. Run: \`npm start\`

The application will be available at: http://localhost:5000

## 🌐 Web Deployment (Replit/Cloud)

1. Upload this entire package to your hosting platform
2. Set the start command to: \`npm run deploy\`
3. Ensure port 5000 is accessible

## 📁 Package Contents

- \`dist/\` - Built frontend application
- \`server/\` - Backend server code
- \`shared/\` - Shared TypeScript definitions
- \`attached_assets/\` - Supporting assets and resources
- \`roblox_resources/\` - Roblox-specific tools and data
- Documentation files

## 🔧 Configuration

The application automatically detects the environment and configures itself appropriately:
- Windows: Full multi-instance functionality
- Linux/Mac: Demo mode with simulated features

## 🛠️ Troubleshooting

- **Port conflicts**: The app tries ports 5000, 5001, 5002 automatically
- **Permission issues**: Run as administrator on Windows
- **Missing dependencies**: Run \`npm install\` manually

## 📞 Support

Check the included documentation files for detailed setup instructions and troubleshooting guides.
`;

fs.writeFileSync(path.join(deploymentDir, 'README.md'), deploymentReadme);

console.log('📝 Creating deployment configuration...');

// Create .replit file for Replit deployment
const replitConfig = `modules = ["nodejs-20"]
run = "npm run deploy"

[deployment]
run = ["sh", "-c", "npm run deploy"]

[[ports]]
localPort = 5000
externalPort = 80
`;

fs.writeFileSync(path.join(deploymentDir, '.replit'), replitConfig);

// Create environment template
const envTemplate = `# Roblox Multi-Instance Manager - Environment Configuration

# Database (Optional - uses in-memory by default)
# DATABASE_URL=your_database_connection_string

# Server Configuration
NODE_ENV=production
PORT=5000

# Session Security (Optional - generates random by default)
# SESSION_SECRET=your_secret_key

# Feature Flags
ENABLE_DEMO_MODE=auto
ENABLE_WINDOWS_FEATURES=auto
`;

fs.writeFileSync(path.join(deploymentDir, '.env.example'), envTemplate);

console.log('✅ Deployment package created successfully!');
console.log('');
console.log('📦 Package location:', deploymentDir);
console.log('');
console.log('🚀 To deploy:');
console.log('1. Copy the entire "deployment-package" folder to your target system');
console.log('2. Run start.bat (Windows) or ./start.sh (Linux/Mac)');
console.log('3. Access the application at http://localhost:5000');
console.log('');
console.log('🌐 For Replit deployment:');
console.log('1. Upload the deployment-package contents to a new Repl');
console.log('2. The application will start automatically');

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
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(src, dest);
  }
}
