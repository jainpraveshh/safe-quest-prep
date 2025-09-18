import { useAgeGroup, AgeGroup } from '@/contexts/AgeGroupContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Users, Beaker, BrainCircuit } from 'lucide-react';

interface AgeSelectionLandingProps {
  onAgeSelect: (age: AgeGroup) => void;
}

export const AgeSelectionLanding = ({ onAgeSelect }: AgeSelectionLandingProps) => {
  const ageGroups = [
    {
      id: 'primary' as AgeGroup,
      title: 'Primary Kids',
      age: '6-12 years',
      description: 'Fun, colorful learning with cartoons and games!',
      icon: '🎨',
      bgColor: 'bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-50',
      buttonColor: 'bg-gradient-to-r from-yellow-400 to-pink-400 text-white font-bold text-lg',
      iconComponent: GraduationCap
    },
    {
      id: 'middle' as AgeGroup,
      title: 'Middle School',
      age: '13-15 years',
      description: 'Interactive geometry and puzzle-based learning!',
      icon: '📐',
      bgColor: 'bg-gradient-to-br from-purple-100 via-orange-50 to-cyan-50',
      buttonColor: 'bg-gradient-to-r from-purple-500 to-orange-400 text-white font-bold text-lg',
      iconComponent: Users
    },
    {
      id: 'high' as AgeGroup,
      title: 'High School',
      age: '16-18 years',
      description: 'Science-based approach with simulations and experiments!',
      icon: '🧪',
      bgColor: 'bg-gradient-to-br from-blue-100 via-teal-50 to-green-50',
      buttonColor: 'bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold text-lg',
      iconComponent: Beaker
    },
    {
      id: 'adults' as AgeGroup,
      title: 'Adults/Teachers',
      age: '18+ years',
      description: 'Professional guides, manuals, and comprehensive resources!',
      icon: '👨‍🏫',
      bgColor: 'bg-gradient-to-br from-gray-50 via-white to-blue-50',
      buttonColor: 'bg-gradient-to-r from-gray-700 to-blue-600 text-white font-bold text-lg',
      iconComponent: BrainCircuit
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent mb-4">
            🛡️ EduShield
          </h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Disaster Preparedness for Everyone
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your age group to get a personalized disaster preparedness experience
            tailored just for you!
          </p>
          
          {/* Emergency Mode Button */}
          <Button 
            className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-8 py-4 rounded-full animate-pulse shadow-lg"
            size="lg"
          >
            🚨 Emergency Mode - Click for Immediate Help!
          </Button>
        </div>

        {/* Age Group Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ageGroups.map((group) => (
            <Card 
              key={group.id}
              className={`${group.bgColor} border-2 border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden`}
              onClick={() => onAgeSelect(group.id)}
            >
              <CardContent className="p-6 text-center">
                {/* Icon */}
                <div className="text-6xl mb-4 animate-bounce">
                  {group.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {group.title}
                </h3>
                <p className="text-lg font-semibold text-gray-600 mb-3">
                  {group.age}
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {group.description}
                </p>
                
                {/* Action Button */}
                <Button 
                  className={`${group.buttonColor} w-full py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                  size="lg"
                >
                  Start Learning!
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Preview */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">
            🌟 What You'll Learn
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { icon: '🔥', name: 'Fire Safety' },
              { icon: '🌊', name: 'Flood Response' },
              { icon: '🌪️', name: 'Cyclone Prep' },
              { icon: '🏚️', name: 'Earthquake Safety' },
              { icon: '🚑', name: 'First Aid' }
            ].map((disaster, index) => (
              <div key={index} className="text-center p-4 bg-white/60 rounded-xl shadow-lg">
                <div className="text-4xl mb-2">{disaster.icon}</div>
                <p className="font-semibold text-gray-800">{disaster.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};