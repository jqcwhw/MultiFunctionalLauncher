
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

console.log('🚀 Creating Complete Deployment Package...\n');

// Create deployment directory
const deployDir = path.join(__dirname, 'complete-deployment-package');
if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true, force: true });
}
fs.mkdirSync(deployDir, { recursive: true });

// Essential application files
const essentialFiles = [
  // Core configuration
  'package.json',
  'tsconfig.json',
  'vite.config.ts',
  'tailwind.config.ts',
  'postcss.config.js',
  'components.json',
  'drizzle.config.ts',
  '.replit',
  
  // Client application
  'client/',
  
  // Server files
  'server/',
  
  // Shared code
  'shared/',
  
  // Static assets
  'ModdedRobloxClients/',
  'instance-configs/',
  'locales/',
  'portable-build/',
  'roblox_resources/',
  'attached_assets/',
  
  // Documentation
  'README.md',
  'SETUP_INSTRUCTIONS.md',
  'IMPLEMENTATION_GUIDE.md',
  'COMPREHENSIVE_LAUNCH_METHODS.md',
  'Windows-Fix-Instructions.md',
  'replit.md',
  
  // Standalone packages
  'standalone-manager/',
  'release-packages/',
  'web-app-package/',
  
  // Utility scripts
  'create-*.js',
  'build-*.js',
  'run-*.bat',
  'run-*.ps1',
  'start-*.sh',
  
  // Data files
  'dev-product-scanner-1.2.5/',
  'dev-product-scanner-main/',
  'rbxBinaryParser/',
  
  // Important asset files
  '*.md',
  '*.ts',
  '*.js',
  '*.json',
  '*.sql',
  '*.html',
  '*.css'
];

// Helper function to copy files/directories
function copyPath(src, dest) {
  const srcPath = path.join(__dirname, src);
  const destPath = path.join(deployDir, src);
  
  if (!fs.existsSync(srcPath)) {
    console.log(`⚠️  Skipping ${src} (not found)`);
    return;
  }
  
  if (fs.statSync(srcPath).isDirectory()) {
    copyDirectory(srcPath, destPath);
    console.log(`📁 Copied directory: ${src}`);
  } else {
    // Ensure destination directory exists
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    fs.copyFileSync(srcPath, destPath);
    console.log(`📄 Copied file: ${src}`);
  }
}

// Helper function to copy directories
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const items = fs.readdirSync(src);
  
  items.forEach(item => {
    // Skip node_modules and other build artifacts
    if (item === 'node_modules' || item === '.git' || item === 'dist' || item === 'server-dist') {
      return;
    }
    
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Copy all essential files
console.log('📋 Copying application files...\n');

// Copy specific files first
const specificFiles = [
  'package.json',
  'tsconfig.json',
  'vite.config.ts',
  'tailwind.config.ts',
  'postcss.config.js',
  'components.json',
  'drizzle.config.ts',
  '.replit',
  'README.md',
  'SETUP_INSTRUCTIONS.md',
  'IMPLEMENTATION_GUIDE.md',
  'replit.md'
];

specificFiles.forEach(file => {
  if (fs.existsSync(file)) {
    copyPath(file);
  }
});

// Copy directories
const directories = [
  'client',
  'server',
  'shared',
  'standalone-manager',
  'release-packages',
  'web-app-package',
  'instance-configs',
  'roblox_resources',
  'dev-product-scanner-1.2.5',
  'rbxBinaryParser'
];

directories.forEach(dir => {
  if (fs.existsSync(dir)) {
    copyPath(dir);
  }
});

// Copy utility scripts
const scriptPatterns = ['create-*.js', 'build-*.js', 'run-*.bat', 'run-*.ps1'];
const allFiles = fs.readdirSync(__dirname);

allFiles.forEach(file => {
  if (file.endsWith('.js') && (file.startsWith('create-') || file.startsWith('build-'))) {
    copyPath(file);
  }
  if (file.endsWith('.bat') && file.startsWith('run-')) {
    copyPath(file);
  }
  if (file.endsWith('.ps1') && file.startsWith('run-')) {
    copyPath(file);
  }
  if (file.endsWith('.sh') && file.startsWith('start-')) {
    copyPath(file);
  }
});

// Create deployment-specific package.json
const originalPackage = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const deploymentPackageJson = {
  "name": "roblox-multi-instance-manager",
  "version": "2.0.0",
  "type": "module",
  "description": "Advanced Roblox Multi-Instance Manager with Pet Simulator 99 Integration",
  "main": "server/index.ts",
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "NODE_ENV=production node dist/index.js",
    "check": "tsc",
    "db:push": "drizzle-kit push",
    "standalone": "node standalone-manager/server.js",
    "create-portable": "node create-portable.js",
    "create-web-package": "node create-web-app-package.js"
  },
  "dependencies": originalPackage.dependencies,
  "devDependencies": originalPackage.devDependencies,
  "keywords": [
    "roblox",
    "multi-instance",
    "pet-simulator-99",
    "automation",
    "gaming",
    "process-management"
  ],
  "author": "Roblox Multi-Instance Manager Team",
  "license": "MIT",
  "engines": {
    "node": ">=18.0.0"
  }
};

fs.writeFileSync(
  path.join(deployDir, 'package.json'),
  JSON.stringify(deploymentPackageJson, null, 2)
);

// Create deployment README
const deploymentReadme = `# Roblox Multi-Instance Manager - Complete Deployment Package

## 🚀 Quick Start

### For Replit Deployment (Recommended)
1. Upload this entire folder to a new Replit project
2. Run: \`npm install\`
3. Run: \`npm run dev\` for development or \`npm run build && npm start\` for production
4. Your app will be available at the provided Replit URL

### For Other Hosting Platforms
1. Upload all files to your hosting platform
2. Install dependencies: \`npm install\`
3. Build the application: \`npm run build\`
4. Start the server: \`npm start\`

## 📁 Package Contents

### Core Application
- \`client/\` - React frontend with TypeScript
- \`server/\` - Express.js backend with advanced process management
- \`shared/\` - Shared TypeScript schemas and utilities

### Advanced Features
- **Multi-Instance Management**: Launch multiple Roblox instances
- **Pet Simulator 99 Integration**: Real-time game data and automation
- **Process Detection**: Advanced Roblox process monitoring
- **Account Synchronization**: Secure multi-account management
- **UWP Support**: Windows Universal Platform integration
- **Mutex Management**: Anti-detection and process isolation

### Standalone Options
- \`standalone-manager/\` - Lightweight standalone version
- \`web-app-package/\` - Web-only deployment package
- \`release-packages/\` - Pre-built release versions

### Utilities & Resources
- \`roblox_resources/\` - Roblox development tools and scripts
- \`instance-configs/\` - Instance configuration files
- \`dev-product-scanner-*/\` - Product scanning utilities
- \`rbxBinaryParser/\` - Roblox binary file parser

## 🔧 Configuration

### Environment Variables
Create a \`.env\` file (optional):
\`\`\`
NODE_ENV=production
PORT=5000
\`\`\`

### Database
The application uses SQLite by default. Database files are created automatically.

## 🚀 Deployment Commands

\`\`\`bash
# Development
npm run dev

# Production build
npm run build
npm start

# Standalone version
npm run standalone

# Create portable package
npm run create-portable

# Create web package
npm run create-web-package
\`\`\`

## 📱 Available Interfaces

1. **Main Dashboard** - \`http://your-domain:5000\`
2. **PS99 Live Gameplay** - \`/ps99-live-gameplay\`
3. **Multi-Instance Manager** - \`/instances\`
4. **Account Management** - \`/accounts\`
5. **Performance Monitor** - \`/dashboard\`

## 🛠️ Technical Requirements

- Node.js 18.0.0 or higher
- Modern web browser
- Windows (for advanced Roblox integration)

## 📖 Documentation

- \`SETUP_INSTRUCTIONS.md\` - Detailed setup guide
- \`IMPLEMENTATION_GUIDE.md\` - Technical implementation details
- \`COMPREHENSIVE_LAUNCH_METHODS.md\` - Launch configuration options
- \`Windows-Fix-Instructions.md\` - Windows-specific troubleshooting

## 🔐 Security Features

- Process isolation and mutex management
- Secure account credential storage
- Anti-detection mechanisms
- Registry management for Windows

## 🎮 Game Integration

### Pet Simulator 99
- Real-time pet data tracking
- Automated hatching systems
- Value optimization algorithms
- Performance enhancement tools

### Roblox Platform
- Multi-account support
- Instance synchronization
- Process monitoring
- Memory optimization

## 🆘 Support

For issues or questions:
1. Check the documentation files included
2. Review the console logs
3. Ensure all dependencies are installed
4. Verify Node.js version compatibility

## 📄 License

MIT License - See individual files for specific licensing information.
`;

fs.writeFileSync(path.join(deployDir, 'README.md'), deploymentReadme);

// Create startup script for easy deployment
const startupScript = `#!/bin/bash
echo "🚀 Starting Roblox Multi-Instance Manager..."
echo "📦 Installing dependencies..."
npm install

echo "🔧 Building application..."
npm run build

echo "🌐 Starting server on port 5000..."
npm start
`;

fs.writeFileSync(path.join(deployDir, 'start.sh'), startupScript);
fs.chmodSync(path.join(deployDir, 'start.sh'), '755');

// Create Windows startup script
const windowsStartupScript = `@echo off
echo 🚀 Starting Roblox Multi-Instance Manager...
echo 📦 Installing dependencies...
call npm install

echo 🔧 Building application...
call npm run build

echo 🌐 Starting server on port 5000...
call npm start
pause
`;

fs.writeFileSync(path.join(deployDir, 'start.bat'), windowsStartupScript);

// Create .gitignore for the deployment package
const gitignore = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
dist/
build/
server-dist/
*.tsbuildinfo

# Environment variables
.env
.env.local
.env.production

# Database files
*.db
*.sqlite

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed

# Cache directories
.cache/
.parcel-cache/

# OS generated files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo

# Temporary files
tmp/
temp/
`;

fs.writeFileSync(path.join(deployDir, '.gitignore'), gitignore);

// Create ZIP archive
console.log('\n📦 Creating ZIP archive...');

const output = fs.createWriteStream('Roblox-Multi-Instance-Manager-Complete-Deployment.zip');
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`\n✅ Complete deployment package created successfully!`);
  console.log(`📁 Archive: Roblox-Multi-Instance-Manager-Complete-Deployment.zip`);
  console.log(`📊 Size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
  console.log('\n📋 Package includes:');
  console.log('   • Complete web application (client + server)');
  console.log('   • All Roblox integration tools');
  console.log('   • Pet Simulator 99 enhancement systems');
  console.log('   • Multi-instance management utilities');
  console.log('   • Standalone deployment options');
  console.log('   • Comprehensive documentation');
  console.log('   • Startup scripts for all platforms');
  console.log('\n🚀 Deployment ready!');
  console.log('   1. Extract the ZIP file');
  console.log('   2. Upload to your hosting platform (Replit recommended)');
  console.log('   3. Run: npm install && npm run build && npm start');
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);
archive.directory(deployDir, false);
archive.finalize();
