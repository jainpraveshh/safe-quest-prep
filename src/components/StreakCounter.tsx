import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Flame, Calendar, Target, Trophy, Zap } from "lucide-react";

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  streakGoal: number;
  lastActivity: string;
}

const streakMilestones = [
  { days: 3, title: "Getting Started", icon: "🌱", reward: "50 points" },
  { days: 7, title: "One Week Strong", icon: "💪", reward: "150 points" },
  { days: 14, title: "Two Week Warrior", icon: "⚔️", reward: "300 points" },
  { days: 30, title: "Monthly Master", icon: "👑", reward: "750 points + Badge" },
  { days: 60, title: "Consistency Champion", icon: "🏆", reward: "1500 points + Special Badge" },
  { days: 100, title: "Century Achiever", icon: "🌟", reward: "3000 points + Exclusive Title" }
];

export const StreakCounter = ({ 
  currentStreak = 5, 
  longestStreak = 12, 
  streakGoal = 30,
  lastActivity = "2 hours ago"
}: StreakCounterProps) => {
  const streakPercentage = (currentStreak / streakGoal) * 100;
  const nextMilestone = streakMilestones.find(m => m.days > currentStreak);
  const lastMilestone = [...streakMilestones].reverse().find(m => m.days <= currentStreak);

  const daysUntilNextMilestone = nextMilestone ? nextMilestone.days - currentStreak : 0;

  return (
    <div className="space-y-6">
      {/* Main Streak Display */}
      <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-warning/5 border-primary/20">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <Flame className="h-12 w-12 text-warning animate-pulse" />
            <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {currentStreak}
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-1">Current Streak</h2>
        <p className="text-3xl font-bold text-primary mb-2">{currentStreak} Days</p>
        <p className="text-sm text-muted-foreground">Last activity: {lastActivity}</p>

        {/* Streak Progress to Goal */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress to {streakGoal}-day goal</span>
            <span>{currentStreak}/{streakGoal}</span>
          </div>
          <Progress value={streakPercentage} className="h-3" />
          <p className="text-xs text-muted-foreground mt-1">
            {streakGoal - currentStreak} days remaining
          </p>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center">
          <Trophy className="h-6 w-6 text-warning mx-auto mb-2" />
          <div className="text-xl font-bold">{longestStreak}</div>
          <div className="text-sm text-muted-foreground">Longest Streak</div>
        </Card>
        
        <Card className="p-4 text-center">
          <Target className="h-6 w-6 text-primary mx-auto mb-2" />
          <div className="text-xl font-bold">{Math.round(streakPercentage)}%</div>
          <div className="text-sm text-muted-foreground">Goal Progress</div>
        </Card>
      </div>

      {/* Next Milestone */}
      {nextMilestone && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Next Milestone</h3>
            <Badge variant="outline">
              {daysUntilNextMilestone} days to go
            </Badge>
          </div>
          
          <div className="flex items-center space-x-3 mb-3">
            <div className="text-2xl">{nextMilestone.icon}</div>
            <div>
              <h4 className="font-medium">{nextMilestone.title}</h4>
              <p className="text-sm text-muted-foreground">{nextMilestone.days} day streak</p>
            </div>
          </div>

          <div className="bg-primary/5 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Reward: {nextMilestone.reward}</span>
            </div>
          </div>

          <Progress 
            value={(currentStreak / nextMilestone.days) * 100} 
            className="mt-3 h-2"
          />
        </Card>
      )}

      {/* Last Achievement */}
      {lastMilestone && (
        <Card className="p-4 bg-success/5 border-success/20">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-success">Recent Achievement</h3>
            <Badge className="bg-success text-success-foreground">
              Unlocked
            </Badge>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{lastMilestone.icon}</div>
            <div>
              <h4 className="font-medium">{lastMilestone.title}</h4>
              <p className="text-sm text-muted-foreground">
                Achieved at {lastMilestone.days} days • {lastMilestone.reward}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* All Milestones */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Streak Milestones</h3>
        <div className="space-y-3">
          {streakMilestones.map((milestone) => {
            const isAchieved = currentStreak >= milestone.days;
            const isCurrent = nextMilestone?.days === milestone.days;
            
            return (
              <div 
                key={milestone.days}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                  isAchieved 
                    ? 'bg-success/10 border border-success/20' 
                    : isCurrent 
                    ? 'bg-primary/10 border border-primary/20' 
                    : 'bg-muted/30'
                }`}
              >
                <div className={`text-xl ${!isAchieved && !isCurrent ? 'opacity-40' : ''}`}>
                  {milestone.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className={`font-medium ${!isAchieved && !isCurrent ? 'opacity-60' : ''}`}>
                      {milestone.title}
                    </h4>
                    {isAchieved && (
                      <Badge variant="default" className="bg-success text-success-foreground">
                        ✓
                      </Badge>
                    )}
                    {isCurrent && (
                      <Badge variant="outline" className="border-primary text-primary">
                        Next
                      </Badge>
                    )}
                  </div>
                  <p className={`text-sm ${!isAchieved && !isCurrent ? 'opacity-60' : 'text-muted-foreground'}`}>
                    {milestone.days} days • {milestone.reward}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Motivational Section */}
      <Card className="p-4 bg-gradient-to-r from-primary/10 to-warning/10 border-primary/20">
        <div className="text-center">
          <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
          <h3 className="font-semibold mb-2">Keep It Going!</h3>
          <p className="text-sm text-muted-foreground mb-3">
            You're doing great! Complete today's activity to maintain your streak.
          </p>
          <Button size="sm" className="w-full">
            Continue Learning Today
          </Button>
        </div>
      </Card>
    </div>
  );
};