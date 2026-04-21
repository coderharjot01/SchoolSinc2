"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Send } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { addDays, format, parseISO } from "date-fns";

export default function FacultyLeavePage() {
    const [leaveType, setLeaveType] = useState("Sick Leave");
    const [totalDays, setTotalDays] = useState(1);
    const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState("");

    // Automatically calculate end date when start date or total days change
    useEffect(() => {
        if (startDate && totalDays > 0) {
            const start = parseISO(startDate);
            // end date = start date + (total days - 1)
            const calculatedEnd = addDays(start, totalDays - 1);
            setEndDate(format(calculatedEnd, 'yyyy-MM-dd'));
        }
    }, [startDate, totalDays]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Leave Application Submitted!\nType: ${leaveType}\nFrom: ${startDate}\nTo: ${endDate}\nDays: ${totalDays}`);
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            <PageHeader
                breadcrumb="Home / Leave Application"
                title="Leave Application"
                subtitle="Submit and track your leave requests"
            />

            <div className="space-y-4 sm:space-y-6">
                {/* Apply for Leave */}
                <Card>
                    <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-lg">Apply for Leave</CardTitle>
                        <CardDescription className="text-sm">Fill out the form below to request leave.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="type" className="text-sm">Leave Type</Label>
                                    <select 
                                        id="type" 
                                        value={leaveType}
                                        onChange={(e) => setLeaveType(e.target.value)}
                                        className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    >
                                        <option>Sick Leave</option>
                                        <option>Casual Leave</option>
                                        <option>Earned Leave</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="days" className="text-sm">Total Days</Label>
                                    <Input 
                                        id="days" 
                                        type="number" 
                                        min={1}
                                        value={totalDays}
                                        onChange={(e) => setTotalDays(parseInt(e.target.value) || 0)}
                                        placeholder="1" 
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="start" className="text-sm">Start Date</Label>
                                    <Input 
                                        id="start" 
                                        type="date" 
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="end" className="text-sm">End Date (Calculated)</Label>
                                    <Input 
                                        id="end" 
                                        type="date" 
                                        value={endDate}
                                        readOnly
                                        className="bg-slate-50 dark:bg-slate-900 cursor-not-allowed"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="reason" className="text-sm">Reason</Label>
                                <Textarea id="reason" placeholder="Please specify the reason for your leave..." className="min-h-[100px]" />
                            </div>
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                                <Send className="mr-2 h-4 w-4" /> Submit Application
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Leave History */}
                <Card>
                    <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-lg">Leave History</CardTitle>
                        <CardDescription className="text-sm">Your recent leave applications.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors gap-3">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 flex-shrink-0">
                                            <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">Sick Leave</p>
                                            <p className="text-xs text-muted-foreground">Nov 12 - Nov 14 (3 days)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between sm:flex-col sm:items-end pl-11 sm:pl-0">
                                        <Badge variant={i === 1 ? "secondary" : "default"} className={i === 1 ? "bg-yellow-500/15 text-yellow-600 hover:bg-yellow-500/25" : "bg-emerald-500 hover:bg-emerald-600"}>
                                            {i === 1 ? "Pending" : "Approved"}
                                        </Badge>
                                        <p className="text-xs text-muted-foreground mt-0 sm:mt-1">Applied on Nov 10</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
