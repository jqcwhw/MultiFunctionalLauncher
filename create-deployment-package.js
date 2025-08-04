
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

async function createDeploymentPackage() {
  console.log('🚀 Creating comprehensive deployment package...');
  
  const packageDir = 'deployment-package';
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const packageName = `roblox-multi-instance-complete-${timestamp}`;
  const fullPackageDir = path.join(packageDir, packageName);
  
  // Ensure package directory exists
  if (!fs.existsSync(packageDir)) {
    fs.mkdirSync(packageDir, { recursive: true });
  }
  
  if (!fs.existsSync(fullPackageDir)) {
    fs.mkdirSync(fullPackageDir, { recursive: true });
  }

  // Copy core application files
  const coreDirs = [
    'client',
    'server', 
    'shared',
    'attached_assets',
    'roblox_resources'
  ];
  
  const coreFiles = [
    'package.json',
    'tsconfig.json',
    'vite.config.ts',
    'tailwind.config.ts',
    'postcss.config.js',
    'components.json',
    'drizzle.config.ts',
    'README.md',
    'SETUP_INSTRUCTIONS.md',
    'IMPLEMENTATION_GUIDE.md',
    'COMPREHENSIVE_LAUNCH_METHODS.md'
  ];

  // Copy directories
  for (const dir of coreDirs) {
    if (fs.existsSync(dir)) {
      await copyDirectory(dir, path.join(fullPackageDir, dir));
      console.log(`✅ Copied ${dir}/`);
    }
  }

  // Copy core files
  for (const file of coreFiles) {
    if (fs.existsSync(file)) {
      fs.copyFileSync(file, path.join(fullPackageDir, file));
      console.log(`✅ Copied ${file}`);
    }
  }

  // Create deployment-specific package.json
  const deployPackageJson = {
    "name": "roblox-multi-instance-manager",
    "version": "2.0.0",
    "description": "Complete Roblox Multi-Instance Manager with Pet Simulator 99 Integration",
    "main": "server/index.js",
    "scripts": {
      "install-deps": "npm install",
      "build": "npm run build:client && npm run build:server",
      "build:client": "vite build client",
      "build:server": "tsc -p server",
      "start": "node server/index.js",
      "dev": "concurrently \"npm run dev:client\" \"npm run dev:server\"",
      "dev:client": "vite client",
      "dev:server": "tsx watch server/index.ts",
      "deploy": "npm run build && npm start",
      "setup": "npm run install-deps && npm run build"
    },
    "dependencies": {
      "@tanstack/react-query": "^5.0.0",
      "express": "^4.18.0",
      "cors": "^2.8.5",
      "helmet": "^7.0.0",
      "compression": "^1.7.4",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "react-router-dom": "^6.8.0",
      "axios": "^1.6.0",
      "sqlite3": "^5.1.6",
      "drizzle-orm": "^0.29.0",
      "drizzle-kit": "^0.20.0",
      "@types/node": "^20.0.0",
      "typescript": "^5.0.0",
      "vite": "^5.0.0",
      "@vitejs/plugin-react": "^4.0.0",
      "tailwindcss": "^3.3.0",
      "lucide-react": "^0.263.0",
      "class-variance-authority": "^0.7.0",
      "clsx": "^2.0.0",
      "tailwind-merge": "^1.14.0"
    },
    "devDependencies": {
      "tsx": "^4.0.0",
      "concurrently": "^8.0.0",
      "@types/express": "^4.17.0",
      "@types/cors": "^2.8.0",
      "@types/compression": "^1.7.0"
    }
  };

  fs.writeFileSync(
    path.join(fullPackageDir, 'package.json'), 
    JSON.stringify(deployPackageJson, null, 2)
  );

  // Create deployment README
  const deployReadme = `# Roblox Multi-Instance Manager - Complete Package

## Pet Simulator 99 Integration Included
This package includes full Pet Simulator 99 API integration with:
- Real-time pet hatching with Big Games API
- Pet enhancement and optimization
- Boost scheduling and automation
- Complete macro management system

## Quick Setup

### Windows:
\`\`\`bash
# Install Node.js first from nodejs.org
npm run setup
npm run deploy
\`\`\`

### Linux/MacOS:
\`\`\`bash
# Install Node.js first
npm run setup
npm run deploy
\`\`\`

### Manual Setup:
1. Install dependencies: \`npm install\`
2. Build the application: \`npm run build\`
3. Start the server: \`npm start\`
4. Access at: http://localhost:5000

## Features Included:
✅ Multi-Instance Roblox Management
✅ Pet Simulator 99 API Integration
✅ UWP Instance Support
✅ Process Detection & Management
✅ Account Synchronization
✅ Real Pet Hatching System
✅ Performance Optimization
✅ Macro Recording & Playback
✅ Boost Scheduling
✅ Value Tracking

## API Configuration:
The app connects to:
- Big Games API: https://ps99.biggamesapi.io/
- Pet Data: https://biggamesapi.io/api/collection/pets
- Egg Data: https://biggamesapi.io/api/collection/eggs

## Support:
- Windows 10/11 (Full UWP Support)
- Linux (Demo Mode)
- MacOS (Demo Mode)

Enjoy your enhanced Roblox experience!
`;

  fs.writeFileSync(path.join(fullPackageDir, 'DEPLOYMENT_README.md'), deployReadme);

  // Create setup scripts
  const windowsSetup = `@echo off
echo Setting up Roblox Multi-Instance Manager...
echo.

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js not found! Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Installing dependencies...
call npm install

echo Building application...
call npm run build

echo Setup complete! 
echo.
echo To start the application, run: npm start
echo Then open your browser to: http://localhost:5000
echo.
pause
`;

  const unixSetup = `#!/bin/bash
echo "Setting up Roblox Multi-Instance Manager..."
echo

if ! command -v node &> /dev/null; then
    echo "Node.js not found! Please install Node.js first:"
    echo "  Ubuntu/Debian: sudo apt install nodejs npm"
    echo "  CentOS/RHEL: sudo yum install nodejs npm" 
    echo "  MacOS: brew install node"
    exit 1
fi

echo "Installing dependencies..."
npm install

echo "Building application..."
npm run build

echo "Setup complete!"
echo
echo "To start the application, run: npm start"
echo "Then open your browser to: http://localhost:5000"
echo
`;

  fs.writeFileSync(path.join(fullPackageDir, 'setup.bat'), windowsSetup);
  fs.writeFileSync(path.join(fullPackageDir, 'setup.sh'), unixSetup);
  
  // Make shell script executable
  try {
    fs.chmodSync(path.join(fullPackageDir, 'setup.sh'), '755');
  } catch (e) {
    console.log('Note: Could not set executable permissions on setup.sh');
  }

  // Create the ZIP archive
  const output = fs.createWriteStream(`${packageDir}/${packageName}.zip`);
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', () => {
    console.log(`📦 Package created: ${packageName}.zip (${archive.pointer()} bytes)`);
    console.log(`🎉 Complete deployment package ready for download!`);
    console.log(`   Location: ${packageDir}/${packageName}.zip`);
    console.log('');
    console.log('📋 Package includes:');
    console.log('   • Full web application with Pet Simulator 99 integration');
    console.log('   • Real hatching system with Big Games API');
    console.log('   • Complete macro and automation tools');
    console.log('   • Setup scripts for easy installation');
    console.log('   • All dependencies and assets');
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);
  archive.directory(fullPackageDir, false);
  archive.finalize();
}

async function copyDirectory(src, dest) {
  await fs.promises.mkdir(dest, { recursive: true });
  let entries = await fs.promises.readdir(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      await fs.promises.copyFile(srcPath, destPath);
    }
  }
}

createDeploymentPackage().catch(console.error);
