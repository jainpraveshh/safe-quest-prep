import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Triangle, Square, Circle, Hexagon, Home, MapPin, AlertTriangle, Trophy } from 'lucide-react';
import { DisasterAlertsPanel } from '@/components/DisasterAlertsPanel';
import { AIChatbot } from '@/components/AIChatbot';
import { EmergencyTools } from '@/components/EmergencyTools';
import { EvacuationRoutes } from '@/components/EvacuationRoutes';
import { DrillSimulation } from '@/components/DrillSimulation';
import { AchievementSystem } from '@/components/AchievementSystem';

interface MiddleSchoolUIProps {
  onBack: () => void;
}

export const MiddleSchoolUI = ({ onBack }: MiddleSchoolUIProps) => {
  const [currentSection, setCurrentSection] = useState('home');
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [selectedDisaster, setSelectedDisaster] = useState<string | null>(null);

  const disasters = [
    {
      id: 'fire',
      title: 'Fire Triangle Analysis',
      description: 'Understand the science behind fire prevention using the fire triangle concept',
      shape: Triangle,
      color: 'bg-gradient-to-br from-red-300 via-orange-200 to-yellow-200',
      borderColor: 'border-red-400',
      icon: '🔺',
      concept: 'Heat + Fuel + Oxygen = Fire'
    },
    {
      id: 'flood',
      title: 'Water Cycle Disruption',
      description: 'Learn how extreme weather patterns create flood conditions',
      shape: Circle,
      color: 'bg-gradient-to-br from-blue-300 via-cyan-200 to-teal-200',
      borderColor: 'border-blue-400',
      icon: '🔵',
      concept: 'Precipitation > Absorption = Flood'
    },
    {
      id: 'cyclone',
      title: 'Geometric Wind Patterns',
      description: 'Explore how circular motion creates powerful cyclonic systems',
      shape: Circle,
      color: 'bg-gradient-to-br from-purple-300 via-pink-200 to-indigo-200',
      borderColor: 'border-purple-400',
      icon: '⭕',
      concept: 'Low Pressure + Rotation = Cyclone'
    },
    {
      id: 'earthquake',
      title: 'Structural Geometry',
      description: 'Understand how geometric shapes affect building stability during earthquakes',
      shape: Square,
      color: 'bg-gradient-to-br from-yellow-300 via-amber-200 to-orange-200',
      borderColor: 'border-yellow-400',
      icon: '🔶',
      concept: 'Base Area + Height = Stability'
    }
  ];

  const handleDisasterClick = (disaster: any) => {
    setSelectedDisaster(disaster.id);
    setCurrentSection('puzzle');
    if (!completedQuizzes.includes(disaster.id)) {
      setScore(prev => prev + 25);
      setCompletedQuizzes(prev => [...prev, disaster.id]);
    }
  };

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-orange-50 to-cyan-100 p-6">
      {/* Geometric Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-4 mb-6">
          <Triangle className="h-12 w-12 text-purple-600 animate-spin" />
          <Square className="h-12 w-12 text-orange-600 animate-pulse" />
          <Circle className="h-12 w-12 text-cyan-600 animate-bounce" />
          <Hexagon className="h-12 w-12 text-pink-600 animate-spin" />
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-orange-500 to-cyan-600 bg-clip-text text-transparent mb-4">
          GEOMETRY SAFETY LAB
        </h1>
        <p className="text-xl text-gray-700 font-semibold">
          Solve geometric puzzles to master disaster preparedness!
        </p>
      </div>

      {/* Score Dashboard */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-purple-200 to-pink-200 border-2 border-purple-400">
            <CardContent className="p-4 text-center">
              <Triangle className="h-8 w-8 text-purple-700 mx-auto mb-2" />
              <p className="font-bold text-purple-800">Score: {score}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-200 to-yellow-200 border-2 border-orange-400">
            <CardContent className="p-4 text-center">
              <Square className="h-8 w-8 text-orange-700 mx-auto mb-2" />
              <p className="font-bold text-orange-800">Completed: {completedQuizzes.length}/4</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-cyan-200 to-blue-200 border-2 border-cyan-400">
            <CardContent className="p-4 text-center">
              <Circle className="h-8 w-8 text-cyan-700 mx-auto mb-2" />
              <p className="font-bold text-cyan-800">Level: {Math.floor(score / 25) + 1}</p>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Access */}
        <div className="mb-8">
          <Button 
            onClick={() => setCurrentSection('emergency')}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xl py-4 rounded-lg shadow-lg animate-pulse"
          >
            🚨 EMERGENCY MODE 🚨
          </Button>
        </div>

        {/* Disaster Modules in Geometric Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {disasters.map((disaster, index) => (
            <Card 
              key={disaster.id}
              className={`${disaster.color} ${disaster.borderColor} border-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:rotate-1 cursor-pointer overflow-hidden`}
              onClick={() => handleDisasterClick(disaster)}
            >
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className={`p-4 bg-white/70 rounded-full transform rotate-${index * 45}`}>
                    <span className="text-6xl">{disaster.icon}</span>
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  {disaster.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-gray-700 mb-4 font-medium">
                  {disaster.description}
                </p>
                <div className="bg-white/60 p-3 rounded-lg mb-4">
                  <p className="font-bold text-gray-800 text-lg">
                    📐 {disaster.concept}
                  </p>
                </div>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-orange-500 text-white font-bold text-lg py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                    size="lg"
                    onClick={() => handleDisasterClick(disaster)}
                  >
                    Solve Puzzle! 🧩
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0 font-bold"
                    onClick={() => {
                      setSelectedDisaster(disaster.id);
                      setCurrentSection('drill');
                    }}
                  >
                    Practice Drill! 🎯
                  </Button>
                </div>
                {completedQuizzes.includes(disaster.id) && (
                  <Badge className="mt-2 bg-green-500 text-white font-bold">
                    ✅ Solved!
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Interactive Geometry Zone */}
      <div className="max-w-4xl mx-auto mb-8">
        <Card className="bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 border-4 border-indigo-400 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800">
              🎯 Interactive Safety Geometry
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Triangle Evacuation Paths</h4>
                <div className="bg-white/60 p-6 rounded-lg">
                  <Triangle className="h-24 w-24 mx-auto text-red-600 mb-4" />
                  <p className="text-gray-700">Find the shortest evacuation route using triangle geometry!</p>
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold text-gray-800 mb-4">Circle Safety Zones</h4>
                <div className="bg-white/60 p-6 rounded-lg">
                  <Circle className="h-24 w-24 mx-auto text-blue-600 mb-4" />
                  <p className="text-gray-700">Calculate safe distances using circular radius concepts!</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Features Grid */}
      <div className="max-w-4xl mx-auto mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button 
          onClick={() => setCurrentSection('alerts')}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4"
        >
          📊 Live Alerts
        </Button>
        <Button 
          onClick={() => setCurrentSection('routes')}
          className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-4"
        >
          🗺️ Routes Map
        </Button>
        <Button 
          onClick={() => setCurrentSection('achievements')}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold py-4"
        >
          🏆 Achievements
        </Button>
        <Button 
          onClick={() => setCurrentSection('emergency')}
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold py-4"
        >
          🚨 Emergency
        </Button>
      </div>

      {/* Navigation */}
      <div className="text-center">
        <Button 
          onClick={onBack}
          className="bg-gradient-to-r from-gray-500 to-purple-600 text-white font-bold text-lg py-3 px-8 rounded-lg shadow-lg"
        >
          🏠 Back to Age Selection
        </Button>
      </div>
    </div>
  );

  const renderPuzzle = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-green-800 mb-6">
          🎉 Puzzle Solved!
        </h2>
        
        <Card className="bg-white shadow-xl border-4 border-green-400">
          <CardContent className="p-8">
            <div className="text-8xl mb-6">🏆</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Geometric Genius!
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              You earned 25 points for solving this safety puzzle!
            </p>
            <Button 
              onClick={() => setCurrentSection('home')}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-lg py-3 px-8 rounded-lg shadow-lg"
            >
              Continue Learning! 📐
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Render different sections based on currentSection
  if (currentSection === 'home') return renderHome();
  if (currentSection === 'puzzle') return renderPuzzle();
  if (currentSection === 'drill' && selectedDisaster) {
    return (
      <DrillSimulation 
        disasterType={selectedDisaster}
        onBack={() => setCurrentSection('home')}
        onComplete={() => {
          setScore(prev => prev + 50);
          setCurrentSection('home');
        }}
      />
    );
  }
  if (currentSection === 'emergency') {
    return <EmergencyTools onBack={() => setCurrentSection('home')} />;
  }
  if (currentSection === 'routes') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-orange-50 to-cyan-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <Button 
              onClick={() => setCurrentSection('home')}
              className="mb-4 bg-gradient-to-r from-purple-500 to-orange-500 text-white font-bold"
            >
              🏠 Back to Geometry Lab
            </Button>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-orange-500 to-cyan-600 bg-clip-text text-transparent mb-4">
              📐 GEOMETRIC EVACUATION ROUTES
            </h1>
            <p className="text-lg text-muted-foreground">Calculate the shortest and safest paths using geometry!</p>
          </div>
          <EvacuationRoutes disasterType="general" />
        </div>
        <AIChatbot />
      </div>
    );
  }
  if (currentSection === 'achievements') {
    return <AchievementSystem onClose={() => setCurrentSection('home')} />;
  }
  if (currentSection === 'alerts') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-orange-50 to-cyan-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <Button 
              onClick={() => setCurrentSection('home')}
              className="mb-4 bg-gradient-to-r from-purple-500 to-orange-500 text-white font-bold"
            >
              🏠 Back to Geometry Lab
            </Button>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-orange-500 to-cyan-600 bg-clip-text text-transparent mb-4">
              📊 DISASTER ANALYTICS DASHBOARD
            </h1>
          </div>
          <DisasterAlertsPanel />
        </div>
        <AIChatbot />
      </div>
    );
  }
  
  return renderHome();
};