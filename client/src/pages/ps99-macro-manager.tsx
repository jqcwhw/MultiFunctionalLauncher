import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MousePointer, Keyboard, Play, Square, Circle, Download, Upload } from "lucide-react";

interface MacroScript {
  id: number;
  name: string;
  type: "mouse" | "keyboard" | "mixed";
  script: string;
  description?: string;
  isRecording: boolean;
  executionCount: number;
  createdAt: string;
}

export default function PS99MacroManager() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingType, setRecordingType] = useState<"mouse" | "keyboard" | "mixed">("mixed");
  const [newMacro, setNewMacro] = useState({
    name: "",
    type: "mixed" as const,
    description: "",
    script: "",
  });

  // Mock data for development - replace with actual API call
  const { data: macros, isLoading } = useQuery({
    queryKey: ["/api/ps99/macro-scripts"],
    initialData: [
      {
        id: 1,
        name: "Egg Hatching Sequence",
        type: "mixed",
        script: `MOVP 0.5 0.3
LCLP 0.5 0.3
HOLLUP 1000
KEYP e
HOLLUP 2000
MOVP 0.6 0.4
LCLP 0.6 0.4
HOLLUP 500`,
        description: "Automated egg hatching with coordinate clicks and key presses",
        isRecording: false,
        executionCount: 15,
        createdAt: "2025-01-08T09:00:00Z",
      },
      {
        id: 2,
        name: "Pet Collection Route",
        type: "mouse",
        script: `MOVP 0.2 0.2
LCLP 0.2 0.2
HOLLUP 3000
MOVP 0.8 0.2
LCLP 0.8 0.2
HOLLUP 3000
MOVP 0.8 0.8
LCLP 0.8 0.8
HOLLUP 3000
MOVP 0.2 0.8
LCLP 0.2 0.8`,
        description: "Optimized pet collection path for maximum efficiency",
        isRecording: false,
        executionCount: 42,
        createdAt: "2025-01-08T08:30:00Z",
      }
    ] as MacroScript[]
  });

  const handleStartRecording = () => {
    setIsRecording(true);
    console.log("Starting macro recording...");
    // API call to start recording
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    console.log("Stopping macro recording...");
    // API call to stop recording and get recorded script
  };

  const handleExecuteMacro = (macroId: number) => {
    console.log("Executing macro:", macroId);
    // API call to execute macro
  };

  const handleCreateMacro = () => {
    if (!newMacro.name || !newMacro.script) return;
    
    console.log("Creating macro:", newMacro);
    // API call to create new macro
    
    // Reset form
    setNewMacro({
      name: "",
      type: "mixed",
      description: "",
      script: "",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "mouse":
        return <MousePointer className="w-4 h-4" />;
      case "keyboard":
        return <Keyboard className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "mouse":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "keyboard":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
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
        <MousePointer className="w-8 h-8 text-blue-500" />
        <div>
          <h1 className="text-3xl font-bold">PS99 Macro Manager</h1>
          <p className="text-muted-foreground">Record and execute automation scripts (Inspired by MiniMacro Python)</p>
        </div>
      </div>

      <Tabs defaultValue="macros" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="macros">Saved Macros</TabsTrigger>
          <TabsTrigger value="record">Record Macro</TabsTrigger>
          <TabsTrigger value="create">Create Manual</TabsTrigger>
        </TabsList>

        <TabsContent value="macros" className="space-y-4">
          {macros?.map((macro) => (
            <Card key={macro.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(macro.type)}
                    <CardTitle>{macro.name}</CardTitle>
                    <Badge className={getTypeColor(macro.type)}>
                      {macro.type.toUpperCase()}
                    </Badge>
                    {macro.isRecording && <Badge variant="destructive">Recording</Badge>}
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleExecuteMacro(macro.id)} size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Execute
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {macro.description && (
                  <p className="text-sm text-muted-foreground mb-4">{macro.description}</p>
                )}
                
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm font-mono mb-4 max-h-32 overflow-y-auto">
                  {macro.script}
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Executed {macro.executionCount} times</span>
                  <span>Created: {new Date(macro.createdAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="record" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Circle className={`w-5 h-5 ${isRecording ? 'text-red-500' : 'text-gray-400'}`} />
                Macro Recording
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="recordingType">Recording Type</Label>
                <Select value={recordingType} onValueChange={(value: any) => setRecordingType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mouse">Mouse Only</SelectItem>
                    <SelectItem value="keyboard">Keyboard Only</SelectItem>
                    <SelectItem value="mixed">Mouse + Keyboard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4">
                {!isRecording ? (
                  <Button onClick={handleStartRecording} className="flex-1">
                    <Circle className="w-4 h-4 mr-2" />
                    Start Recording
                  </Button>
                ) : (
                  <Button onClick={handleStopRecording} variant="destructive" className="flex-1">
                    <Square className="w-4 h-4 mr-2" />
                    Stop Recording
                  </Button>
                )}
              </div>

              {isRecording && (
                <div className="bg-red-50 dark:bg-red-950 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-red-900 dark:text-red-100">
                    <Circle className="w-4 h-4 animate-pulse" />
                    <span className="font-semibold">Recording in progress...</span>
                  </div>
                  <p className="text-sm text-red-800 dark:text-red-200 mt-2">
                    Perform the actions you want to automate. All mouse movements, clicks, and key presses are being recorded.
                  </p>
                </div>
              )}

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">MiniMacro Commands:</h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• <code>MOVP x y</code> - Move mouse to position (normalized coordinates)</li>
                  <li>• <code>LCLP x y</code> - Left click at position</li>
                  <li>• <code>RCLP x y</code> - Right click at position</li>
                  <li>• <code>KEYP key</code> - Press key</li>
                  <li>• <code>HOLLUP ms</code> - Wait/delay in milliseconds</li>
                  <li>• <code>MWU</code> - Mouse wheel up</li>
                  <li>• <code>MWD</code> - Mouse wheel down</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create Manual Macro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="macroName">Macro Name</Label>
                  <Input
                    id="macroName"
                    value={newMacro.name}
                    onChange={(e) => setNewMacro({ ...newMacro, name: e.target.value })}
                    placeholder="Enter macro name..."
                  />
                </div>
                <div>
                  <Label htmlFor="macroType">Type</Label>
                  <Select value={newMacro.type} onValueChange={(value: any) => setNewMacro({ ...newMacro, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mouse">Mouse</SelectItem>
                      <SelectItem value="keyboard">Keyboard</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="macroDescription">Description (optional)</Label>
                <Input
                  id="macroDescription"
                  value={newMacro.description}
                  onChange={(e) => setNewMacro({ ...newMacro, description: e.target.value })}
                  placeholder="What does this macro do?"
                />
              </div>

              <div>
                <Label htmlFor="macroScript">Macro Script</Label>
                <Textarea
                  id="macroScript"
                  rows={8}
                  value={newMacro.script}
                  onChange={(e) => setNewMacro({ ...newMacro, script: e.target.value })}
                  placeholder={`Enter MiniMacro format commands:
MOVP 0.5 0.3
LCLP 0.5 0.3
HOLLUP 1000
KEYP e`}
                  className="font-mono"
                />
              </div>

              <Button onClick={handleCreateMacro} className="w-full" disabled={!newMacro.name || !newMacro.script}>
                Create Macro
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}