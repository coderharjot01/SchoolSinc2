"use client";

import { Card } from "@/components/ui/card";
import { User } from "lucide-react";

interface ProfileClientProps {
    userName: string;
    userEmail: string;
    userRole: string;
}

// Mock data - in production this would come from the database
const studentData = {
    uid: "STU2025001",
    name: "Test Student",
    fatherName: "Test User",
    motherName: "Mother Name",
    religion: "Hindu",
    dob: "15 Aug 2008",
    admissionYear: "2023",
    university: "HS21Schools High School",
    currentSemester: "10th Grade",
    bloodGroup: "O+",
    currentSection: "10-A",
    programCode: "SCIENCE",
    studentStatus: "Active",
    category: "General",
    address: "123 Main Street, City, State - 123456",
};

const qualificationData = [
    { qualification: "9th", stream: "Science", institute: "HS21Schools High School", board: "CBSE", year: "2024", percent: "85.6", remarks: "" },
    { qualification: "8th", stream: "General", institute: "HS21Schools Middle School", board: "CBSE", year: "2023", percent: "82.4", remarks: "" },
];

const contactData = [
    { type: "Father", residence: "+91 98765 43210", office: "-", mobile: "+91 98765 43210", email: "father@example.com" },
    { type: "Mother", residence: "+91 98765 43211", office: "-", mobile: "+91 98765 43211", email: "mother@example.com" },
    { type: "Student", residence: "-", office: "-", mobile: "+91 98765 43212", email: "student@example.com" },
];

const mentorData = {
    name: "Dr. Sharma",
    id: "FAC2024001",
    department: "Science Department",
    designation: "Senior Teacher",
};

export default function ProfileClient({ userName, userEmail }: ProfileClientProps) {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-blue-600 rounded-xl p-4 text-white text-center">
                <h1 className="text-xl font-bold">Child&apos;s Profile</h1>
            </div>

            {/* Personal Information */}
            <Card className="overflow-hidden">
                <div className="bg-blue-600 px-4 py-2">
                    <h2 className="text-white text-sm font-semibold uppercase tracking-wider">
                        Student Personal Information
                    </h2>
                </div>
                <div className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Info Grid */}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                            <InfoRow label="UID" value={studentData.uid} />
                            <InfoRow label="Current Semester" value={studentData.currentSemester} />
                            <InfoRow label="Name" value={studentData.name} />
                            <InfoRow label="Blood Group" value={studentData.bloodGroup} />
                            <InfoRow label="Father's Name" value={userName} />
                            <InfoRow label="Current Section" value={studentData.currentSection} />
                            <InfoRow label="Mother's Name" value={studentData.motherName} />
                            <InfoRow label="Program Code" value={studentData.programCode} />
                            <InfoRow label="Religion" value={studentData.religion} />
                            <InfoRow label="Student Status" value={studentData.studentStatus} />
                            <InfoRow label="D.O.B" value={studentData.dob} />
                            <InfoRow label="Category" value={studentData.category} />
                            <InfoRow label="Admission Year" value={studentData.admissionYear} />
                            <InfoRow label="Address" value={studentData.address} />
                            <InfoRow label="University" value={studentData.university} />
                            <InfoRow label="Parent Email" value={userEmail} />
                        </div>
                        {/* Profile Picture */}
                        <div className="flex-shrink-0">
                            <div className="w-32 h-40 bg-slate-100 border border-slate-300 rounded-lg flex items-center justify-center">
                                <User className="h-16 w-16 text-slate-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Qualification Details */}
            <Card className="overflow-hidden">
                <div className="bg-blue-600 px-4 py-2">
                    <h2 className="text-white text-sm font-semibold uppercase tracking-wider">
                        Qualification Details
                    </h2>
                </div>
                <div className="p-4 overflow-x-auto">
                    <table className="w-full text-sm min-w-[700px]">
                        <thead>
                            <tr className="text-left text-slate-600 border-b">
                                <th className="pb-3 font-semibold">Qualification</th>
                                <th className="pb-3 font-semibold">Stream</th>
                                <th className="pb-3 font-semibold">School/Institute</th>
                                <th className="pb-3 font-semibold">Board</th>
                                <th className="pb-3 font-semibold">Passing Year</th>
                                <th className="pb-3 font-semibold">Percent Marks</th>
                                <th className="pb-3 font-semibold">Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {qualificationData.map((row, i) => (
                                <tr key={i} className="border-b last:border-0">
                                    <td className="py-3">{row.qualification}</td>
                                    <td className="py-3">{row.stream}</td>
                                    <td className="py-3">{row.institute}</td>
                                    <td className="py-3">{row.board}</td>
                                    <td className="py-3">{row.year}</td>
                                    <td className="py-3">{row.percent}</td>
                                    <td className="py-3">{row.remarks || "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Contact Details */}
            <Card className="overflow-hidden">
                <div className="bg-blue-600 px-4 py-2">
                    <h2 className="text-white text-sm font-semibold uppercase tracking-wider">
                        Contact Details
                    </h2>
                </div>
                <div className="p-4 overflow-x-auto">
                    <table className="w-full text-sm min-w-[600px]">
                        <thead>
                            <tr className="text-left text-slate-600 border-b">
                                <th className="pb-3 font-semibold">Contact Type</th>
                                <th className="pb-3 font-semibold">Residence</th>
                                <th className="pb-3 font-semibold">Office</th>
                                <th className="pb-3 font-semibold">Mobile</th>
                                <th className="pb-3 font-semibold">Email Id</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contactData.map((row, i) => (
                                <tr key={i} className="border-b last:border-0">
                                    <td className="py-3">{row.type}</td>
                                    <td className="py-3">{row.residence}</td>
                                    <td className="py-3">{row.office}</td>
                                    <td className="py-3">{row.mobile}</td>
                                    <td className="py-3">{row.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Student Mentor Details */}
            <Card className="overflow-hidden">
                <div className="bg-blue-600 px-4 py-2">
                    <h2 className="text-white text-sm font-semibold uppercase tracking-wider">
                        Class Teacher Details
                    </h2>
                </div>
                <div className="p-4 overflow-x-auto">
                    <table className="w-full text-sm min-w-[500px]">
                        <thead>
                            <tr className="text-left text-slate-600 border-b">
                                <th className="pb-3 font-semibold">Teacher Name</th>
                                <th className="pb-3 font-semibold">Teacher ID</th>
                                <th className="pb-3 font-semibold">Department</th>
                                <th className="pb-3 font-semibold">Designation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-3">{mentorData.name}</td>
                                <td className="py-3">{mentorData.id}</td>
                                <td className="py-3">{mentorData.department}</td>
                                <td className="py-3">{mentorData.designation}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Facilities Availed */}
            <Card className="overflow-hidden">
                <div className="bg-blue-600 px-4 py-2">
                    <h2 className="text-white text-sm font-semibold uppercase tracking-wider">
                        Facilities Availed
                    </h2>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <FacilityBadge label="Library Access" active />
                        <FacilityBadge label="Computer Lab" active />
                        <FacilityBadge label="Sports" active />
                        <FacilityBadge label="Transportation" active={false} />
                    </div>
                </div>
            </Card>

            {/* Footer */}
            <div className="text-center text-xs text-slate-400 py-4">
                <p>HS21Schools High School, City, State</p>
                <p>General Helpline No: 1800-XXX-XXXX</p>
                <p>Email Id: support@hs21schools.edu</p>
            </div>
        </div>
    );
}

// Helper Components
function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <span className="text-slate-500 font-medium sm:min-w-[140px] text-sm">{label}</span>
            <span className="text-slate-800 text-sm break-words">{value}</span>
        </div>
    );
}

function FacilityBadge({ label, active }: { label: string; active: boolean }) {
    return (
        <div className={`px-4 py-2 rounded-lg text-sm font-medium text-center ${active
            ? "bg-emerald-100 text-emerald-700"
            : "bg-slate-100 text-slate-400"
            }`}>
            {label}
        </div>
    );
}
