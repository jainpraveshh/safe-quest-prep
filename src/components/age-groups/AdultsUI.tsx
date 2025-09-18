import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Users, BarChart3, Settings, Home, Shield, AlertTriangle, BookOpen, MapPin, Trophy } from 'lucide-react';
import { StudentDashboard } from '@/components/StudentDashboard';
import { AdminDashboard } from '@/components/AdminDashboard';
import { DisasterSelection } from '@/components/DisasterSelection';
import { DisasterAlertsPanel } from '@/components/DisasterAlertsPanel';
import { AIChatbot } from '@/components/AIChatbot';
import { EmergencyTools } from '@/components/EmergencyTools';
import { EvacuationRoutes } from '@/components/EvacuationRoutes';
import { DrillSimulation } from '@/components/DrillSimulation';
import { AchievementSystem } from '@/components/AchievementSystem';

interface AdultsUIProps {
  onBack: () => void;
}

export const AdultsUI = ({ onBack }: AdultsUIProps) => {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [selectedDisaster, setSelectedDisaster] = useState<string | null>(null);

  // Handle different sections
  if (currentSection === 'student-dashboard') {
    return <StudentDashboard onBack={() => setCurrentSection('dashboard')} />;
  }
  if (currentSection === 'admin-dashboard') {
    return <AdminDashboard onBack={() => setCurrentSection('dashboard')} />;
  }
  if (currentSection === 'disaster-selection') {
    return <DisasterSelection onBack={() => setCurrentSection('dashboard')} onSelectDisaster={(type) => {
      if (type.includes('-drill')) {
        setSelectedDisaster(type.replace('-drill', ''));
        setCurrentSection('drill');
      } else {
        setSelectedDisaster(type);
        setCurrentSection('disaster-info');
      }
    }} />;
  }
  if (currentSection === 'drill' && selectedDisaster) {
    return (
      <DrillSimulation 
        disasterType={selectedDisaster}
        onBack={() => setCurrentSection('disaster-selection')}
        onComplete={() => setCurrentSection('dashboard')}
      />
    );
  }
  if (currentSection === 'emergency') {
    return <EmergencyTools onBack={() => setCurrentSection('dashboard')} />;
  }
  if (currentSection === 'routes') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <Button 
              onClick={() => setCurrentSection('dashboard')}
              className="mb-4 bg-gradient-to-r from-gray-700 to-blue-600 text-white font-bold"
            >
              🏠 Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              🗺️ PROFESSIONAL EVACUATION ROUTE MANAGEMENT
            </h1>
            <p className="text-lg text-muted-foreground">Advanced route planning and optimization tools</p>
          </div>
          <EvacuationRoutes disasterType="general" />
        </div>
        <AIChatbot />
      </div>
    );
  }
  if (currentSection === 'achievements') {
    return <AchievementSystem onClose={() => setCurrentSection('dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Professional Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="text-gray-600">
                <Home className="h-4 w-4 mr-2" />
                Age Selection
              </Button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-800">EduShield Professional</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-green-500 text-green-700">
                <Shield className="h-3 w-3 mr-1" />
                System Active
              </Badge>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => setCurrentSection('emergency')}
                className="animate-pulse"
              >
                🚨 Emergency Mode
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={currentSection} onValueChange={setCurrentSection}>
          <TabsList className="grid grid-cols-6 w-full max-w-3xl mx-auto mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="alerts">Live Alerts</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        variant="outline" 
                        className="h-20 flex-col"
                        onClick={() => setCurrentSection('student-dashboard')}
                      >
                        <Users className="h-6 w-6 mb-2 text-blue-600" />
                        Student Progress
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex-col"
                        onClick={() => setCurrentSection('disaster-selection')}
                      >
                        <AlertTriangle className="h-6 w-6 mb-2 text-orange-600" />
                        Start Training
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex-col"
                        onClick={() => setCurrentSection('admin-dashboard')}
                      >
                        <FileText className="h-6 w-6 mb-2 text-green-600" />
                        Admin Panel
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex-col"
                        onClick={() => setCurrentSection('routes')}
                      >
                        <MapPin className="h-6 w-6 mb-2 text-purple-600" />
                        Evacuation Routes
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* System Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-green-600" />
                      System Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">98.5%</div>
                        <div className="text-sm text-muted-foreground">System Uptime</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">1,247</div>
                        <div className="text-sm text-muted-foreground">Active Users</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">Real-time</div>
                        <div className="text-sm text-muted-foreground">Alert Status</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar - Quick Stats */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Active Drills</span>
                        <Badge variant="secondary">4</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Completed Training</span>
                        <Badge variant="secondary">12</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Alerts Issued</span>
                        <Badge variant="secondary">2</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">System Health</span>
                        <Badge variant="default" className="bg-green-600">Excellent</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Access</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Trophy className="h-4 w-4 mr-2" />
                        Achievements
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Analytics
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Training Tab */}
          <TabsContent value="training">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Disaster Preparedness Training Modules</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { title: "Earthquake Response", status: "Available", color: "text-green-600", id: "earthquake" },
                      { title: "Fire Safety", status: "Available", color: "text-green-600", id: "fire" },
                      { title: "Flood Management", status: "Available", color: "text-green-600", id: "flood" },
                      { title: "Cyclone Preparedness", status: "Available", color: "text-green-600", id: "cyclone" },
                    ].map((module, index) => (
                      <Card key={index} className="border cursor-pointer hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{module.title}</h4>
                            <Badge variant="outline" className={module.color}>
                              {module.status}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <Button 
                              size="sm" 
                              className="w-full"
                              onClick={() => {
                                setSelectedDisaster(module.id);
                                setCurrentSection('disaster-selection');
                              }}
                            >
                              Start Training
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full"
                              onClick={() => {
                                setSelectedDisaster(module.id);
                                setCurrentSection('drill');
                              }}
                            >
                              Practice Drill
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Live Alerts Tab */}
          <TabsContent value="alerts">
            <div className="space-y-6">
              <DisasterAlertsPanel />
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Training & Performance Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Individual Progress Reports</h4>
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="text-sm text-gray-600 mb-2">Student completion rates, quiz scores, and certification status</p>
                      <Button size="sm">Generate Report</Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">School-Wide Analytics</h4>
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="text-sm text-gray-600 mb-2">Overall preparedness levels, drill effectiveness, and improvement areas</p>
                      <Button size="sm" onClick={() => setCurrentSection('admin-dashboard')}>View Analytics</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Training Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Instructor Guides
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Emergency Manuals
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Safety Checklists
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setCurrentSection('achievements')}
                    >
                      <Trophy className="h-4 w-4 mr-2" />
                      Achievement System
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setCurrentSection('routes')}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Route Planning
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setCurrentSection('alerts')}
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Live Monitoring
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Training Support
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      System Configuration
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      Security Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Alert Notifications</label>
                      <Button variant="outline" size="sm" className="ml-2">Configure</Button>
                    </div>
                    <div>
                      <label className="text-sm font-medium">User Permissions</label>
                      <Button variant="outline" size="sm" className="ml-2">Manage</Button>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Backup Settings</label>
                      <Button variant="outline" size="sm" className="ml-2">Setup</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Profile Settings</label>
                      <Button variant="outline" size="sm" className="ml-2">Edit</Button>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Security</label>
                      <Button variant="outline" size="sm" className="ml-2">Update</Button>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Preferences</label>
                      <Button variant="outline" size="sm" className="ml-2">Customize</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <AIChatbot />
    </div>
  );
};