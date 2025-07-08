# Comprehensive Roblox Multi-Instance Launch Methods

## Overview
This document compiles all discovered methods for launching multiple Roblox instances from the 19+ extracted projects, providing a complete knowledge base for implementation.

## Method 1: Direct Process Launch (Account Manager)
**Source**: `Roblox-Account-Manager-master/RBX Alt Manager/Classes/Account.cs`

### Old Method (Direct EXE)
```csharp
string RPath = @"C:\Program Files (x86)\Roblox\Versions\" + AccountManager.CurrentVersion;
if (!Directory.Exists(RPath))
    RPath = Path.Combine(Environment.GetEnvironmentVariable("LocalAppData"), @"Roblox\Versions\" + AccountManager.CurrentVersion);

RPath += @"\RobloxPlayerBeta.exe";

ProcessStartInfo Roblox = new ProcessStartInfo(RPath);
if (JoinVIP)
    Roblox.Arguments = string.Format("--app -t {0} -j \"https://assetgame.roblox.com/game/PlaceLauncher.ashx?request=RequestPrivateGame&placeId={1}&accessCode={2}&linkCode={3}\"", Ticket, PlaceID, AccessCode, LinkCode);
else
    Roblox.Arguments = string.Format("--app -t {0} -j \"https://assetgame.roblox.com/game/PlaceLauncher.ashx?request=RequestGame{3}&placeId={1}{2}&isPlayTogetherGame=false\"", Ticket, PlaceID, "&gameId=" + JobID, string.IsNullOrEmpty(JobID) ? "" : "Job");
```

### New Method (Protocol Handler)
```csharp
ProcessStartInfo LaunchInfo = new ProcessStartInfo();
LaunchInfo.FileName = $"roblox-player:1+launchmode:play+gameinfo:{Ticket}+launchtime:{LaunchTime}+placelauncherurl:{HttpUtility.UrlEncode($"https://assetgame.roblox.com/game/PlaceLauncher.ashx?request=RequestGame{(string.IsNullOrEmpty(JobID) ? "" : "Job")}&browserTrackerId={BrowserTrackerID}&placeId={PlaceID}{(string.IsNullOrEmpty(JobID) ? "" : ("&gameId=" + JobID))}&isPlayTogetherGame=false{(AccountManager.IsTeleport ? "&isTeleport=true" : "")}")}+browsertrackerid:{BrowserTrackerID}+robloxLocale:en_us+gameLocale:en_us+channel:+LaunchExp:InApp";
Process Launcher = Process.Start(LaunchInfo);
```

## Method 2: UWP Shell Protocol (UWP MultiPlatform)
**Source**: `UWP_MultiPlatform-main/UWP_Multiplatform/Form1.cs`

### UWP Instance Launch
```csharp
private void LaunchInstance(string ApplicationName)
{
    var publisherIdMatch = Regex.Match(UWPPATH, "(?<=__)(?s)(.*$)");
    string publisherID = publisherIdMatch.Value.Trim();
    RunPowerShellCommand("explorer.exe shell:AppsFolder\\" + RobloxInstancesListBox.SelectedItem.ToString() + "_" + publisherID + "!App");
}
```

### Direct UWP Launch
```csharp
private void LaunchSelectedInstance_Click(object sender, EventArgs e)
{
    RunPowerShellCommand("explorer.exe shell:AppsFolder\\" + RobloxInstancesListBox.SelectedItem.ToString() + "_" + UWP_PublisherID + "!App");
}
```

## Method 3: Mutex Bypass (MultiRoblox)
**Source**: `MultiRoblox-master/MultiRoblox/main.c`

### Mutex Creation Override
```c
int main()
{
    CreateMutex(0, 1, L"ROBLOX_singletonEvent");
    HINSTANCE hInstance = GetModuleHandle(NULL);
    return WinMain(hInstance, NULL, NULL, SW_SHOWDEFAULT);
}
```

## Method 4: Python Process Management (PS99 Manager)
**Source**: `PS99_MultiAccount_Manager_1751953884086.py`

### External Executor Launch
```python
def _launch_with_executor(self, account: Account) -> bool:
    """Launch account using external executor"""
    if not self.config["executor_path"] or not os.path.exists(self.config["executor_path"]):
        self.log("Executor path not set or invalid", level="ERROR")
        return False
    
    self._copy_script_to_clipboard()
    
    try:
        process = subprocess.Popen([self.config["executor_path"]])
        account.executor_process = process
        account.status = "Active"
        account.last_active = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.running_accounts[account.username] = account
        return True
    except Exception as e:
        self.log(f"Error launching executor for {account.username}: {str(e)}", level="ERROR")
        return False
```

### Direct Injection Method
```python
def _launch_with_direct_injection(self, account: Account) -> bool:
    """Launch account using direct injection method"""
    account.status = "Active"
    account.last_active = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    self.running_accounts[account.username] = account
    
    threading.Thread(target=self._simulate_account_activity, args=(account,), daemon=True).start()
    return True
```

## Method 5: AutoHotkey Client Management
**Source**: `main_1751951488170_extracted/TJKFdDCNHZu-main/Modules/Multiclient.ahk`

### Client Discovery
```autohotkey
getRobloxClients() {
    clients := WinGetList("ahk_exe RobloxPlayerBeta.exe")
    
    if clients.Length == 0 {
        MsgBox("No Roblox windows found.")
        ExitApp()
    }
    
    return clients
}
```

### Window Management
```autohotkey
activateWindow(windowHandle := -1) {
    window := "ahk_id " windowHandle
    
    if !WinExist(window)
        return false
    
    Loop 100 {
        WinActivate window
        Sleep 10
        if WinGetID("A") == windowHandle
            return true
    }
}
```

## Method 6: Client Hook Injection (Lure Framework)
**Source**: `lure-trunk/Lure/Hooks/CRoblox.cpp`

### Authentication Hook
```cpp
BOOL __fastcall CRobloxApp__InitInstance_hook(CRobloxApp* _this)
{
    if (!CRobloxApp__InitInstance(_this))
        return FALSE;

    CApp* app = reinterpret_cast<CApp*>(CLASSLOCATION_CAPP);

    if (hasAuthUrlArg && hasAuthTicketArg && !authenticationUrl.empty() && !authenticationTicket.empty())
    {
        CApp__RobloxAuthenticate(app, nullptr, authenticationUrl.c_str(), authenticationTicket.c_str());
    }

    if (hasJoinArg && !joinScriptUrl.empty())
    {
        try
        {
            CRobloxDoc* document = CRobloxApp__CreateDocument(_this);
            CWorkspace__ExecUrlScript(document->workspace, joinScriptUrl.c_str(), VARIANTARG(), VARIANTARG(), VARIANTARG(), VARIANTARG(), nullptr);
        }
        catch (std::runtime_error)
        {
            return FALSE;
        }
    }

    return TRUE;
}
```

## Method 7: Roblox Path Detection
**Source**: `PS99_MultiAccount_Manager_1751953884086.py`

### Path Detection Algorithm
```python
def detect_roblox_path(self) -> str:
    """Detect Roblox installation path"""
    paths_to_check = [
        r"C:\Program Files (x86)\Roblox\Versions",
        r"C:\Program Files\Roblox\Versions",
        os.path.expanduser("~/AppData/Local/Roblox/Versions")
    ]
    
    for path in paths_to_check:
        if os.path.exists(path):
            try:
                version_folders = [f for f in os.listdir(path) if os.path.isdir(os.path.join(path, f))]
                if version_folders:
                    latest_version = sorted(version_folders)[-1]
                    roblox_path = os.path.join(path, latest_version)
                    
                    if os.path.exists(os.path.join(roblox_path, "RobloxPlayerBeta.exe")):
                        return roblox_path
            except Exception as e:
                continue
    
    return None
```

## Method 8: Cookie Authentication
**Source**: Multiple projects

### Cookie Injection Pattern
```javascript
// From extracted projects
const cookieString = `.ROBLOSECURITY=${authCookie}`;
const launchUrl = `roblox-player:1+launchmode:play+gameinfo:${ticket}+launchtime:${Date.now()}+placelauncherurl:${encodeURIComponent(gameUrl)}+browsertrackerid:${browserId}`;
```

## Method 9: PowerShell Integration
**Source**: `UWP_MultiPlatform`, `enhanced-process-manager.ts`

### PowerShell Launch Script
```powershell
# Find Roblox UWP app
$robloxApp = Get-AppxPackage -Name "*ROBLOX*" | Select-Object -First 1

if ($robloxApp) {
    $appId = $robloxApp.PackageFamilyName + "!ROBLOX"
    
    if ("${gameUrl}") {
        Start-Process -FilePath "explorer.exe" -ArgumentList "${gameUrl}"
    } else {
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
}
```

## Method 10: Process Window Management
**Source**: `Account.cs`, `Multiclient.ahk`

### Window Position Adjustment
```csharp
public async void AdjustWindowPosition()
{
    if (!RobloxWatcher.RememberWindowPositions)
        return;

    bool Found = false;
    DateTime Ends = DateTime.Now.AddSeconds(45);

    while (true)
    {
        await Task.Delay(350);

        foreach (var process in Process.GetProcessesByName("RobloxPlayerBeta").Reverse())
        {
            if (process.MainWindowHandle == IntPtr.Zero) continue;

            string CommandLine = process.GetCommandLine();
            // Window positioning logic
        }
    }
}
```

## Implementation Priority Order

1. **Protocol Handler Method** (Most Reliable)
2. **Direct Process Launch** (Fallback)
3. **UWP Shell Protocol** (Windows-specific)
4. **Mutex Bypass** (Advanced)
5. **PowerShell Integration** (System-level)
6. **AutoHotkey Management** (Automation)
7. **Client Hook Injection** (Advanced/Legacy)

## Security Considerations

- All methods should be implemented with proper error handling
- Authentication cookies must be handled securely
- Process isolation is critical for multi-instance stability
- Rate limiting prevents Roblox API abuse
- Window management prevents UI conflicts

## Cross-Platform Compatibility

- **Windows**: All methods available
- **macOS**: Limited to process launch and protocol handlers
- **Linux**: Protocol handlers and process management only

## Testing Requirements

- Virtual environment for safety
- Multiple test accounts
- Process monitoring tools
- Memory usage tracking
- Anti-detection validation