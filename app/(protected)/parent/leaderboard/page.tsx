"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Crown,
    Medal,
    Trophy,
    TrendingUp,
    TrendingDown,
    Minus,
    Timer,
    ChevronRight,
    Gem,
    Star,
    ArrowUp
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

// ============ LEADERBOARD DATA ============

const topThree = [
    { rank: 1, name: "Priya S.", xp: 3200, weeklyXp: 450, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya", level: 12 },
    { rank: 2, name: "Amit J.", xp: 3050, weeklyXp: 380, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit", level: 11 },
    { rank: 3, name: "Sara M.", xp: 2900, weeklyXp: 320, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara", level: 11 },
];

const allStudents = [
    { rank: 1, name: "Priya S.", xp: 3200, weeklyXp: 450, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya", level: 12, trend: 0 },
    { rank: 2, name: "Amit J.", xp: 3050, weeklyXp: 380, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit", level: 11, trend: 1 },
    { rank: 3, name: "Sara M.", xp: 2900, weeklyXp: 320, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara", level: 11, trend: -1 },
    { rank: 4, name: "Rahul K.", xp: 2570, weeklyXp: 280, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul", level: 10, trend: 2 },
    { rank: 5, name: "Neha T.", xp: 2550, weeklyXp: 260, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neha", level: 10, trend: 0 },
    { rank: 15, name: "Your Child", xp: 2010, weeklyXp: 130, avatar: "", level: 7, trend: -1, isChild: true },
    { rank: 16, name: "Deepak V.", xp: 1980, weeklyXp: 120, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Deepak", level: 6, trend: 0 },
    { rank: 17, name: "Kavita N.", xp: 1950, weeklyXp: 110, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kavita", level: 6, trend: 1 },
];

const leagues = [
    { id: "class", label: "Class 10-A", count: 35 },
    { id: "grade", label: "Grade 10 Global", count: 280 },
];

const leagueBadge = { name: "Diamond League", icon: Gem, color: "text-cyan-500", bgColor: "bg-cyan-50" };

export default function ParentLeaderboardPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [activeLeague, setActiveLeague] = useState("class");

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Child's Journey"
                title="Class Leaderboard"
                subtitle="Track your child's ranking and academic standing"
            />

            {/* Podium Visual */}
            <div className="grid grid-cols-3 gap-4 h-64 items-end mb-8 bg-gradient-to-t from-slate-900 to-slate-800 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-4 left-4 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-500" />
                    <span className="text-white font-bold tracking-wider uppercase text-xs">Top Performers</span>
                </div>

                {/* Rank 2 */}
                <div className="flex flex-col items-center">
                    <Avatar className="h-16 w-16 border-4 border-slate-400 mb-2">
                        <AvatarImage src={topThree[1].avatar} />
                        <AvatarFallback>{topThree[1].name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="bg-slate-400 w-full rounded-t-lg h-24 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">2</span>
                    </div>
                </div>

                {/* Rank 1 */}
                <div className="flex flex-col items-center">
                    <Crown className="h-6 w-6 text-amber-500 mb-1" />
                    <Avatar className="h-20 w-20 border-4 border-amber-500 mb-2 ring-4 ring-amber-500/20">
                        <AvatarImage src={topThree[0].avatar} />
                        <AvatarFallback>{topThree[0].name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="bg-amber-500 w-full rounded-t-lg h-32 flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">1</span>
                    </div>
                </div>

                {/* Rank 3 */}
                <div className="flex flex-col items-center">
                    <Avatar className="h-14 w-14 border-4 border-orange-500 mb-2">
                        <AvatarImage src={topThree[2].avatar} />
                        <AvatarFallback>{topThree[2].name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="bg-orange-500 w-full rounded-t-lg h-20 flex items-center justify-center">
                        <span className="text-xl font-bold text-white">3</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex gap-2">
                    {leagues.map(l => (
                        <Button 
                            key={l.id}
                            variant={activeLeague === l.id ? "default" : "outline"}
                            size="sm"
                            onClick={() => setActiveLeague(l.id)}
                            className="rounded-full px-4"
                        >
                            {l.label}
                        </Button>
                    ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Timer className="h-4 w-4" />
                    <span>Resets in 2d 4h</span>
                </div>
            </div>

            {/* Ladder */}
            <Card>
                <CardContent className="p-0">
                    <table className="w-full">
                        <thead className="bg-slate-50 dark:bg-slate-900 border-b">
                            <tr className="text-left text-xs uppercase text-slate-500 font-bold">
                                <th className="p-4">Rank</th>
                                <th className="p-4">Student</th>
                                <th className="p-4 hidden sm:table-cell text-center">Level</th>
                                <th className="p-4 text-right">Weekly XP</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {allStudents.map((s) => (
                                <tr key={s.rank} className={s.isChild ? "bg-blue-50 dark:bg-blue-900/20" : ""}>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`font-bold ${s.rank <= 3 ? "text-amber-500" : "text-slate-500"}`}>
                                                #{s.rank}
                                            </span>
                                            {s.trend > 0 && <TrendingUp className="h-3 w-3 text-emerald-500" />}
                                            {s.trend < 0 && <TrendingDown className="h-3 w-3 text-rose-500" />}
                                            {s.trend === 0 && <Minus className="h-3 w-3 text-slate-300" />}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={s.avatar} />
                                                <AvatarFallback>{s.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className={`text-sm font-semibold ${s.isChild ? "text-blue-600" : ""}`}>{s.name}</p>
                                                {s.isChild && <Badge variant="secondary" className="text-[10px] h-4 bg-blue-100 text-blue-700">Your Child</Badge>}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 hidden sm:table-cell text-center text-sm font-medium text-slate-600">
                                        Lv.{s.level}
                                    </td>
                                    <td className="p-4 text-right font-bold text-slate-700">
                                        {s.weeklyXp} XP
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>

            {/* Performance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/50">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                                <ArrowUp className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-400">Position Secured</h4>
                                <p className="text-xs text-emerald-700 dark:text-emerald-500">Your child is in the top 15% of the class.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-amber-50 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/50">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center">
                                <Gem className="h-6 w-6 text-amber-600" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-amber-900 dark:text-amber-400">Diamond League </h4>
                                <p className="text-xs text-amber-700 dark:text-amber-500">Qualifying for Diamond League next week!</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
