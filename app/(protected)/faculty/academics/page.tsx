"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    CheckCircle2,
    Star,
    Plus,
    FileText,
    Sparkles,
    UploadCloud,
    AlertTriangle,
    FileSpreadsheet,
} from "lucide-react";
import { AssignmentManager } from "@/components/faculty/academics/assignment-manager";
import { MarksEntry } from "@/components/faculty/academics/marks-entry";
import { QuizControlPanel } from "@/components/faculty/academics/quiz-control-panel";

// Mock data for grading
const pendingGrading: { id: number; name: string; class: string; assignment: string; submitted: string; score: number | null; bonusXP: number }[] = [
    { id: 1, name: 'Rahul Kumar', class: '10-A', assignment: 'Math Quiz 3', submitted: 'Dec 15', score: null, bonusXP: 0 },
    { id: 2, name: 'Priya Singh', class: '10-A', assignment: 'Math Quiz 3', submitted: 'Dec 15', score: null, bonusXP: 0 },
    { id: 3, name: 'Amit Patel', class: '10-A', assignment: 'Math Quiz 3', submitted: 'Dec 14', score: null, bonusXP: 0 },
    { id: 4, name: 'Neha Sharma', class: '10-A', assignment: 'Math Quiz 3', submitted: 'Dec 15', score: null, bonusXP: 0 },
    { id: 5, name: 'Vikram Singh', class: '10-A', assignment: 'Math Quiz 3', submitted: 'Dec 13', score: null, bonusXP: 0 },
];

const bonusReasons = [
    { value: 'neat', label: '✨ Neat Handwriting', xp: 10 },
    { value: 'creative', label: '💡 Creative Answer', xp: 15 },
    { value: 'extra', label: '🌟 Extra Effort', xp: 10 },
    { value: 'fast', label: '⚡ Quick Submission', xp: 5 },
    { value: 'improvement', label: '📈 Big Improvement', xp: 20 },
];

export default function FacultyAcademicsPage() {
    // Grading State
    const [gradingItems, setGradingItems] = useState(pendingGrading);

    // Flaw 2 Fix: Bulk selection state for grading
    const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
    const [, setBulkBonusReason] = useState<string>('');

    const handleScoreChange = (id: number, score: string) => {
        setGradingItems(prev => prev.map(item =>
            item.id === id ? { ...item, score: parseInt(score) || null } : item
        ));
    };

    // Toggle single student selection
    const toggleStudentSelection = (id: number) => {
        setSelectedStudents(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    // Select/Deselect all students
    const toggleSelectAll = () => {
        if (selectedStudents.length === gradingItems.length) {
            setSelectedStudents([]);
        } else {
            setSelectedStudents(gradingItems.map(item => item.id));
        }
    };

    // Bulk award XP to selected students
    const handleBulkAwardXP = (xp: number, reason: string) => {
        if (selectedStudents.length === 0) {
            alert('Please select at least one student first.');
            return;
        }

        setGradingItems(prev => prev.map(item =>
            selectedStudents.includes(item.id)
                ? { ...item, bonusXP: (item.bonusXP || 0) + xp }
                : item
        ));

        alert(`🎉 Bulk Bonus awarded!\n${selectedStudents.length} students received +${xp} XP for "${reason}"`);
        setSelectedStudents([]);
        setBulkBonusReason('');
    };

    const handleBonusXP = (id: number, xp: number, reason: string) => {
        setGradingItems(prev => prev.map(item =>
            item.id === id ? { ...item, bonusXP: (item.bonusXP || 0) + xp } : item
        ));
        const student = gradingItems.find(g => g.id === id);
        if (student) {
            alert(`Teacher Bonus awarded! ${student.name} received +${xp} XP for "${reason}"`);
        }
    };

    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Academics"
                title="Academics & Quizzes"
                subtitle="Create gamified assignments and grade with XP bonuses"
            />

            <Tabs defaultValue="create-quiz" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
                    <TabsTrigger value="create-quiz" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Create Quiz
                    </TabsTrigger>
                    <TabsTrigger value="grade" className="gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Grade Now
                    </TabsTrigger>
                    <TabsTrigger value="assignments" className="gap-2">
                        <FileText className="h-4 w-4" />
                        Assignments
                    </TabsTrigger>
                </TabsList>

                {/* Quiz Creator Tab - Control Panel Design */}
                <TabsContent value="create-quiz">
                    <QuizControlPanel />
                </TabsContent>

                {/* Flaw 2 Fixed: Grade Now Tab with Bulk Selection for XP */}
                <TabsContent value="grade" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <CardTitle className="text-base flex items-center gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                        Grade Submissions
                                    </CardTitle>
                                    <CardDescription>Grade and award bonus XP for exceptional work</CardDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge className="bg-amber-500">{gradingItems.length} Pending</Badge>
                                    {selectedStudents.length > 0 && (
                                        <Badge className="bg-blue-500">{selectedStudents.length} Selected</Badge>
                                    )}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {/* Bulk Action Bar - Shows when students are selected */}
                            {selectedStudents.length > 0 && (
                                <div className="mb-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="h-5 w-5 text-amber-500" />
                                        <span className="font-semibold text-sm">{selectedStudents.length} students selected</span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Select onValueChange={(v) => {
                                            const bonus = bonusReasons.find(b => b.value === v);
                                            if (bonus) handleBulkAwardXP(bonus.xp, bonus.label);
                                        }}>
                                            <SelectTrigger className="w-[180px] h-9 text-sm bg-white">
                                                <SelectValue placeholder="⭐ Bulk Award XP" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {bonusReasons.map(reason => (
                                                    <SelectItem key={reason.value} value={reason.value}>
                                                        {reason.label} (+{reason.xp})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setSelectedStudents([])}
                                            className="text-slate-500"
                                        >
                                            Clear Selection
                                        </Button>
                                    </div>
                                </div>
                            )}

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b text-left">
                                            {/* Select All Checkbox */}
                                            <th className="py-3 px-2 text-xs font-medium text-muted-foreground">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedStudents.length === gradingItems.length && gradingItems.length > 0}
                                                    onChange={toggleSelectAll}
                                                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                />
                                            </th>
                                            <th className="py-3 px-2 text-xs font-medium text-muted-foreground">Student</th>
                                            <th className="py-3 px-2 text-xs font-medium text-muted-foreground">Assignment</th>
                                            <th className="py-3 px-2 text-xs font-medium text-muted-foreground">Submitted</th>
                                            <th className="py-3 px-2 text-xs font-medium text-muted-foreground">Score</th>
                                            <th className="py-3 px-2 text-xs font-medium text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Star className="h-3 w-3 text-amber-500" />
                                                    Award Bonus
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {gradingItems.map((item) => (
                                            <tr key={item.id} className={`border-b hover:bg-slate-50 ${selectedStudents.includes(item.id) ? 'bg-blue-50' : ''}`}>
                                                {/* Checkbox */}
                                                <td className="py-3 px-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedStudents.includes(item.id)}
                                                        onChange={() => toggleStudentSelection(item.id)}
                                                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                    />
                                                </td>
                                                <td className="py-3 px-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-medium">
                                                            {item.name.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium">{item.name}</p>
                                                            <p className="text-[10px] text-muted-foreground">{item.class}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-2 text-sm">{item.assignment}</td>
                                                <td className="py-3 px-2 text-xs text-muted-foreground">{item.submitted}</td>
                                                <td className="py-3 px-2">
                                                    <Input
                                                        type="number"
                                                        placeholder="Score"
                                                        className="w-20 h-8 text-sm"
                                                        min={0}
                                                        max={100}
                                                        value={item.score || ''}
                                                        onChange={(e) => handleScoreChange(item.id, e.target.value)}
                                                    />
                                                </td>
                                                <td className="py-3 px-2">
                                                    <div className="flex items-center gap-2">
                                                        <Select onValueChange={(v) => {
                                                            const bonus = bonusReasons.find(b => b.value === v);
                                                            if (bonus) handleBonusXP(item.id, bonus.xp, bonus.label);
                                                        }}>
                                                            <SelectTrigger className="w-[160px] h-8 text-xs">
                                                                <SelectValue placeholder="+ Bonus XP" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {bonusReasons.map(reason => (
                                                                    <SelectItem key={reason.value} value={reason.value}>
                                                                        {reason.label} (+{reason.xp})
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                        {item.bonusXP > 0 && (
                                                            <Badge className="bg-amber-500 text-xs">
                                                                +{item.bonusXP} XP
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 flex justify-end">
                                <Button className="bg-emerald-500 hover:bg-emerald-600 gap-2" onClick={() => alert("✅ All grades have been successfully uploaded and saved to the database!")}>
                                    <CheckCircle2 className="h-4 w-4" />
                                    Save All Grades
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Assignments Tab */}
                <TabsContent value="assignments" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1">
                            <AssignmentManager />
                        </div>

                        <div className="lg:col-span-1">
                            <MarksEntry />
                        </div>

                        <div className="lg:col-span-1">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base sm:text-lg">Upload Assignment Grades</CardTitle>
                                    <CardDescription className="text-sm">Upload grades via Excel or PDF file</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="border-2 border-dashed rounded-lg p-6 sm:p-10 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer hover:bg-slate-50 transition-colors">
                                        <UploadCloud className="h-8 w-8 sm:h-10 sm:w-10 text-slate-300" />
                                        <p className="text-sm font-medium">Upload Grade File</p>
                                        <p className="text-xs text-muted-foreground">Drag and drop files here or click to browse</p>
                                        <Button variant="secondary" size="sm" className="mt-2" onClick={() => alert("📂 Opening file picker to select custom grade spreadsheet...")}>Choose Files</Button>
                                    </div>

                                    <div className="bg-rose-50 border border-rose-100 rounded-lg p-4 space-y-2">
                                        <div className="flex items-center gap-2 text-rose-600 font-semibold text-sm">
                                            <AlertTriangle className="h-4 w-4" /> Template Format
                                        </div>
                                        <p className="text-xs text-rose-600/80">Download the template to ensure proper formatting</p>
                                        <Button variant="link" className="text-xs text-rose-600 h-auto p-0 underline" onClick={() => alert("⬇️ Downloading Excel Grading Template...")}>Download Template</Button>
                                    </div>

                                    <Button className="w-full bg-[#0f172a]" onClick={() => alert("⚙️ Processing spreadsheet and applying bulk grades updates...")}>
                                        <FileSpreadsheet className="h-4 w-4 mr-2" /> Update Grades
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
