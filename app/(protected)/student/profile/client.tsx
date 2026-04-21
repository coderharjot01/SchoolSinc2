"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    User,
    MessageCircle,
    CalendarClock,
    BookOpen,
    Monitor,
    Trophy as TrophyIcon,
    Bus,
    Dumbbell,
    MapPin,
    Cake,
    Droplets,
    Phone,
    Mail,
    ChevronDown,
    ChevronUp,
    Shield,
    Star,
    Zap,
    CheckCircle2,
    Circle,
    Clock,
    Users,
    AlertTriangle,
    Sparkles,
} from "lucide-react";

interface ProfileClientProps {
    userName: string;
    userEmail: string;
    userRole: string;
}

// Mock data - in production this would come from the database
const studentData = {
    uid: "STU2025001",
    name: "Ayush",
    fatherName: "Rajesh Sharma",
    motherName: "Priya Sharma",
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
    address: "123 Main Street, Kathmandu, Nepal - 44600",
    level: 5,
    totalXP: 2450,
    xpToNextLevel: 500,
    currentXPinLevel: 350,
    rarestBadge: "Quiz Master",
    rarestBadgeRarity: "rare",
};

const qualificationData = [
    { qualification: "10th", stream: "Science", institute: "HS21Schools High School", board: "CBSE", year: "2025", percent: null, remarks: "current", status: "in-progress" },
    { qualification: "9th", stream: "Science", institute: "HS21Schools High School", board: "CBSE", year: "2024", percent: "85.6", remarks: "Passed with Distinction", status: "completed" },
    { qualification: "8th", stream: "General", institute: "HS21Schools Middle School", board: "CBSE", year: "2023", percent: "82.4", remarks: "Passed", status: "completed" },
];

const contactData = {
    father: { name: "Rajesh Sharma", phone: "+91 98765 43210", email: "father@example.com" },
    mother: { name: "Priya Sharma", phone: "+91 98765 43211", email: "mother@example.com" },
    student: { phone: "+91 98765 43212", email: "ayush@example.com" },
};

const mentorData = {
    name: "Dr. Sharma",
    id: "FAC2024001",
    department: "Science Department",
    designation: "Senior Teacher",
    avatar: null,
    available: true,
};

const facilitiesData = [
    { id: "library", label: "Library Access", icon: BookOpen, active: true, color: "bg-amber-500", bgColor: "bg-amber-50", textColor: "text-amber-700" },
    { id: "computer", label: "Computer Lab", icon: Monitor, active: true, color: "bg-blue-500", bgColor: "bg-blue-50", textColor: "text-blue-700" },
    { id: "sports", label: "Sports", icon: Dumbbell, active: true, color: "bg-emerald-500", bgColor: "bg-emerald-50", textColor: "text-emerald-700" },
    { id: "transport", label: "Transportation", icon: Bus, active: false, color: "bg-slate-400", bgColor: "bg-slate-100", textColor: "text-slate-500", issue: "Fees Due" },
];

export default function ProfileClient({ userName, userEmail }: ProfileClientProps) {
    const [showFullDetails, setShowFullDetails] = useState(false);

    // Get rarity color
    const getRarityColor = (rarity: string) => {
        switch (rarity) {
            case "legendary": return "from-amber-400 to-orange-500";
            case "rare": return "from-blue-400 to-indigo-500";
            case "common": return "from-slate-400 to-slate-500";
            default: return "from-emerald-400 to-teal-500";
        }
    };

    return (
        <div className="space-y-6">
            {/* ============================================ */}
            {/* 1. HERO SECTION: THE PLAYER CARD */}
            {/* ============================================ */}
            <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                <CardContent className="p-0">
                    {/* Top Bar with Level Progress */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Zap className="h-4 w-4 text-amber-300" />
                                <span className="text-white text-sm font-medium">Level {studentData.level}</span>
                            </div>
                            <div className="flex items-center gap-3 flex-1 max-w-xs ml-4">
                                <Progress value={(studentData.currentXPinLevel / studentData.xpToNextLevel) * 100} className="h-2 bg-white/20" />
                                <span className="text-white/80 text-xs whitespace-nowrap">{studentData.currentXPinLevel}/{studentData.xpToNextLevel} XP</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 sm:p-8">
                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
                            {/* Left: Avatar with Level Ring */}
                            <div className="relative flex-shrink-0">
                                <div className="relative">
                                    {/* Level Ring */}
                                    <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 animate-pulse opacity-50" />
                                    <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600" />

                                    {/* Avatar */}
                                    <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-slate-700 border-4 border-slate-800 flex items-center justify-center overflow-hidden">
                                        <User className="h-16 w-16 text-slate-500" />
                                    </div>

                                    {/* Level Badge */}
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-slate-800">
                                        LVL {studentData.level}
                                    </div>
                                </div>
                            </div>

                            {/* Center: Identity */}
                            <div className="flex-1 text-center lg:text-left">
                                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{userName || studentData.name}</h1>
                                <p className="text-slate-400 text-sm sm:text-base mb-3">
                                    Class {studentData.currentSection} • {studentData.programCode} Stream
                                </p>

                                <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium">
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                        Active Scholar
                                    </span>
                                    <Badge className="bg-slate-700 text-slate-300 hover:bg-slate-700 border-0">
                                        {studentData.uid}
                                    </Badge>
                                </div>

                                {/* Quick Stats */}
                                <div className="flex items-center justify-center lg:justify-start gap-4 text-sm">
                                    <div className="flex items-center gap-1.5 text-slate-400">
                                        <Sparkles className="h-4 w-4 text-amber-400" />
                                        <span className="text-white font-bold">{studentData.totalXP}</span> XP
                                    </div>
                                    <div className="flex items-center gap-1.5 text-slate-400">
                                        <TrophyIcon className="h-4 w-4 text-amber-400" />
                                        <span className="text-white font-bold">12</span> Badges
                                    </div>
                                </div>
                            </div>

                            {/* Right: Rarest Badge */}
                            <div className="flex-shrink-0">
                                <div className="text-center p-4 rounded-2xl bg-slate-800/50 border border-slate-700">
                                    <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-2">Rarest Badge</p>
                                    <div className={`w-16 h-16 mx-auto rounded-xl bg-gradient-to-br ${getRarityColor(studentData.rarestBadgeRarity)} p-0.5 mb-2`}>
                                        <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center">
                                            <Star className="h-8 w-8 text-blue-400 fill-blue-400/30" />
                                        </div>
                                    </div>
                                    <p className="text-white text-sm font-semibold">{studentData.rarestBadge}</p>
                                    <Badge className={`mt-1 text-[10px] bg-gradient-to-r ${getRarityColor(studentData.rarestBadgeRarity)} border-0 text-white`}>
                                        {studentData.rarestBadgeRarity.toUpperCase()}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* ============================================ */}
            {/* 2. BENTO GRID: PERSONAL & EMERGENCY INFO */}
            {/* ============================================ */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Details Card */}
                <Card className="overflow-hidden">
                    <CardContent className="p-0">
                        <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
                            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                                <User className="h-4 w-4 text-blue-500" />
                                Personal Details
                            </h3>
                        </div>
                        <div className="p-5 space-y-4">
                            <DetailRow icon={<Cake className="h-4 w-4" />} label="Date of Birth" value={studentData.dob} />
                            <DetailRow icon={<Droplets className="h-4 w-4" />} label="Blood Group" value={studentData.bloodGroup} highlight />
                            <DetailRow icon={<MapPin className="h-4 w-4" />} label="Address" value={studentData.address} />
                            <DetailRow icon={<Mail className="h-4 w-4" />} label="Email" value={userEmail || contactData.student.email} />
                            <DetailRow icon={<Phone className="h-4 w-4" />} label="Phone" value={contactData.student.phone} />

                            {/* Collapsible Additional Details */}
                            <button
                                onClick={() => setShowFullDetails(!showFullDetails)}
                                className="w-full flex items-center justify-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium py-2 mt-2 border-t border-dashed"
                            >
                                {showFullDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                {showFullDetails ? "Hide" : "View Full"} Details
                            </button>

                            {showFullDetails && (
                                <div className="space-y-3 pt-2 animate-in slide-in-from-top-2 duration-200">
                                    <DetailRow icon={<Shield className="h-4 w-4" />} label="Religion" value={studentData.religion} muted />
                                    <DetailRow icon={<Shield className="h-4 w-4" />} label="Category" value={studentData.category} muted />
                                    <DetailRow icon={<Clock className="h-4 w-4" />} label="Admission Year" value={studentData.admissionYear} muted />
                                    <DetailRow icon={<BookOpen className="h-4 w-4" />} label="School" value={studentData.university} muted />
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Emergency Contact Card */}
                <Card className="overflow-hidden">
                    <CardContent className="p-0">
                        <div className="p-4 border-b bg-rose-50 flex items-center justify-between">
                            <h3 className="font-semibold text-rose-800 flex items-center gap-2">
                                <Phone className="h-4 w-4 text-rose-500" />
                                Emergency Contacts
                            </h3>
                        </div>
                        <div className="p-5 space-y-4">
                            {/* Father */}
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <Users className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-800">{contactData.father.name}</p>
                                        <p className="text-xs text-slate-500">Father</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <a href={`tel:${contactData.father.phone}`} className="flex items-center gap-2 text-slate-600 hover:text-blue-600">
                                        <Phone className="h-3.5 w-3.5" /> {contactData.father.phone}
                                    </a>
                                    <a href={`mailto:${contactData.father.email}`} className="flex items-center gap-2 text-slate-600 hover:text-blue-600 truncate">
                                        <Mail className="h-3.5 w-3.5" /> {contactData.father.email}
                                    </a>
                                </div>
                            </div>

                            {/* Mother */}
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
                                        <Users className="h-5 w-5 text-pink-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-800">{contactData.mother.name}</p>
                                        <p className="text-xs text-slate-500">Mother</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <a href={`tel:${contactData.mother.phone}`} className="flex items-center gap-2 text-slate-600 hover:text-blue-600">
                                        <Phone className="h-3.5 w-3.5" /> {contactData.mother.phone}
                                    </a>
                                    <a href={`mailto:${contactData.mother.email}`} className="flex items-center gap-2 text-slate-600 hover:text-blue-600 truncate">
                                        <Mail className="h-3.5 w-3.5" /> {contactData.mother.email}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* ============================================ */}
            {/* 3. MENTOR: THE CONNECT CARD */}
            {/* ============================================ */}
            <Card className="overflow-hidden bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100">
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        {/* Mentor Avatar */}
                        <div className="relative flex-shrink-0">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                DS
                            </div>
                            {mentorData.available && (
                                <div className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-3 border-white rounded-full" />
                            )}
                        </div>

                        {/* Mentor Info */}
                        <div className="flex-1 text-center sm:text-left">
                            <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wider mb-1">Your Academic Mentor</p>
                            <h3 className="text-xl font-bold text-slate-900">{mentorData.name}</h3>
                            <p className="text-sm text-slate-600">{mentorData.designation} • {mentorData.department}</p>
                            <Badge variant="outline" className="mt-2 text-xs bg-white border-indigo-200 text-indigo-600">
                                ID: {mentorData.id}
                            </Badge>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2">
                                <MessageCircle className="h-4 w-4" />
                                Chat
                            </Button>
                            <Button variant="outline" className="gap-2 border-indigo-200 text-indigo-700 hover:bg-indigo-100">
                                <CalendarClock className="h-4 w-4" />
                                Book Appointment
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* ============================================ */}
            {/* 4. FACILITIES: THE INVENTORY / WALLET */}
            {/* ============================================ */}
            <Card className="overflow-hidden">
                <CardContent className="p-0">
                    <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
                        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                            <TrophyIcon className="h-4 w-4 text-amber-500" />
                            Unlocked Perks & Facilities
                        </h3>
                    </div>
                    <div className="p-5">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {facilitiesData.map((facility) => {
                                const Icon = facility.icon;
                                return (
                                    <div
                                        key={facility.id}
                                        className={`relative p-4 rounded-2xl border-2 transition-all ${facility.active
                                                ? `${facility.bgColor} border-transparent hover:shadow-md`
                                                : "bg-slate-50 border-dashed border-slate-200"
                                            }`}
                                    >
                                        {/* Issue Tag */}
                                        {facility.issue && (
                                            <div className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                                <AlertTriangle className="h-3 w-3" />
                                                {facility.issue}
                                            </div>
                                        )}

                                        <div className={`w-12 h-12 rounded-xl ${facility.active ? facility.color : "bg-slate-300"} flex items-center justify-center mb-3 shadow-sm`}>
                                            <Icon className="h-6 w-6 text-white" />
                                        </div>
                                        <h4 className={`font-semibold text-sm ${facility.active ? facility.textColor : "text-slate-400"}`}>
                                            {facility.label}
                                        </h4>
                                        <p className={`text-xs mt-1 ${facility.active ? "text-slate-500" : "text-slate-400"}`}>
                                            {facility.active ? "Active" : "Inactive"}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* ============================================ */}
            {/* 5. QUALIFICATION: THE VERTICAL TIMELINE */}
            {/* ============================================ */}
            <Card className="overflow-hidden">
                <CardContent className="p-0">
                    <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
                        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-emerald-500" />
                            Academic Journey
                        </h3>
                    </div>
                    <div className="p-5">
                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-200" />

                            {/* Timeline Items */}
                            <div className="space-y-6">
                                {qualificationData.map((qual, index) => (
                                    <div key={index} className="relative flex gap-4">
                                        {/* Timeline Node */}
                                        <div className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${qual.status === "in-progress"
                                                ? "bg-blue-500 ring-4 ring-blue-100"
                                                : "bg-emerald-500"
                                            }`}>
                                            {qual.status === "in-progress" ? (
                                                <Circle className="h-5 w-5 text-white animate-pulse" />
                                            ) : (
                                                <CheckCircle2 className="h-5 w-5 text-white" />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className={`flex-1 pb-6 ${index === qualificationData.length - 1 ? "pb-0" : ""}`}>
                                            <div className={`p-4 rounded-xl border ${qual.status === "in-progress"
                                                    ? "bg-blue-50 border-blue-200"
                                                    : "bg-white border-slate-200"
                                                }`}>
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-bold text-slate-900">Class {qual.qualification}</h4>
                                                        {qual.status === "in-progress" && (
                                                            <Badge className="bg-blue-500 hover:bg-blue-500 text-[10px]">CURRENT</Badge>
                                                        )}
                                                    </div>
                                                    <span className="text-sm text-slate-500">{qual.year}</span>
                                                </div>

                                                <p className="text-sm text-slate-600 mb-2">{qual.institute} • {qual.board}</p>

                                                {qual.status === "in-progress" ? (
                                                    <div className="space-y-2">
                                                        <div className="flex items-center justify-between text-xs text-slate-500">
                                                            <span>Academic Progress</span>
                                                            <span>65%</span>
                                                        </div>
                                                        <Progress value={65} className="h-2" />
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-between">
                                                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                                            {qual.percent}% Marks
                                                        </Badge>
                                                        <span className="text-xs text-slate-400">{qual.stream} Stream</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Footer */}
            <div className="text-center text-xs text-slate-400 py-4 space-y-1">
                <p className="font-medium">HS21Schools High School, Kathmandu, Nepal</p>
                <p>General Helpline: 1800-XXX-XXXX • support@hs21schools.edu</p>
            </div>
        </div>
    );
}

// Helper Components
function DetailRow({
    icon,
    label,
    value,
    highlight = false,
    muted = false
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    highlight?: boolean;
    muted?: boolean;
}) {
    return (
        <div className="flex items-start gap-3">
            <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${highlight ? "bg-rose-100 text-rose-600" : muted ? "bg-slate-100 text-slate-400" : "bg-blue-50 text-blue-600"
                }`}>
                {icon}
            </div>
            <div className="min-w-0">
                <p className={`text-xs ${muted ? "text-slate-400" : "text-slate-500"}`}>{label}</p>
                <p className={`text-sm font-medium break-words ${highlight ? "text-rose-700" : muted ? "text-slate-500" : "text-slate-800"
                    }`}>
                    {value}
                </p>
            </div>
        </div>
    );
}
