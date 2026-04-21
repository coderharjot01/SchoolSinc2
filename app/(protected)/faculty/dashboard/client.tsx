"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { 
    Users, 
    BookOpen, 
    CheckSquare, 
    Calendar,
    Clock,
    TrendingUp,
    FileText,
    Bell
} from "lucide-react";

export default function FacultyDashboardClient({ userName }: { userName: string }) {
    // Dummy Data
    const classesToday = [
        { subject: "Physics (Class 10-A)", time: "09:00 AM", room: "Lab 3", type: "Practical" },
        { subject: "Physics (Class 9-B)", time: "11:30 AM", room: "Room 102", type: "Theory" },
        { subject: "Science Club", time: "02:00 PM", room: "Auditorium", type: "Extracurricular" },
    ];

    const [tasks, setTasks] = useState([
        { id: 1, task: "Grade Mid-term Physics Papers", deadline: "Today, 5:00 PM", priority: "High", completed: false },
        { id: 2, task: "Submit Weekly Attendance Report", deadline: "Tomorrow", priority: "Medium", completed: false },
        { id: 3, task: "Update Course Materials for Chap 6", deadline: "Next Week", priority: "Low", completed: false },
    ]);

    const toggleTask = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <PageHeader
                    breadcrumb="Home / Dashboard"
                    title={`Welcome back, ${userName}!`}
                    subtitle="Here is an overview of your classes and tasks for today."
                />
                <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2" onClick={() => alert("✅ Grades finalized and published to the student portal successfully!")}>
                    <CheckSquare className="h-4 w-4" /> Finalize Grades
                </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="hover:shadow-md transition-all">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <Users className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                                <h3 className="text-2xl font-bold tracking-tight">142</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-all">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                                <BookOpen className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Classes Today</p>
                                <h3 className="text-2xl font-bold tracking-tight">{classesToday.length}</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-all">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                                <Clock className="h-6 w-6 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Pending Tasks</p>
                                <h3 className="text-2xl font-bold tracking-tight">{tasks.filter(t => !t.completed).length}</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-all">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                                <TrendingUp className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Avg Attendance</p>
                                <h3 className="text-2xl font-bold tracking-tight">94%</h3>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Areas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Classes Schedule */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div className="space-y-1">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-purple-500" />
                                Today's Schedule
                            </CardTitle>
                            <CardDescription>Your upcoming classes for the day</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {classesToday.map((cls, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-3 border rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    <div className="flex flex-col items-center justify-center bg-purple-50 dark:bg-purple-900/20 text-purple-600 px-3 py-2 rounded-lg min-w-20">
                                        <span className="text-xs font-bold">{cls.time}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-sm">{cls.subject}</h4>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                            <Users className="h-3 w-3" /> {cls.room}
                                        </p>
                                    </div>
                                    <Badge variant={cls.type === "Practical" ? "default" : "secondary"}>
                                        {cls.type}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* To-Do List */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div className="space-y-1">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <CheckSquare className="h-5 w-5 text-amber-500" />
                                Pending Tasks
                            </CardTitle>
                            <CardDescription>Items needing your attention</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {tasks.map((task) => (
                                <div key={task.id} className={`flex items-start gap-4 p-3 border rounded-xl transition-colors ${task.completed ? 'bg-slate-50 dark:bg-slate-800 opacity-60' : 'hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                                    <div className="mt-0.5">
                                        <div 
                                            onClick={() => toggleTask(task.id)}
                                            className={`h-5 w-5 rounded border flex items-center justify-center cursor-pointer transition-all ${
                                                task.completed 
                                                    ? 'bg-emerald-500 border-emerald-500 text-white' 
                                                    : 'border-slate-300 dark:border-slate-600 hover:border-slate-400'
                                            }`}
                                        >
                                            {task.completed && (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className={`font-medium text-sm transition-all ${task.completed ? 'line-through text-muted-foreground' : ''}`}>{task.task}</h4>
                                        <p className={`text-xs flex items-center gap-1 mt-1 font-medium ${task.completed ? 'text-muted-foreground' : 'text-rose-500'}`}>
                                            <Bell className="h-3 w-3" /> {task.deadline}
                                        </p>
                                    </div>
                                    <Badge variant="outline" className={task.completed ? 'opacity-50' : task.priority === "High" ? "border-rose-200 text-rose-600 bg-rose-50" : ""}>
                                        {task.priority}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                        <Button asChild variant="ghost" className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700">
                            <Link href="/faculty/tasks">View All Tasks</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
