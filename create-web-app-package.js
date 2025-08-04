
const fs = require('fs');
const path = require('path');

console.log('🌐 Creating Clean Web Application Package...\n');

// Create clean package directory
const packageDir = path.join(__dirname, 'web-app-package');
const clientDir = path.join(packageDir, 'client');
const serverDir = path.join(packageDir, 'server');
const sharedDir = path.join(packageDir, 'shared');

// Clean and create directories
if (fs.existsSync(packageDir)) {
  fs.rmSync(packageDir, { recursive: true, force: true });
}

fs.mkdirSync(packageDir, { recursive: true });
fs.mkdirSync(clientDir, { recursive: true });
fs.mkdirSync(serverDir, { recursive: true });
fs.mkdirSync(sharedDir, { recursive: true });

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  
  if (fs.statSync(src).isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(item => {
      copyRecursive(path.join(src, item), path.join(dest, item));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Copy essential server files
const serverFiles = [
  'server/index.ts',
  'server/routes.ts',
  'server/storage.ts',
  'server/vite.ts',
  'server/enhanced-process-manager.ts',
  'server/uwp-instance-manager.ts',
  'server/account-sync-manager.ts',
  'server/roblox-process-detector.ts',
  'server/proven-multi-instance-manager.ts',
  'server/real-process-launcher.ts',
  'server/roblox-mutex-manager.ts',
  'server/roblox-registry-manager.ts',
  'server/process-manager.ts'
];

serverFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const destPath = path.join(packageDir, file);
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.copyFileSync(file, destPath);
  }
});

// Copy client files
if (fs.existsSync('client')) {
  copyRecursive('client', clientDir);
}

// Copy shared schema
if (fs.existsSync('shared/schema.ts')) {
  fs.copyFileSync('shared/schema.ts', path.join(sharedDir, 'schema.ts'));
}

// Copy essential config files
const configFiles = [
  'package.json',
  'tsconfig.json',
  'tailwind.config.ts',
  'postcss.config.js',
  'vite.config.ts',
  'components.json',
  'drizzle.config.ts'
];

configFiles.forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(packageDir, file));
  }
});

// Create clean package.json for the web app
const originalPackageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const webAppPackageJson = {
  name: "roblox-multi-instance-web-manager",
  version: "2.0.0",
  type: "module",
  description: "Web-based Roblox Multi-Instance Manager with Pet Simulator 99 integration",
  scripts: {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "NODE_ENV=production node dist/index.js",
    "check": "tsc"
  },
  dependencies: originalPackageJson.dependencies,
  devDependencies: originalPackageJson.devDependencies
};

fs.writeFileSync(
  path.join(packageDir, 'package.json'),
  JSON.stringify(webAppPackageJson, null, 2)
);

// Create README for the web app
const readme = `# Roblox Multi-Instance Web Manager

A comprehensive web-based application for managing multiple Roblox instances with advanced Pet Simulator 99 integration.

## Features

- **Multi-Instance Management**: Launch and control multiple Roblox instances
- **Pet Simulator 99 Integration**: Advanced automation and optimization tools
- **Account Management**: Secure account switching and synchronization
- **Process Monitoring**: Real-time monitoring of Roblox processes
- **UWP Support**: Enhanced Windows UWP application management
- **Web Interface**: Modern React-based user interface

## Quick Start

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Open your browser to \`http://localhost:5000\`

## Production Deployment

1. Build the application:
   \`\`\`bash
   npm run build
   \`\`\`

2. Start production server:
   \`\`\`bash
   npm start
   \`\`\`

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: SQLite with Drizzle ORM
- **Build Tool**: Vite
- **UI Components**: Radix UI primitives

## License

MIT License - See LICENSE file for details
`;

fs.writeFileSync(path.join(packageDir, 'README.md'), readme);

// Create deployment instructions
const deployInstructions = `# Deployment Instructions

## Local Development

1. \`npm install\`
2. \`npm run dev\`
3. Open \`http://localhost:5000\`

## Production Deployment

### Option 1: Node.js Server
1. \`npm install\`
2. \`npm run build\`
3. \`npm start\`

### Option 2: Replit Deployment
1. Upload all files to Replit
2. Configure run command: \`npm run dev\`
3. Deploy using Replit's deployment feature

## Environment Variables

No environment variables required for basic functionality.
Database files are created automatically in the application directory.

## Port Configuration

The application runs on port 5000 by default.
This is configured for Replit compatibility.
`;

fs.writeFileSync(path.join(packageDir, 'DEPLOYMENT.md'), deployInstructions);

console.log('✅ Clean web application package created successfully!');
console.log(`📁 Package location: ${packageDir}`);
console.log('');
console.log('📋 Package contents:');
console.log('   ├── client/          - React frontend application');
console.log('   ├── server/          - Express backend server');
console.log('   ├── shared/          - Shared TypeScript schemas');
console.log('   ├── package.json     - Clean dependencies');
console.log('   ├── README.md        - Setup instructions');
console.log('   └── DEPLOYMENT.md    - Deployment guide');
console.log('');
console.log('🚀 Ready for deployment to any Node.js hosting platform!');
