import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, Users, BarChart3, Settings, Home, Shield, AlertTriangle, 
  BookOpen, MapPin, Trophy, LifeBuoy 
} from 'lucide-react';
import { StudentDashboard } from '@/components/StudentDashboard';
import { AdminDashboard } from '@/components/AdminDashboard';
import { DisasterSelection } from '@/components/DisasterSelection';
import { DisasterAlertsPanel } from '@/components/DisasterAlertsPanel';
import { AIChatbot } from '@/components/AIChatbot';
import { EmergencyTools } from '@/components/EmergencyTools';
import { EvacuationRoutes } from '@/components/EvacuationRoutes';
import { DrillSimulation } from '@/components/DrillSimulation';
import { AchievementSystem } from '@/components/AchievementSystem';

// --- THEME-BASED UI: Helper components and data ---

// A reusable stat card for the new header, matching the screenshot's theme
const StatCard = ({ icon: Icon, label, value, gradient }: { icon: React.ElementType, label: string, value: string, gradient: string }) => (
  <div className={`p-4 rounded-2xl text-white flex items-center space-x-4 shadow-lg border border-white/20 ${gradient}`}>
    <div className="bg-white/20 p-3 rounded-full">
      <Icon className="h-6 w-6" />
    </div>
    <div>
      <div className="text-sm font-light opacity-80">{label}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  </div>
);

const trainingModules = [
  { title: "Fire Triangle Analysis", id: "fire", gradient: "from-orange-400 via-red-400 to-pink-500" },
  { title: "Water Cycle Disruption", id: "flood", gradient: "from-blue-400 via-cyan-400 to-teal-500" },
  { title: "Seismic Wave Drills", id: "earthquake", gradient: "from-purple-400 via-indigo-400 to-blue-500" },
  { title: "Storm Surge Safety", id: "cyclone", gradient: "from-green-400 via-emerald-400 to-cyan-500" },
];

interface AdultsUIProps {
  onBack: () => void;
}

export const AdultsUI = ({ onBack }: AdultsUIProps) => {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [selectedDisaster, setSelectedDisaster] = useState<string | null>(null);

  // --- Conditional Rendering for Full-Screen Views ---
  // The logic remains the same, but we will style these components eventually to match
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
    return <DrillSimulation disasterType={selectedDisaster} onBack={() => setCurrentSection('disaster-selection')} onComplete={() => setCurrentSection('dashboard')} />;
  }
  if (currentSection === 'emergency') {
    return <EmergencyTools onBack={() => setCurrentSection('dashboard')} />;
  }
  if (currentSection === 'routes') {
    return <EvacuationRoutes disasterType="general" />;
  }
  if (currentSection === 'achievements') {
    return <AchievementSystem onClose={() => setCurrentSection('dashboard')} />;
  }

  // --- Main Enhanced UI based on the new theme ---
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* NEW HEADER: Inspired by the screenshot's top bar and emergency banner */}
      <header className="container mx-auto px-4 py-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            <Button 
              onClick={onBack}
              className="h-full text-lg bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-2xl shadow-md border"
            >
              <Home className="h-5 w-5 mr-3" /> Age Selection
            </Button>
            <StatCard icon={Users} label="Active Users" value="1,247" gradient="bg-gradient-to-br from-purple-500 to-indigo-600" />
            <StatCard icon={Trophy} label="Drills Completed" value="312" gradient="bg-gradient-to-br from-yellow-500 to-orange-600" />
            <StatCard icon={Shield} label="Preparedness Level" value="Advanced" gradient="bg-gradient-to-br from-cyan-500 to-blue-600" />
        </div>
        <div 
          onClick={() => setCurrentSection('emergency')} 
          className="bg-red-500 text-white flex items-center justify-center p-3 rounded-2xl font-bold text-lg tracking-wider cursor-pointer shadow-lg shadow-red-500/30 animate-pulse hover:animate-none transition-transform hover:scale-105"
        >
          <AlertTriangle className="h-6 w-6 mr-3" />
          EMERGENCY MODE
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={currentSection} onValueChange={setCurrentSection}>
          {/* NEW TABS: Styled to be pill-shaped buttons */}
          <div className="flex justify-center mb-10">
            <TabsList className="bg-gray-100 p-2 rounded-full space-x-2 h-auto">
              <TabsTrigger value="dashboard" className="rounded-full px-4 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg">Dashboard</TabsTrigger>
              <TabsTrigger value="training" className="rounded-full px-4 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg">Training</TabsTrigger>
              <TabsTrigger value="alerts" className="rounded-full px-4 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg">Alerts</TabsTrigger>
              <TabsTrigger value="reports" className="rounded-full px-4 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg">Reports</TabsTrigger>
              <TabsTrigger value="resources" className="rounded-full px-4 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg">Resources</TabsTrigger>
              <TabsTrigger value="settings" className="rounded-full px-4 py-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg">Settings</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Training Tab (The most direct theme application) */}
          <TabsContent value="training">
            <div className="grid md:grid-cols-2 gap-8">
              {trainingModules.map((module) => (
                <div key={module.id} className={`p-8 rounded-3xl text-white bg-gradient-to-br ${module.gradient} shadow-2xl border-2 border-white/50`}>
                  <CardTitle className="text-3xl font-bold mb-3">{module.title}</CardTitle>
                  <CardDescription className="text-white/80 mb-6">
                    Learn the critical skills to stay safe during a {module.id} event.
                  </CardDescription>
                  <div className="flex flex-col space-y-3">
                    <Button 
                      className="text-lg rounded-xl h-14 bg-gradient-to-r from-orange-400 to-yellow-400 text-white shadow-lg transition-transform hover:scale-105"
                      onClick={() => { setSelectedDisaster(module.id); setCurrentSection('disaster-selection'); }}
                    >
                      Start Training Module
                    </Button>
                    <Button 
                      className="text-lg rounded-xl h-14 bg-gradient-to-r from-cyan-400 to-teal-400 text-white shadow-lg transition-transform hover:scale-105"
                      onClick={() => { setSelectedDisaster(module.id); setCurrentSection('drill'); }}
                    >
                      Practice Drill
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* All other tabs are styled to be consistent */}
          <TabsContent value="dashboard">
             <Card className="rounded-3xl shadow-xl border p-6">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Quick Actions</CardTitle>
                  <CardDescription>Your most-used tools, ready to go.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                      { label: 'Student Progress', icon: Users, section: 'student-dashboard', gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500'},
                      { label: 'Admin Panel', icon: FileText, section: 'admin-dashboard', gradient: 'bg-gradient-to-r from-green-500 to-emerald-500' },
                      { label: 'Evacuation Routes', icon: MapPin, section: 'routes', gradient: 'bg-gradient-to-r from-purple-500 to-indigo-500' },
                      { label: 'Achievements', icon: Trophy, section: 'achievements', gradient: 'bg-gradient-to-r from-yellow-500 to-orange-500' },
                  ].map(action => (
                    <Button key={action.label} className={`h-28 flex-col text-white text-md rounded-2xl shadow-lg transition-transform hover:scale-105 ${action.gradient}`} onClick={() => setCurrentSection(action.section)}>
                      <action.icon className="h-8 w-8 mb-2" />
                      {action.label}
                    </Button>
                  ))}
                </CardContent>
             </Card>
          </TabsContent>
          
          <TabsContent value="alerts">
            <Card className="rounded-3xl shadow-xl border"><DisasterAlertsPanel /></Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="rounded-3xl shadow-xl border p-4">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Generate Performance Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full h-14 rounded-xl text-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg">Individual Progress Report</Button>
                <Button className="w-full h-14 rounded-xl text-lg bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg" onClick={() => setCurrentSection('admin-dashboard')}>School-Wide Analytics</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Training Materials', icon: BookOpen },
                  { title: 'Advanced Features', icon: Settings },
                  { title: 'Help & Support', icon: LifeBuoy }
                ].map(card => (
                  <Card key={card.title} className="rounded-3xl shadow-xl border text-center p-6">
                    <card.icon className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                    <CardTitle className="text-xl font-bold">{card.title}</CardTitle>
                  </Card>
                ))}
             </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="rounded-3xl shadow-xl border p-4">
               <CardHeader><CardTitle className="text-2xl font-bold">System & Account Settings</CardTitle></CardHeader>
               <CardContent className="space-y-3">
                 <Button variant="outline" className="w-full h-12 rounded-xl text-md justify-start pl-6 border-2">Configure Notifications</Button>
                 <Button variant="outline" className="w-full h-12 rounded-xl text-md justify-start pl-6 border-2">Manage User Permissions</Button>
                 <Button variant="outline" className="w-full h-12 rounded-xl text-md justify-start pl-6 border-2">Security Settings</Button>
               </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </main>
      <AIChatbot />
    </div>
  );
};