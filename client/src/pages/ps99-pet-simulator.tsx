import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, Star, Trophy, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Ps99Pet {
  id: number;
  name: string;
  type: string;
  minimumDamage: number;
  maximumDamage: number;
  hatched: boolean;
  strength?: number;
  hatchedAt?: string;
  createdAt: string;
}

export default function Ps99PetSimulator() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedTab, setSelectedTab] = useState("pets");

  const { data: pets = [], isLoading } = useQuery<Ps99Pet[]>({
    queryKey: ["/api/ps99/pets"],
  });

  const hatchPetMutation = useMutation({
    mutationFn: (petId: number) => apiRequest(`/api/ps99/pets/${petId}/hatch`, {
      method: "POST",
    }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/ps99/pets"] });
      toast({
        title: "Pet Hatched!",
        description: `${data.name} hatched with ${data.strength} strength!`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to hatch pet",
        variant: "destructive",
      });
    },
  });

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "common": return "bg-gray-500";
      case "uncommon": return "bg-green-500";
      case "rare": return "bg-blue-500";
      case "epic": return "bg-purple-500";
      case "legendary": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "common": return <Star className="h-4 w-4" />;
      case "uncommon": return <Gift className="h-4 w-4" />;
      case "rare": return <Zap className="h-4 w-4" />;
      case "epic": return <Trophy className="h-4 w-4" />;
      case "legendary": return <Trophy className="h-4 w-4 text-yellow-400" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const unhatched = pets.filter(pet => !pet.hatched);
  const hatched = pets.filter(pet => pet.hatched);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">PS99 Pet Simulator</h1>
          <p className="text-muted-foreground">Manage and hatch your Pet Simulator 99 collection</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Total Pets</div>
          <div className="text-2xl font-bold">{pets.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Gift className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-sm font-medium">Available Eggs</div>
                <div className="text-2xl font-bold">{unhatched.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <div>
                <div className="text-sm font-medium">Hatched Pets</div>
                <div className="text-2xl font-bold">{hatched.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-red-500" />
              <div>
                <div className="text-sm font-medium">Total Strength</div>
                <div className="text-2xl font-bold">
                  {hatched.reduce((sum, pet) => sum + (pet.strength || 0), 0)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-sm font-medium">Best Pet</div>
                <div className="text-lg font-bold">
                  {hatched.length > 0 ? 
                    Math.max(...hatched.map(p => p.strength || 0)) : 0}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pets">My Pets ({hatched.length})</TabsTrigger>
          <TabsTrigger value="eggs">Available Eggs ({unhatched.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pets" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hatched.map((pet) => (
              <Card key={pet.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{pet.name}</CardTitle>
                    <Badge className={`${getTypeColor(pet.type)} text-white`}>
                      <div className="flex items-center space-x-1">
                        {getTypeIcon(pet.type)}
                        <span>{pet.type}</span>
                      </div>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Strength</span>
                    <span className="font-bold text-lg">{pet.strength}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Damage Range</span>
                      <span>{pet.minimumDamage} - {pet.maximumDamage}</span>
                    </div>
                    <Progress 
                      value={(pet.strength! / pet.maximumDamage) * 100} 
                      className="h-2"
                    />
                  </div>
                  
                  {pet.hatchedAt && (
                    <div className="text-xs text-muted-foreground">
                      Hatched: {new Date(pet.hatchedAt).toLocaleDateString()}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
          
          {hatched.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Gift className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Pets Yet</h3>
                <p className="text-muted-foreground">
                  Hatch some eggs to start building your collection!
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="eggs" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unhatched.map((pet) => (
              <Card key={pet.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{pet.name} Egg</CardTitle>
                    <Badge className={`${getTypeColor(pet.type)} text-white`}>
                      <div className="flex items-center space-x-1">
                        {getTypeIcon(pet.type)}
                        <span>{pet.type}</span>
                      </div>
                    </Badge>
                  </div>
                  <CardDescription>
                    Potential damage: {pet.minimumDamage} - {pet.maximumDamage}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <Gift className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <div className="text-sm text-muted-foreground">Ready to hatch!</div>
                  </div>
                  
                  <Button 
                    onClick={() => hatchPetMutation.mutate(pet.id)}
                    disabled={hatchPetMutation.isPending}
                    className="w-full"
                  >
                    {hatchPetMutation.isPending ? "Hatching..." : "Hatch Egg"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {unhatched.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Eggs Available</h3>
                <p className="text-muted-foreground">
                  All your pets have been hatched! Great job!
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}