"use client";

import { Card } from "@/components/ui/card";
import { User } from "lucide-react";

interface ProfileClientProps {
    userName: string;
    userEmail: string;
    userRole: string;
}

// Mock data for faculty
const facultyData = {
    empId: "FAC2024001",
    name: "Test Teacher",
    department: "Science Department",
    designation: "Senior Teacher",
    qualification: "M.Sc., B.Ed.",
    experience: "10 Years",
    joiningDate: "15 Aug 2015",
    dob: "20 Mar 1985",
    bloodGroup: "B+",
    phone: "+91 98765 43210",
    address: "456 Faculty Housing, City, State - 123456",
    subjectsTaught: ["Mathematics", "Physics"],
    classesAssigned: ["10-A", "10-B", "9-A"],
};

export default function ProfileClient({ userName, userEmail }: ProfileClientProps) {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-blue-600 rounded-xl p-4 text-white text-center">
                <h1 className="text-xl font-bold">Faculty Profile</h1>
            </div>

            {/* Personal Information */}
            <Card className="overflow-hidden">
                <div className="bg-blue-600 px-4 py-2">
                    <h2 className="text-white text-sm font-semibold uppercase tracking-wider">
                        Personal Information
                    </h2>
                </div>
                <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                            <InfoRow label="Employee ID" value={facultyData.empId} />
                            <InfoRow label="Department" value={facultyData.department} />
                            <InfoRow label="Name" value={userName} />
                            <InfoRow label="Designation" value={facultyData.designation} />
                            <InfoRow label="Email" value={userEmail} />
                            <InfoRow label="Qualification" value={facultyData.qualification} />
                            <InfoRow label="Phone" value={facultyData.phone} />
                            <InfoRow label="Experience" value={facultyData.experience} />
                            <InfoRow label="D.O.B" value={facultyData.dob} />
                            <InfoRow label="Joining Date" value={facultyData.joiningDate} />
                            <InfoRow label="Blood Group" value={facultyData.bloodGroup} />
                            <InfoRow label="Address" value={facultyData.address} />
                        </div>
                        <div className="flex-shrink-0">
                            <div className="w-32 h-40 bg-slate-100 border border-slate-300 rounded-lg flex items-center justify-center">
                                <User className="h-16 w-16 text-slate-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Teaching Details */}
            <Card className="overflow-hidden">
                <div className="bg-blue-600 px-4 py-2">
                    <h2 className="text-white text-sm font-semibold uppercase tracking-wider">
                        Teaching Details
                    </h2>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-semibold text-slate-600 mb-3">Subjects Taught</h3>
                            <div className="flex flex-wrap gap-2">
                                {facultyData.subjectsTaught.map((subject) => (
                                    <span key={subject} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                        {subject}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-slate-600 mb-3">Classes Assigned</h3>
                            <div className="flex flex-wrap gap-2">
                                {facultyData.classesAssigned.map((cls) => (
                                    <span key={cls} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                                        {cls}
                                    </span>
                                ))}
                            </div>
                        </div>
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
