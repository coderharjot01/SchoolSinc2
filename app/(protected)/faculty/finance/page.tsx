"use client";

import { SalaryView } from "@/components/faculty/finance/salary-view";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function FacultyFinancePage() {
    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Finance"
                title="Finance"
                subtitle="Check your salary slips and payment history"
            />

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 shadow-xl border border-blue-400/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/5 opacity-10 animate-pulse"></div>
                <div className="absolute -right-12 -top-12 h-48 w-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
                <div className="absolute -left-12 -bottom-12 h-48 w-48 bg-indigo-900/40 rounded-full blur-3xl"></div>
                
                <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-5">
                        <div className="h-14 w-14 bg-white/15 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-inner border border-white/20">
                            <Sparkles className="h-7 w-7 text-white animate-bounce" />
                        </div>
                        <div className="text-center sm:text-left">
                            <h3 className="text-white font-extrabold text-xl sm:text-2xl tracking-tight">Financial Modules Update</h3>
                            <p className="text-blue-100/90 text-sm sm:text-base font-medium mt-1">This function will be live soon. We're elevating your management experience!</p>
                        </div>
                    </div>
                    <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30 px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md">
                        ✨ COMING SOON
                    </Badge>
                </div>
            </div>

            <Card>
                <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-lg">Salary & Payments</CardTitle>
                    <CardDescription className="text-sm">View and download your salary slips</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
                    <SalaryView />
                </CardContent>
            </Card>
        </div>
    );
}
