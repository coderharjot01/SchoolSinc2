"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import {
    Users,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    GraduationCap,
    DollarSign,
    UserCheck,
    Building2,
    TrendingUp,
    FileText,
    ChevronRight,
    Activity,
    Award,
    CalendarDays,
    Briefcase,
    UserCog,
    BookOpen,
} from "lucide-react";
import Link from "next/link";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, CartesianGrid } from 'recharts';

interface AdminDashboardClientProps {
    userName: string;
}

// Mock data
const incomeData = [
    { month: 'Jul', income: 2400000, expenses: 1800000 },
    { month: 'Aug', income: 2800000, expenses: 1900000 },
    { month: 'Sep', income: 3200000, expenses: 2100000 },
    { month: 'Oct', income: 2900000, expenses: 2000000 },
    { month: 'Nov', income: 3500000, expenses: 2300000 },
    { month: 'Dec', income: 3800000, expenses: 2400000 },
];

const attendanceRate = [
    { name: 'Present', value: 87, color: '#22c55e' },
    { name: 'Absent', value: 13, color: '#e5e7eb' },
];

const staffDistribution = [
    { department: 'Science', count: 45 },
    { department: 'Math', count: 38 },
    { department: 'English', count: 32 },
    { department: 'Arts', count: 28 },
    { department: 'Sports', count: 22 },
    { department: 'Admin', count: 20 },
];

const recentActivity = [
    { action: 'New student enrolled', detail: 'Rahul Kumar - Class 10-A', time: '5 min ago', type: 'student' },
    { action: 'Fee payment received', detail: '₹45,000 from Priya Singh', time: '15 min ago', type: 'payment' },
    { action: 'Leave approved', detail: 'Ms. Sharma - 3 days leave', time: '1 hour ago', type: 'leave' },
    { action: 'Exam schedule updated', detail: 'Mid-term exams - Feb 2025', time: '2 hours ago', type: 'exam' },
    { action: 'New staff joined', detail: 'Mr. Verma - Physics Dept.', time: '3 hours ago', type: 'staff' },
];

const pendingApprovals = [
    { title: 'Leave Requests', count: 8, icon: CalendarDays, color: 'text-amber-600 bg-amber-100', href: '/admin/leaves' },
    { title: 'Fee Waivers', count: 3, icon: DollarSign, color: 'text-blue-600 bg-blue-100', href: '/admin/finance' },
    { title: 'New Admissions', count: 12, icon: Users, color: 'text-emerald-600 bg-emerald-100', href: '/admin/students' },
    { title: 'Resource Requests', count: 5, icon: BookOpen, color: 'text-purple-600 bg-purple-100', href: '/admin/academics' },
];

const upcomingEvents = [
    { title: 'Parents Teacher Meet', date: 'Dec 18, 2024', time: '10:00 AM', type: 'meeting', priority: 'high' },
    { title: 'Annual Day Rehearsal', date: 'Dec 20, 2024', time: '02:00 PM', type: 'event', priority: 'medium' },
    { title: 'Staff Meeting', date: 'Dec 22, 2024', time: '11:00 AM', type: 'meeting', priority: 'low' },
    { title: 'Winter Break Starts', date: 'Dec 25, 2024', time: '-', type: 'holiday', priority: 'info' },
];

const classPerformance = [
    { class: '10-A', avgScore: 82, rank: 1, trend: 'up' },
    { class: '10-B', avgScore: 78, rank: 2, trend: 'up' },
    { class: '9-A', avgScore: 76, rank: 3, trend: 'same' },
    { class: '9-B', avgScore: 74, rank: 4, trend: 'down' },
    { class: '8-A', avgScore: 80, rank: 5, trend: 'up' },
];

export default function AdminDashboardClient({ userName }: AdminDashboardClientProps) {
    // Prevent hydration mismatch with Recharts
    const [isMounted, setIsMounted] = useState(false);
    // Initialize date to undefined for SSR, set actual date after mount
    const [date, setDate] = useState<Date | undefined>(undefined);

    useEffect(() => {
        setIsMounted(true);
        setDate(new Date());
    }, []);

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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-20" />
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-20" />
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-20" />
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-20" />
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2 bg-slate-200 dark:bg-slate-800 rounded-xl h-96" />
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-96" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Enhanced Welcome Banner */}
            <div className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div>
                            <p className="text-slate-400 text-sm mb-1">Welcome back,</p>
                            <h2 className="text-2xl lg:text-3xl font-bold mb-2">{userName}</h2>
                            <p className="text-slate-300 text-sm">Here is what&apos;s happening across your institution today</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center min-w-[90px]">
                                <p className="text-2xl font-bold text-blue-400">1,245</p>
                                <p className="text-xs text-slate-300">Students</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center min-w-[90px]">
                                <p className="text-2xl font-bold text-emerald-400">185</p>
                                <p className="text-xs text-slate-300">Staff</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center min-w-[90px]">
                                <p className="text-2xl font-bold text-amber-400">28</p>
                                <p className="text-xs text-slate-300">Classes</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center min-w-[90px]">
                                <p className="text-2xl font-bold text-rose-400">₹29.5L</p>
                                <p className="text-xs text-slate-300">Monthly Rev</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                            <CalendarDays className="h-3.5 w-3.5" /> {currentDate}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" /> Academic Year: April 2024 - March 2025
                        </span>
                        <span className="flex items-center gap-1">
                            <Building2 className="h-3.5 w-3.5" /> Term: Second (Oct - Mar)
                        </span>
                    </div>
                </div>
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-96 h-full pointer-events-none opacity-5">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#FFFFFF" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,79.6,-46.9C87.4,-34.7,90.1,-20.4,90.9,-6.1C91.7,8.2,90.6,22.5,84.1,35.2C77.6,47.9,65.7,59,52.2,65.9C38.7,72.8,23.6,75.5,9.2,74C-5.2,72.5,-19,66.8,-31.6,59.3C-44.2,51.8,-55.6,42.5,-64.5,30.8C-73.4,19.1,-79.8,5,-78.3,-8.3C-76.8,-21.6,-67.4,-34.1,-56.3,-43.3C-45.2,-52.5,-32.4,-58.4,-19.4,-64.4C-6.4,-70.4,6.8,-76.5,20.8,-76.5C34.8,-76.5,52,-70.4,44.7,-76.4Z" transform="translate(100 100)" />
                    </svg>
                </div>
            </div>

            {/* Pending Approvals Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {pendingApprovals.map((item, i) => (
                    <Link key={i} href={item.href} className="block">
                        <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                            <CardContent className="pt-4 pb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${item.color}`}>
                                            <item.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">{item.title}</p>
                                            <p className="text-xl font-bold">{item.count}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-slate-300" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Left Column - Revenue & Analytics */}
                <div className="xl:col-span-2 space-y-6">
                    {/* Financial Overview */}
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base font-semibold flex items-center gap-2">
                                    <DollarSign className="h-4 w-4 text-emerald-500" />
                                    Financial Overview
                                </CardTitle>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="h-7 text-xs">Monthly</Button>
                                    <Button size="sm" className="h-7 text-xs bg-[#0f172a]">Annual</Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <div className="bg-emerald-50 rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-slate-500">Total Income</span>
                                        <span className="text-xs text-emerald-600 flex items-center"><ArrowUpRight className="h-3 w-3" />+12%</span>
                                    </div>
                                    <p className="text-xl font-bold text-emerald-700">₹29,545,000</p>
                                </div>
                                <div className="bg-rose-50 rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-slate-500">Total Expenses</span>
                                        <span className="text-xs text-rose-600 flex items-center"><ArrowUpRight className="h-3 w-3" />+5%</span>
                                    </div>
                                    <p className="text-xl font-bold text-rose-700">₹19,291,266</p>
                                </div>
                                <div className="bg-blue-50 rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-slate-500">Net Profit</span>
                                        <span className="text-xs text-blue-600 flex items-center"><ArrowUpRight className="h-3 w-3" />+15%</span>
                                    </div>
                                    <p className="text-xl font-bold text-blue-700">₹10,253,734</p>
                                </div>
                            </div>
                            <div className="h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={incomeData}>
                                        <defs>
                                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} tickFormatter={(v) => `₹${v / 100000}L`} />
                                        <Tooltip formatter={(v: number) => `₹${(v / 100000).toFixed(1)}L`} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Area type="monotone" dataKey="income" stroke="#22c55e" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={2} />
                                        <Area type="monotone" dataKey="expenses" stroke="#f43f5e" fillOpacity={1} fill="url(#colorExpense)" strokeWidth={2} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Student & Staff Statistics Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Attendance Overview */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <UserCheck className="h-4 w-4 text-emerald-500" />
                                    Today&apos;s Attendance
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-6">
                                    <div className="relative h-28 w-28 flex-shrink-0">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={attendanceRate}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={35}
                                                    outerRadius={50}
                                                    startAngle={90}
                                                    endAngle={-270}
                                                    dataKey="value"
                                                >
                                                    {attendanceRate.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-2xl font-bold text-emerald-600">87%</span>
                                            <span className="text-[10px] text-slate-400">Present</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-600 flex items-center gap-2">
                                                <span className="h-2 w-2 bg-emerald-500 rounded-full"></span>Students Present
                                            </span>
                                            <span className="font-semibold">1,083</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-600 flex items-center gap-2">
                                                <span className="h-2 w-2 bg-slate-300 rounded-full"></span>Students Absent
                                            </span>
                                            <span className="font-semibold">162</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-600 flex items-center gap-2">
                                                <span className="h-2 w-2 bg-blue-500 rounded-full"></span>Staff Present
                                            </span>
                                            <span className="font-semibold">178/185</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Staff Distribution */}
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <Briefcase className="h-4 w-4 text-blue-500" />
                                    Staff by Department
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-36">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={staffDistribution} layout="vertical">
                                            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                            <YAxis dataKey="department" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} width={60} />
                                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                            <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Class Performance */}
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <Award className="h-4 w-4 text-amber-500" />
                                    Class Performance Rankings
                                </CardTitle>
                                <Link href="/admin/analytics" className="text-xs text-blue-600 hover:underline">View All</Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {classPerformance.map((cls, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${cls.rank === 1 ? 'bg-amber-100 text-amber-700' :
                                            cls.rank === 2 ? 'bg-slate-100 text-slate-600' :
                                                cls.rank === 3 ? 'bg-orange-100 text-orange-700' :
                                                    'bg-slate-50 text-slate-500'
                                            }`}>
                                            #{cls.rank}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium">Class {cls.class}</span>
                                                <span className="text-sm font-semibold flex items-center gap-1">
                                                    {cls.avgScore}%
                                                    {cls.trend === 'up' && <TrendingUp className="h-3 w-3 text-emerald-500" />}
                                                    {cls.trend === 'down' && <ArrowDownRight className="h-3 w-3 text-rose-500" />}
                                                </span>
                                            </div>
                                            <Progress value={cls.avgScore} className="h-2" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Calendar & Activity */}
                <div className="space-y-6">
                    {/* Calendar */}
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-semibold">Schedule</CardTitle>
                                <Button variant="ghost" size="sm" className="h-7 text-xs text-blue-600">+ Add New</Button>
                            </div>
                        </CardHeader>
                        <CardContent className="pb-4">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border shadow-sm w-full flex justify-center"
                            />
                        </CardContent>
                    </Card>

                    {/* Upcoming Events */}
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <CalendarDays className="h-4 w-4 text-purple-500" />
                                    Upcoming Events
                                </CardTitle>
                                <Link href="/admin/events" className="text-xs text-blue-600 hover:underline">View All</Link>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {upcomingEvents.map((event, i) => (
                                <div key={i} className={`p-3 rounded-lg border ${event.priority === 'high' ? 'border-rose-200 bg-rose-50' :
                                    event.priority === 'medium' ? 'border-amber-200 bg-amber-50' :
                                        event.priority === 'info' ? 'border-blue-200 bg-blue-50' :
                                            'border-slate-100 bg-slate-50'
                                    }`}>
                                    <div className="flex items-start gap-3">
                                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${event.type === 'meeting' ? 'bg-blue-500' :
                                            event.type === 'event' ? 'bg-purple-500' :
                                                'bg-emerald-500'
                                            } text-white`}>
                                            {event.type === 'meeting' ? <Users className="h-4 w-4" /> :
                                                event.type === 'event' ? <Activity className="h-4 w-4" /> :
                                                    <CalendarDays className="h-4 w-4" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium">{event.title}</p>
                                            <p className="text-[10px] text-slate-500">{event.date} • {event.time}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <Activity className="h-4 w-4 text-blue-500" />
                                Recent Activity
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {recentActivity.map((activity, i) => (
                                <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${activity.type === 'student' ? 'bg-blue-100 text-blue-600' :
                                        activity.type === 'payment' ? 'bg-emerald-100 text-emerald-600' :
                                            activity.type === 'leave' ? 'bg-amber-100 text-amber-600' :
                                                activity.type === 'exam' ? 'bg-purple-100 text-purple-600' :
                                                    'bg-rose-100 text-rose-600'
                                        }`}>
                                        {activity.type === 'student' ? <GraduationCap className="h-4 w-4" /> :
                                            activity.type === 'payment' ? <DollarSign className="h-4 w-4" /> :
                                                activity.type === 'leave' ? <CalendarDays className="h-4 w-4" /> :
                                                    activity.type === 'exam' ? <FileText className="h-4 w-4" /> :
                                                        <UserCog className="h-4 w-4" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium">{activity.action}</p>
                                        <p className="text-[10px] text-slate-500 truncate">{activity.detail}</p>
                                        <p className="text-[10px] text-slate-400">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
