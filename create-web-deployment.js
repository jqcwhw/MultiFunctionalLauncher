
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🌐 Creating Web-Only Deployment Package...\n');

// Create deployment directory
const deployDir = path.join(__dirname, 'web-deployment');
if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true, force: true });
}
fs.mkdirSync(deployDir, { recursive: true });

// Essential web app files to copy
const filesToCopy = [
  // Root configuration files
  'package.json',
  'tsconfig.json',
  'vite.config.ts',
  'tailwind.config.ts',
  'postcss.config.js',
  'components.json',
  '.gitignore',
  
  // Client application
  'client/',
  
  // Server files
  'server/',
  
  // Shared schema
  'shared/',
  
  // Documentation
  'README.md',
  'SETUP_INSTRUCTIONS.md'
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
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Copy essential files
console.log('📋 Copying essential web application files...\n');
filesToCopy.forEach(file => {
  copyPath(file, file);
});

// Create web-specific package.json
const originalPackage = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const webPackageJson = {
  "name": "roblox-multi-instance-manager-web",
  "version": "1.0.0",
  "type": "module",
  "description": "Advanced Roblox Multi-Instance Manager - Web Application",
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "NODE_ENV=production node dist/index.js",
    "check": "tsc"
  },
  "dependencies": originalPackage.dependencies,
  "devDependencies": originalPackage.devDependencies,
  "keywords": ["roblox", "multi-instance", "manager", "web-app", "automation"],
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/roblox-multi-instance-manager.git"
  },
  "engines": {
    "node": ">=18.0.0"
  }
};

fs.writeFileSync(
  path.join(deployDir, 'package.json'),
  JSON.stringify(webPackageJson, null, 2)
);

// Create deployment README
const deploymentReadme = `# Roblox Multi-Instance Manager - Web Application

A comprehensive web-based multi-instance manager for Roblox with advanced automation features.

## Features

- 🚀 **Multi-Instance Management**: Launch and manage multiple Roblox instances
- 🎮 **Pet Simulator 99 Integration**: Advanced automation and enhancement tools
- 📊 **Performance Monitoring**: Real-time FPS and resource tracking
- 🔄 **Account Synchronization**: Manage multiple accounts seamlessly
- 🛡️ **Mutex Management**: Advanced anti-detection and process isolation
- 📈 **Enhancement Tools**: Pet optimization, value tracking, and macro management

## Quick Start

### Local Development
\`\`\`bash
npm install
npm run dev
\`\`\`

### Production Build
\`\`\`bash
npm install
npm run build
npm start
\`\`\`

### Environment Variables
Create a \`.env\` file with:
\`\`\`
NODE_ENV=production
PORT=5000
\`\`\`

## Deployment

### Replit Deployment
1. Fork this repository on Replit
2. Run \`npm install\`
3. Click the "Run" button
4. Your app will be available at the provided URL

### Other Platforms
This application can be deployed on any Node.js hosting platform:
- Vercel
- Netlify
- Heroku
- Railway
- DigitalOcean App Platform

## Project Structure

\`\`\`
├── client/          # React frontend application
├── server/          # Express.js backend server
├── shared/          # Shared TypeScript schemas
├── package.json     # Dependencies and scripts
└── README.md        # This file
\`\`\`

## Usage

1. **Dashboard**: Overview of all instances and system status
2. **Instances**: Launch and manage Roblox instances
3. **PS99 Tools**: Pet Simulator 99 specific automation features
4. **Accounts**: Manage multiple Roblox accounts
5. **Settings**: Configure application preferences

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please open an issue on GitHub.
`;

fs.writeFileSync(path.join(deployDir, 'README.md'), deploymentReadme);

// Create .gitignore for the deployment
const gitignore = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
dist/
build/
*.tsbuildinfo

# Environment variables
.env
.env.local
.env.production
.env.development

# Cache directories
.cache/
.parcel-cache/

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# IDE files
.vscode/
.idea/
*.swp
*.swo

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# Temp directories
tmp/
temp/
`;

fs.writeFileSync(path.join(deployDir, '.gitignore'), gitignore);

// Create startup scripts
const startScript = `#!/bin/bash
echo "🚀 Starting Roblox Multi-Instance Manager..."
echo "📦 Installing dependencies..."
npm install

echo "🔧 Building application..."
npm run build

echo "🌐 Starting server..."
npm start
`;

fs.writeFileSync(path.join(deployDir, 'start.sh'), startScript);
fs.chmodSync(path.join(deployDir, 'start.sh'), '755');

const startBat = `@echo off
echo 🚀 Starting Roblox Multi-Instance Manager...
echo 📦 Installing dependencies...
npm install

echo 🔧 Building application...
npm run build

echo 🌐 Starting server...
npm start
pause
`;

fs.writeFileSync(path.join(deployDir, 'start.bat'), startBat);

console.log('\n✅ Web deployment package created successfully!');
console.log(`📁 Location: ${deployDir}`);
console.log('\n📋 Package contents:');
console.log('   • Web application source code (client/ and server/)');
console.log('   • Configuration files (package.json, tsconfig.json, etc.)');
console.log('   • Deployment scripts (start.sh, start.bat)');
console.log('   • Documentation (README.md)');
console.log('\n🚀 Next steps:');
console.log('   1. Copy the web-deployment folder to your GitHub repository');
console.log('   2. Commit and push to GitHub');
console.log('   3. Deploy on your preferred platform (Replit, Vercel, etc.)');
console.log('\n🔗 For Replit deployment: Import from GitHub URL in Replit');
