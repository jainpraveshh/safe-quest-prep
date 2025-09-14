import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, Pause, RotateCcw, CheckCircle, AlertTriangle, Volume2, VolumeX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DrillSimulationProps {
  disasterType: string;
  onBack: () => void;
  onComplete: () => void;
}

const drillSteps = {
  earthquake: [
    {
      id: 1,
      title: "Drop",
      description: "Immediately drop to your hands and knees",
      animation: "animate-fade-in",
      duration: 3000,
      safety: "This protects you from being knocked over",
      icon: "⬇️"
    },
    {
      id: 2,
      title: "Cover",
      description: "Take cover under a strong desk or table",
      animation: "animate-scale-in",
      duration: 4000,
      safety: "Protects your head and torso from falling debris",
      icon: "🏠"
    },
    {
      id: 3,
      title: "Hold On",
      description: "Hold on to your shelter and protect your head",
      animation: "animate-slide-in-right",
      duration: 3000,
      safety: "Stay protected until shaking stops completely",
      icon: "🤝"
    },
    {
      id: 4,
      title: "Evacuate",
      description: "Exit building carefully using stairs, not elevators",
      animation: "animate-fade-in",
      duration: 4000,
      safety: "Check for hazards and proceed to assembly point",
      icon: "🚶"
    }
  ],
  fire: [
    {
      id: 1,
      title: "Alert",
      description: "Sound the fire alarm and alert others",
      animation: "animate-fade-in",
      duration: 2000,
      safety: "Early warning saves lives",
      icon: "🔔"
    },
    {
      id: 2,
      title: "Stay Low",
      description: "Crawl under smoke to breathe cleaner air",
      animation: "animate-scale-in",
      duration: 3000,
      safety: "Heat and toxic gases rise, clean air is near floor",
      icon: "⬇️"
    },
    {
      id: 3,
      title: "Check Doors",
      description: "Feel doors before opening - if hot, find another route",
      animation: "animate-slide-in-right",
      duration: 3000,
      safety: "Hot doors indicate fire on other side",
      icon: "🚪"
    },
    {
      id: 4,
      title: "Exit Safely",
      description: "Use nearest exit, close doors behind you",
      animation: "animate-fade-in",
      duration: 3000,
      safety: "Closing doors slows fire spread",
      icon: "🏃"
    }
  ]
};

export const DrillSimulation = ({ disasterType, onBack, onComplete }: DrillSimulationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [sirenEnabled, setSirenEnabled] = useState(true);
  const { toast } = useToast();
  
  // Audio refs for siren sounds
  const sirenAudioRef = useRef<HTMLAudioElement | null>(null);
  const completionAudioRef = useRef<HTMLAudioElement | null>(null);

  const steps = drillSteps[disasterType as keyof typeof drillSteps] || drillSteps.earthquake;

  // Initialize audio elements
  useEffect(() => {
    // Create siren sound using Web Audio API (continuous emergency warble)
    const createSirenSound = () => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      let carrier: OscillatorNode | null = null;
      let gainNode: GainNode | null = null;
      let lfo: OscillatorNode | null = null;
      let isOn = false;

      const startSiren = async () => {
        if (isOn) return;
        isOn = true;
        await (audioContext as any).resume?.();
        carrier = audioContext.createOscillator();
        gainNode = audioContext.createGain();
        lfo = audioContext.createOscillator();
        const lfoGain = audioContext.createGain();

        // Base 800Hz, LFO 2Hz modulating +/-300Hz
        carrier.frequency.value = 800;
        gainNode.gain.value = 0.18;
        lfo.frequency.value = 2;
        lfoGain.gain.value = 300;

        lfo.connect(lfoGain);
        lfoGain.connect(carrier.frequency);
        carrier.connect(gainNode);
        gainNode.connect(audioContext.destination);

        carrier.start();
        lfo.start();
      };

      const stopSiren = () => {
        if (!isOn) return;
        isOn = false;
        try { carrier?.stop(); lfo?.stop(); } catch {}
        carrier?.disconnect();
        lfo?.disconnect();
        gainNode?.disconnect();
        carrier = null;
        lfo = null;
        gainNode = null;
      };

      return { startSiren, stopSiren };
    };

    try {
      const siren = createSirenSound();
      sirenAudioRef.current = siren as any;
    } catch (error) {
      console.log('Audio context not supported');
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentStep < steps.length) {
      // Start siren whenever drill is playing
      if (sirenEnabled && sirenAudioRef.current) {
        try {
          (sirenAudioRef.current as any).startSiren();
        } catch (error) {
          console.log('Could not play siren sound');
        }
      }
      
      const step = steps[currentStep];
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + (100 / (step.duration / 100));
          if (newProgress >= 100) {
            setIsPlaying(false);
            if (currentStep < steps.length - 1) {
              setTimeout(() => {
                setCurrentStep(currentStep + 1);
                setProgress(0);
              }, 500);
            } else {
              // Stop siren when drill completes
              if (sirenEnabled && sirenAudioRef.current) {
                try {
                  (sirenAudioRef.current as any).stopSiren();
                } catch (error) {
                  console.log('Could not stop siren sound');
                }
              }
              setIsCompleted(true);
              toast({
                title: "Drill Complete!",
                description: "You've successfully completed the evacuation drill.",
              });
            }
          }
          return Math.min(newProgress, 100);
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentStep, steps, toast, sirenEnabled, progress]);

  const handlePlay = () => {
    if (sirenEnabled && sirenAudioRef.current) {
      try { (sirenAudioRef.current as any).startSiren(); } catch {}
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (sirenAudioRef.current) {
      try { (sirenAudioRef.current as any).stopSiren(); } catch {}
    }
  };

  const handleReset = () => {
    // Stop siren when resetting
    if (sirenEnabled && sirenAudioRef.current) {
      try {
        (sirenAudioRef.current as any).stopSiren();
      } catch (error) {
        console.log('Could not stop siren sound');
      }
    }
    setCurrentStep(0);
    setProgress(0);
    setIsPlaying(false);
    setIsCompleted(false);
  };

  const toggleSiren = () => {
    setSirenEnabled(!sirenEnabled);
    if (!sirenEnabled && sirenAudioRef.current && isPlaying) {
      // Start siren if enabling during active drill
      try {
        (sirenAudioRef.current as any).startSiren();
      } catch (error) {
        console.log('Could not start siren sound');
      }
    } else if (sirenEnabled && sirenAudioRef.current) {
      // Stop siren if disabling
      try {
        (sirenAudioRef.current as any).stopSiren();
      } catch (error) {
        console.log('Could not stop siren sound');
      }
    }
  };

  const handleComplete = () => {
    onComplete();
    toast({
      title: "Achievement Unlocked!",
      description: "Drill Master - Complete your first evacuation drill",
    });
  };

  const currentStepData = steps[currentStep];

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
            <h1 className="text-3xl font-bold capitalize">{disasterType} Drill Simulation</h1>
            <p className="text-muted-foreground">Learn proper evacuation procedures step by step</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Progress Overview */}
          <Card className="p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Drill Progress</h2>
              <Badge variant="outline">
                Step {currentStep + 1} of {steps.length}
              </Badge>
            </div>
            <Progress value={(currentStep / steps.length) * 100 + (progress / steps.length)} className="mb-2" />
            <div className="text-sm text-muted-foreground">
              {isCompleted ? "Drill completed successfully!" : `Currently: ${currentStepData?.title}`}
            </div>
          </Card>

          {/* Simulation Area */}
          <Card className="overflow-hidden">
            {/* Step Visualization */}
            <div className="relative h-80 bg-gradient-to-br from-secondary/20 to-primary/10 flex items-center justify-center">
              {!isCompleted ? (
                <div className={`text-center ${currentStepData?.animation}`}>
                  <div className="text-8xl mb-4">{currentStepData?.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{currentStepData?.title}</h3>
                  <p className="text-lg text-muted-foreground max-w-md">
                    {currentStepData?.description}
                  </p>
                </div>
              ) : (
                <div className="text-center animate-scale-in">
                  <CheckCircle className="h-20 w-20 text-success mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Drill Complete!</h3>
                  <p className="text-lg text-muted-foreground">
                    You've mastered the {disasterType} evacuation procedure
                  </p>
                </div>
              )}
            </div>

            {/* Step Details */}
            <div className="p-6">
              {!isCompleted ? (
                <>
                  {/* Current Step Progress */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Current Step</h4>
                      <span className="text-sm text-muted-foreground">
                        {Math.round(progress)}% complete
                      </span>
                    </div>
                    <Progress value={progress} className="mb-3" />
                    <div className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-sm">Safety Tip</p>
                        <p className="text-sm text-muted-foreground">{currentStepData?.safety}</p>
                      </div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleSiren}
                      className={`${isPlaying && sirenEnabled ? 'animate-siren-flash' : ''}`}
                    >
                      {sirenEnabled ? (
                        <Volume2 className="h-4 w-4 mr-2" />
                      ) : (
                        <VolumeX className="h-4 w-4 mr-2" />
                      )}
                      Siren {sirenEnabled ? 'On' : 'Off'}
                    </Button>
                    
                    {!isPlaying ? (
                      <Button 
                        onClick={handlePlay} 
                        size="lg"
                        className={`${currentStep === 0 && progress === 0 ? 'bg-emergency hover:bg-emergency/90 animate-emergency-pulse' : ''}`}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {currentStep === 0 && progress === 0 ? 'Start Drill' : 'Continue'}
                      </Button>
                    ) : (
                      <Button variant="secondary" onClick={handlePause} size="lg" className="animate-drill-active">
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <Card className="p-4">
                      <div className="text-2xl font-bold text-success">+250</div>
                      <div className="text-sm text-muted-foreground">Points Earned</div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-2xl font-bold text-primary">🏆</div>
                      <div className="text-sm text-muted-foreground">Badge Unlocked</div>
                    </Card>
                  </div>
                  <Button onClick={handleComplete} size="lg">
                    Continue to Dashboard
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* All Steps Overview */}
          <Card className="mt-6 p-6">
            <h3 className="text-lg font-semibold mb-4">Drill Steps Overview</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                    index <= currentStep ? 'bg-primary/5 border-primary/20' : 'bg-muted/30'
                  }`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    index < currentStep 
                      ? 'bg-success text-success-foreground' 
                      : index === currentStep 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {index < currentStep ? '✓' : index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};