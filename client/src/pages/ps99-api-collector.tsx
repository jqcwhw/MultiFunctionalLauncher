import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Database, Server, Zap, TrendingUp, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Ps99ApiData {
  id: number;
  endpoint: string;
  data: any;
  lastUpdated: string;
}

export default function Ps99ApiCollector() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCollecting, setIsCollecting] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState("pets");

  const { data: apiData = [], isLoading } = useQuery<Ps99ApiData[]>({
    queryKey: ["/api/ps99/api-data"],
  });

  const collectApiDataMutation = useMutation({
    mutationFn: (data: any) => apiRequest("/api/ps99/api-data", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ps99/api-data"] });
      toast({
        title: "API Data Collected",
        description: "Successfully collected and stored PS99 API data!",
      });
    },
    onError: () => {
      toast({
        title: "Collection Failed",
        description: "Failed to collect API data",
        variant: "destructive",
      });
    },
  });

  const collectData = async (endpoint: string) => {
    setIsCollecting(true);
    
    // Simulate API data collection based on PS99_API_Enhanced_Collector.js
    const mockApiData = {
      pets: {
        totalPets: 1247,
        rarities: { Common: 654, Uncommon: 321, Rare: 178, Epic: 67, Legendary: 27 },
        topPets: [
          { name: "Huge Hell Rock", damage: "2.5T - 4.6T", rarity: "Legendary" },
          { name: "Huge Doodle Cat", damage: "1.8T - 3.2T", rarity: "Legendary" },
          { name: "Rainbow Griffin", damage: "890B - 1.6T", rarity: "Epic" },
        ]
      },
      eggs: {
        totalEggs: 156,
        worlds: ["Overworld", "Fantasy", "Tech", "Axolotl Ocean", "Void"],
        priceRange: { min: 650, max: 75000000 },
        currentEvent: "Bench a Gargantuan Event"
      },
      currencies: {
        coins: { symbol: "💰", maxValue: "999T" },
        diamonds: { symbol: "💎", maxValue: "999T" },
        tokens: { symbol: "🎫", maxValue: "999M" }
      },
      items: {
        totalItems: 423,
        categories: ["Potions", "Enchants", "Charms", "Boosts", "Keys"],
        exclusives: 47
      }
    };

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const apiDataPayload = {
      endpoint,
      data: mockApiData[endpoint as keyof typeof mockApiData] || { error: "Unknown endpoint" },
    };

    collectApiDataMutation.mutate(apiDataPayload);
    setIsCollecting(false);
  };

  const formatLastUpdated = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const ps99Endpoints = [
    { id: "pets", name: "Pets", icon: "🐾", description: "All pet data and rarities" },
    { id: "eggs", name: "Eggs", icon: "🥚", description: "Egg information and pricing" },
    { id: "currencies", name: "Currencies", icon: "💰", description: "Game currency data" },
    { id: "items", name: "Items", icon: "🎒", description: "Items, potions, and boosts" },
  ];

  const getEndpointData = (endpoint: string) => {
    return apiData.find(item => item.endpoint === endpoint);
  };

  const calculateCollectionHealth = () => {
    const total = ps99Endpoints.length;
    const collected = apiData.length;
    const recentlyUpdated = apiData.filter(item => {
      const hoursSinceUpdate = (Date.now() - new Date(item.lastUpdated).getTime()) / (1000 * 60 * 60);
      return hoursSinceUpdate < 24;
    }).length;
    
    return {
      coverage: (collected / total) * 100,
      freshness: collected > 0 ? (recentlyUpdated / collected) * 100 : 0,
    };
  };

  const health = calculateCollectionHealth();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">PS99 API Collector</h1>
          <p className="text-muted-foreground">Automated collection and monitoring of Pet Simulator 99 API data</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">API Endpoints</div>
          <div className="text-2xl font-bold">{apiData.length}/{ps99Endpoints.length}</div>
        </div>
      </div>

      {/* Collection Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-sm font-medium">Data Coverage</div>
                <div className="text-2xl font-bold">{Math.round(health.coverage)}%</div>
                <Progress value={health.coverage} className="h-2 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-sm font-medium">Data Freshness</div>
                <div className="text-2xl font-bold">{Math.round(health.freshness)}%</div>
                <Progress value={health.freshness} className="h-2 mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-sm font-medium">Collection Status</div>
                <div className="text-lg font-bold">
                  {isCollecting ? "Collecting..." : "Ready"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="endpoints" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
          <TabsTrigger value="data">Collected Data</TabsTrigger>
        </TabsList>

        <TabsContent value="endpoints" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ps99Endpoints.map((endpoint) => {
              const data = getEndpointData(endpoint.id);
              const hasData = !!data;
              
              return (
                <Card key={endpoint.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <span className="text-2xl">{endpoint.icon}</span>
                        <span>{endpoint.name}</span>
                      </CardTitle>
                      <Badge variant={hasData ? "default" : "secondary"}>
                        {hasData ? "Collected" : "Pending"}
                      </Badge>
                    </div>
                    <CardDescription>{endpoint.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {hasData && (
                      <div className="text-sm text-muted-foreground">
                        Last updated: {formatLastUpdated(data.lastUpdated)}
                      </div>
                    )}
                    
                    <Button
                      onClick={() => collectData(endpoint.id)}
                      disabled={isCollecting}
                      className="w-full"
                    >
                      {isCollecting && selectedEndpoint === endpoint.id ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Collecting...
                        </>
                      ) : (
                        <>
                          <Server className="h-4 w-4 mr-2" />
                          {hasData ? "Update Data" : "Collect Data"}
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="data" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {apiData.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Server className="h-5 w-5" />
                      <span className="capitalize">{item.endpoint} API Data</span>
                    </CardTitle>
                    <Badge variant="outline">
                      Updated {formatLastUpdated(item.lastUpdated)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted rounded-lg p-4 max-h-48 overflow-y-auto">
                    <pre className="text-sm whitespace-pre-wrap">
                      {JSON.stringify(item.data, null, 2)}
                    </pre>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => collectData(item.endpoint)}
                      disabled={isCollecting}
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Refresh
                    </Button>
                    <Button variant="outline" size="sm">
                      <Zap className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {apiData.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Database className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No API Data Collected</h3>
                <p className="text-muted-foreground">
                  Start collecting data from the API Endpoints tab to see results here!
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}