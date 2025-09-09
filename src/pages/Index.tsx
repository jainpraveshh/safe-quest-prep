import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { DisasterSelection } from "@/components/DisasterSelection";
import { QuizComponent } from "@/components/QuizComponent";
import { StudentDashboard } from "@/components/StudentDashboard";
import { AdminDashboard } from "@/components/AdminDashboard";
import { EmergencyTools } from "@/components/EmergencyTools";
import { DrillSimulation } from "@/components/DrillSimulation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, AlertTriangle, BarChart3 } from "lucide-react";

type Screen = 'welcome' | 'disaster-selection' | 'quiz' | 'student-dashboard' | 'admin-dashboard' | 'emergency-tools' | 'drill-simulation';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [selectedDisaster, setSelectedDisaster] = useState<string>('');

  const navigateToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleDisasterSelect = (disasterType: string) => {
    if (disasterType.includes('-drill')) {
      setSelectedDisaster(disasterType.replace('-drill', ''));
      setCurrentScreen('drill-simulation');
    } else {
      setSelectedDisaster(disasterType);
      setCurrentScreen('quiz');
    }
  };

  const handleQuizComplete = () => {
    setCurrentScreen('drill-simulation');
  };

  const handleDrillComplete = () => {
    setCurrentScreen('student-dashboard');
  };

  // Navigation Bar (shown on all screens except welcome)
  const NavigationBar = () => (
    <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
      {currentScreen !== 'welcome' && (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateToScreen('student-dashboard')}
            className={currentScreen === 'student-dashboard' ? 'bg-primary text-primary-foreground' : ''}
          >
            <Users className="h-4 w-4 mr-1" />
            Student
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateToScreen('admin-dashboard')}
            className={currentScreen === 'admin-dashboard' ? 'bg-primary text-primary-foreground' : ''}
          >
            <BarChart3 className="h-4 w-4 mr-1" />
            Admin
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateToScreen('emergency-tools')}
            className={`${currentScreen === 'emergency-tools' ? 'bg-emergency text-emergency-foreground' : 'border-emergency text-emergency hover:bg-emergency/10'}`}
          >
            <AlertTriangle className="h-4 w-4 mr-1" />
            Emergency
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateToScreen('welcome')}
            className="text-muted-foreground hover:text-foreground"
          >
            <Shield className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );

  return (
    <>
      <NavigationBar />
      
      {currentScreen === 'welcome' && (
        <WelcomeScreen onGetStarted={() => navigateToScreen('disaster-selection')} />
      )}
      
      {currentScreen === 'disaster-selection' && (
        <DisasterSelection 
          onBack={() => navigateToScreen('welcome')}
          onSelectDisaster={handleDisasterSelect}
        />
      )}
      
      {currentScreen === 'quiz' && (
        <QuizComponent 
          disasterType={selectedDisaster}
          onBack={() => navigateToScreen('disaster-selection')}
          onComplete={handleQuizComplete}
        />
      )}
      
      {currentScreen === 'student-dashboard' && (
        <StudentDashboard onBack={() => navigateToScreen('disaster-selection')} />
      )}
      
      {currentScreen === 'admin-dashboard' && (
        <AdminDashboard onBack={() => navigateToScreen('disaster-selection')} />
      )}
      
      {currentScreen === 'emergency-tools' && (
        <EmergencyTools onBack={() => navigateToScreen('disaster-selection')} />
      )}
      
      {currentScreen === 'drill-simulation' && (
        <DrillSimulation 
          disasterType={selectedDisaster}
          onBack={() => navigateToScreen('quiz')}
          onComplete={handleDrillComplete}
        />
      )}
    </>
  );
};

export default Index;
