import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, XCircle, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuizComponentProps {
  disasterType: string;
  onBack: () => void;
  onComplete: () => void;
}

const earthquakeQuiz = [
  {
    question: "What is the correct response when you feel an earthquake while indoors?",
    options: [
      "Run outside immediately",
      "Drop, Cover, and Hold On",
      "Stand in a doorway",
      "Hide under a window"
    ],
    correct: 1,
    explanation: "Drop to your hands and knees, take cover under a sturdy desk or table, and hold on to your shelter."
  },
  {
    question: "Which location is safest during an earthquake?",
    options: [
      "Near large windows",
      "Under a heavy bookshelf",
      "Under a sturdy desk",
      "In an elevator"
    ],
    correct: 2,
    explanation: "A sturdy desk or table provides protection from falling objects, which are the main cause of earthquake injuries."
  },
  {
    question: "How long should you stay in position during the shaking?",
    options: [
      "5 seconds",
      "Until the shaking stops completely",
      "30 seconds maximum",
      "1 minute"
    ],
    correct: 1,
    explanation: "Stay in your protective position until the shaking stops completely, then evacuate if necessary."
  },
  {
    question: "What should be in your earthquake emergency kit?",
    options: [
      "Food and water for 1 day",
      "Food and water for 3 days",
      "Food and water for 1 week",
      "Only a flashlight"
    ],
    correct: 1,
    explanation: "Emergency kits should contain at least 3 days worth of food and water for each person."
  }
];

export const QuizComponent = ({ disasterType, onBack, onComplete }: QuizComponentProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>(new Array(earthquakeQuiz.length).fill(false));
  const { toast } = useToast();

  const quiz = earthquakeQuiz; // In real app, would be dynamic based on disasterType
  const progress = ((currentQuestion + 1) / quiz.length) * 100;

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered[currentQuestion]) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const newAnswered = [...answered];
    newAnswered[currentQuestion] = true;
    setAnswered(newAnswered);

    if (answerIndex === quiz[currentQuestion].correct) {
      setScore(score + 25); // 25 points per correct answer
      toast({
        title: "Correct! +25 points",
        description: "Great job! You're building important safety knowledge.",
        variant: "default"
      });
    } else {
      toast({
        title: "Not quite right",
        description: "Review the explanation and try to remember for next time!",
        variant: "destructive"
      });
    }
  };

  const handleNext = () => {
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz completed
      const finalScore = score + (selectedAnswer === quiz[currentQuestion].correct ? 25 : 0);
      toast({
        title: `Quiz Complete! Final Score: ${finalScore}/100`,
        description: finalScore >= 75 ? "Excellent work! Badge earned!" : "Good effort! Try again to improve your score.",
      });
      setTimeout(onComplete, 2000);
    }
  };

  const currentQ = quiz[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correct;
  const isLastQuestion = currentQuestion === quiz.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold capitalize">{disasterType} Safety Quiz</h1>
              <p className="text-muted-foreground">Question {currentQuestion + 1} of {quiz.length}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-lg font-bold text-primary">{score} pts</div>
            <div className="text-sm text-muted-foreground">Current Score</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2 text-center">{Math.round(progress)}% Complete</p>
        </div>

        {/* Question Card */}
        <Card className="p-8 mb-6 shadow-card">
          <div className="mb-6">
            <Badge variant="outline" className="mb-4">
              Question {currentQuestion + 1}
            </Badge>
            <h2 className="text-xl font-semibold leading-relaxed">
              {currentQ.question}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full p-4 h-auto text-left justify-start transition-all duration-200 ${
                  selectedAnswer === index
                    ? isCorrect 
                      ? "border-success bg-success/10 text-success hover:bg-success/20" 
                      : "border-emergency bg-emergency/10 text-emergency hover:bg-emergency/20"
                    : answered[currentQuestion] && index === currentQ.correct
                      ? "border-success bg-success/10 text-success"
                      : "hover:bg-muted/50"
                } ${answered[currentQuestion] ? "pointer-events-none" : ""}`}
                onClick={() => handleAnswerSelect(index)}
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold mr-4">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {showResult && (
                    <div className="ml-2">
                      {selectedAnswer === index && isCorrect && <CheckCircle className="h-5 w-5 text-success" />}
                      {selectedAnswer === index && !isCorrect && <XCircle className="h-5 w-5 text-emergency" />}
                      {index === currentQ.correct && selectedAnswer !== index && <CheckCircle className="h-5 w-5 text-success" />}
                    </div>
                  )}
                </div>
              </Button>
            ))}
          </div>

          {/* Explanation */}
          {showResult && (
            <div className={`p-4 rounded-lg mb-4 ${isCorrect ? 'bg-success/10 border border-success/20' : 'bg-warning/10 border border-warning/20'}`}>
              <div className="flex items-start">
                {isCorrect ? (
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 mr-3 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-warning mt-0.5 mr-3 flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium mb-1">
                    {isCorrect ? "Correct!" : "Incorrect"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currentQ.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Next Button */}
          {showResult && (
            <div className="text-center">
              <Button 
                onClick={handleNext}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                {isLastQuestion ? (
                  <>
                    <Award className="h-4 w-4 mr-2" />
                    Complete Quiz
                  </>
                ) : (
                  "Next Question"
                )}
              </Button>
            </div>
          )}
        </Card>

        {/* Quiz Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="text-lg font-bold text-success">{answered.filter(Boolean).length}</div>
            <div className="text-sm text-muted-foreground">Answered</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-lg font-bold text-primary">{Math.round((score / (25 * Math.max(1, answered.filter(Boolean).length))) * 100)}%</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-lg font-bold text-warning">{quiz.length - answered.filter(Boolean).length}</div>
            <div className="text-sm text-muted-foreground">Remaining</div>
          </Card>
        </div>
      </div>
    </div>
  );
};