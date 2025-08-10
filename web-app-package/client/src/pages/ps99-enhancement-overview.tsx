import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Timer, MousePointer, Cpu, DollarSign, Star, Database, Play, Server, ArrowRight, CheckCircle } from "lucide-react";

export default function PS99EnhancementOverview() {
  const enhancementTools = [
    {
      title: "Boost Scheduler",
      description: "Automated boost timing system for Pet Simulator 99",
      icon: Timer,
      path: "/ps99-boost-scheduler",
      color: "bg-yellow-500",
      features: ["7-slot boost automation", "Customizable timing", "AutoHotkey integration"],
      source: "BoostMacro_Slymi",
      status: "Active"
    },
    {
      title: "Macro Manager", 
      description: "Record and execute automation scripts",
      icon: MousePointer,
      path: "/ps99-macro-manager",
      color: "bg-blue-500",
      features: ["Mouse/keyboard recording", "MiniMacro format", "Script execution"],
      source: "MiniMacro Python",
      status: "Active"
    },
    {
      title: "Performance Optimizer",
      description: "Roblox FastFlags and graphics optimization",
      icon: Cpu,
      path: "/ps99-performance-optimizer",
      color: "bg-green-500",
      features: ["FPS unlocking", "Graphics optimization", "FastFlags library"],
      source: "FastFlags-Collective",
      status: "Active"
    },
    {
      title: "Value Tracker",
      description: "Real-time Pet Simulator 99 item values and trends",
      icon: DollarSign,
      path: "/ps99-value-tracker", 
      color: "bg-purple-500",
      features: ["Real-time pricing", "Market trends", "Regional tracking"],
      source: "RoValra Extension",
      status: "Active"
    }
  ];

  const coreTools = [
    {
      title: "Pet Simulator",
      description: "Pet management and simulation system",
      icon: Star,
      path: "/ps99-pet-simulator",
      color: "bg-orange-500"
    },
    {
      title: "Data Scraper", 
      description: "Roblox API data collection and analysis",
      icon: Database,
      path: "/ps99-data-scraper",
      color: "bg-teal-500"
    },
    {
      title: "Action Recorder",
      description: "Record and replay game actions",
      icon: Play,
      path: "/ps99-action-recorder",
      color: "bg-red-500"
    },
    {
      title: "API Collector",
      description: "Advanced API data collection utilities",
      icon: Server,
      path: "/ps99-api-collector",
      color: "bg-indigo-500"
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          PS99 Enhancement Suite
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Comprehensive Pet Simulator 99 gaming tools built from analysis of 19+ advanced automation projects
        </p>
        <div className="flex items-center justify-center gap-4">
          <Badge variant="default" className="text-sm px-3 py-1">
            <CheckCircle className="w-4 h-4 mr-1" />
            19 Tools Analyzed
          </Badge>
          <Badge variant="secondary" className="text-sm px-3 py-1">
            8 Enhancement Tools Active
          </Badge>
        </div>
      </div>

      {/* Enhancement Tools */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">Enhancement Tools</h2>
          <Badge variant="outline">New</Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enhancementTools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Card key={tool.title} className="group hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${tool.color} text-white`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{tool.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">Based on {tool.source}</p>
                      </div>
                    </div>
                    <Badge variant="default" className="text-xs">
                      {tool.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{tool.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Key Features:</h4>
                    <ul className="space-y-1">
                      {tool.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link href={tool.path}>
                    <Button className="w-full group-hover:bg-primary/90">
                      Open {tool.title}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Core Tools */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Core PS99 Tools</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {coreTools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Card key={tool.title} className="group hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6 text-center space-y-4">
                  <div className={`w-12 h-12 mx-auto rounded-lg ${tool.color} text-white flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{tool.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
                  </div>
                  <Link href={tool.path}>
                    <Button variant="outline" size="sm" className="w-full">
                      Open Tool
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Implementation Details */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">19+</div>
              <div className="text-sm text-muted-foreground">Tools Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">8</div>
              <div className="text-sm text-muted-foreground">Active Modules</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">4</div>
              <div className="text-sm text-muted-foreground">Enhancement Tools</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">100%</div>
              <div className="text-sm text-muted-foreground">Feature Coverage</div>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Key Technologies Integrated:</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• <strong>BoostMacro_Slymi:</strong> AutoHotkey-based boost timing automation</li>
              <li>• <strong>MiniMacro:</strong> Python-based macro recording and playback system</li>
              <li>• <strong>FastFlags-Collective:</strong> Comprehensive Roblox performance optimization</li>
              <li>• <strong>RoValra:</strong> Browser extension for real-time value tracking</li>
              <li>• <strong>Double Hatch:</strong> Coordinate-based egg hatching automation</li>
              <li>• <strong>Spencer-Macro-Utilities:</strong> Advanced automation utilities</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}