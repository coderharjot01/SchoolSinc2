"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Trophy, Clock, FileText, Target, TrendingUp } from "lucide-react";
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Legend
} from 'recharts';

interface ReportsClientProps {
    userName: string;
}

// Mock data for progress chart
const progressData = [
    { month: '2024-12', progress: 0 },
    { month: '2025-02', progress: 5 },
    { month: '2025-04', progress: 12 },
    { month: '2025-06', progress: 18 },
    { month: '2025-08', progress: 25 },
    { month: '2025-10', progress: 37 },
    { month: '2025-12', progress: 45 },
];

// Mock data for proficiency chart
const proficiencyData = [
    { subject: 'Mathematics', batchTop: 95, myScore: 78 },
    { subject: 'Science', batchTop: 92, myScore: 85 },
    { subject: 'English', batchTop: 88, myScore: 72 },
    { subject: 'Social Studies', batchTop: 85, myScore: 68 },
    { subject: 'Hindi', batchTop: 90, myScore: 82 },
    { subject: 'Computer', batchTop: 96, myScore: 88 },
];

// Mock leaderboard data
const leaderboardData = [
    { rank: 1, name: "Priya Sharma", avatar: "PS", batch: "10-A", score: 1640 },
    { rank: 2, name: "Rahul Verma", avatar: "RV", batch: "10-A", score: 1509 },
    { rank: 3, name: "Ankit Singh", avatar: "AS", batch: "10-A", score: 1447 },
    { rank: 4, name: "Sneha Patel", avatar: "SP", batch: "10-A", score: 1398 },
    { rank: 5, name: "Vikram Kumar", avatar: "VK", batch: "10-A", score: 1356 },
];

export default function ReportsClient({ userName }: ReportsClientProps) {
    // Prevent hydration mismatch with Recharts
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Show loading skeleton until mounted
    if (!isMounted) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-8 w-48" />
                <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-12" />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-20" />
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-20" />
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-20" />
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-20" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-72" />
                    <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-72" />
                </div>
            </div>
        );
    }
    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="text-sm text-slate-500">
                Home / Child&apos;s Reports
            </div>

            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-lg sm:text-2xl font-bold">
                    <span className="text-orange-500">Child&apos;s Report</span>
                    <span className="text-blue-600"> | {userName}</span>
                    <span className="text-blue-600 block sm:inline text-sm sm:text-2xl">(STU2025001)</span>
                </h1>
                <Button variant="link" className="text-blue-600 hover:text-blue-700 p-0 h-auto">
                    Public Profile <ExternalLink className="h-4 w-4 ml-1" />
                </Button>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
                <div className="overflow-x-auto -mx-4 px-4">
                    <TabsList className="bg-transparent border-b w-max min-w-full justify-start rounded-none h-auto p-0 gap-0">
                        {["Overview", "Academics", "Assignments", "Assessments", "Activities", "Attendance"].map((tab) => (
                            <TabsTrigger
                                key={tab}
                                value={tab.toLowerCase()}
                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:text-orange-500 data-[state=active]:shadow-none px-3 sm:px-4 py-3 text-sm whitespace-nowrap"
                            >
                                {tab}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                <TabsContent value="overview" className="mt-6 space-y-6">
                    {/* Branch & Batch Info */}
                    <Card className="p-4 flex flex-col sm:flex-row sm:justify-between gap-4">
                        <div>
                            <span className="text-slate-500 text-sm">Class:</span>
                            <span className="ml-2 font-medium">10th Standard - Section A</span>
                        </div>
                        <div>
                            <span className="text-slate-500 text-sm">Batch:</span>
                            <span className="ml-2 font-medium">2024-2025</span>
                        </div>
                    </Card>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card className="p-4">
                            <div className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm mb-2">
                                <Target className="h-4 w-4 flex-shrink-0" />
                                <span>Total Score</span>
                            </div>
                            <div className="text-xl sm:text-3xl font-bold text-slate-800">394</div>
                        </Card>
                        <Card className="p-4">
                            <div className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm mb-2">
                                <Trophy className="h-4 w-4 flex-shrink-0" />
                                <span>Total Challenges</span>
                            </div>
                            <div className="text-xl sm:text-3xl font-bold text-slate-800">51</div>
                        </Card>
                        <Card className="p-4">
                            <div className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm mb-2">
                                <FileText className="h-4 w-4 flex-shrink-0" />
                                <span>Total Submissions</span>
                            </div>
                            <div className="text-xl sm:text-3xl font-bold text-slate-800">604</div>
                        </Card>
                        <Card className="p-4">
                            <div className="flex items-center gap-2 text-slate-500 text-xs sm:text-sm mb-2">
                                <Clock className="h-4 w-4 flex-shrink-0" />
                                <span>Time Spent</span>
                            </div>
                            <div className="text-xl sm:text-3xl font-bold text-slate-800">11hr 55min</div>
                        </Card>
                    </div>

                    {/* Leaderboard & Progress */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Leaderboard */}
                        <Card className="p-4 sm:p-6">
                            <h3 className="text-base sm:text-lg font-semibold text-slate-700 mb-4">Class Leaderboard</h3>
                            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
                                <table className="w-full min-w-[350px]">
                                    <thead>
                                        <tr className="text-left text-sm text-slate-500 border-b">
                                            <th className="pb-3 font-medium">Rank</th>
                                            <th className="pb-3 font-medium">Name</th>
                                            <th className="pb-3 font-medium">Batch</th>
                                            <th className="pb-3 font-medium">Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leaderboardData.map((student) => (
                                            <tr key={student.rank} className="border-b last:border-0">
                                                <td className="py-4">
                                                    <div className="flex items-center gap-2">
                                                        {student.rank <= 3 && (
                                                            <span className="text-orange-500">🏆</span>
                                                        )}
                                                        <span className={student.rank <= 3 ? "font-semibold" : ""}>
                                                            {student.rank}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600">
                                                            {student.avatar}
                                                        </div>
                                                        <span className="text-blue-600 hover:underline cursor-pointer">
                                                            {student.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 text-slate-600">{student.batch}</td>
                                                <td className="py-4 font-semibold">{student.score}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>

                        {/* Progress Chart */}
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold text-blue-600 mb-4">Progress</h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={progressData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis
                                            dataKey="month"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 10, fill: '#94a3b8' }}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 10, fill: '#94a3b8' }}
                                            domain={[0, 100]}
                                            tickFormatter={(value) => `${value}%`}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: '8px',
                                                border: 'none',
                                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                            }}
                                            formatter={(value) => [`${value}%`, 'Progress']}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="progress"
                                            stroke="#3b82f6"
                                            strokeWidth={2}
                                            dot={{ r: 4, fill: "#3b82f6" }}
                                            activeDot={{ r: 6 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </div>

                    {/* Subject Proficiency Chart */}
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-orange-500 mb-6">
                            Subject Proficiency - Academic Performance
                        </h3>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={proficiencyData} barGap={8}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="subject"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 11, fill: '#64748b' }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, fill: '#94a3b8' }}
                                        domain={[0, 100]}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: '8px',
                                            border: 'none',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                        }}
                                    />
                                    <Legend
                                        wrapperStyle={{ paddingTop: '20px' }}
                                    />
                                    <Bar
                                        dataKey="batchTop"
                                        name="Batch top score"
                                        fill="#3b82f6"
                                        radius={[4, 4, 0, 0]}
                                        maxBarSize={40}
                                    />
                                    <Bar
                                        dataKey="myScore"
                                        name="Child's score"
                                        fill="#fb923c"
                                        radius={[4, 4, 0, 0]}
                                        maxBarSize={40}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* Additional Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Class Rank</p>
                                    <p className="text-2xl font-bold">7 / 45</p>
                                </div>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                            <p className="text-xs text-slate-400 mt-2">Top 15% of class</p>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                    <FileText className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Assignments Completed</p>
                                    <p className="text-2xl font-bold">48 / 52</p>
                                </div>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                            </div>
                            <p className="text-xs text-slate-400 mt-2">4 pending this term</p>
                        </Card>

                        <Card className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                                    <Trophy className="h-5 w-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Overall Attendance</p>
                                    <p className="text-2xl font-bold">94%</p>
                                </div>
                            </div>
                            <div className="w-full bg-slate-100 rounded-full h-2">
                                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                            </div>
                            <p className="text-xs text-slate-400 mt-2">Excellent attendance record</p>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="academics" className="mt-6">
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Term-wise Grade Distribution</h3>
                        <div className="space-y-4">
                            {[
                                { term: "Term 1", grade: "A", percentage: 89, remarks: "Excellent" },
                                { term: "Term 2", grade: "A-", percentage: 84, remarks: "Good progress" },
                                { term: "Term 3", grade: "B+", percentage: 79, remarks: "Needs more focus on Math" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div>
                                        <p className="font-medium">{item.term}</p>
                                        <p className="text-xs text-slate-500">{item.remarks}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-blue-600">{item.grade}</p>
                                        <p className="text-xs text-slate-400">{item.percentage}%</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="assignments" className="mt-6">
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Recent Assignments</h3>
                        <div className="space-y-3">
                            {[
                                { title: "Organic Chemistry Lab Report", status: "Submitted", date: "Oct 12", score: "18/20" },
                                { title: "Trigonometry Problem Set", status: "Late", date: "Oct 10", score: "15/20" },
                                { title: "World History Essay", status: "Submitted", date: "Oct 08", score: "19/20" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className={`h-2 w-2 rounded-full ${item.status === 'Submitted' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                        <div>
                                            <p className="text-sm font-medium">{item.title}</p>
                                            <p className="text-[10px] text-slate-500">{item.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold">{item.score}</p>
                                        <p className={`text-[10px] ${item.status === 'Submitted' ? 'text-emerald-600' : 'text-rose-600'}`}>{item.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="attendance" className="mt-6">
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Monthly Attendance Breakdown</h3>
                        <div className="space-y-4">
                            {[
                                { month: "October", present: 20, total: 22, percentage: 91 },
                                { month: "September", present: 21, total: 21, percentage: 100 },
                                { month: "August", present: 18, total: 22, percentage: 82 },
                            ].map((item, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span>{item.month}</span>
                                        <span className="font-medium">{item.present}/{item.total} days</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full ${item.percentage >= 90 ? 'bg-emerald-500' : item.percentage >= 80 ? 'bg-blue-500' : 'bg-rose-500'}`} 
                                            style={{ width: `${item.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="assessments" className="mt-6">
                    <Card className="p-8 text-center text-slate-500">
                        <p>Assessments content coming soon...</p>
                    </Card>
                </TabsContent>

                <TabsContent value="activities" className="mt-6">
                    <Card className="p-8 text-center text-slate-500">
                        <p>Activities content coming soon...</p>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
