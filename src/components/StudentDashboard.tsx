import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Trophy, Target, Flame, Zap, Shield, Star } from "lucide-react";
import { AchievementSystem } from "@/components/AchievementSystem";
import { StreakCounter } from "@/components/StreakCounter";

interface StudentDashboardProps {
  onBack: () => void;
}

const badges = [
  { name: "Earthquake Expert", icon: "🏠", color: "text-warning", earned: true },
  { name: "Fire Safety Pro", icon: "🔥", color: "text-emergency", earned: true },
  { name: "First Responder", icon: "🚑", color: "text-primary", earned: true },
  { name: "Safety Leader", icon: "⭐", color: "text-badge-gold", earned: false },
  { name: "Flood Navigator", icon: "🌊", color: "text-primary", earned: false },
  { name: "Storm Survivor", icon: "🌪️", color: "text-muted-foreground", earned: false },
];

const recentActivities = [
  { activity: "Completed Earthquake Quiz", points: "+100", time: "2 hours ago", type: "quiz" },
  { activity: "Finished Fire Drill Simulation", points: "+150", time: "1 day ago", type: "drill" },
  { activity: "Earned First Responder Badge", points: "+200", time: "2 days ago", type: "badge" },
  { activity: "Joined Emergency Response Team", points: "+50", time: "3 days ago", type: "team" },
];

export const StudentDashboard = ({ onBack }: StudentDashboardProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold">My Dashboard</h1>
              <p className="text-muted-foreground">Track your safety learning progress</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">1,240</div>
            <div className="text-sm text-muted-foreground">Total Points</div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="streak">Streak</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Main Stats */}
              <div className="lg:col-span-2 space-y-6">
                {/* Overall Progress */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Target className="h-5 w-5 mr-2 text-primary" />
                    Overall Preparedness Score
                  </h2>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Safety Knowledge</span>
                      <span className="text-sm text-primary font-semibold">87%</span>
                    </div>
                    <Progress value={87} className="h-3" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">4</div>
                      <div className="text-sm text-muted-foreground">Scenarios Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">12</div>
                      <div className="text-sm text-muted-foreground">Drills Practiced</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-warning">8</div>
                      <div className="text-sm text-muted-foreground">Badges Earned</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-emergency">7th</div>
                      <div className="text-sm text-muted-foreground">Class Rank</div>
                    </div>
                  </div>
                </Card>

                {/* Recent Activity */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-primary" />
                    Recent Activity
                  </h2>
                  <div className="space-y-3">
                    {recentActivities.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center">
                          <div className={`w-2 h-2 rounded-full mr-3 ${
                            item.type === 'quiz' ? 'bg-primary' :
                            item.type === 'drill' ? 'bg-success' :
                            item.type === 'badge' ? 'bg-warning' : 'bg-emergency'
                          }`}></div>
                          <div>
                            <div className="font-medium">{item.activity}</div>
                            <div className="text-sm text-muted-foreground">{item.time}</div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-success font-semibold">
                          {item.points}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right Column - Badges & Quick Actions */}
              <div className="space-y-6">
                {/* Badges Collection */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-warning" />
                    Recent Badges
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {badges.slice(0,4).map((badge, index) => (
                      <div 
                        key={index}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          badge.earned 
                            ? 'bg-gradient-to-br from-warning/10 to-success/10 border-warning/20 hover:shadow-success' 
                            : 'bg-muted/20 border-muted opacity-60'
                        }`}
                      >
                        <div className="text-2xl mb-1">{badge.icon}</div>
                        <div className={`text-xs font-medium ${badge.earned ? badge.color : 'text-muted-foreground'}`}>
                          {badge.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Quick Actions */}
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Flame className="h-4 w-4 mr-2" />
                      Continue Fire Training
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Star className="h-4 w-4 mr-2" />
                      View All Achievements
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Target className="h-4 w-4 mr-2" />
                      Practice Emergency Quiz
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress">
            <div className="space-y-6">
              {/* Disaster Type Progress */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  Disaster Type Mastery
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-earthquake mr-3 flex items-center justify-center">
                        🏠
                      </div>
                      <div>
                        <div className="font-medium">Earthquake</div>
                        <div className="text-sm text-muted-foreground">Complete</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Progress value={100} className="w-24 h-2 mb-1" />
                      <div className="text-sm text-success font-medium">100%</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-fire mr-3 flex items-center justify-center">
                        🔥
                      </div>
                      <div>
                        <div className="font-medium">Fire Emergency</div>
                        <div className="text-sm text-muted-foreground">In Progress</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Progress value={75} className="w-24 h-2 mb-1" />
                      <div className="text-sm text-primary font-medium">75%</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-flood mr-3 flex items-center justify-center">
                        🌊
                      </div>
                      <div>
                        <div className="font-medium">Flood Response</div>
                        <div className="text-sm text-muted-foreground">Not Started</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Progress value={0} className="w-24 h-2 mb-1" />
                      <div className="text-sm text-muted-foreground font-medium">0%</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-cyclone mr-3 flex items-center justify-center">
                        🌪️
                      </div>
                      <div>
                        <div className="font-medium">Cyclone/Hurricane</div>
                        <div className="text-sm text-muted-foreground">Not Started</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Progress value={0} className="w-24 h-2 mb-1" />
                      <div className="text-sm text-muted-foreground font-medium">0%</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <AchievementSystem />
          </TabsContent>

          {/* Streak Tab */}
          <TabsContent value="streak">
            <StreakCounter 
              currentStreak={5}
              longestStreak={12}
              streakGoal={30}
              lastActivity="2 hours ago"
            />
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Trophy className="h-4 w-4 mr-2 text-warning" />
                Class Leaderboard
              </h2>
              <div className="space-y-3">
                {[
                  { name: "Sarah M.", points: 1890, rank: 1, streak: 15, badges: 12 },
                  { name: "Mike K.", points: 1654, rank: 2, streak: 8, badges: 10 },
                  { name: "Emma L.", points: 1523, rank: 3, streak: 12, badges: 9 },
                  { name: "Alex R.", points: 1445, rank: 4, streak: 6, badges: 8 },
                  { name: "Jordan T.", points: 1398, rank: 5, streak: 3, badges: 7 },
                  { name: "Casey W.", points: 1267, rank: 6, streak: 9, badges: 6 },
                  { name: "You", points: 1240, rank: 7, streak: 5, badges: 8, current: true },
                  { name: "Taylor B.", points: 1156, rank: 8, streak: 2, badges: 5 },
                  { name: "Morgan L.", points: 1089, rank: 9, streak: 4, badges: 6 },
                  { name: "Riley S.", points: 1023, rank: 10, streak: 1, badges: 4 },
                ].map((student, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${student.current ? 'bg-primary/10 border border-primary/20' : 'bg-muted/20'}`}>
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
                        student.rank === 1 ? 'bg-badge-gold text-white' :
                        student.rank === 2 ? 'bg-badge-silver text-white' :
                        student.rank === 3 ? 'bg-badge-bronze text-white' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {student.rank}
                      </div>
                      <div>
                        <span className={`font-medium ${student.current ? 'text-primary' : ''}`}>{student.name}</span>
                        <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                          <span>🔥 {student.streak}d streak</span>
                          <span>🏆 {student.badges} badges</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold">{student.points} pts</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};