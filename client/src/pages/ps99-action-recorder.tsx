import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Square, Save, Trash2, Clock, MousePointer, Keyboard, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Ps99ActionRecording {
  id: number;
  name: string;
  description?: string;
  actions: any[];
  duration?: number;
  recordedAt: string;
}

interface ActionData {
  type: string;
  timestamp: number;
  data: any;
}

export default function Ps99ActionRecorder() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(null);
  const [currentActions, setCurrentActions] = useState<ActionData[]>([]);
  const [recordingForm, setRecordingForm] = useState({
    name: "",
    description: "",
  });

  const { data: recordings = [], isLoading } = useQuery<Ps99ActionRecording[]>({
    queryKey: ["/api/ps99/action-recordings"],
  });

  const saveRecordingMutation = useMutation({
    mutationFn: (data: any) => apiRequest("/api/ps99/action-recordings", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ps99/action-recordings"] });
      toast({
        title: "Recording Saved",
        description: "Action recording has been saved successfully!",
      });
      setRecordingForm({ name: "", description: "" });
      setCurrentActions([]);
    },
    onError: () => {
      toast({
        title: "Save Failed",
        description: "Failed to save action recording",
        variant: "destructive",
      });
    },
  });

  const deleteRecordingMutation = useMutation({
    mutationFn: (id: number) => apiRequest(`/api/ps99/action-recordings/${id}`, {
      method: "DELETE",
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ps99/action-recordings"] });
      toast({
        title: "Recording Deleted",
        description: "Action recording has been removed",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete recording",
        variant: "destructive",
      });
    },
  });

  const startRecording = () => {
    setIsRecording(true);
    setRecordingStartTime(Date.now());
    setCurrentActions([]);
    toast({
      title: "Recording Started",
      description: "Action recording has begun. Perform your actions now.",
    });

    // Simulate recording actions with demo data
    simulateActionRecording();
  };

  const stopRecording = () => {
    setIsRecording(false);
    const duration = recordingStartTime ? Date.now() - recordingStartTime : 0;
    
    toast({
      title: "Recording Stopped",
      description: `Recorded ${currentActions.length} actions in ${Math.round(duration / 1000)}s`,
    });
  };

  const simulateActionRecording = () => {
    // Simulate various PS99 actions being recorded
    const sampleActions = [
      { type: "click", data: { x: 640, y: 360, button: "left" } },
      { type: "keypress", data: { key: "E", modifiers: [] } },
      { type: "click", data: { x: 500, y: 300, button: "left" } },
      { type: "wait", data: { duration: 1000 } },
      { type: "keypress", data: { key: "Space", modifiers: [] } },
    ];

    let actionIndex = 0;
    const recordingInterval = setInterval(() => {
      if (!isRecording) {
        clearInterval(recordingInterval);
        return;
      }

      if (actionIndex < sampleActions.length) {
        const action: ActionData = {
          ...sampleActions[actionIndex],
          timestamp: Date.now() - (recordingStartTime || 0),
        };
        
        setCurrentActions(prev => [...prev, action]);
        actionIndex++;
      } else {
        clearInterval(recordingInterval);
      }
    }, 800 + Math.random() * 1200); // Random intervals between actions
  };

  const saveCurrentRecording = () => {
    if (!recordingForm.name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter a name for the recording",
        variant: "destructive",
      });
      return;
    }

    if (currentActions.length === 0) {
      toast({
        title: "No Actions Recorded",
        description: "Record some actions before saving",
        variant: "destructive",
      });
      return;
    }

    const duration = recordingStartTime ? Date.now() - recordingStartTime : 0;
    const recordingData = {
      name: recordingForm.name,
      description: recordingForm.description,
      actions: currentActions,
      duration: Math.round(duration),
    };

    saveRecordingMutation.mutate(recordingData);
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case "click": return <MousePointer className="h-4 w-4" />;
      case "keypress": return <Keyboard className="h-4 w-4" />;
      case "wait": return <Clock className="h-4 w-4" />;
      default: return <Play className="h-4 w-4" />;
    }
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds % 60}s`;
    } else {
      return `${seconds}s`;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">PS99 Action Recorder</h1>
          <p className="text-muted-foreground">Record and replay automated game actions</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Total Recordings</div>
          <div className="text-2xl font-bold">{recordings.length}</div>
        </div>
      </div>

      <Tabs defaultValue="recorder" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recorder">Action Recorder</TabsTrigger>
          <TabsTrigger value="recordings">Saved Recordings ({recordings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="recorder" className="space-y-6">
          {/* Recording Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Play className="h-5 w-5" />
                <span>Action Recorder</span>
              </CardTitle>
              <CardDescription>
                Record mouse clicks and keyboard inputs for automation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={isRecording ? stopRecording : startRecording}
                  variant={isRecording ? "destructive" : "default"}
                  size="lg"
                >
                  {isRecording ? (
                    <>
                      <Square className="h-5 w-5 mr-2" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5 mr-2" />
                      Start Recording
                    </>
                  )}
                </Button>
                
                {isRecording && (
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Recording...</span>
                    <Badge variant="outline">{currentActions.length} actions</Badge>
                  </div>
                )}
              </div>

              {isRecording && recordingStartTime && (
                <Progress value={(Date.now() - recordingStartTime) % 30000 / 300} className="h-2" />
              )}
            </CardContent>
          </Card>

          {/* Current Recording Actions */}
          {currentActions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Current Recording ({currentActions.length} actions)</CardTitle>
                <CardDescription>
                  Actions recorded in this session
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {currentActions.map((action, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 bg-muted rounded">
                      {getActionIcon(action.type)}
                      <div className="flex-1 text-sm">
                        <span className="font-medium capitalize">{action.type}</span>
                        {action.type === "click" && (
                          <span className="text-muted-foreground">
                            {" "}at ({action.data.x}, {action.data.y})
                          </span>
                        )}
                        {action.type === "keypress" && (
                          <span className="text-muted-foreground">
                            {" "}key: {action.data.key}
                          </span>
                        )}
                        {action.type === "wait" && (
                          <span className="text-muted-foreground">
                            {" "}for {action.data.duration}ms
                          </span>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {formatDuration(action.timestamp)}
                      </Badge>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Recording Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter recording name..."
                        value={recordingForm.name}
                        onChange={(e) => setRecordingForm(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Input
                        id="description"
                        placeholder="Describe what this recording does..."
                        value={recordingForm.description}
                        onChange={(e) => setRecordingForm(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <Button
                    onClick={saveCurrentRecording}
                    disabled={saveRecordingMutation.isPending}
                    className="w-full md:w-auto"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {saveRecordingMutation.isPending ? "Saving..." : "Save Recording"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recordings" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recordings.map((recording) => (
              <Card key={recording.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{recording.name}</CardTitle>
                    <Badge variant="outline">
                      {recording.actions.length} actions
                    </Badge>
                  </div>
                  {recording.description && (
                    <CardDescription>{recording.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm space-y-1">
                    <div><strong>Duration:</strong> {recording.duration ? formatDuration(recording.duration) : "Unknown"}</div>
                    <div><strong>Recorded:</strong> {new Date(recording.recordedAt).toLocaleDateString()}</div>
                  </div>
                  
                  <div className="bg-muted rounded p-3 max-h-32 overflow-y-auto">
                    <div className="text-xs font-medium mb-2">Actions Preview:</div>
                    {recording.actions.slice(0, 3).map((action: any, index: number) => (
                      <div key={index} className="text-xs text-muted-foreground mb-1">
                        {action.type === "click" && `Click at (${action.data?.x}, ${action.data?.y})`}
                        {action.type === "keypress" && `Press ${action.data?.key}`}
                        {action.type === "wait" && `Wait ${action.data?.duration}ms`}
                      </div>
                    ))}
                    {recording.actions.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        ... and {recording.actions.length - 3} more actions
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Play className="h-4 w-4 mr-1" />
                      Play
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteRecordingMutation.mutate(recording.id)}
                      disabled={deleteRecordingMutation.isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {recordings.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Play className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Recordings Yet</h3>
                <p className="text-muted-foreground">
                  Use the Action Recorder to create your first automation!
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}