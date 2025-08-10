import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPs99DeveloperSchema, insertPs99CommunitySchema } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Users, Building, Code, TestTube, Package, Network, Plus, Search, ExternalLink, Clock, Star, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PS99DeveloperTracking() {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("developers");
  const [searchQuery, setSearchQuery] = useState("");

  // Queries
  const developersQuery = useQuery({
    queryKey: ['/api/ps99-developers'],
  });

  const communitiesQuery = useQuery({
    queryKey: ['/api/ps99-communities'],
  });

  const assetsQuery = useQuery({
    queryKey: ['/api/ps99-developer-assets'],
  });

  const testingEnvironmentsQuery = useQuery({
    queryKey: ['/api/ps99-testing-environments'],
  });

  // Forms
  const developerForm = useForm({
    resolver: zodResolver(insertPs99DeveloperSchema),
    defaultValues: {
      userId: 0,
      username: "",
      displayName: "",
      description: "",
      role: "developer",
      followerCount: 0,
      followingCount: 0,
      friendCount: 0,
      affiliatedGroups: [],
      isActive: true,
    },
  });

  const communityForm = useForm({
    resolver: zodResolver(insertPs99CommunitySchema),
    defaultValues: {
      groupId: 0,
      name: "",
      description: "",
      memberCount: 0,
      groupType: "community",
      isVerified: false,
      affiliatedDevelopers: [],
    },
  });

  // Mutations
  const addDeveloperMutation = useMutation({
    mutationFn: (data: any) => apiRequest('/api/ps99-developers', 'POST', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/ps99-developers'] });
      toast({ title: "Developer added successfully" });
    },
  });

  const addCommunityMutation = useMutation({
    mutationFn: (data: any) => apiRequest('/api/ps99-communities', 'POST', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/ps99-communities'] });
      toast({ title: "Community added successfully" });
    },
  });

  // Sample data for the known developers/communities from the URLs provided
  const knownDevelopers = [
    { userId: 13365322, username: "BigGames", role: "developer", status: "Not Tracked" },
    { userId: 5247510953, username: "PS99DevUser1", role: "developer", status: "Not Tracked" },
    { userId: 1784060946, username: "PS99DevUser2", role: "developer", status: "Not Tracked" },
    { userId: 2878290231, username: "PS99DevUser3", role: "developer", status: "Not Tracked" },
    { userId: 1210210, username: "PS99LeadDev", role: "lead_developer", status: "Not Tracked" },
    { userId: 3687735502, username: "PS99DevUser4", role: "developer", status: "Not Tracked" },
    { userId: 100984526, username: "PS99DevUser5", role: "developer", status: "Not Tracked" },
    { userId: 2936917022, username: "PS99DevUser6", role: "developer", status: "Not Tracked" },
    { userId: 19717956, username: "PS99DevUser7", role: "developer", status: "Not Tracked" },
    { userId: 3983340648, username: "PS99DevUser8", role: "developer", status: "Not Tracked" },
    { userId: 1909623504, username: "PS99DevUser9", role: "developer", status: "Not Tracked" },
    { userId: 2880286252, username: "PS99DevUser10", role: "developer", status: "Not Tracked" },
    { userId: 7707349, username: "PS99DevUser11", role: "developer", status: "Not Tracked" },
    { userId: 2213470865, username: "PS99DevUser12", role: "developer", status: "Not Tracked" },
    { userId: 2882755487, username: "PS99DevUser13", role: "developer", status: "Not Tracked" },
  ];

  const knownCommunities = [
    { groupId: 3959677, name: "BIG Games Pets", groupType: "official", memberCount: 0 },
    { groupId: 5060810, name: "BIG Games Staff", groupType: "staff", memberCount: 0 },
    { groupId: 4981455, name: "BIG Games Experimental", groupType: "experimental", memberCount: 0 },
    { groupId: 10026748, name: "BIG Games Super Fun", groupType: "community", memberCount: 0 },
  ];

  const knownTestingEnvironments = [
    { placeId: 10147891414, name: "Portal to PS99", description: "Portal game to Pet Simulator 99" },
    { placeId: 15502302041, name: "Dev Pet Simulator 99", description: "Development version of PS99" },
    { placeId: 8737899170, name: "Pet Simulator 99", description: "Main PS99 game" },
  ];

  const handleQuickAddDeveloper = async (dev: any) => {
    try {
      await addDeveloperMutation.mutateAsync({
        userId: dev.userId,
        username: dev.username,
        displayName: dev.username,
        role: dev.role,
        description: `PS99 Developer tracked from profile analysis`,
        isActive: true,
      });
    } catch (error) {
      toast({ title: "Error adding developer", variant: "destructive" });
    }
  };

  const handleQuickAddCommunity = async (community: any) => {
    try {
      await addCommunityMutation.mutateAsync({
        groupId: community.groupId,
        name: community.name,
        groupType: community.groupType,
        description: `PS99 Community tracked from group analysis`,
        memberCount: community.memberCount,
        isVerified: community.groupType === "official",
      });
    } catch (error) {
      toast({ title: "Error adding community", variant: "destructive" });
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">PS99 Developer Ecosystem Tracking</h1>
          <p className="text-muted-foreground">
            Comprehensive tracking of Pet Simulator 99 developers, communities, and testing environments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search developers, communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{developersQuery.data?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Tracked Developers</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Building className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{communitiesQuery.data?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Communities</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Code className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{assetsQuery.data?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Developer Assets</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TestTube className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{testingEnvironmentsQuery.data?.length || 0}</div>
                <div className="text-sm text-muted-foreground">Testing Places</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Add Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Discovered PS99 Ecosystem (Ready to Track)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Known Developers */}
          <div>
            <h3 className="font-semibold mb-3">Identified PS99 Developers ({knownDevelopers.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {knownDevelopers.map((dev) => (
                <div key={dev.userId} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{dev.username}</div>
                    <div className="text-sm text-muted-foreground">ID: {dev.userId}</div>
                    <Badge variant="outline" className="text-xs mt-1">{dev.role}</Badge>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuickAddDeveloper(dev)}
                    disabled={addDeveloperMutation.isPending}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Track
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Known Communities */}
          <div>
            <h3 className="font-semibold mb-3">PS99 Communities ({knownCommunities.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {knownCommunities.map((community) => (
                <div key={community.groupId} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{community.name}</div>
                    <div className="text-sm text-muted-foreground">ID: {community.groupId}</div>
                    <Badge variant="outline" className="text-xs mt-1">{community.groupType}</Badge>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuickAddCommunity(community)}
                    disabled={addCommunityMutation.isPending}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Track
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Known Testing Environments */}
          <div>
            <h3 className="font-semibold mb-3">PS99 Testing Places ({knownTestingEnvironments.length})</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {knownTestingEnvironments.map((place) => (
                <div key={place.placeId} className="p-3 border rounded-lg">
                  <div className="font-medium">{place.name}</div>
                  <div className="text-sm text-muted-foreground mb-2">{place.description}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">ID: {place.placeId}</div>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Visit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="developers">Developers</TabsTrigger>
          <TabsTrigger value="communities">Communities</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="testing">Testing Places</TabsTrigger>
          <TabsTrigger value="connections">Network</TabsTrigger>
        </TabsList>

        <TabsContent value="developers" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Tracked Developers</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Developer
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Developer</DialogTitle>
                </DialogHeader>
                <Form {...developerForm}>
                  <form onSubmit={developerForm.handleSubmit((data) => addDeveloperMutation.mutate(data))} className="space-y-4">
                    <FormField
                      control={developerForm.control}
                      name="userId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Roblox User ID</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={developerForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={developerForm.control}
                      name="displayName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Display Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={developerForm.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="developer">Developer</SelectItem>
                                <SelectItem value="creator">Creator</SelectItem>
                                <SelectItem value="staff">Staff</SelectItem>
                                <SelectItem value="tester">Tester</SelectItem>
                                <SelectItem value="community_manager">Community Manager</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={developerForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={addDeveloperMutation.isPending}>
                      Add Developer
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {developersQuery.data?.map((developer: any) => (
              <Card key={developer.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{developer.displayName}</h3>
                      <p className="text-sm text-muted-foreground">@{developer.username}</p>
                    </div>
                    <Badge variant="outline">{developer.role}</Badge>
                  </div>
                  <p className="text-sm mb-3">{developer.description}</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="font-semibold">{developer.followerCount}</div>
                      <div className="text-xs text-muted-foreground">Followers</div>
                    </div>
                    <div>
                      <div className="font-semibold">{developer.followingCount}</div>
                      <div className="text-xs text-muted-foreground">Following</div>
                    </div>
                    <div>
                      <div className="font-semibold">{developer.friendCount}</div>
                      <div className="text-xs text-muted-foreground">Friends</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="communities" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Tracked Communities</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Community
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Community</DialogTitle>
                </DialogHeader>
                <Form {...communityForm}>
                  <form onSubmit={communityForm.handleSubmit((data) => addCommunityMutation.mutate(data))} className="space-y-4">
                    <FormField
                      control={communityForm.control}
                      name="groupId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Roblox Group ID</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={communityForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Community Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={communityForm.control}
                      name="groupType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Group Type</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="official">Official</SelectItem>
                                <SelectItem value="staff">Staff</SelectItem>
                                <SelectItem value="experimental">Experimental</SelectItem>
                                <SelectItem value="community">Community</SelectItem>
                                <SelectItem value="testing">Testing</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={communityForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={addCommunityMutation.isPending}>
                      Add Community
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {communitiesQuery.data?.map((community: any) => (
              <Card key={community.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{community.name}</h3>
                      <p className="text-sm text-muted-foreground">ID: {community.groupId}</p>
                    </div>
                    <Badge variant={community.groupType === 'official' ? 'default' : 'outline'}>
                      {community.groupType}
                    </Badge>
                  </div>
                  <p className="text-sm mb-3">{community.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="font-semibold">{community.memberCount}</span> members
                    </div>
                    {community.isVerified && (
                      <Badge variant="default" className="text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="assets" className="space-y-4">
          <h2 className="text-xl font-semibold">Developer Assets</h2>
          <div className="text-center py-8 text-muted-foreground">
            Asset tracking will be implemented to monitor:
            <ul className="mt-2 space-y-1">
              <li>• Private testing places</li>
              <li>• Studio creations and models</li>
              <li>• Creator hub content</li>
              <li>• Marketplace items</li>
              <li>• Library assets and scripts</li>
              <li>• CDN resources</li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="testing" className="space-y-4">
          <h2 className="text-xl font-semibold">Testing Environments</h2>
          <div className="text-center py-8 text-muted-foreground">
            Testing environment monitoring will track:
            <ul className="mt-2 space-y-1">
              <li>• Dev versions of PS99</li>
              <li>• Experimental game features</li>
              <li>• Community testing servers</li>
              <li>• Private developer instances</li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="connections" className="space-y-4">
          <h2 className="text-xl font-semibold">Developer Network</h2>
          <div className="text-center py-8 text-muted-foreground">
            Network analysis will map:
            <ul className="mt-2 space-y-1">
              <li>• Developer friendships and collaborations</li>
              <li>• Community affiliations</li>
              <li>• Project partnerships</li>
              <li>• Mentor-mentee relationships</li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}