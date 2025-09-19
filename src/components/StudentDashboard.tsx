import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, Trophy, Target, Flame, Zap, Shield, Star, 
  CheckCircle, ShieldCheck, Gamepad2, Award, Users, TrendingUp
} from "lucide-react";
import { AchievementSystem } from "@/components/AchievementSystem";
import { StreakCounter } from "@/components/StreakCounter";

// --- ENHANCEMENT: Data moved outside for clarity ---
interface StudentDashboardProps {
  onBack: () => void;
}

const badges = [
  { name: "Earthquake Expert", icon: "🏠", color: "text-amber-400", glow: "shadow-amber-500/50", earned: true },
  { name: "Fire Safety Pro", icon: "🔥", color: "text-red-400", glow: "shadow-red-500/50", earned: true },
  { name: "First Responder", icon: "🚑", color: "text-blue-400", glow: "shadow-blue-500/50", earned: true },
  { name: "Safety Leader", icon: "⭐", color: "text-yellow-300", glow: "shadow-yellow-300/50", earned: false },
  { name: "Flood Navigator", icon: "🌊", color: "text-cyan-400", glow: "shadow-cyan-400/50", earned: false },
  { name: "Storm Survivor", icon: "🌪️", color: "text-slate-400", glow: "shadow-slate-400/50", earned: false },
];

const recentActivities = [
  { activity: "Completed Earthquake Quiz", points: "+100", time: "2 hours ago", type: "quiz", icon: CheckCircle },
  { activity: "Finished Fire Drill Simulation", points: "+150", time: "1 day ago", type: "drill", icon: Gamepad2 },
  { activity: "Earned First Responder Badge", points: "+200", time: "2 days ago", type: "badge", icon: Award },
  { activity: "Joined Emergency Response Team", points: "+50", time: "3 days ago", type: "team", icon: Users },
];

const leaderboardData = [
    { name: "Aarav Sharma", points: 1890, rank: 1, streak: 15, badges: 12 },
    { name: "Priya Patel", points: 1654, rank: 2, streak: 8, badges: 10 },
    { name: "Rohan Singh", points: 1523, rank: 3, streak: 12, badges: 9 },
    { name: "You", points: 1240, rank: 7, streak: 5, badges: 8, current: true },
    { name: "Dev Gupta", points: 1156, rank: 8, streak: 2, badges: 5 },
    { name: "Ananya Das", points: 1089, rank: 9, streak: 4, badges: 6 },
];

// --- ENHANCEMENT: Reusable component for stat blocks ---
const StatBlock = ({ value, label, icon: Icon }: { value: string, label: string, icon: React.ElementType }) => (
    <div className="bg-slate-700/50 p-4 rounded-lg text-center flex-grow">
        <Icon className="h-6 w-6 text-indigo-400 mx-auto mb-2" />
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-sm text-slate-400">{label}</div>
    </div>
);


export const StudentDashboard = ({ onBack }: StudentDashboardProps) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <div className="container mx-auto px-4 py-8">
        {/* ENHANCED Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-4 text-slate-300 hover:bg-slate-700 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Student Dashboard</h1>
              <p className="text-slate-400">Welcome back, future safety champion!</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              1,240
            </div>
            <div className="text-sm text-slate-400">Total Points</div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          {/* ENHANCED Tabs List */}
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-slate-800 border border-slate-700 p-1 h-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="streak">Streak</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* ENHANCED Overall Progress as Level Up */}
                <Card className="p-6 bg-slate-800/50 border-slate-700">
                  <h2 className="text-xl font-semibold mb-1 text-white flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-indigo-400" />
                    Level 5: Safety Sentinel
                  </h2>
                  <p className="text-sm text-slate-400 mb-4">Keep learning to reach the next level!</p>
                  <Progress value={87} className="h-4 [&>*]:bg-gradient-to-r [&>*]:from-indigo-500 [&>*]:to-purple-500" />
                  <div className="flex justify-between items-center mt-2 text-sm text-slate-300">
                    <span>Progress to Level 6</span>
                    <span>87%</span>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 mt-6">
                    <StatBlock value="4" label="Scenarios Done" icon={ShieldCheck} />
                    <StatBlock value="12" label="Drills Practiced" icon={Gamepad2} />
                    <StatBlock value="8" label="Badges Earned" icon={Award} />
                    <StatBlock value="7th" label="Class Rank" icon={Trophy} />
                  </div>
                </Card>

                {/* ENHANCED Recent Activity */}
                <Card className="p-6 bg-slate-800/50 border-slate-700">
                  <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-indigo-400" />
                    Recent Activity
                  </h2>
                  <div className="space-y-3">
                    {recentActivities.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700/50 transition-colors">
                        <div className="flex items-center">
                          <item.icon className={`h-5 w-5 mr-3 ${
                            item.type === 'quiz' ? 'text-blue-400' :
                            item.type === 'drill' ? 'text-green-400' :
                            item.type === 'badge' ? 'text-yellow-400' : 'text-purple-400'
                          }`} />
                          <div>
                            <div className="font-medium text-slate-200">{item.activity}</div>
                            <div className="text-sm text-slate-400">{item.time}</div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-none font-semibold">
                          {item.points}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                {/* ENHANCED Badges Collection */}
                <Card className="p-6 bg-slate-800/50 border-slate-700">
                  <h2 className="text-xl font-semibold mb-4 text-white flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
                    Badge Showcase
                  </h2>
                  <div className="grid grid-cols-3 gap-3">
                    {badges.map((badge, index) => (
                      <div key={index} className={`p-3 rounded-lg border text-center transition-all duration-300 ${
                        badge.earned 
                          ? `bg-slate-800 border-slate-600 hover:border-yellow-400/50 transform hover:-translate-y-1 shadow-lg ${badge.glow}` 
                          : 'bg-slate-800 border-slate-700 opacity-50 filter grayscale'
                      }`}>
                        <div className={`text-3xl mb-1 transition-transform ${badge.earned ? 'group-hover:scale-110' : ''}`}>{badge.icon}</div>
                        <div className={`text-xs font-medium ${badge.earned ? badge.color : 'text-slate-500'}`}>
                          {badge.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Quick Actions */}
                <Card className="p-6 bg-slate-800/50 border-slate-700">
                  <h2 className="text-lg font-semibold mb-4 text-white">Quick Actions</h2>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-slate-800 border-slate-700 hover:bg-slate-700 hover:text-white">
                      <Flame className="h-4 w-4 mr-2 text-red-400" />
                      Continue Fire Training
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-slate-800 border-slate-700 hover:bg-slate-700 hover:text-white" onClick={() => document.querySelector<HTMLButtonElement>('[role="tab"][value="achievements"]')?.click()}>
                      <Star className="h-4 w-4 mr-2 text-yellow-400" />
                      View All Achievements
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress">
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
                <Shield className="h-5 w-5 mr-2 text-indigo-400" />
                Disaster Type Mastery
              </h2>
              <div className="space-y-4">
                  {[
                      {name: "Earthquake", progress: 100, icon: '🏠', status: "Complete", color: "from-green-500 to-emerald-500"},
                      {name: "Fire Emergency", progress: 75, icon: '🔥', status: "In Progress", color: "from-amber-500 to-orange-500"},
                      {name: "Flood Response", progress: 0, icon: '🌊', status: "Not Started", color: "from-blue-500 to-cyan-500"},
                      {name: "Cyclone", progress: 0, icon: '🌪️', status: "Not Started", color: "from-slate-500 to-slate-400"},
                  ].map(item => (
                      <div key={item.name} className="p-4 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-between">
                          <div className="flex items-center">
                              <div className={`w-12 h-12 text-2xl rounded-lg bg-slate-700 mr-4 flex items-center justify-center`}>{item.icon}</div>
                              <div>
                                  <div className="font-medium text-white">{item.name}</div>
                                  <div className="text-sm text-slate-400">{item.status}</div>
                              </div>
                          </div>
                          <div className="text-right w-32">
                              <Progress value={item.progress} className={`h-2 mb-1 [&>*]:bg-gradient-to-r ${item.color}`} />
                              <div className="text-sm text-slate-300 font-medium">{item.progress}%</div>
                          </div>
                      </div>
                  ))}
              </div>
            </Card>
          </TabsContent>

          {/* Achievements & Streak Tabs remain connected to their components */}
          <TabsContent value="achievements"><AchievementSystem /></TabsContent>
          <TabsContent value="streak"><StreakCounter currentStreak={5} longestStreak={12} streakGoal={30} lastActivity="2 hours ago" /></TabsContent>
          
          {/* ENHANCED Leaderboard Tab */}
          <TabsContent value="leaderboard">
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-white">
                <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
                Class Leaderboard
              </h2>
              <div className="space-y-2">
                {leaderboardData.map((student) => (
                  <div key={student.rank} className={`flex items-center justify-between p-3 rounded-lg transition-all ${student.current ? 'bg-indigo-600/20 border-2 border-indigo-500 scale-105' : 'bg-slate-800 border border-slate-700'}`}>
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 text-white ${
                        student.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-500' :
                        student.rank === 2 ? 'bg-gradient-to-br from-slate-300 to-slate-400' :
                        student.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-yellow-600' :
                        'bg-slate-700 text-slate-300'
                      }`}>
                        {student.rank}
                      </div>
                      <div>
                        <span className={`font-medium ${student.current ? 'text-indigo-300' : 'text-white'}`}>{student.name}</span>
                        <div className="flex items-center space-x-3 text-xs text-slate-400">
                          <span>🔥 {student.streak}d streak</span>
                          <span>🏆 {student.badges} badges</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-white">{student.points} pts</div>
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