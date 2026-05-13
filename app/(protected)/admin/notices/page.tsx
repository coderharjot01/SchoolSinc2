"use client";

import { useState } from "react";
import { QuickActions } from "@/components/admin/notices/quick-actions";
import { NoticeBoard } from "@/components/admin/notices/notice-board";
import { PageHeader } from "@/components/ui/page-header";

export interface Notice {
    title: string;
    desc: string;
    date: string;
    audience: string;
    type: string;
    tag?: string;
}

const initialNotices: Notice[] = [
    { title: "Mid-term Examination Schedule Released", desc: "The mid-term examination schedule for all classes has been published. Students are advised to check their respective timetables...", date: "Dec 15, 2024", audience: "Students", type: "Urgent", tag: "Academic" },
    { title: "Fee payment Reminder - January 2025", desc: "This is a friendly reminder that the fee payment for January 2025 is due by December 21, 2024...", date: "Dec 15, 2024", audience: "Students", type: "Fee" },
    { title: "Annual Sports Day - Registration Open", desc: "Registration for Annual Sports Day 2025 is now open. Student can register for various events through the sports department...", date: "Dec 15, 2024", audience: "Students", type: "Sports" },
];

export default function AdminNoticesPage() {
    const [notices, setNotices] = useState<Notice[]>(initialNotices);

    const handleAddNotice = (newNotice: Notice) => {
        setNotices([newNotice, ...notices]);
    };

    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Notices"
                title="Notices & Announcements"
                subtitle="Create and manage school notices"
            />
            <div className="space-y-8">
                <section>
                    <h2 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">Quick Actions</h2>
                    <QuickActions onAddNotice={handleAddNotice} />
                </section>

                <section>
                    <h2 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">Recent Notices</h2>
                    <NoticeBoard notices={notices} />
                </section>
            </div>
        </div>
    );
}
