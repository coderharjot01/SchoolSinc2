"use client";

import { Card } from "@/components/ui/card";
import { User, Shield, Clock } from "lucide-react";

interface ProfileClientProps {
    userName: string;
    userEmail: string;
    userRole: string;
}

// Mock data for admin
const adminData = {
    empId: "ADM2024001",
    name: "Admin User",
    role: "System Administrator",
    department: "Administration",
    phone: "+91 98765 43200",
    joiningDate: "01 Jan 2020",
    lastLogin: "11 Dec 2025, 6:30 PM",
    accessLevel: "Full Access",
    permissions: ["User Management", "System Settings", "Financial Reports", "Academic Records", "Audit Logs"],
};

const recentActivities = [
    { action: "Updated fee structure for 2025-26", time: "2 hours ago" },
    { action: "Added new teacher account", time: "5 hours ago" },
    { action: "Generated monthly attendance report", time: "1 day ago" },
    { action: "Updated exam schedule", time: "2 days ago" },
];

export default function ProfileClient({ userName, userEmail }: ProfileClientProps) {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-blue-600 rounded-xl p-4 text-white text-center">
                <h1 className="text-xl font-bold">Admin Profile</h1>
            </div>

            {/* Personal Information */}
            <Card className="overflow-hidden">
                <div className="bg-blue-600 px-4 py-2">
                    <h2 className="text-white text-sm font-semibold uppercase tracking-wider">
                        Account Information
                    </h2>
                </div>
                <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                            <InfoRow label="Admin ID" value={adminData.empId} />
                            <InfoRow label="Role" value={adminData.role} />
                            <InfoRow label="Name" value={userName} />
                            <InfoRow label="Department" value={adminData.department} />
                            <InfoRow label="Email" value={userEmail} />
                            <InfoRow label="Phone" value={adminData.phone} />
                            <InfoRow label="Joining Date" value={adminData.joiningDate} />
                            <InfoRow label="Last Login" value={adminData.lastLogin} />
                            <InfoRow label="Access Level" value={adminData.accessLevel} />
                        </div>
                        <div className="flex-shrink-0">
                            <div className="w-32 h-40 bg-slate-100 border border-slate-300 rounded-lg flex items-center justify-center">
                                <User className="h-16 w-16 text-slate-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Permissions */}
            <Card className="overflow-hidden">
                <div className="bg-blue-600 px-4 py-2">
                    <h2 className="text-white text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Permissions & Access
                    </h2>
                </div>
                <div className="p-6">
                    <div className="flex flex-wrap gap-3">
                        {adminData.permissions.map((permission) => (
                            <span key={permission} className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium">
                                {permission}
                            </span>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Recent Activity */}
            <Card className="overflow-hidden">
                <div className="bg-blue-600 px-4 py-2">
                    <h2 className="text-white text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Recent Activity
                    </h2>
                </div>
                <div className="p-4">
                    <div className="space-y-3">
                        {recentActivities.map((activity, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                                <span className="text-sm text-slate-700">{activity.action}</span>
                                <span className="text-xs text-slate-400">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Footer */}
            <div className="text-center text-xs text-slate-400 py-4">
                <p>HS21Schools High School, City, State</p>
                <p>Email Id: support@hs21schools.edu</p>
            </div>
        </div>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
            <span className="text-slate-500 font-medium sm:min-w-[140px] text-sm">{label}</span>
            <span className="text-slate-800 text-sm break-words">{value}</span>
        </div>
    );
}
