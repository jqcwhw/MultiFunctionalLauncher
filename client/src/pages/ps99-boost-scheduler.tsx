import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Timer, Play, Square, Settings, Zap } from "lucide-react";

interface BoostSchedule {
  id: number;
  name: string;
  slot1Time: number;
  slot2Time: number;
  slot3Time: number;
  slot4Time: number;
  slot5Time: number;
  slot6Time: number;
  slot7Time: number;
  isActive: boolean;
  lastUsed?: string;
  createdAt: string;
}

export default function PS99BoostScheduler() {
  const [activeSchedule, setActiveSchedule] = useState<number | null>(null);
  const [newSchedule, setNewSchedule] = useState({
    name: "",
    slot1Time: 0,
    slot2Time: 0,
    slot3Time: 0,
    slot4Time: 0,
    slot5Time: 0,
    slot6Time: 0,
    slot7Time: 0,
  });

  // Mock data for development - replace with actual API call
  const { data: schedules, isLoading } = useQuery({
    queryKey: ["/api/ps99/boost-scheduler"],
    initialData: [
      {
        id: 1,
        name: "Standard Boost Cycle",
        slot1Time: 60,
        slot2Time: 120,
        slot3Time: 0,
        slot4Time: 180,
        slot5Time: 0,
        slot6Time: 240,
        slot7Time: 300,
        isActive: true,
        lastUsed: "2025-01-08T10:30:00Z",
        createdAt: "2025-01-08T09:00:00Z",
      },
      {
        id: 2,
        name: "Quick Farm Setup",
        slot1Time: 30,
        slot2Time: 30,
        slot3Time: 45,
        slot4Time: 60,
        slot5Time: 60,
        slot6Time: 90,
        slot7Time: 120,
        isActive: false,
        createdAt: "2025-01-08T08:00:00Z",
      }
    ] as BoostSchedule[]
  });

  const handleStartSchedule = (scheduleId: number) => {
    setActiveSchedule(scheduleId);
    // API call to start the boost scheduler
    console.log("Starting boost schedule:", scheduleId);
  };

  const handleStopSchedule = () => {
    setActiveSchedule(null);
    // API call to stop the boost scheduler
    console.log("Stopping boost schedule");
  };

  const handleCreateSchedule = () => {
    if (!newSchedule.name) return;
    
    // API call to create new schedule
    console.log("Creating schedule:", newSchedule);
    
    // Reset form
    setNewSchedule({
      name: "",
      slot1Time: 0,
      slot2Time: 0,
      slot3Time: 0,
      slot4Time: 0,
      slot5Time: 0,
      slot6Time: 0,
      slot7Time: 0,
    });
  };

  const formatDuration = (seconds: number) => {
    if (seconds === 0) return "Disabled";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
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
        <Zap className="w-8 h-8 text-yellow-500" />
        <div>
          <h1 className="text-3xl font-bold">PS99 Boost Scheduler</h1>
          <p className="text-muted-foreground">Automated boost timing for Pet Simulator 99 (Inspired by BoostMacro_Slymi)</p>
        </div>
      </div>

      <Tabs defaultValue="schedules" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="schedules">Boost Schedules</TabsTrigger>
          <TabsTrigger value="create">Create Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="schedules" className="space-y-4">
          {schedules?.map((schedule) => (
            <Card key={schedule.id} className={`${activeSchedule === schedule.id ? 'ring-2 ring-green-500' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Timer className="w-5 h-5" />
                    <CardTitle>{schedule.name}</CardTitle>
                    {schedule.isActive && <Badge variant="default">Active</Badge>}
                    {activeSchedule === schedule.id && <Badge variant="destructive">Running</Badge>}
                  </div>
                  <div className="flex gap-2">
                    {activeSchedule === schedule.id ? (
                      <Button onClick={handleStopSchedule} variant="destructive" size="sm">
                        <Square className="w-4 h-4 mr-2" />
                        Stop
                      </Button>
                    ) : (
                      <Button onClick={() => handleStartSchedule(schedule.id)} size="sm">
                        <Play className="w-4 h-4 mr-2" />
                        Start
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-4 mb-4">
                  {[1, 2, 3, 4, 5, 6, 7].map((slot) => {
                    const time = schedule[`slot${slot}Time` as keyof BoostSchedule] as number;
                    return (
                      <div key={slot} className="text-center">
                        <Label className="text-xs">Slot {slot}</Label>
                        <div className={`p-2 rounded text-sm font-medium ${time > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}`}>
                          {formatDuration(time)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {schedule.lastUsed && (
                  <p className="text-sm text-muted-foreground">
                    Last used: {new Date(schedule.lastUsed).toLocaleString()}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Create New Boost Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="scheduleName">Schedule Name</Label>
                <Input
                  id="scheduleName"
                  value={newSchedule.name}
                  onChange={(e) => setNewSchedule({ ...newSchedule, name: e.target.value })}
                  placeholder="Enter schedule name..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7].map((slot) => (
                  <div key={slot}>
                    <Label htmlFor={`slot${slot}`}>Slot {slot} (seconds)</Label>
                    <Input
                      id={`slot${slot}`}
                      type="number"
                      min="0"
                      value={newSchedule[`slot${slot}Time` as keyof typeof newSchedule]}
                      onChange={(e) => setNewSchedule({
                        ...newSchedule,
                        [`slot${slot}Time`]: parseInt(e.target.value) || 0
                      })}
                      placeholder="0 = disabled"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDuration(newSchedule[`slot${slot}Time` as keyof typeof newSchedule] as number)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">How to Use:</h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Set the time interval (in seconds) for each boost slot</li>
                  <li>• Set to 0 to disable a specific slot</li>
                  <li>• The macro will automatically press the corresponding number key at the specified intervals</li>
                  <li>• Based on BoostMacro_Slymi AutoHotkey script for optimal boost timing</li>
                </ul>
              </div>

              <Button onClick={handleCreateSchedule} className="w-full" disabled={!newSchedule.name}>
                Create Schedule
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}