"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Flame, AlertTriangle, Snowflake, Check, Save } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

// Mock Data - 40 students for speed grid
const studentsData = [
    { id: "S01", name: "Aarav Sharma", streak: 15, avatar: "AS" },
    { id: "S02", name: "Vihaan Singh", streak: 8, avatar: "VS" },
    { id: "S03", name: "Aditya Gupta", streak: 12, avatar: "AG" },
    { id: "S04", name: "Sai Patel", streak: 3, avatar: "SP" },
    { id: "S05", name: "Reyansh Kumar", streak: 22, avatar: "RK" },
    { id: "S06", name: "Arjun Reddy", streak: 0, avatar: "AR" },
    { id: "S07", name: "Ishaan Verma", streak: 7, avatar: "IV" },
    { id: "S08", name: "Vivaan Malhotra", streak: 18, avatar: "VM" },
    { id: "S09", name: "Dhruv Kapoor", streak: 5, avatar: "DK" },
    { id: "S10", name: "Kabir Joshi", streak: 11, avatar: "KJ" },
    { id: "S11", name: "Priya Singh", streak: 14, avatar: "PS" },
    { id: "S12", name: "Neha Sharma", streak: 9, avatar: "NS" },
    { id: "S13", name: "Anjali Gupta", streak: 20, avatar: "AG" },
    { id: "S14", name: "Riya Patel", streak: 6, avatar: "RP" },
    { id: "S15", name: "Kavya Kumar", streak: 0, avatar: "KK" },
    { id: "S16", name: "Mehak Reddy", streak: 13, avatar: "MR" },
    { id: "S17", name: "Tanya Verma", streak: 4, avatar: "TV" },
    { id: "S18", name: "Pooja Malhotra", streak: 17, avatar: "PM" },
    { id: "S19", name: "Simran Kapoor", streak: 2, avatar: "SK" },
    { id: "S20", name: "Divya Joshi", streak: 10, avatar: "DJ" },
    { id: "S21", name: "Rohan Sharma", streak: 25, avatar: "RS" },
    { id: "S22", name: "Amit Patel", streak: 1, avatar: "AP" },
    { id: "S23", name: "Nikhil Gupta", streak: 8, avatar: "NG" },
    { id: "S24", name: "Sahil Kumar", streak: 16, avatar: "SK" },
    { id: "S25", name: "Aman Reddy", streak: 0, avatar: "AR" },
    { id: "S26", name: "Raj Verma", streak: 19, avatar: "RV" },
    { id: "S27", name: "Vikram Malhotra", streak: 7, avatar: "VM" },
    { id: "S28", name: "Karan Kapoor", streak: 12, avatar: "KK" },
    { id: "S29", name: "Ankit Joshi", streak: 3, avatar: "AJ" },
    { id: "S30", name: "Mohit Singh", streak: 21, avatar: "MS" },
    { id: "S31", name: "Rahul Kumar", streak: 12, avatar: "RK" },
    { id: "S32", name: "Deepak Patel", streak: 5, avatar: "DP" },
    { id: "S33", name: "Suresh Gupta", streak: 0, avatar: "SG" },
    { id: "S34", name: "Vikas Sharma", streak: 14, avatar: "VS" },
    { id: "S35", name: "Neeraj Singh", streak: 9, avatar: "NS" },
    { id: "S36", name: "Gaurav Kumar", streak: 11, avatar: "GK" },
    { id: "S37", name: "Ajay Reddy", streak: 6, avatar: "AR" },
    { id: "S38", name: "Sanjay Verma", streak: 18, avatar: "SV" },
    { id: "S39", name: "Manish Malhotra", streak: 2, avatar: "MM" },
    { id: "S40", name: "Rajesh Kapoor", streak: 15, avatar: "RK" },
];

type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

interface StreakWarningDialogProps {
    isOpen: boolean;
    onClose: () => void;
    studentName: string;
    streak: number;
    onMarkAbsent: () => void;
    onMarkExcused: () => void;
}

function StreakWarningDialog({ isOpen, onClose, studentName, streak, onMarkAbsent, onMarkExcused }: StreakWarningDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-amber-600">
                        <AlertTriangle className="h-5 w-5" />
                        Streak Warning!
                    </DialogTitle>
                    <DialogDescription className="py-4">
                        <div className="flex items-center gap-3 mb-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                            <Flame className="h-8 w-8 text-orange-500" />
                            <div>
                                <p className="font-semibold text-slate-900">{studentName}</p>
                                <p className="text-sm text-amber-700">
                                    This will break their <span className="font-bold">{streak}-day streak!</span>
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-600">
                            Mark as &quot;Excused&quot; to freeze their streak and protect the game economy.
                        </p>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex-col sm:flex-row gap-2">
                    <Button
                        variant="outline"
                        className="text-rose-600 border-rose-200 hover:bg-rose-50"
                        onClick={onMarkAbsent}
                    >
                        Mark Absent Anyway
                    </Button>
                    <Button
                        className="bg-blue-500 hover:bg-blue-600 gap-2"
                        onClick={onMarkExcused}
                    >
                        <Snowflake className="h-4 w-4" />
                        Mark as Excused
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export function SpeedGridAttendance() {
    const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({});

    const [showStreaks, setShowStreaks] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    // Streak warning dialog state
    const [streakWarning, setStreakWarning] = useState<{
        isOpen: boolean;
        studentId: string;
        studentName: string;
        streak: number;
    }>({
        isOpen: false,
        studentId: '',
        studentName: '',
        streak: 0,
    });

    const cycleStatus = (studentId: string) => {
        const student = studentsData.find(s => s.id === studentId);
        const currentStatus = attendance[studentId];

        // Cycle: unmarked -> present -> absent -> late -> present
        if (!currentStatus) {
            setAttendance(prev => ({ ...prev, [studentId]: 'present' }));
        } else if (currentStatus === 'present') {
            // Check if student has a streak worth protecting
            if (student && student.streak >= 5) {
                setStreakWarning({
                    isOpen: true,
                    studentId: studentId,
                    studentName: student.name,
                    streak: student.streak,
                });
                return;
            }
            setAttendance(prev => ({ ...prev, [studentId]: 'absent' }));
        } else if (currentStatus === 'absent') {
            setAttendance(prev => ({ ...prev, [studentId]: 'late' }));
        } else if (currentStatus === 'late') {
            setAttendance(prev => ({ ...prev, [studentId]: 'present' }));
        } else if (currentStatus === 'excused') {
            setAttendance(prev => ({ ...prev, [studentId]: 'present' }));
        }
        setIsSaved(false);
    };

    const handleMarkAbsent = () => {
        setAttendance(prev => ({ ...prev, [streakWarning.studentId]: 'absent' }));
        setStreakWarning({ isOpen: false, studentId: '', studentName: '', streak: 0 });
        setIsSaved(false);
    };

    const handleMarkExcused = () => {
        setAttendance(prev => ({ ...prev, [streakWarning.studentId]: 'excused' }));
        setStreakWarning({ isOpen: false, studentId: '', studentName: '', streak: 0 });
        setIsSaved(false);
    };

    const getStatusColor = (status: AttendanceStatus) => {
        switch (status) {
            case 'present':
                return 'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600';
            case 'absent':
                return 'bg-rose-500 hover:bg-rose-600 text-white border-rose-600';
            case 'late':
                return 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600';
            case 'excused':
                return 'bg-blue-500 hover:bg-blue-600 text-white border-blue-600';
            default:
                return 'bg-slate-200 hover:bg-slate-300 text-slate-700 border-slate-300';
        }
    };

    const getStatusIcon = (status: AttendanceStatus) => {
        switch (status) {
            case 'present':
                return <Check className="h-4 w-4" />;
            case 'absent':
                return <span className="text-xs font-bold">A</span>;
            case 'late':
                return <span className="text-xs font-bold">L</span>;
            case 'excused':
                return <Snowflake className="h-4 w-4" />;
            default:
                return null;
        }
    };

    const handleSaveAttendance = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSaving(false);
        setIsSaved(true);
    };

    const stats = {
        present: Object.values(attendance).filter(s => s === 'present').length,
        absent: Object.values(attendance).filter(s => s === 'absent').length,
        late: Object.values(attendance).filter(s => s === 'late').length,
        excused: Object.values(attendance).filter(s => s === 'excused').length,
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl">
            {/* Header */}
            <div className="p-4 border-b flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-slate-50 dark:bg-slate-800/50">
                <div>
                    <h3 className="font-semibold text-base sm:text-lg">Speed Grid Attendance</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Tap avatars to cycle: Present → Absent → Late</p>
                </div>
                <div className="flex items-center gap-4">
                    {/* Fix 5: Show Streaks Toggle */}
                    <div className="flex items-center gap-2">
                        <Switch
                            id="show-streaks"
                            checked={showStreaks}
                            onCheckedChange={setShowStreaks}
                        />
                        <label htmlFor="show-streaks" className="text-sm font-medium flex items-center gap-1">
                            <Flame className="h-4 w-4 text-orange-500" />
                            Show Streaks
                        </label>
                    </div>
                </div>
            </div>

            {/* Stats Bar */}
            <div className="p-4 border-b flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-emerald-500" />
                    <span>Present: <strong>{stats.present}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-500" />
                    <span>Absent: <strong>{stats.absent}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-amber-500" />
                    <span>Late: <strong>{stats.late}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-blue-500" />
                    <span>Excused: <strong>{stats.excused}</strong></span>
                </div>
            </div>

            {/* Speed Grid */}
            <div className="p-4">
                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-3">
                    {studentsData.map((student) => {
                        const status = attendance[student.id];
                        const hasStreak = student.streak >= 5;

                        return (
                            <div
                                key={student.id}
                                className="flex flex-col items-center group"
                            >
                                {/* Avatar Button */}
                                <button
                                    onClick={() => cycleStatus(student.id)}
                                    className={cn(
                                        "relative h-12 w-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all transform hover:scale-110 active:scale-95 border-2 cursor-pointer",
                                        getStatusColor(status)
                                    )}
                                    title={`${student.name} - ${status}`}
                                >
                                    {getStatusIcon(status)}

                                    {/* Streak Fire Icon */}
                                    {showStreaks && hasStreak && (
                                        <div className="absolute -top-1 -right-1 bg-orange-100 rounded-full p-0.5 border border-orange-300">
                                            <Flame className="h-3 w-3 text-orange-500" />
                                        </div>
                                    )}

                                    {/* Excused Freeze Icon */}
                                    {status === 'excused' && (
                                        <div className="absolute -top-1 -right-1 bg-blue-100 rounded-full p-0.5 border border-blue-300">
                                            <Snowflake className="h-3 w-3 text-blue-500" />
                                        </div>
                                    )}
                                </button>

                                {/* Student Name */}
                                <p className="text-[10px] text-center mt-1 text-slate-600 dark:text-slate-400 truncate w-full max-w-[52px]">
                                    {student.name.split(' ')[0]}
                                </p>

                                {/* Streak Count */}
                                {showStreaks && hasStreak && (
                                    <Badge variant="outline" className="text-[8px] px-1 py-0 h-4 text-orange-600 border-orange-200 mt-0.5">
                                        🔥{student.streak}
                                    </Badge>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Save Button */}
            <div className="p-4 border-t bg-slate-50 dark:bg-slate-800/50">
                <Button
                    className={cn(
                        "w-full gap-2 h-12 text-base font-semibold transition-all",
                        isSaved
                            ? "bg-emerald-500 hover:bg-emerald-600"
                            : "bg-blue-600 hover:bg-blue-700"
                    )}
                    onClick={handleSaveAttendance}
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <>
                            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Saving...
                        </>
                    ) : isSaved ? (
                        <>
                            <Check className="h-5 w-5" />
                            Attendance Saved!
                        </>
                    ) : (
                        <>
                            <Save className="h-5 w-5" />
                            Save Attendance
                        </>
                    )}
                </Button>
            </div>

            {/* Streak Warning Dialog */}
            <StreakWarningDialog
                isOpen={streakWarning.isOpen}
                onClose={() => setStreakWarning({ isOpen: false, studentId: '', studentName: '', streak: 0 })}
                studentName={streakWarning.studentName}
                streak={streakWarning.streak}
                onMarkAbsent={handleMarkAbsent}
                onMarkExcused={handleMarkExcused}
            />
        </div>
    );
}
