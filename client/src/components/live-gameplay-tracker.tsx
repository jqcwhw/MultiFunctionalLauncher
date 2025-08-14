
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Activity, 
  Coins, 
  Diamond, 
  GamepadIcon, 
  Users, 
  TrendingUp,
  Clock,
  Star,
  Target
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface PetData {
  id: string;
  name: string;
  rarity: string;
  type: string;
  damage: number;
  agility: number;
  enchantments?: string[];
  isShiny?: boolean;
  isRainbow?: boolean;
  level: number;
  locked: boolean;
}

interface PlayerData {
  username: string;
  userId: number;
  coins: number;
  diamonds: number;
  pets: PetData[];
  gameStats: {
    totalHatches: number;
    rareHatches: number;
    playtime: number;
    currentZone: string;
  };
}

interface RobloxProcess {
  pid: number;
  windowHandle: string;
  processName: string;
  windowTitle: string;
  username?: string;
  gameId?: string;
  status: string;
  resourceUsage: {
    cpu: number;
    memory: number;
    gpu: number;
  };
}

export function LiveGameplayTracker() {
  const [isTracking, setIsTracking] = useState(false);
  const [selectedUsernames, setSelectedUsernames] = useState<string[]>([]);
  const { toast } = useToast();

  // Fetch Roblox processes
  const { data: processes = [], refetch: refetchProcesses } = useQuery<RobloxProcess[]>({
    queryKey: ["/api/roblox/processes"],
    refetchInterval: 2000,
  });

  // Fetch player data from Big Games API
  const { data: playersData = [], refetch: refetchPlayers } = useQuery<PlayerData[]>({
    queryKey: ["/api/biggames/all-players"],
    refetchInterval: isTracking ? 5000 : false,
    enabled: isTracking,
  });

  // Auto-select usernames from detected processes
  useEffect(() => {
    const detectedUsernames = processes
      .filter(p => p.username && p.gameId === '2316994391')
      .map(p => p.username!)
      .filter((username, index, self) => self.indexOf(username) === index);
    
    if (detectedUsernames.length > 0 && selectedUsernames.length === 0) {
      setSelectedUsernames(detectedUsernames);
    }
  }, [processes]);

  const startTracking = async () => {
    if (selectedUsernames.length === 0) {
      toast({
        title: "No Users Selected",
        description: "Please select usernames to track",
        variant: "destructive",
      });
      return;
    }

    try {
      await apiRequest("POST", "/api/biggames/start-tracking", {
        usernames: selectedUsernames
      });
      
      setIsTracking(true);
      toast({
        title: "Tracking Started",
        description: `Now tracking ${selectedUsernames.length} players`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start tracking",
        variant: "destructive",
      });
    }
  };

  const stopTracking = async () => {
    try {
      await apiRequest("POST", "/api/biggames/stop-tracking");
      setIsTracking(false);
      toast({
        title: "Tracking Stopped",
        description: "Live gameplay tracking has been stopped",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to stop tracking",
        variant: "destructive",
      });
    }
  };

  const getRarityColor = (rarity: string) => {
    const colors = {
      'Common': 'bg-gray-500',
      'Uncommon': 'bg-green-500',
      'Rare': 'bg-blue-500',
      'Epic': 'bg-purple-500',
      'Legendary': 'bg-yellow-500',
      'Mythical': 'bg-red-500'
    };
    return colors[rarity as keyof typeof colors] || 'bg-gray-500';
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="flex flex-col h-full p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Live Gameplay Tracker</h1>
          <p className="text-gray-600">Real-time Pet Simulator 99 tracking with Big Games API</p>
        </div>
        <div className="flex space-x-2">
          {!isTracking ? (
            <Button onClick={startTracking} disabled={selectedUsernames.length === 0}>
              <Activity className="h-4 w-4 mr-2" />
              Start Tracking
            </Button>
          ) : (
            <Button onClick={stopTracking} variant="destructive">
              <Activity className="h-4 w-4 mr-2" />
              Stop Tracking
            </Button>
          )}
        </div>
      </div>

      {/* Process Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <GamepadIcon className="h-5 w-5 mr-2" />
            Detected Roblox Processes
          </CardTitle>
          <CardDescription>
            Currently running Pet Simulator 99 instances
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {processes.filter(p => p.gameId === '2316994391' || p.windowTitle.includes('Pet Simulator')).map((process) => (
              <Card key={process.pid} className="border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={process.status === 'linked' ? 'default' : 'secondary'}>
                      {process.status}
                    </Badge>
                    <span className="text-sm text-gray-500">PID: {process.pid}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">{process.username || 'Unknown User'}</p>
                    <p className="text-sm text-gray-600">{process.windowTitle}</p>
                    <div className="flex space-x-4 text-xs text-gray-500">
                      <span>CPU: {process.resourceUsage.cpu.toFixed(1)}%</span>
                      <span>RAM: {process.resourceUsage.memory}MB</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Data Tabs */}
      {isTracking && playersData.length > 0 && (
        <Tabs defaultValue="overview" className="flex-1">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pets">Pet Collection</TabsTrigger>
            <TabsTrigger value="stats">Game Stats</TabsTrigger>
            <TabsTrigger value="activity">Activity Feed</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {playersData.map((player) => (
                <Card key={player.username}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{player.username}</CardTitle>
                    <CardDescription>Zone: {player.gameStats.currentZone}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Coins className="h-4 w-4 mr-1 text-yellow-500" />
                        <span className="text-sm">Coins</span>
                      </div>
                      <span className="font-medium">{formatNumber(player.coins)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Diamond className="h-4 w-4 mr-1 text-blue-500" />
                        <span className="text-sm">Diamonds</span>
                      </div>
                      <span className="font-medium">{formatNumber(player.diamonds)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-green-500" />
                        <span className="text-sm">Pets</span>
                      </div>
                      <span className="font-medium">{player.pets.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Target className="h-4 w-4 mr-1 text-purple-500" />
                        <span className="text-sm">Hatches</span>
                      </div>
                      <span className="font-medium">{formatNumber(player.gameStats.totalHatches)}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pets" className="space-y-4">
            {playersData.map((player) => (
              <Card key={player.username}>
                <CardHeader>
                  <CardTitle>{player.username}'s Pet Collection</CardTitle>
                  <CardDescription>{player.pets.length} pets collected</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {player.pets.map((pet) => (
                        <div key={pet.id} className="border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{pet.name}</span>
                            <div className="flex space-x-1">
                              {pet.isShiny && <Badge variant="secondary" className="text-xs">Shiny</Badge>}
                              {pet.isRainbow && <Badge variant="secondary" className="text-xs">Rainbow</Badge>}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <Badge className={`text-xs ${getRarityColor(pet.rarity)}`}>
                              {pet.rarity}
                            </Badge>
                            <div className="text-sm text-gray-600">
                              <p>Level {pet.level}</p>
                              <p>Damage: {formatNumber(pet.damage)}</p>
                              <p>Agility: {formatNumber(pet.agility)}</p>
                              {pet.enchantments && pet.enchantments.length > 0 && (
                                <p>Enchants: {pet.enchantments.join(', ')}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            {playersData.map((player) => (
              <Card key={player.username}>
                <CardHeader>
                  <CardTitle>{player.username}'s Game Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{formatNumber(player.gameStats.totalHatches)}</div>
                      <div className="text-sm text-gray-600">Total Hatches</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{player.gameStats.rareHatches}</div>
                      <div className="text-sm text-gray-600">Rare Hatches</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{player.gameStats.playtime}h</div>
                      <div className="text-sm text-gray-600">Playtime</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{player.gameStats.currentZone}</div>
                      <div className="text-sm text-gray-600">Current Zone</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Rare Hatch Rate</span>
                      <span>{((player.gameStats.rareHatches / player.gameStats.totalHatches) * 100).toFixed(2)}%</span>
                    </div>
                    <Progress value={(player.gameStats.rareHatches / player.gameStats.totalHatches) * 100} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Live Activity Feed
                </CardTitle>
                <CardDescription>Real-time game events and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-3">
                    {playersData.map((player) => (
                      <div key={player.username} className="border-l-4 border-blue-500 pl-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{player.username}</span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            Just now
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Currently in {player.gameStats.currentZone} with {player.pets.length} pets
                        </p>
                        <div className="flex space-x-4 text-xs text-gray-500 mt-1">
                          <span>{formatNumber(player.coins)} coins</span>
                          <span>{formatNumber(player.diamonds)} diamonds</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
