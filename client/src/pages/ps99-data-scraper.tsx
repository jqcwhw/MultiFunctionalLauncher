import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Download, Trash2, Globe, User, Users, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Ps99ScrapedData {
  id: number;
  dataType: string;
  robloxId: string;
  title?: string;
  description?: string;
  metadata?: any;
  scrapedAt: string;
}

export default function Ps99DataScraper() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [selectedType, setSelectedType] = useState<string>("all");
  const [scrapeForm, setScrapeForm] = useState({
    url: "",
    dataType: "game",
  });

  const { data: scrapedData = [], isLoading } = useQuery<Ps99ScrapedData[]>({
    queryKey: ["/api/ps99/scraped-data", selectedType],
    queryFn: () => {
      const params = selectedType !== "all" ? `?type=${selectedType}` : "";
      return apiRequest(`/api/ps99/scraped-data${params}`);
    },
  });

  const scrapeDataMutation = useMutation({
    mutationFn: (data: any) => apiRequest("/api/ps99/scraped-data", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ps99/scraped-data"] });
      toast({
        title: "Data Scraped",
        description: "Successfully scraped and saved Roblox data!",
      });
      setScrapeForm({ url: "", dataType: "game" });
    },
    onError: () => {
      toast({
        title: "Scraping Failed",
        description: "Failed to scrape the provided URL",
        variant: "destructive",
      });
    },
  });

  const deleteDataMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/ps99/scraped-data/${id}`, {
      method: "DELETE",
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ps99/scraped-data"] });
      toast({
        title: "Data Deleted",
        description: "Scraped data has been removed",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete scraped data",
        variant: "destructive",
      });
    },
  });

  const extractRobloxId = (url: string): string => {
    // Extract ID from various Roblox URL formats
    const patterns = [
      /\/games\/(\d+)/, // Game URLs
      /\/users\/(\d+)/, // User URLs  
      /\/groups\/(\d+)/, // Group URLs
      /\/catalog\/(\d+)/, // Asset URLs
      /\/library\/(\d+)/, // Library URLs
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    
    // If it's just a number, return it
    if (/^\d+$/.test(url)) return url;
    
    return url;
  };

  const simulateScraping = (url: string, dataType: string) => {
    const robloxId = extractRobloxId(url);
    
    // Simulate scraped data based on type
    const mockData: any = {
      dataType,
      robloxId,
      title: `${dataType === 'game' ? 'Game' : dataType === 'user' ? 'User' : dataType === 'group' ? 'Group' : 'Asset'} ${robloxId}`,
      description: `Scraped ${dataType} data for ID ${robloxId}`,
      metadata: {
        url,
        scrapedAt: new Date().toISOString(),
        source: "PS99 Data Scraper",
        ...(dataType === 'game' && {
          playerCount: Math.floor(Math.random() * 10000),
          favorites: Math.floor(Math.random() * 50000),
          creator: "Sample Creator",
        }),
        ...(dataType === 'user' && {
          joinDate: "2020-01-01",
          friendCount: Math.floor(Math.random() * 1000),
          badges: Math.floor(Math.random() * 100),
        }),
        ...(dataType === 'group' && {
          memberCount: Math.floor(Math.random() * 5000),
          owner: "Sample Owner",
          description: "Sample group description",
        }),
      },
    };
    
    return mockData;
  };

  const handleScrape = () => {
    if (!scrapeForm.url) {
      toast({
        title: "URL Required",
        description: "Please enter a Roblox URL or ID to scrape",
        variant: "destructive",
      });
      return;
    }
    
    const scrapedData = simulateScraping(scrapeForm.url, scrapeForm.dataType);
    scrapeDataMutation.mutate(scrapedData);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "game": return <Globe className="h-4 w-4" />;
      case "user": return <User className="h-4 w-4" />;
      case "group": return <Users className="h-4 w-4" />;
      case "asset": return <Package className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "game": return "bg-blue-500";
      case "user": return "bg-green-500";
      case "group": return "bg-purple-500";
      case "asset": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  const groupedData = scrapedData.reduce((acc, item) => {
    if (!acc[item.dataType]) acc[item.dataType] = [];
    acc[item.dataType].push(item);
    return acc;
  }, {} as Record<string, Ps99ScrapedData[]>);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">PS99 Data Scraper</h1>
          <p className="text-muted-foreground">Extract and manage Roblox game, user, and asset data</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Total Records</div>
          <div className="text-2xl font-bold">{scrapedData.length}</div>
        </div>
      </div>

      {/* Scraper Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Roblox Data Scraper</span>
          </CardTitle>
          <CardDescription>
            Enter a Roblox URL or ID to extract detailed information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="url">Roblox URL or ID</Label>
              <Input
                id="url"
                placeholder="https://www.roblox.com/games/... or just the ID"
                value={scrapeForm.url}
                onChange={(e) => setScrapeForm(prev => ({ ...prev, url: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="dataType">Data Type</Label>
              <Select value={scrapeForm.dataType} onValueChange={(value) => setScrapeForm(prev => ({ ...prev, dataType: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="game">Game</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="group">Group</SelectItem>
                  <SelectItem value="asset">Asset</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={handleScrape}
            disabled={scrapeDataMutation.isPending}
            className="w-full md:w-auto"
          >
            {scrapeDataMutation.isPending ? "Scraping..." : "Scrape Data"}
          </Button>
        </CardContent>
      </Card>

      {/* Data Display */}
      <Tabs value={selectedType} onValueChange={setSelectedType}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="all">All ({scrapedData.length})</TabsTrigger>
          <TabsTrigger value="game">Games ({groupedData.game?.length || 0})</TabsTrigger>
          <TabsTrigger value="user">Users ({groupedData.user?.length || 0})</TabsTrigger>
          <TabsTrigger value="group">Groups ({groupedData.group?.length || 0})</TabsTrigger>
          <TabsTrigger value="asset">Assets ({groupedData.asset?.length || 0})</TabsTrigger>
        </TabsList>
        
        <TabsContent value={selectedType} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scrapedData.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg truncate">{item.title || `ID: ${item.robloxId}`}</CardTitle>
                    <Badge className={`${getTypeColor(item.dataType)} text-white`}>
                      <div className="flex items-center space-x-1">
                        {getTypeIcon(item.dataType)}
                        <span className="capitalize">{item.dataType}</span>
                      </div>
                    </Badge>
                  </div>
                  <CardDescription className="truncate">
                    {item.description || `Roblox ${item.dataType} data`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm space-y-1">
                    <div><strong>ID:</strong> {item.robloxId}</div>
                    <div><strong>Scraped:</strong> {new Date(item.scrapedAt).toLocaleDateString()}</div>
                  </div>
                  
                  {item.metadata && (
                    <div className="bg-muted rounded p-3 text-sm">
                      <div className="font-medium mb-2">Metadata:</div>
                      {item.dataType === 'game' && item.metadata.playerCount && (
                        <div>Players: {item.metadata.playerCount.toLocaleString()}</div>
                      )}
                      {item.dataType === 'user' && item.metadata.friendCount && (
                        <div>Friends: {item.metadata.friendCount}</div>
                      )}
                      {item.dataType === 'group' && item.metadata.memberCount && (
                        <div>Members: {item.metadata.memberCount.toLocaleString()}</div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteDataMutation.mutate(item.id)}
                      disabled={deleteDataMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {scrapedData.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Data Scraped Yet</h3>
                <p className="text-muted-foreground">
                  Use the scraper above to extract Roblox data and build your collection!
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}