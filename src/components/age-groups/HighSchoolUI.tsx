import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Beaker, Atom, Microscope, Calculator, Home } from 'lucide-react';
import { DisasterAlertsPanel } from '@/components/DisasterAlertsPanel';
import { AIChatbot } from '@/components/AIChatbot';
import { EmergencyTools } from '@/components/EmergencyTools';
import { EvacuationRoutes } from '@/components/EvacuationRoutes';
import { DrillSimulation } from '@/components/DrillSimulation';
import { AchievementSystem } from '@/components/AchievementSystem';

interface HighSchoolUIProps {
  onBack: () => void;
}

export const HighSchoolUI = ({ onBack }: HighSchoolUIProps) => {
  const [currentSection, setCurrentSection] = useState('home');
  const [completedExperiments, setCompletedExperiments] = useState<string[]>([]);
  const [labPoints, setLabPoints] = useState(0);
  const [selectedDisaster, setSelectedDisaster] = useState<string | null>(null);

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

  const handleExperimentClick = (experiment: any) => {
    setSelectedDisaster(experiment.id);
    setCurrentSection('experiment');
    if (!completedExperiments.includes(experiment.id)) {
      setLabPoints(prev => prev + 50);
      setCompletedExperiments(prev => [...prev, experiment.id]);
    }
  };

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-teal-50 to-green-50 p-6">
      <div className="relative text-center mb-8">
        <div className="flex justify-center items-center gap-4 mb-6">
          <Beaker className="h-12 w-12 text-blue-600 animate-pulse" />
          <Atom className="h-12 w-12 text-green-600 animate-spin" />
          <Microscope className="h-12 w-12 text-purple-600 animate-bounce" />
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-green-600 bg-clip-text text-transparent mb-4">
          DISASTER SCIENCE LAB
        </h1>
        <p className="text-xl text-gray-700 font-medium">
          Apply scientific principles to understand disasters
        </p>
      </div>

      <div className="max-w-7xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-200 to-cyan-200 border-2 border-blue-400">
            <CardContent className="p-4 text-center">
              <Beaker className="h-8 w-8 text-blue-700 mx-auto mb-2" />
              <p className="font-bold text-blue-800">Lab Points: {labPoints}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-200 to-teal-200 border-2 border-green-400">
            <CardContent className="p-4 text-center">
              <Calculator className="h-8 w-8 text-green-700 mx-auto mb-2" />
              <p className="font-bold text-green-800">Experiments: {completedExperiments.length}/4</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-200 to-indigo-200 border-2 border-purple-400">
            <CardContent className="p-4 text-center">
              <Atom className="h-8 w-8 text-purple-700 mx-auto mb-2" />
              <p className="font-bold text-purple-800">Level: {Math.floor(labPoints / 50) + 1}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-yellow-200 to-orange-200 border-2 border-yellow-400">
            <CardContent className="p-4 text-center">
              <Microscope className="h-8 w-8 text-yellow-700 mx-auto mb-2" />
              <p className="font-bold text-yellow-800">Rank: Researcher</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {disasters.map((experiment, index) => (
            <Card 
              key={experiment.id}
              className={`${experiment.color} ${experiment.borderColor} border-3 shadow-xl hover:shadow-2xl transition-all cursor-pointer`}
              onClick={() => handleExperimentClick(experiment)}
            >
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-white/80 rounded-full">
                    <span className="text-4xl">{experiment.icon}</span>
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  {experiment.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-gray-700 mb-4">{experiment.description}</p>
                <div className="bg-white/70 p-4 rounded-lg mb-4">
                  <p className="font-mono text-lg font-bold text-gray-800 mb-2">{experiment.formula}</p>
                  <p className="text-sm text-gray-600">{experiment.physics}</p>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold">
                  Run Experiment! ⚗️
                </Button>
                {completedExperiments.includes(experiment.id) && (
                  <Badge className="mt-2 bg-green-600 text-white font-bold">✅ Complete</Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Button onClick={onBack} className="bg-gradient-to-r from-gray-700 to-blue-600 text-white font-bold">
          🏠 Back to Age Selection
        </Button>
      </div>
    </div>
  );

  const renderExperiment = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-800 mb-6">🎓 Experiment Complete!</h2>
        <Card className="bg-white shadow-xl border-4 border-blue-500">
          <CardContent className="p-8">
            <div className="text-8xl mb-6">🔬</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Scientific Excellence!</h3>
            <p className="text-lg text-gray-600 mb-6">You earned 50 lab points!</p>
            <Button onClick={() => setCurrentSection('home')} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold">
              Continue Research! 🚀
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Handle sections
  if (currentSection === 'experiment') return renderExperiment();
  if (currentSection === 'drill' && selectedDisaster) {
    return (
      <DrillSimulation 
        disasterType={selectedDisaster}
        onBack={() => setCurrentSection('home')}
        onComplete={() => {
          setLabPoints(prev => prev + 75);
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
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-teal-50 to-green-50 p-6">
        <div className="max-w-6xl mx-auto">
          <Button onClick={() => setCurrentSection('home')} className="mb-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold">
            🏠 Back to Science Lab
          </Button>
          <h1 className="text-4xl font-bold text-center mb-8">🗺️ SCIENTIFIC ROUTE ANALYSIS</h1>
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
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-teal-50 to-green-50 p-6">
        <div className="max-w-6xl mx-auto">
          <Button onClick={() => setCurrentSection('home')} className="mb-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold">
            🏠 Back to Science Lab
          </Button>
          <h1 className="text-4xl font-bold text-center mb-8">📊 DISASTER RESEARCH ANALYTICS</h1>
          <DisasterAlertsPanel />
        </div>
        <AIChatbot />
      </div>
    );
  }
  
  return renderHome();
};