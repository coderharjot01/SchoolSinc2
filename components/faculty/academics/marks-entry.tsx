"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Save, CheckCircle2 } from "lucide-react";

// Mock student data by class
const studentsByClass: Record<string, Array<{ name: string; mark: string }>> = {
    "10a": [
        { name: "Sita Janaki", mark: "85" },
        { name: "Anil Sarkar", mark: "89" },
        { name: "Bibek Jha", mark: "" },
        { name: "Priya Singh", mark: "90" },
        { name: "Rahul Kumar", mark: "78" },
    ],
    "10b": [
        { name: "Amit Patel", mark: "88" },
        { name: "Neha Sharma", mark: "76" },
        { name: "Vikram Rao", mark: "82" },
        { name: "Kavya Nair", mark: "" },
    ],
    "9a": [
        { name: "Rohan Das", mark: "79" },
        { name: "Anjali Mehta", mark: "91" },
        { name: "Suresh Kumar", mark: "68" },
    ],
    "9b": [
        { name: "Meera Reddy", mark: "84" },
        { name: "Karthik Iyer", mark: "77" },
        { name: "Deepa Gupta", mark: "" },
        { name: "Arjun Verma", mark: "86" },
    ],
};

const classes = [
    { value: "10a", label: "Grade 10 A" },
    { value: "10b", label: "Grade 10 B" },
    { value: "9a", label: "Grade 9 A" },
    { value: "9b", label: "Grade 9 B" },
];

const subjects = [
    { value: "math", label: "Mathematics" },
    { value: "science", label: "Science" },
    { value: "english", label: "English" },
    { value: "social", label: "Social Studies" },
    { value: "nepali", label: "Nepali" },
];

const examTypes = [
    { value: "mid", label: "Mid-term Exam" },
    { value: "final", label: "Final Exam" },
    { value: "unit1", label: "Unit Test 1" },
    { value: "unit2", label: "Unit Test 2" },
    { value: "practical", label: "Practical Exam" },
];

export function MarksEntry() {
    const [selectedClass, setSelectedClass] = useState("10a");
    const [selectedSubject, setSelectedSubject] = useState("math");
    const [selectedExam, setSelectedExam] = useState("mid");
    const [isSaved, setIsSaved] = useState(false);

    const students = studentsByClass[selectedClass] || [];

    const handleSave = () => {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Update Exam Marks</CardTitle>
                <CardDescription>Submit marks for individual students per subject</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium">Class</label>
                        <Select value={selectedClass} onValueChange={setSelectedClass}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {classes.map((cls) => (
                                    <SelectItem key={cls.value} value={cls.value}>{cls.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium">Course</label>
                        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {subjects.map((sub) => (
                                    <SelectItem key={sub.value} value={sub.value}>{sub.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-medium">Exam Type</label>
                    <Select value={selectedExam} onValueChange={setSelectedExam}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {examTypes.map((exam) => (
                                <SelectItem key={exam.value} value={exam.value}>{exam.label}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm font-medium text-slate-500">
                        <span>Student Marks</span>
                        <span>Total: {students.length} students</span>
                    </div>

                    {students.map((student, i) => (
                        <div key={i} className="flex items-center justify-between gap-4 p-2 hover:bg-slate-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} />
                                    <AvatarFallback>{student.name[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">{student.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Input className="w-16 h-8 text-right" defaultValue={student.mark} placeholder="0" />
                                <span className="text-xs text-muted-foreground w-6">/100</span>
                            </div>
                        </div>
                    ))}
                </div>

                <Button className="w-full bg-[#0f172a]" onClick={handleSave}>
                    {isSaved ? (
                        <>
                            <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-400" />
                            Saved!
                        </>
                    ) : (
                        <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Marks
                        </>
                    )}
                </Button>
            </CardContent>
        </Card>
    );
}
