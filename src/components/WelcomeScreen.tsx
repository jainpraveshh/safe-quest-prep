import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Users, Award, AlertTriangle } from "lucide-react";
import heroImage from "@/assets/hero-students.jpg";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
              SafeLearn
            </h1>
          </div>
          <p className="text-xl md:text-2xl font-semibold text-foreground/80 mb-2">
            Learn. Prepare. Stay Safe.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master disaster preparedness through interactive simulations, engaging quizzes, 
            and gamified learning designed specifically for students.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-8 rounded-3xl overflow-hidden shadow-card max-w-4xl mx-auto">
          <img 
            src={heroImage} 
            alt="Students learning disaster preparedness" 
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
          <Card className="p-6 text-center hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <AlertTriangle className="h-10 w-10 text-warning mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Virtual Drills</h3>
            <p className="text-muted-foreground">Practice emergency scenarios through interactive simulations</p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <Users className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Learn Together</h3>
            <p className="text-muted-foreground">Compete with classmates and track school-wide progress</p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-card transition-all duration-300 hover:-translate-y-1">
            <Award className="h-10 w-10 text-success mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Earn Rewards</h3>
            <p className="text-muted-foreground">Unlock badges and climb leaderboards as you master safety skills</p>
          </Card>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-primary to-success hover:from-primary/90 hover:to-success/90 text-white font-semibold px-12 py-6 text-xl rounded-full shadow-card hover:shadow-success transition-all duration-300 hover:scale-105"
          >
            Start Learning Now
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Join thousands of students building life-saving skills
          </p>
        </div>
      </div>
    </div>
  );
};