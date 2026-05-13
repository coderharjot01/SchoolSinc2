"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Notice } from "@/app/(protected)/admin/notices/page";

interface NoticeBoardProps {
    notices: Notice[];
}

export function NoticeBoard({ notices }: NoticeBoardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Notices</CardTitle>
                <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                    <Input placeholder="Search" className="pl-9 h-9" />
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {notices.map((notice, i) => (
                    <div key={i} className="border-b last:border-0 pb-6 last:pb-0">
                        <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-1">{notice.title}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{notice.desc}</p>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{notice.date}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-slate-300"></span> {notice.audience}</span>
                            </div>
                            <div className="flex gap-2">
                                {notice.type === "Urgent" && <Badge variant="destructive" className="h-5 text-[10px]">Urgent</Badge>}
                                <Badge variant="secondary" className={`h-5 text-[10px] ${notice.type === 'Fee' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>{notice.type}</Badge>
                                {notice.tag && <Badge variant="outline" className="h-5 text-[10px] border-blue-200 text-blue-600">{notice.tag}</Badge>}
                            </div>
                        </div>
                    </div>
                ))}
                {notices.length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                        No notices found.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
