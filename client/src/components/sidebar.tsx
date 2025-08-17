
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Users, 
  Server, 
  Settings, 
  Monitor, 
  Zap, 
  Shield, 
  Sync, 
  Package, 
  Rocket,
  GamePad2
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Accounts', href: '/accounts', icon: Users },
  { name: 'Instances', href: '/instances', icon: Server },
  { name: 'Roblox Processes', href: '/roblox-processes', icon: Monitor },
  { name: 'Proven Multi-Instance', href: '/proven-multi-instance', icon: Zap },
  { name: 'Enhanced System', href: '/enhanced-system', icon: Shield },
  { name: 'Sync Manager', href: '/sync-manager', icon: Sync },
  { name: 'UWP Instances', href: '/uwp-instances', icon: Package },
  { name: 'Real Launcher', href: '/real-launcher', icon: Rocket },
  { name: 'PS99 Live Gameplay', href: '/ps99-live-gameplay', icon: GamePad2 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex flex-col w-64 bg-card border-r">
      <div className="flex items-center justify-center h-16 border-b">
        <h1 className="text-xl font-bold">Roblox Manager</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
