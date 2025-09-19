import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, Users, TrendingUp, Shield, AlertTriangle, 
  Award, BarChart3, Bell, Download, CheckCircle, Info
} from "lucide-react";

// --- ENHANCED: Data and helper components for the new theme ---
interface AdminDashboardProps {
  onBack: () => void;
}

const schoolStats = [
  { label: "Total Students", value: "1,247", change: "+3.2%", trend: "up", icon: Users, color: "text-blue-400", gradient: "from-blue-500/10 to-slate-900" },
  { label: "Active Participants", value: "1,098", change: "+8.1%", trend: "up", icon: TrendingUp, color: "text-green-400", gradient: "from-green-500/10 to-slate-900" },
  { label: "Avg. Preparedness", value: "84%", change: "+2.5%", trend: "up", icon: Shield, color: "text-purple-400", gradient: "from-purple-500/10 to-slate-900" },
  { label: "Drills Completed", value: "2,341", change: "+15.2%", trend: "up", icon: Award, color: "text-amber-400", gradient: "from-amber-500/10 to-slate-900" },
];

const classRankings = [
  { class: "Grade 12A", participation: 96, avgScore: 92, status: "excellent" },
  { class: "Grade 11B", participation: 94, avgScore: 89, status: "excellent" },
  { class: "Grade 10C", participation: 87, avgScore: 85, status: "good" },
  { class: "Grade 9A", participation: 82, avgScore: 78, status: "good" },
  { class: "Grade 8B", participation: 76, avgScore: 71, status: "needs-attention" },
];

const recentAlerts = [
  { type: "warning", message: "Fire drill scheduled for tomorrow at 2 PM", time: "1 hour ago", icon: AlertTriangle },
  { type: "info", message: "New earthquake safety module added", time: "3 hours ago", icon: Info },
  { type: "success", message: "Grade 12A completed advanced training", time: "5 hours ago", icon: CheckCircle },
];

// Reusable component for metric cards
const MetricCard = ({ stat }: { stat: typeof schoolStats[0] }) => (
    <Card className={`p-6 bg-slate-800/50 border-slate-700 bg-gradient-to-br ${stat.gradient} overflow-hidden`}>
        <div className="flex items-start justify-between">
            <div className={`p-3 rounded-full bg-slate-900/50 border border-slate-700`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <Badge className={`bg-green-500/10 text-green-400 border-none`}>{stat.change}</Badge>
        </div>
        <div className="mt-4">
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-slate-400">{stat.label}</div>
        </div>
    </Card>
);

export const AdminDashboard = ({ onBack }: AdminDashboardProps) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <div className="container mx-auto px-4 py-8">
        {/* ENHANCED Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button variant="ghost" onClick={onBack} className="mr-4 text-slate-300 hover:bg-slate-700 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Main
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Admin Mission Control</h1>
              <p className="text-slate-400">School-wide preparedness analytics</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="border-green-500/50 bg-green-500/10 text-green-400 h-10 text-sm">
              <Shield className="h-4 w-4 mr-2" />
              Safety Level: High
            </Badge>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* ENHANCED Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {schoolStats.map((stat) => (
            <MetricCard key={stat.label} stat={stat} />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ENHANCED Left Column - Class Rankings */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-xl font-semibold text-white flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-indigo-400" />
                  Class Performance Rankings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-3">
                  {classRankings.map((classData, index) => (
                    <div key={index} className="p-4 rounded-lg bg-slate-800 border border-slate-700 transition-colors hover:bg-slate-700/50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 text-white ${
                            index === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500' :
                            index === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400' :
                            index === 2 ? 'bg-gradient-to-br from-orange-400 to-yellow-600' :
                            'bg-slate-700 text-slate-300'
                          }`}>
                            {index + 1}
                          </div>
                          <div className="font-semibold text-white">{classData.class}</div>
                        </div>
                        <Badge className={`${
                            classData.status === 'excellent' ? 'bg-green-500/10 text-green-400' :
                            classData.status === 'good' ? 'bg-blue-500/10 text-blue-400' :
                            'bg-red-500/10 text-red-400'
                        } border-none`}>
                          {classData.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="flex justify-between items-center mb-1 text-slate-400">
                            <span>Participation</span>
                            <span className="font-medium text-slate-200">{classData.participation}%</span>
                          </div>
                          <Progress value={classData.participation} className="h-2 [&>*]:bg-gradient-to-r [&>*]:from-blue-500 [&>*]:to-cyan-400" />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1 text-slate-400">
                            <span>Avg Score</span>
                            <span className="font-medium text-slate-200">{classData.avgScore}%</span>
                          </div>
                          <Progress value={classData.avgScore} className="h-2 [&>*]:bg-gradient-to-r [&>*]:from-purple-500 [&>*]:to-pink-500" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ENHANCED Right Column - Alerts & Actions */}
          <div className="space-y-6">
            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg font-semibold text-white flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-amber-400" />
                  System Alerts & Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-3">
                  {recentAlerts.map((alert, index) => (
                    <div key={index} className={`p-3 rounded-lg border-l-4 bg-slate-800 flex items-start space-x-3 ${
                        alert.type === 'warning' ? 'border-amber-400' :
                        alert.type === 'info' ? 'border-blue-400' :
                        'border-green-400'
                    }`}>
                      <alert.icon className={`h-5 w-5 mt-0.5 shrink-0 ${
                        alert.type === 'warning' ? 'text-amber-400' :
                        alert.type === 'info' ? 'text-blue-400' :
                        'text-green-400'
                      }`} />
                      <div>
                        <p className="text-sm text-slate-200">{alert.message}</p>
                        <span className="text-xs text-slate-500">{alert.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="p-6 bg-slate-800/50 border-slate-700">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg font-semibold text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-3">
                <Button variant="outline" className="w-full justify-start bg-slate-800 border-slate-700 hover:bg-slate-700 hover:text-white">
                  <AlertTriangle className="h-4 w-4 mr-3 text-amber-400" />
                  Schedule Emergency Drill
                </Button>
                <Button variant="outline" className="w-full justify-start bg-slate-800 border-slate-700 hover:bg-slate-700 hover:text-white">
                  <Users className="h-4 w-4 mr-3 text-blue-400" />
                  Send Parent Notification
                </Button>
                <Button variant="outline" className="w-full justify-start bg-slate-800 border-slate-700 hover:bg-slate-700 hover:text-white">
                  <Shield className="h-4 w-4 mr-3 text-green-400" />
                  Update Safety Protocols
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};