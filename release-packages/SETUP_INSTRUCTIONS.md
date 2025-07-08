# Setup Instructions - Roblox Multi-Instance Manager

## Prerequisites

### For Windows (Full Functionality)
- Windows 10/11 (required for UWP features)
- Roblox installed (automatically detected)
- Node.js 16+ (for running the server)
- PowerShell 5.1+ (for advanced features)

### For Mac/Linux (Limited Functionality)
- Node.js 16+ (for running the server)
- Modern web browser
- Demo mode only (no real Roblox instances)

## Installation Methods

### Method 1: Portable Package (Recommended)
1. Download `roblox-multi-instance-portable.zip`
2. Extract to desired location
3. Run appropriate launcher:
   - Windows: `START_WINDOWS.bat`
   - Mac/Linux: `./START_UNIX.sh`

### Method 2: Development Package
1. Download `roblox-multi-instance-dev.zip`
2. Extract to desired location
3. Install dependencies: `npm install`
4. Start server: `npm start`

## First Run

### Windows Setup
1. Run launcher as Administrator (recommended)
2. Allow firewall exceptions if prompted
3. Roblox will be automatically detected
4. Browser opens to http://localhost:3000

### Configuration
1. Launch first instance to test
2. Add game URLs for specific games
3. Configure authentication cookies if needed
4. Use Quick Launch for popular games

## Advanced Configuration

### Registry Modifications (Windows)
The system automatically applies registry modifications:
```
HKEY_CURRENT_USER\SOFTWARE\Roblox Corporation\Roblox
- MultipleRoblox = 1
- SingletonMutex = 0
```

### UWP Package Cloning
For UWP Roblox installations:
1. Detects UWP Roblox automatically
2. Creates cloned packages with unique identities
3. Registers packages via PowerShell
4. Launches via shell protocol

### Mutex Management
Core technique from MultiBloxy research:
1. Creates `ROBLOX_singletonEvent` mutex
2. Prevents Roblox from blocking multiple instances
3. Maintains mutex throughout session

## Troubleshooting

### Common Issues

#### "No Roblox installation found"
**Solution**: Install Roblox from https://www.roblox.com/download

#### "Permission denied" or "Access denied"
**Solution**: Run as Administrator on Windows

#### "Port 3000 already in use"
**Solution**: Change PORT in server.js or kill other processes using port 3000

#### "Mutex creation failed"
**Solution**: 
1. Restart application
2. Restart computer
3. Run as Administrator

#### "PowerShell execution policy"
**Solution**: Run in Administrator PowerShell:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Debug Mode
Enable detailed logging by setting `DEBUG=true` in server.js:
```javascript
const DEBUG = true; // Change to true for debug mode
```

### Log Files
Check these locations for logs:
- Windows: `%APPDATA%\Roblox\logs`
- Console output in terminal/command prompt

## Performance Optimization

### System Requirements
- **RAM**: 4GB minimum, 8GB recommended
- **CPU**: Multi-core processor recommended
- **Storage**: 1GB free space for instances

### Resource Management
- Monitor CPU/Memory usage per instance
- Limit concurrent instances based on system specs
- Close unused instances to free resources

## Security Considerations

### Authentication
- Never share .ROBLOSECURITY cookies
- Use separate cookies for each account
- Cookies are stored in memory only

### Process Isolation
- Each instance runs in separate process
- No shared memory between instances
- Clean shutdown prevents data corruption

## Support

### Getting Help
1. Check troubleshooting section
2. Review console logs for errors
3. Verify system requirements
4. Test with single instance first

### Known Limitations
- UWP features Windows-only
- Some games may detect multiple instances
- Performance depends on system specifications
- Requires Roblox to be installed locally

## Updates

### Updating the Application
1. Download latest release package
2. Replace old files with new ones
3. Restart application
4. Check for Roblox updates

### Staying Current
- Monitor Roblox client updates
- Check for compatibility issues
- Update Node.js as needed
