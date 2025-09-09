import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import earthquakeIcon from "@/assets/earthquake-icon.jpg";
import fireIcon from "@/assets/fire-icon.jpg";
import floodIcon from "@/assets/flood-icon.jpg";
import cycloneIcon from "@/assets/cyclone-icon.jpg";

interface DisasterSelectionProps {
  onBack: () => void;
  onSelectDisaster: (type: string) => void;
}

const disasters = [
  {
    type: "earthquake",
    title: "Earthquake",
    subtitle: "Ground Shaking & Building Safety",
    description: "Learn how to drop, cover, and hold on during seismic events",
    difficulty: "Beginner",
    duration: "15 min",
    icon: earthquakeIcon,
    bgClass: "bg-earthquake",
    completionRate: "87%"
  },
  {
    type: "fire",
    title: "Fire Emergency",
    subtitle: "Evacuation & Fire Safety",
    description: "Master fire escape routes and prevention techniques",
    difficulty: "Intermediate",
    duration: "20 min",
    icon: fireIcon,
    bgClass: "bg-fire",
    completionRate: "72%"
  },
  {
    type: "flood",
    title: "Flood Response",
    subtitle: "Water Safety & Evacuation",
    description: "Navigate flood zones and understand water safety protocols",
    difficulty: "Intermediate",
    duration: "18 min",
    icon: floodIcon,
    bgClass: "bg-flood",
    completionRate: "65%"
  },
  {
    type: "cyclone",
    title: "Cyclone/Hurricane",
    subtitle: "Wind Safety & Shelter",
    description: "Prepare for high winds and storm surge scenarios",
    difficulty: "Advanced",
    duration: "25 min",
    icon: cycloneIcon,
    bgClass: "bg-cyclone",
    completionRate: "58%"
  }
];

export const DisasterSelection = ({ onBack, onSelectDisaster }: DisasterSelectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Choose Your Disaster Scenario</h1>
            <p className="text-muted-foreground">Select a disaster type to start your training</p>
          </div>
        </div>

        {/* Disaster Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {disasters.map((disaster) => (
            <Card 
              key={disaster.type}
              className="overflow-hidden hover:shadow-card transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
              onClick={() => onSelectDisaster(disaster.type)}
            >
              {/* Card Header with Icon */}
              <div className={`h-32 ${disaster.bgClass} relative flex items-center justify-center`}>
                <img 
                  src={disaster.icon} 
                  alt={disaster.title}
                  className="w-16 h-16 object-contain"
                />
                <Badge 
                  variant="secondary" 
                  className="absolute top-4 right-4 bg-white/90 text-foreground"
                >
                  {disaster.difficulty}
                </Badge>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{disaster.title}</h3>
                    <p className="text-sm text-muted-foreground font-medium">{disaster.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-success font-semibold">{disaster.completionRate}</div>
                    <div className="text-xs text-muted-foreground">completed</div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{disaster.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {disaster.duration}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDisaster(disaster.type);
                    }}
                  >
                    Start Training
                  </Button>
                  
                  <Button 
                    variant="default" 
                    size="sm"
                    className="ml-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      // This would start drill simulation directly
                      onSelectDisaster(disaster.type + '-drill');
                    }}
                  >
                    Start Drill
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Progress Summary */}
        <Card className="mt-8 p-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-4 text-center">Your Progress</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">Scenarios Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">1,240</div>
              <div className="text-sm text-muted-foreground">Points Earned</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning">12</div>
              <div className="text-sm text-muted-foreground">Badges Unlocked</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emergency">7th</div>
              <div className="text-sm text-muted-foreground">School Ranking</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};