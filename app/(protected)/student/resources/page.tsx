"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Search, Filter, Star, FileSpreadsheet, Image as ImageIcon, Play, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";

// Content type configuration for color-coded icons
const contentTypeConfig: Record<string, { icon: React.ElementType; bgColor: string; iconColor: string; label: string }> = {
    "PDF": { icon: FileText, bgColor: "bg-red-50 dark:bg-red-900/20", iconColor: "text-red-500", label: "Notes" },
    "Video": { icon: Play, bgColor: "bg-blue-50 dark:bg-blue-900/20", iconColor: "text-blue-500", label: "Video" },
    "Worksheet": { icon: FileSpreadsheet, bgColor: "bg-emerald-50 dark:bg-emerald-900/20", iconColor: "text-emerald-500", label: "Worksheet" },
    "Image": { icon: ImageIcon, bgColor: "bg-purple-50 dark:bg-purple-900/20", iconColor: "text-purple-500", label: "Diagram" },
};

import { useState, useEffect } from "react";

export default function StudentResourcesPage() {
    const [resources, setResources] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/resources")
            .then(res => res.json())
            .then(data => setResources(data))
            .catch(err => console.error(err));
    }, []);


    return (
        <div className="space-y-6">
            <PageHeader
                breadcrumb="Home / Resources"
                title="Study Resources"
                subtitle="Access notes, assignments, and learning materials"
            />

            <Card>
                <CardHeader className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search resources..."
                                className="pl-8 w-full"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="flex-1 sm:flex-none">
                                <Filter className="h-4 w-4 mr-2" />Filter
                            </Button>
                        </div>
                    </div>

                    {/* Quick Filter Pills */}
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                        <Badge variant="outline" className="cursor-pointer hover:bg-slate-100 transition-colors">All</Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors gap-1">
                            <FileText className="h-3 w-3" /> Notes
                        </Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors gap-1">
                            <Play className="h-3 w-3" /> Videos
                        </Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-600 transition-colors gap-1">
                            <FileSpreadsheet className="h-3 w-3" /> Worksheets
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="p-3 sm:p-6 pt-0 sm:pt-0">
                    <div className="space-y-3">
                        {resources.map((item) => {
                            const config = contentTypeConfig[item.type] || contentTypeConfig["PDF"];
                            const Icon = config.icon;

                            return (
                                <div
                                    key={item.id}
                                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-xl hover:shadow-md transition-all bg-white dark:bg-slate-900 gap-3 group ${item.isRecommended ? "border-amber-200 bg-gradient-to-r from-amber-50/50 to-white dark:from-amber-900/10" : ""
                                        }`}
                                >
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        {/* Color-coded Icon */}
                                        <div className={`p-2.5 sm:p-3 rounded-xl flex-shrink-0 transition-transform group-hover:scale-105 ${config.bgColor}`}>
                                            <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${config.iconColor}`} />
                                        </div>

                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h4 className="font-semibold text-sm sm:text-base line-clamp-1">{item.title}</h4>
                                                {item.isRecommended && (
                                                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0 text-[10px] gap-1 font-bold">
                                                        <Star className="h-3 w-3 fill-amber-500" /> Teacher&apos;s Pick
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                                <Badge variant="secondary" className="text-xs font-normal">
                                                    {item.subject}
                                                </Badge>
                                                <Badge variant="outline" className={`text-[10px] gap-1 font-medium ${config.iconColor} border-0 ${config.bgColor}`}>
                                                    {config.label}
                                                </Badge>
                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <Eye className="h-3 w-3" /> {item.views}
                                                </span>
                                                <span className="text-xs text-muted-foreground">• {item.date}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 pl-11 sm:pl-0">
                                        <span className="text-xs text-muted-foreground font-medium">{item.size}</span>
                                        <Button
                                            size="sm"
                                            onClick={() => {
                                                if (item.type === "Video") {
                                                    window.open(item.url || "https://www.youtube.com", "_blank");
                                                } else {
                                                    const link = document.createElement("a");
                                                    link.href = item.url;
                                                    link.target = "_blank";
                                                    if(item.url.startsWith("http")) { link.download = ""; } else {
                                                       link.download = item.title.replace(/ /g, "_") + (item.type === "PDF" ? ".pdf" : ".txt");
                                                    }
                                                    document.body.appendChild(link);
                                                    link.click();
                                                    document.body.removeChild(link);
                                                }
                                            }}
                                            className={`h-8 sm:h-9 text-xs sm:text-sm gap-1.5 ${item.type === "Video"
                                                ? "bg-blue-600 hover:bg-blue-700"
                                                : "bg-slate-900 hover:bg-slate-800"
                                                }`}
                                        >
                                            {item.type === "Video" ? (
                                                <>
                                                    <Play className="h-3 w-3 sm:h-4 sm:w-4 fill-current" /> Watch
                                                </>
                                            ) : (
                                                <>
                                                    <Download className="h-3 w-3 sm:h-4 sm:w-4" /> Download
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
