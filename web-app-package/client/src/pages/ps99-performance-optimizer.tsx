import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Zap, Monitor, Cpu, Settings, Download, Copy } from "lucide-react";

interface PerformanceProfile {
  id: number;
  name: string;
  fpsLimit: number;
  renderingApi: string;
  lightingTechnology: string;
  disableShadows: boolean;
  graphicsQuality: number;
  terrainQuality: number;
  customFlags: string;
  isActive: boolean;
  createdAt: string;
}

export default function PS99PerformanceOptimizer() {
  const [newProfile, setNewProfile] = useState({
    name: "",
    fpsLimit: 60,
    renderingApi: "DirectX11",
    lightingTechnology: "Voxel",
    disableShadows: false,
    graphicsQuality: 5,
    terrainQuality: 16,
    customFlags: "{}",
  });

  // Mock data for development - replace with actual API call
  const { data: profiles, isLoading } = useQuery({
    queryKey: ["/api/ps99/performance-settings"],
    initialData: [
      {
        id: 1,
        name: "Maximum Performance",
        fpsLimit: 240,
        renderingApi: "Vulkan",
        lightingTechnology: "Voxel",
        disableShadows: true,
        graphicsQuality: 1,
        terrainQuality: 4,
        customFlags: '{"FIntRenderShadowIntensity": "0", "FFlagDebugGraphicsPreferVulkan": "True"}',
        isActive: true,
        createdAt: "2025-01-08T09:00:00Z",
      },
      {
        id: 2,
        name: "Balanced Quality",
        fpsLimit: 60,
        renderingApi: "DirectX11",
        lightingTechnology: "Future",
        disableShadows: false,
        graphicsQuality: 5,
        terrainQuality: 16,
        customFlags: '{"FFlagDebugForceFutureIsBrightPhase3": "True"}',
        isActive: false,
        createdAt: "2025-01-08T08:30:00Z",
      }
    ] as PerformanceProfile[]
  });

  const popularFastFlags = {
    "Maximum FPS": {
      "DFIntTaskSchedulerTargetFps": "240",
      "FFlagDebugGraphicsPreferVulkan": "True",
      "FIntRenderShadowIntensity": "0",
      "FIntTerrainArraySliceSize": "4"
    },
    "Low Quality": {
      "FIntRomarkStartWithGraphicQualityLevel": "1",
      "FIntTerrainArraySliceSize": "4",
      "FIntRenderShadowIntensity": "0"
    },
    "Smooth Terrain": {
      "FFlagDebugRenderingSetDeterministic": "True"
    },
    "Future Lighting": {
      "FFlagDebugForceFutureIsBrightPhase3": "True"
    },
    "Voxel Lighting": {
      "DFFlagDebugRenderForceTechnologyVoxel": "True"
    }
  };

  const handleApplyProfile = (profileId: number) => {
    console.log("Applying performance profile:", profileId);
    // API call to apply profile
  };

  const handleCreateProfile = () => {
    if (!newProfile.name) return;
    
    console.log("Creating performance profile:", newProfile);
    // API call to create new profile
    
    // Reset form
    setNewProfile({
      name: "",
      fpsLimit: 60,
      renderingApi: "DirectX11",
      lightingTechnology: "Voxel",
      disableShadows: false,
      graphicsQuality: 5,
      terrainQuality: 16,
      customFlags: "{}",
    });
  };

  const handleCopyFlags = (flags: object) => {
    navigator.clipboard.writeText(JSON.stringify(flags, null, 2));
  };

  const getRenderingApiColor = (api: string) => {
    switch (api) {
      case "Vulkan":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "OpenGL":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Metal":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    }
  };

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
        <Zap className="w-8 h-8 text-green-500" />
        <div>
          <h1 className="text-3xl font-bold">PS99 Performance Optimizer</h1>
          <p className="text-muted-foreground">Roblox FastFlags and graphics optimization (Inspired by FastFlags-Collective)</p>
        </div>
      </div>

      <Tabs defaultValue="profiles" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profiles">Performance Profiles</TabsTrigger>
          <TabsTrigger value="fastflags">FastFlags Library</TabsTrigger>
          <TabsTrigger value="create">Create Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="profiles" className="space-y-4">
          {profiles?.map((profile) => (
            <Card key={profile.id} className={`${profile.isActive ? 'ring-2 ring-green-500' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Monitor className="w-5 h-5" />
                    <CardTitle>{profile.name}</CardTitle>
                    {profile.isActive && <Badge variant="default">Active</Badge>}
                    <Badge className={getRenderingApiColor(profile.renderingApi)}>
                      {profile.renderingApi}
                    </Badge>
                  </div>
                  <Button onClick={() => handleApplyProfile(profile.id)} size="sm">
                    Apply Profile
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <Label className="text-xs">FPS Limit</Label>
                    <div className="text-lg font-bold text-green-600">{profile.fpsLimit}</div>
                  </div>
                  <div className="text-center">
                    <Label className="text-xs">Lighting</Label>
                    <div className="text-sm font-medium">{profile.lightingTechnology}</div>
                  </div>
                  <div className="text-center">
                    <Label className="text-xs">Graphics Quality</Label>
                    <div className="text-sm font-medium">{profile.graphicsQuality}/10</div>
                  </div>
                  <div className="text-center">
                    <Label className="text-xs">Shadows</Label>
                    <div className="text-sm font-medium">{profile.disableShadows ? "Disabled" : "Enabled"}</div>
                  </div>
                </div>
                
                {profile.customFlags !== "{}" && (
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm font-mono">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Custom FastFlags:</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopyFlags(JSON.parse(profile.customFlags))}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                    <pre className="whitespace-pre-wrap">{JSON.stringify(JSON.parse(profile.customFlags), null, 2)}</pre>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="fastflags" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(popularFastFlags).map(([name, flags]) => (
              <Card key={name}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{name}</CardTitle>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopyFlags(flags)}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm font-mono">
                    <pre className="whitespace-pre-wrap">{JSON.stringify(flags, null, 2)}</pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                How to Apply FastFlags
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Using Bloxstrap:</h4>
                  <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
                    <li>Open Bloxstrap Menu</li>
                    <li>Navigate to Fast Flags → Fast Flags Editor → Import Json</li>
                    <li>Paste the copied FastFlags JSON</li>
                    <li>Save and restart Roblox</li>
                  </ol>
                </div>
                <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Manual Method:</h4>
                  <ol className="text-sm text-orange-800 dark:text-orange-200 space-y-1 list-decimal list-inside">
                    <li>Navigate to %localappdata%\Roblox\Versions\[version]\ClientSettings</li>
                    <li>Create or edit ClientAppSettings.json</li>
                    <li>Add the FastFlags to the JSON file</li>
                    <li>Save and restart Roblox</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Create Performance Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="profileName">Profile Name</Label>
                <Input
                  id="profileName"
                  value={newProfile.name}
                  onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                  placeholder="Enter profile name..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fpsLimit">FPS Limit: {newProfile.fpsLimit}</Label>
                  <Slider
                    value={[newProfile.fpsLimit]}
                    onValueChange={([value]) => setNewProfile({ ...newProfile, fpsLimit: value })}
                    max={1000}
                    min={30}
                    step={10}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="graphicsQuality">Graphics Quality: {newProfile.graphicsQuality}/10</Label>
                  <Slider
                    value={[newProfile.graphicsQuality]}
                    onValueChange={([value]) => setNewProfile({ ...newProfile, graphicsQuality: value })}
                    max={10}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="renderingApi">Rendering API</Label>
                  <Select value={newProfile.renderingApi} onValueChange={(value) => setNewProfile({ ...newProfile, renderingApi: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DirectX11">DirectX 11</SelectItem>
                      <SelectItem value="DirectX10">DirectX 10</SelectItem>
                      <SelectItem value="Vulkan">Vulkan</SelectItem>
                      <SelectItem value="OpenGL">OpenGL</SelectItem>
                      <SelectItem value="Metal">Metal (macOS)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="lightingTechnology">Lighting Technology</Label>
                  <Select value={newProfile.lightingTechnology} onValueChange={(value) => setNewProfile({ ...newProfile, lightingTechnology: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Voxel">Voxel</SelectItem>
                      <SelectItem value="Shadowmap">Shadowmap</SelectItem>
                      <SelectItem value="Future">Future</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="disableShadows"
                  checked={newProfile.disableShadows}
                  onCheckedChange={(checked) => setNewProfile({ ...newProfile, disableShadows: checked })}
                />
                <Label htmlFor="disableShadows">Disable Shadows (Better Performance)</Label>
              </div>

              <div>
                <Label htmlFor="customFlags">Custom FastFlags (JSON)</Label>
                <Textarea
                  id="customFlags"
                  rows={6}
                  value={newProfile.customFlags}
                  onChange={(e) => setNewProfile({ ...newProfile, customFlags: e.target.value })}
                  placeholder='{"FIntRenderShadowIntensity": "0"}'
                  className="font-mono"
                />
              </div>

              <Button onClick={handleCreateProfile} className="w-full" disabled={!newProfile.name}>
                Create Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}