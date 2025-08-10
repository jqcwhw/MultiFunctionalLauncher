import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/sidebar";
import Dashboard from "@/pages/dashboard";
import Accounts from "@/pages/accounts";
import Instances from "@/pages/instances";
import UWPInstances from "@/pages/uwp-instances";
import RobloxProcesses from "@/pages/roblox-processes";
import SyncManager from "@/pages/sync-manager";
import EnhancedSystem from "@/pages/enhanced-system";
import ProvenMultiInstance from "@/pages/proven-multi-instance";
import RealLauncher from "@/pages/real-launcher";
import Ps99PetSimulator from "@/pages/ps99-pet-simulator";
import Ps99DataScraper from "@/pages/ps99-data-scraper";
import Ps99ActionRecorder from "@/pages/ps99-action-recorder";
import Ps99ApiCollector from "@/pages/ps99-api-collector";
import Ps99BoostScheduler from "@/pages/ps99-boost-scheduler";
import Ps99MacroManager from "@/pages/ps99-macro-manager";
import Ps99PerformanceOptimizer from "@/pages/ps99-performance-optimizer";
import Ps99ValueTracker from "@/pages/ps99-value-tracker";
import Ps99EnhancementOverview from "@/pages/ps99-enhancement-overview";
import Ps99DeveloperTracking from "@/pages/ps99-developer-tracking";
import Settings from "@/pages/settings";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/accounts" component={Accounts} />
          <Route path="/instances" component={Instances} />
          <Route path="/uwp-instances" component={UWPInstances} />
          <Route path="/roblox-processes" component={RobloxProcesses} />
          <Route path="/sync-manager" component={SyncManager} />
          <Route path="/enhanced-system" component={EnhancedSystem} />
          <Route path="/proven-multi-instance" component={ProvenMultiInstance} />
          <Route path="/real-launcher" component={RealLauncher} />
          <Route path="/ps99-pet-simulator" component={Ps99PetSimulator} />
          <Route path="/ps99-data-scraper" component={Ps99DataScraper} />
          <Route path="/ps99-action-recorder" component={Ps99ActionRecorder} />
          <Route path="/ps99-api-collector" component={Ps99ApiCollector} />
          <Route path="/ps99-boost-scheduler" component={Ps99BoostScheduler} />
          <Route path="/ps99-macro-manager" component={Ps99MacroManager} />
          <Route path="/ps99-performance-optimizer" component={Ps99PerformanceOptimizer} />
          <Route path="/ps99-value-tracker" component={Ps99ValueTracker} />
          <Route path="/ps99-enhancement-overview" component={Ps99EnhancementOverview} />
          <Route path="/ps99-developer-tracking" component={Ps99DeveloperTracking} />
          <Route path="/settings" component={Settings} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
