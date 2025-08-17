
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, GamePad2, Zap, Trophy, Coins, Diamond, Eye, Play, Pause } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Ps99Pet {
  id: string;
  name: string;
  rarity: string;
  category: string;
  thumbnail: string;
}

interface Ps99Egg {
  id: string;
  name: string;
  cost: number;
  currency: string;
  thumbnail: string;
}

interface GameplayEvent {
  type: string;
  timestamp: string;
  playerId: string;
  data: any;
}

interface RobloxGameClient {
  pid: number;
  windowHandle: string;
  username?: string;
  isPs99: boolean;
  gameData: {
    currentArea?: string;
    coins?: number;
    diamonds?: number;
    pets?: Ps99Pet[];
    lastHatch?: {
      egg: string;
      pets: Ps99Pet[];
      timestamp: string;
    };
  };
}

export default function Ps99LiveGameplay() {
  const { toast } = useToast();
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [recentEvents, setRecentEvents] = useState<GameplayEvent[]>([]);

  const { data: clients = [], isLoading, refetch } = useQuery<RobloxGameClient[]>({
    queryKey: ["/api/ps99/active-clients"],
    refetchInterval: isMonitoring ? 2000 : false,
  });

  const { data: apiData } = useQuery({
    queryKey: ["/api/ps99/api-data"],
  });

  const { data: gameplayEvents = [] } = useQuery<GameplayEvent[]>({
    queryKey: ["/api/ps99/gameplay-events"],
    refetchInterval: isMonitoring ? 1000 : false,
  });

  useEffect(() => {
    if (gameplayEvents.length > recentEvents.length) {
      const newEvents = gameplayEvents.slice(recentEvents.length);
      setRecentEvents(gameplayEvents.slice(-10)); // Keep last 10 events
      
      // Show toast for new hatch events
      newEvents.forEach(event => {
        if (event.type === 'hatch') {
          toast({
            title: "New Hatch Detected!",
            description: `${event.playerId} hatched ${event.data.pets?.length || 1} pet(s) from ${event.data.egg?.name}`,
          });
        }
      });
    }
  }, [gameplayEvents, recentEvents.length, toast]);

  const startMonitoring = async () => {
    try {
      await apiRequest("/api/ps99/start-monitoring", {
        method: "POST",
      });
      setIsMonitoring(true);
      toast({
        title: "Monitoring Started",
        description: "Now monitoring Pet Simulator 99 game clients for real-time events",
      });
    } catch (error) {
      toast({
        title: "Failed to Start Monitoring",
        description: "Could not start game monitoring",
        variant: "destructive",
      });
    }
  };

  const stopMonitoring = async () => {
    try {
      await apiRequest("/api/ps99/stop-monitoring", {
        method: "POST",
      });
      setIsMonitoring(false);
      toast({
        title: "Monitoring Stopped",
        description: "Game monitoring has been stopped",
      });
    } catch (error) {
      toast({
        title: "Failed to Stop Monitoring",
        description: "Could not stop game monitoring",
        variant: "destructive",
      });
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity?.toLowerCase()) {
      case 'legendary': return 'bg-yellow-500';
      case 'epic': return 'bg-purple-500';
      case 'rare': return 'bg-blue-500';
      case 'uncommon': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toString();
  };

  const selectedClientData = selectedClient ? clients.find(c => c.pid === selectedClient) : null;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Pet Simulator 99 - Live Gameplay</h1>
          <p className="text-muted-foreground">Real-time monitoring of actual Roblox game clients</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={isMonitoring ? stopMonitoring : startMonitoring}
            variant={isMonitoring ? "destructive" : "default"}
          >
            {isMonitoring ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Stop Monitoring
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start Monitoring
              </>
            )}
          </Button>
          <Button onClick={() => refetch()} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Monitoring Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className={`h-5 w-5 ${isMonitoring ? 'text-green-500' : 'text-gray-500'}`} />
              <div>
                <div className="text-sm font-medium">Monitoring Status</div>
                <div className="text-2xl font-bold">
                  {isMonitoring ? 'Active' : 'Inactive'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <GamePad2 className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-sm font-medium">Active Clients</div>
                <div className="text-2xl font-bold">{clients.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="text-sm font-medium">Recent Events</div>
                <div className="text-2xl font-bold">{recentEvents.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-sm font-medium">API Status</div>
                <div className="text-lg font-bold">
                  {apiData ? 'Connected' : 'Loading...'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="clients" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="clients">Game Clients</TabsTrigger>
          <TabsTrigger value="gameplay">Live Gameplay</TabsTrigger>
          <TabsTrigger value="events">Event Feed</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="clients" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map((client) => (
              <Card 
                key={client.pid} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedClient === client.pid ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedClient(client.pid)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <GamePad2 className="h-5 w-5" />
                      <span>{client.username || `Client ${client.pid}`}</span>
                    </CardTitle>
                    <Badge variant={client.isPs99 ? "default" : "secondary"}>
                      {client.isPs99 ? "PS99" : "Other"}
                    </Badge>
                  </div>
                  <CardDescription>PID: {client.pid} | Handle: {client.windowHandle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Coins className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">Coins:</span>
                    </div>
                    <span className="font-mono">{formatNumber(client.gameData.coins || 0)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Diamond className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Diamonds:</span>
                    </div>
                    <span className="font-mono">{formatNumber(client.gameData.diamonds || 0)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pets:</span>
                    <span className="font-mono">{client.gameData.pets?.length || 0}</span>
                  </div>

                  {client.gameData.currentArea && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Area:</span>
                      <Badge variant="outline">{client.gameData.currentArea}</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          {clients.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <GamePad2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Pet Simulator 99 Clients Detected</h3>
                <p className="text-muted-foreground">
                  Make sure Pet Simulator 99 is running in Roblox and monitoring is active.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="gameplay" className="space-y-4">
          {selectedClientData ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <GamePad2 className="h-5 w-5" />
                    <span>{selectedClientData.username || `Client ${selectedClientData.pid}`}</span>
                  </CardTitle>
                  <CardDescription>Real-time gameplay monitoring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedClientData.gameData.lastHatch && (
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">Latest Hatch Event</h4>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <strong>Egg:</strong> {selectedClientData.gameData.lastHatch.egg}
                        </p>
                        <p className="text-sm">
                          <strong>Time:</strong> {new Date(selectedClientData.gameData.lastHatch.timestamp).toLocaleTimeString()}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedClientData.gameData.lastHatch.pets.map((pet, index) => (
                            <Badge 
                              key={index} 
                              className={getRarityColor(pet.rarity)}
                            >
                              {pet.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">Pet Collection</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Total Pets:</span>
                          <span className="font-mono">{selectedClientData.gameData.pets?.length || 0}</span>
                        </div>
                        {selectedClientData.gameData.pets && selectedClientData.gameData.pets.length > 0 && (
                          <div className="max-h-32 overflow-y-auto">
                            {selectedClientData.gameData.pets.slice(-5).map((pet, index) => (
                              <div key={index} className="flex items-center justify-between text-sm">
                                <span>{pet.name}</span>
                                <Badge variant="outline" className={getRarityColor(pet.rarity)}>
                                  {pet.rarity}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-semibold mb-2">Resources</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Coins:</span>
                          <span className="font-mono text-yellow-600">
                            {formatNumber(selectedClientData.gameData.coins || 0)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Diamonds:</span>
                          <span className="font-mono text-blue-600">
                            {formatNumber(selectedClientData.gameData.diamonds || 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <GamePad2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a Game Client</h3>
                <p className="text-muted-foreground">
                  Choose a client from the Game Clients tab to view live gameplay data.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Event Feed</CardTitle>
              <CardDescription>Real-time gameplay events from all monitored clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {recentEvents.map((event, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={event.type === 'hatch' ? 'default' : 'secondary'}>
                        {event.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-sm">
                      <strong>{event.playerId}</strong>
                      {event.type === 'hatch' && (
                        <span>
                          {' '}hatched <strong>{event.data.pets?.length || 1}</strong> pet(s) from{' '}
                          <strong>{event.data.egg?.name}</strong>
                        </span>
                      )}
                    </div>
                    {event.data.pets && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {event.data.pets.map((pet: Ps99Pet, petIndex: number) => (
                          <Badge 
                            key={petIndex} 
                            variant="outline" 
                            className={getRarityColor(pet.rarity)}
                          >
                            {pet.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {recentEvents.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No events detected yet. Start monitoring to see live gameplay events!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>API Connection Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Eggs Database:</span>
                    <Badge variant={apiData?.eggs ? 'default' : 'destructive'}>
                      {apiData?.eggs || 0} entries
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Pets Database:</span>
                    <Badge variant={apiData?.pets ? 'default' : 'destructive'}>
                      {apiData?.pets || 0} entries
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>API Status:</span>
                    <Badge variant={apiData ? 'default' : 'destructive'}>
                      {apiData ? 'Connected' : 'Disconnected'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Events:</span>
                    <span className="font-mono">{gameplayEvents.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hatch Events:</span>
                    <span className="font-mono">
                      {gameplayEvents.filter(e => e.type === 'hatch').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Clients:</span>
                    <span className="font-mono">{clients.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
