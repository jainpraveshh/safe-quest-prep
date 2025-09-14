import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Phone, MapPin, Shield, AlertTriangle, CheckCircle, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmergencyToolsProps {
  onBack: () => void;
}

const emergencyContacts = [
  { name: "Police (India)", number: "100", type: "emergency", description: "Immediate police assistance" },
  { name: "Fire Brigade (India)", number: "101", type: "emergency", description: "Fire emergencies" },
  { name: "Ambulance (India)", number: "108", type: "medical", description: "Medical emergencies and ambulance" },
  { name: "Women Helpline", number: "1091", type: "support", description: "Women safety helpline" },
  { name: "Disaster Management", number: "1077", type: "support", description: "State emergency operations centre" },
];

export const EmergencyTools = ({ onBack }: EmergencyToolsProps) => {
  const [sosActivated, setSosActivated] = useState(false);
  const [safetyCheckSent, setSafetyCheckSent] = useState(false);
  const { toast } = useToast();

  const handleSOSActivation = () => {
    if (sosActivated) return;
    
    setSosActivated(true);
    toast({
      title: "SOS Alert Sent!",
      description: "Emergency contacts have been notified of your location and situation.",
      variant: "destructive"
    });

    // Reset after 30 seconds for demo
    setTimeout(() => {
      setSosActivated(false);
    }, 30000);
  };

  const handleSafetyCheck = () => {
    setSafetyCheckSent(true);
    toast({
      title: "Safety Status Sent",
      description: "Your family and school have been notified that you are safe.",
      variant: "default"
    });

    // Reset after 5 seconds for demo
    setTimeout(() => {
      setSafetyCheckSent(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={onBack} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Emergency Tools</h1>
            <p className="text-muted-foreground">Quick access to emergency resources and contacts</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Emergency Actions */}
          <div className="space-y-6">
            {/* SOS Emergency Button */}
            <Card className="p-6 border-emergency/20 bg-gradient-to-br from-emergency/5 to-emergency/10">
              <div className="text-center">
                <AlertTriangle className="h-12 w-12 text-emergency mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-emergency mb-2">Emergency SOS</h2>
                <p className="text-muted-foreground mb-6">
                  Press and hold for 3 seconds to send emergency alert with your location
                </p>
                
                <Button
                  onClick={handleSOSActivation}
                  disabled={sosActivated}
                  size="lg"
                  className={`w-full h-16 text-xl font-bold transition-all duration-200 ${
                    sosActivated 
                      ? "bg-emergency/20 text-emergency cursor-not-allowed" 
                      : "bg-emergency hover:bg-emergency/90 text-white shadow-emergency hover:shadow-emergency hover:scale-105"
                  }`}
                >
                  {sosActivated ? (
                    <>
                      <CheckCircle className="h-6 w-6 mr-2" />
                      SOS ACTIVATED
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-6 w-6 mr-2" />
                      EMERGENCY SOS
                    </>
                  )}
                </Button>

                {sosActivated && (
                  <div className="mt-4 p-3 bg-emergency/10 rounded-lg border border-emergency/20">
                    <p className="text-sm text-emergency font-medium">
                      🚨 Emergency services and your emergency contacts have been alerted
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Stay calm and follow emergency procedures
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Safety Check-In */}
            <Card className="p-6 border-success/20 bg-gradient-to-br from-success/5 to-success/10">
              <div className="text-center">
                <Shield className="h-10 w-10 text-success mx-auto mb-4" />
                <h2 className="text-xl font-bold text-success mb-2">I'm Safe Check-In</h2>
                <p className="text-muted-foreground mb-4">
                  Let your family and school know you're okay during an emergency
                </p>
                
                <Button
                  onClick={handleSafetyCheck}
                  disabled={safetyCheckSent}
                  variant="outline"
                  size="lg"
                  className={`w-full transition-all duration-200 ${
                    safetyCheckSent 
                      ? "border-success bg-success/10 text-success" 
                      : "border-success text-success hover:bg-success/10"
                  }`}
                >
                  {safetyCheckSent ? (
                    <>
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Safety Status Sent
                    </>
                  ) : (
                    <>
                      <Shield className="h-5 w-5 mr-2" />
                      Send "I'm Safe"
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Current Location */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                Current Location
              </h3>
              <div className="bg-muted/30 p-4 rounded-lg">
                <p className="font-medium mb-1">Lincoln High School</p>
                <p className="text-sm text-muted-foreground mb-2">Building A, Room 205</p>
                <p className="text-sm text-muted-foreground">
                  📍 123 Education Blvd, Springfield, IL 62701
                </p>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                Share Location
              </Button>
            </Card>
          </div>

          {/* Right Column - Emergency Contacts */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                Emergency Contacts
              </h2>
              <div className="space-y-3">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          contact.type === 'emergency' ? 'bg-emergency' :
                          contact.type === 'medical' ? 'bg-primary' :
                          contact.type === 'school' ? 'bg-warning' :
                          contact.type === 'admin' ? 'bg-success' :
                          'bg-muted-foreground'
                        }`}></div>
                        <span className="font-medium">{contact.name}</span>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          contact.type === 'emergency' ? 'border-emergency text-emergency' :
                          contact.type === 'medical' ? 'border-primary text-primary' :
                          contact.type === 'school' ? 'border-warning text-warning' :
                          'border-success text-success'
                        }`}
                      >
                        {contact.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{contact.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-lg font-semibold text-primary">{contact.number}</span>
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Emergency Assembly Point */}
            <Card className="p-6 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                Assembly Point
              </h3>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <p className="font-medium mb-2">Main Parking Lot - Section C</p>
                <p className="text-sm text-muted-foreground mb-4">
                  This is your designated meeting point during emergency evacuation
                </p>
                <Badge variant="outline" className="border-primary text-primary">
                  📍 200 meters from main building
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};