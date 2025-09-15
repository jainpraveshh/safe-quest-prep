import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Brain, Trophy, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface PostDrillQuizProps {
  disasterType: string;
  onComplete: (score: number) => void;
  onSkip: () => void;
}

const quizQuestions: { [key: string]: Question[] } = {
  earthquake: [
    {
      id: 1,
      question: "What is the FIRST action in the 'Drop, Cover, Hold' protocol?",
      options: ["Cover your head", "Drop to hands and knees", "Run outside", "Hide under a doorway"],
      correctAnswer: 1,
      explanation: "The first step is to immediately drop to your hands and knees to prevent being knocked over."
    },
    {
      id: 2,
      question: "Where should you take cover during an earthquake?",
      options: ["Doorway", "Under a strong table or desk", "Near windows", "Outside immediately"],
      correctAnswer: 1,
      explanation: "Take cover under a strong desk or table to protect yourself from falling debris."
    },
    {
      id: 3,
      question: "After the shaking stops, what should you do?",
      options: ["Stay where you are", "Use elevators to evacuate", "Check for hazards before moving", "Run outside immediately"],
      correctAnswer: 2,
      explanation: "Check for hazards like broken glass or structural damage before moving to safety."
    }
  ],
  fire: [
    {
      id: 1,
      question: "What does 'GET LOW AND GO' mean in fire safety?",
      options: ["Crawl on floor to avoid smoke", "Get under furniture", "Move slowly", "Stay in place"],
      correctAnswer: 0,
      explanation: "Crawl on the floor where the air is cleaner, as smoke and heat rise upward."
    },
    {
      id: 2,
      question: "Before opening a door during a fire, you should:",
      options: ["Open it quickly", "Check if it's hot with the back of your hand", "Break it down", "Wait for help"],
      correctAnswer: 1,
      explanation: "Feel the door with the back of your hand. If it's hot, there may be fire on the other side."
    },
    {
      id: 3,
      question: "If your clothes catch fire, what should you do?",
      options: ["Run to get help", "Stop, Drop, and Roll", "Use water immediately", "Take them off quickly"],
      correctAnswer: 1,
      explanation: "Stop, drop to the ground, and roll to smother the flames. Don't run as it feeds the fire."
    }
  ],
  flood: [
    {
      id: 1,
      question: "How much water can knock you down while walking?",
      options: ["1 foot", "6 inches", "2 feet", "3 inches"],
      correctAnswer: 1,
      explanation: "Just 6 inches of moving water can knock you down. Never try to walk through flood water."
    },
    {
      id: 2,
      question: "If trapped in a building during a flood, where should you go?",
      options: ["Basement", "Ground floor", "Highest floor available", "Outside"],
      correctAnswer: 2,
      explanation: "Go to the highest floor to stay above rising water levels."
    },
    {
      id: 3,
      question: "What should you do if you see a flooded road?",
      options: ["Drive through slowly", "Turn around and find another route", "Test the depth first", "Follow other cars"],
      correctAnswer: 1,
      explanation: "Turn around, don't drown! Just 2 feet of water can carry away a vehicle."
    }
  ]
};

export const PostDrillQuiz: React.FC<PostDrillQuizProps> = ({ disasterType, onComplete, onSkip }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const questions = quizQuestions[disasterType.toLowerCase()] || quizQuestions.earthquake;

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);

    toast({
      title: "Quiz Complete!",
      description: `You scored ${finalScore}% - ${finalScore >= 80 ? 'Excellent!' : finalScore >= 60 ? 'Good job!' : 'Keep learning!'}`,
      variant: finalScore >= 60 ? "default" : "destructive"
    });
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { text: 'Excellent!', variant: 'default' as const };
    if (score >= 60) return { text: 'Good!', variant: 'secondary' as const };
    return { text: 'Keep Learning!', variant: 'destructive' as const };
  };

  if (showResults) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Trophy className="w-8 h-8 text-warning" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-6xl font-bold ${getScoreColor(score)} mb-2`}>
              {score}%
            </div>
            <Badge variant={getScoreBadge(score).variant} className="text-lg px-4 py-1">
              {getScoreBadge(score).text}
            </Badge>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review Your Answers:</h3>
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="p-4 border rounded-lg">
                  <div className="flex items-start gap-3 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-destructive mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{question.question}</p>
                      <p className={`text-sm mt-1 ${isCorrect ? 'text-success' : 'text-destructive'}`}>
                        Your answer: {question.options[userAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-success mt-1">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded-md mt-2">
                    <p className="text-sm text-muted-foreground">
                      💡 {question.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={resetQuiz}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button onClick={() => onComplete(score)}>
              Continue to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            Post-Drill Knowledge Check
          </CardTitle>
          <Badge variant="outline">
            {currentQuestion + 1} of {questions.length}
          </Badge>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{currentQ.question}</h3>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left border rounded-lg transition-all hover:border-primary ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-primary bg-primary/5'
                    : 'border-border'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground'
                  }`} />
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={onSkip}>
            Skip Quiz
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};