import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Minus, DollarSign, Trophy, Zap, Coins } from "lucide-react";

interface ValueItem {
  id: number;
  itemName: string;
  itemType: "pet" | "item" | "boost" | "currency";
  currentValue: string;
  previousValue: string;
  valueChange: string;
  lastUpdated: string;
  source: string;
  gameRegion?: string;
}

export default function PS99ValueTracker() {
  const [newItem, setNewItem] = useState({
    itemName: "",
    itemType: "pet" as const,
    currentValue: "",
    gameRegion: "Global",
  });

  // Mock data for development - replace with actual API call
  const { data: valueItems, isLoading } = useQuery({
    queryKey: ["/api/ps99/value-tracker"],
    initialData: [
      {
        id: 1,
        itemName: "Rainbow Unicorn",
        itemType: "pet",
        currentValue: "150000000",
        previousValue: "140000000",
        valueChange: "+7.14%",
        lastUpdated: "2025-01-08T10:30:00Z",
        source: "RoValra",
        gameRegion: "Global",
      },
      {
        id: 2,
        itemName: "Huge Cat",
        itemType: "pet",
        currentValue: "500000000",
        previousValue: "520000000",
        valueChange: "-3.85%",
        lastUpdated: "2025-01-08T10:25:00Z",
        source: "RoValra",
        gameRegion: "US-East",
      },
      {
        id: 3,
        itemName: "Super Lucky",
        itemType: "boost",
        currentValue: "25000",
        previousValue: "25000",
        valueChange: "0%",
        lastUpdated: "2025-01-08T10:20:00Z",
        source: "RoValra",
        gameRegion: "Global",
      },
      {
        id: 4,
        itemName: "Diamonds",
        itemType: "currency",
        currentValue: "1000000",
        previousValue: "950000",
        valueChange: "+5.26%",
        lastUpdated: "2025-01-08T10:15:00Z",
        source: "RoValra",
        gameRegion: "EU-West",
      }
    ] as ValueItem[]
  });

  const formatValue = (value: string) => {
    const num = parseInt(value);
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const getChangeIcon = (change: string) => {
    if (change.startsWith("+")) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change.startsWith("-")) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getChangeColor = (change: string) => {
    if (change.startsWith("+")) return "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950";
    if (change.startsWith("-")) return "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950";
    return "text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-950";
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pet":
        return <Trophy className="w-4 h-4" />;
      case "boost":
        return <Zap className="w-4 h-4" />;
      case "currency":
        return <Coins className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "pet":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "boost":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "currency":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    }
  };

  const handleAddItem = () => {
    if (!newItem.itemName || !newItem.currentValue) return;
    
    console.log("Adding value tracker item:", newItem);
    // API call to add new item
    
    // Reset form
    setNewItem({
      itemName: "",
      itemType: "pet",
      currentValue: "",
      gameRegion: "Global",
    });
  };

  const handleRefreshValues = () => {
    console.log("Refreshing all values...");
    // API call to refresh all values
  };

  const groupedItems = valueItems?.reduce((acc, item) => {
    if (!acc[item.itemType]) acc[item.itemType] = [];
    acc[item.itemType].push(item);
    return acc;
  }, {} as Record<string, ValueItem[]>);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <DollarSign className="w-8 h-8 text-green-500" />
        <div>
          <h1 className="text-3xl font-bold">PS99 Value Tracker</h1>
          <p className="text-muted-foreground">Real-time Pet Simulator 99 item values and trends (Inspired by RoValra)</p>
        </div>
        <Button onClick={handleRefreshValues} className="ml-auto">
          Refresh Values
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Value Overview</TabsTrigger>
          <TabsTrigger value="trending">Trending Items</TabsTrigger>
          <TabsTrigger value="add">Add Item</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {Object.entries(groupedItems || {}).map(([type, items]) => (
            <Card key={type}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 capitalize">
                  {getTypeIcon(type)}
                  {type}s
                  <Badge variant="secondary">{items.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold truncate">{item.itemName}</h4>
                        <Badge className={getTypeColor(item.itemType)}>
                          {getTypeIcon(item.itemType)}
                        </Badge>
                      </div>
                      
                      <div className="text-2xl font-bold text-green-600">
                        {formatValue(item.currentValue)}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className={`flex items-center gap-1 px-2 py-1 rounded text-sm ${getChangeColor(item.valueChange)}`}>
                          {getChangeIcon(item.valueChange)}
                          {item.valueChange}
                        </div>
                        {item.gameRegion && (
                          <Badge variant="outline" className="text-xs">
                            {item.gameRegion}
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        Updated: {new Date(item.lastUpdated).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <TrendingUp className="w-5 h-5" />
                  Top Gainers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {valueItems
                    ?.filter(item => item.valueChange.startsWith("+"))
                    .sort((a, b) => parseFloat(b.valueChange) - parseFloat(a.valueChange))
                    .slice(0, 5)
                    .map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">{item.itemName}</span>
                          <Badge className={`${getTypeColor(item.itemType)} ml-2 text-xs`}>
                            {item.itemType}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">{item.valueChange}</div>
                          <div className="text-sm text-muted-foreground">{formatValue(item.currentValue)}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <TrendingDown className="w-5 h-5" />
                  Top Losers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {valueItems
                    ?.filter(item => item.valueChange.startsWith("-"))
                    .sort((a, b) => parseFloat(a.valueChange) - parseFloat(b.valueChange))
                    .slice(0, 5)
                    .map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">{item.itemName}</span>
                          <Badge className={`${getTypeColor(item.itemType)} ml-2 text-xs`}>
                            {item.itemType}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-red-600">{item.valueChange}</div>
                          <div className="text-sm text-muted-foreground">{formatValue(item.currentValue)}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="add" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add Item to Value Tracker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="itemName">Item Name</Label>
                  <Input
                    id="itemName"
                    value={newItem.itemName}
                    onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
                    placeholder="e.g., Rainbow Unicorn"
                  />
                </div>
                <div>
                  <Label htmlFor="itemType">Item Type</Label>
                  <Select value={newItem.itemType} onValueChange={(value: any) => setNewItem({ ...newItem, itemType: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pet">Pet</SelectItem>
                      <SelectItem value="item">Item</SelectItem>
                      <SelectItem value="boost">Boost</SelectItem>
                      <SelectItem value="currency">Currency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currentValue">Current Value</Label>
                  <Input
                    id="currentValue"
                    type="number"
                    value={newItem.currentValue}
                    onChange={(e) => setNewItem({ ...newItem, currentValue: e.target.value })}
                    placeholder="150000000"
                  />
                </div>
                <div>
                  <Label htmlFor="gameRegion">Game Region</Label>
                  <Select value={newItem.gameRegion} onValueChange={(value) => setNewItem({ ...newItem, gameRegion: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Global">Global</SelectItem>
                      <SelectItem value="US-East">US East</SelectItem>
                      <SelectItem value="US-West">US West</SelectItem>
                      <SelectItem value="EU-West">EU West</SelectItem>
                      <SelectItem value="Asia">Asia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">RoValra Integration:</h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Real-time value tracking from multiple sources</li>
                  <li>• Regional price variations and market trends</li>
                  <li>• Automated alerts for significant value changes</li>
                  <li>• Historical data and price prediction analysis</li>
                </ul>
              </div>

              <Button onClick={handleAddItem} className="w-full" disabled={!newItem.itemName || !newItem.currentValue}>
                Add to Tracker
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}