
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
  // Core server files
  { src: 'server/index.ts', dest: 'server/index.ts' },
  { src: 'server/routes.ts', dest: 'server/routes.ts' },
  { src: 'server/storage.ts', dest: 'server/storage.ts' },
  { src: 'server/vite.ts', dest: 'server/vite.ts' },
  { src: 'server/process-manager.ts', dest: 'server/process-manager.ts' },
  { src: 'server/roblox-process-detector.ts', dest: 'server/roblox-process-detector.ts' },
  { src: 'server/enhanced-process-manager.ts', dest: 'server/enhanced-process-manager.ts' },
  { src: 'server/account-sync-manager.ts', dest: 'server/account-sync-manager.ts' },
  
  // Client files
  { src: 'client', dest: 'client', isDirectory: true },
  
  // Shared schema
  { src: 'shared/schema.ts', dest: 'shared/schema.ts' },
  
  // Configuration files
  { src: 'package.json', dest: 'package.json' },
  { src: 'tsconfig.json', dest: 'tsconfig.json' },
  { src: 'tailwind.config.ts', dest: 'tailwind.config.ts' },
  { src: 'postcss.config.js', dest: 'postcss.config.js' },
  { src: 'components.json', dest: 'components.json' },
  { src: 'vite.config.ts', dest: 'vite.config.ts' },
  
  // Documentation
  { src: 'README.md', dest: 'README.md' },
  { src: 'SETUP_INSTRUCTIONS.md', dest: 'SETUP_INSTRUCTIONS.md' }
];

// Copy files and directories
filesToCopy.forEach(({ src, dest, isDirectory }) => {
  const srcPath = path.join(__dirname, src);
  const destPath = path.join(deployDir, dest);
  
  if (!fs.existsSync(srcPath)) {
    console.log(`⚠️  Warning: ${src} not found, skipping...`);
    return;
  }
  
  // Ensure destination directory exists
  const destDir = path.dirname(destPath);
  fs.mkdirSync(destDir, { recursive: true });
  
  if (isDirectory) {
    // Copy directory recursively
    copyDirectory(srcPath, destPath);
    console.log(`📁 Copied directory: ${src}`);
  } else {
    // Copy file
    fs.copyFileSync(srcPath, destPath);
    console.log(`📄 Copied file: ${src}`);
  }
});

// Create web-specific package.json
const webPackageJson = {
  "name": "roblox-multi-instance-web",
  "version": "1.0.0",
  "description": "Web-based Roblox Multi-Instance Manager",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "start": "node --loader ts-node/esm server/index.ts"
  },
  "dependencies": {
    "@radix-ui/react-accordion": "^1.1.2",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-avatar": "^1.0.4",
    "@radix-ui/react-checkbox": "^1.0.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-popover": "^1.0.7",
    "@radix-ui/react-progress": "^1.0.3",
    "@radix-ui/react-scroll-area": "^1.0.5",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-separator": "^1.0.3",
    "@radix-ui/react-slider": "^1.1.2",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-switch": "^1.0.3",
    "@radix-ui/react-tabs": "^1.0.4",
    "@radix-ui/react-toast": "^1.1.5",
    "@radix-ui/react-tooltip": "^1.0.7",
    "@tanstack/react-query": "^5.17.15",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "lucide-react": "^0.344.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.0",
    "tailwind-merge": "^2.2.1",
    "tailwindcss-animate": "^1.0.7",
    "ts-node": "^10.9.2",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/node": "^20.11.16",
    "@types/react": "^18.2.55",
    "@types/react-dom": "^18.2.19",
    "@typescript-eslint/eslint-plugin": "^6.21.0",
    "@typescript-eslint/parser": "^6.21.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.17",
    "eslint": "^8.56.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3",
    "vite": "^5.1.0"
  }
};

fs.writeFileSync(
  path.join(deployDir, 'package.json'),
  JSON.stringify(webPackageJson, null, 2)
);

// Create .gitignore
const gitignore = `# Dependencies
node_modules/
npm-debug.log*

# Build outputs
dist/
build/
*.tsbuildinfo

# Environment files
.env
.env.local
.env.production

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Logs
logs/
*.log

# Temporary files
tmp/
temp/

# Instance configs (user data)
instance-configs/
`;

fs.writeFileSync(path.join(deployDir, '.gitignore'), gitignore);

// Create deployment README
const deploymentReadme = `# Roblox Multi-Instance Web Manager

A web-based application for managing multiple Roblox instances with advanced features including Pet Simulator 99 integration, process monitoring, and account synchronization.

## Features

- 🎮 **Multi-Instance Management**: Launch and manage multiple Roblox instances
- 🐾 **Pet Simulator 99 Integration**: Real-time pet data collection and automation
- 📊 **Process Monitoring**: Real-time monitoring of Roblox processes
- 🔄 **Account Sync**: Synchronize settings across multiple accounts
- 🌐 **Web Interface**: Modern, responsive web interface
- 🚀 **Performance Optimization**: Enhanced process management and resource monitoring

## Quick Start

1. **Install Dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

2. **Development Mode**:
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Production Build**:
   \`\`\`bash
   npm run build
   npm start
   \`\`\`

4. **Access the Application**:
   Open http://localhost:5000 in your browser

## Deployment

### Replit Deployment

1. Import this repository to Replit
2. Run \`npm install\`
3. Use \`npm run dev\` for development
4. Deploy using Replit's deployment feature

### Manual Deployment

1. Build the application: \`npm run build\`
2. Start the server: \`npm start\`
3. The app will be available on port 5000

## Configuration

The application automatically detects your system configuration and adapts accordingly:

- **Windows**: Full UWP and standard Roblox support
- **Linux/macOS**: Demo mode with simulated data
- **Replit**: Optimized for cloud environment

## Pet Simulator 99 Features

- Real-time pet collection and management
- Automated hatching and enhancement
- Performance tracking and optimization
- Integration with Big Games API

## Support

For issues or questions, please refer to the documentation or create an issue in the repository.
`;

fs.writeFileSync(path.join(deployDir, 'README.md'), deploymentReadme);

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

console.log('\n✅ Web deployment package created successfully!');
console.log(`📁 Location: ${deployDir}`);
console.log('\nThis package contains only the essential files for the web application.');
console.log('You can now push this to your GitHub repository for web-based deployment.');
