"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { FileUp, CheckCircle2, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { addDays, format, parseISO } from "date-fns";

export default function StudentLeave() {
    const [formData, setFormData] = useState({
        fullName: "",
        studentId: "",
        fromDate: format(new Date(), 'yyyy-MM-dd'),
        toDate: "",
        totalDays: 1,
        leaveType: "",
        reason: "",
    });

    // Automatically calculate toDate when fromDate or totalDays change
    useEffect(() => {
        if (formData.fromDate && formData.totalDays > 0) {
            const start = parseISO(formData.fromDate);
            const calculatedEnd = addDays(start, formData.totalDays - 1);
            setFormData(prev => ({ ...prev, toDate: format(calculatedEnd, 'yyyy-MM-dd') }));
        }
    }, [formData.fromDate, formData.totalDays]);

    const [sendCopy, setSendCopy] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = () => {
        if (!formData.fullName || !formData.studentId || !formData.fromDate || !formData.toDate || !formData.leaveType || !formData.reason) {
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                setFormData({
                    fullName: "",
                    studentId: "",
                    fromDate: format(new Date(), 'yyyy-MM-dd'),
                    toDate: "",
                    totalDays: 1,
                    leaveType: "",
                    reason: "",
                });
                setSendCopy(false);
            }, 3000);
        }, 1500);
    };

    const leaveTypes = [
        { value: "sick", label: "Sick Leave" },
        { value: "casual", label: "Casual Leave" },
        { value: "emergency", label: "Emergency Leave" },
        { value: "family", label: "Family Event" },
        { value: "other", label: "Other" },
    ];

    if (isSuccess) {
        return (
            <div className="space-y-6">
                <PageHeader
                    breadcrumb="Home / Leave Application"
                    title="Leave Application"
                    subtitle="Submit and track your leave requests"
                />
                <Card className="w-full">
                    <CardContent className="py-16 flex flex-col items-center justify-center text-center">
                        <div className="bg-emerald-100 dark:bg-emerald-900/30 p-6 rounded-full mb-6">
                            <CheckCircle2 className="h-12 w-12 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-400 mb-2">Leave Application Submitted!</h3>
                        <p className="text-slate-600 dark:text-slate-400 max-w-md">
                            Your leave request has been submitted successfully. You will be notified once it&apos;s reviewed by the administration.
                        </p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Leave Application"
                title="Leave Application"
                subtitle="Submit and track your leave requests"
            />

            <Card className="w-full">
                <CardHeader className="pb-4">
                    <CardTitle className="text-sm font-semibold text-slate-500">Apply for Leave</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-sm">Full Name</Label>
                                <Input
                                    placeholder="Enter your Name"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm">Student ID</Label>
                                <Input
                                    placeholder="Enter your ID"
                                    value={formData.studentId}
                                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label className="text-sm">Total Days</Label>
                                <Input
                                    type="number"
                                    min={1}
                                    placeholder="1"
                                    value={formData.totalDays}
                                    onChange={(e) => setFormData({ ...formData, totalDays: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm">From Date</Label>
                                <Input
                                    type="date"
                                    value={formData.fromDate}
                                    onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm">To Date (Calculated)</Label>
                                <Input
                                    type="date"
                                    value={formData.toDate}
                                    readOnly
                                    className="bg-slate-50 dark:bg-slate-900 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-sm">Leave Type</Label>
                                <Select value={formData.leaveType} onValueChange={(value) => setFormData({ ...formData, leaveType: value })}>
                                    <SelectTrigger><SelectValue placeholder="Select Leave Type" /></SelectTrigger>
                                    <SelectContent>
                                        {leaveTypes.map((type) => (
                                            <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm">Upload</Label>
                                <div className="border border-input rounded-md h-10 flex items-center px-3 cursor-pointer hover:bg-slate-50">
                                    <span className="text-sm text-muted-foreground flex-1 truncate">Choose a file</span>
                                    <FileUp className="h-4 w-4 text-slate-400 flex-shrink-0" />
                                </div>
                                <p className="text-[10px] text-muted-foreground">PDF format only</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm">Reason</Label>
                            <Textarea
                                placeholder="Reason for Leave..."
                                className="min-h-[100px]"
                                value={formData.reason}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value.slice(0, 100) })}
                            />
                            <p className="text-[10px] text-right text-muted-foreground">{formData.reason.length}/100</p>
                        </div>

                        <div className="flex items-start gap-2">
                            <Checkbox
                                id="copy"
                                className="mt-0.5"
                                checked={sendCopy}
                                onCheckedChange={(checked) => setSendCopy(checked as boolean)}
                            />
                            <label htmlFor="copy" className="text-sm text-muted-foreground">
                                A copy will sent to your Parent Gmails
                            </label>
                        </div>

                        <Button
                            className="w-full bg-[#0f172a]"
                            onClick={handleSubmit}
                            disabled={isSubmitting || !formData.fullName || !formData.leaveType || !formData.fromDate || !formData.toDate || !formData.reason}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                "Submit"
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Guidelines Card */}
            <Card className="bg-slate-50 dark:bg-slate-900/50">
                <CardContent className="p-4 sm:p-6">
                    <h4 className="font-semibold mb-4 text-center text-sm">Guidelines</h4>
                    <ul className="space-y-2 text-xs text-muted-foreground list-disc pl-4">
                        <li>Fill in all the required fields correctly.</li>
                        <li>Ensure the From Date is not later than the To Date.</li>
                        <li>Apply for leave only for valid/future dates unless it&apos;s an emergency.</li>
                        <li>Upload supporting documents only in PDF format.</li>
                        <li>Make sure uploaded documents are clear and readable.</li>
                        <li>Provide a short and accurate reason (max 100 characters).</li>
                        <li>Review all details before submitting.</li>
                        <li>Tick the checkbox if you want a copy sent to your Gmail.</li>
                        <li>Submit the form only once for a single leave request.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
