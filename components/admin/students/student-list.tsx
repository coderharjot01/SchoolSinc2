"use client";

import { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
    Search,
    Phone,
    Mail,
    ChevronRight,
    Plus,
    Filter,
    Users,
    GraduationCap,
    UserCheck,
    UserX,
    Download,
    MoreVertical,
    Loader2,
} from "lucide-react";
import { createStudentUser, createParentUser, bulkCreateStudents } from "@/actions/admin-create-user";
import { Badge } from "@/components/ui/badge";
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

interface Student {
    id: string;
    name: string;
    email: string;
    class: string;
    section: string;
    gender: string;
    parentName: string;
    phone: string;
    joined: string;
    status: "Active" | "Inactive";
}

const initialStudents: Student[] = [
    { id: "AD9892434", name: "Sita Janaki", email: "sita.janaki@school.com", class: "10", section: "A", gender: "Female", parentName: "Mr. Janaka", phone: "+91 98765 43210", joined: "10 Jan 2015", status: "Active" },
    { id: "AD9892435", name: "Ram Dashrath", email: "ram.dashrath@school.com", class: "10", section: "A", gender: "Male", parentName: "Mr. Dashrath", phone: "+91 98765 43211", joined: "12 Jan 2015", status: "Active" },
    { id: "AD9892436", name: "Lakshman Dashrath", email: "lakshman.d@school.com", class: "10", section: "A", gender: "Male", parentName: "Mr. Dashrath", phone: "+91 98765 43211", joined: "12 Jan 2015", status: "Active" },
    { id: "AD9892437", name: "Hanuman Pawan", email: "hanuman.p@school.com", class: "10", section: "A", gender: "Male", parentName: "Mr. Pawan", phone: "+91 98765 43212", joined: "15 Jan 2015", status: "Active" },
    { id: "AD9892438", name: "Radha Brij", email: "radha.brij@school.com", class: "9", section: "B", gender: "Female", parentName: "Mr. Brij", phone: "+91 98765 43213", joined: "20 Feb 2016", status: "Inactive" },
    { id: "AD9892439", name: "Krishna Vasudev", email: "krishna.v@school.com", class: "9", section: "A", gender: "Male", parentName: "Mr. Vasudev", phone: "+91 98765 43214", joined: "25 Mar 2016", status: "Active" },
];

export function StudentList() {
    const [students, setStudents] = useState<Student[]>(initialStudents);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [classFilter, setClassFilter] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [newStudent, setNewStudent] = useState({
        name: "",
        email: "",
        class: "",
        section: "",
        gender: "",
        parentName: "",
        phone: "",
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setError(null);
        setSuccess(null);

        try {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const data = new Uint8Array(e.target?.result as ArrayBuffer);
                    const workbook = XLSX.read(data, { type: "array" });
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json<any>(sheet);

                    // Map Excel columns to our expected format
                    const students = jsonData.map(row => ({
                        name: row.Name || row.name || row["Student Name"],
                        email: row.Email || row.email || row["Email Address"],
                        password: row.Password || row.password || row["Account Password"],
                        parentName: row.ParentName || row.parentName || row["Parent Name"]
                    })).filter(s => s.name && s.email);

                    if (students.length === 0) {
                        setError("No valid students found in Excel. Ensure you have 'Name' and 'Email' columns.");
                        setIsUploading(false);
                        return;
                    }

                    const result = await bulkCreateStudents(students);
                    if (result.success) {
                        setSuccess(result.success);
                        
                        // Dynamically update the UI with the ACTUAL successfully inserted students
                        if (result.newStudents && result.newStudents.length > 0) {
                            const newStudentsForUI: Student[] = result.newStudents.map((s: any, index: number) => ({
                                id: `NEW${Math.floor(Math.random() * 100000) + index}`,
                                name: s.name,
                                email: s.email,
                                class: "N/A",
                                section: "-",
                                gender: "N/A",
                                parentName: s.parentName || "N/A",
                                phone: "N/A",
                                joined: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                                status: "Active"
                            }));
                            setStudents(prev => [...newStudentsForUI, ...prev]);
                        }
                    } else {
                        setError(result.error || "Upload failed");
                    }
                } catch (err) {
                    setError("Failed to parse Excel file.");
                } finally {
                    setIsUploading(false);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                }
            };
            reader.readAsArrayBuffer(file);
        } catch (err) {
            setError("Error reading file.");
            setIsUploading(false);
        }
    };

    const handleAddStudent = async () => {
        if (!newStudent.name || !newStudent.email || !newStudent.class || !newStudent.section || !newStudent.gender) {
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            // Create student user in database with default password
            const studentResult = await createStudentUser(newStudent.email, newStudent.name);

            if (studentResult.error) {
                setError(studentResult.error);
                setIsLoading(false);
                return;
            }

            // Create parent user with email format: parent.{student_email}
            console.log("Creating parent user for student:", newStudent.email);
            const parentResult = await createParentUser(newStudent.email, newStudent.parentName || "Parent");
            console.log("Parent creation result:", parentResult);

            let parentCreated = true;
            if (parentResult.error) {
                // Log warning but don't block - student was created successfully
                console.warn("Parent user creation warning:", parentResult.error);
                parentCreated = false;
            }

            // If user created successfully, add to local state
            const studentId = `AD${Date.now().toString().slice(-7)}`;
            const newStudentEntry: Student = {
                id: studentId,
                name: newStudent.name,
                email: newStudent.email,
                class: newStudent.class,
                section: newStudent.section,
                gender: newStudent.gender,
                parentName: newStudent.parentName || "Not Provided",
                phone: newStudent.phone || "Not Provided",
                joined: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
                status: "Active",
            };

            setStudents([newStudentEntry, ...students]);
            setNewStudent({ name: "", email: "", class: "", section: "", gender: "", parentName: "", phone: "" });

            // Show success message with parent email info
            const parentEmail = `parent.${newStudent.email}`;
            if (parentCreated) {
                setSuccess(`Student & Parent accounts created! Parent login: ${parentEmail} | Password: Abhi@99`);
            } else {
                setSuccess(`Student created! Parent account failed: ${parentResult.error}`);
            }

            // Close dialog after a short delay to show success message
            setTimeout(() => {
                setIsDialogOpen(false);
                setSuccess(null);
            }, 3000);
        } catch (err) {
            console.error("Error adding student:", err);
            const errorMessage = err instanceof Error ? err.message : "Failed to create student. Please try again.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredStudents = students.filter(
        (student) => {
            const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.class.includes(searchQuery) ||
                student.email.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesClass = classFilter === "all" || student.class === classFilter;
            return matchesSearch && matchesClass;
        }
    );

    const handleExport = () => {
        const headers = ["ID,Name,Email,Class,Section,Gender,Parent Name,Phone,Joined,Status"];
        const csvRows = filteredStudents.map(student => {
            return `"${student.id}","${student.name}","${student.email}","${student.class}","${student.section}","${student.gender}","${student.parentName}","${student.phone}","${student.joined}","${student.status}"`;
        });
        
        const csvString = [headers, ...csvRows].join("\n");
        const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `student_directory_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const activeCount = students.filter(s => s.status === "Active").length;
    const inactiveCount = students.filter(s => s.status === "Inactive").length;

    return (
        <div className="space-y-6">
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
                                <p className="text-xl font-bold">{students.length}</p>
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
                                <p className="text-xs text-muted-foreground">Active</p>
                                <p className="text-xl font-bold text-emerald-600">{activeCount}</p>
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
                                <p className="text-xs text-muted-foreground">Inactive</p>
                                <p className="text-xl font-bold text-rose-600">{inactiveCount}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-4 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
                                <GraduationCap className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Classes</p>
                                <p className="text-xl font-bold">28</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Card */}
            <Card className="h-full">
                <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0 pb-6">
                    <div className="space-y-1">
                        <CardTitle>Student Directory</CardTitle>
                        <CardDescription>Manage and view all student records</CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" className="gap-1" onClick={handleExport}>
                            <Download className="h-4 w-4" /> Export
                        </Button>
                        <input
                            type="file"
                            accept=".xlsx, .xls, .csv"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                        />
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                        >
                            {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                            Bulk Import (Excel)
                        </Button>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 gap-1">
                                    <Plus className="h-4 w-4" /> Add Student
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[550px]">
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                        <GraduationCap className="h-5 w-5 text-blue-600" />
                                        Add New Student
                                    </DialogTitle>
                                    <DialogDescription>
                                        Fill in the student details to register a new student.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name *</Label>
                                            <Input
                                                id="name"
                                                placeholder="Enter student name"
                                                value={newStudent.name}
                                                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address *</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="student@school.com"
                                                value={newStudent.email}
                                                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="class">Class *</Label>
                                            <Select
                                                value={newStudent.class}
                                                onValueChange={(value) => setNewStudent({ ...newStudent, class: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((c) => (
                                                        <SelectItem key={c} value={c.toString()}>Class {c}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="section">Section *</Label>
                                            <Select
                                                value={newStudent.section}
                                                onValueChange={(value) => setNewStudent({ ...newStudent, section: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {["A", "B", "C", "D"].map((s) => (
                                                        <SelectItem key={s} value={s}>Section {s}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="gender">Gender *</Label>
                                            <Select
                                                value={newStudent.gender}
                                                onValueChange={(value) => setNewStudent({ ...newStudent, gender: value })}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Male">Male</SelectItem>
                                                    <SelectItem value="Female">Female</SelectItem>
                                                    <SelectItem value="Other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="parent">Parent/Guardian Name</Label>
                                            <Input
                                                id="parent"
                                                placeholder="Enter parent name"
                                                value={newStudent.parentName}
                                                onChange={(e) => setNewStudent({ ...newStudent, parentName: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Contact Number</Label>
                                            <Input
                                                id="phone"
                                                placeholder="+91 98765 43210"
                                                value={newStudent.phone}
                                                onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
                                        {error}
                                    </div>
                                )}
                                {success && (
                                    <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-md text-sm">
                                        {success}
                                    </div>
                                )}
                                <DialogFooter className="gap-2 sm:gap-0">
                                    <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isLoading}>
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleAddStudent}
                                        className="bg-blue-600 hover:bg-blue-700"
                                        disabled={isLoading || !newStudent.name || !newStudent.email || !newStudent.class || !newStudent.section || !newStudent.gender}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Creating...
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="mr-2 h-4 w-4" /> Add Student
                                            </>
                                        )}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Status Alerts */}
                    {error && (
                        <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-md text-sm">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-md text-sm">
                            {success}
                        </div>
                    )}
                    
                    {/* Search and Filter */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                            <Input
                                placeholder="Search by ID, name, or class..."
                                className="pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Select value={classFilter} onValueChange={setClassFilter}>
                                <SelectTrigger className="w-[130px]">
                                    <SelectValue placeholder="Class" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Classes</SelectItem>
                                    {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map((c) => (
                                        <SelectItem key={c} value={c}>Class {c}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Student Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredStudents.map((student) => (
                            <Card key={student.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="p-3 border-b flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                                    <span className="text-xs font-mono text-slate-500">ID: {student.id}</span>
                                    <Badge
                                        variant={student.status === "Active" ? "default" : "secondary"}
                                        className={student.status === "Active" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-slate-400"}
                                    >
                                        {student.status}
                                    </Badge>
                                </div>
                                <CardContent className="pt-4">
                                    <div className="flex items-start gap-3 mb-4">
                                        <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`} />
                                            <AvatarFallback>{student.name.substring(0, 2)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-sm truncate">{student.name}</h4>
                                            <p className="text-xs text-muted-foreground truncate">{student.email}</p>
                                        </div>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-3 gap-3 text-sm mb-4">
                                        <div>
                                            <p className="text-[10px] text-muted-foreground">Class</p>
                                            <p className="font-medium text-sm">{student.class}-{student.section}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-muted-foreground">Gender</p>
                                            <p className="font-medium text-sm">{student.gender}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-muted-foreground">Joined</p>
                                            <p className="font-medium text-sm">{student.joined}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="flex-1 text-xs h-8">
                                            <Phone className="h-3 w-3 mr-1" /> Call
                                        </Button>
                                        <Button variant="outline" size="sm" className="flex-1 text-xs h-8">
                                            <Mail className="h-3 w-3 mr-1" /> Email
                                        </Button>
                                        <Button size="sm" className="bg-[#0f172a] text-white text-xs h-8">
                                            View <ChevronRight className="h-3 w-3 ml-1" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {filteredStudents.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            <Users className="h-12 w-12 mx-auto mb-4 opacity-20" />
                            <p>No students found matching your search.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
