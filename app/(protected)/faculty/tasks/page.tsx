"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Bell, CheckSquare, Plus, Filter, Search, CalendarDays } from "lucide-react";
import { Input } from "@/components/ui/input";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function FacultyTasksPage() {
    const [tasks, setTasks] = useState([
        { id: 1, task: "Grade Mid-term Physics Papers", deadline: "Today, 5:00 PM", priority: "High", completed: false, category: "Grading" },
        { id: 2, task: "Submit Weekly Attendance Report", deadline: "Tomorrow", priority: "Medium", completed: false, category: "Admin" },
        { id: 3, task: "Update Course Materials for Chap 6", deadline: "Next Week", priority: "Low", completed: false, category: "Prep" },
        { id: 4, task: "Prepare Lab Equipment", deadline: "Thursday", priority: "Medium", completed: false, category: "Prep" },
        { id: 5, task: "Parent-Teacher Meeting Preparation", deadline: "Friday", priority: "High", completed: false, category: "Admin" },
        { id: 6, task: "Review Science Fair Projects", deadline: "Dec 20", priority: "Low", completed: false, category: "Grading" },
        { id: 7, task: "Upload Assignment 4 Marks", deadline: "Today, 8:00 PM", priority: "High", completed: false, category: "Grading" }
    ]);

    const toggleTask = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDeadline, setNewTaskDeadline] = useState("");
    const [newTaskPriority, setNewTaskPriority] = useState("Medium");
    const [newTaskCategory, setNewTaskCategory] = useState("Admin");

    const [searchQuery, setSearchQuery] = useState("");
    const [filterPriority, setFilterPriority] = useState("All");
    const [sortOrder, setSortOrder] = useState("none");

    const handleAddTask = () => {
        if (!newTaskTitle.trim()) return;
        const newTask = {
            id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
            task: newTaskTitle,
            deadline: newTaskDeadline || "No deadline specified",
            priority: newTaskPriority,
            completed: false,
            category: newTaskCategory
        };
        setTasks([newTask, ...tasks]);
        setNewTaskTitle("");
        setNewTaskDeadline("");
        setNewTaskPriority("Medium");
        setNewTaskCategory("Admin");
        setIsDialogOpen(false);
    };

    // Apply search, filters, and sorts
    let filteredTasks = [...tasks];

    if (searchQuery.trim()) {
        filteredTasks = filteredTasks.filter(t => t.task.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (filterPriority !== "All") {
        filteredTasks = filteredTasks.filter(t => t.priority === filterPriority);
    }

    if (sortOrder !== "none") {
        const getDateScore = (dateStr: string) => {
            const lower = dateStr.toLowerCase();
            if (lower.includes("today")) return 0;
            if (lower.includes("tomorrow")) return 1;
            if (lower.includes("thursday")) return 2;
            if (lower.includes("friday")) return 3;
            if (lower.includes("next week")) return 4;
            if (lower.includes("dec")) return 5;
            return 10;
        };

        filteredTasks.sort((a, b) => {
            const scoreA = getDateScore(a.deadline);
            const scoreB = getDateScore(b.deadline);
            return sortOrder === "asc" ? scoreA - scoreB : scoreB - scoreA;
        });
    }

    // Filter to only show pending vs completed
    const pendingTasks = filteredTasks.filter(t => !t.completed);
    const completedTasks = filteredTasks.filter(t => t.completed);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <PageHeader
                    breadcrumb="Home / Tasks"
                    title="Task Manager"
                    subtitle={`You have ${pendingTasks.length} pending tasks remaining to be completed.`}
                />
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
                            <Plus className="h-4 w-4" /> New Task
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Task</DialogTitle>
                            <DialogDescription>
                                Create a new pending task. Specify importance, deadline, and details here.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">Task Description</label>
                                <Input 
                                    placeholder="E.g. Prepare report..." 
                                    value={newTaskTitle}
                                    onChange={(e) => setNewTaskTitle(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">Deadline / Time</label>
                                <Input 
                                    placeholder="E.g. Tomorrow, 5:00 PM" 
                                    value={newTaskDeadline}
                                    onChange={(e) => setNewTaskDeadline(e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium">Importance</label>
                                    <Select value={newTaskPriority} onValueChange={setNewTaskPriority}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="High">High</SelectItem>
                                            <SelectItem value="Medium">Medium</SelectItem>
                                            <SelectItem value="Low">Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-medium">Category</label>
                                    <Select value={newTaskCategory} onValueChange={setNewTaskCategory}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Grading">Grading</SelectItem>
                                            <SelectItem value="Prep">Prep</SelectItem>
                                            <SelectItem value="Admin">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleAddTask}>Add Task</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader className="pb-3 border-b border-border/50">
                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input 
                                placeholder="Search tasks..." 
                                className="pl-9 bg-slate-50 dark:bg-slate-900" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Select value={filterPriority} onValueChange={setFilterPriority}>
                                <SelectTrigger className="w-[130px] h-9">
                                    <div className="flex items-center gap-2"><Filter className="h-4 w-4" /> Filter</div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All Priorities</SelectItem>
                                    <SelectItem value="High">High Priority</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="Low">Low Priority</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={sortOrder} onValueChange={setSortOrder}>
                                <SelectTrigger className="w-[145px] h-9">
                                    <div className="flex items-center gap-2 truncate"><CalendarDays className="h-4 w-4 flex-shrink-0" /> {sortOrder === 'none' ? 'Sort Date' : sortOrder === 'asc' ? 'Earliest' : 'Latest'}</div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">Default</SelectItem>
                                    <SelectItem value="asc">Earliest First</SelectItem>
                                    <SelectItem value="desc">Latest First</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-8">
                        {/* Pending Tasks Section */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold flex items-center gap-2 text-slate-800 dark:text-slate-200">
                                <CheckSquare className="h-4 w-4 text-amber-500" /> 
                                Tasks Left To Do ({pendingTasks.length})
                            </h3>
                            {pendingTasks.length === 0 ? (
                                <div className="p-8 text-center border-2 border-dashed rounded-xl bg-slate-50 dark:bg-slate-900/50">
                                    <p className="text-muted-foreground">All caught up! Excellent work.</p>
                                </div>
                            ) : (
                                <div className="grid gap-3">
                                    {pendingTasks.map((task) => (
                                        <div key={task.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors bg-white dark:bg-slate-950 shadow-sm">
                                            <div className="flex items-start gap-4 flex-1">
                                                <div className="mt-0.5">
                                                    <div 
                                                        onClick={() => toggleTask(task.id)}
                                                        className="h-6 w-6 rounded border border-slate-300 dark:border-slate-600 hover:border-slate-400 flex items-center justify-center cursor-pointer transition-all bg-white dark:bg-slate-900"
                                                    >
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-[15px]">{task.task}</h4>
                                                    <div className="flex flex-wrap items-center gap-3 mt-1.5">
                                                        <p className="text-xs text-rose-500 flex items-center gap-1 font-medium bg-rose-50 dark:bg-rose-950/30 px-2 py-0.5 rounded-full">
                                                            <Bell className="h-3 w-3" /> {task.deadline}
                                                        </p>
                                                        <Badge variant="secondary" className="text-[10px] bg-slate-100 dark:bg-slate-800 pointer-events-none text-slate-600 dark:text-slate-300">
                                                            {task.category}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0">
                                                <Badge variant="outline" className={task.priority === "High" ? "border-rose-200 text-rose-600 bg-rose-50" : task.priority === "Medium" ? "border-amber-200 text-amber-600 bg-amber-50" : "border-slate-200 text-slate-600 bg-slate-50"}>
                                                    {task.priority} Priority
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Completed Tasks Section */}
                        {completedTasks.length > 0 && (
                            <div className="space-y-4 pt-4 border-t border-border/50">
                                <h3 className="text-sm font-semibold flex items-center gap-2 text-slate-500">
                                    <CheckSquare className="h-4 w-4 text-emerald-500" /> 
                                    Completed ({completedTasks.length})
                                </h3>
                                <div className="grid gap-3 opacity-60">
                                    {completedTasks.map((task) => (
                                        <div key={task.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-xl bg-slate-50 dark:bg-slate-900/50">
                                            <div className="flex items-start gap-4 flex-1">
                                                <div className="mt-0.5">
                                                    <div 
                                                        onClick={() => toggleTask(task.id)}
                                                        className="h-6 w-6 rounded border bg-emerald-500 border-emerald-500 text-white flex items-center justify-center cursor-pointer transition-all"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                                                            <polyline points="20 6 9 17 4 12"></polyline>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-[15px] line-through text-slate-500">{task.task}</h4>
                                                    <p className="text-xs text-slate-400 mt-1">Completed</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
