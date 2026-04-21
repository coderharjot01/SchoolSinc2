"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SpeedGridAttendance } from "@/components/faculty/speed-grid-attendance";
import { MatrixAttendance } from "@/components/faculty/matrix-attendance";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Users,
    UserCheck,
    UserX,
    Clock,
    Calendar,
    TrendingUp,
    AlertCircle,
    Download,
    BarChart3,
    Grid3X3,
    Table2,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// Mock data
const attendanceStats = [
    { name: 'Present', value: 38, color: '#22c55e' },
    { name: 'Absent', value: 4, color: '#ef4444' },
    { name: 'Leave', value: 2, color: '#f59e0b' },
];

const weeklyTrend = [
    { day: 'Mon', present: 40, absent: 2 },
    { day: 'Tue', present: 38, absent: 4 },
    { day: 'Wed', present: 41, absent: 1 },
    { day: 'Thu', present: 39, absent: 3 },
    { day: 'Fri', present: 37, absent: 5 },
];

const lowAttendanceStudents = [
    { name: 'Rahul Kumar', attendance: 65, absences: 14, status: 'critical', streak: 0 },
    { name: 'Priya Singh', attendance: 72, absences: 11, status: 'warning', streak: 3 },
    { name: 'Amit Patel', attendance: 75, absences: 10, status: 'warning', streak: 5 },
];

export default function FacultyAttendancePage() {
    const [isMounted, setIsMounted] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState("december");
    const [selectedClass, setSelectedClass] = useState("10a");
    const [viewMode, setViewMode] = useState<"grid" | "matrix">("grid");

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const todayDate = isMounted
        ? new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
        : '';

    const totalStudents = 44;
    const presentToday = 38;
    const absentToday = 4;
    const onLeave = 2;
    const attendancePercentage = Math.round((presentToday / totalStudents) * 100);

    const handleExportData = () => {
        try {
            const headers = ["Student ID", "Student Name", "Class", "Days Present", "Days Absent", "Attendance %", "Status"];
            const mockData = [
                { id: "S01", name: "Aarav Sharma", p: 18, a: 2, status: "Good" },
                { id: "S02", name: "Vihaan Singh", p: 20, a: 0, status: "Excellent" },
                { id: "S03", name: "Aditya Gupta", p: 15, a: 5, status: "Warning" },
                { id: "S04", name: "Sai Patel", p: 19, a: 1, status: "Excellent" },
                { id: "S05", name: "Reyansh Kumar", p: 12, a: 8, status: "Critical" },
            ];

            const csvRows = [headers.join(",")];
            mockData.forEach(s => {
                const pct = Math.round((s.p / (s.p + s.a)) * 100);
                csvRows.push(`${s.id},${s.name},${selectedClass.toUpperCase()},${s.p},${s.a},${pct}%,${s.status}`);
            });

            // Add the low attendance students dynamically
            lowAttendanceStudents.forEach((student, idx) => {
                csvRows.push(`LA-0${idx + 1},${student.name},${selectedClass.toUpperCase()},${20 - student.absences},${student.absences},${student.attendance}%,${student.status}`);
            });

            const csvString = csvRows.join("\n");
            const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `class_${selectedClass}_attendance_${selectedMonth}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Export Failed", error);
            alert("Sorry, the export failed to generate. Please try again.");
        }
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
                    <div className="lg:col-span-2 bg-slate-200 dark:bg-slate-800 rounded-xl h-96" />
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-96" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header with Filters */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <PageHeader
                    breadcrumb="Home / Attendance"
                    title="Attendance Sheet"
                    subtitle="Mark attendance quickly with Speed Grid"
                />
                <div className="flex flex-wrap gap-2">
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                        <SelectTrigger className="w-[130px] text-xs sm:text-sm h-9">
                            <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="december">December 2024</SelectItem>
                            <SelectItem value="november">November 2024</SelectItem>
                            <SelectItem value="october">October 2024</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                        <SelectTrigger className="w-[100px] text-xs sm:text-sm h-9">
                            <SelectValue placeholder="Class" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10a">Class 10-A</SelectItem>
                            <SelectItem value="10b">Class 10-B</SelectItem>
                            <SelectItem value="9a">Class 9-A</SelectItem>
                            <SelectItem value="9b">Class 9-B</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" className="h-9 gap-1" onClick={handleExportData} title="Download Excel Data">
                        <Download className="h-4 w-4 text-emerald-600" /> Export
                    </Button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-4 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Total Students</p>
                                <p className="text-xl font-bold">{totalStudents}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-4 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                                <UserCheck className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Present Today</p>
                                <p className="text-xl font-bold text-emerald-600">{presentToday}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-4 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-rose-100 flex items-center justify-center">
                                <UserX className="h-5 w-5 text-rose-600" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Absent Today</p>
                                <p className="text-xl font-bold text-rose-600">{absentToday}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-4 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center">
                                <Clock className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">On Leave</p>
                                <p className="text-xl font-bold text-amber-600">{onLeave}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Attendance Grid/Matrix */}
                <div className="lg:col-span-2 space-y-6">
                    {/* View Mode Toggle & Quick Mark */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-blue-500" />
                                        Mark Attendance
                                    </CardTitle>
                                    <Badge variant="outline" className="text-xs">
                                        Today: {todayDate}
                                    </Badge>
                                </div>
                                {/* View Mode Toggle */}
                                <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "matrix")} className="w-auto">
                                    <TabsList className="h-8">
                                        <TabsTrigger value="grid" className="text-xs gap-1 px-3">
                                            <Grid3X3 className="h-3.5 w-3.5" />
                                            Speed Grid
                                        </TabsTrigger>
                                        <TabsTrigger value="matrix" className="text-xs gap-1 px-3">
                                            <Table2 className="h-3.5 w-3.5" />
                                            Matrix
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            {viewMode === "grid" ? (
                                <SpeedGridAttendance />
                            ) : (
                                <MatrixAttendance />
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Analytics */}
                <div className="space-y-6">
                    {/* Today's Overview - Pie Chart */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <BarChart3 className="h-4 w-4 text-purple-500" />
                                Today&apos;s Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <div className="relative h-28 w-28 flex-shrink-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={attendanceStats}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={35}
                                                outerRadius={50}
                                                startAngle={90}
                                                endAngle={-270}
                                                dataKey="value"
                                            >
                                                {attendanceStats.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-2xl font-bold text-emerald-600">{attendancePercentage}%</span>
                                        <span className="text-[10px] text-slate-400">Present</span>
                                    </div>
                                </div>
                                <div className="flex-1 space-y-2">
                                    {attendanceStats.map((stat, i) => (
                                        <div key={i} className="flex items-center justify-between">
                                            <span className="text-sm text-slate-600 flex items-center gap-2">
                                                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: stat.color }}></span>
                                                {stat.name}
                                            </span>
                                            <span className="font-semibold">{stat.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Weekly Trend */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-blue-500" />
                                Weekly Trend
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-36">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={weeklyTrend}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Bar dataKey="present" fill="#22c55e" radius={[2, 2, 0, 0]} />
                                        <Bar dataKey="absent" fill="#ef4444" radius={[2, 2, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Low Attendance Students */}
                    <Card>
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-rose-500" />
                                    Low Attendance Alert
                                </CardTitle>
                                <Badge variant="outline" className="text-rose-600 border-rose-200 text-[10px]">{lowAttendanceStudents.length} Students</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {lowAttendanceStudents.map((student, i) => (
                                <div key={i} className={`p-3 rounded-lg border ${student.status === 'critical' ? 'border-rose-200 bg-rose-50' : 'border-amber-200 bg-amber-50'
                                    }`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">{student.name}</span>
                                            {student.streak > 0 && (
                                                <Badge variant="outline" className="text-[8px] px-1 py-0 h-4 text-orange-600 border-orange-200">
                                                    🔥{student.streak}
                                                </Badge>
                                            )}
                                        </div>
                                        <Badge className={`text-[10px] ${student.status === 'critical' ? 'bg-rose-500' : 'bg-amber-500'
                                            }`}>
                                            {student.attendance}%
                                        </Badge>
                                    </div>
                                    <div className="flex items-center justify-between text-[10px]">
                                        <span className="text-slate-500">{student.absences} absences this month</span>
                                        <Button variant="ghost" size="sm" className="h-6 text-[10px] text-blue-600">
                                            Notify Parent
                                        </Button>
                                    </div>
                                    <Progress value={student.attendance} className="h-1.5 mt-2" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
