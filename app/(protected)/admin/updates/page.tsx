"use client";

import { useState } from "react";
import * as XLSX from "xlsx";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
    Search, 
    Filter, 
    FileUp, 
    FileText, 
    CheckCircle2, 
    AlertCircle, 
    Clock, 
    GraduationCap,
    Download
} from "lucide-react";

interface Activity {
    id: string;
    staffName: string;
    role: string;
    action: string;
    details: string;
    type: "Academic" | "Document" | "System" | "Results";
    timestamp: string;
    status: "Completed" | "Pending" | "Failed";
}

const mockActivities: Activity[] = [
    {
        id: "ACT-1029",
        staffName: "Mrs. Sharma",
        role: "Class Teacher",
        action: "Uploaded Grade 10 Mathematics Results",
        details: "Imported 45 student records for the Mid-Term Examination.",
        type: "Results",
        timestamp: "10 mins ago",
        status: "Completed"
    },
    {
        id: "ACT-1028",
        staffName: "Mr. Verma",
        role: "HOD Science",
        action: "Published Science Project Guidelines",
        details: "Attached 'Class_9_Science_Fair_Guidelines.pdf' to the notice board.",
        type: "Document",
        timestamp: "1 hour ago",
        status: "Completed"
    },
    {
        id: "ACT-1027",
        staffName: "Admin System",
        role: "System",
        action: "Bulk Student Import",
        details: "Successfully imported 120 new student records via Excel upload.",
        type: "System",
        timestamp: "3 hours ago",
        status: "Completed"
    },
    {
        id: "ACT-1026",
        staffName: "Ms. Gupta",
        role: "Librarian",
        action: "Updated Library Inventory",
        details: "Added 50 new book titles to the Academic Resources section.",
        type: "Academic",
        timestamp: "5 hours ago",
        status: "Completed"
    },
    {
        id: "ACT-1025",
        staffName: "Mr. Singh",
        role: "Exam Coordinator",
        action: "Generating Report Cards",
        details: "Processing final term report cards for Grade 8.",
        type: "Results",
        timestamp: "Yesterday",
        status: "Pending"
    }
];

export default function AdminUpdatesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<string>("All");
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async () => {
        setIsExporting(true);
        // Simulate a slight delay for realistic UX
        await new Promise(resolve => setTimeout(resolve, 800));

        // Format data for Excel
        const exportData = filteredActivities.map(activity => ({
            "Activity ID": activity.id,
            "Staff Member": activity.staffName,
            "Role": activity.role,
            "Action Performed": activity.action,
            "Detailed Description": activity.details,
            "Category": activity.type,
            "Time": activity.timestamp,
            "Status": activity.status
        }));

        // Create a new workbook and add the data
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        
        // Make columns wider and more readable
        worksheet['!cols'] = [
            { wch: 15 }, // ID
            { wch: 20 }, // Staff Name
            { wch: 15 }, // Role
            { wch: 40 }, // Action
            { wch: 60 }, // Details
            { wch: 15 }, // Category
            { wch: 15 }, // Time
            { wch: 15 }  // Status
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Activity Log");
        
        // Generate buffer and trigger download
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `System_Activity_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setIsExporting(false);
    };

    const getIconForType = (type: string) => {
        switch(type) {
            case "Results": return <CheckCircle2 className="h-5 w-5 text-emerald-500" />;
            case "Document": return <FileText className="h-5 w-5 text-blue-500" />;
            case "System": return <FileUp className="h-5 w-5 text-purple-500" />;
            case "Academic": return <GraduationCap className="h-5 w-5 text-amber-500" />;
            default: return <AlertCircle className="h-5 w-5 text-slate-500" />;
        }
    };

    const getBadgeForStatus = (status: string) => {
        switch(status) {
            case "Completed": return <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200">Completed</Badge>;
            case "Pending": return <Badge className="bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200">Processing</Badge>;
            case "Failed": return <Badge className="bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-200">Failed</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    const filteredActivities = mockActivities.filter(activity => {
        const matchesSearch = activity.staffName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              activity.action.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === "All" || activity.type === filterType;
        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Updates Log"
                title="Activity & Updates Log"
                subtitle="Monitor recent staff uploads, academic changes, and system events in real-time."
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="md:col-span-3">
                    <CardHeader className="pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <CardTitle>Recent Activity</CardTitle>
                                <CardDescription>A chronological feed of all school updates.</CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                    <Input
                                        placeholder="Search activities..."
                                        className="pl-9 w-[250px] bg-slate-50 border-slate-200"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <Button variant="outline" size="icon">
                                    <Filter className="h-4 w-4 text-slate-600" />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                            {filteredActivities.map((activity, index) => (
                                <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                    {/* Timeline Dot */}
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                        {getIconForType(activity.type)}
                                    </div>
                                    
                                    {/* Card */}
                                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarFallback className="text-[10px] bg-slate-100 text-slate-600">
                                                        {activity.staffName.substring(0, 2).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="font-semibold text-sm text-slate-900">{activity.staffName}</span>
                                            </div>
                                            <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {activity.timestamp}
                                            </span>
                                        </div>
                                        <h4 className="font-medium text-slate-800 mb-1">{activity.action}</h4>
                                        <p className="text-sm text-slate-600 mb-3">{activity.details}</p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <Badge variant="secondary" className="text-xs bg-slate-100">
                                                {activity.type}
                                            </Badge>
                                            {getBadgeForStatus(activity.status)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {filteredActivities.length === 0 && (
                            <div className="text-center py-12">
                                <AlertCircle className="h-8 w-8 text-slate-400 mx-auto mb-3" />
                                <h3 className="text-lg font-medium text-slate-900">No activities found</h3>
                                <p className="text-slate-500">Try adjusting your search criteria.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Filters Sidebar */}
                <div className="space-y-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm">Filter by Category</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {["All", "Results", "Document", "System", "Academic"].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setFilterType(type)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                        filterType === type 
                                        ? "bg-emerald-50 text-emerald-700 font-medium" 
                                        : "text-slate-600 hover:bg-slate-50"
                                    }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white border-none shadow-md">
                        <CardContent className="p-6 text-center">
                            <Download className="h-8 w-8 text-white/80 mx-auto mb-3" />
                            <h3 className="font-semibold mb-2">Export Activity Log</h3>
                            <p className="text-xs text-emerald-100 mb-4">Download a detailed CSV report of all system activities for compliance and auditing.</p>
                            <Button 
                                className="w-full bg-white text-emerald-700 hover:bg-emerald-50"
                                onClick={handleExport}
                                disabled={isExporting}
                            >
                                {isExporting ? "Generating..." : "Generate Report"}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
