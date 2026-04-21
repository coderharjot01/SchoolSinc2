"use client";

import { FeeManagement } from "@/components/admin/finance/fee-management";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function AdminFinancePage() {
    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Finance"
                title="Finance Management"
                subtitle="Manage school fees and financial reports"
            />

            <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl p-6 shadow-xl border border-orange-400/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/5 opacity-10 animate-pulse"></div>
                <div className="absolute -right-12 -top-12 h-48 w-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
                <div className="absolute -left-12 -bottom-12 h-48 w-48 bg-amber-900/40 rounded-full blur-3xl"></div>
                
                <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-5">
                        <div className="h-14 w-14 bg-white/15 backdrop-blur-xl rounded-2xl flex items-center justify-center shadow-inner border border-white/20">
                            <Sparkles className="h-7 w-7 text-white animate-bounce" />
                        </div>
                        <div className="text-center sm:text-left">
                            <h3 className="text-white font-extrabold text-xl sm:text-2xl tracking-tight">Admin Financial Suite</h3>
                            <p className="text-orange-100/90 text-sm sm:text-base font-medium mt-1">This function will be live soon. We're building a more powerful core!</p>
                        </div>
                    </div>
                    <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/30 px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md">
                        🛠️ LIVE SOON
                    </Badge>
                </div>
            </div>
            <FeeManagement />
        </div>
    );
}
