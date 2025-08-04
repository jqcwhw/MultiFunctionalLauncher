
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

async function createDeploymentPackage() {
  console.log('Creating comprehensive deployment package...');

  const packageDir = 'deployment-package';
  const distDir = path.join(packageDir, 'dist');
  const serverDir = path.join(packageDir, 'server');
  const clientDir = path.join(packageDir, 'client');
  const sharedDir = path.join(packageDir, 'shared');
  const assetsDir = path.join(packageDir, 'assets');
  const scriptsDir = path.join(packageDir, 'scripts');

  // Create directories
  [packageDir, distDir, serverDir, clientDir, sharedDir, assetsDir, scriptsDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Copy all server files
  const serverFiles = [
    'server/index.ts',
    'server/routes.ts',
    'server/storage.ts',
    'server/roblox-mutex-manager.ts',
    'server/process-manager.ts',
    'server/enhanced-process-manager.ts',
    'server/proven-multi-instance-manager.ts',
    'server/roblox-process-detector.ts',
    'server/roblox-registry-manager.ts',
    'server/uwp-instance-manager.ts',
    'server/real-process-launcher.ts',
    'server/account-sync-manager.ts',
    'server/vite.ts'
  ];

  serverFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const destPath = path.join(packageDir, file);
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(file, destPath);
    }
  });

  // Copy shared schema
  if (fs.existsSync('shared/schema.ts')) {
    fs.copyFileSync('shared/schema.ts', path.join(sharedDir, 'schema.ts'));
  }

  // Copy client files
  const clientFiles = [
    'client/src',
    'client/index.html'
  ];

  function copyRecursive(src, dest) {
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

  if (fs.existsSync('client/src')) {
    copyRecursive('client/src', path.join(clientDir, 'src'));
  }
  if (fs.existsSync('client/index.html')) {
    fs.copyFileSync('client/index.html', path.join(clientDir, 'index.html'));
  }

  // Copy configuration files
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

  // Create enhanced package.json with all dependencies
  const enhancedPackageJson = {
    "name": "roblox-multi-instance-manager",
    "version": "2.0.0",
    "description": "Advanced Roblox Multi-Instance Manager with Anti-Detection",
    "main": "server/index.ts",
    "scripts": {
      "dev": "NODE_ENV=development tsx server/index.ts",
      "build": "tsc && vite build",
      "start": "NODE_ENV=production tsx server/index.ts",
      "preview": "vite preview",
      "setup": "npm install && npm run build",
      "deploy": "npm run build && npm start"
    },
    "dependencies": {
      "@hookform/resolvers": "^3.3.2",
      "@radix-ui/react-accordion": "^1.1.2",
      "@radix-ui/react-alert-dialog": "^1.0.5",
      "@radix-ui/react-avatar": "^1.0.4",
      "@radix-ui/react-checkbox": "^1.0.4",
      "@radix-ui/react-dialog": "^1.0.5",
      "@radix-ui/react-dropdown-menu": "^2.0.6",
      "@radix-ui/react-label": "^2.0.2",
      "@radix-ui/react-popover": "^1.0.7",
      "@radix-ui/react-progress": "^1.0.3",
      "@radix-ui/react-select": "^2.0.0",
      "@radix-ui/react-separator": "^1.0.3",
      "@radix-ui/react-slot": "^1.0.2",
      "@radix-ui/react-switch": "^1.0.3",
      "@radix-ui/react-tabs": "^1.0.4",
      "@radix-ui/react-toast": "^1.1.5",
      "@tanstack/react-query": "^5.12.2",
      "better-sqlite3": "^9.2.2",
      "class-variance-authority": "^0.7.0",
      "clsx": "^2.0.0",
      "cors": "^2.8.5",
      "drizzle-orm": "^0.29.1",
      "express": "^4.18.2",
      "lucide-react": "^0.294.0",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "react-hook-form": "^7.48.2",
      "react-router-dom": "^6.20.1",
      "tailwind-merge": "^2.1.0",
      "tailwindcss-animate": "^1.0.7",
      "tsx": "^4.6.0",
      "typescript": "^5.3.2",
      "uuid": "^9.0.1",
      "zod": "^3.22.4"
    },
    "devDependencies": {
      "@types/better-sqlite3": "^7.6.8",
      "@types/cors": "^2.8.17",
      "@types/express": "^4.17.21",
      "@types/node": "^20.10.0",
      "@types/react": "^18.2.39",
      "@types/react-dom": "^18.2.17",
      "@types/uuid": "^9.0.7",
      "@vitejs/plugin-react": "^4.2.0",
      "autoprefixer": "^10.4.16",
      "drizzle-kit": "^0.20.6",
      "postcss": "^8.4.32",
      "tailwindcss": "^3.3.6",
      "vite": "^5.0.5"
    }
  };

  fs.writeFileSync(
    path.join(packageDir, 'package.json'),
    JSON.stringify(enhancedPackageJson, null, 2)
  );

  // Create Windows mutex creation scripts
  const windowsMutexScript = `
using System;
using System.Threading;
using System.Diagnostics;
using System.Runtime.InteropServices;

public class RobloxMutexManager {
    private static Mutex rbxMutex;
    
    [DllImport("kernel32.dll", SetLastError = true)]
    public static extern IntPtr CreateMutex(IntPtr lpMutexAttributes, bool bInitialOwner, string lpName);
    
    [DllImport("kernel32.dll", SetLastError = true)]
    public static extern bool ReleaseMutex(IntPtr hMutex);
    
    [DllImport("kernel32.dll", SetLastError = true)]
    public static extern bool CloseHandle(IntPtr hObject);
    
    public static void Main() {
        try {
            Console.WriteLine("Roblox Multi-Instance Mutex Manager v2.0");
            Console.WriteLine("Creating ROBLOX_singletonMutex...");
            
            // Create the mutex that Roblox uses to prevent multiple instances
            rbxMutex = new Mutex(true, "ROBLOX_singletonMutex");
            
            if (rbxMutex.WaitOne(0)) {
                Console.WriteLine("SUCCESS: Roblox multi-instance mutex acquired successfully");
                Console.WriteLine("ProcessId: " + Process.GetCurrentProcess().Id);
                Console.WriteLine("Mutex is now active. Multiple Roblox instances can be launched.");
                Console.WriteLine("Press Ctrl+C to release mutex and exit.");
                
                // Keep the mutex alive
                Console.CancelKeyPress += (sender, e) => {
                    Console.WriteLine("\\nReleasing mutex...");
                    rbxMutex?.ReleaseMutex();
                    rbxMutex?.Close();
                    Console.WriteLine("Mutex released. Exiting.");
                };
                
                while (true) {
                    Thread.Sleep(1000);
                }
            } else {
                Console.WriteLine("ERROR: Failed to acquire mutex - another instance may be running");
                Environment.Exit(1);
            }
        } catch (Exception ex) {
            Console.WriteLine("ERROR: " + ex.Message);
            Environment.Exit(1);
        }
    }
}
`;

  fs.writeFileSync(path.join(scriptsDir, 'RobloxMutexManager.cs'), windowsMutexScript);

  // Create PowerShell mutex script
  const powershellMutexScript = `
# Roblox Multi-Instance PowerShell Manager
param(
    [switch]$Create,
    [switch]$Release,
    [switch]$Status
)

Add-Type -TypeDefinition @"
using System;
using System.Threading;
using System.Diagnostics;

public class RobloxMutex {
    private static Mutex mutex;
    
    public static string CreateMutex() {
        try {
            mutex = new Mutex(true, "ROBLOX_singletonMutex");
            if (mutex.WaitOne(0)) {
                return "SUCCESS:" + Process.GetCurrentProcess().Id;
            } else {
                return "ERROR:Mutex already exists";
            }
        } catch (Exception ex) {
            return "ERROR:" + ex.Message;
        }
    }
    
    public static string ReleaseMutex() {
        try {
            if (mutex != null) {
                mutex.ReleaseMutex();
                mutex.Close();
                return "SUCCESS:Mutex released";
            }
            return "ERROR:No mutex to release";
        } catch (Exception ex) {
            return "ERROR:" + ex.Message;
        }
    }
    
    public static void KeepAlive() {
        while (true) {
            [System.Threading.Thread]::Sleep(1000);
        }
    }
}
"@ -Language CSharp

if ($Create) {
    Write-Host "Creating Roblox Multi-Instance Mutex..." -ForegroundColor Green
    $result = [RobloxMutex]::CreateMutex()
    Write-Host $result
    
    if ($result.StartsWith("SUCCESS")) {
        Write-Host "Mutex active. Press Ctrl+C to release." -ForegroundColor Yellow
        try {
            [RobloxMutex]::KeepAlive()
        } catch {
            Write-Host "Releasing mutex..." -ForegroundColor Red
            [RobloxMutex]::ReleaseMutex()
        }
    }
} elseif ($Release) {
    Write-Host "Releasing Roblox Mutex..." -ForegroundColor Red
    $result = [RobloxMutex]::ReleaseMutex()
    Write-Host $result
} elseif ($Status) {
    Write-Host "Checking Roblox processes..." -ForegroundColor Cyan
    Get-Process -Name "RobloxPlayerBeta" -ErrorAction SilentlyContinue | Select-Object Id, ProcessName, StartTime
} else {
    Write-Host "Roblox Multi-Instance Manager"
    Write-Host "Usage:"
    Write-Host "  -Create: Create and hold the mutex"
    Write-Host "  -Release: Release the mutex"
    Write-Host "  -Status: Show Roblox process status"
}
`;

  fs.writeFileSync(path.join(scriptsDir, 'RobloxMutexManager.ps1'), powershellMutexScript);

  // Create Linux/Unix mutex script
  const unixMutexScript = `#!/bin/bash
# Roblox Multi-Instance Unix/Linux Manager

MUTEX_FILE="/tmp/roblox_singleton_mutex"
PID_FILE="/tmp/roblox_mutex_manager.pid"

create_mutex() {
    echo "Creating Roblox multi-instance mutex (Unix simulation)..."
    
    if [ -f "$MUTEX_FILE" ]; then
        echo "ERROR: Mutex file already exists at $MUTEX_FILE"
        exit 1
    fi
    
    # Create mutex file with current PID
    echo $$ > "$MUTEX_FILE"
    echo $$ > "$PID_FILE"
    
    echo "SUCCESS: Roblox multi-instance mutex created"
    echo "ProcessId: $$"
    echo "Mutex file: $MUTEX_FILE"
    echo "Press Ctrl+C to release mutex"
    
    # Cleanup on exit
    trap 'release_mutex; exit' SIGINT SIGTERM
    
    # Keep alive
    while true; do
        sleep 1
    done
}

release_mutex() {
    echo "Releasing Roblox mutex..."
    rm -f "$MUTEX_FILE" "$PID_FILE"
    echo "Mutex released successfully"
}

check_status() {
    if [ -f "$MUTEX_FILE" ]; then
        PID=$(cat "$MUTEX_FILE")
        echo "Mutex active with PID: $PID"
        if ps -p "$PID" > /dev/null; then
            echo "Process is running"
        else
            echo "WARNING: Mutex file exists but process not found"
            echo "Cleaning up stale mutex file..."
            rm -f "$MUTEX_FILE"
        fi
    else
        echo "No active mutex found"
    fi
}

case "$1" in
    create)
        create_mutex
        ;;
    release)
        release_mutex
        ;;
    status)
        check_status
        ;;
    *)
        echo "Roblox Multi-Instance Manager (Unix/Linux)"
        echo "Usage: $0 {create|release|status}"
        echo ""
        echo "  create  - Create and hold the mutex"
        echo "  release - Release the mutex"
        echo "  status  - Check mutex status"
        ;;
esac
`;

  fs.writeFileSync(path.join(scriptsDir, 'roblox-mutex-manager.sh'), unixMutexScript);
  
  // Make Unix script executable
  try {
    fs.chmodSync(path.join(scriptsDir, 'roblox-mutex-manager.sh'), '755');
  } catch (e) {
    // Ignore chmod errors on Windows
  }

  // Create setup and deployment scripts
  const setupScript = `@echo off
echo Roblox Multi-Instance Manager Setup
echo =====================================

echo Installing dependencies...
npm install

echo Building application...
npm run build

echo Setup complete!
echo.
echo To start the application:
echo   npm start
echo.
echo To run in development mode:
echo   npm run dev
echo.
pause
`;

  fs.writeFileSync(path.join(packageDir, 'setup.bat'), setupScript);

  const unixSetupScript = `#!/bin/bash
echo "Roblox Multi-Instance Manager Setup"
echo "====================================="

echo "Installing dependencies..."
npm install

echo "Building application..."
npm run build

echo "Setup complete!"
echo ""
echo "To start the application:"
echo "  npm start"
echo ""
echo "To run in development mode:"
echo "  npm run dev"
`;

  fs.writeFileSync(path.join(packageDir, 'setup.sh'), unixSetupScript);
  
  try {
    fs.chmodSync(path.join(packageDir, 'setup.sh'), '755');
  } catch (e) {
    // Ignore chmod errors on Windows
  }

  // Create comprehensive README
  const readmeContent = `# Roblox Multi-Instance Manager v2.0

Advanced Roblox Multi-Instance Manager with Anti-Detection and Mutex Management.

## Features

- **Multi-Instance Support**: Run multiple Roblox instances simultaneously
- **Mutex Management**: Bypass Roblox's single-instance limitation
- **Process Detection**: Real-time monitoring of Roblox processes
- **Account Management**: Organize and manage multiple Roblox accounts
- **Anti-Detection**: Advanced techniques to avoid detection
- **Cross-Platform**: Windows, macOS, and Linux support

## Quick Setup

### Windows
1. Run \`setup.bat\` to install dependencies
2. Run \`npm start\` to start the application
3. Open http://localhost:5000 in your browser

### Linux/macOS
1. Run \`chmod +x setup.sh && ./setup.sh\`
2. Run \`npm start\` to start the application
3. Open http://localhost:5000 in your browser

## Mutex Management

### Windows (Recommended)
Use the included PowerShell script:
\`\`\`powershell
# Create mutex
.\\scripts\\RobloxMutexManager.ps1 -Create

# Check status
.\\scripts\\RobloxMutexManager.ps1 -Status

# Release mutex
.\\scripts\\RobloxMutexManager.ps1 -Release
\`\`\`

### Alternative C# Method
Compile and run the C# mutex manager:
\`\`\`cmd
csc /out:RobloxMutexManager.exe scripts\\RobloxMutexManager.cs
RobloxMutexManager.exe
\`\`\`

### Linux/macOS
Use the Unix script:
\`\`\`bash
# Create mutex
./scripts/roblox-mutex-manager.sh create

# Check status
./scripts/roblox-mutex-manager.sh status

# Release mutex
./scripts/roblox-mutex-manager.sh release
\`\`\`

## Usage

1. **Start the Application**: Run \`npm start\`
2. **Open Web Interface**: Navigate to http://localhost:5000
3. **Create Mutex**: Use the Protection tab to enable multi-instance support
4. **Add Accounts**: Use the Accounts tab to add your Roblox accounts
5. **Launch Instances**: Create and manage multiple Roblox instances

## API Endpoints

- \`GET /api/instances\` - Get all instances
- \`POST /api/instances\` - Create new instance
- \`GET /api/accounts\` - Get all accounts
- \`POST /api/accounts\` - Add new account
- \`GET /api/roblox/mutex-status\` - Check mutex status
- \`POST /api/roblox/mutex/create\` - Create mutex

## Security Features

- **Registry Management**: Safe Windows registry modifications
- **Process Isolation**: Each instance runs independently
- **Memory Protection**: Advanced memory management techniques
- **Network Isolation**: Separate network contexts per instance

## Troubleshooting

### Common Issues

1. **"Mutex creation failed"**
   - Run as Administrator on Windows
   - Ensure no other Roblox instances are running
   - Try the alternative PowerShell method

2. **"No Roblox processes detected"**
   - Make sure Roblox is installed
   - Check if Roblox processes are running in Task Manager

3. **"Instance failed to start"**
   - Verify account credentials
   - Check network connectivity
   - Ensure sufficient system resources

### Windows-Specific

- Run PowerShell as Administrator for best results
- Disable Windows Defender real-time protection temporarily if needed
- Add application to Windows Firewall exceptions

### Linux/macOS

- Ensure Wine is installed for Roblox support
- Run with appropriate permissions
- Install required dependencies: \`npm install\`

## Development

### Building from Source
\`\`\`bash
npm install
npm run build
npm start
\`\`\`

### Development Mode
\`\`\`bash
npm run dev
\`\`\`

## Legal Notice

This software is for educational purposes only. Use responsibly and in accordance with Roblox Terms of Service.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the console output for error messages
3. Ensure all dependencies are properly installed

---

**Version**: 2.0.0  
**Platform**: Windows, macOS, Linux  
**Requirements**: Node.js 18+, npm
`;

  fs.writeFileSync(path.join(packageDir, 'README.md'), readmeContent);

  // Create the deployment archive
  console.log('Creating deployment archive...');
  
  const output = fs.createWriteStream('Enhanced-Roblox-Multi-Instance-Manager-Complete.zip');
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', () => {
    console.log(`Deployment package created: Enhanced-Roblox-Multi-Instance-Manager-Complete.zip (${archive.pointer()} bytes)`);
    console.log('Package includes:');
    console.log('- Complete web application');
    console.log('- Mutex management scripts (Windows/Unix)');
    console.log('- All necessary dependencies');
    console.log('- Setup scripts');
    console.log('- Comprehensive documentation');
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);
  archive.directory(packageDir, false);
  archive.finalize();
}

if (require.main === module) {
  createDeploymentPackage().catch(console.error);
}

module.exports = { createDeploymentPackage };
