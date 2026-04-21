"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    BookOpen,
    Users,
    Briefcase,
    ClipboardList,
    BarChart2,
    CreditCard,
    Calendar,
    Megaphone,
    Video,
    FileText,
    LogOut,
    Clock,
    X,
    Building2,
    Trophy,
    Medal,
    Flame,
    Settings,
    ChevronUp,
    Plane,
    LucideIcon,
    CalendarDays,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps {
    role: "admin" | "faculty" | "student" | "parent";
    isOpen: boolean;
    isDesktop: boolean;
    onClose: () => void;
    userName?: string;
}

interface NavSection {
    title: string;
    items: {
        label: string;
        href: string;
        icon: LucideIcon;
    }[];
}

export function Sidebar({ role, isOpen, isDesktop, onClose, userName = "Student" }: SidebarProps) {
    const pathname = usePathname();
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    // Define sections based on role
    const getSections = (): NavSection[] => {
        if (role === "admin") {
            return [
                {
                    title: "Home",
                    items: [
                        { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
                    ]
                },
                {
                    title: "Academics",
                    items: [
                        { label: "Academics", href: "/admin/academics", icon: BookOpen },
                        { label: "Exam Management", href: "/admin/exams", icon: ClipboardList },
                        { label: "Performance & Analytics", href: "/admin/analytics", icon: BarChart2 },
                    ]
                },
                {
                    title: "Management",
                    items: [
                        { label: "Student Management", href: "/admin/students", icon: Users },
                        { label: "Staff Management", href: "/admin/staff", icon: Briefcase },
                        { label: "Fee and Finance", href: "/admin/finance", icon: CreditCard },
                        { label: "Leave Management", href: "/admin/leaves", icon: CalendarDays },
                    ]
                },
                {
                    title: "Communication",
                    items: [
                        { label: "Event Management", href: "/admin/events", icon: Calendar },
                        { label: "Notice & Communication", href: "/admin/notices", icon: Megaphone },
                        { label: "Meeting Management", href: "/admin/meetings", icon: Video },
                    ]
                },
            ];
        }

        if (role === "faculty") {
            return [
                {
                    title: "Home",
                    items: [
                        { label: "Dashboard", href: "/faculty/dashboard", icon: LayoutDashboard },
                    ]
                },
                {
                    title: "Teaching",
                    items: [
                        { label: "Attendance", href: "/faculty/attendance", icon: Calendar },
                        { label: "Academics", href: "/faculty/academics", icon: BookOpen },
                        { label: "Student Management", href: "/faculty/students", icon: Users },
                    ]
                },
                {
                    title: "Personal",
                    items: [
                        { label: "Finance & Payslips", href: "/faculty/finance", icon: CreditCard },
                        { label: "Leave Application", href: "/faculty/leaves", icon: FileText },
                    ]
                },
                {
                    title: "Communication",
                    items: [
                        { label: "Notices & Meetings", href: "/faculty/notices", icon: Megaphone },
                    ]
                },
            ];
        }

        // Student - NEW GAMIFIED STRUCTURE
        if (role === "student") {
            return [
                {
                    title: "Home",
                    items: [
                        { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
                    ]
                },
                {
                    title: "My Journey",
                    items: [
                        { label: "Leaderboard", href: "/student/leaderboard", icon: Trophy },
                        { label: "Achievements", href: "/student/achievements", icon: Medal },
                        { label: "My Streaks", href: "/student/streaks", icon: Flame },
                    ]
                },
                {
                    title: "Academics",
                    items: [
                        { label: "Timetable", href: "/student/timetable", icon: Clock },
                        { label: "Resources", href: "/student/resources", icon: BookOpen },
                        { label: "Assignments", href: "/student/exams", icon: FileText },
                        { label: "Grades & Reports", href: "/student/performance", icon: BarChart2 },
                    ]
                },
                {
                    title: "Campus Life",
                    items: [
                        { label: "Events & Notices", href: "/student/notices", icon: Calendar },
                        { label: "Fees", href: "/student/finance", icon: CreditCard },
                        { label: "Leave Request", href: "/student/leaves", icon: Plane },
                    ]
                },
            ];
        }

        // Parent - Similar structure
        return [
            {
                title: "Home",
                items: [
                    { label: "Dashboard", href: "/parent/dashboard", icon: LayoutDashboard },
                ]
            },
            {
                title: "Child's Journey",
                items: [
                    { label: "Leaderboard", href: "/parent/leaderboard", icon: Trophy },
                    { label: "Achievements", href: "/parent/achievements", icon: Medal },
                ]
            },
            {
                title: "Academics",
                items: [
                    { label: "Timetable", href: "/parent/timetable", icon: Clock },
                    { label: "Resources", href: "/parent/resources", icon: BookOpen },
                    { label: "Exams & Events", href: "/parent/exams", icon: FileText },
                    { label: "Grades & Performance", href: "/parent/performance", icon: BarChart2 },
                    { label: "Academic Reports", href: "/parent/reports", icon: ClipboardList },
                ]
            },
            {
                title: "Campus Life",
                items: [
                    { label: "Events & Notices", href: "/parent/notices", icon: Calendar },
                    { label: "Fees", href: "/parent/finance", icon: CreditCard },
                    { label: "Leave Request", href: "/parent/leaves", icon: Plane },
                ]
            },
        ];
    };

    const sections = getSections();

    const handleLinkClick = () => {
        if (!isDesktop) {
            onClose();
        }
    };

    const handleLogout = async () => {
        await signOut({ callbackUrl: "/" });
    };

    const getClassInfo = () => {
        if (role === "student") return "Class 10-A";
        if (role === "parent") return "Parent";
        if (role === "faculty") return "Faculty";
        return "Admin";
    };

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shadow-sm transition-transform duration-300 ease-in-out z-40",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Logo Header */}
                <div className="h-14 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4">
                    <Link href={`/${role}/dashboard`} className="flex items-center gap-2">
                        <Building2 className="h-7 w-7 text-blue-500" strokeWidth={2} />
                        <div>
                            <span className="text-lg font-bold text-blue-500">HS21</span>
                            <span className="text-lg font-bold text-orange-500 ml-1">Schools</span>
                        </div>
                    </Link>
                    <button
                        onClick={onClose}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden"
                    >
                        <X className="h-5 w-5 text-slate-500" strokeWidth={2} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-3 overflow-y-auto">
                    {sections.map((section, sectionIndex) => (
                        <div key={section.title} className={cn("mb-4", sectionIndex === 0 && "mt-0")}>
                            {/* Section Title - Compact with premium typography */}
                            <h3 className="px-3 mb-1.5 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                {section.title}
                            </h3>

                            {/* Section Items */}
                            <div className="space-y-0.5">
                                {section.items.map((item) => {
                                    const isActive = pathname.startsWith(item.href);
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            prefetch={true}
                                            onClick={handleLinkClick}
                                            className={cn(
                                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                                isActive
                                                    ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 shadow-sm"
                                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
                                            )}
                                        >
                                            <item.icon
                                                className={cn(
                                                    "h-[18px] w-[18px]",
                                                    isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"
                                                )}
                                                strokeWidth={2}
                                            />
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Mini Profile Footer */}
                <div className="border-t border-slate-200 dark:border-slate-800">
                    {/* Profile Menu (expandable) */}
                    {isProfileMenuOpen && (
                        <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-0.5">
                            <Link
                                href={`/${role}/profile`}
                                onClick={handleLinkClick}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-colors"
                            >
                                <Users className="h-4 w-4" strokeWidth={2} />
                                My Profile
                            </Link>
                            <Link
                                href={`/${role}/settings`}
                                onClick={handleLinkClick}
                                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-colors"
                            >
                                <Settings className="h-4 w-4" strokeWidth={2} />
                                Settings
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                            >
                                <LogOut className="h-4 w-4" strokeWidth={2} />
                                Logout
                            </button>
                        </div>
                    )}

                    {/* Profile Strip */}
                    <button
                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                        className="w-full px-3 py-3 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                        <Avatar className="h-9 w-9 border-2 border-blue-100 dark:border-blue-900">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} />
                            <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm font-semibold">
                                {userName.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-left min-w-0">
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{userName}</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">{getClassInfo()}</p>
                        </div>
                        <ChevronUp
                            className={cn(
                                "h-4 w-4 text-slate-400 transition-transform duration-200",
                                isProfileMenuOpen ? "rotate-0" : "rotate-180"
                            )}
                            strokeWidth={2}
                        />
                    </button>
                </div>
            </aside>
        </>
    );
}
