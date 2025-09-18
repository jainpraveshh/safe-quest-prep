import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Beaker, Atom, Zap, Home, BookOpen } from 'lucide-react';

interface HighSchoolUIProps {
  onBack: () => void;
}

export const HighSchoolUI = ({ onBack }: HighSchoolUIProps) => {
  const [currentSection, setCurrentSection] = useState('home');
  const [completedExperiments, setCompletedExperiments] = useState<string[]>([]);
  const [researchPoints, setResearchPoints] = useState(0);

  const disasters = [
    {
      id: 'fire',
      title: 'Combustion Chemistry',
      description: 'Analyze the chemical reactions and thermodynamics behind fire behavior',
      formula: 'C + O₂ → CO₂ + H₂O + Energy',
      experiment: 'Fire Triangle Disruption Lab',
      color: 'bg-gradient-to-br from-red-400 via-orange-300 to-yellow-200',
      borderColor: 'border-red-500',
      icon: '🔬',
      physics: 'Heat Transfer & Molecular Motion'
    },
    {
      id: 'flood',
      title: 'Fluid Dynamics Analysis',
      description: 'Study water flow patterns, pressure dynamics, and hydraulic forces',
      formula: 'P = ρgh (Hydrostatic Pressure)',
      experiment: 'Water Flow Simulation Lab',
      color: 'bg-gradient-to-br from-blue-400 via-cyan-300 to-teal-200',
      borderColor: 'border-blue-500',
      icon: '💧',
      physics: 'Pressure & Flow Mechanics'
    },
    {
      id: 'cyclone',
      title: 'Atmospheric Physics',
      description: 'Investigate pressure systems, Coriolis forces, and rotational mechanics',
      formula: 'F = ma (Centripetal Force)',
      experiment: 'Pressure Differential Chamber',
      color: 'bg-gradient-to-br from-purple-400 via-indigo-300 to-blue-200',
      borderColor: 'border-purple-500',
      icon: '🌪️',
      physics: 'Rotational Dynamics & Pressure'
    },
    {
      id: 'earthquake',
      title: 'Seismic Wave Analysis',
      description: 'Examine wave propagation, frequency analysis, and structural resonance',
      formula: 'v = fλ (Wave Equation)',
      experiment: 'Seismic Wave Generator',
      color: 'bg-gradient-to-br from-yellow-400 via-amber-300 to-orange-200',
      borderColor: 'border-yellow-500',
      icon: '📊',
      physics: 'Wave Mechanics & Vibration'
    }
  ];

  const handleExperimentClick = (disaster: any) => {
    setCurrentSection('lab');
    if (!completedExperiments.includes(disaster.id)) {
      setResearchPoints(prev => prev + 50);
      setCompletedExperiments(prev => [...prev, disaster.id]);
    }
  };

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-teal-50 p-6">
      {/* Scientific Header with Floating Formulas */}
      <div className="relative text-center mb-8 overflow-hidden">
        {/* Floating Background Formulas */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="animate-float text-4xl font-mono text-blue-600 absolute top-10 left-10">E=mc²</div>
          <div className="animate-float-delay text-3xl font-mono text-green-600 absolute top-20 right-20">F=ma</div>
          <div className="animate-float text-2xl font-mono text-purple-600 absolute bottom-20 left-20">PV=nRT</div>
          <div className="animate-float-delay text-3xl font-mono text-red-600 absolute bottom-10 right-10">H₂O</div>
        </div>
        
        <div className="relative z-10">
          <div className="flex justify-center items-center gap-4 mb-6">
            <Beaker className="h-12 w-12 text-blue-600 animate-pulse" />
            <Atom className="h-12 w-12 text-green-600 animate-spin" />
            <Zap className="h-12 w-12 text-purple-600 animate-bounce" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-700 via-green-600 to-purple-600 bg-clip-text text-transparent mb-4">
            DISASTER SCIENCE LAB
          </h1>
          <p className="text-xl text-gray-700 font-medium">
            Apply scientific principles to understand and prevent disasters
          </p>
        </div>
      </div>

      {/* Research Dashboard */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-200 to-cyan-200 border-2 border-blue-400">
            <CardContent className="p-4 text-center">
              <Beaker className="h-8 w-8 text-blue-700 mx-auto mb-2" />
              <p className="font-bold text-blue-800">Research Points: {researchPoints}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-200 to-teal-200 border-2 border-green-400">
            <CardContent className="p-4 text-center">
              <BookOpen className="h-8 w-8 text-green-700 mx-auto mb-2" />
              <p className="font-bold text-green-800">Experiments: {completedExperiments.length}/4</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-200 to-indigo-200 border-2 border-purple-400">
            <CardContent className="p-4 text-center">
              <Atom className="h-8 w-8 text-purple-700 mx-auto mb-2" />
              <p className="font-bold text-purple-800">Level: {Math.floor(researchPoints / 50) + 1}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-yellow-200 to-orange-200 border-2 border-yellow-400">
            <CardContent className="p-4 text-center">
              <Zap className="h-8 w-8 text-yellow-700 mx-auto mb-2" />
              <p className="font-bold text-yellow-800">Rank: Researcher</p>
            </CardContent>
          </Card>
        </div>

        {/* Scientific Modules */}
        <Tabs defaultValue="experiments" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="experiments">🧪 Experiments</TabsTrigger>
            <TabsTrigger value="simulations">💻 Simulations</TabsTrigger>
            <TabsTrigger value="analysis">📊 Data Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="experiments">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {disasters.map((disaster, index) => (
                <Card 
                  key={disaster.id}
                  className={`${disaster.color} ${disaster.borderColor} border-3 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden`}
                  onClick={() => handleExperimentClick(disaster)}
                >
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-white/80 rounded-full backdrop-blur-sm">
                        <span className="text-4xl">{disaster.icon}</span>
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
                    
                    {/* Scientific Formula */}
                    <div className="bg-white/70 p-4 rounded-lg mb-4 backdrop-blur-sm">
                      <p className="font-mono text-lg font-bold text-gray-800 mb-2">
                        {disaster.formula}
                      </p>
                      <p className="text-sm text-gray-600 font-semibold">
                        {disaster.physics}
                      </p>
                    </div>
                    
                    <div className="bg-slate-200/70 p-3 rounded-lg mb-4">
                      <p className="font-bold text-slate-800">
                        🔬 {disaster.experiment}
                      </p>
                    </div>
                    
                    <Button 
                      className="bg-gradient-to-r from-slate-600 to-blue-600 text-white font-bold text-lg py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                      size="lg"
                    >
                      Start Experiment 🚀
                    </Button>
                    {completedExperiments.includes(disaster.id) && (
                      <Badge className="mt-2 bg-green-600 text-white font-bold">
                        ✅ Research Complete
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="simulations">
            <Card className="bg-gradient-to-r from-slate-200 to-blue-200 border-3 border-slate-400">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-gray-800">
                  🖥️ Virtual Reality Simulations
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/70 p-6 rounded-lg text-center">
                  <div className="text-6xl mb-4">🌊</div>
                  <h4 className="text-xl font-bold mb-2">Fluid Dynamics Simulator</h4>
                  <p className="text-gray-700">Real-time flood modeling with physics calculations</p>
                </div>
                <div className="bg-white/70 p-6 rounded-lg text-center">
                  <div className="text-6xl mb-4">🏗️</div>
                  <h4 className="text-xl font-bold mb-2">Structural Analysis Tool</h4>
                  <p className="text-gray-700">Test building designs against seismic forces</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analysis">
            <Card className="bg-gradient-to-r from-green-200 to-teal-200 border-3 border-green-400">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-gray-800">
                  📈 Scientific Data Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/70 p-6 rounded-lg text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <h4 className="text-lg font-bold mb-2">Seismic Data</h4>
                  <p className="text-sm text-gray-700">Analyze earthquake wave patterns</p>
                </div>
                <div className="bg-white/70 p-6 rounded-lg text-center">
                  <div className="text-4xl mb-4">📈</div>
                  <h4 className="text-lg font-bold mb-2">Weather Patterns</h4>
                  <p className="text-sm text-gray-700">Track atmospheric conditions</p>
                </div>
                <div className="bg-white/70 p-6 rounded-lg text-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <h4 className="text-lg font-bold mb-2">Risk Assessment</h4>
                  <p className="text-sm text-gray-700">Calculate probability matrices</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Navigation */}
      <div className="text-center">
        <Button 
          onClick={onBack}
          className="bg-gradient-to-r from-gray-600 to-slate-700 text-white font-bold text-lg py-3 px-8 rounded-lg shadow-lg"
        >
          🏠 Back to Age Selection
        </Button>
      </div>
    </div>
  );

  const renderLab = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-800 mb-6">
          🎓 Experiment Complete!
        </h2>
        
        <Card className="bg-white shadow-xl border-4 border-blue-500">
          <CardContent className="p-8">
            <div className="text-8xl mb-6">🔬</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Scientific Excellence!
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              You earned 50 research points for completing this experiment!
            </p>
            <Button 
              onClick={() => setCurrentSection('home')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg py-3 px-8 rounded-lg shadow-lg"
            >
              Continue Research! 🚀
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return currentSection === 'home' ? renderHome() : renderLab();
};