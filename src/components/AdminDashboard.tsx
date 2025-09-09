import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Users, TrendingUp, Shield, AlertTriangle, Award, BarChart3 } from "lucide-react";

interface AdminDashboardProps {
  onBack: () => void;
}

const schoolStats = [
  { label: "Total Students", value: "1,247", change: "+3.2%", trend: "up" },
  { label: "Active Participants", value: "1,098", change: "+8.1%", trend: "up" },
  { label: "Avg. Preparedness", value: "84%", change: "+2.5%", trend: "up" },
  { label: "Drills Completed", value: "2,341", change: "+15.2%", trend: "up" },
];

const classRankings = [
  { class: "Grade 12A", students: 28, participation: 96, avgScore: 92, status: "excellent" },
  { class: "Grade 11B", students: 32, participation: 94, avgScore: 89, status: "excellent" },
  { class: "Grade 10C", students: 29, participation: 87, avgScore: 85, status: "good" },
  { class: "Grade 9A", students: 31, participation: 82, avgScore: 78, status: "good" },
  { class: "Grade 8B", students: 25, participation: 76, avgScore: 71, status: "needs-attention" },
];

const recentAlerts = [
  { type: "warning", message: "Fire drill scheduled for tomorrow at 2 PM", time: "1 hour ago" },
  { type: "info", message: "New earthquake safety module added to curriculum", time: "3 hours ago" },
  { type: "success", message: "Grade 12A completed advanced emergency response training", time: "5 hours ago" },
  { type: "alert", message: "Low participation in Grade 8B - intervention recommended", time: "1 day ago" },
];

export const AdminDashboard = ({ onBack }: AdminDashboardProps) => {
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
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">School-wide disaster preparedness analytics</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="border-success text-success">
              <Shield className="h-3 w-3 mr-1" />
              Safety Level: High
            </Badge>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {schoolStats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${
                  index === 0 ? 'bg-primary/10' :
                  index === 1 ? 'bg-success/10' :
                  index === 2 ? 'bg-warning/10' :
                  'bg-emergency/10'
                }`}>
                  {index === 0 && <Users className="h-5 w-5 text-primary" />}
                  {index === 1 && <TrendingUp className="h-5 w-5 text-success" />}
                  {index === 2 && <Shield className="h-5 w-5 text-warning" />}
                  {index === 3 && <Award className="h-5 w-5 text-emergency" />}
                </div>
                <Badge variant="secondary" className={`${
                  stat.trend === 'up' ? 'text-success' : 'text-emergency'
                }`}>
                  {stat.change}
                </Badge>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Class Rankings */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Class Performance Rankings
              </h2>
              <div className="space-y-4">
                {classRankings.map((classData, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
                          index === 0 ? 'bg-badge-gold text-white' :
                          index === 1 ? 'bg-badge-silver text-white' :
                          index === 2 ? 'bg-badge-bronze text-white' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-semibold">{classData.class}</div>
                          <div className="text-sm text-muted-foreground">{classData.students} students</div>
                        </div>
                      </div>
                      <Badge variant={
                        classData.status === 'excellent' ? 'default' :
                        classData.status === 'good' ? 'secondary' :
                        'destructive'
                      }>
                        {classData.status === 'excellent' ? 'Excellent' :
                         classData.status === 'good' ? 'Good' :
                         'Needs Attention'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-muted-foreground">Participation</span>
                          <span className="text-sm font-medium">{classData.participation}%</span>
                        </div>
                        <Progress value={classData.participation} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-muted-foreground">Avg Score</span>
                          <span className="text-sm font-medium">{classData.avgScore}%</span>
                        </div>
                        <Progress value={classData.avgScore} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* School Safety Index */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                School Safety Index
              </h2>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-success mb-2">87.5</div>
                <div className="text-lg text-muted-foreground">Out of 100</div>
                <Badge variant="outline" className="border-success text-success mt-2">
                  +5.2 points from last month
                </Badge>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Emergency Preparedness</span>
                    <span className="text-sm text-success font-semibold">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Student Participation</span>
                    <span className="text-sm text-primary font-semibold">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Knowledge Retention</span>
                    <span className="text-sm text-warning font-semibold">82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Alerts & Actions */}
          <div className="space-y-6">
            {/* Recent Alerts */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-warning" />
                Recent Alerts
              </h2>
              <div className="space-y-3">
                {recentAlerts.map((alert, index) => (
                  <div key={index} className="p-3 rounded-lg border-l-4 bg-muted/30 border-l-primary">
                    <div className="flex items-start justify-between mb-1">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.type === 'warning' ? 'bg-warning' :
                        alert.type === 'info' ? 'bg-primary' :
                        alert.type === 'success' ? 'bg-success' :
                        'bg-emergency'
                      }`}></div>
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                    <p className="text-sm">{alert.message}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="h-4 w-4 mr-2 text-warning" />
                  Schedule Emergency Drill
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2 text-primary" />
                  Send Parent Notification
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award className="h-4 w-4 mr-2 text-success" />
                  Generate Progress Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2 text-emergency" />
                  Update Safety Protocols
                </Button>
              </div>
            </Card>

            {/* Top Performers */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Award className="h-4 w-4 mr-2 text-warning" />
                Top Performers This Week
              </h2>
              <div className="space-y-2">
                {[
                  { name: "Sarah Martinez", class: "Grade 12A", score: 98 },
                  { name: "Michael Chen", class: "Grade 11B", score: 96 },
                  { name: "Emma Johnson", class: "Grade 10C", score: 94 },
                  { name: "David Wilson", class: "Grade 12A", score: 93 },
                ].map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-muted/30">
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${
                        index === 0 ? 'bg-badge-gold text-white' :
                        index === 1 ? 'bg-badge-silver text-white' :
                        index === 2 ? 'bg-badge-bronze text-white' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{student.name}</div>
                        <div className="text-xs text-muted-foreground">{student.class}</div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-primary">
                      {student.score}%
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};