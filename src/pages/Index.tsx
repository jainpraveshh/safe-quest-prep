import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAgeGroup, AgeGroup } from "@/contexts/AgeGroupContext";
import { AuthPage } from "@/components/auth/AuthPage";
import { AgeSelectionLanding } from "@/components/AgeSelectionLanding";
import { KidsUI } from "@/components/age-groups/KidsUI";
import { MiddleSchoolUI } from "@/components/age-groups/MiddleSchoolUI";
import { HighSchoolUI } from "@/components/age-groups/HighSchoolUI";
import { AdultsUI } from "@/components/age-groups/AdultsUI";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const Index = () => {
  const { user, loading } = useAuth();
  const { ageGroup, setAgeGroup } = useAgeGroup();
  const [showEmergency, setShowEmergency] = useState(false);

  const handleAgeSelect = (age: AgeGroup) => {
    setAgeGroup(age);
  };

  const handleBackToAgeSelection = () => {
    setAgeGroup(null);
  };

  const handleAuthSuccess = () => {
    // Auth success handled automatically by state
  };

  // Show loading spinner while checking auth
  if (loading) {
    return <LoadingSpinner variant="page" message="Initializing EduShield..." />;
  }

  // Show auth page if not logged in
  if (!user) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  // Show emergency mode if activated
  if (showEmergency) {
    return (
      <div className="min-h-screen bg-red-600 text-white p-6 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-8xl mb-8 animate-pulse">🚨</div>
          <h1 className="text-6xl font-bold mb-4">EMERGENCY MODE</h1>
          <p className="text-2xl mb-8">Immediate disaster response activated</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Emergency Contacts</h3>
              <div className="space-y-2 text-left">
                <p className="text-xl">🚔 Police: 100</p>
                <p className="text-xl">🚒 Fire: 101</p>
                <p className="text-xl">🚑 Ambulance: 108</p>
                <p className="text-xl">🌪️ Disaster Help: 1078</p>
              </div>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">Immediate Actions</h3>
              <div className="space-y-2 text-left">
                <p className="text-lg">1. Stay calm and assess situation</p>
                <p className="text-lg">2. Follow evacuation procedures</p>
                <p className="text-lg">3. Help others if safe to do so</p>
                <p className="text-lg">4. Call emergency services if needed</p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => setShowEmergency(false)}
            className="bg-white text-red-600 font-bold text-xl py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Exit Emergency Mode
          </button>
        </div>
      </div>
    );
  }

  // Show age selection if no age group selected
  if (!ageGroup) {
    return <AgeSelectionLanding onAgeSelect={handleAgeSelect} />;
  }

  // Render age-specific UI
  switch (ageGroup) {
    case 'primary':
      return <KidsUI onBack={handleBackToAgeSelection} />;
    case 'middle':
      return <MiddleSchoolUI onBack={handleBackToAgeSelection} />;
    case 'high':
      return <HighSchoolUI onBack={handleBackToAgeSelection} />;
    case 'adults':
      return <AdultsUI onBack={handleBackToAgeSelection} />;
    default:
      return <AgeSelectionLanding onAgeSelect={handleAgeSelect} />;
  }
};

export default Index;