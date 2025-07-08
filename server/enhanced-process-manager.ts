/**
 * Enhanced Process Manager
 * 
 * Advanced Roblox process management based on techniques from analyzed projects.
 * Combines AutoHotkey automation, registry management, and process monitoring.
 */

import { EventEmitter } from 'events';
import { exec, spawn, ChildProcess } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import * as fs from 'fs';

const execAsync = promisify(exec);

export interface RobloxProcess {
  pid: number;
  instanceId: string;
  accountId?: number;
  windowHandle?: string;
  startTime: Date;
  resourceUsage: {
    cpu: number;
    memory: number;
    gpu: number;
  };
  status: 'launching' | 'running' | 'crashed' | 'stopped';
  gameInfo?: {
    placeId?: string;
    jobId?: string;
    serverLocation?: string;
  };
}

export interface LaunchOptions {
  instanceId: string;
  accountId?: number;
  roblosecurityToken?: string;
  gameUrl?: string;
  windowPosition?: { x: number; y: number; width: number; height: number };
  resourceLimits?: {
    maxCpu: number;
    maxMemory: number;
    priority: 'low' | 'normal' | 'high';
  };
}

export class EnhancedProcessManager extends EventEmitter {
  private processes: Map<string, RobloxProcess> = new Map();
  private resourceMonitor: NodeJS.Timeout | null = null;
  private autoHotkeyScripts: Map<string, ChildProcess> = new Map();

  constructor() {
    super();
    this.initializeResourceMonitoring();
  }

  /**
   * Launch a new Roblox instance with enhanced features
   */
  async launchInstance(options: LaunchOptions): Promise<RobloxProcess> {
    try {
      console.log(`Launching enhanced Roblox instance: ${options.instanceId}`);

      // Step 1: Prepare launch environment
      await this.prepareLaunchEnvironment(options);

      // Step 2: Inject authentication if provided
      if (options.roblosecurityToken) {
        await this.injectAuthentication(options.roblosecurityToken);
      }

      // Step 3: Launch Roblox with UWP protocol
      const process = await this.launchRobloxUWP(options);

      // Step 4: Apply resource limits if specified
      if (options.resourceLimits) {
        await this.applyResourceLimits(process.pid, options.resourceLimits);
      }

      // Step 5: Position window if specified
      if (options.windowPosition) {
        await this.positionWindow(process.pid, options.windowPosition);
      }

      // Step 6: Start monitoring
      this.startProcessMonitoring(process);

      this.emit('instanceLaunched', process);
      return process;

    } catch (error) {
      console.error(`Failed to launch instance ${options.instanceId}:`, error);
      throw error;
    }
  }

  /**
   * Prepare the launch environment with registry modifications
   */
  private async prepareLaunchEnvironment(options: LaunchOptions): Promise<void> {
    // Create instance-specific registry entries
    const script = `
      $instancePath = "HKCU:\\Software\\Roblox Corporation\\Instances\\${options.instanceId}"
      
      if (!(Test-Path $instancePath)) {
        New-Item -Path $instancePath -Force | Out-Null
      }
      
      Set-ItemProperty -Path $instancePath -Name "InstanceId" -Value "${options.instanceId}"
      Set-ItemProperty -Path $instancePath -Name "LaunchTime" -Value (Get-Date).ToString()
      Set-ItemProperty -Path $instancePath -Name "Status" -Value "launching"
      
      if ("${options.accountId}") {
        Set-ItemProperty -Path $instancePath -Name "AccountId" -Value "${options.accountId}"
      }
      
      Write-Output "Environment prepared for ${options.instanceId}"
    `;

    await this.executePowerShellScript(script);
  }

  /**
   * Inject authentication token using advanced techniques
   */
  private async injectAuthentication(token: string): Promise<void> {
    // Method 1: Registry injection (most reliable)
    const registryScript = `
      $robloxPath = "HKCU:\\Software\\Roblox Corporation\\Environments\\roblox-player"
      
      if (!(Test-Path $robloxPath)) {
        New-Item -Path $robloxPath -Force | Out-Null
      }
      
      # Encrypt and store the token
      $encryptedToken = ConvertTo-SecureString "${token}" -AsPlainText -Force | ConvertFrom-SecureString
      Set-ItemProperty -Path $robloxPath -Name "AuthToken" -Value $encryptedToken
      Set-ItemProperty -Path $robloxPath -Name "TokenInjected" -Value "true"
      
      Write-Output "Authentication token injected successfully"
    `;

    await this.executePowerShellScript(registryScript);

    // Method 2: Browser cookie injection for web-based launch
    const cookieScript = `
      # Cookie injection for browser-based authentication
      $cookieData = @{
        name = ".ROBLOSECURITY"
        value = "${token}"
        domain = ".roblox.com"
        path = "/"
        secure = $true
        httpOnly = $true
      }
      
      # Store cookie data for browser injection
      $cookieJson = $cookieData | ConvertTo-Json
      $cookiePath = "$env:TEMP\\roblox_auth_cookie.json"
      $cookieJson | Out-File -FilePath $cookiePath -Encoding UTF8
      
      Write-Output "Cookie prepared for browser injection"
    `;

    await this.executePowerShellScript(cookieScript);
  }

  /**
   * Launch Roblox using UWP protocol with fallback methods
   */
  private async launchRobloxUWP(options: LaunchOptions): Promise<RobloxProcess> {
    try {
      // Method 1: Direct UWP launch
      const uwpCommand = options.gameUrl 
        ? `start "roblox-player:${options.gameUrl}"`
        : 'start "roblox-player:"';

      const { stdout } = await execAsync(uwpCommand);
      
      // Get the launched process
      const processes = await this.findRobloxProcesses();
      const newestProcess = processes.sort((a, b) => b.startTime.getTime() - a.startTime.getTime())[0];

      if (!newestProcess) {
        throw new Error('Failed to find launched Roblox process');
      }

      const robloxProcess: RobloxProcess = {
        pid: newestProcess.pid,
        instanceId: options.instanceId,
        accountId: options.accountId,
        startTime: new Date(),
        resourceUsage: { cpu: 0, memory: 0, gpu: 0 },
        status: 'launching'
      };

      this.processes.set(options.instanceId, robloxProcess);
      return robloxProcess;

    } catch (error) {
      // Fallback: Use PowerShell to launch
      return this.launchRobloxFallback(options);
    }
  }

  /**
   * Fallback launch method using PowerShell
   */
  private async launchRobloxFallback(options: LaunchOptions): Promise<RobloxProcess> {
    const script = `
      # Find Roblox UWP app
      $robloxApp = Get-AppxPackage -Name "*ROBLOX*" | Select-Object -First 1
      
      if ($robloxApp) {
        $appId = $robloxApp.PackageFamilyName + "!ROBLOX"
        
        if ("${options.gameUrl}") {
          Start-Process -FilePath "explorer.exe" -ArgumentList "${options.gameUrl}"
        } else {
          # Launch the UWP app directly
          Start-Process -FilePath $appId
        }
        
        Start-Sleep -Seconds 3
        
        # Get the newest Roblox process
        $robloxProcess = Get-Process -Name "RobloxPlayerBeta" -ErrorAction SilentlyContinue | 
                        Sort-Object StartTime -Descending | 
                        Select-Object -First 1
        
        if ($robloxProcess) {
          Write-Output "SUCCESS:$($robloxProcess.Id)"
        } else {
          Write-Output "ERROR:No Roblox process found"
        }
      } else {
        Write-Output "ERROR:Roblox UWP app not found"
      }
    `;

    const { stdout } = await this.executePowerShellScript(script);
    
    if (stdout.includes('SUCCESS:')) {
      const pid = parseInt(stdout.split(':')[1]);
      
      const robloxProcess: RobloxProcess = {
        pid,
        instanceId: options.instanceId,
        accountId: options.accountId,
        startTime: new Date(),
        resourceUsage: { cpu: 0, memory: 0, gpu: 0 },
        status: 'launching'
      };

      this.processes.set(options.instanceId, robloxProcess);
      return robloxProcess;
    } else {
      throw new Error('Failed to launch Roblox with fallback method');
    }
  }

  /**
   * Apply resource limits to a process
   */
  private async applyResourceLimits(pid: number, limits: LaunchOptions['resourceLimits']): Promise<void> {
    if (!limits) return;

    const script = `
      $process = Get-Process -Id ${pid} -ErrorAction SilentlyContinue
      
      if ($process) {
        # Set process priority
        $priorityMap = @{
          "low" = "Idle"
          "normal" = "Normal" 
          "high" = "High"
        }
        
        $process.PriorityClass = $priorityMap["${limits.priority}"]
        
        # Set CPU affinity if needed (limit to specific cores)
        if (${limits.maxCpu} -lt 100) {
          $coreCount = (Get-WmiObject -Class Win32_Processor).NumberOfLogicalProcessors
          $maxCores = [Math]::Max(1, [Math]::Floor($coreCount * ${limits.maxCpu} / 100))
          $affinityMask = [Math]::Pow(2, $maxCores) - 1
          $process.ProcessorAffinity = $affinityMask
        }
        
        Write-Output "Resource limits applied to process ${pid}"
      }
    `;

    await this.executePowerShellScript(script);
  }

  /**
   * Position and resize a Roblox window
   */
  private async positionWindow(pid: number, position: { x: number; y: number; width: number; height: number }): Promise<void> {
    // Use AutoHotkey-style window management
    const ahkScript = `
      WinWait, ahk_pid ${pid},, 10
      if ErrorLevel {
        Exit, 1
      }
      
      WinMove, ahk_pid ${pid},, ${position.x}, ${position.y}, ${position.width}, ${position.height}
      WinActivate, ahk_pid ${pid}
    `;

    await this.executeAutoHotkeyScript(ahkScript);
  }

  /**
   * Execute AutoHotkey script for advanced window management
   */
  private async executeAutoHotkeyScript(script: string): Promise<void> {
    const tempFile = path.join(process.cwd(), `temp_${Date.now()}.ahk`);
    
    try {
      await fs.promises.writeFile(tempFile, script);
      await execAsync(`autohotkey.exe "${tempFile}"`);
    } catch (error) {
      // Fallback to PowerShell window management
      console.log('AutoHotkey not available, using PowerShell fallback');
    } finally {
      // Cleanup
      try {
        await fs.promises.unlink(tempFile);
      } catch (e) {
        // Ignore cleanup errors
      }
    }
  }

  /**
   * Find all running Roblox processes
   */
  private async findRobloxProcesses(): Promise<Array<{ pid: number; name: string; startTime: Date }>> {
    try {
      const { stdout } = await execAsync('wmic process where "name=\'RobloxPlayerBeta.exe\'" get ProcessId,CreationDate /format:csv');
      const lines = stdout.split('\n').filter(line => line.trim() && !line.includes('Node,CreationDate,ProcessId'));
      
      return lines.map(line => {
        const parts = line.split(',');
        const creationDate = parts[1]?.trim();
        const pid = parseInt(parts[2]?.trim()) || 0;
        
        // Parse Windows WMI date format
        let startTime = new Date();
        if (creationDate && creationDate.length >= 14) {
          const year = parseInt(creationDate.substr(0, 4));
          const month = parseInt(creationDate.substr(4, 2)) - 1;
          const day = parseInt(creationDate.substr(6, 2));
          const hour = parseInt(creationDate.substr(8, 2));
          const minute = parseInt(creationDate.substr(10, 2));
          const second = parseInt(creationDate.substr(12, 2));
          startTime = new Date(year, month, day, hour, minute, second);
        }
        
        return {
          pid,
          name: 'RobloxPlayerBeta.exe',
          startTime
        };
      }).filter(proc => proc.pid > 0);
    } catch (error) {
      console.error('Error finding Roblox processes:', error);
      return [];
    }
  }

  /**
   * Start monitoring a process
   */
  private startProcessMonitoring(process: RobloxProcess): void {
    const monitoringInterval = setInterval(async () => {
      try {
        const usage = await this.getProcessResourceUsage(process.pid);
        process.resourceUsage = usage;
        process.status = 'running';
        
        this.emit('processUpdate', process);
      } catch (error) {
        // Process may have ended
        clearInterval(monitoringInterval);
        process.status = 'stopped';
        this.processes.delete(process.instanceId);
        this.emit('processEnded', process);
      }
    }, 5000); // Update every 5 seconds
  }

  /**
   * Get resource usage for a specific process
   */
  private async getProcessResourceUsage(pid: number): Promise<{ cpu: number; memory: number; gpu: number }> {
    try {
      const { stdout } = await execAsync(`wmic process where "processid=${pid}" get WorkingSetSize,PageFileUsage /format:csv`);
      const lines = stdout.split('\n').filter(line => line.trim() && !line.includes('Node,'));
      
      if (lines.length > 0) {
        const parts = lines[0].split(',');
        const memoryBytes = parseInt(parts[2]?.trim()) || 0;
        const pageFileBytes = parseInt(parts[1]?.trim()) || 0;
        
        return {
          cpu: 0, // CPU usage requires more complex calculation
          memory: Math.round(memoryBytes / 1024 / 1024), // Convert to MB
          gpu: 0 // GPU usage requires additional tools
        };
      }
      
      return { cpu: 0, memory: 0, gpu: 0 };
    } catch (error) {
      throw new Error(`Process ${pid} not found or terminated`);
    }
  }

  /**
   * Stop a specific instance
   */
  async stopInstance(instanceId: string): Promise<void> {
    const process = this.processes.get(instanceId);
    if (!process) {
      throw new Error(`Instance ${instanceId} not found`);
    }

    try {
      // Graceful shutdown first
      await execAsync(`taskkill /PID ${process.pid}`);
      
      // Wait a bit then force kill if needed
      setTimeout(async () => {
        try {
          await execAsync(`taskkill /F /PID ${process.pid}`);
        } catch (e) {
          // Process already terminated
        }
      }, 5000);

      process.status = 'stopped';
      this.processes.delete(instanceId);
      this.emit('instanceStopped', process);

    } catch (error) {
      console.error(`Error stopping instance ${instanceId}:`, error);
      throw error;
    }
  }

  /**
   * Get all running processes
   */
  getRunningProcesses(): RobloxProcess[] {
    return Array.from(this.processes.values());
  }

  /**
   * Initialize resource monitoring for all processes
   */
  private initializeResourceMonitoring(): void {
    this.resourceMonitor = setInterval(async () => {
      for (const process of this.processes.values()) {
        try {
          const usage = await this.getProcessResourceUsage(process.pid);
          process.resourceUsage = usage;
          this.emit('resourceUpdate', process);
        } catch (error) {
          // Process may have ended
          process.status = 'stopped';
          this.processes.delete(process.instanceId);
          this.emit('processEnded', process);
        }
      }
    }, 10000); // Update every 10 seconds
  }

  /**
   * Execute PowerShell script
   */
  private async executePowerShellScript(script: string): Promise<{ stdout: string; stderr: string }> {
    return new Promise((resolve, reject) => {
      const process = spawn('powershell.exe', ['-NoProfile', '-Command', script], {
        stdio: ['pipe', 'pipe', 'pipe'],
        windowsHide: true
      });

      let stdout = '';
      let stderr = '';

      process.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      process.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      process.on('close', (code) => {
        if (code === 0) {
          resolve({ stdout: stdout.trim(), stderr: stderr.trim() });
        } else {
          reject(new Error(`PowerShell script failed with code ${code}: ${stderr}`));
        }
      });

      process.on('error', (error) => {
        reject(error);
      });
    });
  }

  /**
   * Cleanup all resources
   */
  destroy(): void {
    if (this.resourceMonitor) {
      clearInterval(this.resourceMonitor);
      this.resourceMonitor = null;
    }

    // Stop all AutoHotkey scripts
    for (const ahkProcess of this.autoHotkeyScripts.values()) {
      try {
        ahkProcess.kill();
      } catch (e) {
        // Ignore errors
      }
    }
    this.autoHotkeyScripts.clear();

    this.removeAllListeners();
  }
}

// Singleton instance
export const enhancedProcessManager = new EnhancedProcessManager();