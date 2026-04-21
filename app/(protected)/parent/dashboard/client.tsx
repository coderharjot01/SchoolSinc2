"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    BookOpen,
    Calendar,
    Clock,
    FileText,
    GraduationCap,
    Upload,
    User,
    ChevronDown,
    ChevronRight,
    TrendingUp,
    TrendingDown,
    CheckCircle2,
    BookMarked,
    Target,
    Award,
    BarChart3,
    CalendarDays,
    Medal,
    Trophy,
    Megaphone,
} from "lucide-react";
import Link from "next/link";
import { PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from 'recharts';

// Mock Data
const attendanceData = [
    { name: 'Present', value: 73, color: '#22c55e' },
    { name: 'Absent', value: 27, color: '#e5e7eb' },
];

const weeklyAttendance = [
    { day: 'Mon', present: true },
    { day: 'Tue', present: true },
    { day: 'Wed', present: false },
    { day: 'Thu', present: true },
    { day: 'Fri', present: true },
];

// Monthly performance data - weekly scores for each month
const monthlyPerformanceData: Record<string, { week: string; score: number }[]> = {
    'December': [
        { week: 'Week 1', score: 78 },
        { week: 'Week 2', score: 82 },
        { week: 'Week 3', score: 79 },
        { week: 'Week 4', score: 85 },
    ],
    'November': [
        { week: 'Week 1', score: 72 },
        { week: 'Week 2', score: 75 },
        { week: 'Week 3', score: 78 },
        { week: 'Week 4', score: 80 },
    ],
    'October': [
        { week: 'Week 1', score: 68 },
        { week: 'Week 2', score: 70 },
        { week: 'Week 3', score: 74 },
        { week: 'Week 4', score: 76 },
    ],
    'September': [
        { week: 'Week 1', score: 65 },
        { week: 'Week 2', score: 68 },
        { week: 'Week 3', score: 70 },
        { week: 'Week 4', score: 72 },
    ],
    'August': [
        { week: 'Week 1', score: 62 },
        { week: 'Week 2', score: 64 },
        { week: 'Week 3', score: 66 },
        { week: 'Week 4', score: 68 },
    ],
    'July': [
        { week: 'Week 1', score: 58 },
        { week: 'Week 2', score: 60 },
        { week: 'Week 3', score: 62 },
        { week: 'Week 4', score: 65 },
    ],
};

const availableMonths = ['December', 'November', 'October', 'September', 'August', 'July'];

const subjectPerformance = [
    { subject: 'Mathematics', score: 88, grade: 'A', trend: 'up', change: '+5%' },
    { subject: 'Science', score: 82, grade: 'A-', trend: 'up', change: '+3%' },
    { subject: 'English', score: 78, grade: 'B+', trend: 'down', change: '-2%' },
    { subject: 'Social Studies', score: 85, grade: 'A', trend: 'up', change: '+7%' },
    { subject: 'Nepali', score: 75, grade: 'B+', trend: 'same', change: '0%' },
];

const upcomingEvents = [
    { title: 'Mathematics Exam', date: 'Dec 15', time: '10:00 AM', type: 'exam', urgent: true },
    { title: 'Science Project Due', date: 'Dec 18', time: '5:00 PM', type: 'assignment', urgent: true },
    { title: 'Parent-Teacher Meeting', date: 'Dec 20', time: '2:00 PM', type: 'meeting', urgent: false },
    { title: 'Winter Break Starts', date: 'Dec 22', time: '-', type: 'holiday', urgent: false },
];

const todaySchedule = [
    { time: '09:00', subject: 'Mathematics', room: '202', teacher: 'Mr. Sharma', status: 'completed' },
    { time: '10:00', subject: 'Science', room: '204', teacher: 'Mrs. Patel', status: 'ongoing' },
    { time: '11:00', subject: 'English', room: '202', teacher: 'Ms. Wilson', status: 'upcoming' },
    { time: '12:00', subject: 'Break', room: '-', teacher: '-', status: 'upcoming' },
    { time: '02:00', subject: 'Social Studies', room: '206', teacher: 'Mr. Kumar', status: 'upcoming' },
];

const pendingTasks = [
    { title: 'Physics Assignment Ch-5', due: 'Tomorrow', priority: 'high' },
    { title: 'English Essay', due: 'In 3 days', priority: 'medium' },
    { title: 'Math Practice Set 12', due: 'In 5 days', priority: 'low' },
];

const notices = [
    { title: 'Holiday Notice', desc: 'School closed on Dec 25', time: '2 hours ago', type: 'holiday' },
    { title: 'Exam Schedule Released', desc: 'Check your exam timetable', time: '1 day ago', type: 'exam' },
    { title: 'Fee Reminder', desc: 'Last date: Dec 20', time: '2 days ago', type: 'finance' },
];

interface ParentDashboardClientProps {
    userName: string;
}

export default function ParentDashboardClient({ userName }: ParentDashboardClientProps) {
    // Prevent hydration mismatch with Recharts
    const [isMounted, setIsMounted] = useState(false);

    // State for selected month in performance chart - default to December for SSR
    const [selectedMonth, setSelectedMonth] = useState('December');

    useEffect(() => {
        setIsMounted(true);
        // Set the actual current month after mount to avoid hydration mismatch
        const actualMonth = new Date().toLocaleDateString('en-US', { month: 'long' });
        if (monthlyPerformanceData[actualMonth]) {
            setSelectedMonth(actualMonth);
        }
    }, []);

    // Get time-based greeting
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'Good Morning';
        if (hour >= 12 && hour < 17) return 'Good Afternoon';
        if (hour >= 17 && hour < 21) return 'Good Evening';
        return 'Good Night';
    };

    // Get performance data for selected month (fallback to December if month not found)
    const performanceData = monthlyPerformanceData[selectedMonth] || monthlyPerformanceData['December'];

    // Only compute current date on client to avoid hydration mismatch
    const currentDate = isMounted
        ? new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : '';

    // Show loading skeleton until mounted
    if (!isMounted) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="bg-slate-200 dark:bg-slate-800 rounded-2xl h-48" />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-64" />
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-64" />
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-64" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-80" />
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-80" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Welcome Banner - Enhanced */}
            <div className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <p className="text-slate-400 text-sm mb-1">{getGreeting()},</p>
                            <h2 className="text-2xl lg:text-3xl font-bold mb-2">{userName}</h2>
                            <p className="text-slate-300 text-sm">Here&apos;s your child&apos;s academic overview for today</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
                                <p className="text-2xl font-bold text-orange-400">3</p>
                                <p className="text-xs text-slate-300">Pending Tasks</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
                                <p className="text-2xl font-bold text-emerald-400">85%</p>
                                <p className="text-xs text-slate-300">Current Score</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
                                <p className="text-2xl font-bold text-blue-400">5th</p>
                                <p className="text-xs text-slate-300">Class Rank</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                            <CalendarDays className="h-3.5 w-3.5" /> {currentDate}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" /> Term: October 2024 - March 2025
                        </span>
                        <span className="flex items-center gap-1">
                            <GraduationCap className="h-3.5 w-3.5" /> Class 10-A | Roll No: 15
                        </span>
                    </div>
                </div>
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-96 h-full pointer-events-none opacity-10">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#FFFFFF" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.9C87.4,-34.7,90.1,-20.4,90.9,-6.1C91.7,8.2,90.6,22.5,84.1,35.2C77.6,47.9,65.7,59,52.2,65.9C38.7,72.8,23.6,75.5,9.2,74C-5.2,72.5,-19,66.8,-31.6,59.3C-44.2,51.8,-55.6,42.5,-64.5,30.8C-73.4,19.1,-79.8,5,-78.3,-8.3C-76.8,-21.6,-67.4,-34.1,-56.3,-43.3C-45.2,-52.5,-32.4,-58.4,-19.4,-64.4C-6.4,-70.4,6.8,-76.5,20.8,-76.5C34.8,-76.5,52,-70.4,44.7,-76.4Z" transform="translate(100 100)" />
                    </svg>
                </div>
            </div>

            {/* Priority Row - Attendance, Performance, Upcoming */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Today's Attendance + Weekly Overview */}
                <Card className="lg:col-span-1">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <User className="h-4 w-4 text-emerald-500" />
                                Attendance Overview
                            </CardTitle>
                            <Badge className="bg-emerald-500 text-white">Present Today</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="relative h-28 w-28 flex-shrink-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={attendanceData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={35}
                                            outerRadius={50}
                                            startAngle={90}
                                            endAngle={-270}
                                            dataKey="value"
                                        >
                                            {attendanceData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-bold text-emerald-600">73%</span>
                                    <span className="text-[10px] text-slate-400">Overall</span>
                                </div>
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Present Days</span>
                                    <span className="font-semibold">146/200</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">This Month</span>
                                    <span className="font-semibold text-emerald-600">18/20</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-600">Leaves Taken</span>
                                    <span className="font-semibold">5</span>
                                </div>
                            </div>
                        </div>

                        {/* Weekly View */}
                        <div className="pt-3 border-t">
                            <p className="text-xs text-slate-500 mb-2">This Week</p>
                            <div className="flex justify-between">
                                {weeklyAttendance.map((day, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1">
                                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium ${day.present
                                            ? 'bg-emerald-100 text-emerald-600'
                                            : 'bg-rose-100 text-rose-600'
                                            }`}>
                                            {day.present ? '✓' : '✗'}
                                        </div>
                                        <span className="text-[10px] text-slate-500">{day.day}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Academic Performance Chart */}
                <Card className="lg:col-span-1">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <BarChart3 className="h-4 w-4 text-blue-500" />
                                Performance Trend
                            </CardTitle>
                            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                                <SelectTrigger className="h-7 w-[120px] text-xs">
                                    <SelectValue placeholder="Select month" />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableMonths.map((month) => (
                                        <SelectItem key={month} value={month} className="text-xs">
                                            {month}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-36">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={performanceData}>
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[60, 100]} />
                                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                    <Area type="monotone" dataKey="score" stroke="#3b82f6" fillOpacity={1} fill="url(#colorScore)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-3 pt-3 border-t flex items-center justify-between">
                            <div className="text-center">
                                <p className="text-lg font-bold text-slate-800">85%</p>
                                <p className="text-[10px] text-slate-500">Current Avg</p>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-bold text-emerald-600 flex items-center gap-1">
                                    <TrendingUp className="h-4 w-4" /> +8%
                                </p>
                                <p className="text-[10px] text-slate-500">vs Last Term</p>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-bold text-blue-600">A</p>
                                <p className="text-[10px] text-slate-500">Overall Grade</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Events & Deadlines */}
                <Card className="lg:col-span-1">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-orange-500" />
                                Upcoming Events
                            </CardTitle>
                            <Link href="/parent/exams" className="text-xs text-blue-600 hover:underline">View All</Link>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {upcomingEvents.map((event, i) => (
                            <div key={i} className={`p-3 rounded-lg border ${event.urgent ? 'border-orange-200 bg-orange-50' : 'border-slate-100 bg-slate-50/50'} hover:shadow-sm transition-shadow`}>
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-start gap-2">
                                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${event.type === 'exam' ? 'bg-rose-100 text-rose-600' :
                                            event.type === 'assignment' ? 'bg-blue-100 text-blue-600' :
                                                event.type === 'meeting' ? 'bg-purple-100 text-purple-600' :
                                                    'bg-emerald-100 text-emerald-600'
                                            }`}>
                                            {event.type === 'exam' ? <FileText className="h-4 w-4" /> :
                                                event.type === 'assignment' ? <Upload className="h-4 w-4" /> :
                                                    event.type === 'meeting' ? <User className="h-4 w-4" /> :
                                                        <Calendar className="h-4 w-4" />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">{event.title}</p>
                                            <p className="text-[10px] text-slate-500">{event.date} • {event.time}</p>
                                        </div>
                                    </div>
                                    {event.urgent && (
                                        <Badge className="bg-orange-500 text-white text-[10px]">Soon</Badge>
                                    )}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Middle Row - Today's Schedule + Subject Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Today's Schedule */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <Clock className="h-4 w-4 text-purple-500" />
                                Today&apos;s Schedule
                            </CardTitle>
                            <Button size="sm" className="h-7 text-xs bg-[#0f172a]">
                                Monday <ChevronDown className="h-3 w-3 ml-1" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {todaySchedule.map((item, i) => (
                                <div key={i} className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${item.status === 'ongoing' ? 'bg-blue-50 border border-blue-200' :
                                    item.status === 'completed' ? 'bg-slate-50 opacity-60' :
                                        'bg-white border border-slate-100 hover:bg-slate-50'
                                    }`}>
                                    <div className={`text-sm font-mono font-semibold w-14 ${item.status === 'ongoing' ? 'text-blue-600' : 'text-slate-500'
                                        }`}>
                                        {item.time}
                                    </div>
                                    <div className="flex-1">
                                        <p className={`font-medium text-sm ${item.status === 'completed' ? 'line-through text-slate-400' : ''}`}>
                                            {item.subject}
                                        </p>
                                        {item.teacher !== '-' && (
                                            <p className="text-[10px] text-slate-500">
                                                {item.teacher} • Room {item.room}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        {item.status === 'completed' && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                                        {item.status === 'ongoing' && (
                                            <Badge className="bg-blue-500 text-white text-[10px] animate-pulse">Now</Badge>
                                        )}
                                        {item.status === 'upcoming' && item.subject !== 'Break' && (
                                            <ChevronRight className="h-5 w-5 text-slate-300" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Subject-wise Performance */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <BookMarked className="h-4 w-4 text-indigo-500" />
                                Subject Performance
                            </CardTitle>
                            <Link href="/parent/performance" className="text-xs text-blue-600 hover:underline">Details</Link>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {subjectPerformance.map((subject, i) => (
                            <div key={i} className="space-y-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">{subject.subject}</span>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs font-medium flex items-center gap-0.5 ${subject.trend === 'up' ? 'text-emerald-600' :
                                            subject.trend === 'down' ? 'text-rose-600' : 'text-slate-500'
                                            }`}>
                                            {subject.trend === 'up' && <TrendingUp className="h-3 w-3" />}
                                            {subject.trend === 'down' && <TrendingDown className="h-3 w-3" />}
                                            {subject.change}
                                        </span>
                                        <Badge variant="outline" className="text-xs font-bold">{subject.grade}</Badge>
                                        <span className="text-sm font-semibold w-10 text-right">{subject.score}%</span>
                                    </div>
                                </div>
                                <Progress value={subject.score} className="h-2" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Row - Tasks, Quick Actions, Notices */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Pending Tasks */}
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <Target className="h-4 w-4 text-rose-500" />
                                Pending Tasks
                            </CardTitle>
                            <Badge variant="outline" className="text-rose-600 border-rose-200">{pendingTasks.length} Due</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {pendingTasks.map((task, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-slate-50 transition-colors">
                                <div className={`h-2 w-2 rounded-full flex-shrink-0 ${task.priority === 'high' ? 'bg-rose-500' :
                                    task.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                                    }`} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{task.title}</p>
                                    <p className="text-[10px] text-slate-500">Due: {task.due}</p>
                                </div>
                                <Button variant="ghost" size="sm" className="h-7 text-xs">View</Button>
                            </div>
                        ))}
                        <Link href="/parent/resources" className="block">
                            <Button variant="outline" className="w-full mt-2 text-xs">
                                View All Assignments
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Quick Actions - Redesigned */}
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-semibold flex items-center gap-2">
                            <Award className="h-4 w-4 text-amber-500" />
                            Quick Actions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { label: 'Reports', icon: FileText, color: 'bg-emerald-500', href: '/parent/reports' },
                                { label: 'Leave', icon: Calendar, color: 'bg-rose-500', href: '/parent/leaves' },
                                { label: 'Resources', icon: BookOpen, color: 'bg-blue-500', href: '/parent/resources' },
                                { label: 'Leaderboard', icon: Trophy, color: 'bg-indigo-500', href: '/parent/leaderboard' },
                                { label: 'Achievements', icon: Medal, color: 'bg-amber-400', href: '/parent/achievements' },
                                { label: 'Exams', icon: Clock, color: 'bg-purple-500', href: '/parent/exams' },
                                { label: 'Finance', icon: GraduationCap, color: 'bg-amber-500', href: '/parent/finance' },
                                { label: 'Profile', icon: User, color: 'bg-slate-600', href: '/parent/profile' },
                            ].map((action, i) => (
                                <Link key={i} href={action.href}>
                                    <div className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                                        <div className={`h-10 w-10 rounded-xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                            <action.icon className="h-5 w-5 text-white" />
                                        </div>
                                        <span className="text-[10px] font-medium text-slate-600">{action.label}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Notices */}
                <Card>
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <Megaphone className="h-4 w-4 text-blue-500" />
                                Latest Notices
                            </CardTitle>
                            <Link href="/parent/notices" className="text-xs text-blue-600 hover:underline">View All</Link>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {notices.map((notice, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-slate-50 transition-colors">
                                <div className={`h-2 w-2 rounded-full mt-1.5 flex-shrink-0 ${notice.type === 'holiday' ? 'bg-rose-500' :
                                    notice.type === 'exam' ? 'bg-blue-500' : 'bg-amber-500'
                                    }`} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium">{notice.title}</p>
                                    <p className="text-[10px] text-slate-500 truncate">{notice.desc}</p>
                                    <p className="text-[10px] text-slate-400 mt-1">{notice.time}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
