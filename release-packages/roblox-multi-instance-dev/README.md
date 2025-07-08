# Roblox Multi-Instance Manager

A comprehensive desktop application for managing multiple Roblox instances with advanced synchronization capabilities.

## ⚠️ Important Notice

This application is designed for educational and development purposes. Please ensure you comply with Roblox's Terms of Service when using this software. The developers are not responsible for any account actions taken by Roblox.

## ✨ Features

### 🛡️ UWP Multi-Instance Technology
- **Undetected Instance Creation**: Uses UWP package cloning for stealth operation
- **Resource Management**: Intelligent CPU/GPU monitoring to prevent system overload
- **Automatic Window Organization**: Smart positioning to prevent overlap
- **Administrator Integration**: Seamless privilege escalation for UWP operations

### 🔄 Account Synchronization
- **Real-time Action Mirroring**: One account controls multiple instances
- **Recording & Playback**: Record action sequences for later automation
- **Multiple Sync Modes**: Mirror, Follow, and Coordinate modes
- **Customizable Delays**: Fine-tune synchronization timing

### 📊 Advanced Monitoring
- **Live Resource Tracking**: Real-time CPU, memory, and GPU usage
- **Instance Health Monitoring**: Process tracking and status updates
- **Activity Logging**: Comprehensive logging system
- **Performance Optimization**: Automatic resource constraint enforcement

### 🎮 Enhanced Account Management
- **Secure Token Storage**: Encrypted .ROBLOSECURITY cookie management
- **Account Assignment**: Link specific accounts to instances
- **Auto-Authentication**: Seamless login across instances
- **Premium Account Support**: Enhanced features for premium accounts

## 🚀 Quick Start

### Prerequisites
- Windows 10/11 (UWP support required)
- Administrator privileges (for UWP package management)
- Roblox UWP application installed from Microsoft Store
- Node.js 18+ (for development)

### Installation

1. **Download the latest release** from the [Releases](../../releases) page
2. **Run as Administrator** - Right-click the installer and select "Run as administrator"
3. **Follow the installation wizard**
4. **Launch the application** from the desktop shortcut

### First Time Setup

1. **Administrator Rights**: The application will prompt for administrator privileges
2. **Developer Mode**: Windows Developer Mode will be automatically enabled
3. **Roblox Detection**: The app will scan for your Roblox UWP installation
4. **Instance Creation**: Create your first UWP instance with a custom name

## 📖 User Guide

### Creating UWP Instances

1. Navigate to **UWP Instances** in the sidebar
2. Click **Create Instance**
3. Enter a unique name (e.g., "MainAccount", "AltAccount1")
4. Optionally assign an account from your account list
5. Click **Create Instance**

The application will:
- Clone the Roblox UWP package
- Modify the manifest for unique identity
- Register the new package with Windows
- Add the instance to your management dashboard

### Account Synchronization

1. Go to **Sync Manager**
2. Select a **Master Instance** (the one you'll control)
3. Choose **Slave Instances** (the ones that will mirror actions)
4. Configure sync mode and delay
5. Click **Create Sync**

#### Sync Modes:
- **Mirror**: Exact replication of all actions
- **Follow**: Smart following with intelligent delays
- **Coordinate**: Team-based coordination mode

### Recording & Playback

1. **Start Recording** on any running instance
2. **Perform actions** in the Roblox game
3. **Stop Recording** to save the sequence
4. **Select target instances** for playback
5. **Play back** the recorded sequence

## 🛠️ Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/your-username/roblox-multi-instance-manager.git
cd roblox-multi-instance-manager

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Package for distribution
npm run electron:build
```

### Architecture

The application follows a modern full-stack architecture:

- **Frontend**: React 18 with TypeScript and Tailwind CSS
- **Backend**: Node.js with Express API
- **Database**: PostgreSQL with Drizzle ORM
- **Desktop**: Electron with native Windows integration
- **UWP Management**: PowerShell and Windows API integration

### Key Components

- `server/uwp-instance-manager.ts`: Core UWP instance management
- `server/account-sync-manager.ts`: Real-time action synchronization
- `client/src/pages/uwp-instances.tsx`: Instance management UI
- `client/src/pages/sync-manager.tsx`: Synchronization interface

## 🔧 Configuration

### Environment Variables

```env
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=production
PORT=5000
```

### System Requirements

**Minimum:**
- Windows 10 version 1903 or later
- 4GB RAM
- 2GB free disk space
- DirectX 11 compatible graphics

**Recommended:**
- Windows 11
- 8GB+ RAM
- SSD storage
- Dedicated graphics card

## 📋 Troubleshooting

### Common Issues

**"Administrator rights required" error:**
- Right-click the application and select "Run as administrator"
- Ensure User Account Control (UAC) is enabled

**"Roblox UWP not found" error:**
- Install Roblox from the Microsoft Store (not the web version)
- Ensure the UWP version is properly installed

**Instance creation fails:**
- Check that Windows Developer Mode is enabled
- Verify sufficient disk space for instance cloning
- Ensure antivirus isn't blocking file operations

**Sync not working:**
- Confirm both instances are running and visible
- Check that AutoHotkey is installed (for advanced features)
- Verify instance windows are not minimized

### Performance Optimization

- **Limit concurrent instances** based on your hardware
- **Use lower sync delays** only on powerful systems
- **Close unnecessary instances** when not in use
- **Monitor resource usage** in the System Resources panel

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚖️ Legal Disclaimer

This software is provided for educational and development purposes only. Users are responsible for ensuring their usage complies with:

- Roblox Terms of Service
- Local laws and regulations
- Platform guidelines and policies

The developers do not endorse or encourage any activities that violate terms of service or applicable laws.

## 🙏 Acknowledgments

- **UWP_MultiPlatform** project for the core multi-instance technique
- **Roblox API** documentation and community resources
- **Electron** and **React** communities for excellent documentation
- **All contributors** who helped improve this project

## 📞 Support

- **GitHub Issues**: Report bugs and request features
- **Discussions**: Community support and questions
- **Wiki**: Detailed documentation and guides

---

**Note**: This application requires administrator privileges for UWP package management. It does not modify Roblox game files or interfere with game integrity. All instance management is done through official Windows UWP APIs.