/**
 * Roblox Process Detection System
 * 
 * Advanced process detection that identifies running Roblox instances
 * and links them to usernames based on window analysis and process monitoring.
 */

import { EventEmitter } from 'events';
import { exec, spawn } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

const execAsync = promisify(exec);

export interface RobloxProcessInfo {
  pid: number;
  windowHandle: string;
  windowClass: string;
  processName: string;
  windowTitle: string;
  username?: string;
  accountId?: number;
  gameId?: string;
  serverJobId?: string;
  resourceUsage: {
    cpu: number;
    memory: number;
    gpu: number;
  };
  windowGeometry: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  startTime: Date;
  lastActive: Date;
  status: 'detected' | 'linked' | 'authenticated' | 'error';
}

export interface ProcessDetectionOptions {
  includeStudio?: boolean;
  includePlayer?: boolean;
  includeUWP?: boolean;
  detectUsernames?: boolean;
  monitorResources?: boolean;
}

export class RobloxProcessDetector extends EventEmitter {
  private detectedProcesses: Map<number, RobloxProcessInfo> = new Map();
  private monitoringInterval: NodeJS.Timeout | null = null;
  private usernameCache: Map<number, string> = new Map();

  constructor() {
    super();
  }

  /**
   * Start monitoring for Roblox processes
   */
  async startMonitoring(options: ProcessDetectionOptions = {}): Promise<void> {
    const defaultOptions: ProcessDetectionOptions = {
      includeStudio: true,
      includePlayer: true,
      includeUWP: true,
      detectUsernames: true,
      monitorResources: true,
      ...options
    };

    // Initial scan
    await this.scanForProcesses(defaultOptions);

    // Start periodic monitoring
    this.monitoringInterval = setInterval(async () => {
      await this.scanForProcesses(defaultOptions);
    }, 2000); // Check every 2 seconds

    console.log('Roblox process monitoring started');
  }

  /**
   * Stop monitoring
   */
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    console.log('Roblox process monitoring stopped');
  }

  /**
   * Scan for running Roblox processes
   */
  private async scanForProcesses(options: ProcessDetectionOptions): Promise<void> {
    if (process.platform !== 'win32') {
      // For non-Windows, create demo processes
      await this.createDemoProcesses();
      return;
    }

    try {
      const processes: RobloxProcessInfo[] = [];

      // Scan for different Roblox process types
      if (options.includePlayer) {
        const playerProcesses = await this.scanRobloxPlayer();
        processes.push(...playerProcesses);
      }

      if (options.includeStudio) {
        const studioProcesses = await this.scanRobloxStudio();
        processes.push(...studioProcesses);
      }

      if (options.includeUWP) {
        const uwpProcesses = await this.scanRobloxUWP();
        processes.push(...uwpProcesses);
      }

      // Update detected processes
      await this.updateDetectedProcesses(processes, options);

    } catch (error) {
      console.error('Error scanning for Roblox processes:', error);
    }
  }

  /**
   * Scan for RobloxPlayerBeta.exe processes
   */
  private async scanRobloxPlayer(): Promise<RobloxProcessInfo[]> {
    const script = `
      Get-Process -Name "RobloxPlayerBeta" -ErrorAction SilentlyContinue | ForEach-Object {
        $process = $_
        $windowHandle = $process.MainWindowHandle
        
        # Get window information using Windows API
        Add-Type -TypeDefinition @"
          using System;
          using System.Runtime.InteropServices;
          using System.Text;
          
          public class Win32 {
            [DllImport("user32.dll", CharSet = CharSet.Auto)]
            public static extern int GetWindowText(IntPtr hWnd, StringBuilder lpString, int nMaxCount);
            
            [DllImport("user32.dll", CharSet = CharSet.Auto)]
            public static extern int GetClassName(IntPtr hWnd, StringBuilder lpClassName, int nMaxCount);
            
            [DllImport("user32.dll")]
            public static extern bool GetWindowRect(IntPtr hWnd, out RECT lpRect);
            
            [StructLayout(LayoutKind.Sequential)]
            public struct RECT {
              public int Left;
              public int Top;
              public int Right;
              public int Bottom;
            }
          }
"@
        
        $windowTitle = New-Object System.Text.StringBuilder 256
        $windowClass = New-Object System.Text.StringBuilder 256
        $rect = New-Object Win32+RECT
        
        [Win32]::GetWindowText($windowHandle, $windowTitle, 256)
        [Win32]::GetClassName($windowHandle, $windowClass, 256)
        [Win32]::GetWindowRect($windowHandle, [ref]$rect)
        
        [PSCustomObject]@{
          PID = $process.Id
          WindowHandle = $windowHandle.ToString()
          WindowClass = $windowClass.ToString()
          ProcessName = $process.ProcessName
          WindowTitle = $windowTitle.ToString()
          CPU = $process.CPU
          Memory = [Math]::Round($process.WorkingSet64 / 1MB, 2)
          StartTime = $process.StartTime
          WindowX = $rect.Left
          WindowY = $rect.Top
          WindowWidth = $rect.Right - $rect.Left
          WindowHeight = $rect.Bottom - $rect.Top
        }
      }
    `;

    try {
      const { stdout } = await execAsync(`powershell -Command "${script.replace(/"/g, '\\"')}"`);
      return this.parseProcessOutput(stdout, 'RobloxPlayerBeta.exe');
    } catch (error) {
      console.error('Error scanning RobloxPlayerBeta:', error);
      return [];
    }
  }

  /**
   * Scan for RobloxStudioBeta.exe processes
   */
  private async scanRobloxStudio(): Promise<RobloxProcessInfo[]> {
    try {
      const { stdout } = await execAsync('powershell "Get-Process -Name \\"RobloxStudioBeta\\" -ErrorAction SilentlyContinue | Select-Object Id,ProcessName,MainWindowTitle,StartTime,CPU,WorkingSet64"');
      return this.parseProcessOutput(stdout, 'RobloxStudioBeta.exe');
    } catch (error) {
      console.error('Error scanning RobloxStudioBeta:', error);
      return [];
    }
  }

  /**
   * Scan for UWP Roblox processes
   */
  private async scanRobloxUWP(): Promise<RobloxProcessInfo[]> {
    try {
      const { stdout } = await execAsync('powershell "Get-Process | Where-Object {$_.ProcessName -like \\"*Roblox*\\" -and $_.MainWindowTitle -ne \\"\\"} | Select-Object Id,ProcessName,MainWindowTitle,StartTime,CPU,WorkingSet64"');
      return this.parseProcessOutput(stdout, 'Roblox');
    } catch (error) {
      console.error('Error scanning UWP Roblox:', error);
      return [];
    }
  }

  /**
   * Parse PowerShell process output
   */
  private parseProcessOutput(output: string, processType: string): RobloxProcessInfo[] {
    const processes: RobloxProcessInfo[] = [];
    const lines = output.split('\n').filter(line => line.trim());

    for (const line of lines) {
      try {
        const data = JSON.parse(line);
        
        const processInfo: RobloxProcessInfo = {
          pid: data.PID || data.Id,
          windowHandle: data.WindowHandle || data.Id?.toString() || '0',
          windowClass: data.WindowClass || 'WINDOWSCLIENT',
          processName: processType,
          windowTitle: data.WindowTitle || data.MainWindowTitle || '',
          resourceUsage: {
            cpu: data.CPU || 0,
            memory: data.Memory || (data.WorkingSet64 ? Math.round(data.WorkingSet64 / 1024 / 1024) : 0),
            gpu: 0
          },
          windowGeometry: {
            x: data.WindowX || 0,
            y: data.WindowY || 0,
            width: data.WindowWidth || 800,
            height: data.WindowHeight || 600
          },
          startTime: new Date(data.StartTime || Date.now()),
          lastActive: new Date(),
          status: 'detected'
        };

        processes.push(processInfo);
      } catch (error) {
        // Skip malformed lines
        continue;
      }
    }

    return processes;
  }

  /**
   * Update detected processes and emit events
   */
  private async updateDetectedProcesses(processes: RobloxProcessInfo[], options: ProcessDetectionOptions): Promise<void> {
    const currentPids = new Set(processes.map(p => p.pid));
    const previousPids = new Set(this.detectedProcesses.keys());

    // Detect new processes
    for (const process of processes) {
      const existing = this.detectedProcesses.get(process.pid);
      
      if (!existing) {
        // New process detected
        this.detectedProcesses.set(process.pid, process);
        
        // Try to detect username if enabled
        if (options.detectUsernames) {
          await this.detectUsername(process);
        }
        
        this.emit('processDetected', process);
        console.log(`New Roblox process detected: PID ${process.pid} (${process.processName})`);
      } else {
        // Update existing process
        existing.lastActive = new Date();
        existing.resourceUsage = process.resourceUsage;
        existing.windowGeometry = process.windowGeometry;
        existing.windowTitle = process.windowTitle;
        
        this.detectedProcesses.set(process.pid, existing);
      }
    }

    // Detect closed processes
    for (const pid of previousPids) {
      if (!currentPids.has(pid)) {
        const process = this.detectedProcesses.get(pid);
        if (process) {
          this.detectedProcesses.delete(pid);
          this.emit('processTerminated', process);
          console.log(`Roblox process terminated: PID ${pid}`);
        }
      }
    }
  }

  /**
   * Detect username from process
   */
  private async detectUsername(process: RobloxProcessInfo): Promise<void> {
    try {
      // Method 1: Check window title for username
      const titleMatch = process.windowTitle.match(/Roblox - (.+)/);
      if (titleMatch) {
        const username = titleMatch[1].trim();
        process.username = username;
        process.status = 'linked';
        this.usernameCache.set(process.pid, username);
        console.log(`Username detected from window title: ${username} (PID: ${process.pid})`);
        return;
      }

      // Method 2: Check process memory for username (advanced)
      // This would require more complex memory reading techniques
      
      // Method 3: Check registry for last logged in user
      // This is a fallback method
      
      // Method 4: Check Roblox logs directory for user info
      await this.detectUsernameFromLogs(process);
      
    } catch (error) {
      console.error(`Error detecting username for PID ${process.pid}:`, error);
    }
  }

  /**
   * Detect username from Roblox logs
   */
  private async detectUsernameFromLogs(process: RobloxProcessInfo): Promise<void> {
    try {
      const logPaths = [
        path.join(process.env.LOCALAPPDATA || '', 'Roblox', 'logs'),
        path.join(process.env.APPDATA || '', 'Roblox', 'logs')
      ];

      for (const logPath of logPaths) {
        if (fs.existsSync(logPath)) {
          const files = fs.readdirSync(logPath);
          const recentLog = files
            .filter(f => f.includes('log'))
            .sort((a, b) => {
              const aStat = fs.statSync(path.join(logPath, a));
              const bStat = fs.statSync(path.join(logPath, b));
              return bStat.mtime.getTime() - aStat.mtime.getTime();
            })[0];

          if (recentLog) {
            const logContent = fs.readFileSync(path.join(logPath, recentLog), 'utf8');
            const userMatch = logContent.match(/User: (\w+)/);
            if (userMatch) {
              process.username = userMatch[1];
              process.status = 'linked';
              this.usernameCache.set(process.pid, userMatch[1]);
              console.log(`Username detected from logs: ${userMatch[1]} (PID: ${process.pid})`);
              return;
            }
          }
        }
      }
    } catch (error) {
      console.error('Error reading Roblox logs:', error);
    }
  }

  /**
   * Manually link a process to a username
   */
  async linkProcessToUsername(pid: number, username: string): Promise<boolean> {
    const process = this.detectedProcesses.get(pid);
    if (!process) {
      return false;
    }

    process.username = username;
    process.status = 'linked';
    this.usernameCache.set(pid, username);
    this.detectedProcesses.set(pid, process);
    
    this.emit('processLinked', process);
    console.log(`Process ${pid} manually linked to username: ${username}`);
    return true;
  }

  /**
   * Get all detected processes
   */
  getDetectedProcesses(): RobloxProcessInfo[] {
    return Array.from(this.detectedProcesses.values());
  }

  /**
   * Get process by PID
   */
  getProcessByPid(pid: number): RobloxProcessInfo | undefined {
    return this.detectedProcesses.get(pid);
  }

  /**
   * Get processes by username
   */
  getProcessesByUsername(username: string): RobloxProcessInfo[] {
    return Array.from(this.detectedProcesses.values())
      .filter(process => process.username === username);
  }

  /**
   * Create demo processes for non-Windows environments
   */
  private async createDemoProcesses(): Promise<void> {
    const demoProcesses = [
      {
        pid: 1234,
        windowHandle: '1770498',
        windowClass: 'WINDOWSCLIENT',
        processName: 'RobloxPlayerBeta.exe',
        windowTitle: 'Roblox - Milamoo12340',
        username: 'Milamoo12340',
        resourceUsage: { cpu: 15, memory: 256, gpu: 10 },
        windowGeometry: { x: 100, y: 100, width: 800, height: 600 },
        startTime: new Date(Date.now() - 300000), // 5 minutes ago
        lastActive: new Date(),
        status: 'linked' as const
      },
      {
        pid: 5678,
        windowHandle: '2880612',
        windowClass: 'WINDOWSCLIENT',
        processName: 'RobloxPlayerBeta.exe',
        windowTitle: 'Roblox - TestUser2',
        username: 'TestUser2',
        resourceUsage: { cpu: 8, memory: 198, gpu: 5 },
        windowGeometry: { x: 920, y: 100, width: 800, height: 600 },
        startTime: new Date(Date.now() - 600000), // 10 minutes ago
        lastActive: new Date(),
        status: 'linked' as const
      }
    ];

    for (const process of demoProcesses) {
      if (!this.detectedProcesses.has(process.pid)) {
        this.detectedProcesses.set(process.pid, process);
        this.emit('processDetected', process);
      }
    }
  }

  /**
   * Kill a process by PID
   */
  async killProcess(pid: number): Promise<boolean> {
    const process = this.detectedProcesses.get(pid);
    if (!process) {
      return false;
    }

    try {
      if (process.platform !== 'win32') {
        // Demo mode - just remove from memory
        this.detectedProcesses.delete(pid);
        this.emit('processTerminated', process);
        return true;
      }

      await execAsync(`taskkill /PID ${pid} /F`);
      this.detectedProcesses.delete(pid);
      this.emit('processTerminated', process);
      return true;
    } catch (error) {
      console.error(`Error killing process ${pid}:`, error);
      return false;
    }
  }

  /**
   * Get process statistics
   */
  getStatistics(): {
    totalProcesses: number;
    linkedProcesses: number;
    unlinkedProcesses: number;
    averageMemory: number;
    averageCpu: number;
  } {
    const processes = Array.from(this.detectedProcesses.values());
    const linked = processes.filter(p => p.status === 'linked');
    
    return {
      totalProcesses: processes.length,
      linkedProcesses: linked.length,
      unlinkedProcesses: processes.length - linked.length,
      averageMemory: processes.reduce((sum, p) => sum + p.resourceUsage.memory, 0) / processes.length || 0,
      averageCpu: processes.reduce((sum, p) => sum + p.resourceUsage.cpu, 0) / processes.length || 0
    };
  }
}

// Export singleton instance
export const robloxProcessDetector = new RobloxProcessDetector();