"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { CalendarDays, CheckCircle2, XCircle, Clock, User, Download, FileText } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

const mockLeaveRequests = [
    {
        id: "LR-1029",
        applicantName: "John Teacher",
        applicantRole: "Faculty",
        dateApplied: "2024-12-14",
        leaveType: "Sick Leave",
        startDate: "2024-12-16",
        endDate: "2024-12-18",
        days: 3,
        reason: "Viral fever and throat infection. Doctor advised rest.",
        status: "Pending",
        attachments: 1
    },
    {
        id: "LR-1030",
        applicantName: "Rahul Kumar",
        applicantRole: "Student (10-A)",
        dateApplied: "2024-12-15",
        leaveType: "Family Event",
        startDate: "2024-12-20",
        endDate: "2024-12-22",
        days: 3,
        reason: "Attending cousin's wedding out of station.",
        status: "Pending",
        attachments: 0
    },
    {
        id: "LR-1028",
        applicantName: "Sarah Smith",
        applicantRole: "Staff (Administration)",
        dateApplied: "2024-12-10",
        leaveType: "Casual Leave",
        startDate: "2024-12-12",
        endDate: "2024-12-12",
        days: 1,
        reason: "Personal banking work.",
        status: "Approved",
        attachments: 0
    },
    {
        id: "LR-1027",
        applicantName: "Amit Patel",
        applicantRole: "Student (9-B)",
        dateApplied: "2024-12-08",
        leaveType: "Sick Leave",
        startDate: "2024-12-09",
        endDate: "2024-12-10",
        days: 2,
        reason: "Stomach upset.",
        status: "Rejected",
        attachments: 0
    }
];

export default function AdminLeaveManagementPage() {
    const [requests, setRequests] = useState(mockLeaveRequests);
    const [processingId, setProcessingId] = useState<string | null>(null);

    const handleAction = (id: string, action: "Approved" | "Rejected") => {
        setProcessingId(id);
        
        setTimeout(() => {
            setRequests(prev => 
                prev.map(req => 
                    req.id === id ? { ...req, status: action } : req
                )
            );
            setProcessingId(null);
        }, 800);
    };

    const pendingCount = requests.filter(r => r.status === "Pending").length;

    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Leave Management"
                title="Leave Application Management"
                subtitle="Review and process student & staff leave requests"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Pending Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-amber-600">{pendingCount}</span>
                            <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                                <Clock className="h-5 w-5 text-amber-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Approved (This Month)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-emerald-600">
                                {requests.filter(r => r.status === "Approved").length + 24}
                            </span>
                            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Rejected (This Month)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-rose-600">
                                {requests.filter(r => r.status === "Rejected").length + 3}
                            </span>
                            <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center">
                                <XCircle className="h-5 w-5 text-rose-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Leave Requests</CardTitle>
                    <CardDescription>Process active leave applications here.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {requests.map(req => (
                            <div key={req.id} className="flex flex-col xl:flex-row xl:items-center justify-between p-5 border rounded-xl bg-white dark:bg-slate-900 shadow-sm gap-6">
                                {/* Left Side Profile & Dates */}
                                <div className="flex items-start gap-4 flex-1">
                                    <Avatar className="h-12 w-12 border">
                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${req.applicantName}`} />
                                        <AvatarFallback>{req.applicantName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1 w-full">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-semibold text-base">{req.applicantName}</h4>
                                                <Badge variant="outline" className="text-xs bg-slate-50 text-slate-600">{req.applicantRole}</Badge>
                                            </div>
                                            <span className="text-xs text-slate-400">Applied: {req.dateApplied}</span>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 mt-2">
                                            <Badge variant="secondary" className="bg-blue-50 text-blue-700">{req.leaveType}</Badge>
                                            <span className="text-sm font-medium border-l pl-2 text-slate-600">
                                                {req.startDate} to {req.endDate} ({req.days} Day{req.days > 1 ? 's' : ''})
                                            </span>
                                        </div>
                                        <p className="text-sm mt-3 text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                            <span className="font-medium text-slate-900 block mb-1">Reason:</span>
                                            {req.reason}
                                        </p>
                                        
                                        {req.attachments > 0 && (
                                            <div className="mt-3 flex items-center gap-2">
                                                <Button variant="outline" size="sm" className="h-8 text-xs gap-1 text-slate-600">
                                                    <FileText className="h-3.5 w-3.5" /> Medical_Certificate.pdf
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Right Side Actions */}
                                <div className="flex flex-col items-end justify-center min-w-[140px] pl-6 border-t xl:border-t-0 xl:border-l pt-4 xl:pt-0">
                                    <div className="mb-4">
                                        <Badge 
                                            variant={req.status === 'Approved' ? 'default' : req.status === 'Rejected' ? 'destructive' : 'secondary'}
                                            className={
                                                req.status === 'Approved' ? 'bg-emerald-500 hover:bg-emerald-600 text-white' :
                                                req.status === 'Rejected' ? 'bg-rose-500 hover:bg-rose-600 text-white' :
                                                'bg-amber-100 text-amber-700 hover:bg-amber-100'
                                            }
                                        >
                                            {req.status}
                                        </Badge>
                                    </div>
                                    
                                    {req.status === 'Pending' && (
                                        <div className="flex gap-2">
                                            <Button 
                                                size="sm" 
                                                variant="outline" 
                                                className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                                                onClick={() => handleAction(req.id, "Rejected")}
                                                disabled={processingId === req.id}
                                            >
                                                Reject
                                            </Button>
                                            <Button 
                                                size="sm"
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                                                onClick={() => handleAction(req.id, "Approved")}
                                                disabled={processingId === req.id}
                                            >
                                                {processingId === req.id ? 'Processing...' : 'Approve'}
                                            </Button>
                                        </div>
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
