import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  Monitor, 
  Users, 
  Settings, 
  Activity,
  GamepadIcon,
  Shield,
  Link2,
  Zap,
  Search,
  Rocket,
  Star,
  Database,
  Play,
  Server,
  Timer,
  MousePointer,
  Cpu,
  DollarSign,
  Layout,
  Network
} from "lucide-react";

const navigation = [
  {
    section: "Core Management",
    items: [
      { name: "Dashboard", href: "/", icon: Monitor },
      { name: "Accounts", href: "/accounts", icon: Users },
      { name: "Settings", href: "/settings", icon: Settings },
    ]
  },
  {
    section: "Multi-Instance System", 
    items: [
      { name: "Legacy Instances", href: "/instances", icon: GamepadIcon },
      { name: "UWP Instances", href: "/uwp-instances", icon: Shield },
      { name: "Enhanced System", href: "/enhanced-system", icon: Zap },
      { name: "Proven Multi-Instance", href: "/proven-multi-instance", icon: Shield },
      { name: "Real Launcher", href: "/real-launcher", icon: Rocket },
      { name: "Process Detection", href: "/roblox-processes", icon: Search },
      { name: "Sync Manager", href: "/sync-manager", icon: Link2 },
    ]
  },
  {
    section: "PS99 Gaming Hub",
    items: [
      { name: "Pet Simulator", href: "/ps99-pet-simulator", icon: Star },
      { name: "Data Scraper", href: "/ps99-data-scraper", icon: Database },
      { name: "Action Recorder", href: "/ps99-action-recorder", icon: Play },
      { name: "API Collector", href: "/ps99-api-collector", icon: Server },
    ]
  },
  {
    section: "PS99 Enhancement Tools",
    items: [
      { name: "Enhancement Overview", href: "/ps99-enhancement-overview", icon: Layout },
      { name: "Boost Scheduler", href: "/ps99-boost-scheduler", icon: Timer },
      { name: "Macro Manager", href: "/ps99-macro-manager", icon: MousePointer },
      { name: "Performance Optimizer", href: "/ps99-performance-optimizer", icon: Cpu },
      { name: "Value Tracker", href: "/ps99-value-tracker", icon: DollarSign },
      { name: "Developer Tracking", href: "/ps99-developer-tracking", icon: Network },
    ]
  },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <GamepadIcon className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">RobloxManager</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-6 overflow-y-auto">
        {navigation.map((section) => (
          <div key={section.section}>
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {section.section}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = location === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                      isActive
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <item.icon className="mr-3 h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Activity className="h-4 w-4" />
          <span>System Status: Online</span>
        </div>
      </div>
    </div>
  );
}