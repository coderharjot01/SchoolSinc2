"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Trophy,
    Flame,
    Target,
    Clock,
    Zap,
    Crown,
    Shield,
    Brain,
    Rocket,
    Sparkles,
    Lock,
    BookOpen,
    Star,
    Medal,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

// Achievement categories
const categories = [
    { id: "all", label: "All", count: 24 },
    { id: "academic", label: "Academic", count: 8 },
    { id: "streak", label: "Streaks", count: 5 },
    { id: "social", label: "Social", count: 6 },
    { id: "special", label: "Special", count: 5 },
];

// Achievements data
const achievements = [
    // Unlocked
    { id: 1, title: "First Steps", description: "Completed their first lesson", icon: Rocket, category: "academic", xp: 50, unlocked: true, date: "Dec 10, 2024", rarity: "common" },
    { id: 2, title: "Quiz Master", description: "Scored 90%+ on 5 quizzes", icon: Brain, category: "academic", xp: 100, unlocked: true, date: "Dec 12, 2024", rarity: "rare" },
    { id: 3, title: "Streak Starter", description: "Maintained a 3-day streak", icon: Flame, category: "streak", xp: 75, unlocked: true, date: "Dec 8, 2024", rarity: "common" },
    { id: 4, title: "Early Bird", description: "Logged in before 7 AM for 5 days", icon: Clock, category: "special", xp: 80, unlocked: true, date: "Dec 5, 2024", rarity: "uncommon" },
    { id: 5, title: "Team Player", description: "Helped classmates with homework", icon: Shield, category: "social", xp: 100, unlocked: true, date: "Dec 14, 2024", rarity: "rare" },
    { id: 6, title: "Math Whiz", description: "Completed all Math assignments on time", icon: Target, category: "academic", xp: 150, unlocked: true, date: "Dec 15, 2024", rarity: "epic" },

    // Locked (in progress)
    { id: 7, title: "Week Warrior", description: "Maintain a 7-day streak", icon: Flame, category: "streak", xp: 150, unlocked: false, progress: 5, target: 7, rarity: "uncommon" },
    { id: 8, title: "Bookworm", description: "Read 10 resource materials", icon: BookOpen, category: "academic", xp: 120, unlocked: false, progress: 6, target: 10, rarity: "uncommon" },
    { id: 9, title: "Lightning Learner", description: "Complete 3 lessons in one day", icon: Zap, category: "academic", xp: 100, unlocked: false, progress: 2, target: 3, rarity: "rare" },
    { id: 10, title: "Popular", description: "Get 50 likes on your comments", icon: Star, category: "social", xp: 200, unlocked: false, progress: 32, target: 50, rarity: "epic" },

    // Locked (not started)
    { id: 11, title: "Legend", description: "Reach Rank #1 in your class", icon: Crown, category: "special", xp: 500, unlocked: false, progress: 0, target: 1, rarity: "legendary" },
    { id: 12, title: "Month Master", description: "Maintain a 30-day streak", icon: Flame, category: "streak", xp: 300, unlocked: false, progress: 0, target: 30, rarity: "legendary" },
    { id: 13, title: "Perfectionist", description: "Score 100% on 10 quizzes", icon: Sparkles, category: "academic", xp: 250, unlocked: false, progress: 0, target: 10, rarity: "epic" },
];

const rarityConfig: Record<string, { bg: string; cardBg: string; text: string; border: string; shadow: string }> = {
    common: { bg: "bg-slate-100", cardBg: "bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-900/20", text: "text-slate-600", border: "border-slate-200", shadow: "shadow-slate-200/50" },
    uncommon: { bg: "bg-emerald-100", cardBg: "bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/30 dark:to-slate-900/20", text: "text-emerald-600", border: "border-emerald-200", shadow: "shadow-emerald-200/50" },
    rare: { bg: "bg-blue-100", cardBg: "bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/30 dark:to-slate-900/20", text: "text-blue-600", border: "border-blue-200", shadow: "shadow-blue-200/50" },
    epic: { bg: "bg-purple-100", cardBg: "bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/30 dark:to-slate-900/20", text: "text-purple-600", border: "border-purple-200", shadow: "shadow-purple-200/50" },
    legendary: { bg: "bg-amber-100", cardBg: "bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/30 dark:to-slate-900/20", text: "text-amber-600", border: "border-amber-200", shadow: "shadow-amber-200/50" },
};

const rarityOrder = ["common", "uncommon", "rare", "epic", "legendary"];

export default function AchievementsPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [activeCategory, setActiveCategory] = useState("all");

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const filteredAchievements = activeCategory === "all"
        ? achievements
        : achievements.filter(a => a.category === activeCategory);

    const unlockedAchievements = achievements.filter(a => a.unlocked);
    const unlockedCount = unlockedAchievements.length;
    const totalXp = unlockedAchievements.reduce((sum, a) => sum + a.xp, 0);

    // Find highest rarity achievement
    const bestAchievement = [...unlockedAchievements].sort(
        (a, b) => rarityOrder.indexOf(b.rarity) - rarityOrder.indexOf(a.rarity)
    )[0];

    const BestIcon = bestAchievement ? bestAchievement.icon : Medal;
    const bestRarityColor = bestAchievement ? rarityConfig[bestAchievement.rarity] : rarityConfig["common"];

    if (!isMounted) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-32" />
                <div className="bg-slate-200 dark:bg-slate-800 rounded-xl h-64" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <PageHeader
                breadcrumb="Home / Achievements"
                title="Achievements & Badges"
                subtitle="Track your child's milestones and academic accomplishments"
            />

            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                            <Trophy className="h-6 w-6 text-amber-600 fill-amber-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">{unlockedCount}/{achievements.length}</p>
                            <p className="text-sm text-amber-600 dark:text-amber-500 font-medium">Unlocked by Child</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 shadow-sm">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                            <Zap className="h-6 w-6 text-blue-600 fill-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{totalXp}</p>
                            <p className="text-sm text-blue-600 dark:text-blue-500 font-medium">Total XP Collected</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className={`relative overflow-hidden border transition-all duration-500 ${bestAchievement ? bestRarityColor.cardBg : "bg-slate-50"} ${bestAchievement ? bestRarityColor.border : "border-slate-200"}`}>
                    {bestAchievement && (
                        <div className="absolute inset-0 bg-white/20 dark:bg-black/10 backdrop-blur-[1px]" />
                    )}
                    <CardContent className="p-4 flex items-center gap-4 relative z-10">
                        <div className="relative">
                            <div className={`absolute inset-0 blur-xl opacity-50 ${bestAchievement ? bestRarityColor.bg : "bg-slate-200"}`} />
                            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center transform transition-transform hover:scale-110 duration-300 ${bestAchievement ? "bg-gradient-to-br from-white to-white/50 border border-white/50 shadow-lg" : "bg-slate-100"}`}>
                                <BestIcon
                                    className={`h-8 w-8 drop-shadow-md ${bestAchievement ? bestRarityColor.text : "text-slate-400"} ${bestAchievement ? "fill-current" : ""}`}
                                />
                            </div>
                        </div>
                        <div>
                            {bestAchievement ? (
                                <>
                                    <div className="flex items-center gap-2">
                                        <p className={`text-lg font-bold ${bestRarityColor.text} capitalize`}>{bestAchievement.rarity}</p>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Best Achievement</p>
                                </>
                            ) : (
                                <>
                                    <p className="text-lg font-bold text-slate-400">No Rarity</p>
                                    <p className="text-sm text-slate-500">Unlock badges to see this</p>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${activeCategory === cat.id
                            ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105"
                            : "bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                            }`}
                    >
                        {cat.label}
                        <span className={`ml-2 text-xs py-0.5 px-2 rounded-full ${activeCategory === cat.id ? "bg-white/20" : "bg-slate-100 dark:bg-slate-700"}`}>
                            {cat.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAchievements.map((achievement) => {
                    const rarity = rarityConfig[achievement.rarity];
                    const Icon = achievement.icon;
                    const isUnlocked = achievement.unlocked;

                    return (
                        <Card
                            key={achievement.id}
                            className={`relative group overflow-hidden transition-all duration-300 ${isUnlocked
                                ? `${rarity.cardBg} ${rarity.border} hover:shadow-xl hover:-translate-y-1`
                                : "bg-white dark:bg-slate-900 border-dashed border-slate-200 dark:border-slate-800 opacity-80 hover:opacity-100"
                                }`}
                        >
                            <CardContent className="p-5">
                                <div className="flex items-start gap-4">
                                    {/* Icon / Sticker */}
                                    <div className={`relative h-16 w-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${isUnlocked
                                        ? "bg-white shadow-sm border border-white/50"
                                        : "bg-slate-50 dark:bg-slate-800"
                                        }`}>
                                        <Icon
                                            className={`h-8 w-8 transition-all duration-300 ${isUnlocked
                                                ? `${rarity.text} fill-current filter drop-shadow-sm`
                                                : "text-slate-300 dark:text-slate-600"
                                                }`}
                                            strokeWidth={isUnlocked ? 1.5 : 1}
                                        />
                                        {!isUnlocked && (
                                            <div className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-700 border-2 border-white dark:border-slate-800 flex items-center justify-center shadow-sm">
                                                <Lock className="h-3 w-3 text-slate-400" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0 pt-1">
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <h3 className={`text-base font-bold truncate ${isUnlocked ? "text-slate-800 dark:text-slate-100" : "text-slate-500"
                                                }`}>
                                                {achievement.title}
                                            </h3>
                                            {isUnlocked && (
                                                <Badge variant="secondary" className={`text-[10px] font-bold capitalize shadow-sm ${rarity.bg} ${rarity.text} hover:${rarity.bg}`}>
                                                    {achievement.rarity}
                                                </Badge>
                                            )}
                                        </div>

                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 font-medium leading-relaxed">
                                            {achievement.description}
                                        </p>

                                        {/* EXP & Progress */}
                                        {isUnlocked ? (
                                            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700/50 pt-3">
                                                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{achievement.date}</span>
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                                                    <span>+{achievement.xp} XP</span>
                                                </div>
                                            </div>
                                        ) : achievement.progress !== undefined && achievement.target !== undefined ? (
                                            <div className="space-y-2 pt-1">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="font-bold text-slate-600 dark:text-slate-400">{achievement.progress}/{achievement.target}</span>
                                                    <span className="text-blue-600 font-bold">+{achievement.xp} XP</span>
                                                </div>
                                                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500"
                                                        style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="pt-2">
                                                <Badge variant="outline" className="text-[10px] bg-slate-50 text-slate-400 border-slate-200">Locked • +{achievement.xp} XP</Badge>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
