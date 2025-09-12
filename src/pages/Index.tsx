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
import { Home, Users, UserCog, AlertCircle, LogOut, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { user, loading, signOut } = useAuth();
  type Screen = 'welcome' | 'disasters' | 'quiz' | 'studentDashboard' | 'adminDashboard' | 'emergencyTools' | 'drill' | 'regionalAwareness';
  
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
              SafeLearn
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
      </main>
    </div>
  );
};

export default Index;