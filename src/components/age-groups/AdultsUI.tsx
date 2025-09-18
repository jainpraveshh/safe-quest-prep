import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Users, 
  BarChart3, 
  Settings, 
  Home, 
  Shield,
  BookOpen,
  ClipboardCheck,
  AlertTriangle,
  Phone
} from 'lucide-react';

interface AdultsUIProps {
  onBack: () => void;
}

export const AdultsUI = ({ onBack }: AdultsUIProps) => {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [completedTrainings, setCompletedTrainings] = useState<string[]>([]);

  const disasters = [
    {
      id: 'fire',
      title: 'Fire Safety Management',
      description: 'Complete fire safety protocols, evacuation procedures, and emergency response coordination',
      modules: ['Fire Prevention', 'Evacuation Planning', 'Emergency Coordination', 'Post-Incident Analysis'],
      certification: 'Fire Safety Coordinator',
      color: 'bg-red-50 border-red-200',
      icon: '🔥',
      duration: '4 hours'
    },
    {
      id: 'flood',
      title: 'Flood Response Management',
      description: 'Comprehensive flood preparedness, response strategies, and community coordination',
      modules: ['Risk Assessment', 'Early Warning Systems', 'Resource Management', 'Recovery Planning'],
      certification: 'Flood Response Manager',
      color: 'bg-blue-50 border-blue-200',
      icon: '🌊',
      duration: '5 hours'
    },
    {
      id: 'cyclone',
      title: 'Cyclone Preparedness',
      description: 'Advanced cyclone tracking, community preparation, and disaster response coordination',
      modules: ['Weather Monitoring', 'Infrastructure Protection', 'Community Mobilization', 'Emergency Services'],
      certification: 'Cyclone Response Specialist',
      color: 'bg-purple-50 border-purple-200',
      icon: '🌪️',
      duration: '6 hours'
    },
    {
      id: 'earthquake',
      title: 'Seismic Safety Leadership',
      description: 'Earthquake preparedness, structural assessment, and emergency response leadership',
      modules: ['Structural Safety', 'Search & Rescue', 'Medical Response', 'Infrastructure Recovery'],
      certification: 'Seismic Safety Leader',
      color: 'bg-yellow-50 border-yellow-200',
      icon: '🏚️',
      duration: '7 hours'
    }
  ];

  const renderDashboard = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Professional Header */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg mb-8 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Shield className="h-12 w-12 text-blue-600" />
              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Professional Disaster Management Center
                </h1>
                <p className="text-lg text-gray-600">
                  Comprehensive training and certification platform for educators and emergency professionals
                </p>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800 text-lg py-2 px-4">
              Certified Instructor
            </Badge>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4 text-center">
                <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-800">{completedTrainings.length}/4</p>
                <p className="text-blue-700 font-medium">Certifications</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-800">156</p>
                <p className="text-green-700 font-medium">Students Trained</p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4 text-center">
                <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-800">98%</p>
                <p className="text-purple-700 font-medium">Success Rate</p>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4 text-center">
                <ClipboardCheck className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-800">24</p>
                <p className="text-orange-700 font-medium">Active Drills</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="training" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="training">📚 Training Modules</TabsTrigger>
            <TabsTrigger value="resources">📄 Resources</TabsTrigger>
            <TabsTrigger value="reports">📊 Reports</TabsTrigger>
            <TabsTrigger value="emergency">🚨 Emergency</TabsTrigger>
          </TabsList>

          <TabsContent value="training">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {disasters.map((disaster) => (
                <Card 
                  key={disaster.id}
                  className={`${disaster.color} hover:shadow-lg transition-all duration-300 cursor-pointer`}
                  onClick={() => {
                    if (!completedTrainings.includes(disaster.id)) {
                      setCompletedTrainings(prev => [...prev, disaster.id]);
                    }
                  }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">{disaster.icon}</span>
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-800">
                          {disaster.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600">Duration: {disaster.duration}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{disaster.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Training Modules:</h4>
                      <div className="space-y-1">
                        {disaster.modules.map((module, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            {module}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge className="bg-gray-200 text-gray-800">
                        {disaster.certification}
                      </Badge>
                      {completedTrainings.includes(disaster.id) ? (
                        <Badge className="bg-green-600 text-white">
                          ✅ Certified
                        </Badge>
                      ) : (
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                          Start Training
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Training Manuals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['Emergency Response Guide', 'Evacuation Procedures', 'First Aid Manual', 'Communication Protocols'].map((manual, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm font-medium">{manual}</span>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Student Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded">
                      <h4 className="font-semibold text-blue-800">Class Progress</h4>
                      <p className="text-sm text-blue-700">Track individual and group progress</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded">
                      <h4 className="font-semibold text-green-800">Certificates</h4>
                      <p className="text-sm text-green-700">Generate completion certificates</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded">
                      <h4 className="font-semibold text-purple-800">Reports</h4>
                      <p className="text-sm text-purple-700">Detailed performance analytics</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    School Administration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <ClipboardCheck className="h-4 w-4 mr-2" />
                      Drill Schedule
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Risk Assessment
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="h-4 w-4 mr-2" />
                      Emergency Contacts
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Analytics Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

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
                      <Button size="sm">View Analytics</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emergency">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6" />
                  Emergency Response Center
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-lg text-red-800 mb-4">Emergency Contacts</h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-white rounded border">
                        <p className="font-semibold">Police: 100</p>
                      </div>
                      <div className="p-3 bg-white rounded border">
                        <p className="font-semibold">Fire: 101</p>
                      </div>
                      <div className="p-3 bg-white rounded border">
                        <p className="font-semibold">Ambulance: 108</p>
                      </div>
                      <div className="p-3 bg-white rounded border">
                        <p className="font-semibold">Disaster Management: 1078</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-red-800 mb-4">Quick Actions</h4>
                    <div className="space-y-3">
                      <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3">
                        🚨 Activate School Emergency Protocol
                      </Button>
                      <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3">
                        📢 Send Alert to All Staff
                      </Button>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3">
                        📋 Open Emergency Checklist
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="text-center mt-8">
          <Button 
            onClick={onBack}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold text-lg py-3 px-8 rounded-lg shadow-lg"
          >
            🏠 Back to Age Selection
          </Button>
        </div>
      </div>
    </div>
  );

  return renderDashboard();
};