import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, Home, Trophy, Users, AlertTriangle, MapPin } from 'lucide-react';
import { DisasterAlertsPanel } from '@/components/DisasterAlertsPanel';
import { AIChatbot } from '@/components/AIChatbot';
import { EmergencyTools } from '@/components/EmergencyTools';
import { EvacuationRoutes } from '@/components/EvacuationRoutes';
import { DrillSimulation } from '@/components/DrillSimulation';
import { AchievementSystem } from '@/components/AchievementSystem';

interface KidsUIProps {
  onBack: () => void;
}

export const KidsUI = ({ onBack }: KidsUIProps) => {
  const [currentSection, setCurrentSection] = useState('home');
  const [badges, setBadges] = useState<string[]>([]);
  const [points, setPoints] = useState(0);
  const [selectedDisaster, setSelectedDisaster] = useState<string | null>(null);

  const disasters = [
    {
      id: 'fire',
      title: '🔥 Fire Safety',
      description: 'Learn how to stay safe from fires!',
      mascot: '🚒',
      color: 'bg-gradient-to-br from-red-200 to-orange-200',
      story: 'Meet Firey the Fire Truck! He helps keep everyone safe from fires.'
    },
    {
      id: 'flood',
      title: '🌊 Water Safety',
      description: 'What to do when there\'s too much water!',
      mascot: '🚤',
      color: 'bg-gradient-to-br from-blue-200 to-cyan-200',
      story: 'Splashy the Boat wants to teach you about flood safety!'
    },
    {
      id: 'cyclone',
      title: '🌪️ Wind Safety',
      description: 'Stay safe when the wind is very strong!',
      mascot: '🏠',
      color: 'bg-gradient-to-br from-purple-200 to-pink-200',
      story: 'Windy the House shows you how to be safe in storms!'
    },
    {
      id: 'earthquake',
      title: '🏚️ Ground Shaking',
      description: 'What to do when the ground shakes!',
      mascot: '🦺',
      color: 'bg-gradient-to-br from-yellow-200 to-amber-200',
      story: 'Shaky the Safety Hero teaches earthquake safety!'
    }
  ];

  const handleDisasterClick = (disaster: any) => {
    setSelectedDisaster(disaster.id);
    setCurrentSection('learning');
    // Add points and badge
    setPoints(prev => prev + 10);
    if (!badges.includes(disaster.id)) {
      setBadges(prev => [...prev, disaster.id]);
    }
  };

  const renderHome = () => (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 p-6">
      {/* Header with mascot */}
      <div className="text-center mb-8">
        <div className="inline-block bg-white rounded-full p-4 shadow-lg mb-4 animate-bounce">
          <span className="text-6xl">🦸‍♀️</span>
        </div>
        <h1 className="text-4xl font-bold text-purple-800 mb-2">
          Hi Super Kid! I'm Safety Sally! 👋
        </h1>
        <p className="text-xl text-purple-600 font-semibold">
          Let's learn how to stay safe together!
        </p>
      </div>

      {/* Points and Badges */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex justify-center gap-4 mb-6">
          <Card className="bg-yellow-200 border-yellow-400 border-2">
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <p className="font-bold text-yellow-800">{points} Points!</p>
            </CardContent>
          </Card>
          <Card className="bg-pink-200 border-pink-400 border-2">
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 text-pink-600 mx-auto mb-2" />
              <p className="font-bold text-pink-800">{badges.length} Badges!</p>
            </CardContent>
          </Card>
        </div>

        {/* Disaster Learning Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {disasters.map((disaster) => (
            <Card 
              key={disaster.id}
              className={`${disaster.color} border-4 border-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden`}
              onClick={() => handleDisasterClick(disaster)}
            >
              <CardHeader className="text-center">
                <div className="text-8xl mb-4 animate-pulse">
                  {disaster.mascot}
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  {disaster.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-lg text-gray-700 mb-4 font-semibold">
                  {disaster.description}
                </p>
                <p className="text-md text-gray-600 mb-4 italic">
                  {disaster.story}
                </p>
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-gradient-to-r from-green-400 to-blue-400 text-white font-bold text-lg py-3 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105"
                    size="lg"
                    onClick={() => handleDisasterClick(disaster)}
                  >
                    Let's Learn! 🌟
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold text-lg py-2 px-4 rounded-full border-0"
                    onClick={() => {
                      setSelectedDisaster(disaster.id);
                      setCurrentSection('drill');
                    }}
                  >
                    Practice Drill! 🎯
                  </Button>
                </div>
                {badges.includes(disaster.id) && (
                  <Badge className="mt-2 bg-gold text-yellow-800 font-bold">
                    ⭐ Completed!
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Fun Facts Section */}
      <div className="max-w-4xl mx-auto">
        <Card className="bg-gradient-to-r from-green-200 to-blue-200 border-4 border-white shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800">
              🎓 Fun Safety Facts!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/60 p-4 rounded-xl">
                <div className="text-4xl mb-2">🔢</div>
                <p className="font-bold text-gray-800">Call 100 for police help!</p>
              </div>
              <div className="bg-white/60 p-4 rounded-xl">
                <div className="text-4xl mb-2">🚨</div>
                <p className="font-bold text-gray-800">Stay calm and follow adults!</p>
              </div>
              <div className="bg-white/60 p-4 rounded-xl">
                <div className="text-4xl mb-2">👨‍👩‍👧‍👦</div>
                <p className="font-bold text-gray-800">Always stay with family!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* More Features for Kids */}
      <div className="max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-200 to-blue-200 border-4 border-white shadow-xl">
          <CardContent className="p-4 text-center">
            <div className="text-4xl mb-2">📍</div>
            <Button 
              onClick={() => setCurrentSection('routes')}
              className="bg-green-500 text-white font-bold"
            >
              Safety Map! 🗺️
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-200 to-orange-200 border-4 border-white shadow-xl">
          <CardContent className="p-4 text-center">
            <div className="text-4xl mb-2">🏆</div>
            <Button 
              onClick={() => setCurrentSection('achievements')}
              className="bg-yellow-500 text-white font-bold"
            >
              My Badges! ⭐
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-200 to-pink-200 border-4 border-white shadow-xl">
          <CardContent className="p-4 text-center">
            <div className="text-4xl mb-2">🤖</div>
            <Button 
              onClick={() => setCurrentSection('alerts')}
              className="bg-purple-500 text-white font-bold"
            >
              Safety News! 📰
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="text-center mt-8">
        <Button 
          onClick={onBack}
          className="bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold text-lg py-3 px-8 rounded-full shadow-lg"
        >
          🏠 Back to Age Selection
        </Button>
      </div>
    </div>
  );

  const renderLearning = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-green-800 mb-4">
            🎉 Great Job Learning! 
          </h2>
          <p className="text-xl text-green-600">You earned 10 points!</p>
        </div>
        
        <Card className="bg-white shadow-xl border-4 border-green-300">
          <CardContent className="p-8 text-center">
            <div className="text-8xl mb-6">🏆</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              You're a Safety Star!
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Keep learning to become a Super Safety Hero!
            </p>
            <Button 
              onClick={() => setCurrentSection('home')}
              className="bg-gradient-to-r from-blue-400 to-purple-400 text-white font-bold text-lg py-3 px-8 rounded-full shadow-lg"
            >
              Continue Learning! ⭐
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Render different sections based on currentSection
  if (currentSection === 'home') return renderHome();
  if (currentSection === 'learning') return renderLearning();
  if (currentSection === 'drill' && selectedDisaster) {
    return (
      <DrillSimulation 
        disasterType={selectedDisaster}
        onBack={() => setCurrentSection('home')}
        onComplete={() => {
          setPoints(prev => prev + 50);
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
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Button 
              onClick={() => setCurrentSection('home')}
              className="mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold"
            >
              🏠 Back Home
            </Button>
            <h1 className="text-4xl font-bold text-purple-800 mb-4">
              🗺️ Safety Routes for Super Kids! 
            </h1>
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
      <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Button 
              onClick={() => setCurrentSection('home')}
              className="mb-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold"
            >
              🏠 Back Home
            </Button>
            <h1 className="text-4xl font-bold text-purple-800 mb-4">
              🚨 Safety News for Super Kids! 📰
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