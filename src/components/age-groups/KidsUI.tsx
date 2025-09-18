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
import { DisasterContentCard } from '@/components/DisasterContentCard';
import { AnimatedVideoCard } from '@/components/AnimatedVideoCard';
import { disasterData } from '@/data/disasterContent';

interface KidsUIProps {
  onBack: () => void;
}

export const KidsUI = ({ onBack }: KidsUIProps) => {
  const [currentSection, setCurrentSection] = useState('home');
  const [badges, setBadges] = useState<string[]>([]);
  const [points, setPoints] = useState(0);
  const [selectedDisaster, setSelectedDisaster] = useState<string | null>(null);

  const handleDisasterDrill = (disasterId: string) => {
    setSelectedDisaster(disasterId);
    setCurrentSection('drill');
    // Add points and badge
    setPoints(prev => prev + 10);
    if (!badges.includes(disasterId)) {
      setBadges(prev => [...prev, disasterId]);
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

        {/* Animated Videos Section for Kids */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-purple-200 to-pink-200 border-4 border-white shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-800">
                🎬 Safety Videos with Sally!
              </CardTitle>
              <p className="text-lg text-gray-700 font-medium">
                Watch fun animations to learn safety steps!
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatedVideoCard
                  title="🚒 Fire Safety Fun"
                  description="Learn how to stay safe during fires with Firefighter Fox!"
                  videoSrc="/videos/fire-safety-kids.mp4"
                  thumbnail="/images/fire-safety-thumb.jpg"
                />
                <AnimatedVideoCard
                  title="🌊 Flood Safety Adventure"
                  description="Discover flood safety with Captain Boat Bear!"
                  videoSrc="/videos/flood-safety-kids.mp4"
                  thumbnail="/images/flood-safety-thumb.jpg"
                />
                <AnimatedVideoCard
                  title="🏠 Earthquake Hero"
                  description="Practice Drop, Cover, Hold with Earthquake Elephant!"
                  videoSrc="/videos/earthquake-safety-kids.mp4"
                  thumbnail="/images/earthquake-safety-thumb.jpg"
                />
                <AnimatedVideoCard
                  title="🌪️ Cyclone Champion"
                  description="Learn cyclone safety with Whirlwind Whale!"
                  videoSrc="/videos/cyclone-safety-kids.mp4"
                  thumbnail="/images/cyclone-safety-thumb.jpg"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Disaster Learning Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {disasterData.map((disaster) => (
            <DisasterContentCard
              key={disaster.id}
              disaster={disaster}
              ageGroup="primary"
              onStartDrill={handleDisasterDrill}
              isCompleted={badges.includes(disaster.id)}
            />
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