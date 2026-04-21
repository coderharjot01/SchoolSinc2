"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { PageHeader } from "@/components/ui/page-header";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Search,
    Download,
    Users,
    TrendingUp,
    BarChart3,
    Target,
    AlertTriangle,
    CheckCircle2,
    Star,
    Send,
    MessageSquare,
    Phone,
    Mail,
    GraduationCap,
    Award,
    Clock,
    Activity,
    Medal,
    Sparkles,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';

// Mock data with engagement score (Fix 8)
const students = [
    { id: 'ST001', name: 'Rahul Kumar', class: '10-A', rollNo: 15, attendance: 92, avgScore: 85, engagement: 88, status: 'excellent', image: 'rahul', badges: ['Class Monitor', 'Math Wizard'] },
    { id: 'ST002', name: 'Priya Singh', class: '10-A', rollNo: 18, attendance: 88, avgScore: 78, engagement: 65, status: 'good', image: 'priya', badges: [] },
    { id: 'ST003', name: 'Amit Patel', class: '10-A', rollNo: 8, attendance: 65, avgScore: 82, engagement: 35, status: 'suspicious', image: 'amit', badges: [] },
    { id: 'ST004', name: 'Neha Sharma', class: '10-A', rollNo: 22, attendance: 95, avgScore: 92, engagement: 95, status: 'excellent', image: 'neha', badges: ['Star Performer', 'Helpful'] },
    { id: 'ST005', name: 'Vikram Singh', class: '10-A', rollNo: 28, attendance: 72, avgScore: 68, engagement: 45, status: 'needs-attention', image: 'vikram', badges: [] },
    { id: 'ST006', name: 'Anjali Gupta', class: '10-A', rollNo: 5, attendance: 90, avgScore: 82, engagement: 78, status: 'good', image: 'anjali', badges: ['Most Helpful'] },
];

const performanceHistory = [
    { month: 'Aug', score: 72 },
    { month: 'Sep', score: 78 },
    { month: 'Oct', score: 75 },
    { month: 'Nov', score: 82 },
    { month: 'Dec', score: 85 },
];

const subjectScores = [
    { subject: 'Math', score: 88 },
    { subject: 'Science', score: 82 },
    { subject: 'English', score: 75 },
    { subject: 'Hindi', score: 78 },
    { subject: 'Social', score: 85 },
];

const recentActivity = [
    { type: 'assignment', title: 'Submitted Math Assignment', date: 'Dec 10', status: 'on-time' },
    { type: 'test', title: 'Unit Test - Science', date: 'Dec 08', score: '42/50' },
    { type: 'attendance', title: 'Absent from class', date: 'Dec 05', status: 'excused' },
    { type: 'achievement', title: 'Won Math Quiz', date: 'Dec 02', status: 'award' },
];

// Fix 9: Available badges for bestowal
const availableBadges = [
    { id: 'monitor', name: 'Class Monitor', icon: '🎖️', description: 'Leadership in classroom', color: 'bg-blue-500' },
    { id: 'helpful', name: 'Most Helpful', icon: '🤝', description: 'Always helps classmates', color: 'bg-emerald-500' },
    { id: 'star', name: 'Star Performer', icon: '⭐', description: 'Outstanding academic achievement', color: 'bg-amber-500' },
    { id: 'creative', name: 'Creative Mind', icon: '🎨', description: 'Innovative thinking', color: 'bg-purple-500' },
    { id: 'punctual', name: 'Mr/Ms Punctual', icon: '⏰', description: 'Always on time', color: 'bg-rose-500' },
    { id: 'sports', name: 'Sports Star', icon: '🏆', description: 'Sports excellence', color: 'bg-orange-500' },
    { id: 'team', name: 'Team Player', icon: '👥', description: 'Great collaboration', color: 'bg-cyan-500' },
    { id: 'curious', name: 'Curious Explorer', icon: '🔍', description: 'Asks great questions', color: 'bg-indigo-500' },
];

export default function FacultyStudentsPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [studentList, setStudentList] = useState(students);
    const [selectedStudent, setSelectedStudent] = useState(students[0]);
    const [searchQuery, setSearchQuery] = useState("");
    const [feedback, setFeedback] = useState("");
    const [selectedClass, setSelectedClass] = useState("10a");
    const [feedbackType, setFeedbackType] = useState("general");
    const [badgeDialogOpen, setBadgeDialogOpen] = useState(false);
    const [selectedBadge, setSelectedBadge] = useState<string | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const filteredStudents = studentList.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.rollNo.toString().includes(searchQuery)
    );

    const handleExportData = () => {
        const headers = ["ID", "Name", "Class", "Roll No", "Attendance (%)", "Avg Score (%)", "Engagement (%)", "Status"];
        const csvRows = [headers.join(",")];
        
        filteredStudents.forEach(student => {
            const row = [
                student.id,
                `"${student.name}"`,
                student.class,
                student.rollNo,
                student.attendance,
                student.avgScore,
                student.engagement,
                student.status
            ];
            csvRows.push(row.join(","));
        });
        
        const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(csvRows.join("\n"));
        const link = document.createElement("a");
        link.setAttribute("href", csvContent);
        link.setAttribute("download", `class_${selectedClass}_students.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Fix 9: Award badge handler
    const handleAwardBadge = () => {
        if (!selectedBadge) return;

        const badge = availableBadges.find(b => b.id === selectedBadge);
        if (!badge) return;

        // Update student's badges
        setStudentList(prev => prev.map(s =>
            s.id === selectedStudent.id
                ? { ...s, badges: [...s.badges, badge.name] }
                : s
        ));

        // Update selected student
        setSelectedStudent(prev => ({
            ...prev,
            badges: [...prev.badges, badge.name]
        }));

        setBadgeDialogOpen(false);
        setSelectedBadge(null);

        alert(`Badge "${badge.name}" awarded to ${selectedStudent.name}! This will appear in their Community > Achievements shelf.`);
    };

    // Fix 8: Get engagement status and color
    const getEngagementStatus = (engagement: number, avgScore: number) => {
        if (avgScore >= 80 && engagement < 50) {
            return { status: 'Suspicious', color: 'text-rose-600', bgColor: 'bg-rose-100', message: '⚠️ High grades but low engagement - may need attention' };
        }
        if (engagement >= 80) {
            return { status: 'Highly Engaged', color: 'text-emerald-600', bgColor: 'bg-emerald-100', message: '' };
        }
        if (engagement >= 50) {
            return { status: 'Moderately Engaged', color: 'text-amber-600', bgColor: 'bg-amber-100', message: '' };
        }
        return { status: 'Low Engagement', color: 'text-rose-600', bgColor: 'bg-rose-100', message: 'May be disinterested or struggling' };
    };

    if (!isMounted) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-20" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-20" />
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-20" />
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-20" />
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-20" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 bg-slate-200 dark:bg-slate-800 rounded-xl h-96" />
                    <div className="lg:col-span-2 bg-slate-200 dark:bg-slate-800 rounded-xl h-96" />
                </div>
            </div>
        );
    }

    const engagementInfo = getEngagementStatus(selectedStudent.engagement, selectedStudent.avgScore);

    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Students"
                title="Student Details"
                subtitle="View player stats and award badges"
            />

            {/* Stats Row - Updated with Engagement */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-4 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Total Students</p>
                                <p className="text-xl font-bold">{studentList.length}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-4 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                                <TrendingUp className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Avg Performance</p>
                                <p className="text-xl font-bold text-emerald-600">78%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {/* Fix 8: Engagement Stat Card */}
                <Card>
                    <CardContent className="pt-4 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
                                <Activity className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Avg Engagement</p>
                                <p className="text-xl font-bold text-purple-600">68%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-4 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center">
                                <Award className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Badges Awarded</p>
                                <p className="text-xl font-bold text-amber-600">12</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Student List */}
                <div className="lg:col-span-1">
                    <Card className="h-fit">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-semibold">Class 10-A</CardTitle>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleExportData} title="Export to Excel">
                                        <Download className="h-4 w-4 text-emerald-600" />
                                    </Button>
                                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                                        <SelectTrigger className="w-24 h-8 text-xs">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10a">10-A</SelectItem>
                                        <SelectItem value="10b">10-B</SelectItem>
                                        <SelectItem value="9a">9-A</SelectItem>
                                        <SelectItem value="9b">9-B</SelectItem>
                                    </SelectContent>
                                </Select>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                <Input
                                    placeholder="Search by name or roll no..."
                                    className="pl-9 h-9 text-sm"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2 max-h-[500px] overflow-y-auto">
                                {filteredStudents.map((student) => {
                                    const engInfo = getEngagementStatus(student.engagement, student.avgScore);
                                    return (
                                        <div
                                            key={student.id}
                                            className={`p-3 rounded-lg border cursor-pointer transition-colors ${selectedStudent.id === student.id
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'hover:bg-slate-50'
                                                }`}
                                            onClick={() => setSelectedStudent(student)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.image}`} />
                                                    <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate">{student.name}</p>
                                                    <div className="flex items-center gap-1">
                                                        <p className="text-[10px] text-muted-foreground">Roll No: {student.rollNo}</p>
                                                        {student.status === 'suspicious' && (
                                                            <AlertTriangle className="h-3 w-3 text-rose-500" />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <Badge className={`text-[10px] ${student.status === 'excellent' ? 'bg-emerald-500' :
                                                        student.status === 'good' ? 'bg-blue-500' :
                                                            student.status === 'suspicious' ? 'bg-rose-500' :
                                                                'bg-amber-500'
                                                        }`}>
                                                        {student.avgScore}%
                                                    </Badge>
                                                    <p className={`text-[9px] mt-0.5 ${engInfo.color}`}>
                                                        {student.engagement}% engaged
                                                    </p>
                                                </div>
                                            </div>
                                            {student.badges.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {student.badges.slice(0, 2).map((badge, i) => (
                                                        <Badge key={i} variant="outline" className="text-[8px] px-1 py-0 h-4">
                                                            {badge}
                                                        </Badge>
                                                    ))}
                                                    {student.badges.length > 2 && (
                                                        <Badge variant="outline" className="text-[8px] px-1 py-0 h-4">
                                                            +{student.badges.length - 2}
                                                        </Badge>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Student Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Student Profile Card */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex flex-col sm:flex-row items-start gap-6">
                                <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedStudent.image}`} />
                                    <AvatarFallback>{selectedStudent.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold">{selectedStudent.name}</h3>
                                            <p className="text-sm text-muted-foreground">
                                                Class {selectedStudent.class} | Roll No: {selectedStudent.rollNo}
                                            </p>
                                        </div>
                                        <Badge className={`${selectedStudent.status === 'excellent' ? 'bg-emerald-500' :
                                            selectedStudent.status === 'good' ? 'bg-blue-500' :
                                                selectedStudent.status === 'suspicious' ? 'bg-rose-500' :
                                                    'bg-amber-500'
                                            }`}>
                                            {selectedStudent.status === 'excellent' ? 'Excellent' :
                                                selectedStudent.status === 'good' ? 'Good' :
                                                    selectedStudent.status === 'suspicious' ? 'Suspicious' : 'Needs Attention'}
                                        </Badge>
                                    </div>

                                    {/* Fix 8: Stats including Engagement Score */}
                                    <div className="grid grid-cols-4 gap-3 mt-4">
                                        <div className="text-center p-3 rounded-lg bg-slate-50">
                                            <p className="text-2xl font-bold text-blue-600">{selectedStudent.avgScore}%</p>
                                            <p className="text-[10px] text-muted-foreground">Avg Score</p>
                                        </div>
                                        <div className="text-center p-3 rounded-lg bg-slate-50">
                                            <p className="text-2xl font-bold text-emerald-600">{selectedStudent.attendance}%</p>
                                            <p className="text-[10px] text-muted-foreground">Attendance</p>
                                        </div>
                                        {/* Fix 8: Engagement Score */}
                                        <div className={`text-center p-3 rounded-lg ${engagementInfo.bgColor}`}>
                                            <p className={`text-2xl font-bold ${engagementInfo.color}`}>{selectedStudent.engagement}%</p>
                                            <p className="text-[10px] text-muted-foreground">Engagement</p>
                                        </div>
                                        <div className="text-center p-3 rounded-lg bg-slate-50">
                                            <p className="text-2xl font-bold text-purple-600">5th</p>
                                            <p className="text-[10px] text-muted-foreground">Class Rank</p>
                                        </div>
                                    </div>

                                    {/* Fix 8: Engagement Warning */}
                                    {engagementInfo.message && (
                                        <div className="mt-3 p-3 rounded-lg bg-rose-50 border border-rose-200">
                                            <p className="text-xs text-rose-600 flex items-center gap-2">
                                                <AlertTriangle className="h-4 w-4" />
                                                {engagementInfo.message}
                                            </p>
                                        </div>
                                    )}

                                    {/* Existing Badges */}
                                    {selectedStudent.badges.length > 0 && (
                                        <div className="mt-3">
                                            <p className="text-[10px] text-muted-foreground mb-1">Earned Badges:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {selectedStudent.badges.map((badge, i) => (
                                                    <Badge key={i} className="bg-purple-100 text-purple-700 text-xs">
                                                        {badge}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => alert("📞 Initiating secure call to the registered parent contact number...")}>
                                    <Phone className="h-3 w-3" /> Call Parent
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => alert("✉️ Opening secure email composer for parent/student communication...")}>
                                    <Mail className="h-3 w-3" /> Send Email
                                </Button>
                                {/* Fix 9: Award Badge Button */}
                                <Dialog open={badgeDialogOpen} onOpenChange={setBadgeDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button size="sm" className="flex-1 gap-1 bg-purple-500 hover:bg-purple-600">
                                            <Medal className="h-3 w-3" /> Award Badge
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-lg">
                                        <DialogHeader>
                                            <DialogTitle className="flex items-center gap-2">
                                                <Medal className="h-5 w-5 text-purple-500" />
                                                Award Badge to {selectedStudent.name}
                                            </DialogTitle>
                                            <DialogDescription>
                                                Select a badge to award. This will appear in the student&apos;s Community &gt; Achievements shelf.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid grid-cols-2 gap-3 py-4">
                                            {availableBadges.map((badge) => (
                                                <div
                                                    key={badge.id}
                                                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${selectedBadge === badge.id
                                                        ? 'border-purple-500 bg-purple-50'
                                                        : 'border-slate-200 hover:border-slate-300'
                                                        }`}
                                                    onClick={() => setSelectedBadge(badge.id)}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-2xl">{badge.icon}</span>
                                                        <div>
                                                            <p className="text-sm font-medium">{badge.name}</p>
                                                            <p className="text-[10px] text-muted-foreground">{badge.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <DialogFooter>
                                            <Button variant="outline" onClick={() => setBadgeDialogOpen(false)}>
                                                Cancel
                                            </Button>
                                            <Button
                                                className="bg-purple-500 hover:bg-purple-600 gap-2"
                                                onClick={handleAwardBadge}
                                                disabled={!selectedBadge}
                                            >
                                                <Sparkles className="h-4 w-4" />
                                                Award Badge
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <Button size="sm" className="flex-1 gap-1 bg-[#0f172a]" onClick={() => alert("📊 Generating comprehensive PDF academic report for this student...")}>
                                    <GraduationCap className="h-3 w-3" /> Full Report
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Performance Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <BarChart3 className="h-4 w-4 text-blue-500" />
                                    Performance Trend
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-40">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={performanceHistory}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[60, 100]} />
                                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                            <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 4 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <Target className="h-4 w-4 text-purple-500" />
                                    Subject Strength
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-40">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart data={subjectScores}>
                                            <PolarGrid stroke="#e2e8f0" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b' }} />
                                            <Radar dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} strokeWidth={2} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Recent Activity & Feedback */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-amber-500" />
                                    Recent Activity
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {recentActivity.map((activity, i) => (
                                    <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50">
                                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${activity.type === 'assignment' ? 'bg-blue-100 text-blue-600' :
                                            activity.type === 'test' ? 'bg-purple-100 text-purple-600' :
                                                activity.type === 'attendance' ? 'bg-amber-100 text-amber-600' :
                                                    'bg-emerald-100 text-emerald-600'
                                            }`}>
                                            {activity.type === 'achievement' ? <Star className="h-4 w-4" /> :
                                                activity.type === 'test' ? <Target className="h-4 w-4" /> :
                                                    <CheckCircle2 className="h-4 w-4" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">{activity.title}</p>
                                            <p className="text-[10px] text-muted-foreground">{activity.date}</p>
                                        </div>
                                        {activity.score && (
                                            <Badge variant="outline" className="text-[10px]">{activity.score}</Badge>
                                        )}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4 text-blue-500" />
                                    Send Feedback
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Textarea
                                    placeholder="Write feedback for the student or parent..."
                                    className="min-h-[100px] text-sm"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                />
                                <div className="flex gap-2">
                                    <Select value={feedbackType} onValueChange={setFeedbackType}>
                                        <SelectTrigger className="w-32 h-9 text-xs">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="general">General</SelectItem>
                                            <SelectItem value="academic">Academic</SelectItem>
                                            <SelectItem value="behavior">Behavior</SelectItem>
                                            <SelectItem value="appreciation">Appreciation</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 gap-1">
                                        <Send className="h-4 w-4" /> Send Feedback
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
