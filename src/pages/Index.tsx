import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AuthPage } from "@/components/auth/AuthPage";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { DisasterSelection } from "@/components/DisasterSelection";
import { QuizComponent } from "@/components/QuizComponent";
import { StudentDashboard } from "@/components/StudentDashboard";
import { AdminDashboard } from "@/components/AdminDashboard";
import { EmergencyTools } from "@/components/EmergencyTools";
import { DrillSimulation } from "@/components/DrillSimulation";
import { RegionalDisasterAwareness } from "@/components/RegionalDisasterAwareness";
import { DisasterAlertsPanel } from "@/components/DisasterAlertsPanel";
import { EvacuationRoutes } from "@/components/EvacuationRoutes";
import { Home, Users, UserCog, AlertCircle, LogOut, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { user, loading, signOut } = useAuth();
  type Screen = 'welcome' | 'disasters' | 'quiz' | 'studentDashboard' | 'adminDashboard' | 'emergencyTools' | 'drill' | 'regionalAwareness' | 'liveAlerts' | 'evacuationRoutes';
  
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedDisaster, setSelectedDisaster] = useState<string>('');

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleDisasterSelect = (disasterType: string) => {
    setSelectedDisaster(disasterType);
    // Navigate to quiz for most disasters, drill for specific ones
    if (disasterType.includes('drill')) {
      setCurrentScreen('drill');
    } else {
      setCurrentScreen('quiz');
    }
  };

  const handleAuthSuccess = () => {
    setCurrentScreen('welcome');
  };

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // Show auth page if not logged in
  if (!user) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  const NavigationBar = () => {
    if (currentScreen === 'welcome') return null;
    
    return (
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentScreen('welcome')}
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              EduShield
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentScreen('studentDashboard')}
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Dashboard
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentScreen('regionalAwareness')}
                className="flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                Regional Alerts
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentScreen('liveAlerts')}
                className="flex items-center gap-2"
              >
                🚨 Alerts
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentScreen('evacuationRoutes')}
                className="flex items-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                Routes
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentScreen('emergencyTools')}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <AlertCircle className="w-4 h-4" />
                Emergency
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>
    );
  };

  return (
    <div>
      <NavigationBar />
      
      <main className="min-h-screen">
        {currentScreen === 'welcome' && (
          <WelcomeScreen 
            onGetStarted={() => setCurrentScreen('disasters')}
          />
        )}
        
        {currentScreen === 'disasters' && (
          <DisasterSelection 
            onBack={() => setCurrentScreen('welcome')}
            onSelectDisaster={handleDisasterSelect}
          />
        )}
        
        {currentScreen === 'quiz' && (
          <QuizComponent 
            disasterType={selectedDisaster}
            onBack={() => setCurrentScreen('disasters')}
            onComplete={() => setCurrentScreen('studentDashboard')}
          />
        )}
        
        {currentScreen === 'studentDashboard' && (
          <StudentDashboard onBack={() => setCurrentScreen('welcome')} />
        )}
        
        {currentScreen === 'adminDashboard' && (
          <AdminDashboard onBack={() => setCurrentScreen('welcome')} />
        )}
        
        {currentScreen === 'regionalAwareness' && (
          <div className="pt-20 px-4">
            <div className="max-w-4xl mx-auto">
              <RegionalDisasterAwareness />
            </div>
          </div>
        )}
        
        {currentScreen === 'emergencyTools' && (
          <EmergencyTools onBack={() => setCurrentScreen('welcome')} />
        )}
        
        {currentScreen === 'drill' && (
          <DrillSimulation 
            disasterType={selectedDisaster}
            onBack={() => setCurrentScreen('disasters')}
            onComplete={() => setCurrentScreen('studentDashboard')}
          />
        )}
        
        {currentScreen === 'liveAlerts' && (
          <div className="pt-20 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentScreen('welcome')}
                  className="mb-4"
                >
                  ← Back to Home
                </Button>
                <h1 className="text-3xl font-bold mb-2">Live Disaster Alerts</h1>
                <p className="text-muted-foreground">
                  Real-time alerts from NDMA and IMD for your region
                </p>
              </div>
              <DisasterAlertsPanel />
            </div>
          </div>
        )}
        
        {currentScreen === 'evacuationRoutes' && (
          <div className="pt-20 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentScreen('welcome')}
                  className="mb-4"
                >
                  ← Back to Home
                </Button>
                <h1 className="text-3xl font-bold mb-2">Evacuation Routes & Safe Zones</h1>
                <p className="text-muted-foreground">
                  Find the nearest safe zones and evacuation routes for different disaster scenarios
                </p>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {['Flood', 'Earthquake', 'Cyclone'].map((disaster) => (
                    <Button
                      key={disaster}
                      variant={selectedDisaster === disaster ? "default" : "outline"}
                      onClick={() => setSelectedDisaster(disaster)}
                      className="h-auto py-4"
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">
                          {disaster === 'Flood' ? '🌊' : disaster === 'Earthquake' ? '🏚️' : '🌪️'}
                        </div>
                        <div>{disaster}</div>
                      </div>
                    </Button>
                  ))}
                </div>
                <EvacuationRoutes disasterType={selectedDisaster} />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;