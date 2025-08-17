import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import Sidebar from '@/components/sidebar';
import Dashboard from '@/pages/dashboard';
import Accounts from '@/pages/accounts';
import Instances from '@/pages/instances';
import Settings from '@/pages/settings';
import RobloxProcesses from '@/pages/roblox-processes';
import ProvenMultiInstance from '@/pages/proven-multi-instance';
import EnhancedSystem from '@/pages/enhanced-system';
import SyncManager from '@/pages/sync-manager';
import UwpInstances from '@/pages/uwp-instances';
import RealLauncher from '@/pages/real-launcher';
import NotFound from '@/pages/not-found';
import Ps99LiveGameplay from '@/pages/ps99-live-gameplay';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <div className="flex min-h-screen bg-background">
            <Sidebar />
            <main className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/instances" element={<Instances />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/roblox-processes" element={<RobloxProcesses />} />
                <Route path="/proven-multi-instance" element={<ProvenMultiInstance />} />
                <Route path="/enhanced-system" element={<EnhancedSystem />} />
                <Route path="/sync-manager" element={<SyncManager />} />
                <Route path="/uwp-instances" element={<UwpInstances />} />
                <Route path="/real-launcher" element={<RealLauncher />} />
                <Route path="/ps99-live-gameplay" element={<Ps99LiveGameplay />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
          <Toaster />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;