#!/usr/bin/env node
/**
 * Portable Roblox Multi-Instance Manager
 * A standalone version that runs without requiring a separate server
 */

const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting Roblox Multi-Instance Manager (Portable)...\n');

// Create Express server for standalone mode
const app = express();
app.use(express.json());
app.use(express.static('dist'));

// Import routes if they exist
try {
  const routes = require('./server-dist/routes');
  app.use('/api', routes);
} catch (error) {
  console.warn('Warning: Server routes not found, using basic setup');
  
  // Basic fallback routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', mode: 'portable' });
  });
  
  app.get('/api/accounts', (req, res) => {
    res.json([]);
  });
  
  app.get('/api/instances', (req, res) => {
    res.json([]);
  });
}

// Serve the React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Find available port
const findAvailablePort = (startPort = 3000) => {
  return new Promise((resolve) => {
    const server = app.listen(startPort, (err) => {
      if (err) {
        if (err.code === 'EADDRINUSE') {
          console.log(`Port ${startPort} is busy, trying ${startPort + 1}`);
          server.close();
          findAvailablePort(startPort + 1).then(resolve);
        } else {
          console.error('Server error:', err);
          process.exit(1);
        }
      } else {
        const port = server.address().port;
        console.log(`✅ Server started successfully on http://localhost:${port}`);
        console.log(`🌐 Open your browser to: http://localhost:${port}`);
        console.log(`💡 Press Ctrl+C to stop the server\n`);
        
        // Auto-open browser if possible
        const openBrowser = (url) => {
          const start = process.platform === 'darwin' ? 'open' : 
                       process.platform === 'win32' ? 'start' : 'xdg-open';
          spawn(start, [url], { stdio: 'ignore' }).on('error', () => {
            console.log('Could not auto-open browser. Please open manually.');
          });
        };
        
        setTimeout(() => openBrowser(`http://localhost:${port}`), 1000);
        resolve(server);
      }
    });
  });
};

// Check system requirements
const checkRequirements = () => {
  console.log('🔍 Checking system requirements...');
  
  // Check Node.js version
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  
  if (majorVersion < 16) {
    console.error('❌ Node.js version 16 or higher is required');
    console.error(`   Current version: ${nodeVersion}`);
    console.error('   Please update Node.js from https://nodejs.org/');
    process.exit(1);
  }
  
  console.log(`✅ Node.js version: ${nodeVersion}`);
  console.log(`✅ Platform: ${process.platform}`);
  console.log(`✅ Architecture: ${process.arch}`);
  
  // Check if dist folder exists
  if (!fs.existsSync('dist')) {
    console.error('❌ Client build not found. Please run build process first.');
    process.exit(1);
  }
  
  console.log('✅ Client build found');
  console.log('✅ All requirements satisfied\n');
};

// Enhanced error handling
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n📡 Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n📡 Shutting down gracefully...');
  process.exit(0);
});

// Main execution
(async () => {
  try {
    checkRequirements();
    await findAvailablePort();
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
})();