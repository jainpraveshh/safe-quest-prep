import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, Zap, Award, Calendar, Users, Shield, Star } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'participation' | 'streak' | 'leadership';
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const achievements: Achievement[] = [
  {
    id: 'first-drill',
    title: 'First Steps',
    description: 'Complete your first drill simulation',
    icon: '🏃',
    category: 'learning',
    progress: 1,
    maxProgress: 1,
    unlocked: true,
    points: 100,
    rarity: 'common'
  },
  {
    id: 'drill-master',
    title: 'Drill Master',
    description: 'Complete 10 drill simulations',
    icon: '🏆',
    category: 'learning',
    progress: 6,
    maxProgress: 10,
    unlocked: false,
    points: 500,
    rarity: 'rare'
  },
  {
    id: 'quiz-champion',
    title: 'Quiz Champion',
    description: 'Score 100% on 5 different quizzes',
    icon: '🧠',
    category: 'learning',
    progress: 3,
    maxProgress: 5,
    unlocked: false,
    points: 300,
    rarity: 'rare'
  },
  {
    id: 'fire-expert',
    title: 'Fire Safety Expert',
    description: 'Master all fire emergency scenarios',
    icon: '🔥',
    category: 'learning',
    progress: 2,
    maxProgress: 4,
    unlocked: false,
    points: 400,
    rarity: 'epic'
  },
  {
    id: 'streak-starter',
    title: 'Getting Started',
    description: 'Maintain a 7-day learning streak',
    icon: '⚡',
    category: 'streak',
    progress: 5,
    maxProgress: 7,
    unlocked: false,
    points: 200,
    rarity: 'common'
  },
  {
    id: 'streak-warrior',
    title: 'Consistency King',
    description: 'Maintain a 30-day learning streak',
    icon: '🔥',
    category: 'streak',
    progress: 12,
    maxProgress: 30,
    unlocked: false,
    points: 1000,
    rarity: 'epic'
  },
  {
    id: 'team-player',
    title: 'Team Player',
    description: 'Help 10 classmates with emergency prep',
    icon: '🤝',
    category: 'leadership',
    progress: 3,
    maxProgress: 10,
    unlocked: false,
    points: 600,
    rarity: 'rare'
  },
  {
    id: 'safety-legend',
    title: 'Safety Legend',
    description: 'Complete all disaster scenarios with perfect scores',
    icon: '🛡️',
    category: 'learning',
    progress: 1,
    maxProgress: 4,
    unlocked: false,
    points: 2000,
    rarity: 'legendary'
  }
];

const getCategoryIcon = (category: Achievement['category']) => {
  switch (category) {
    case 'learning': return <Target className="h-4 w-4" />;
    case 'participation': return <Users className="h-4 w-4" />;
    case 'streak': return <Zap className="h-4 w-4" />;
    case 'leadership': return <Shield className="h-4 w-4" />;
    default: return <Award className="h-4 w-4" />;
  }
};

const getRarityColor = (rarity: Achievement['rarity']) => {
  switch (rarity) {
    case 'common': return 'text-muted-foreground border-muted';
    case 'rare': return 'text-primary border-primary';
    case 'epic': return 'text-purple-500 border-purple-500';
    case 'legendary': return 'text-warning border-warning';
    default: return 'text-muted-foreground border-muted';
  }
};

interface AchievementSystemProps {
  onClose?: () => void;
}

export const AchievementSystem = ({ onClose }: AchievementSystemProps) => {
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const inProgressAchievements = achievements.filter(a => !a.unlocked && a.progress > 0);
  const lockedAchievements = achievements.filter(a => !a.unlocked && a.progress === 0);

  const totalPoints = unlockedAchievements.reduce((sum, a) => sum + a.points, 0);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <Trophy className="h-8 w-8 text-warning mx-auto mb-2" />
          <div className="text-2xl font-bold">{unlockedAchievements.length}</div>
          <div className="text-sm text-muted-foreground">Unlocked</div>
        </Card>
        <Card className="p-4 text-center">
          <Star className="h-8 w-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold">{totalPoints}</div>
          <div className="text-sm text-muted-foreground">Total Points</div>
        </Card>
        <Card className="p-4 text-center">
          <Calendar className="h-8 w-8 text-success mx-auto mb-2" />
          <div className="text-2xl font-bold">5</div>
          <div className="text-sm text-muted-foreground">Day Streak</div>
        </Card>
      </div>

      {/* Unlocked Achievements */}
      {unlockedAchievements.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-warning" />
            Unlocked Achievements
          </h3>
          <div className="grid gap-3">
            {unlockedAchievements.map((achievement) => (
              <Card key={achievement.id} className="p-4 animate-scale-in">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold">{achievement.title}</h4>
                        <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                          {achievement.rarity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        {getCategoryIcon(achievement.category)}
                        <span className="text-xs text-muted-foreground capitalize">{achievement.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-success">+{achievement.points}</div>
                    <div className="text-xs text-muted-foreground">points</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* In Progress Achievements */}
      {inProgressAchievements.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Target className="h-5 w-5 mr-2 text-primary" />
            In Progress
          </h3>
          <div className="grid gap-3">
            {inProgressAchievements.map((achievement) => (
              <Card key={achievement.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl opacity-60">{achievement.icon}</div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold">{achievement.title}</h4>
                        <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                          {achievement.rarity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        {getCategoryIcon(achievement.category)}
                        <span className="text-xs text-muted-foreground capitalize">{achievement.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-muted-foreground">+{achievement.points}</div>
                    <div className="text-xs text-muted-foreground">points</div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{achievement.progress}/{achievement.maxProgress}</span>
                  </div>
                  <Progress 
                    value={(achievement.progress / achievement.maxProgress) * 100} 
                    className="h-2"
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Locked Achievements */}
      {lockedAchievements.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <Award className="h-5 w-5 mr-2 text-muted-foreground" />
            Locked Achievements
          </h3>
          <div className="grid gap-3">
            {lockedAchievements.map((achievement) => (
              <Card key={achievement.id} className="p-4 opacity-60">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl opacity-40">{achievement.icon}</div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold">{achievement.title}</h4>
                        <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                          {achievement.rarity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        {getCategoryIcon(achievement.category)}
                        <span className="text-xs text-muted-foreground capitalize">{achievement.category}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-muted-foreground">+{achievement.points}</div>
                    <div className="text-xs text-muted-foreground">points</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};